import { TextField, Box, Typography, Stack } from "@mui/material";

const QRCustomization = ({ text, setText, color, setColor, bgColor, setBgColor }) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Customize Your QR Code
      </Typography>

      <TextField
        fullWidth
        label="Enter text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

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
