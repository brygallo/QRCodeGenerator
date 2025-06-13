import { Box, Typography, Stack } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

const QRHistory = ({ history }) => {
  if (!history.length) return null;

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Recent QR Codes
      </Typography>
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
        {history.map((item, index) => (
          <Box key={index} sx={{ p: 1, bgcolor: item.bgColor, borderRadius: 1 }}>
            <QRCodeSVG value={item.text} size={80} fgColor={item.color} bgColor="transparent" />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default QRHistory;
