import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import servicesRoutes from './routes/services.js';
import portfolioRoutes from './routes/portfolio.js';
import blogRoutes from './routes/blog.js';
import testimonialsRoutes from './routes/testimonials.js';
import careersRoutes from './routes/careers.js';
import leadsRoutes from './routes/leads.js';
import portalAuthRoutes from './routes/portal-auth.js';
import portalProjectsRoutes from './routes/portal-projects.js';
import portalTicketsRoutes from './routes/portal-tickets.js';
import portalFilesRoutes from './routes/portal-files.js';
import portalInvoicesRoutes from './routes/portal-invoices.js';
import portalMeetingsRoutes from './routes/portal-meetings.js';
import portalNotificationsRoutes from './routes/portal-notifications.js';
import portalAiRoutes from './routes/portal-ai.js';
import { runMigrations } from './schema.js';

const app = express();
const server = http.createServer(app);
const PORT = parseInt(process.env.PORT || '3001', 10);

const corsOpts = { origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], credentials: true };

app.use(cors(corsOpts));
app.use(express.json({ limit: '10mb' }));

const io = new Server(server, { cors: corsOpts });

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (clientId: number) => {
    socket.join(`client-${clientId}`);
    console.log(`Client ${clientId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.set('io', io);

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/leads', leadsRoutes);

app.use('/api/portal/auth', portalAuthRoutes);
app.use('/api/portal/projects', portalProjectsRoutes);
app.use('/api/portal/tickets', portalTicketsRoutes);
app.use('/api/portal/files', portalFilesRoutes);
app.use('/api/portal/invoices', portalInvoicesRoutes);
app.use('/api/portal/meetings', portalMeetingsRoutes);
app.use('/api/portal/notifications', portalNotificationsRoutes);
app.use('/api/portal/ai', portalAiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export function sendNotification(clientId: number, notification: { title: string; message: string; type?: string; link?: string }) {
  io.to(`client-${clientId}`).emit('notification', notification);
}

async function start() {
  try {
    await runMigrations();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Socket.IO ready`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
