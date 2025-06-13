import { Box, Typography, Stack, TextField } from "@mui/material";
import QRShapeSelector from "./QRShapeSelector";


const QRCustomization = ({ color, setColor, bgColor, setBgColor, shape, setShape }) => {


  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Customize Your QR Code
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 40, height: 40, border: '1px solid #ccc', cursor: 'pointer' }}
          />
          <TextField
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            size="small"
            sx={{ width: 110 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ width: 40, height: 40, border: '1px solid #ccc', cursor: 'pointer' }}
          />
          <TextField
            label="Background"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            size="small"
            sx={{ width: 110 }}
          />
        </Box>
      </Stack>
      <QRShapeSelector shape={shape} setShape={setShape} color={color} />
    </Box>
  );
};

export default QRCustomization;
