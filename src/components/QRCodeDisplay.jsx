import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const QRCodeDisplay = ({ text, color, bgColor, shape, logo }) => {
  const ref = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    const options = {
      width: 220,
      height: 220,
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
    } else {
      qrRef.current.update(options);
    }
  }, [text, color, shape, logo]);

  return (
    <Box
      id="qr-code"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 220,
        bgcolor: bgColor,
        padding: 2,
        borderRadius: bgColor !== "transparent" ? "16px" : "0px",
        boxShadow: bgColor !== "transparent" ? 3 : 0,
      }}
    >
      <Box ref={ref} />
    </Box>
  );
};

export default QRCodeDisplay;
