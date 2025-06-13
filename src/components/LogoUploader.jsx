import { useRef } from "react";
import { Box, Button, Stack } from "@mui/material";

const LogoUploader = ({ logo, setLogo, onWarning }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/png", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      onWarning && onWarning("Only PNG and SVG images are allowed.");
      inputRef.current.value = "";
      return;
    }
    if (file.size > 500 * 1024) {
      onWarning && onWarning("Logo must be less than 500KB.");
      inputRef.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogo(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Button
        variant="contained"
        component="label"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Upload Logo
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/svg+xml"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {logo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              bgcolor: "#fff",
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              p: 1,
            }}
          >
            <img
              src={logo}
              alt="Logo preview"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <Button
            size="small"
            color="error"
            variant="text"
            onClick={removeLogo}
          >
            Remove
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default LogoUploader;
