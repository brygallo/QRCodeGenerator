import {
  Box,
  TextField,
  Stack,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import { generateWhatsappLink } from "../utils/whatsapp";
import countryDialCodes from "../data/countryDialCodes.json";

const WhatsAppForm = ({ prefix, setPrefix, number, setNumber, message, setMessage }) => {
  const link = generateWhatsappLink(prefix, number, message);
  const handleCopy = () => {
    if (link) navigator.clipboard.writeText(link);
  };

  const numberIsValid = /^\d{6,15}$/.test(number);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        options={countryDialCodes}
        getOptionLabel={(option) => `${option.flag} ${option.name} (+${option.code})`}
        renderInput={(params) => <TextField {...params} label="Country" />}
        value={countryDialCodes.find((c) => c.code === prefix) || null}
        onChange={(event, newValue) => setPrefix(newValue ? newValue.code : "")}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        fullWidth
      />
      <TextField
        label="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
        error={number !== '' && !numberIsValid}
        helperText={number !== '' && !numberIsValid ? 'Invalid' : ''}
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />
      <TextField
        label="Optional message"
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
            <Button size="small" onClick={handleCopy}>Copy link</Button>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default WhatsAppForm;
