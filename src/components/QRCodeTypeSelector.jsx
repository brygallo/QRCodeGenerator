import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const QRCodeTypeSelector = ({ qrType, setQrType }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id="qr-type-label">QR Content</InputLabel>
    <Select
      labelId="qr-type-label"
      value={qrType}
      label="QR Content"
      onChange={(e) => setQrType(e.target.value)}
    >
      <MenuItem value="text">Texto</MenuItem>
      <MenuItem value="whatsapp">WhatsApp Link</MenuItem>
      <MenuItem value="url">URL</MenuItem>
    </Select>
  </FormControl>
);

export default QRCodeTypeSelector;
