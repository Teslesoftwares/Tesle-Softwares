import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const aiResponses: Record<string, string> = {
  project: 'You can view all your projects on the Dashboard. Each project shows progress, milestones, and deadlines.',
  ticket: 'To create a support ticket, go to the Tickets page and click "New Ticket". Our team will respond within 24 hours.',
  invoice: 'All your invoices are available on the Invoices page. You can view amounts, due dates, and payment status.',
  meeting: 'To schedule a meeting, go to the Meetings page and click "Schedule Meeting". You will receive a confirmation with the meeting link.',
  file: 'Files shared with you are available on the Files page. You can upload and download project-related documents.',
  notification: 'Notifications keep you updated on project progress, ticket responses, and upcoming meetings.',
  payment: 'Payments can be made via bank transfer or mobile money. Invoice details are available on the Invoices page.',
  deadline: 'Your project deadlines are visible on each project detail page. We send reminders before important dates.',
};

router.post('/chat', async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'default-secret');
  } catch { res.status(401).json({ error: 'Invalid token' }); return; }

  const { message } = req.body;
  if (!message) { res.status(400).json({ error: 'Message is required' }); return; }

  const msg = message.toLowerCase();
  let reply = '';

  if (msg.includes('project') || msg.includes('milestone')) {
    reply = aiResponses.project;
  } else if (msg.includes('ticket') || msg.includes('support') || msg.includes('help')) {
    reply = aiResponses.ticket;
  } else if (msg.includes('invoice') || msg.includes('bill') || msg.includes('pay')) {
    reply = aiResponses.invoice;
  } else if (msg.includes('meeting') || msg.includes('schedule') || msg.includes('appointment')) {
    reply = aiResponses.meeting;
  } else if (msg.includes('file') || msg.includes('document') || msg.includes('upload')) {
    reply = aiResponses.file;
  } else if (msg.includes('notification') || msg.includes('alert')) {
    reply = aiResponses.notification;
  } else if (msg.includes('deadline') || msg.includes('due') || msg.includes('progress')) {
    reply = aiResponses.deadline;
  } else {
    reply = 'I am Tesle AI Assistant. I can help you with: projects, support tickets, invoices, meetings, file sharing, notifications, and deadlines. How can I assist you today?';
  }

  res.json({ reply });
});

export default router;
