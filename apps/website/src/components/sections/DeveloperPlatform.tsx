import { motion } from 'framer-motion';
import { Code2, BookOpen, Webhook, Terminal, Puzzle, MessageSquare } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ExpandableCard } from '@/components/ui/ExpandableCard';
import { Button } from '@/components/ui/Button';

const resources = [
  { icon: Code2, title: 'REST & GraphQL APIs', description: 'Comprehensive API gateway with REST and GraphQL endpoints for every module. Rate-limited, authenticated, and documented with OpenAPI specs.' },
  { icon: Puzzle, title: 'SDKs & Libraries', description: 'Native SDKs for Python, Node.js, PHP, Java, Go, and .NET. Pre-built libraries that reduce integration time from weeks to hours.' },
  { icon: Webhook, title: 'Webhooks & Events', description: 'Real-time event-driven architecture with configurable webhooks. Subscribe to any platform event and trigger your own workflows.' },
  { icon: Terminal, title: 'CLI Tools', description: 'Command-line interface for provisioning, deployment, data migrations, and CI/CD pipeline integration. Automate every aspect of your Tesle instance.' },
  { icon: BookOpen, title: 'Documentation', description: 'Interactive API playgrounds, step-by-step integration guides, architecture patterns, and best practices for building on Tesle.' },
  { icon: MessageSquare, title: 'Developer Community', description: 'Active developer forum, community-contributed packages, monthly hackathons, and direct access to Tesle engineering team.' },
];

export default function DeveloperPlatform() {
  return (
    <section id="developers" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="Developer Platform"
          title="Build on Tesle. Extend everything."
          subtitle="Open APIs, SDKs, webhooks, and CLI tools that let your team customise, integrate, and extend the platform to fit your unique needs."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {resources.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <ExpandableCard className="!p-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{resource.description}</p>
                </ExpandableCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/developers">
            <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Explore Developer Docs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
