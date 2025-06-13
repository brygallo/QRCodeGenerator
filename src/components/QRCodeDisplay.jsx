import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const QRCodeDisplay = ({ text, color, bgColor, shape, logo }) => {
  const ref = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 220,
        height: 220,
        data: text,
        dotsOptions: { color, type: shape },
        backgroundOptions: { color: "transparent" },
      });
      qrRef.current.append(ref.current);
    } else {
      qrRef.current.update({ data: text, dotsOptions: { color, type: shape } });
    }
  }, [text, color, shape]);

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
      {logo && (
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
      )}
    </Box>
  );
};

export default QRCodeDisplay;
