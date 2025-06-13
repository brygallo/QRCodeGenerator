import {
  TextField,
  Box,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const countries = [
  { code: "+1", label: "USA/Canada" },
  { code: "+34", label: "Spain" },
  { code: "+44", label: "UK" },
  { code: "+52", label: "Mexico" },
  { code: "+54", label: "Argentina" },
  { code: "+57", label: "Colombia" },
];

const QRCustomization = ({
  text,
  setText,
  color,
  setColor,
  bgColor,
  setBgColor,
  isWhatsapp,
  setIsWhatsapp,
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  waMessage,
  setWaMessage,
}) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Customize Your QR Code
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={isWhatsapp}
            onChange={(e) => setIsWhatsapp(e.target.checked)}
            color="primary"
          />
        }
        label="WhatsApp Link"
        sx={{ mb: 2 }}
      />

      {isWhatsapp ? (
        <>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                value={countryCode}
                label="Country"
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {c.label} ({c.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Stack>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            value={waMessage}
            onChange={(e) => setWaMessage(e.target.value)}
            multiline
            sx={{ mb: 2 }}
          />
        </>
      ) : (
        <TextField
          fullWidth
          label="Enter text"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Color
          </Typography>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        </Box>

        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Background
          </Typography>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default QRCustomization;
