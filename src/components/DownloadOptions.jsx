import { Button, Stack, FormControlLabel, Checkbox } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas";

const uuid = () => {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const DownloadOptions = ({
  text,
  bgColor,
  transparent,
  setTransparent,
  onInvalid,
  setShowHandles,
  background,
}) => {
  const isEmpty = () => {
    if (!text.trim()) {
      onInvalid && onInvalid("Please enter text before downloading.");
      return true;
    }
    return false;
  };

  const downloadQRAsImage = () => {
    if (isEmpty()) return;
    const qrElement = document.getElementById("qr-code");

    if (!qrElement) {
      console.error("QR Code element not found!");
      return;
    }

    const originalBg = qrElement.style.backgroundColor;
    const originalBorderRadius = qrElement.style.borderRadius;

    qrElement.style.backgroundColor = transparent ? "transparent" : bgColor;
    qrElement.style.borderRadius = "0px";
    setShowHandles && setShowHandles(false);

    setTimeout(() => {
      html2canvas(qrElement, {
        backgroundColor: transparent ? null : bgColor,
        scale: 4,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${uuid()}.png`;
        link.click();

        qrElement.style.backgroundColor = originalBg;
        qrElement.style.borderRadius = originalBorderRadius;
        setShowHandles && setShowHandles(true);
      });
    }, 300);
  };

  const downloadPreviewAsImage = () => {
    if (isEmpty() || !background || !background.src) return;
    const preview = document.getElementById("qr-preview");
    if (!preview) {
      console.error("QR preview element not found!");
      return;
    }

    const originalBorder = preview.style.border;
    const originalRadius = preview.style.borderRadius;
    const originalShadow = preview.style.boxShadow;

    preview.style.border = "none";
    preview.style.borderRadius = "0";
    preview.style.boxShadow = "none";
    setShowHandles && setShowHandles(false);

    setTimeout(() => {
      const rect = preview.getBoundingClientRect();
      const scale = background.width / rect.width;
      html2canvas(preview, { backgroundColor: null, scale }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${uuid()}_background.png`;
        link.click();

        preview.style.border = originalBorder;
        preview.style.borderRadius = originalRadius;
        preview.style.boxShadow = originalShadow;
        setShowHandles && setShowHandles(true);
      });
    }, 300);
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
          PNG
        </Button>
        {background && (
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPreviewAsImage}
            startIcon={<DownloadIcon />}
          >
            PNG w/ background
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default DownloadOptions;
