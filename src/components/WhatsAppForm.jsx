import { Box, TextField, MenuItem, Stack, Typography, Button, Select, InputLabel, FormControl } from "@mui/material";
import { generateWhatsappLink } from "../utils/whatsapp";

const prefixes = [
  { label: "\uD83C\uDDEA\uD83C\uDDE8 +34", value: "34" },
  { label: "\uD83C\uDDEC\uD83C\uDDE7 +44", value: "44" },
  { label: "\uD83C\uDDFA\uD83C\uDDF8 +1", value: "1" },
  { label: "\uD83C\uDDE9\uD83C\uDDEA +49", value: "49" },
  { label: "\uD83C\uDDE8\uD83C\uDDF1 +593", value: "593" },
];

const WhatsAppForm = ({ prefix, setPrefix, number, setNumber, message, setMessage }) => {
  const link = generateWhatsappLink(prefix, number, message);
  const handleCopy = () => {
    if (link) navigator.clipboard.writeText(link);
  };

  const numberIsValid = /^\d{6,15}$/.test(number);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="wa-prefix-label">Prefijo pa\u00eds</InputLabel>
        <Select
          labelId="wa-prefix-label"
          value={prefix}
          label="Prefijo pa\u00eds"
          onChange={(e) => setPrefix(e.target.value)}
        >
          {prefixes.map((p) => (
            <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="N\u00FAmero"
        value={number}
        onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
        error={number !== '' && !numberIsValid}
        helperText={number !== '' && !numberIsValid ? 'Inv\u00E1lido' : ''}
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />
      <TextField
        label="Mensaje opcional"
        multiline
        minRows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
      />
      {link && (
        <Box sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{link}</Typography>
            <Button size="small" onClick={handleCopy}>Copiar enlace</Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default WhatsAppForm;
