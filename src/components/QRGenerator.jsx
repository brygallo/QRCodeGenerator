import { useState } from "react";
import QRCustomization from "./QRCustomization";
import QRCodeDisplay from "./QRCodeDisplay";
import DownloadOptions from "./DownloadOptions";
import LogoUploader from "./LogoUploader";
import QRContentForm from "./QRContentForm";
import { generateWhatsappLink } from "../utils/whatsapp";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Stack,
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
    <Box sx={{ bgcolor: theme.palette.secondary.main, p: 2, minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2, color:"#FFFFFF" }}>
        QR Code Generator
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6">Configuration</Typography>
                  <Button size="small" variant="outlined" onClick={() => window.location.reload()}>
                    Reset
                  </Button>
                </Box>
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
              </CardContent>
            </Card>

            <Card elevation={2}>
              <CardContent>
                <QRCustomization
                  color={color}
                  setColor={setColor}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  shape={shape}
                  setShape={setShape}
                />
                <Box sx={{ mt: 2 }}>
                  <LogoUploader logo={logo} setLogo={setLogo} onWarning={setWarning} />
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} alignItems="center">
            <Card elevation={2}>
              <CardContent>
                <QRCodeDisplay text={qrValue} color={color} bgColor={bgColor} shape={shape} logo={logo} />
              </CardContent>
            </Card>
            <Card elevation={2} sx={{ width: "100%" }}>
              <CardContent>
                <DownloadOptions
                  text={qrValue}
                  bgColor={bgColor}
                  transparent={transparent}
                  setTransparent={setTransparent}
                  onInvalid={setWarning}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(warning)}
        autoHideDuration={3000}
        onClose={() => setWarning("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" variant="filled" onClose={() => setWarning("")}>
          {warning}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QRGenerator;
