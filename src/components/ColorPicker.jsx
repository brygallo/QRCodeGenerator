import { Box, Typography, TextField } from "@mui/material";

const ColorPicker = ({ label, color, setColor }) => {
  const handleHexChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("#")) {
      value = `#${value}`;
    }
    // Limit to 7 characters (# + 6 hex digits)
    if (value.length > 7) {
      value = value.slice(0, 7);
    }
    setColor(value);
  };

  return (
    <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
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
          marginBottom: "4px",
        }}
      />
      <TextField
        value={color}
        onChange={handleHexChange}
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 7 }}
      />
    </Box>
  );
};

export default ColorPicker;
