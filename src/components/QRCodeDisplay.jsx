import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const QRCodeDisplay = ({ text, color, bgColor, shape, logo }) => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const qrRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({ width: 250, height: 250 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const options = {
      width: size.width,
      height: size.height,
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

  return (
    <Box
      id="qr-code"
      ref={containerRef}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size.width,
        height: size.height,
        bgcolor: bgColor,
        m: "auto",
        borderRadius: "16px",
        boxShadow: 4,
        border: "1px solid #e0e0e0",
        resize: "both",
        overflow: "hidden",
      }}
    >
      <Box
        ref={ref}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          "& canvas": {
            margin: "auto",
          },
        }}
      />
      {loading && (
        <Box sx={{ position: "absolute" }}>
          <CircularProgress size={40} />
        </Box>
      )}
    </Box>
  );
};

export default QRCodeDisplay;
