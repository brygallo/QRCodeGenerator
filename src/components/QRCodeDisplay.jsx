import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const QR_SIZE = 250;

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
}) => {
  const ref = useRef(null);
  const qrRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const options = {
      width: QR_SIZE - 30,
      height: QR_SIZE - 30,
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
  }, [text, color, bgColor, shape, logo]);

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - QR_SIZE / 2;
    const newY = e.clientY - rect.top - QR_SIZE / 2;
    setPosition({ x: newX, y: newY });
  };

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
        minHeight: QR_SIZE,
        bgcolor: bgColor,
        backgroundImage: background ? `url(${background})` : "none",
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
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: QR_SIZE,
          height: QR_SIZE,
          cursor: "move",
          border: showHandles ? "2px dashed #1976d2" : "none",
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
