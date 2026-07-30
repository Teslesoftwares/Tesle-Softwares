import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  currentUser as defaultUser, organizations as defaultOrgs, hasPermission,
  type WorkspaceUser, type WorkspaceOrg, type WorkspaceRole,
} from '@/data/workspace';

interface WorkspaceContextType {
  user: WorkspaceUser;
  organizations: WorkspaceOrg[];
  currentOrg: WorkspaceOrg | undefined;
  setCurrentOrg: (org: WorkspaceOrg) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  activeApp: string | null;
  setActiveApp: (app: string | null) => void;
  can: (role: WorkspaceRole) => boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [user] = useState<WorkspaceUser>(defaultUser);
  const [organizations] = useState<WorkspaceOrg[]>(defaultOrgs);
  const [currentOrg, setCurrentOrg] = useState<WorkspaceOrg | undefined>(
    () => defaultOrgs.find((o) => o.id === defaultUser.currentOrgId)
  );
  const [activeView, setActiveView] = useState('home');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const org = organizations.find((o) => o.id === user.currentOrgId);
    if (org) setCurrentOrg(org);
  }, [user.currentOrgId, organizations]);

  return (
    <WorkspaceContext.Provider
      value={{
        user, organizations, currentOrg, setCurrentOrg,
        activeView, setActiveView, activeApp, setActiveApp,
        can: (role: WorkspaceRole) => hasPermission(user.role, role),
        sidebarCollapsed, setSidebarCollapsed,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}
