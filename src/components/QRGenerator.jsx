import { useState } from "react";
import QRCustomization from "./QRCustomization";
import QRCodeDisplay from "./QRCodeDisplay";
import DownloadOptions from "./DownloadOptions";
import LogoUploader from "./LogoUploader";
import QRContentForm from "./QRContentForm";
import { generateWhatsappLink } from "../utils/whatsapp";
import {
  Typography,
  Paper,
  Box,
  Button,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";

const QRGenerator = () => {
  const theme = useTheme();
  const [qrType, setQrType] = useState("text");
  const [inputText, setInputText] = useState("Hello World");
  const [waPrefix, setWaPrefix] = useState("593");
  const [waNumber, setWaNumber] = useState("");
  const [waMessage, setWaMessage] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shape, setShape] = useState("square");
  const [transparent, setTransparent] = useState(false);
  const [warning, setWarning] = useState("");
  const [logo, setLogo] = useState(null);

  const qrValue =
    qrType === "whatsapp"
      ? generateWhatsappLink(waPrefix, waNumber, waMessage)
      : inputText;

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
          position: "relative",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => window.location.reload()}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Reset Options
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          QR Code Generator
        </Typography>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <QRContentForm
            qrType={qrType}
            setQrType={setQrType}
            inputText={inputText}
            setInputText={setInputText}
            prefix={waPrefix}
            setPrefix={setWaPrefix}
            number={waNumber}
            setNumber={setWaNumber}
            message={waMessage}
            setMessage={setWaMessage}
          />
          <QRCustomization
            color={color}
            setColor={setColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            shape={shape}
            setShape={setShape}
          />
          <LogoUploader logo={logo} setLogo={setLogo} onWarning={setWarning} />
          <QRCodeDisplay text={qrValue} color={color} bgColor={bgColor} shape={shape} logo={logo} />
          <DownloadOptions
            text={qrValue}
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
