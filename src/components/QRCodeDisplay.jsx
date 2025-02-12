import { QRCodeSVG } from "qrcode.react";
import { Box } from "@mui/material";

const QRCodeDisplay = ({ text, color, bgColor, logo }) => {
  return (
    <Box
      id="qr-code"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 250,
        height: 250,
        bgcolor: bgColor,
        padding: 2,
        borderRadius: bgColor !== "transparent" ? "16px" : "0px",
        boxShadow: bgColor !== "transparent" ? 3 : 0,
      }}
    >
      <QRCodeSVG value={text} size={220} fgColor={color} bgColor="transparent" />
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
