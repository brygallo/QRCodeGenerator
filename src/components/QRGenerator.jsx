import { useState } from "react";
import QRCustomization from "./QRCustomization";
import QRCodeDisplay from "./QRCodeDisplay";
import DownloadOptions from "./DownloadOptions";
import LogoUploader from "./LogoUploader";
import BackgroundUploader from "./BackgroundUploader";
import QRContentForm from "./QRContentForm";
import ImageComposer from "./ImageComposer";
import { generateWhatsappLink } from "../utils/whatsapp";
import {
  Typography,
  Box,
  Button,
  useTheme,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";

const QRGenerator = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("qr");
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
  const [qrData, setQrData] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [qrPosition, setQrPosition] = useState({ x: 0, y: 0 });
  const [showHandles, setShowHandles] = useState(true);
  const [qrSize, setQrSize] = useState(250);

  const qrValue =
    qrType === "whatsapp"
      ? generateWhatsappLink(waPrefix, waNumber, waMessage)
      : inputText;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          width: "100%",
          maxWidth: "750px",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          QR Code Generator
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="QR Code" value="qr" />
          <Tab label="Background" value="image" />
        </Tabs>

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
                <Box sx={{ mt: 2 }}>
                  <BackgroundUploader image={bgImage} setImage={setBgImage} />
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ display: tab === "image" ? "none" : "block" }}>
            <CardContent>
              <QRCodeDisplay
                text={qrValue}
                color={color}
                bgColor={bgColor}
                shape={shape}
                logo={logo}
                background={bgImage}
                position={qrPosition}
                setPosition={setQrPosition}
                showHandles={showHandles}
                size={qrSize}
                setSize={setQrSize}
                onUpdate={setQrData}
              />
            </CardContent>
          </Card>

          {tab === "qr" && (
            <Card elevation={2}>
              <CardContent>
                <DownloadOptions
                  text={qrValue}
                  bgColor={bgColor}
                  transparent={transparent}
                  setTransparent={setTransparent}
                  onInvalid={setWarning}
                  setShowHandles={setShowHandles}
                  background={bgImage}
                  position={qrPosition}
                  size={qrSize}
                />
              </CardContent>
            </Card>
          )}

          {tab === "image" && (
            <Card elevation={2}>
              <CardContent>
                <ImageComposer qrData={qrData} />
              </CardContent>
            </Card>
          )}
        </Stack>

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
    </Box>
  );
};

export default QRGenerator;
