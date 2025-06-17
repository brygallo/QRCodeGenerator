import {
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Slider,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/ZoomIn";
import { useState } from "react";
import html2canvas from "html2canvas";
import { uuid } from "../utils/uuid";


const DownloadOptions = ({
  text,
  bgColor,
  transparent,
  setTransparent,
  onInvalid,
  setShowHandles,
  background,
  position,
  size,
}) => {
  const [open, setOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewExt, setPreviewExt] = useState("png");
  const [zoom, setZoom] = useState(1);
  const isEmpty = () => {
    if (!text.trim()) {
      onInvalid && onInvalid("Please enter text before downloading.");
      return true;
    }
    return false;
  };

  const generateCanvas = async (withBg) => {
    const qrElement = document.getElementById("qr-code");
    const preview = document.getElementById("qr-preview");
    if (!qrElement || (withBg && !preview)) return null;

    const originalQrBg = qrElement.style.backgroundColor;
    const originalQrRadius = qrElement.style.borderRadius;
    const originalBorder = preview ? preview.style.border : null;
    const originalRadius = preview ? preview.style.borderRadius : null;
    const originalShadow = preview ? preview.style.boxShadow : null;

    qrElement.style.backgroundColor = transparent ? "transparent" : bgColor;
    qrElement.style.borderRadius = "0px";
    if (preview) {
      preview.style.border = "none";
      preview.style.borderRadius = "0";
      preview.style.boxShadow = "none";
    }
    setShowHandles && setShowHandles(false);

    await new Promise((res) => setTimeout(res, 300));

    if (withBg && background && background.src && preview) {
      const previewRect = preview.getBoundingClientRect();
      const qrRect = qrElement.getBoundingClientRect();
      const scale = background.width / previewRect.width;

      const image = new Image();
      await new Promise((resolve) => {
        image.onload = resolve;
        image.src = background.src;
      });

      const canvas = document.createElement("canvas");
      canvas.width = background.width;
      canvas.height = background.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const qrCanvas = qrElement.querySelector("canvas");
      if (qrCanvas) {
        const x = (qrRect.left - previewRect.left) * scale;
        const y = (qrRect.top - previewRect.top) * scale;
        const sizeScaled = qrRect.width * scale;
        ctx.drawImage(
          qrCanvas,
          0,
          0,
          qrCanvas.width,
          qrCanvas.height,
          x,
          y,
          sizeScaled,
          sizeScaled
        );
      }

      const mimeType = `image/${background.format || "png"}`;
      const ext = background.format === "jpeg" ? "jpg" : background.format || "png";

      qrElement.style.backgroundColor = originalQrBg;
      qrElement.style.borderRadius = originalQrRadius;
      if (preview) {
        preview.style.border = originalBorder;
        preview.style.borderRadius = originalRadius;
        preview.style.boxShadow = originalShadow;
      }
      setShowHandles && setShowHandles(true);

      return { canvas, mimeType, ext };
    } else {
      const canvas = await html2canvas(qrElement, {
        backgroundColor: transparent ? null : bgColor,
        scale: 4,
      });

      qrElement.style.backgroundColor = originalQrBg;
      qrElement.style.borderRadius = originalQrRadius;
      setShowHandles && setShowHandles(true);

      return { canvas, mimeType: "image/png", ext: "png" };
    }
  };

  const downloadQRAsImage = async () => {
    if (isEmpty()) return;
    const result = await generateCanvas(false);
    if (!result) return;
    const { canvas, mimeType, ext } = result;
    const link = document.createElement("a");
    link.href = canvas.toDataURL(mimeType);
    link.download = `${uuid()}.${ext}`;
    link.click();
  };

  const downloadPreviewAsImage = async () => {
    if (isEmpty() || !background || !background.src) return;
    const result = await generateCanvas(true);
    if (!result) return;
    const { canvas, mimeType, ext } = result;
    const link = document.createElement("a");
    link.href = canvas.toDataURL(mimeType, 1.0);
    link.download = `${uuid()}_background.${ext}`;
    link.click();
  };

  const openAdvancedPreview = async (withBg) => {
    const result = await generateCanvas(withBg);
    if (!result) return;
    setPreviewSrc(result.canvas.toDataURL(result.mimeType, 1.0));
    setPreviewExt(withBg ? result.ext : "png");
    setZoom(1);
    setOpen(true);
  };


  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <FormControlLabel
        control={
          <Checkbox
            checked={transparent}
            onChange={(e) => setTransparent(e.target.checked)}
            color="primary"
          />
        }
        label="Transparent Background"
      />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={downloadQRAsImage}
          startIcon={<DownloadIcon />}
        >
          Export QR
        </Button>
        {background && (
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPreviewAsImage}
            startIcon={<DownloadIcon />}
          >
            Export QR with background
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => openAdvancedPreview(Boolean(background))}
          startIcon={<PreviewIcon />}
        >
          Advanced preview
        </Button>
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogTitle>Advanced Preview</DialogTitle>
        <DialogContent>
          {previewSrc && (
            <Stack spacing={2} alignItems="center">
              <Box
                component="img"
                src={previewSrc}
                alt="preview"
                sx={{ width: background ? background.width * zoom : size * zoom, maxWidth: "100%" }}
              />
              <Slider
                value={zoom}
                min={0.5}
                max={2}
                step={0.1}
                onChange={(e, val) => setZoom(val)}
                sx={{ width: 200 }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = previewSrc;
                  link.download = `${uuid()}_preview.${previewExt}`;
                  link.click();
                }}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default DownloadOptions;
