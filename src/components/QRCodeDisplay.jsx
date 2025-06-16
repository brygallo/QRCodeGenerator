import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const QRCodeDisplay = ({
  text,
  color,
  bgColor,
  shape,
  logo,
  background,
  position,
  setPosition,
  showHandles,
  size,
  setSize,
}) => {
  const ref = useRef(null);
  const qrRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const resizing = useRef(false);
  const startSize = useRef(0);
  const startX = useRef(0);
  const overlay = Boolean(background && background.src);

  useEffect(() => {
    const options = {
      width: size - 30,
      height: size - 30,
      data: text,
      qrOptions: { errorCorrectionLevel: "H" },
      image: logo || undefined,
      imageOptions: {
        margin: 4,
        hideBackgroundDots: true,
        crossOrigin: "anonymous",
      },
      dotsOptions: { color, type: shape },
      backgroundOptions: { color: "transparent" },
    };

    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(options);
      qrRef.current.append(ref.current);
      setLoading(false);
    } else {
      setLoading(true);
      qrRef.current.update(options);
      setLoading(false);
    }
  }, [text, color, bgColor, shape, logo, size]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    startSize.current = size;
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setDragging(false);
    resizing.current = false;
  };

  const handleMouseMove = (e) => {
    if (resizing.current) {
      const delta = e.clientX - startX.current;
      setSize(Math.max(100, startSize.current + delta));
      return;
    }
    if (!overlay || !dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - size / 2;
    const newY = e.clientY - rect.top - size / 2;
    setPosition({ x: newX, y: newY });
  };

  const PREVIEW_HEIGHT = 500;

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      id="qr-preview"
      sx={{
        position: "relative",
        width: "100%",
        height: overlay ? "auto" : size,
        aspectRatio: overlay
          ? `${background.width} / ${background.height}`
          : "1",
        maxHeight: overlay ? PREVIEW_HEIGHT : undefined,
        bgcolor: bgColor,
        backgroundImage: overlay ? `url(${background.src})` : "none",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        m: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        boxShadow: 4,
        border: "1px solid #e0e0e0",
      }}
    >
      <Box
        id="qr-code"
        onMouseDown={overlay ? handleMouseDown : undefined}
        sx={{
          position: overlay ? "absolute" : "relative",
          left: overlay ? position.x : 0,
          top: overlay ? position.y : 0,
          width: size,
          height: size,
          cursor: overlay ? "move" : "default",
          border: overlay && showHandles ? "2px dashed #1976d2" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          ref={ref}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& canvas": { margin: "auto" },
          }}
        />
        {overlay && showHandles && (
          <Box
            onMouseDown={handleResizeMouseDown}
            sx={{
              position: "absolute",
              width: 12,
              height: 12,
              bgcolor: "#1976d2",
              bottom: -6,
              right: -6,
              cursor: "nwse-resize",
              borderRadius: 1,
            }}
          />
        )}
        {loading && (
          <Box sx={{ position: "absolute" }}>
            <CircularProgress size={40} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QRCodeDisplay;
