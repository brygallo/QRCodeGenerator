import { Box, Typography, Stack } from "@mui/material";
import QRShapeSelector from "./QRShapeSelector";


const QRCustomization = ({ color, setColor, bgColor, setBgColor, shape, setShape }) => {


  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Customize Your QR Code
      </Typography>

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
      <QRShapeSelector shape={shape} setShape={setShape} color={color} />
    </Box>
  );
};

export default QRCustomization;
