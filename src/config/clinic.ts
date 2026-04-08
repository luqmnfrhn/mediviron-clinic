// Clinic configuration — update these values to reflect actual clinic details

export const CLINIC = {
  name: 'Clinic Mediviron Jalan Imbi',
  shortName: 'Clinic Mediviron',
  tagline: 'Your Trusted Family Clinic in Jalan Imbi',
  area: 'Jalan Imbi',

  // Contact — replace placeholders with real values
  phone: '+6019-931 7375', // for display only, can include + and spaces
  whatsapp: '60199317375', // digits only, no + or spaces, used in wa.me links
  email: '',

  // Address
  address: 'No 8, Jalan Utara,Off Jalan Imbi',
  city: 'Kuala Lumpur',
  postcode: '55100',
  state: 'Wilayah Persekutuan',
  fullAddress: '55100 Kuala Lumpur',

  // Operating hours
  hours: {
    weekdays: 'Monday to Friday: 8:30am – 8:30pm',
    saturday: 'Saturday: 9:00am – 4:30pm',
    sunday: 'Sunday & Public Holidays: 9:00am – 4:30pm',
    weekdaysShort: 'Mon–Fri: 8:30am – 6:00pm',
    saturdayShort: 'Sat: 8:30am – 1:00pm',
    weekend_public: 'Saturday, Sunday & Public Holidays: 9:00am – 4:30pm',
  },

  // SEO
  defaultTitle: 'Clinic Mediviron Jalan Imbi | Family Clinic KL',
  defaultDescription:
    'Trusted family clinic in Jalan Imbi, Kuala Lumpur. General practice, ECG, ultrasound. Walk-ins welcome. Book via WhatsApp.',

  // Google Maps — replace with actual embed src URL
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8074136641053!2d101.71305477753576!3d3.1454703968299547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362e67a7459d%3A0x7d7482ddb385131b!2s10%2C%20Jalan%20Utara%2C%20Imbi%2C%2055100%20Kuala%20Lumpur%2C%20Wilayah%20Persekutuan%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1775661874070!5m2!1sen!2smy',

  // Social / external
  googleMapsUrl: 'https://www.google.com/maps/dir//3.1459791,101.7152223/@3.0212096,101.7905152,14z?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D',
} as const;

/** Returns the full WhatsApp deep-link URL */
export const whatsappUrl = (message = '') =>
  `https://wa.me/${CLINIC.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
