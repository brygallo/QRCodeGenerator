import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const WhatsAppLink = ({ setText }) => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const generateLink = () => {
    if (!phone) return;
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ""}`;
    setText(link);
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        WhatsApp Link
      </Typography>
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Message (optional)"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={generateLink} disabled={!phone}>
        Generate WhatsApp Link
      </Button>
    </Box>
  );
};

export default WhatsAppLink;
