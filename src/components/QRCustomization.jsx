import { TextField, Box, Typography, Stack, Button } from "@mui/material";
import ColorPicker from "./ColorPicker";

const QRCustomization = ({ text, setText, color, setColor, bgColor, setBgColor, error, setError }) => {

  const handleChange = (e) => {
    const value = e.target.value;
    const asciiRegex = /^[\x00-\x7F]*$/;
    if (!asciiRegex.test(value)) {
      setError("Invalid characters detected");
    } else {
      setError("");
    }
    setText(value);
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Customize Your QR Code
      </Typography>

      <TextField
        fullWidth
        label="QR Text"
        placeholder="Enter text or URL to encode"
        variant="outlined"
        value={text}
        onChange={handleChange}
        inputProps={{ maxLength: 300 }}
        error={Boolean(error)}
        helperText={error || `${text.length} / 300`}
        sx={{ mb: 2 }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
        <ColorPicker label="Color" color={color} setColor={setColor} />
        <ColorPicker label="Background" color={bgColor} setColor={setBgColor} />
      </Stack>

      <Button
        variant="outlined"
        onClick={() => {
          setColor("#000000");
          setBgColor("#ffffff");
        }}
      >
        Reset Colors
      </Button>
    </Box>
  );
};

export default QRCustomization;
