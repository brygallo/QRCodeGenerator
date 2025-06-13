import { useState, useEffect } from "react";
import QRCustomization from "./QRCustomization";
import QRCodeDisplay from "./QRCodeDisplay";
import DownloadOptions from "./DownloadOptions";
import { Typography, Paper, Box, useTheme } from "@mui/material";

const QRGenerator = () => {
  const theme = useTheme();
  const [text, setText] = useState("Hello World");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [waMessage, setWaMessage] = useState("");

  useEffect(() => {
    if (isWhatsapp) {
      const sanitized = phone.replace(/\D/g, "");
      const url = `https://wa.me/${countryCode.replace("+", "")}${sanitized}?text=${encodeURIComponent(waMessage)}`;
      setText(url);
    }
  }, [isWhatsapp, phone, countryCode, waMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.secondary.main,
        p: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          QR Code Generator
        </Typography>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <QRCustomization
            text={text}
            setText={setText}
            color={color}
            setColor={setColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            isWhatsapp={isWhatsapp}
            setIsWhatsapp={setIsWhatsapp}
            phone={phone}
            setPhone={setPhone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            waMessage={waMessage}
            setWaMessage={setWaMessage}
          />
          <QRCodeDisplay text={text} color={color} bgColor={bgColor} />
          <DownloadOptions text={text} bgColor={bgColor} />
        </Box>
      </Paper>
    </Box>
  );
};

export default QRGenerator;
