import { useRef, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";

const useImage = (url) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!url) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => setImage(img);
  }, [url]);
  return image;
};

const DraggableQR = ({ image, attrs, onChange }) => {
  const img = useImage(image);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [img]);

  if (!img) return null;

  return (
    <>
      <KonvaImage
        image={img}
        x={attrs.x}
        y={attrs.y}
        width={attrs.size}
        height={attrs.size}
        draggable
        ref={shapeRef}
        onDragEnd={(e) =>
          onChange({ ...attrs, x: e.target.x(), y: e.target.y() })
        }
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scale = node.scaleX();
          node.scaleX(1);
          node.scaleY(1);
          const newSize = Math.max(20, attrs.size * scale);
          onChange({ ...attrs, x: node.x(), y: node.y(), size: newSize });
        }}
      />
      <Transformer ref={trRef} keepRatio resizeEnabled />
    </>
  );
};

const ImageComposer = ({ qrData }) => {
  const stageRef = useRef();
  const [bgUrl, setBgUrl] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 300, height: 300 });
  const [qrAttrs, setQrAttrs] = useState({ x: 50, y: 50, size: 150 });

  const bgImg = useImage(bgUrl);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setStageSize({ width: img.width, height: img.height });
      setBgUrl(url);
    };
    img.src = url;
  };

  const exportImage = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = "qr_image.png";
    link.click();
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleUpload}
      />
      <Box sx={{ mt: 2, display: "inline-block", border: "1px solid #ccc" }}>
        <Stage width={stageSize.width} height={stageSize.height} ref={stageRef}>
          <Layer>
            {bgImg && (
              <KonvaImage
                image={bgImg}
                width={stageSize.width}
                height={stageSize.height}
              />
            )}
            {qrData && (
              <DraggableQR image={qrData} attrs={qrAttrs} onChange={setQrAttrs} />
            )}
          </Layer>
        </Stage>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={exportImage} disabled={!bgImg || !qrData}>
          Export as Image
        </Button>
      </Box>
    </Box>
  );
};

export default ImageComposer;
