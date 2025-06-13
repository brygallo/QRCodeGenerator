import { Tabs, Tab, Box } from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const QRCodeTypeSelector = ({ qrType, setQrType }) => (
  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
    <Tabs
      value={qrType}
      onChange={(_, val) => setQrType(val)}
      variant="fullWidth"
    >
      <Tab icon={<TextFieldsIcon />} iconPosition="start" value="text" label="Text" />
      <Tab icon={<WhatsAppIcon />} iconPosition="start" value="whatsapp" label="WhatsApp" />
      <Tab icon={<LinkIcon />} iconPosition="start" value="url" label="URL" />
    </Tabs>
  </Box>
);

export default QRCodeTypeSelector;
