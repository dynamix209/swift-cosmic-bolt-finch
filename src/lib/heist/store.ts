import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ADMIN_PASS,
  MAX_MODULE_BOBUX,
  MODULES,
  PERKS,
  STARTING_BOBUX,
  type ModuleId,
  type PerkId,
  type Rarity,
  costForDay,
  hashPass,
  perkById,
} from "./data";

export type RequestStatus = "pending" | "approved" | "rejected";

export interface InventoryItem {
  itemId: PerkId;
  name: string;
  rarity: Rarity;
  qty: number;
  moduleId?: ModuleId;
  ticketId?: string;
}

export interface HistoryItem {
  ts: number;
  reason: string;
  delta: number;
}

export interface Team {
  delegationId: string;
  name: string;
  email: string;
  passHash: string;
  moduleId: ModuleId;
  balance: number;
  points: number;
  roundEarned: number;
  inventory: InventoryItem[];
  history: HistoryItem[];
  createdAt: number;
}

export interface PerkRequest {
  id: string;
  teamId: string;
  itemId: PerkId;
  itemName: string;
  cost: number;
  rarity: Rarity;
  target: string | null;
  moduleId: ModuleId;
  status: RequestStatus;
  timestamp: number;
  token?: string;
  note?: string;
}

export type TabId =
  | "shop"
  | "dash"
  | "modules"
  | "events"
  | "board"
  | "guide"
  | "admin";

interface HeistState {
  teams: Record<string, Team>;
  requests: PerkRequest[];
  eventDay: number;
  currentTeamId: string | null;
  isAdmin: boolean;
  tab: TabId;
  authMode: "login" | "signup";
  seeded: boolean;
  login: (delegationId: string, password: string) => { ok: true } | { ok: false; error: string; needSignup?: boolean };
  signup: (input: {
    name: string;
    email: string;
    delegationId: string;
    password: string;
    moduleId: ModuleId;
  }) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  setTab: (tab: TabId) => void;
  setAuthMode: (mode: "login" | "signup") => void;
  buyPerk: (itemId: PerkId, target: string | null, moduleId: ModuleId) => { ok: true } | { ok: false; error: string };
  resolveRequest: (id: string, approve: boolean) => { ok: true; note?: string } | { ok: false; error: string };
  setEventDay: (day: number) => { ok: true } | { ok: false; error: string };
  awardBobux: (teamId: string, amount: number, reason: string) => { ok: true; balance: number } | { ok: false; error: string };
  awardPoints: (teamId: string, points: number, reason: string) => { ok: true; points: number } | { ok: false; error: string };
  adjustBobux: (teamId: string, amount: number, reason: string) => { ok: true; balance: number } | { ok: false; error: string };
  convertToPoints: (teamId: string, points: number) => { ok: true; cost: number; points: number } | { ok: false; error: string };
  unlockAdmin: (pass: string) => { ok: true } | { ok: false; error: string };
  lockAdmin: () => void;
  approvedCountFor: (teamId: string, itemId: PerkId, moduleId: ModuleId) => number;
  seedIfNeeded: () => void;
}

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function token(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let t = "HX-";
  for (let i = 0; i < 8; i++) t += alphabet[Math.floor(Math.random() * alphabet.length)];
  return t;
}

function seedTeams(): Record<string, Team> {
  const samples: Array<Pick<Team, "delegationId" | "name" | "email" | "moduleId" | "balance" | "points" | "roundEarned">> = [
    { delegationId: "SIRIUS-01", name: "North Gate", email: "sirius01@bna.local", moduleId: "lions-gate", balance: 520, points: 86, roundEarned: 140 },
    { delegationId: "ORION-07", name: "Belt Runners", email: "orion07@bna.local", moduleId: "mappers-interstellus", balance: 310, points: 92, roundEarned: 180 },
    { delegationId: "POLARIS-03", name: "True North", email: "polaris03@bna.local", moduleId: "neumanns-matrix", balance: 780, points: 74, roundEarned: 90 },
    { delegationId: "SIRIUS-12", name: "Greenroom", email: "sirius12@bna.local", moduleId: "carsons-milieu", balance: 240, points: 61, roundEarned: 200 },
    { delegationId: "ORION-02", name: "Square One", email: "orion02@bna.local", moduleId: "villanis-squares", balance: 415, points: 88, roundEarned: 110 },
  ];
  const teams: Record<string, Team> = {};
  for (const s of samples) {
    teams[s.delegationId] = {
      ...s,
      passHash: hashPass("demo"),
      inventory: [],
      history: [
        { ts: Date.now() - 3600_000, reason: "Starting allocation", delta: STARTING_BOBUX },
        { ts: Date.now() - 1800_000, reason: "Module performance", delta: s.balance - STARTING_BOBUX },
      ],
      createdAt: Date.now() - 86400_000,
    };
  }
  return teams;
}

export const useHeist = create<HeistState>()(
  persist(
    (set, get) => ({
      teams: {},
      requests: [],
      eventDay: 1,
      currentTeamId: null,
      isAdmin: false,
      tab: "shop",
      authMode: "login",
      seeded: false,

      seedIfNeeded: () => {
        if (get().seeded) return;
        set({ teams: seedTeams(), seeded: true });
      },

      setTab: (tab) => set({ tab }),
      setAuthMode: (authMode) => set({ authMode }),

      login: (delegationId, password) => {
        const id = delegationId.trim().toUpperCase();
        if (!id || !password) return { ok: false, error: "Enter a Delegation ID and password." };
        const team = get().teams[id];
        if (!team) return { ok: false, error: "No account for that Delegation ID.", needSignup: true };
        if (team.passHash !== hashPass(password)) return { ok: false, error: "Wrong password." };
        set({ currentTeamId: id, tab: "shop" });
        return { ok: true };
      },

      signup: ({ name, email, delegationId, password, moduleId }) => {
        const id = delegationId.trim().toUpperCase();
        const nm = name.trim();
        const em = email.trim().toLowerCase();
        if (!nm) return { ok: false, error: "Name is required." };
        if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return { ok: false, error: "A valid email is required for notifications." };
        if (!id || id.length < 4) return { ok: false, error: "Delegation ID must be at least 4 characters." };
        if (!password || password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
        if (!MODULES.some((m) => m.id === moduleId)) return { ok: false, error: "Select a module." };
        if (get().teams[id]) return { ok: false, error: "That Delegation ID is already taken." };
        if (Object.values(get().teams).some((t) => t.email === em)) {
          return { ok: false, error: "That email is already registered." };
        }
        const team: Team = {
          delegationId: id,
          name: nm,
          email: em,
          passHash: hashPass(password),
          moduleId,
          balance: STARTING_BOBUX,
          points: 0,
          roundEarned: 0,
          inventory: [],
          history: [{ ts: Date.now(), reason: "Starting allocation", delta: STARTING_BOBUX }],
          createdAt: Date.now(),
        };
        set((s) => ({
          teams: { ...s.teams, [id]: team },
          currentTeamId: id,
          tab: "shop",
          authMode: "login",
        }));
        return { ok: true };
      },

      logout: () => set({ currentTeamId: null, isAdmin: false, tab: "shop", authMode: "login" }),

      approvedCountFor: (teamId, itemId, moduleId) => {
        return get().requests.filter(
          (r) =>
            r.teamId === teamId &&
            r.itemId === itemId &&
            r.moduleId === moduleId &&
            r.status === "approved",
        ).length;
      },

      buyPerk: (itemId, target, moduleId) => {
        const { currentTeamId, teams, eventDay, requests } = get();
        if (!currentTeamId) return { ok: false, error: "Log in first." };
        const team = teams[currentTeamId];
        if (!team) return { ok: false, error: "Team not found." };
        const perk = perkById(itemId);
        if (!perk) return { ok: false, error: "Unknown perk." };
        const cost = costForDay(perk.baseCost, eventDay);
        if (team.balance < cost) return { ok: false, error: "Not enough BOBUX for that yet." };
        if (perk.isTarget) {
          const t = (target || "").trim().toUpperCase();
          if (!t) return { ok: false, error: "Enter a target Delegation ID." };
          if (t === currentTeamId) return { ok: false, error: "You can't target your own team." };
          if (!teams[t]) return { ok: false, error: "Target team does not exist." };
        }
        const approved = requests.filter(
          (r) =>
            r.teamId === currentTeamId &&
            r.itemId === itemId &&
            r.moduleId === moduleId &&
            r.status === "approved",
        ).length;
        if (approved >= 2) return { ok: false, error: "Sold out for this module (2 / 2 approved)." };
        const pendingSame = requests.some(
          (r) =>
            r.teamId === currentTeamId &&
            r.itemId === itemId &&
            r.moduleId === moduleId &&
            r.status === "pending",
        );
        if (pendingSame) return { ok: false, error: "You already have a pending request for this perk in this module." };

        const req: PerkRequest = {
          id: uid("req"),
          teamId: currentTeamId,
          itemId,
          itemName: perk.name,
          cost,
          rarity: perk.rarity,
          target: perk.isTarget ? (target || "").trim().toUpperCase() : null,
          moduleId,
          status: "pending",
          timestamp: Date.now(),
        };
        set({ requests: [req, ...requests] });
        return { ok: true };
      },

      resolveRequest: (id, approve) => {
        const { requests, teams } = get();
        const req = requests.find((r) => r.id === id);
        if (!req) return { ok: false, error: "Request not found." };
        if (req.status !== "pending") return { ok: false, error: "Already resolved." };
        const team = teams[req.teamId];
        if (!team) return { ok: false, error: "Team missing." };

        if (!approve) {
          set({
            requests: requests.map((r) => (r.id === id ? { ...r, status: "rejected", note: "Rejected by marshal" } : r)),
          });
          return { ok: true };
        }

        if (team.balance < req.cost) {
          set({
            requests: requests.map((r) =>
              r.id === id ? { ...r, status: "rejected", note: "Insufficient BOBUX at approval" } : r,
            ),
          });
          return { ok: false, error: "Team no longer has enough BOBUX." };
        }

        const approvedAlready = requests.filter(
          (r) =>
            r.teamId === req.teamId &&
            r.itemId === req.itemId &&
            r.moduleId === req.moduleId &&
            r.status === "approved",
        ).length;
        if (approvedAlready >= 2) {
          return { ok: false, error: "Perk already sold out for this module." };
        }

        const tkn = token();
        const inv = [...team.inventory];
        const existing = inv.find((i) => i.itemId === req.itemId && i.moduleId === req.moduleId);
        if (existing) existing.qty += 1;
        else {
          inv.push({
            itemId: req.itemId,
            name: req.itemName,
            rarity: req.rarity,
            qty: 1,
            moduleId: req.moduleId,
            ticketId: tkn,
          });
        }

        const nextTeam: Team = {
          ...team,
          balance: team.balance - req.cost,
          inventory: inv,
          history: [
            { ts: Date.now(), reason: `Perk approved: ${req.itemName}`, delta: -req.cost },
            ...team.history,
          ],
        };

        set({
          teams: { ...teams, [req.teamId]: nextTeam },
          requests: requests.map((r) =>
            r.id === id ? { ...r, status: "approved", token: tkn, note: "Token emailed to the team." } : r,
          ),
        });
        return { ok: true, note: `Token ${tkn} issued.` };
      },

      setEventDay: (day) => {
        if (!Number.isInteger(day) || day < 1 || day > 14) return { ok: false, error: "Enter a valid day (1–14)." };
        set({ eventDay: day });
        return { ok: true };
      },

      awardBobux: (teamId, amount, reason) => {
        const id = teamId.trim().toUpperCase();
        const team = get().teams[id];
        if (!team) return { ok: false, error: "Unknown team." };
        if (!Number.isFinite(amount) || amount < 0 || amount > MAX_MODULE_BOBUX) {
          return { ok: false, error: `Amount must be 0–${MAX_MODULE_BOBUX}.` };
        }
        const next: Team = {
          ...team,
          balance: team.balance + amount,
          roundEarned: amount,
          history: [{ ts: Date.now(), reason: reason || "BOBUX award", delta: amount }, ...team.history],
        };
        set((s) => ({ teams: { ...s.teams, [id]: next } }));
        return { ok: true, balance: next.balance };
      },

      awardPoints: (teamId, points, reason) => {
        const id = teamId.trim().toUpperCase();
        const team = get().teams[id];
        if (!team) return { ok: false, error: "Unknown team." };
        if (!Number.isFinite(points) || points < 0) return { ok: false, error: "Enter a valid points value." };
        const next: Team = {
          ...team,
          points: team.points + points,
          history: [{ ts: Date.now(), reason: reason || "Module points", delta: 0 }, ...team.history],
        };
        set((s) => ({ teams: { ...s.teams, [id]: next } }));
        return { ok: true, points: next.points };
      },

      adjustBobux: (teamId, amount, reason) => {
        const id = teamId.trim().toUpperCase();
        const team = get().teams[id];
        if (!team) return { ok: false, error: "Unknown team." };
        if (!Number.isFinite(amount) || amount === 0) return { ok: false, error: "Enter a non-zero amount." };
        const next: Team = {
          ...team,
          balance: team.balance + amount,
          history: [{ ts: Date.now(), reason: reason || "Manual adjustment", delta: amount }, ...team.history],
        };
        set((s) => ({ teams: { ...s.teams, [id]: next } }));
        return { ok: true, balance: next.balance };
      },

      convertToPoints: (teamId, points) => {
        const id = teamId.trim().toUpperCase();
        const team = get().teams[id];
        if (!team) return { ok: false, error: "Unknown team." };
        if (!Number.isInteger(points) || points < 1) return { ok: false, error: "Enter how many points to convert." };
        const cost = points * 2 + 100;
        if (team.balance < cost) return { ok: false, error: `Need ${cost} BOBUX (2 per point + 100 fee).` };
        const next: Team = {
          ...team,
          balance: team.balance - cost,
          points: team.points + points,
          history: [{ ts: Date.now(), reason: `Converted to ${points} module points`, delta: -cost }, ...team.history],
        };
        set((s) => ({ teams: { ...s.teams, [id]: next } }));
        return { ok: true, cost, points: next.points };
      },

      unlockAdmin: (pass) => {
        if (pass !== ADMIN_PASS) return { ok: false, error: "Wrong marshal passcode." };
        set({ isAdmin: true });
        return { ok: true };
      },
      lockAdmin: () => set({ isAdmin: false }),
    }),
    {
      name: "heist-bna-v1",
      partialize: (s) => ({
        teams: s.teams,
        requests: s.requests,
        eventDay: s.eventDay,
        currentTeamId: s.currentTeamId,
        seeded: s.seeded,
      }),
    },
  ),
);

export function currentTeam(): Team | null {
  const s = useHeist.getState();
  if (!s.currentTeamId) return null;
  return s.teams[s.currentTeamId] ?? null;
}
