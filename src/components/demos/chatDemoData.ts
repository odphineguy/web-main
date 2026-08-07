export interface ChatMessage {
  type: 'bot' | 'user';
  text: string;
  delay: number;
}

export interface DemoConfig {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  accentColor: string;
}

// Bilingual restaurant demo for hero section
export const bilingualDemo: DemoConfig = {
  id: 'bilingual',
  name: 'Casa Oaxaca',
  subtitle: 'Reservaciones y menú',
  avatar: '🌶️',
  accentColor: 'orange',
};

export const bilingualConversations: Record<'es' | 'en', ChatMessage[]> = {
  es: [
    { type: 'bot', text: '¡Hola! Bienvenido a Casa Oaxaca. ¿En qué puedo ayudarte hoy?', delay: 2000 },
    { type: 'user', text: 'Hola, quisiera hacer una reservación para el sábado', delay: 4000 },
    { type: 'bot', text: '¡Con mucho gusto! El sábado es muy popular. ¿Para cuántas personas sería la reservación?', delay: 2500 },
    { type: 'user', text: 'Somos 4 personas, como a las 7pm', delay: 3500 },
    { type: 'bot', text: 'Perfecto, tenemos disponibilidad a las 7:00pm para 4 personas. ¿Me puedes dar tu nombre y número de teléfono para confirmar?', delay: 2800 },
    { type: 'user', text: 'Soy María García, 555-234-5678', delay: 3500 },
    { type: 'bot', text: '¡Listo, María! Tu reservación está confirmada:\n\nSábado, 7:00pm\n4 personas\nCasa Oaxaca\n\n¿Te gustaría ver nuestras especialidades del día?', delay: 3000 },
    { type: 'user', text: 'Sí, ¿qué me recomiendas?', delay: 3500 },
    { type: 'bot', text: '¡Te van a encantar! Este sábado tenemos:\n\n• Mole negro oaxaqueño\n• Tacos de barbacoa\n• Chiles en nogada (de temporada)\n\nTodos vienen con arroz, frijoles y tortillas hechas a mano. ¡Los esperamos!', delay: 3000 },
  ],
  en: [
    { type: 'bot', text: 'Hi there! Welcome to Casa Oaxaca. How can I help you today?', delay: 2000 },
    { type: 'user', text: "Hi, I'd like to make a reservation for Saturday", delay: 4000 },
    { type: 'bot', text: 'Wonderful! Saturday is very popular. How many people will be dining?', delay: 2500 },
    { type: 'user', text: 'There will be 4 of us, around 7pm', delay: 3500 },
    { type: 'bot', text: 'Perfect, we have availability at 7:00pm for 4 guests. Can I get your name and phone number to confirm?', delay: 2800 },
    { type: 'user', text: "It's Maria Garcia, 555-234-5678", delay: 3500 },
    { type: 'bot', text: 'All set, Maria! Your reservation is confirmed:\n\nSaturday, 7:00pm\n4 guests\nCasa Oaxaca\n\nWould you like to see our specials for the day?', delay: 3000 },
    { type: 'user', text: 'Yes, what do you recommend?', delay: 3500 },
    { type: 'bot', text: "You're going to love these! This Saturday we have:\n\n• Oaxacan black mole\n• Barbacoa tacos\n• Chiles en nogada (seasonal)\n\nAll served with rice, beans, and handmade tortillas. See you soon!", delay: 3000 },
  ],
};

// Industry demos for carousel section
export const industryDemos: DemoConfig[] = [
  {
    id: 'afterhours',
    name: 'Night Owl Assistant',
    subtitle: 'Always available',
    avatar: '',
    accentColor: 'blue',
  },
  {
    id: 'dental',
    name: 'Smile Dental',
    subtitle: 'Appointment scheduling',
    avatar: '',
    accentColor: 'green',
  },
  {
    id: 'lead',
    name: 'Lead Qualifier',
    subtitle: 'Smart prospecting',
    avatar: '',
    accentColor: 'orange',
  },
];

export const industryConversations: Record<string, ChatMessage[]> = {
  afterhours: [
    { type: 'bot', text: "Hi there! Our office is currently closed, but I'm here to help. What can I assist you with tonight?", delay: 2000 },
    { type: 'user', text: 'Hi, I need to know your return policy for online orders', delay: 4000 },
    { type: 'bot', text: 'Great question! We offer a 30-day return policy for all online orders. Items must be unused and in original packaging.', delay: 2500 },
    { type: 'bot', text: 'Would you like me to email you the return label, or do you have another question I can help with?', delay: 2000 },
    { type: 'user', text: 'Can I get the return label sent to mike@email.com?', delay: 4000 },
    { type: 'bot', text: "Perfect! I've sent the return label to mike@email.com. You should receive it within 5 minutes. Is there anything else I can help you with?", delay: 2500 },
    { type: 'user', text: "That's all, thanks!", delay: 3500 },
    { type: 'bot', text: "You're welcome! Have a great night. Our team will follow up during business hours if needed.", delay: 2000 },
  ],
  dental: [
    { type: 'bot', text: "Welcome to Smile Dental! I'm here to help you schedule an appointment. Are you a new or existing patient?", delay: 2000 },
    { type: 'user', text: 'New patient. I need a cleaning and checkup', delay: 4000 },
    { type: 'bot', text: "Wonderful! We'd love to have you. For new patients, we book a comprehensive exam with cleaning – about 90 minutes.", delay: 2500 },
    { type: 'bot', text: 'Do you prefer mornings or afternoons? We have availability this week!', delay: 2000 },
    { type: 'user', text: 'Afternoons work better for me', delay: 3500 },
    { type: 'bot', text: 'I have openings on Thursday at 2:00 PM or Friday at 3:30 PM. Which works best for you?', delay: 2500 },
    { type: 'user', text: 'Thursday at 2pm please', delay: 3500 },
    { type: 'bot', text: "You're all set for Thursday at 2:00 PM with Dr. Chen. I'll send a confirmation text with new patient forms. What's the best number to reach you?", delay: 2500 },
    { type: 'user', text: '555-123-4567', delay: 3000 },
    { type: 'bot', text: 'Perfect! Confirmation sent to 555-123-4567. We look forward to seeing you Thursday!', delay: 2000 },
  ],
  lead: [
    { type: 'bot', text: 'Hey there! I noticed you were checking out our marketing automation tools. Mind if I ask what brought you here today?', delay: 2000 },
    { type: 'user', text: 'Looking for something to help with email campaigns', delay: 4000 },
    { type: 'bot', text: "Email campaigns – that's our bread and butter! Are you currently using any email marketing tools, or starting fresh?", delay: 2500 },
    { type: 'user', text: "We use Mailchimp but it's getting expensive as we grow", delay: 4000 },
    { type: 'bot', text: 'Totally hear that – we get a lot of Mailchimp switchers! Quick question: roughly how many contacts are you managing?', delay: 2500 },
    { type: 'user', text: 'About 25,000 right now', delay: 3500 },
    { type: 'bot', text: "Nice! At 25k contacts, you'd actually save about 40% compared to Mailchimp on our Growth plan – plus you get automation and CRM built in.", delay: 2500 },
    { type: 'bot', text: 'Want me to set up a quick demo with our team? They can show you how migration works – usually takes less than a day.', delay: 2000 },
    { type: 'user', text: 'Sure, that sounds helpful', delay: 3500 },
    { type: 'bot', text: 'Awesome! What email should I send the calendar link to?', delay: 2000 },
  ],
};
