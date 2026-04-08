// Clinic configuration — update these values to reflect actual clinic details

export const CLINIC = {
  name: 'Clinic Mediviron Jalan Imbi',
  shortName: 'Mediviron',
  tagline: 'Your Trusted Family Clinic in Jalan Imbi',
  area: 'Jalan Imbi',

  // Contact — replace placeholders with real values
  phone: '+60X-XXXX XXXX',
  whatsapp: '60XXXXXXXXXX', // digits only, no + or spaces, used in wa.me links
  email: '',

  // Address
  address: '[Full address placeholder]',
  city: 'Kuala Lumpur',
  postcode: '55100',
  state: 'Wilayah Persekutuan',
  fullAddress: 'Jalan Imbi, 55100 Kuala Lumpur',

  // Operating hours
  hours: {
    weekdays: 'Monday to Friday: 8:30am – 6:00pm',
    saturday: 'Saturday: 8:30am – 1:00pm',
    sunday: 'Sunday & Public Holidays: Closed',
    weekdaysShort: 'Mon–Fri: 8:30am – 6:00pm',
    saturdayShort: 'Sat: 8:30am – 1:00pm',
  },

  // SEO
  defaultTitle: 'Clinic Mediviron Jalan Imbi | Family Clinic KL',
  defaultDescription:
    'Trusted family clinic in Jalan Imbi, Kuala Lumpur. General practice, ECG, ultrasound. Walk-ins welcome. Book via WhatsApp.',

  // Google Maps — replace with actual embed src URL
  mapsEmbedUrl: '',

  // Social / external
  googleMapsUrl: '',
} as const;

/** Returns the full WhatsApp deep-link URL */
export const whatsappUrl = (message = '') =>
  `https://wa.me/${CLINIC.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
