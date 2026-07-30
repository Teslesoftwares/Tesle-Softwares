import { motion, AnimatePresence } from 'framer-motion';
import { WorkspaceProvider, useWorkspace } from '@/components/workspace/WorkspaceContext';
import { WorkspaceHome } from '@/components/workspace/WorkspaceHome';
import { WorkspaceApps } from '@/components/workspace/WorkspaceApps';
import { WorkspaceProductView } from '@/components/workspace/WorkspaceProductView';
import {
  WorkspaceAI, WorkspaceAnalytics, WorkspaceNotificationsList,
  WorkspaceFiles, WorkspaceMarketplace, WorkspaceSupport,
  WorkspaceSettingsPage,
} from '@/components/workspace/placeholder-views';
import { AIProvider } from '@/components/ai/AIContext';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function WorkspaceContent() {
  const { activeView, activeApp } = useWorkspace();

  const views: Record<string, React.ReactNode> = {
    home: <WorkspaceHome />,
    apps: activeApp ? <WorkspaceProductView /> : <WorkspaceApps />,
    ai: <WorkspaceAI />,
    analytics: <WorkspaceAnalytics />,
    notifications: <WorkspaceNotificationsList />,
    files: <WorkspaceFiles />,
    marketplace: <WorkspaceMarketplace />,
    support: <WorkspaceSupport />,
    settings: <WorkspaceSettingsPage />,
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView + (activeApp || '')}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {views[activeView] || <WorkspaceHome />}
        </motion.div>
      </AnimatePresence>
      <AIAssistant />
    </>
  );
}

export default function Workspace() {
  return (
    <ErrorBoundary>
      <WorkspaceProvider>
        <AIProvider>
          <WorkspaceContent />
        </AIProvider>
      </WorkspaceProvider>
    </ErrorBoundary>
  );
}
