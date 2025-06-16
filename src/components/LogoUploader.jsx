import { useRef } from "react";
import { Box, Button, Stack, Avatar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
        startIcon={<UploadFileIcon />}
        sx={{ textTransform: "none" }}
      >
        Select File
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/svg+xml"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {logo && (
        <Box sx={{ position: 'relative' }}>
          <Avatar src={logo} alt="Logo preview" sx={{ width: 72, height: 72 }} />
          <IconButton
            size="small"
            color="error"
            onClick={removeLogo}
            sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'white' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Button
            variant="outlined"
            color="error"
            onClick={removeLogo}
            size="small"
            sx={{ mt: 1 }}
          >
            Remove Logo
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default LogoUploader;
