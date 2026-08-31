export type Rarity = "common" | "rare" | "legend" | "heist";

export type PerkId =
  | "shield"
  | "time_machine"
  | "redirect"
  | "call_a_friend"
  | "overdrive"
  | "revive"
  | "sabotage"
  | "heist";

export type ModuleId =
  | "lions-gate"
  | "haythams-reel"
  | "blackwells-labyrinth"
  | "carsons-milieu"
  | "mappers-interstellus"
  | "keplers-orbits"
  | "maslows-hierarchy"
  | "villanis-squares"
  | "neumanns-matrix";

export type Group = "Sirius" | "Orion" | "Polaris";

export interface Perk {
  id: PerkId;
  name: string;
  tagline: string;
  desc: string;
  rarity: Rarity;
  baseCost: number;
  img: string;
  isTarget: boolean;
  effect: string;
}

export interface ModuleDef {
  id: ModuleId;
  name: string;
  field: string;
  group: Group;
  blurb: string;
}

export const TIER_LABELS: Record<Rarity, string> = {
  common: "COMMON",
  rare: "RARE",
  legend: "LEGENDARY",
  heist: "OFFENSIVE",
};

export const STARTING_BOBUX = 400;
export const MAX_PERK_PER_MODULE = 2;
export const SHOP_OPEN_HOUR = 18;
export const SHOP_CLOSE_HOUR = 22;
export const SHOP_TZ = "Asia/Karachi";
export const ADMIN_PASS = "marshal";
export const MAX_MODULE_BOBUX = 200;

export const PERKS: Perk[] = [
  {
    id: "shield",
    name: "Shield",
    tagline: "Save Yourself",
    desc: "Blocks the next Sabotage or Heist targeting your team.",
    rarity: "rare",
    baseCost: 250,
    img: "/perks/shield.jpg",
    isTarget: false,
    effect: "Consumes itself after blocking one incoming Sabotage or Heist.",
  },
  {
    id: "time_machine",
    name: "Time Machine",
    tagline: "Change the time limit",
    desc: "Adds 30% to your time limit for the selected module.",
    rarity: "rare",
    baseCost: 250,
    img: "/perks/time-machine.jpg",
    isTarget: false,
    effect: "Must be used before the round starts. Module time × 1.30.",
  },
  {
    id: "redirect",
    name: "Redirect",
    tagline: "Close call",
    desc: "Redirects an incoming Sabotage or Heist targeting your team back onto the attacker.",
    rarity: "rare",
    baseCost: 500,
    img: "/perks/redirect.jpg",
    isTarget: false,
    effect: "Sends the attack back. Consumed on use.",
  },
  {
    id: "call_a_friend",
    name: "Call a Friend",
    tagline: "Mera sangi aa raha hai",
    desc: "Adds 1 additional delegate to your team for the module.",
    rarity: "common",
    baseCost: 150,
    img: "/perks/call-a-friend.jpg",
    isTarget: false,
    effect: "May be used to counter a handicap. +1 delegate for the selected module.",
  },
  {
    id: "overdrive",
    name: "Overdrive",
    tagline: "Multiplier",
    desc: "Multiplies your points earned in the module by 1.25×.",
    rarity: "legend",
    baseCost: 500,
    img: "/perks/overdrive.jpg",
    isTarget: false,
    effect: "Use before the module starts. Points × 1.25.",
  },
  {
    id: "revive",
    name: "Revive",
    tagline: "Autoqualify",
    desc: "Prevents elimination in a module of your choice / automatically qualifies your team. Does NOT protect against elimination caused by Sabotage.",
    rarity: "legend",
    baseCost: 600,
    img: "/perks/revive.jpg",
    isTarget: false,
    effect: "Auto-qualifies for a chosen module. Sabotage eliminations still stand.",
  },
  {
    id: "sabotage",
    name: "Sabotage",
    tagline: "Kill or get killed",
    desc: "Temporarily removes 1 delegate from a targeted team for 30% of the module's total round time.",
    rarity: "heist",
    baseCost: 1000,
    img: "/perks/sabotage.jpg",
    isTarget: true,
    effect: "You choose which delegate is removed. Blocked by Shield. Redirectable.",
  },
  {
    id: "heist",
    name: "Heist",
    tagline: "Bank robbery",
    desc: "Target a rival team and steal 1.25× of the points they earned last round.",
    rarity: "heist",
    baseCost: 1200,
    img: "/perks/heist.jpg",
    isTarget: true,
    effect: "Steals 1.25× last-round points. Blocked by Shield. Redirectable.",
  },
];

export const MODULES: ModuleDef[] = [
  {
    id: "lions-gate",
    name: "Riddle at Lion's Gate",
    field: "Law & Criminology",
    group: "Sirius",
    blurb: "Argue, decode, and prosecute your way through a locked legal puzzle. Precision beats volume.",
  },
  {
    id: "haythams-reel",
    name: "Haytham's Reel",
    field: "Media",
    group: "Orion",
    blurb: "Cut a story under pressure. Image, sound, and spin are the tools — the clock is the editor.",
  },
  {
    id: "blackwells-labyrinth",
    name: "Blackwell's Labyrinth",
    field: "Medical",
    group: "Polaris",
    blurb: "Diagnose the maze. One wrong turn is a wrong call; one right sequence saves the round.",
  },
  {
    id: "carsons-milieu",
    name: "Carson's Milieu",
    field: "Environment",
    group: "Sirius",
    blurb: "Systems thinking in a living habitat. Balance resources, constraints, and consequences.",
  },
  {
    id: "mappers-interstellus",
    name: "Mapper's Interstellus",
    field: "Engineering",
    group: "Orion",
    blurb: "Chart, build, and route through an interstellar mapping challenge. Structure is the strategy.",
  },
  {
    id: "keplers-orbits",
    name: "Kepler's Orbits",
    field: "Astronomy & Aerospace",
    group: "Polaris",
    blurb: "Calculate trajectories, hold the line, and keep the craft in the window. Math with altitude.",
  },
  {
    id: "maslows-hierarchy",
    name: "Maslow's Hierarchy",
    field: "Business",
    group: "Sirius",
    blurb: "Need, want, market, close. Climb the stack before the other delegations do.",
  },
  {
    id: "villanis-squares",
    name: "Villani's Squares",
    field: "Mathematics",
    group: "Orion",
    blurb: "Proofs, patterns, and pressure. The square is fair. The clock is not.",
  },
  {
    id: "neumanns-matrix",
    name: "Neumann's Matrix",
    field: "Computer Science",
    group: "Polaris",
    blurb: "Architecture, algorithms, and a machine that only respects correct state.",
  },
];

export const GROUP_BLURB: Record<Group, string> = {
  Sirius: "Brightest in the sky — law, habitat, and the market.",
  Orion: "The hunter's belt — media, engineering, and pure math.",
  Polaris: "The fixed star — medicine, aerospace, and machines.",
};

export function perkById(id: string): Perk | undefined {
  return PERKS.find((p) => p.id === id);
}

export function moduleById(id: string): ModuleDef | undefined {
  return MODULES.find((m) => m.id === id);
}

export function costForDay(base: number, day: number): number {
  return base + Math.max(0, day - 1) * 100;
}

export function karachiHour(date = new Date()): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHOP_TZ,
    hour: "numeric",
    hourCycle: "h23",
  }).format(date);
  return Number(hour);
}

export function shopIsOpen(date = new Date()): boolean {
  const h = karachiHour(date);
  return h >= SHOP_OPEN_HOUR && h < SHOP_CLOSE_HOUR;
}

export function fmt(n: number): string {
  const sign = n < 0 ? "-" : "";
  return sign + Math.abs(Math.round(n)).toLocaleString();
}

export function hashPass(s: string): string {
  let h = 5381;
  const salt = `heist-bna::${s}`;
  for (let i = 0; i < salt.length; i++) {
    h = (h * 33) ^ salt.charCodeAt(i);
  }
  return (h >>> 0).toString(16);
}
