import { useState } from "react";
import QRCustomization from "./QRCustomization";
import QRCodeDisplay from "./QRCodeDisplay";
import DownloadOptions from "./DownloadOptions";
import LogoUploader from "./LogoUploader";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";

const QRGenerator = () => {
  const theme = useTheme();
  const [text, setText] = useState("Hello World");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("square");
  const [transparent, setTransparent] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [logo, setLogo] = useState(null);

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
          my: 3,
          p: 4,
          width: "100%",
          maxWidth: 420,
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
            shape={shape}
            setShape={setShape}
            error={error}
            setError={setError}
          />
          <LogoUploader logo={logo} setLogo={setLogo} onWarning={setWarning} />
          <QRCodeDisplay text={text} color={color} bgColor={bgColor} shape={shape} logo={logo} />
          <DownloadOptions
            text={text}
            bgColor={bgColor}
            transparent={transparent}
            setTransparent={setTransparent}
            onInvalid={setWarning}
          />
        </Box>
        <Snackbar
          open={Boolean(warning)}
          autoHideDuration={3000}
          onClose={() => setWarning("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="warning" variant="filled" onClose={() => setWarning("")}> {warning} </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default QRGenerator;
