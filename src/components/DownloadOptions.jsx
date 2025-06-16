import { Button, Stack, FormControlLabel, Checkbox } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadOptions = ({ text, bgColor, transparent, setTransparent, onInvalid, setShowHandles, background }) => {

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
        link.download = `${text || "QR_Code"}.png`;
        link.click();


        qrElement.style.backgroundColor = originalBg;
        qrElement.style.borderRadius = originalBorderRadius;
        setShowHandles && setShowHandles(true);
      });
    }, 300);
  };

  const downloadPreviewAsImage = () => {
    if (isEmpty() || !background) return;
    const preview = document.getElementById("qr-preview");
    if (!preview) {
      console.error("QR preview element not found!");
      return;
    }

    setShowHandles && setShowHandles(false);
    setTimeout(() => {
      html2canvas(preview, { backgroundColor: null, scale: 4 }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${text || "QR_Code"}_background.png`;
        link.click();

        setShowHandles && setShowHandles(true);
      });
    }, 300);
  };

  const downloadQRAsPDF = () => {
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
      html2canvas(qrElement, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgSize = 80;
        const x = (pageWidth - imgSize) / 2;
        const y = (pageHeight - imgSize) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgSize, imgSize);
        pdf.save(`${text || "QR_Code"}.pdf`);

        qrElement.style.backgroundColor = originalBg;
        qrElement.style.borderRadius = originalBorderRadius;
        setShowHandles && setShowHandles(true);
      });
    }, 300);
  };

  const downloadPreviewAsPDF = () => {
    if (isEmpty() || !background) return;
    const preview = document.getElementById("qr-preview");
    if (!preview) {
      console.error("QR preview element not found!");
      return;
    }

    setShowHandles && setShowHandles(false);

    setTimeout(() => {
      html2canvas(preview, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgSize = 80;
        const x = (pageWidth - imgSize) / 2;
        const y = (pageHeight - imgSize) / 2;
        pdf.addImage(imgData, "PNG", x, y, imgSize, imgSize);
        pdf.save(`${text || "QR_Code"}_background.pdf`);

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
        <Button variant="contained" color="primary" onClick={downloadQRAsImage} startIcon={<DownloadIcon />}>
          PNG
        </Button>
        {background && (
          <Button variant="contained" color="primary" onClick={downloadPreviewAsImage} startIcon={<DownloadIcon />}>
            PNG w/ background
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={downloadQRAsPDF} startIcon={<PictureAsPdfIcon />}>
          PDF
        </Button>
        {background && (
          <Button variant="contained" color="secondary" onClick={downloadPreviewAsPDF} startIcon={<PictureAsPdfIcon />}>
            PDF w/ background
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default DownloadOptions;
