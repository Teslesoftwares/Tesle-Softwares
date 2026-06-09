import 'dotenv/config';
import { query } from './db.js';

async function seedPortalData() {
  const client = await query("SELECT id FROM client_users WHERE email = 'client@tesle.ai'");
  const clientId = client.rows[0]?.id;
  if (!clientId) { console.log('No client found.'); process.exit(1); }

  const existing = await query('SELECT id FROM client_projects WHERE client_id = $1', [clientId]);
  if (existing.rows.length > 0) { console.log('Data already seeded.'); process.exit(0); }

  // Projects
  const p1 = await query(
    `INSERT INTO client_projects (client_id, title, description, status, progress, start_date, deadline, budget)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [clientId, 'Website Redesign', 'Complete overhaul of the corporate website with modern UI/UX, responsive design, and CMS integration.', 'active', 65, '2026-01-15', '2026-07-30', 25000]
  );
  const p2 = await query(
    `INSERT INTO client_projects (client_id, title, description, status, progress, start_date, deadline, budget)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [clientId, 'Mobile App Development', 'Cross-platform mobile application for customer engagement and order management.', 'active', 30, '2026-03-01', '2026-09-15', 45000]
  );
  const p3 = await query(
    `INSERT INTO client_projects (client_id, title, description, status, progress, start_date, deadline, budget)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [clientId, 'SEO & Digital Marketing', 'Comprehensive SEO strategy and digital marketing campaign.', 'completed', 100, '2025-09-01', '2026-02-28', 12000]
  );

  // Milestones
  await query(
    `INSERT INTO project_milestones (project_id, title, description, due_date, completed, completed_date) VALUES
     ($1, 'Research & Planning', 'Market research and project planning', '2026-02-01', true, '2026-01-28'),
     ($1, 'Wireframing', 'Create wireframes for all pages', '2026-03-01', true, '2026-02-25'),
     ($1, 'UI Design', 'Design high-fidelity mockups', '2026-04-15', true, '2026-04-10'),
     ($1, 'Frontend Development', 'Build React components', '2026-06-01', false, NULL),
     ($1, 'Backend Integration', 'Connect to API and CMS', '2026-07-15', false, NULL),
     ($1, 'Testing & Launch', 'QA testing and deployment', '2026-07-30', false, NULL)`,
    [p1.rows[0].id]
  );
  await query(
    `INSERT INTO project_milestones (project_id, title, description, due_date, completed, completed_date) VALUES
     ($1, 'Requirements', 'Gather app requirements', '2026-03-15', true, '2026-03-12'),
     ($1, 'UI/UX Design', 'Design mobile interfaces', '2026-05-01', false, NULL),
     ($1, 'Development', 'Build cross-platform app', '2026-07-01', false, NULL),
     ($1, 'Testing', 'QA and beta testing', '2026-08-15', false, NULL),
     ($1, 'Deployment', 'App store submission', '2026-09-15', false, NULL)`,
    [p2.rows[0].id]
  );

  // Support tickets
  await query(
    `INSERT INTO support_tickets (client_id, project_id, subject, description, priority, status) VALUES
     ($1, $2, 'Homepage animation not loading', 'The hero animation on the homepage is not rendering correctly on Safari browser.', 'high', 'open'),
     ($1, $2, 'API integration question', 'Need documentation for the payment gateway API integration.', 'medium', 'in-progress')`,
    [clientId, p1.rows[0].id]
  );

  // Ticket comments
  const ticket = await query('SELECT id FROM support_tickets WHERE client_id = $1 LIMIT 1', [clientId]);
  if (ticket.rows[0]) {
    await query(
      `INSERT INTO ticket_comments (ticket_id, client_id, message, is_admin) VALUES
       ($1, $2, 'I noticed the animation works on Chrome but not Safari. Any ideas?', false)`,
      [ticket.rows[0].id, clientId]
    );
    await query(
      `INSERT INTO ticket_comments (ticket_id, admin_id, message, is_admin) VALUES
       ($1, 1, 'We are aware of this issue. Our team is working on a Safari-compatible fix. Expected ETA is 2 days.', true)`,
      [ticket.rows[0].id]
    );
  }

  // Invoices
  await query(
    `INSERT INTO invoices (client_id, project_id, invoice_number, amount, description, status, issue_date, due_date, paid_date) VALUES
     ($1, $2, 'INV-2026-001', 12500, 'Website Redesign - 50% deposit', 'paid', '2026-01-15', '2026-02-15', '2026-01-28'),
     ($1, $2, 'INV-2026-002', 6250, 'Website Redesign - 25% milestone', 'pending', '2026-04-15', '2026-05-15', NULL),
     ($1, $3, 'INV-2026-003', 12000, 'SEO & Digital Marketing - Full payment', 'paid', '2025-09-01', '2025-10-01', '2025-09-20')`,
    [clientId, p1.rows[0].id, p3.rows[0].id]
  );

  // Meetings
  await query(
    `INSERT INTO meetings (client_id, title, description, meeting_date, duration, status) VALUES
     ($1, 'Weekly Review', 'Weekly project progress review', NOW() + INTERVAL '2 days', 30, 'scheduled'),
     ($1, 'Design Review', 'Review homepage design mockups', NOW() - INTERVAL '5 days', 45, 'completed')`,
    [clientId]
  );

  // Notifications
  await query(
    `INSERT INTO notifications (client_id, title, message, type) VALUES
     ($1, 'Milestone Completed', 'Research & Planning milestone has been marked as complete.', 'milestone'),
     ($1, 'Ticket Updated', 'Your support ticket "Homepage animation not loading" has a new response.', 'ticket'),
     ($1, 'Meeting Reminder', 'Weekly Review meeting is scheduled in 2 days.', 'meeting')`,
    [clientId]
  );

  // File share
  await query(
    `INSERT INTO file_shares (client_id, project_id, file_name, file_size, file_type, file_url, uploaded_by) VALUES
     ($1, $2, 'Website Wireframes.pdf', 2450000, 'application/pdf', 'https://drive.google.com/example-wireframes', 'admin'),
     ($1, $2, 'Brand Guidelines.pdf', 1800000, 'application/pdf', 'https://drive.google.com/example-brand', 'admin')`,
    [clientId, p1.rows[0].id]
  );

  console.log('✓ Portal seed data inserted.');
  process.exit(0);
}

seedPortalData().catch((err) => { console.error(err); process.exit(1); });
