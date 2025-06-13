import { useEffect, useRef } from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import QRCodeStyling from "qr-code-styling";

const shapeOptions = [
  { label: "Cuadrado", value: "square", type: "square" },
  { label: "Puntos", value: "dots", type: "dots" },
  { label: "Pixelado", value: "rounded", type: "rounded" },
  { label: "Art\u00edstico", value: "classy", type: "classy" },
];

const QRShapeSelector = ({ shape, setShape, color }) => {
  const refs = useRef([]);

  useEffect(() => {
    shapeOptions.forEach((opt, idx) => {
      const container = refs.current[idx];
      if (!container) return;
      const qr = new QRCodeStyling({
        width: 60,
        height: 60,
        data: "demo",
        dotsOptions: {
          color,
          type: opt.type,
        },
        backgroundOptions: { color: "transparent" },
      });
      container.innerHTML = "";
      qr.append(container);
    });
  }, [color]);

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Forma
      </Typography>
      <RadioGroup
        row
        value={shape}
        onChange={(e) => setShape(e.target.value)}
        sx={{ justifyContent: "center" }}
      >
        {shapeOptions.map((opt, idx) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={
              <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Box ref={(el) => (refs.current[idx] = el)} sx={{ width: 60, height: 60 }} />
                <Typography variant="caption">{opt.label}</Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default QRShapeSelector;
