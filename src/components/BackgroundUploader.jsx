import { useRef } from "react";
import { Box, Button, Stack, Avatar, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

const BackgroundUploader = ({ image, setImage }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        setImage({
          src: reader.result,
          width: img.naturalWidth,
          height: img.naturalHeight,
          format: file.type.split("/")[1] || "png",
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Button
        variant="contained"
        component="label"
        startIcon={<ImageIcon />}
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Select background image
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {image && (
        <Box sx={{ position: "relative" }}>
          <Avatar
            variant="rounded"
            src={image.src}
            alt="background preview"
            sx={{ width: 72, height: 72 }}
          />
          <IconButton
            size="small"
            color="error"
            onClick={removeImage}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              bgcolor: "white",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default BackgroundUploader;
