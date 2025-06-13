import { TextField, Box } from "@mui/material";
import QRCodeTypeSelector from "./QRCodeTypeSelector";
import WhatsAppForm from "./WhatsAppForm";

const QRContentForm = ({
  qrType,
  setQrType,
  inputText,
  setInputText,
  prefix,
  setPrefix,
  number,
  setNumber,
  message,
  setMessage,
}) => (
  <Box sx={{ width: '100%' }}>
    <QRCodeTypeSelector qrType={qrType} setQrType={setQrType} />
    {qrType === 'whatsapp' ? (
      <WhatsAppForm
        prefix={prefix}
        setPrefix={setPrefix}
        number={number}
        setNumber={setNumber}
        message={message}
        setMessage={setMessage}
      />
    ) : (
      <TextField
        fullWidth
        label={qrType === 'url' ? 'URL' : 'Texto'}
        placeholder={qrType === 'url' ? 'https://example.com' : 'Ingresa texto'}
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{ mb: 2 }}
      />
    )}
  </Box>
);

export default QRContentForm;
