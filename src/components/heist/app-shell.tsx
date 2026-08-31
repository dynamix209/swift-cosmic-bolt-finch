import { fmt } from "@/lib/heist/data";
import { useHeist, type TabId } from "@/lib/heist/store";
import { Crest } from "./fx";
import {
  AdminPanel,
  BoardPanel,
  EventsPanel,
  GuidePanel,
  HoursBanner,
  ModulesPanel,
  ShopPanel,
  VaultPanel,
} from "./panels";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "shop", label: "Shop" },
  { id: "dash", label: "Vault" },
  { id: "modules", label: "Modules" },
  { id: "events", label: "Events" },
  { id: "board", label: "Leaderboard" },
  { id: "guide", label: "How it works" },
  { id: "admin", label: "Admin" },
];

export function AppShell() {
  const teamId = useHeist((s) => s.currentTeamId);
  const team = useHeist((s) => (s.currentTeamId ? s.teams[s.currentTeamId] : null));
  const eventDay = useHeist((s) => s.eventDay);
  const tab = useHeist((s) => s.tab);
  const setTab = useHeist((s) => s.setTab);
  const logout = useHeist((s) => s.logout);
  const pending = useHeist((s) => s.requests.reduce((n, r) => n + (r.status === "pending" ? 1 : 0), 0));

  if (!team || !teamId) return null;

  return (
    <div className="wrap">
      <div className="topbar pxframe">
        <div className="brand">
          <Crest title="you found me" />
          <div className="brandtext">
            <div className="eyebrow">Beaconhouse Notion of Academia</div>
            <h1>
              HEIST <span>EXCHANGE</span>
            </h1>
            <div className="sub">Excellentia per Dominium</div>
          </div>
        </div>
        <div className="teaminfo">
          <span className="pill tip">
            {teamId}
            <span className="tip-bubble">{team.name} · {team.email}</span>
          </span>
          <span className="pill day">DAY {eventDay}</span>
          <span className="pill points">{fmt(team.points)} PTS</span>
          <span className="pill balance">
            <img className="coinicon" src="/coin.png" alt="" />
            {fmt(team.balance)}
          </span>
          <button className="tab-btn" onClick={logout} style={{ fontSize: 11, padding: "8px 12px" }}>
            Switch team
          </button>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab-btn ${tab === t.id ? "active" : ""}`}
            data-tab={t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === "admin" && pending > 0 ? <span className="badge-count">{pending}</span> : null}
          </button>
        ))}
      </div>

      <HoursBanner />

      {tab === "shop" && <ShopPanel />}
      {tab === "dash" && <VaultPanel />}
      {tab === "modules" && <ModulesPanel />}
      {tab === "events" && <EventsPanel />}
      {tab === "board" && <BoardPanel />}
      {tab === "guide" && <GuidePanel />}
      {tab === "admin" && <AdminPanel />}
    </div>
  );
}
