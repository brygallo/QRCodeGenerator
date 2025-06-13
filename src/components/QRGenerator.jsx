import { useState } from "react";
import QRCustomization from "./QRCustomization";
import WhatsAppLink from "./WhatsAppLink";
import QRCodeDisplay from "./QRCodeDisplay";
import QRHistory from "./QRHistory";
import DownloadOptions from "./DownloadOptions";
import { Typography, Paper, Box, Button, useTheme } from "@mui/material";

const QRGenerator = () => {
  const theme = useTheme();
  const [text, setText] = useState("Hello World");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [history, setHistory] = useState([]);

  const saveToHistory = () => {
    const item = { text, color, bgColor };
    setHistory((prev) => [item, ...prev].slice(0, 5));
  };

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
          />
          <WhatsAppLink setText={setText} />
          <QRCodeDisplay text={text} color={color} bgColor={bgColor} />
          <Button variant="outlined" onClick={saveToHistory}
            sx={{ mt: 1 }}>Save to History</Button>
          <DownloadOptions
            text={text}
            bgColor={bgColor}
            transparent={transparent}
            setTransparent={setTransparent}
          />
          <QRHistory history={history} />
        </Box>
      </Paper>
    </Box>
  );
};

export default QRGenerator;
