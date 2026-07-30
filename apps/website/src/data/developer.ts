export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
}

export interface SDK {
  language: string;
  package: string;
  install: string;
  docs: string;
  repo: string;
}

export interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  code?: string;
}

export interface DevSection {
  id: string;
  enabled: boolean;
}

/**
 * Developer portal data.
 * Backend integration: Replace this file with API calls to your backend.
 * Endpoints would be:
 *   GET /api/developer/quickstart
 *   GET /api/developer/endpoints
 *   GET /api/developer/sdks
 *   GET /api/developer/examples
 *   GET /api/developer/status
 * etc.
 */

export const quickStartSteps: QuickStartStep[] = [
  { step: 1, title: 'Get API Keys', description: 'Sign up for a Tesle account and generate your API keys from the Developer Dashboard. You\'ll receive a public key and a secret key.', code: '# Keys are generated from the dashboard\nexport TESLE_PUBLIC_KEY="pk_live_abc123"\nexport TESLE_SECRET_KEY="sk_live_xyz789"' },
  { step: 2, title: 'Install the SDK', description: 'Install the Tesle SDK for your preferred language. We support JavaScript, Python, PHP, Go, Ruby, and .NET.', code: 'npm install @tesle/sdk\n# or\nyarn add @tesle/sdk' },
  { step: 3, title: 'Make Your First Call', description: 'Authenticate and make your first API call. Start with listing companies or creating a contact.', code: `import Tesle from '@tesle/sdk';\n\nconst tesle = new Tesle({ secretKey: 'sk_live_xyz789' });\n\nconst companies = await tesle.companies.list();\nconsole.log(companies);` },
  { step: 4, title: 'Handle Webhooks', description: 'Set up webhook endpoints to receive real-time events when things happen in Tesle.', code: `const express = require('express');\nconst app = express();\n\napp.post('/webhooks/tesle', (req, res) => {\n  const event = req.body;\n  // Handle the event\n  res.status(200).end();\n});` },
  { step: 5, title: 'Go to Production', description: 'Move from sandbox to production. Update your API keys, verify your webhook endpoints, and monitor your usage.' },
];

export const restEndpoints: Endpoint[] = [
  { method: 'GET', path: '/api/v1/companies', description: 'List all companies' },
  { method: 'POST', path: '/api/v1/companies', description: 'Create a company' },
  { method: 'GET', path: '/api/v1/companies/{id}', description: 'Retrieve a company' },
  { method: 'PUT', path: '/api/v1/companies/{id}', description: 'Update a company' },
  { method: 'DELETE', path: '/api/v1/companies/{id}', description: 'Delete a company' },
  { method: 'GET', path: '/api/v1/contacts', description: 'List all contacts' },
  { method: 'POST', path: '/api/v1/contacts', description: 'Create a contact' },
  { method: 'GET', path: '/api/v1/contacts/{id}', description: 'Retrieve a contact' },
  { method: 'PUT', path: '/api/v1/contacts/{id}', description: 'Update a contact' },
  { method: 'GET', path: '/api/v1/invoices', description: 'List all invoices' },
  { method: 'POST', path: '/api/v1/invoices', description: 'Create an invoice' },
  { method: 'GET', path: '/api/v1/invoices/{id}', description: 'Retrieve an invoice' },
  { method: 'POST', path: '/api/v1/invoices/{id}/pay', description: 'Pay an invoice' },
  { method: 'GET', path: '/api/v1/products', description: 'List all products' },
  { method: 'POST', path: '/api/v1/products', description: 'Create a product' },
  { method: 'GET', path: '/api/v1/users', description: 'List all users' },
  { method: 'POST', path: '/api/v1/users/invite', description: 'Invite a user' },
  { method: 'GET', path: '/api/v1/webhooks', description: 'List webhook endpoints' },
  { method: 'POST', path: '/api/v1/webhooks', description: 'Create a webhook endpoint' },
  { method: 'GET', path: '/api/v1/reports', description: 'List saved reports' },
];

export const sdkList: SDK[] = [
  { language: 'JavaScript (Node.js)', package: '@tesle/sdk', install: 'npm install @tesle/sdk', docs: '/developers/docs/js', repo: 'https://github.com/tesle/tesle-js' },
  { language: 'Python', package: 'tesle-sdk', install: 'pip install tesle-sdk', docs: '/developers/docs/python', repo: 'https://github.com/tesle/tesle-python' },
  { language: 'PHP', package: 'tesle/tesle-php', install: 'composer require tesle/tesle-php', docs: '/developers/docs/php', repo: 'https://github.com/tesle/tesle-php' },
  { language: 'Go', package: 'github.com/tesle/tesle-go', install: 'go get github.com/tesle/tesle-go', docs: '/developers/docs/go', repo: 'https://github.com/tesle/tesle-go' },
  { language: 'Ruby', package: 'tesle-ruby', install: 'gem install tesle-ruby', docs: '/developers/docs/ruby', repo: 'https://github.com/tesle/tesle-ruby' },
  { language: '.NET', package: 'Tesle.Sdk', install: 'dotnet add package Tesle.Sdk', docs: '/developers/docs/dotnet', repo: 'https://github.com/tesle/tesle-dotnet' },
];

export const codeExamples: CodeExample[] = [
  { title: 'Create an Invoice', description: 'Generate and send an invoice to a customer.', language: 'javascript', code: `const invoice = await tesle.invoices.create({\n  customerId: 'cust_abc123',\n  items: [\n    { description: 'Consulting', amount: 50000, currency: 'NGN' },\n    { description: 'Software License', amount: 120000, currency: 'NGN' },\n  ],\n  dueDate: '2026-08-15',\n});\n\nconsole.log(invoice.id); // inv_xyz789` },
  { title: 'List Companies with Filter', description: 'Fetch companies filtered by country and status.', language: 'javascript', code: `const companies = await tesle.companies.list({\n  country: 'NG',\n  status: 'active',\n  limit: 20,\n  offset: 0,\n});\n\ncompanies.data.forEach(c => {\n  console.log(c.name, c.taxId);\n});` },
  { title: 'Handle a Webhook Event', description: 'Verify and process an incoming webhook payload.', language: 'javascript', code: `const crypto = require('crypto');\n\nfunction verifyWebhook(payload, signature, secret) {\n  const expected = crypto\n    .createHmac('sha256', secret)\n    .update(JSON.stringify(payload))\n    .digest('hex');\n  return crypto.timingSafeEqual(\n    Buffer.from(signature),\n    Buffer.from(expected)\n  );\n}` },
  { title: 'GraphQL Query', description: 'Fetch related resources in a single query.', language: 'graphql', code: `{\n  company(id: "comp_abc123") {\n    name\n    email\n    contacts {\n      firstName\n      lastName\n      email\n    }\n    invoices(limit: 5) {\n      total\n      status\n      dueDate\n    }\n  }\n}` },
  { title: 'Bulk Product Import', description: 'Import multiple products in a batch operation.', language: 'python', code: `import tesle\n\ntesle.api_key = "sk_live_xyz789"\n\nproducts = [\n  {"name": "Widget A", "price": 2500, "currency": "NGN"},\n  {"name": "Widget B", "price": 4500, "currency": "NGN"},\n  {"name": "Widget C", "price": 3200, "currency": "NGN"},\n]\n\nfor product in products:\n    tesle.Product.create(**product)\n    print(f"Created {product['name']}")` },
  { title: 'Search Contacts', description: 'Full-text search across contacts with pagination.', language: 'javascript', code: `const results = await tesle.contacts.search({\n  query: 'john doe',\n  filters: { tags: ['lead', 'active'] },\n  sort: { field: 'createdAt', order: 'desc' },\n  page: 1,\n  perPage: 20,\n});\n\nconsole.log(\n  results.total, 'results found'\n);` },
];

export interface StatusMetric {
  label: string;
  value: string;
  status: 'operational' | 'degraded' | 'outage';
}

export const statusMetrics: StatusMetric[] = [
  { label: 'API Availability', value: '99.99%', status: 'operational' },
  { label: 'API Response Time', value: '145ms', status: 'operational' },
  { label: 'Webhook Delivery', value: '99.97%', status: 'operational' },
  { label: 'Platform Uptime', value: '99.99%', status: 'operational' },
];

export const communityLinks = [
  { name: 'GitHub', url: 'https://github.com/tesle', icon: 'github', description: 'Open-source SDKs, examples, and contributions.' },
  { name: 'Discord', url: 'https://discord.gg/tesle', icon: 'message-square', description: 'Real-time chat with the Tesle engineering team.' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/questions/tagged/tesle', icon: 'layers', description: 'Browse answers or ask your own question.' },
  { name: 'Dev Blog', url: '/blog', icon: 'book-open', description: 'Engineering deep dives, tutorials, and product updates.' },
];

export const authMethods = [
  { title: 'API Keys', description: 'Simple key-based authentication for server-to-server integrations. Include your secret key in the Authorization header.', code: 'Authorization: Bearer sk_live_abc123' },
  { title: 'OAuth 2.0', description: 'OAuth 2.0 for third-party applications that need to act on behalf of Tesle users. Supports authorization code and client credentials flows.', code: 'GET https://api.tesle.ai/oauth/authorize?\n  response_type=code&\n  client_id=client_abc&\n  redirect_uri=https://yourapp.com/callback' },
  { title: 'Personal Access Tokens', description: 'Generate scoped tokens for CI/CD pipelines, CLI tools, and automation scripts. Each token has configurable permissions and expiry.', code: '# Generate a token with specific scopes\ntesle tokens create --scopes "invoices:read,contacts:write" --expires 90d' },
];

export const graphQLIntro = {
  endpoint: 'https://api.tesle.ai/graphql',
  description: 'Tesle offers a GraphQL API that lets you fetch exactly the data you need in a single request. Query across companies, contacts, invoices, products, and more.',
  features: [
    'Single endpoint: https://api.tesle.ai/graphql',
    'Real-time subscriptions for live updates',
    'Introspection support for GraphQL tooling',
    'Request batching and persisted queries',
  ],
};

export const webhookEvents = [
  { event: 'company.created', description: 'A new company is created' },
  { event: 'company.updated', description: 'A company\'s information is updated' },
  { event: 'contact.created', description: 'A new contact is added' },
  { event: 'contact.updated', description: 'A contact\'s information is updated' },
  { event: 'invoice.created', description: 'A new invoice is generated' },
  { event: 'invoice.paid', description: 'An invoice has been paid in full' },
  { event: 'invoice.overdue', description: 'An invoice has passed its due date' },
  { event: 'invoice.cancelled', description: 'An invoice has been cancelled' },
  { event: 'payment.failed', description: 'A payment attempt has failed' },
  { event: 'payment.received', description: 'A payment has been successfully received' },
];

export const baseConfig = {
  apiBaseUrl: 'https://api.tesle.ai',
  docsBaseUrl: 'https://docs.tesle.ai',
  sandboxUrl: 'https://sandbox.tesle.ai',
  statusUrl: 'https://status.tesle.ai',
  version: 'v1',
};
