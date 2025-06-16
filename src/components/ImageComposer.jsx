import { useRef, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import html2canvas from "html2canvas";

const ImageComposer = ({ qrData }) => {
  const containerRef = useRef(null);
  const [bgUrl, setBgUrl] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });
  const [qrAttrs, setQrAttrs] = useState({ x: 50, y: 50, size: 150 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0, size: 150 });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setStageSize({ width: img.width, height: img.height });
      setBgUrl(url);
    };
    img.src = url;
  };

  const startDrag = (e) => {
    e.preventDefault();
    setDragging(true);
    setStartPos({ x: e.clientX - qrAttrs.x, y: e.clientY - qrAttrs.y, size: qrAttrs.size });
  };

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY, size: qrAttrs.size });
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (dragging) {
        const x = Math.min(Math.max(0, e.clientX - startPos.x), stageSize.width - qrAttrs.size);
        const y = Math.min(Math.max(0, e.clientY - startPos.y), stageSize.height - qrAttrs.size);
        setQrAttrs((attrs) => ({ ...attrs, x, y }));
      } else if (resizing) {
        const delta = Math.max(e.clientX - startPos.x, e.clientY - startPos.y);
        const size = Math.max(20, startPos.size + delta);
        setQrAttrs((attrs) => ({ ...attrs, size }));
      }
    };
    const stop = () => {
      setDragging(false);
      setResizing(false);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
    };
  }, [dragging, resizing, startPos, stageSize.width, stageSize.height, qrAttrs.size]);

  const exportImage = () => {
    if (!containerRef.current) return;
    html2canvas(containerRef.current, { backgroundColor: null, scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr_image.png";
      link.click();
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={handleUpload} />
      <Box
        ref={containerRef}
        sx={{
          mt: 2,
          width: stageSize.width,
          height: stageSize.height,
          position: "relative",
          display: "inline-block",
          border: "1px solid #ccc",
          userSelect: "none",
        }}
      >
        {bgUrl && (
          <img
            src={bgUrl}
            alt="background"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        )}
        {qrData && (
          <Box
            onMouseDown={startDrag}
            sx={{
              position: "absolute",
              left: qrAttrs.x,
              top: qrAttrs.y,
              width: qrAttrs.size,
              height: qrAttrs.size,
              cursor: dragging ? "grabbing" : "grab",
            }}
          >
            <img
              src={qrData}
              alt="qr"
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              data-handle
              onMouseDown={startResize}
              sx={{
                position: "absolute",
                width: 12,
                height: 12,
                right: -6,
                bottom: -6,
                bgcolor: "#fff",
                border: "1px solid #000",
                cursor: "nwse-resize",
              }}
            />
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={exportImage} disabled={!bgUrl || !qrData}>
          Export as Image
        </Button>
      </Box>
    </Box>
  );
};

export default ImageComposer;
