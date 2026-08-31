import { useEffect, useMemo, useRef, useState } from "react";
import {
  GROUP_BLURB,
  MAX_PERK_PER_MODULE,
  MODULES,
  PERKS,
  TIER_LABELS,
  costForDay,
  fmt,
  moduleById,
  perkById,
  shopIsOpen,
  type Group,
  type ModuleId,
  type PerkId,
} from "@/lib/heist/data";
import { useHeist } from "@/lib/heist/store";
import { Coin3D, attachCardTilt, toast } from "./fx";

export function HoursBanner() {
  const open = shopIsOpen();
  return (
    <div className={`hours-banner pxframe ${open ? "open" : "closed"}`}>
      <span className="hours-dot" />
      <span>
        {open
          ? "Shop is open — buy your perks now (closes at 22:00 PKT)."
          : "Shop is closed — opens daily at 18:00, closes 22:00 PKT. You can still browse."}
      </span>
    </div>
  );
}

export function ShopPanel() {
  const teamId = useHeist((s) => s.currentTeamId);
  const team = useHeist((s) => (s.currentTeamId ? s.teams[s.currentTeamId] : null));
  const eventDay = useHeist((s) => s.eventDay);
  const buyPerk = useHeist((s) => s.buyPerk);
  const approvedCountFor = useHeist((s) => s.approvedCountFor);
  const requests = useHeist((s) => s.requests);
  const [moduleId, setModuleId] = useState<ModuleId>(team?.moduleId ?? "lions-gate");
  const [targets, setTargets] = useState<Record<string, string>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const open = shopIsOpen();

  useEffect(() => {
    return attachCardTilt(gridRef.current);
  }, [eventDay, moduleId, requests, team?.balance]);

  return (
    <div className="panel">
      <div className="currency-box pxframe">
        <Coin3D />
        <div>
          <h3>BOBUX</h3>
          <p className="backronym">The official currency of HEIST / BNA</p>
          <p>
            Earn BOBUX from module performance (up to 200 per round, awarded by module heads), live events, and
            the occasional bonus. Spend it on perks — every purchase waits on a marshal. Prices rise{" "}
            <b style={{ color: "var(--color-fg)" }}>100 BOBUX</b> each event day.{" "}
            <span style={{ opacity: 0.7 }}>(Tip: give the coin a flick.)</span>
          </p>
        </div>
      </div>

      <div className="box pxframe" style={{ marginBottom: 18, padding: "16px 18px" }}>
        <div className="field" style={{ maxWidth: 420 }}>
          Buying for module
          <select value={moduleId} onChange={(e) => setModuleId(e.target.value as ModuleId)}>
            {MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <p className="small-note" style={{ marginTop: 8 }}>
          Each perk can be purchased twice per module. Pending requests do not count until a marshal approves them.
        </p>
      </div>

      <div className="grid" ref={gridRef}>
        {PERKS.map((item) => {
          const cost = costForDay(item.baseCost, eventDay);
          const approved = teamId ? approvedCountFor(teamId, item.id, moduleId) : 0;
          const soldOut = approved >= MAX_PERK_PER_MODULE;
          const affordable = team ? team.balance >= cost : true;
          const canBuy = Boolean(team) && affordable && open && !soldOut;
          let label = "BUY";
          if (!open) label = "CLOSED";
          else if (soldOut) label = "SOLD OUT";
          else if (!affordable) label = "LOCKED";

          return (
            <div key={item.id} className={`card pxframe rarity-${item.rarity}`}>
              <div className="card-head">
                <span>{item.name}</span>
                <span className="rarity-tag">{TIER_LABELS[item.rarity]}</span>
              </div>
              <div className="card-art">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="card-body">
                <div className="tagline">“{item.tagline}”</div>
                <p>{item.desc}</p>
                {item.isTarget && (
                  <div className="heist-target">
                    <input
                      type="text"
                      placeholder="Target Delegation ID"
                      value={targets[item.id] ?? ""}
                      onChange={(e) => setTargets((t) => ({ ...t, [item.id]: e.target.value }))}
                    />
                    <p className="heist-note">Requires marshal approval, like every purchase.</p>
                  </div>
                )}
                <div className="cost-row">
                  <span className="cost">
                    <img className="coinicon" src="/coin.png" alt="" />
                    {fmt(cost)}
                  </span>
                  <button
                    className="buy-btn"
                    disabled={!canBuy}
                    onClick={() => {
                      const r = buyPerk(item.id as PerkId, targets[item.id] ?? null, moduleId);
                      if (!r.ok) {
                        toast(r.error, "bad");
                        return;
                      }
                      toast(`Request sent — waiting on a marshal to approve “${item.name}”.`, "ok");
                      setTargets((t) => ({ ...t, [item.id]: "" }));
                    }}
                  >
                    {label}
                  </button>
                </div>
                <div className="sold">
                  {approved}/{MAX_PERK_PER_MODULE} approved this module
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VaultPanel() {
  const teamId = useHeist((s) => s.currentTeamId);
  const team = useHeist((s) => (s.currentTeamId ? s.teams[s.currentTeamId] : null));
  const allRequests = useHeist((s) => s.requests);
  if (!team || !teamId) return null;
  const requests = allRequests.filter((r) => r.teamId === teamId);
  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="panel">
      <div className="stat-row">
        <div className="stat">
          Balance<b>{fmt(team.balance)}</b>
        </div>
        <div className="stat">
          Module points<b>{fmt(team.points)}</b>
        </div>
        <div className="stat">
          Earned last round<b>{fmt(team.roundEarned)}</b>
        </div>
        <div className="stat">
          Pending requests<b>{pending}</b>
        </div>
      </div>

      <div className="box pxframe">
        <h2>Inventory</h2>
        <p className="small-note" style={{ marginTop: 0 }}>
          Only approved perks land here. Tickets generate after marshal approval.
        </p>
        <div className="inv-grid">
          {team.inventory.length === 0 ? (
            <div className="inv-empty">Your inventory is empty. Approved purchases show up here.</div>
          ) : (
            team.inventory.map((it) => {
              const def = perkById(it.itemId);
              const mod = it.moduleId ? moduleById(it.moduleId) : undefined;
              return (
                <div key={`${it.itemId}-${it.moduleId}`} className={`inv-slot rarity-${it.rarity}`} title={it.name}>
                  <div className="inv-slot-inner">
                    <img src={def?.img ?? ""} alt="" />
                    <div className="inv-name">{it.name}</div>
                    {mod && <div className="inv-name" style={{ opacity: 0.7 }}>{mod.name}</div>}
                  </div>
                  {(it.qty || 1) > 1 ? <span className="inv-qty">x{it.qty}</span> : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="dash-grid">
        <div className="box pxframe">
          <h2>Purchase requests</h2>
          {requests.length === 0 ? (
            <p className="empty">No requests yet — buy something in the Shop.</p>
          ) : (
            requests.map((req) => {
              const it = perkById(req.itemId);
              return (
                <div className="req-item" key={req.id}>
                  <img src={it?.img ?? ""} alt="" />
                  <div className="req-main">
                    <div className="req-name">
                      {req.itemName}
                      {req.target ? ` → ${req.target}` : ""}
                    </div>
                    <div className="req-meta">
                      {fmt(req.cost)} BOBUX · {new Date(req.timestamp).toLocaleString()}
                      {req.status === "approved" && req.token ? ` · token ${req.token}` : ""}
                      {req.note ? ` · ${req.note}` : ""}
                    </div>
                  </div>
                  <span className={`status-pill status-${req.status}`}>{req.status}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="box pxframe">
          <h2>Transaction history</h2>
          {team.history.length === 0 ? (
            <p className="empty">No transactions yet.</p>
          ) : (
            team.history.slice(0, 25).map((h, i) => (
              <div className="hist-item" key={`${h.ts}-${i}`}>
                <span>
                  {h.reason}
                  <br />
                  <span style={{ opacity: 0.6, fontSize: 11.5 }}>{new Date(h.ts).toLocaleString()}</span>
                </span>
                <span className={h.delta >= 0 ? "pos" : "neg"}>
                  {h.delta >= 0 ? "+" : ""}
                  {fmt(h.delta)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function ModulesPanel() {
  const groups: Group[] = ["Sirius", "Orion", "Polaris"];
  return (
    <div className="panel">
      <p className="section-kicker">Nine modules</p>
      <p className="section-lead">
        BNA ’26 runs nine modules across Sirius, Orion, and Polaris. Perk limits, points, and BOBUX are tracked per
        module — pick carefully before you spend.
      </p>
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 22 }}>
          <h2 style={{ margin: "0 0 6px" }}>{g}</h2>
          <p className="section-lead">{GROUP_BLURB[g]}</p>
          <div className="mod-grid">
            {MODULES.filter((m) => m.group === g).map((m) => (
              <div key={m.id} className="mod-card pxframe">
                <div className="group">{m.group}</div>
                <h3>{m.name}</h3>
                <div className="mod-field">{m.field}</div>
                <p>{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventsPanel() {
  return (
    <div className="panel">
      <p className="section-kicker">Live events</p>
      <p className="section-lead">
        Two set-pieces. One shot each. The winner walks with 200 BOBUX — enough to change how you shop.
      </p>
      <div className="event-grid">
        <div className="event-card pxframe gold-edge">
          <div className="when">Day 1 · STEM Expo</div>
          <h3>Scavenger Hunt</h3>
          <p>
            You get a to-do list of challenges around the expo. Film every completed activity into a single video no
            longer than two minutes, then submit it through Google Forms.
          </p>
          <p>Judges watch for three things:</p>
          <ul>
            <li>Video quality</li>
            <li>Creativity</li>
            <li>How quickly it was submitted</li>
          </ul>
          <div className="prize">
            <img className="coinicon" src="/coin.png" alt="" />
            Best submission wins 200 BOBUX
          </div>
        </div>
        <div className="event-card pxframe">
          <div className="when">Day 2 · The riddle trail</div>
          <h3>Escape Room</h3>
          <p>
            A series of riddles drops during the day. Solve them in order and they lead your team to a hidden escape
            room. First team to find it and actually escape takes the prize.
          </p>
          <p>No second place. Speed plus brains. Bring the whole delegation.</p>
          <div className="prize">
            <img className="coinicon" src="/coin.png" alt="" />
            First successful team wins 200 BOBUX
          </div>
        </div>
      </div>
    </div>
  );
}

export function BoardPanel() {
  const teams = useHeist((s) => s.teams);
  const rows = useMemo(
    () =>
      Object.values(teams).sort((a, b) => b.points - a.points || b.balance - a.balance),
    [teams],
  );
  return (
    <div className="panel">
      <div className="box pxframe">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Delegation</th>
              <th>Team</th>
              <th>Balance</th>
              <th>Module points</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5}>No teams yet.</td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.delegationId}>
                  <td className="rank-medal">{i < 3 ? ["1", "2", "3"][i] : `#${i + 1}`}</td>
                  <td>{row.delegationId}</td>
                  <td>{row.name}</td>
                  <td>{fmt(row.balance)}</td>
                  <td>{fmt(row.points)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GuidePanel() {
  return (
    <div className="panel">
      <div className="box pxframe">
        <h2>How the vault works</h2>
        <div className="howto-step">
          <div className="num">1</div>
          <div>
            <h4>Earn BOBUX where it counts</h4>
            <p>
              Module performance is the main source — better rounds pay more, up to 200 BOBUX per module, awarded by
              module heads. Live events pay a flat 200 to the winner. Small bonuses exist. There is no pile of free
              currency.
            </p>
          </div>
        </div>
        <div className="howto-step">
          <div className="num">2</div>
          <div>
            <h4>Live events are the swing</h4>
            <p>
              Day 1: Scavenger Hunt at the STEM Expo. Day 2: riddles into an Escape Room. Each winner takes 200 BOBUX.
              That is a Shield, or a serious down payment on Sabotage.
            </p>
          </div>
        </div>
        <div className="howto-step">
          <div className="num">3</div>
          <div>
            <h4>BOBUX and module points are different</h4>
            <p>
              Points decide the competition. BOBUX is spending money. A marshal can convert BOBUX into points at 100
              BOBUX = 50 points, plus a flat 100 BOBUX transfer fee.
            </p>
          </div>
        </div>
        <div className="howto-step">
          <div className="num">4</div>
          <div>
            <h4>Buy, wait, then use</h4>
            <p>
              Pick a perk, hit Buy. Nothing is deducted yet. A marshal approves or rejects. Approved perks enter
              Inventory, a ticket is issued, and the cost comes out of your balance. Rejected perks never enter
              inventory. Max two approved copies of each perk per module.
            </p>
          </div>
        </div>
        <div className="howto-step" style={{ borderBottom: "none" }}>
          <div className="num">5</div>
          <div>
            <h4>Know the interactions</h4>
            <p>
              Shield blocks the next Sabotage or Heist, then is consumed. Redirect sends it back. Revive stops a normal
              elimination, not a Sabotage elimination. Overdrive is points × 1.25. Time Machine is module time × 1.30.
              Call a Friend is +1 delegate. Sabotage removes one delegate for 30% of the round.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminPanel() {
  const isAdmin = useHeist((s) => s.isAdmin);
  const unlockAdmin = useHeist((s) => s.unlockAdmin);
  const [pass, setPass] = useState("");
  if (!isAdmin) {
    return (
      <div className="panel">
        <div className="login-card pxframe" style={{ margin: "24px auto" }}>
          <h2>Marshal access</h2>
          <p className="lede">Enter the event passcode. Demo passcode: marshal</p>
          <input
            type="password"
            placeholder="Passcode"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const r = unlockAdmin(pass);
                if (!r.ok) toast(r.error, "bad");
                else toast("Marshal desk unlocked.", "ok");
              }
            }}
          />
          <button
            className="action"
            onClick={() => {
              const r = unlockAdmin(pass);
              if (!r.ok) toast(r.error, "bad");
              else toast("Marshal desk unlocked.", "ok");
            }}
          >
            UNLOCK
          </button>
        </div>
      </div>
    );
  }
  return <AdminDesk />;
}

function AdminDesk() {
  const eventDay = useHeist((s) => s.eventDay);
  const teams = useHeist((s) => s.teams);
  const requests = useHeist((s) => s.requests);
  const setEventDay = useHeist((s) => s.setEventDay);
  const resolveRequest = useHeist((s) => s.resolveRequest);
  const awardBobux = useHeist((s) => s.awardBobux);
  const awardPoints = useHeist((s) => s.awardPoints);
  const adjustBobux = useHeist((s) => s.adjustBobux);
  const convertToPoints = useHeist((s) => s.convertToPoints);

  const [dayInput, setDayInput] = useState("");
  const [dayStatus, setDayStatus] = useState("");
  const pending = requests.filter((r) => r.status === "pending");

  const [awTeam, setAwTeam] = useState("");
  const [awAmount, setAwAmount] = useState("");
  const [awReason, setAwReason] = useState("");
  const [awModule, setAwModule] = useState<ModuleId | "">("");
  const [awStatus, setAwStatus] = useState("");

  const [mpTeam, setMpTeam] = useState("");
  const [mpPoints, setMpPoints] = useState("");
  const [mpReason, setMpReason] = useState("");
  const [mpStatus, setMpStatus] = useState("");

  const [admTeam, setAdmTeam] = useState("");
  const [admAmount, setAdmAmount] = useState("");
  const [admReason, setAdmReason] = useState("");
  const [admStatus, setAdmStatus] = useState("");

  const [cvTeam, setCvTeam] = useState("");
  const [cvPoints, setCvPoints] = useState("");
  const [cvStatus, setCvStatus] = useState("");
  const cvCost = (() => {
    const n = parseInt(cvPoints, 10);
    if (!Number.isInteger(n) || n < 1) return "—";
    return `${fmt(n * 2 + 100)} BOBUX`;
  })();

  const rows = Object.values(teams).sort((a, b) => a.delegationId.localeCompare(b.delegationId));

  return (
    <div className="panel">
      <div className="box pxframe daybox">
        <div>
          <h2 style={{ marginBottom: 6 }}>Event day</h2>
          <p style={{ fontSize: 14, color: "var(--color-muted)", margin: "0 0 10px" }}>
            Perk prices scale +100 BOBUX per day advanced.
          </p>
        </div>
        <span className="pill day">CURRENT: DAY {eventDay}</span>
        <div className="field" style={{ minWidth: 90 }}>
          Set day
          <input type="number" min={1} max={14} placeholder="e.g. 2" value={dayInput} onChange={(e) => setDayInput(e.target.value)} />
        </div>
        <button
          className="action ghost"
          onClick={() => {
            const n = parseInt(dayInput, 10);
            const r = setEventDay(n);
            setDayStatus(r.ok ? `Event day set to ${n}.` : r.error);
          }}
        >
          SET DAY
        </button>
        {dayStatus && <div className={`status-msg ${dayStatus.startsWith("Event") ? "status-ok" : "status-bad"}`}>{dayStatus}</div>}
      </div>

      <div className="box pxframe">
        <h2>
          Pending purchase requests{" "}
          {pending.length > 0 && <span className="badge-count">{pending.length}</span>}
        </h2>
        {pending.length === 0 ? (
          <p className="empty">All caught up.</p>
        ) : (
          pending.map((req) => {
            const it = perkById(req.itemId);
            const mod = moduleById(req.moduleId);
            return (
              <div className={`pending-card rarity-${req.rarity}`} key={req.id}>
                <img src={it?.img ?? ""} alt="" />
                <div className="pc-main">
                  <div className="pc-title">
                    {req.teamId} — {req.itemName}
                    {req.target ? ` → targeting ${req.target}` : ""}
                  </div>
                  <div className="pc-meta">
                    {fmt(req.cost)} BOBUX · {mod?.name ?? req.moduleId} · {new Date(req.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="pending-actions">
                  <button
                    className="action"
                    style={{ margin: 0 }}
                    onClick={() => {
                      const r = resolveRequest(req.id, true);
                      if (!r.ok) toast(r.error, "bad");
                      else toast(`Approved. ${r.note ?? ""}`, "ok");
                    }}
                  >
                    APPROVE
                  </button>
                  <button
                    className="action danger"
                    style={{ margin: 0 }}
                    onClick={() => {
                      const r = resolveRequest(req.id, false);
                      if (!r.ok) toast(r.error, "bad");
                      else toast("Rejected.", "ok");
                    }}
                  >
                    REJECT
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="box pxframe">
        <h2>Award module / event BOBUX</h2>
        <p style={{ fontSize: 14, color: "var(--color-muted)" }}>
          Max 200 per award. Choose the module so the ledger stays per-round. This also sets “earned last round”
          (what Heist can steal).
        </p>
        <div className="admin-row">
          <div className="field">
            Delegation ID
            <input value={awTeam} onChange={(e) => setAwTeam(e.target.value)} placeholder="Exact ID" />
          </div>
          <div className="field">
            Module
            <select value={awModule} onChange={(e) => setAwModule(e.target.value as ModuleId)}>
              <option value="">Select module</option>
              {MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            Amount (0–200)
            <input type="number" min={0} max={200} value={awAmount} onChange={(e) => setAwAmount(e.target.value)} />
          </div>
          <div className="field">
            Reason
            <input value={awReason} onChange={(e) => setAwReason(e.target.value)} placeholder="e.g. Module round" />
          </div>
          <button
            className="action"
            onClick={() => {
              const amount = parseInt(awAmount, 10);
              const reason = awReason.trim() || (awModule ? `${moduleById(awModule)?.name} award` : "BOBUX award");
              const r = awardBobux(awTeam, amount, reason);
              if (!r.ok) setAwStatus(r.error);
              else {
                setAwStatus(`Awarded ${amount} BOBUX. New balance: ${fmt(r.balance)}.`);
                setAwAmount("");
                setAwReason("");
              }
            }}
          >
            AWARD BOBUX
          </button>
        </div>
        {awStatus && <div className={`status-msg ${awStatus.startsWith("Awarded") ? "status-ok" : "status-bad"}`}>{awStatus}</div>}
      </div>

      <div className="box pxframe">
        <h2>Award module points</h2>
        <p style={{ fontSize: 14, color: "var(--color-muted)" }}>
          Record a team’s score for a module or round. Separate from BOBUX.
        </p>
        <div className="admin-row">
          <div className="field">
            Delegation ID
            <input value={mpTeam} onChange={(e) => setMpTeam(e.target.value)} />
          </div>
          <div className="field">
            Points scored
            <input type="number" min={0} value={mpPoints} onChange={(e) => setMpPoints(e.target.value)} />
          </div>
          <div className="field">
            Reason
            <input value={mpReason} onChange={(e) => setMpReason(e.target.value)} placeholder="e.g. Neumann's Matrix R2" />
          </div>
          <button
            className="action"
            onClick={() => {
              const points = parseInt(mpPoints, 10);
              const r = awardPoints(mpTeam, points, mpReason.trim() || "Module round score");
              if (!r.ok) setMpStatus(r.error);
              else {
                setMpStatus(`Logged ${points} points. Running total: ${fmt(r.points)}.`);
                setMpPoints("");
                setMpReason("");
              }
            }}
          >
            AWARD POINTS
          </button>
        </div>
        {mpStatus && <div className={`status-msg ${mpStatus.startsWith("Logged") ? "status-ok" : "status-bad"}`}>{mpStatus}</div>}
      </div>

      <div className="box pxframe">
        <h2>Manual adjustment</h2>
        <p style={{ fontSize: 14, color: "var(--color-muted)" }}>Bonuses, penalties, corrections. Does not touch last-round earnings.</p>
        <div className="admin-row">
          <div className="field">
            Delegation ID
            <input value={admTeam} onChange={(e) => setAdmTeam(e.target.value)} />
          </div>
          <div className="field">
            Amount (+/-)
            <input type="number" value={admAmount} onChange={(e) => setAdmAmount(e.target.value)} />
          </div>
          <div className="field">
            Reason
            <input value={admReason} onChange={(e) => setAdmReason(e.target.value)} />
          </div>
          <button
            className="action"
            onClick={() => {
              const amount = parseInt(admAmount, 10);
              const r = adjustBobux(admTeam, amount, admReason.trim() || "Manual adjustment");
              if (!r.ok) setAdmStatus(r.error);
              else setAdmStatus(`Applied ${amount >= 0 ? "+" : ""}${amount}. New balance: ${fmt(r.balance)}.`);
            }}
          >
            APPLY
          </button>
        </div>
        {admStatus && <div className={`status-msg ${admStatus.startsWith("Applied") ? "status-ok" : "status-bad"}`}>{admStatus}</div>}
      </div>

      <div className="box pxframe">
        <h2>Convert BOBUX → module points</h2>
        <p style={{ fontSize: 14, color: "var(--color-muted)" }}>
          Rate: 100 BOBUX = 50 points, plus a flat 100 BOBUX transfer fee.
        </p>
        <div className="admin-row">
          <div className="field">
            Delegation ID
            <input value={cvTeam} onChange={(e) => setCvTeam(e.target.value)} />
          </div>
          <div className="field">
            Points to convert
            <input type="number" min={1} value={cvPoints} onChange={(e) => setCvPoints(e.target.value)} />
          </div>
          <div className="field">
            Cost
            <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-display)", fontWeight: 700, padding: "12px 0" }}>
              {cvCost}
            </span>
          </div>
          <button
            className="action"
            onClick={() => {
              const points = parseInt(cvPoints, 10);
              const r = convertToPoints(cvTeam, points);
              if (!r.ok) setCvStatus(r.error);
              else setCvStatus(`Converted. Cost ${fmt(r.cost)}. Points now ${fmt(r.points)}.`);
            }}
          >
            CONVERT
          </button>
        </div>
        {cvStatus && <div className={`status-msg ${cvStatus.startsWith("Converted") ? "status-ok" : "status-bad"}`}>{cvStatus}</div>}
      </div>

      <div className="box pxframe">
        <h2 style={{ fontSize: 17 }}>All teams</h2>
        <table>
          <thead>
            <tr>
              <th>Delegation</th>
              <th>Team</th>
              <th>Module</th>
              <th>Balance</th>
              <th>Points</th>
              <th>Last round</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.delegationId}>
                <td>{t.delegationId}</td>
                <td>{t.name}</td>
                <td>{moduleById(t.moduleId)?.name}</td>
                <td>{fmt(t.balance)}</td>
                <td>{fmt(t.points)}</td>
                <td>{fmt(t.roundEarned)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
