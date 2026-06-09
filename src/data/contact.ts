import type { ContactOffice, BusinessHour, ServiceInquiry, ContactWhatsApp, ContactEmail } from '@/types';
import data from './contact.json';

export const offices: ContactOffice[] = data.offices as ContactOffice[];
export const hours: BusinessHour[] = data.hours as BusinessHour[];
export const serviceInquiries: ServiceInquiry[] = data.serviceInquiries as ServiceInquiry[];
export const whatsapp: ContactWhatsApp = data.whatsapp as ContactWhatsApp;
export const email: ContactEmail = data.email as ContactEmail;

export const WHATSAPP_NUMBER = whatsapp.number;
export const WHATSAPP_MSG = encodeURIComponent(whatsapp.message);

export function getWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
}
