import { useWorkspace } from './WorkspaceContext';
import { appCards } from '@/data/workspace';

export function WorkspaceApps() {
  const { currentOrg, can, setActiveApp, setActiveView } = useWorkspace();

  const categories = [...new Set(appCards.map((a) => a.category))];
  const activeSlugs = currentOrg?.activeApps ?? [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-text">Apps</h1>
        <p className="text-sm text-muted mt-1">
          {activeSlugs.length} apps available on {currentOrg?.name}
        </p>
      </div>

      {categories.map((category) => {
        const appsInCategory = appCards.filter(
          (a) => a.category === category && (can('admin') || activeSlugs.includes(a.slug))
        );
        if (appsInCategory.length === 0) return null;
        return (
          <div key={category}>
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {appsInCategory.map((app) => {
                const Icon = app.icon;
                const isActive = activeSlugs.includes(app.slug);
                return (
                  <button
                    key={app.slug}
                    onClick={() => { setActiveApp(app.slug); setActiveView('apps'); }}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer group relative text-left w-full ${
                      isActive
                        ? 'glass border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.05]'
                        : 'bg-white/[0.015] border-white/[0.04] opacity-50'
                    }`}
                  >
                    {!isActive && (
                      <span className="absolute top-2 right-2 text-[9px] font-medium text-muted px-1.5 py-0.5 rounded-full bg-white/[0.04]">
                        Off
                      </span>
                    )}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.color} to-transparent border border-white/[0.08] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-text" />
                    </div>
                    <h3 className="text-sm font-semibold text-text">{app.name}</h3>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed line-clamp-2">{app.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
