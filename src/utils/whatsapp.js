export const generateWhatsappLink = (prefix, number, message) => {
  if (!prefix || !number) return "";
  const base = `https://wa.me/${prefix}${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
