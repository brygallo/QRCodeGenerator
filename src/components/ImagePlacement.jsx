import { useState, useRef } from "react";
import { Box, Button, Slider, Stack } from "@mui/material";
import QRCodeDisplay from "./QRCodeDisplay";

const ImagePlacement = ({ image, setImage, qrProps }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const startDrag = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const endDrag = () => {
    setDragging(false);
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - 125,
      y: e.clientY - rect.top - 125,
    });
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="contained" component="label" sx={{ textTransform: "none" }}>
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>
      {image && (
        <>
          <Box
            ref={containerRef}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              border: "1px solid #ccc",
              overflow: "hidden",
            }}
            onMouseMove={onDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            <img
              src={image}
              alt="Background"
              style={{
                width: "100%",
                display: "block",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
            <Box
              sx={{ position: "absolute", top: pos.y, left: pos.x, cursor: "move" }}
              onMouseDown={startDrag}
            >
              <QRCodeDisplay {...qrProps} />
            </Box>
          </Box>
          <Box sx={{ width: "100%", maxWidth: 300 }}>
            <Slider
              value={scale}
              min={0.5}
              max={2}
              step={0.1}
              onChange={(_, val) => setScale(val)}
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ImagePlacement;
