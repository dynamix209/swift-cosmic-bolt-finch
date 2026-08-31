import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bry9EOXA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIER_LABELS = {
	common: "COMMON",
	rare: "RARE",
	legend: "LEGENDARY",
	heist: "OFFENSIVE"
};
var SHOP_TZ = "Asia/Karachi";
var PERKS = [
	{
		id: "shield",
		name: "Shield",
		tagline: "Save Yourself",
		desc: "Blocks the next Sabotage or Heist targeting your team.",
		rarity: "rare",
		baseCost: 250,
		img: "/perks/shield.jpg",
		isTarget: false,
		effect: "Consumes itself after blocking one incoming Sabotage or Heist."
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
		effect: "Must be used before the round starts. Module time × 1.30."
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
		effect: "Sends the attack back. Consumed on use."
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
		effect: "May be used to counter a handicap. +1 delegate for the selected module."
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
		effect: "Use before the module starts. Points × 1.25."
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
		effect: "Auto-qualifies for a chosen module. Sabotage eliminations still stand."
	},
	{
		id: "sabotage",
		name: "Sabotage",
		tagline: "Kill or get killed",
		desc: "Temporarily removes 1 delegate from a targeted team for 30% of the module's total round time.",
		rarity: "heist",
		baseCost: 1e3,
		img: "/perks/sabotage.jpg",
		isTarget: true,
		effect: "You choose which delegate is removed. Blocked by Shield. Redirectable."
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
		effect: "Steals 1.25× last-round points. Blocked by Shield. Redirectable."
	}
];
var MODULES = [
	{
		id: "lions-gate",
		name: "Riddle at Lion's Gate",
		field: "Law & Criminology",
		group: "Sirius",
		blurb: "Argue, decode, and prosecute your way through a locked legal puzzle. Precision beats volume."
	},
	{
		id: "haythams-reel",
		name: "Haytham's Reel",
		field: "Media",
		group: "Orion",
		blurb: "Cut a story under pressure. Image, sound, and spin are the tools — the clock is the editor."
	},
	{
		id: "blackwells-labyrinth",
		name: "Blackwell's Labyrinth",
		field: "Medical",
		group: "Polaris",
		blurb: "Diagnose the maze. One wrong turn is a wrong call; one right sequence saves the round."
	},
	{
		id: "carsons-milieu",
		name: "Carson's Milieu",
		field: "Environment",
		group: "Sirius",
		blurb: "Systems thinking in a living habitat. Balance resources, constraints, and consequences."
	},
	{
		id: "mappers-interstellus",
		name: "Mapper's Interstellus",
		field: "Engineering",
		group: "Orion",
		blurb: "Chart, build, and route through an interstellar mapping challenge. Structure is the strategy."
	},
	{
		id: "keplers-orbits",
		name: "Kepler's Orbits",
		field: "Astronomy & Aerospace",
		group: "Polaris",
		blurb: "Calculate trajectories, hold the line, and keep the craft in the window. Math with altitude."
	},
	{
		id: "maslows-hierarchy",
		name: "Maslow's Hierarchy",
		field: "Business",
		group: "Sirius",
		blurb: "Need, want, market, close. Climb the stack before the other delegations do."
	},
	{
		id: "villanis-squares",
		name: "Villani's Squares",
		field: "Mathematics",
		group: "Orion",
		blurb: "Proofs, patterns, and pressure. The square is fair. The clock is not."
	},
	{
		id: "neumanns-matrix",
		name: "Neumann's Matrix",
		field: "Computer Science",
		group: "Polaris",
		blurb: "Architecture, algorithms, and a machine that only respects correct state."
	}
];
var GROUP_BLURB = {
	Sirius: "Brightest in the sky — law, habitat, and the market.",
	Orion: "The hunter's belt — media, engineering, and pure math.",
	Polaris: "The fixed star — medicine, aerospace, and machines."
};
function perkById(id) {
	return PERKS.find((p) => p.id === id);
}
function moduleById(id) {
	return MODULES.find((m) => m.id === id);
}
function costForDay(base, day) {
	return base + Math.max(0, day - 1) * 100;
}
function karachiHour(date = /* @__PURE__ */ new Date()) {
	const hour = new Intl.DateTimeFormat("en-GB", {
		timeZone: SHOP_TZ,
		hour: "numeric",
		hourCycle: "h23"
	}).format(date);
	return Number(hour);
}
function shopIsOpen(date = /* @__PURE__ */ new Date()) {
	const h = karachiHour(date);
	return h >= 18 && h < 22;
}
function fmt(n) {
	return (n < 0 ? "-" : "") + Math.abs(Math.round(n)).toLocaleString();
}
function hashPass(s) {
	let h = 5381;
	const salt = `heist-bna::${s}`;
	for (let i = 0; i < salt.length; i++) h = h * 33 ^ salt.charCodeAt(i);
	return (h >>> 0).toString(16);
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}
function token() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let t = "HX-";
	for (let i = 0; i < 8; i++) t += alphabet[Math.floor(Math.random() * 32)];
	return t;
}
function seedTeams() {
	const samples = [
		{
			delegationId: "SIRIUS-01",
			name: "North Gate",
			email: "sirius01@bna.local",
			moduleId: "lions-gate",
			balance: 520,
			points: 86,
			roundEarned: 140
		},
		{
			delegationId: "ORION-07",
			name: "Belt Runners",
			email: "orion07@bna.local",
			moduleId: "mappers-interstellus",
			balance: 310,
			points: 92,
			roundEarned: 180
		},
		{
			delegationId: "POLARIS-03",
			name: "True North",
			email: "polaris03@bna.local",
			moduleId: "neumanns-matrix",
			balance: 780,
			points: 74,
			roundEarned: 90
		},
		{
			delegationId: "SIRIUS-12",
			name: "Greenroom",
			email: "sirius12@bna.local",
			moduleId: "carsons-milieu",
			balance: 240,
			points: 61,
			roundEarned: 200
		},
		{
			delegationId: "ORION-02",
			name: "Square One",
			email: "orion02@bna.local",
			moduleId: "villanis-squares",
			balance: 415,
			points: 88,
			roundEarned: 110
		}
	];
	const teams = {};
	for (const s of samples) teams[s.delegationId] = {
		...s,
		passHash: hashPass("demo"),
		inventory: [],
		history: [{
			ts: Date.now() - 36e5,
			reason: "Starting allocation",
			delta: 400
		}, {
			ts: Date.now() - 18e5,
			reason: "Module performance",
			delta: s.balance - 400
		}],
		createdAt: Date.now() - 864e5
	};
	return teams;
}
var useHeist = create()(persist((set, get) => ({
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
		set({
			teams: seedTeams(),
			seeded: true
		});
	},
	setTab: (tab) => set({ tab }),
	setAuthMode: (authMode) => set({ authMode }),
	login: (delegationId, password) => {
		const id = delegationId.trim().toUpperCase();
		if (!id || !password) return {
			ok: false,
			error: "Enter a Delegation ID and password."
		};
		const team = get().teams[id];
		if (!team) return {
			ok: false,
			error: "No account for that Delegation ID.",
			needSignup: true
		};
		if (team.passHash !== hashPass(password)) return {
			ok: false,
			error: "Wrong password."
		};
		set({
			currentTeamId: id,
			tab: "shop"
		});
		return { ok: true };
	},
	signup: ({ name, email, delegationId, password, moduleId }) => {
		const id = delegationId.trim().toUpperCase();
		const nm = name.trim();
		const em = email.trim().toLowerCase();
		if (!nm) return {
			ok: false,
			error: "Name is required."
		};
		if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return {
			ok: false,
			error: "A valid email is required for notifications."
		};
		if (!id || id.length < 4) return {
			ok: false,
			error: "Delegation ID must be at least 4 characters."
		};
		if (!password || password.length < 4) return {
			ok: false,
			error: "Password must be at least 4 characters."
		};
		if (!MODULES.some((m) => m.id === moduleId)) return {
			ok: false,
			error: "Select a module."
		};
		if (get().teams[id]) return {
			ok: false,
			error: "That Delegation ID is already taken."
		};
		if (Object.values(get().teams).some((t) => t.email === em)) return {
			ok: false,
			error: "That email is already registered."
		};
		const team = {
			delegationId: id,
			name: nm,
			email: em,
			passHash: hashPass(password),
			moduleId,
			balance: 400,
			points: 0,
			roundEarned: 0,
			inventory: [],
			history: [{
				ts: Date.now(),
				reason: "Starting allocation",
				delta: 400
			}],
			createdAt: Date.now()
		};
		set((s) => ({
			teams: {
				...s.teams,
				[id]: team
			},
			currentTeamId: id,
			tab: "shop",
			authMode: "login"
		}));
		return { ok: true };
	},
	logout: () => set({
		currentTeamId: null,
		isAdmin: false,
		tab: "shop",
		authMode: "login"
	}),
	approvedCountFor: (teamId, itemId, moduleId) => {
		return get().requests.filter((r) => r.teamId === teamId && r.itemId === itemId && r.moduleId === moduleId && r.status === "approved").length;
	},
	buyPerk: (itemId, target, moduleId) => {
		const { currentTeamId, teams, eventDay, requests } = get();
		if (!currentTeamId) return {
			ok: false,
			error: "Log in first."
		};
		const team = teams[currentTeamId];
		if (!team) return {
			ok: false,
			error: "Team not found."
		};
		const perk = perkById(itemId);
		if (!perk) return {
			ok: false,
			error: "Unknown perk."
		};
		const cost = costForDay(perk.baseCost, eventDay);
		if (team.balance < cost) return {
			ok: false,
			error: "Not enough BOBUX for that yet."
		};
		if (perk.isTarget) {
			const t = (target || "").trim().toUpperCase();
			if (!t) return {
				ok: false,
				error: "Enter a target Delegation ID."
			};
			if (t === currentTeamId) return {
				ok: false,
				error: "You can't target your own team."
			};
			if (!teams[t]) return {
				ok: false,
				error: "Target team does not exist."
			};
		}
		if (requests.filter((r) => r.teamId === currentTeamId && r.itemId === itemId && r.moduleId === moduleId && r.status === "approved").length >= 2) return {
			ok: false,
			error: "Sold out for this module (2 / 2 approved)."
		};
		if (requests.some((r) => r.teamId === currentTeamId && r.itemId === itemId && r.moduleId === moduleId && r.status === "pending")) return {
			ok: false,
			error: "You already have a pending request for this perk in this module."
		};
		set({ requests: [{
			id: uid("req"),
			teamId: currentTeamId,
			itemId,
			itemName: perk.name,
			cost,
			rarity: perk.rarity,
			target: perk.isTarget ? (target || "").trim().toUpperCase() : null,
			moduleId,
			status: "pending",
			timestamp: Date.now()
		}, ...requests] });
		return { ok: true };
	},
	resolveRequest: (id, approve) => {
		const { requests, teams } = get();
		const req = requests.find((r) => r.id === id);
		if (!req) return {
			ok: false,
			error: "Request not found."
		};
		if (req.status !== "pending") return {
			ok: false,
			error: "Already resolved."
		};
		const team = teams[req.teamId];
		if (!team) return {
			ok: false,
			error: "Team missing."
		};
		if (!approve) {
			set({ requests: requests.map((r) => r.id === id ? {
				...r,
				status: "rejected",
				note: "Rejected by marshal"
			} : r) });
			return { ok: true };
		}
		if (team.balance < req.cost) {
			set({ requests: requests.map((r) => r.id === id ? {
				...r,
				status: "rejected",
				note: "Insufficient BOBUX at approval"
			} : r) });
			return {
				ok: false,
				error: "Team no longer has enough BOBUX."
			};
		}
		if (requests.filter((r) => r.teamId === req.teamId && r.itemId === req.itemId && r.moduleId === req.moduleId && r.status === "approved").length >= 2) return {
			ok: false,
			error: "Perk already sold out for this module."
		};
		const tkn = token();
		const inv = [...team.inventory];
		const existing = inv.find((i) => i.itemId === req.itemId && i.moduleId === req.moduleId);
		if (existing) existing.qty += 1;
		else inv.push({
			itemId: req.itemId,
			name: req.itemName,
			rarity: req.rarity,
			qty: 1,
			moduleId: req.moduleId,
			ticketId: tkn
		});
		const nextTeam = {
			...team,
			balance: team.balance - req.cost,
			inventory: inv,
			history: [{
				ts: Date.now(),
				reason: `Perk approved: ${req.itemName}`,
				delta: -req.cost
			}, ...team.history]
		};
		set({
			teams: {
				...teams,
				[req.teamId]: nextTeam
			},
			requests: requests.map((r) => r.id === id ? {
				...r,
				status: "approved",
				token: tkn,
				note: "Token emailed to the team."
			} : r)
		});
		return {
			ok: true,
			note: `Token ${tkn} issued.`
		};
	},
	setEventDay: (day) => {
		if (!Number.isInteger(day) || day < 1 || day > 14) return {
			ok: false,
			error: "Enter a valid day (1–14)."
		};
		set({ eventDay: day });
		return { ok: true };
	},
	awardBobux: (teamId, amount, reason) => {
		const id = teamId.trim().toUpperCase();
		const team = get().teams[id];
		if (!team) return {
			ok: false,
			error: "Unknown team."
		};
		if (!Number.isFinite(amount) || amount < 0 || amount > 200) return {
			ok: false,
			error: `Amount must be 0–200.`
		};
		const next = {
			...team,
			balance: team.balance + amount,
			roundEarned: amount,
			history: [{
				ts: Date.now(),
				reason: reason || "BOBUX award",
				delta: amount
			}, ...team.history]
		};
		set((s) => ({ teams: {
			...s.teams,
			[id]: next
		} }));
		return {
			ok: true,
			balance: next.balance
		};
	},
	awardPoints: (teamId, points, reason) => {
		const id = teamId.trim().toUpperCase();
		const team = get().teams[id];
		if (!team) return {
			ok: false,
			error: "Unknown team."
		};
		if (!Number.isFinite(points) || points < 0) return {
			ok: false,
			error: "Enter a valid points value."
		};
		const next = {
			...team,
			points: team.points + points,
			history: [{
				ts: Date.now(),
				reason: reason || "Module points",
				delta: 0
			}, ...team.history]
		};
		set((s) => ({ teams: {
			...s.teams,
			[id]: next
		} }));
		return {
			ok: true,
			points: next.points
		};
	},
	adjustBobux: (teamId, amount, reason) => {
		const id = teamId.trim().toUpperCase();
		const team = get().teams[id];
		if (!team) return {
			ok: false,
			error: "Unknown team."
		};
		if (!Number.isFinite(amount) || amount === 0) return {
			ok: false,
			error: "Enter a non-zero amount."
		};
		const next = {
			...team,
			balance: team.balance + amount,
			history: [{
				ts: Date.now(),
				reason: reason || "Manual adjustment",
				delta: amount
			}, ...team.history]
		};
		set((s) => ({ teams: {
			...s.teams,
			[id]: next
		} }));
		return {
			ok: true,
			balance: next.balance
		};
	},
	convertToPoints: (teamId, points) => {
		const id = teamId.trim().toUpperCase();
		const team = get().teams[id];
		if (!team) return {
			ok: false,
			error: "Unknown team."
		};
		if (!Number.isInteger(points) || points < 1) return {
			ok: false,
			error: "Enter how many points to convert."
		};
		const cost = points * 2 + 100;
		if (team.balance < cost) return {
			ok: false,
			error: `Need ${cost} BOBUX (2 per point + 100 fee).`
		};
		const next = {
			...team,
			balance: team.balance - cost,
			points: team.points + points,
			history: [{
				ts: Date.now(),
				reason: `Converted to ${points} module points`,
				delta: -cost
			}, ...team.history]
		};
		set((s) => ({ teams: {
			...s.teams,
			[id]: next
		} }));
		return {
			ok: true,
			cost,
			points: next.points
		};
	},
	unlockAdmin: (pass) => {
		if (pass !== "marshal") return {
			ok: false,
			error: "Wrong marshal passcode."
		};
		set({ isAdmin: true });
		return { ok: true };
	},
	lockAdmin: () => set({ isAdmin: false })
}), {
	name: "heist-bna-v1",
	partialize: (s) => ({
		teams: s.teams,
		requests: s.requests,
		eventDay: s.eventDay,
		currentTeamId: s.currentTeamId,
		seeded: s.seeded
	})
}));
var toastPush = null;
var toastSeq = 0;
function toast(msg, kind = "ok") {
	toastPush?.(msg, kind);
}
function ToastHost() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		toastPush = (msg, kind = "ok") => {
			const id = ++toastSeq;
			setItems((prev) => [...prev, {
				id,
				msg,
				kind
			}]);
			window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3800);
		};
		return () => {
			toastPush = null;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "toast-wrap",
		"aria-live": "polite",
		children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `toast ${t.kind}`,
			children: t.msg
		}, t.id))
	});
}
function Decor() {
	(0, import_react.useEffect)(() => {
		const blobs = Array.from(document.querySelectorAll(".blob"));
		let raf = 0;
		const onMove = (e) => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				const nx = e.clientX / window.innerWidth - .5;
				const ny = e.clientY / window.innerHeight - .5;
				blobs.forEach((b, i) => {
					const strength = 14 + i * 8;
					b.style.marginLeft = `${nx * strength}px`;
					b.style.marginTop = `${ny * strength}px`;
				});
				raf = 0;
			});
		};
		document.addEventListener("mousemove", onMove);
		return () => {
			document.removeEventListener("mousemove", onMove);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grove",
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-decor",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blob blob-mint" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blob blob-gold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blob blob-sky" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {})
	] });
}
function Rocket() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const launch = () => {
			el.style.display = "block";
			el.classList.remove("launch");
			el.getBoundingClientRect();
			el.classList.add("launch");
			window.setTimeout(() => {
				el.style.display = "none";
			}, 4600);
		};
		const t = window.setTimeout(launch, 2500);
		const iv = window.setInterval(launch, 28e3);
		return () => {
			clearTimeout(t);
			clearInterval(iv);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		ref,
		className: "rocket-fly",
		viewBox: "0 0 64 64",
		width: "46",
		height: "46",
		style: { display: "none" },
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "rotate(45 32 32)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M32 6c7 8 9 18 9 26 0 6-3 11-9 15-6-4-9-9-9-15 0-8 2-18 9-26z",
					fill: "#3dcc9a",
					stroke: "#041c16",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "24",
					r: "4.5",
					fill: "#8ff7d0",
					stroke: "#041c16",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M23 34c-5 1-8 6-8 12 6 0 11-3 12-8z",
					fill: "#e8c56b",
					stroke: "#041c16",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M41 34c5 1 8 6 8 12-6 0-11-3-12-8z",
					fill: "#e8c56b",
					stroke: "#041c16",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M28 44h8l-2 8h-4z",
					fill: "#ff7a7a",
					stroke: "#041c16",
					strokeWidth: "1.2"
				})
			]
		})
	});
}
function Coin3D() {
	const sceneRef = (0, import_react.useRef)(null);
	const coinRef = (0, import_react.useRef)(null);
	const clicks = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const scene = sceneRef.current;
		const coin = coinRef.current;
		if (!scene || !coin) return;
		let rotationY = 0;
		let rotationX = 0;
		let dragging = false;
		let lastX = 0;
		let lastTime = null;
		let raf = 0;
		const AUTO = 24;
		const SENS = .7;
		const norm = (d) => {
			const r = d % 360;
			return r < 0 ? r + 360 : r;
		};
		const frame = (time) => {
			if (lastTime === null) lastTime = time;
			const dt = Math.min(time - lastTime, 50);
			lastTime = time;
			if (!dragging) rotationY = norm(rotationY + AUTO * (dt / 1e3));
			coin.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);
		const down = (e) => {
			dragging = true;
			lastX = e.clientX;
			scene.setPointerCapture(e.pointerId);
		};
		const move = (e) => {
			if (dragging) {
				const dx = e.clientX - lastX;
				lastX = e.clientX;
				rotationY = norm(rotationY + dx * SENS);
			} else {
				const rect = scene.getBoundingClientRect();
				(e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
				const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
				rotationX = Math.max(-18, Math.min(18, -ny * 18));
			}
		};
		const end = () => {
			dragging = false;
			lastTime = null;
		};
		const leave = () => {
			end();
			rotationX = 0;
		};
		scene.addEventListener("pointerdown", down);
		scene.addEventListener("pointermove", move);
		scene.addEventListener("pointerup", end);
		scene.addEventListener("pointerleave", leave);
		scene.addEventListener("pointercancel", end);
		return () => {
			cancelAnimationFrame(raf);
			scene.removeEventListener("pointerdown", down);
			scene.removeEventListener("pointermove", move);
			scene.removeEventListener("pointerup", end);
			scene.removeEventListener("pointerleave", leave);
			scene.removeEventListener("pointercancel", end);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "coin3d-scene",
		ref: sceneRef,
		title: "Flick the coin",
		onClick: () => {
			clicks.current += 1;
			if (clicks.current >= 10) {
				clicks.current = 0;
				toast("The vault notices your dedication. No extra BOBUX, though.", "fun");
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "coin3d",
			ref: coinRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "coin3d-face coin3d-front",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/coin.png",
					alt: ""
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "coin3d-face coin3d-back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/coin.png",
					alt: ""
				})
			})]
		})
	});
}
var JOKES = [
	"Beep boop. You have unlocked... nothing. Nice try, though.",
	"This wolf does not, in fact, grant bonus BOBUX. Worth a shot.",
	"You've clicked the logo three times. A marshal somewhere felt a disturbance.",
	"The crest howls appreciatively but remains fiscally unmoved."
];
function Crest({ big, title }) {
	const clicks = (0, import_react.useRef)(0);
	const timer = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: `crest js-logo ${big ? "big" : ""}`,
		src: "/logo.png",
		alt: "BNA",
		title,
		onClick: () => {
			clicks.current += 1;
			if (timer.current) window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => {
				clicks.current = 0;
			}, 700);
			if (clicks.current >= 3) {
				clicks.current = 0;
				toast(JOKES[Math.floor(Math.random() * JOKES.length)], "fun");
			}
		}
	});
}
function EasterEggs() {
	(0, import_react.useEffect)(() => {
		const KONAMI = [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a"
		];
		let buffer = [];
		const confettiBurst = () => {
			const colors = [
				"#3dcc9a",
				"#e8c56b",
				"#7db8ff",
				"#ff7a7a",
				"#8ff7d0"
			];
			for (let i = 0; i < 80; i++) {
				const el = document.createElement("div");
				el.className = "confetti-piece";
				el.style.left = Math.random() * 100 + "vw";
				el.style.width = 5 + Math.random() * 6 + "px";
				el.style.height = 8 + Math.random() * 10 + "px";
				el.style.background = colors[Math.floor(Math.random() * colors.length)];
				el.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
				document.body.appendChild(el);
				window.setTimeout(() => el.remove(), 4200);
			}
		};
		const onKey = (e) => {
			buffer.push(e.key);
			buffer = buffer.slice(-KONAMI.length);
			if (buffer.join(",") === KONAMI.join(",")) {
				confettiBurst();
				toast("secret unlocked: you have the reflexes of a true hacker", "fun");
			}
			if (buffer.join("").toLowerCase().endsWith("howl")) toast("Awoooo — the vault wolf heard that.", "fun");
		};
		document.addEventListener("keydown", onKey);
		console.log("%c psst — nice job opening the console. %cTry the Konami code, or type howl.", "font-weight:bold;color:#3dcc9a;font-size:14px;", "color:#8fb8a8;");
		return () => document.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "secret-leaf",
		"aria-label": "A leaf in the grove",
		onClick: () => toast("You found a leaf in the grove. It is not legal tender.", "fun"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			width: "22",
			height: "22",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 19c8-1 13-7 14-15-8 1-14 7-14 15z",
				fill: "#3dcc9a",
				stroke: "#041c16",
				strokeWidth: "1.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 17c4-3 7-8 8-13",
				stroke: "#041c16",
				strokeWidth: "1.2"
			})]
		})
	});
}
function attachCardTilt(container) {
	if (!container) return () => {};
	const cards = Array.from(container.querySelectorAll(".card"));
	const cleaners = [];
	cards.forEach((card, i) => {
		card.style.animationDelay = `${i * .05}s`;
		const move = (e) => {
			const rect = card.getBoundingClientRect();
			const px = (e.clientX - rect.left) / rect.width - .5;
			const py = (e.clientY - rect.top) / rect.height - .5;
			card.style.setProperty("--tiltX", `${px * 10}deg`);
			card.style.setProperty("--tiltY", `${-py * 10}deg`);
		};
		const leave = () => {
			card.style.setProperty("--tiltX", "0deg");
			card.style.setProperty("--tiltY", "0deg");
		};
		card.addEventListener("mousemove", move);
		card.addEventListener("mouseleave", leave);
		cleaners.push(() => {
			card.removeEventListener("mousemove", move);
			card.removeEventListener("mouseleave", leave);
		});
	});
	return () => cleaners.forEach((fn) => fn());
}
function HoursBanner() {
	const open = shopIsOpen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `hours-banner pxframe ${open ? "open" : "closed"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hours-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: open ? "Shop is open — buy your perks now (closes at 22:00 PKT)." : "Shop is closed — opens daily at 18:00, closes 22:00 PKT. You can still browse." })]
	});
}
function ShopPanel() {
	const teamId = useHeist((s) => s.currentTeamId);
	const team = useHeist((s) => s.currentTeamId ? s.teams[s.currentTeamId] : null);
	const eventDay = useHeist((s) => s.eventDay);
	const buyPerk = useHeist((s) => s.buyPerk);
	const approvedCountFor = useHeist((s) => s.approvedCountFor);
	const requests = useHeist((s) => s.requests);
	const [moduleId, setModuleId] = (0, import_react.useState)(team?.moduleId ?? "lions-gate");
	const [targets, setTargets] = (0, import_react.useState)({});
	const gridRef = (0, import_react.useRef)(null);
	const open = shopIsOpen();
	(0, import_react.useEffect)(() => {
		return attachCardTilt(gridRef.current);
	}, [
		eventDay,
		moduleId,
		requests,
		team?.balance
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "currency-box pxframe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coin3D, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "BOBUX" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "backronym",
						children: "The official currency of HEIST / BNA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Earn BOBUX from module performance (up to 200 per round, awarded by module heads), live events, and the occasional bonus. Spend it on perks — every purchase waits on a marshal. Prices rise",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							style: { color: "var(--color-fg)" },
							children: "100 BOBUX"
						}),
						" each event day.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { opacity: .7 },
							children: "(Tip: give the coin a flick.)"
						})
					] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				style: {
					marginBottom: 18,
					padding: "16px 18px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					style: { maxWidth: 420 },
					children: ["Buying for module", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: moduleId,
						onChange: (e) => setModuleId(e.target.value),
						children: MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: m.id,
							children: m.name
						}, m.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small-note",
					style: { marginTop: 8 },
					children: "Each perk can be purchased twice per module. Pending requests do not count until a marshal approves them."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				ref: gridRef,
				children: PERKS.map((item) => {
					const cost = costForDay(item.baseCost, eventDay);
					const approved = teamId ? approvedCountFor(teamId, item.id, moduleId) : 0;
					const soldOut = approved >= 2;
					const affordable = team ? team.balance >= cost : true;
					const canBuy = Boolean(team) && affordable && open && !soldOut;
					let label = "BUY";
					if (!open) label = "CLOSED";
					else if (soldOut) label = "SOLD OUT";
					else if (!affordable) label = "LOCKED";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `card pxframe rarity-${item.rarity}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rarity-tag",
									children: TIER_LABELS[item.rarity]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "card-art",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.img,
									alt: item.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-body",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "tagline",
										children: [
											"“",
											item.tagline,
											"”"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.desc }),
									item.isTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "heist-target",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Target Delegation ID",
											value: targets[item.id] ?? "",
											onChange: (e) => setTargets((t) => ({
												...t,
												[item.id]: e.target.value
											}))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "heist-note",
											children: "Requires marshal approval, like every purchase."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "cost-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "cost",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "coinicon",
												src: "/coin.png",
												alt: ""
											}), fmt(cost)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "buy-btn",
											disabled: !canBuy,
											onClick: () => {
												const r = buyPerk(item.id, targets[item.id] ?? null, moduleId);
												if (!r.ok) {
													toast(r.error, "bad");
													return;
												}
												toast(`Request sent — waiting on a marshal to approve “${item.name}”.`, "ok");
												setTargets((t) => ({
													...t,
													[item.id]: ""
												}));
											},
											children: label
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sold",
										children: [
											approved,
											"/",
											2,
											" approved this module"
										]
									})
								]
							})
						]
					}, item.id);
				})
			})
		]
	});
}
function VaultPanel() {
	const teamId = useHeist((s) => s.currentTeamId);
	const team = useHeist((s) => s.currentTeamId ? s.teams[s.currentTeamId] : null);
	const requests = useHeist((s) => s.requests.filter((r) => r.teamId === s.currentTeamId));
	if (!team || !teamId) return null;
	const pending = requests.filter((r) => r.status === "pending").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stat-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: ["Balance", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(team.balance) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: ["Module points", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(team.points) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: ["Earned last round", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(team.roundEarned) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: ["Pending requests", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: pending })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inventory" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small-note",
						style: { marginTop: 0 },
						children: "Only approved perks land here. Tickets generate after marshal approval."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inv-grid",
						children: team.inventory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inv-empty",
							children: "Your inventory is empty. Approved purchases show up here."
						}) : team.inventory.map((it) => {
							const def = perkById(it.itemId);
							const mod = it.moduleId ? moduleById(it.moduleId) : void 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `inv-slot rarity-${it.rarity}`,
								title: it.name,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inv-slot-inner",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: def?.img ?? "",
											alt: ""
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "inv-name",
											children: it.name
										}),
										mod && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "inv-name",
											style: { opacity: .7 },
											children: mod.name
										})
									]
								}), (it.qty || 1) > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inv-qty",
									children: ["x", it.qty]
								}) : null]
							}, `${it.itemId}-${it.moduleId}`);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dash-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "box pxframe",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Purchase requests" }), requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "empty",
						children: "No requests yet — buy something in the Shop."
					}) : requests.map((req) => {
						const it = perkById(req.itemId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "req-item",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: it?.img ?? "",
									alt: ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "req-main",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "req-name",
										children: [req.itemName, req.target ? ` → ${req.target}` : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "req-meta",
										children: [
											fmt(req.cost),
											" BOBUX · ",
											new Date(req.timestamp).toLocaleString(),
											req.status === "approved" && req.token ? ` · token ${req.token}` : "",
											req.note ? ` · ${req.note}` : ""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `status-pill status-${req.status}`,
									children: req.status
								})
							]
						}, req.id);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "box pxframe",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Transaction history" }), team.history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "empty",
						children: "No transactions yet."
					}) : team.history.slice(0, 25).map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hist-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							h.reason,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									opacity: .6,
									fontSize: 11.5
								},
								children: new Date(h.ts).toLocaleString()
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: h.delta >= 0 ? "pos" : "neg",
							children: [h.delta >= 0 ? "+" : "", fmt(h.delta)]
						})]
					}, `${h.ts}-${i}`))]
				})]
			})
		]
	});
}
function ModulesPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-kicker",
				children: "Nine modules"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-lead",
				children: "BNA ’26 runs nine modules across Sirius, Orion, and Polaris. Perk limits, points, and BOBUX are tracked per module — pick carefully before you spend."
			}),
			[
				"Sirius",
				"Orion",
				"Polaris"
			].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginBottom: 22 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: { margin: "0 0 6px" },
						children: g
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-lead",
						children: GROUP_BLURB[g]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mod-grid",
						children: MODULES.filter((m) => m.group === g).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mod-card pxframe",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group",
									children: m.group
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: m.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "field",
									children: m.field
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.blurb })
							]
						}, m.id))
					})
				]
			}, g))
		]
	});
}
function EventsPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-kicker",
				children: "Live events"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-lead",
				children: "Two set-pieces. One shot each. The winner walks with 200 BOBUX — enough to change how you shop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "event-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "event-card pxframe gold-edge",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "when",
							children: "Day 1 · STEM Expo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Scavenger Hunt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You get a to-do list of challenges around the expo. Film every completed activity into a single video no longer than two minutes, then submit it through Google Forms." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Judges watch for three things:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Video quality" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Creativity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "How quickly it was submitted" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "prize",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "coinicon",
								src: "/coin.png",
								alt: ""
							}), "Best submission wins 200 BOBUX"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "event-card pxframe",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "when",
							children: "Day 2 · The riddle trail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Escape Room" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A series of riddles drops during the day. Solve them in order and they lead your team to a hidden escape room. First team to find it and actually escape takes the prize." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No second place. Speed plus brains. Bring the whole delegation." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "prize",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "coinicon",
								src: "/coin.png",
								alt: ""
							}), "First successful team wins 200 BOBUX"]
						})
					]
				})]
			})
		]
	});
}
function BoardPanel() {
	const teams = useHeist((s) => s.teams);
	const rows = (0, import_react.useMemo)(() => Object.values(teams).sort((a, b) => b.points - a.points || b.balance - a.balance), [teams]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "box pxframe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Leaderboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rank" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Delegation" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Team" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Balance" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Module points" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 5,
				children: "No teams yet."
			}) }) : rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "rank-medal",
					children: i < 3 ? [
						"1",
						"2",
						"3"
					][i] : `#${i + 1}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.delegationId }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmt(row.balance) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmt(row.points) })
			] }, row.delegationId)) })] })]
		})
	});
}
function GuidePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "box pxframe",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "How the vault works" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "howto-step",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Earn BOBUX where it counts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Module performance is the main source — better rounds pay more, up to 200 BOBUX per module, awarded by module heads. Live events pay a flat 200 to the winner. Small bonuses exist. There is no pile of free currency." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "howto-step",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Live events are the swing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Day 1: Scavenger Hunt at the STEM Expo. Day 2: riddles into an Escape Room. Each winner takes 200 BOBUX. That is a Shield, or a serious down payment on Sabotage." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "howto-step",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						children: "3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "BOBUX and module points are different" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Points decide the competition. BOBUX is spending money. A marshal can convert BOBUX into points at 100 BOBUX = 50 points, plus a flat 100 BOBUX transfer fee." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "howto-step",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						children: "4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Buy, wait, then use" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pick a perk, hit Buy. Nothing is deducted yet. A marshal approves or rejects. Approved perks enter Inventory, a ticket is issued, and the cost comes out of your balance. Rejected perks never enter inventory. Max two approved copies of each perk per module." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "howto-step",
					style: { borderBottom: "none" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num",
						children: "5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Know the interactions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Shield blocks the next Sabotage or Heist, then is consumed. Redirect sends it back. Revive stops a normal elimination, not a Sabotage elimination. Overdrive is points × 1.25. Time Machine is module time × 1.30. Call a Friend is +1 delegate. Sabotage removes one delegate for 30% of the round." })] })]
				})
			]
		})
	});
}
function AdminPanel() {
	const isAdmin = useHeist((s) => s.isAdmin);
	const unlockAdmin = useHeist((s) => s.unlockAdmin);
	const [pass, setPass] = (0, import_react.useState)("");
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card pxframe",
			style: { margin: "24px auto" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Marshal access" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede",
					children: "Enter the event passcode. Demo passcode: marshal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					placeholder: "Passcode",
					value: pass,
					onChange: (e) => setPass(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							const r = unlockAdmin(pass);
							if (!r.ok) toast(r.error, "bad");
							else toast("Marshal desk unlocked.", "ok");
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "action",
					onClick: () => {
						const r = unlockAdmin(pass);
						if (!r.ok) toast(r.error, "bad");
						else toast("Marshal desk unlocked.", "ok");
					},
					children: "UNLOCK"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDesk, {});
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
	const [dayInput, setDayInput] = (0, import_react.useState)("");
	const [dayStatus, setDayStatus] = (0, import_react.useState)("");
	const pending = requests.filter((r) => r.status === "pending");
	const [awTeam, setAwTeam] = (0, import_react.useState)("");
	const [awAmount, setAwAmount] = (0, import_react.useState)("");
	const [awReason, setAwReason] = (0, import_react.useState)("");
	const [awModule, setAwModule] = (0, import_react.useState)("");
	const [awStatus, setAwStatus] = (0, import_react.useState)("");
	const [mpTeam, setMpTeam] = (0, import_react.useState)("");
	const [mpPoints, setMpPoints] = (0, import_react.useState)("");
	const [mpReason, setMpReason] = (0, import_react.useState)("");
	const [mpStatus, setMpStatus] = (0, import_react.useState)("");
	const [admTeam, setAdmTeam] = (0, import_react.useState)("");
	const [admAmount, setAdmAmount] = (0, import_react.useState)("");
	const [admReason, setAdmReason] = (0, import_react.useState)("");
	const [admStatus, setAdmStatus] = (0, import_react.useState)("");
	const [cvTeam, setCvTeam] = (0, import_react.useState)("");
	const [cvPoints, setCvPoints] = (0, import_react.useState)("");
	const [cvStatus, setCvStatus] = (0, import_react.useState)("");
	const cvCost = (() => {
		const n = parseInt(cvPoints, 10);
		if (!Number.isInteger(n) || n < 1) return "—";
		return `${fmt(n * 2 + 100)} BOBUX`;
	})();
	const rows = Object.values(teams).sort((a, b) => a.delegationId.localeCompare(b.delegationId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe daybox",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: { marginBottom: 6 },
						children: "Event day"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: 14,
							color: "var(--color-muted)",
							margin: "0 0 10px"
						},
						children: "Perk prices scale +100 BOBUX per day advanced."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "pill day",
						children: ["CURRENT: DAY ", eventDay]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						style: { minWidth: 90 },
						children: ["Set day", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							max: 14,
							placeholder: "e.g. 2",
							value: dayInput,
							onChange: (e) => setDayInput(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "action ghost",
						onClick: () => {
							const n = parseInt(dayInput, 10);
							const r = setEventDay(n);
							setDayStatus(r.ok ? `Event day set to ${n}.` : r.error);
						},
						children: "SET DAY"
					}),
					dayStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `status-msg ${dayStatus.startsWith("Event") ? "status-ok" : "status-bad"}`,
						children: dayStatus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Pending purchase requests",
					" ",
					pending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge-count",
						children: pending.length
					})
				] }), pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "empty",
					children: "All caught up."
				}) : pending.map((req) => {
					const it = perkById(req.itemId);
					const mod = moduleById(req.moduleId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `pending-card rarity-${req.rarity}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: it?.img ?? "",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pc-main",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pc-title",
									children: [
										req.teamId,
										" — ",
										req.itemName,
										req.target ? ` → targeting ${req.target}` : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pc-meta",
									children: [
										fmt(req.cost),
										" BOBUX · ",
										mod?.name ?? req.moduleId,
										" · ",
										new Date(req.timestamp).toLocaleString()
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pending-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "action",
									style: { margin: 0 },
									onClick: () => {
										const r = resolveRequest(req.id, true);
										if (!r.ok) toast(r.error, "bad");
										else toast(`Approved. ${r.note ?? ""}`, "ok");
									},
									children: "APPROVE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "action danger",
									style: { margin: 0 },
									onClick: () => {
										const r = resolveRequest(req.id, false);
										if (!r.ok) toast(r.error, "bad");
										else toast("Rejected.", "ok");
									},
									children: "REJECT"
								})]
							})
						]
					}, req.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Award module / event BOBUX" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: 14,
							color: "var(--color-muted)"
						},
						children: "Max 200 per award. Choose the module so the ledger stays per-round. This also sets “earned last round” (what Heist can steal)."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Delegation ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: awTeam,
									onChange: (e) => setAwTeam(e.target.value),
									placeholder: "Exact ID"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Module", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: awModule,
									onChange: (e) => setAwModule(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select module"
									}), MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: m.id,
										children: m.name
									}, m.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Amount (0–200)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									max: 200,
									value: awAmount,
									onChange: (e) => setAwAmount(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: awReason,
									onChange: (e) => setAwReason(e.target.value),
									placeholder: "e.g. Module round"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action",
								onClick: () => {
									const amount = parseInt(awAmount, 10);
									const reason = awReason.trim() || (awModule ? `${moduleById(awModule)?.name} award` : "BOBUX award");
									const r = awardBobux(awTeam, amount, reason);
									if (!r.ok) setAwStatus(r.error);
									else {
										setAwStatus(`Awarded ${amount} BOBUX. New balance: ${fmt(r.balance)}.`);
										setAwAmount("");
										setAwReason("");
									}
								},
								children: "AWARD BOBUX"
							})
						]
					}),
					awStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `status-msg ${awStatus.startsWith("Awarded") ? "status-ok" : "status-bad"}`,
						children: awStatus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Award module points" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: 14,
							color: "var(--color-muted)"
						},
						children: "Record a team’s score for a module or round. Separate from BOBUX."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Delegation ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: mpTeam,
									onChange: (e) => setMpTeam(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Points scored", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									value: mpPoints,
									onChange: (e) => setMpPoints(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: mpReason,
									onChange: (e) => setMpReason(e.target.value),
									placeholder: "e.g. Neumann's Matrix R2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action",
								onClick: () => {
									const points = parseInt(mpPoints, 10);
									const r = awardPoints(mpTeam, points, mpReason.trim() || "Module round score");
									if (!r.ok) setMpStatus(r.error);
									else {
										setMpStatus(`Logged ${points} points. Running total: ${fmt(r.points)}.`);
										setMpPoints("");
										setMpReason("");
									}
								},
								children: "AWARD POINTS"
							})
						]
					}),
					mpStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `status-msg ${mpStatus.startsWith("Logged") ? "status-ok" : "status-bad"}`,
						children: mpStatus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Manual adjustment" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: 14,
							color: "var(--color-muted)"
						},
						children: "Bonuses, penalties, corrections. Does not touch last-round earnings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Delegation ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: admTeam,
									onChange: (e) => setAdmTeam(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Amount (+/-)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: admAmount,
									onChange: (e) => setAdmAmount(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: admReason,
									onChange: (e) => setAdmReason(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action",
								onClick: () => {
									const amount = parseInt(admAmount, 10);
									const r = adjustBobux(admTeam, amount, admReason.trim() || "Manual adjustment");
									if (!r.ok) setAdmStatus(r.error);
									else setAdmStatus(`Applied ${amount >= 0 ? "+" : ""}${amount}. New balance: ${fmt(r.balance)}.`);
								},
								children: "APPLY"
							})
						]
					}),
					admStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `status-msg ${admStatus.startsWith("Applied") ? "status-ok" : "status-bad"}`,
						children: admStatus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Convert BOBUX → module points" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: 14,
							color: "var(--color-muted)"
						},
						children: "Rate: 100 BOBUX = 50 points, plus a flat 100 BOBUX transfer fee."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Delegation ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: cvTeam,
									onChange: (e) => setCvTeam(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Points to convert", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1,
									value: cvPoints,
									onChange: (e) => setCvPoints(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "field",
								children: ["Cost", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "var(--color-gold)",
										fontFamily: "var(--font-display)",
										fontWeight: 700,
										padding: "12px 0"
									},
									children: cvCost
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "action",
								onClick: () => {
									const r = convertToPoints(cvTeam, parseInt(cvPoints, 10));
									if (!r.ok) setCvStatus(r.error);
									else setCvStatus(`Converted. Cost ${fmt(r.cost)}. Points now ${fmt(r.points)}.`);
								},
								children: "CONVERT"
							})
						]
					}),
					cvStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `status-msg ${cvStatus.startsWith("Converted") ? "status-ok" : "status-bad"}`,
						children: cvStatus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "box pxframe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: { fontSize: 17 },
					children: "All teams"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Delegation" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Team" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Module" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Balance" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Points" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last round" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t.delegationId }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: moduleById(t.moduleId)?.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmt(t.balance) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmt(t.points) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmt(t.roundEarned) })
				] }, t.delegationId)) })] })]
			})
		]
	});
}
var TABS = [
	{
		id: "shop",
		label: "Shop"
	},
	{
		id: "dash",
		label: "Vault"
	},
	{
		id: "modules",
		label: "Modules"
	},
	{
		id: "events",
		label: "Events"
	},
	{
		id: "board",
		label: "Leaderboard"
	},
	{
		id: "guide",
		label: "How it works"
	},
	{
		id: "admin",
		label: "Admin"
	}
];
function AppShell() {
	const teamId = useHeist((s) => s.currentTeamId);
	const team = useHeist((s) => s.currentTeamId ? s.teams[s.currentTeamId] : null);
	const eventDay = useHeist((s) => s.eventDay);
	const tab = useHeist((s) => s.tab);
	const setTab = useHeist((s) => s.setTab);
	const logout = useHeist((s) => s.logout);
	const pending = useHeist((s) => s.requests.filter((r) => r.status === "pending").length);
	if (!team || !teamId) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "topbar pxframe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { title: "you found me" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brandtext",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "eyebrow",
								children: "Beaconhouse Notion of Academia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["HEIST ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EXCHANGE" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sub",
								children: "Excellentia per Dominium"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "teaminfo",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pill tip",
							children: [teamId, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tip-bubble",
								children: [
									team.name,
									" · ",
									team.email
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pill day",
							children: ["DAY ", eventDay]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pill points",
							children: [fmt(team.points), " PTS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pill balance",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "coinicon",
								src: "/coin.png",
								alt: ""
							}), fmt(team.balance)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "tab-btn",
							onClick: logout,
							style: {
								fontSize: 11,
								padding: "8px 12px"
							},
							children: "Switch team"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tabs",
				role: "tablist",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: `tab-btn ${tab === t.id ? "active" : ""}`,
					"data-tab": t.id,
					onClick: () => setTab(t.id),
					children: [t.label, t.id === "admin" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge-count",
						children: pending
					}) : null]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoursBanner, {}),
			tab === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopPanel, {}),
			tab === "dash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultPanel, {}),
			tab === "modules" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulesPanel, {}),
			tab === "events" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsPanel, {}),
			tab === "board" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardPanel, {}),
			tab === "guide" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePanel, {}),
			tab === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanel, {})
		]
	});
}
function AuthScreen() {
	const mode = useHeist((s) => s.authMode);
	const setAuthMode = useHeist((s) => s.setAuthMode);
	const login = useHeist((s) => s.login);
	const signup = useHeist((s) => s.signup);
	const [delegationId, setDelegationId] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [moduleId, setModuleId] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onLogin = () => {
		setBusy(true);
		const r = login(delegationId, password);
		setBusy(false);
		if (!r.ok) {
			setStatus(r.error);
			if (r.needSignup) {
				toast("No account yet — create one on Signup.", "bad");
				setAuthMode("signup");
			}
			return;
		}
		toast("Welcome back to the vault.", "ok");
	};
	const onSignup = () => {
		if (!moduleId) {
			setStatus("Select your module.");
			return;
		}
		setBusy(true);
		const r = signup({
			name,
			email,
			delegationId,
			password,
			moduleId
		});
		setBusy(false);
		if (!r.ok) {
			setStatus(r.error);
			return;
		}
		toast(`Vault opened. 400 BOBUX loaded.`, "ok");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "login-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card pxframe gold-edge",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { big: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "eyebrow",
					style: {
						color: "var(--color-mint-2)",
						letterSpacing: "2px",
						fontSize: 11,
						fontWeight: 700
					},
					children: "BEACONHOUSE NOTION OF ACADEMIA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "HEIST" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede",
					children: "The official BOBUX exchange. Sign in with your Delegation ID — or open a vault if you're new."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-switch",
					role: "tablist",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: mode === "login" ? "on" : "",
						onClick: () => {
							setAuthMode("login");
							setStatus("");
						},
						children: "Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: mode === "signup" ? "on" : "",
						onClick: () => {
							setAuthMode("signup");
							setStatus("");
						},
						children: "Signup"
					})]
				}),
				mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					autoComplete: "name",
					placeholder: "NAME",
					value: name,
					onChange: (e) => setName(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					autoComplete: "email",
					placeholder: "EMAIL (required for notifications)",
					value: email,
					onChange: (e) => setEmail(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					autoComplete: "username",
					placeholder: "DELEGATION ID",
					value: delegationId,
					onChange: (e) => setDelegationId(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoComplete: mode === "signup" ? "new-password" : "current-password",
					placeholder: "PASSWORD",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") (mode === "login" ? onLogin : onSignup)();
					}
				}),
				mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: moduleId,
					onChange: (e) => setModuleId(e.target.value),
					"aria-label": "Module",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "SELECT YOUR MODULE"
					}), MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: m.id,
						children: [
							m.name,
							" — ",
							m.field
						]
					}, m.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "action wide",
					disabled: busy,
					onClick: mode === "login" ? onLogin : onSignup,
					children: mode === "login" ? "ENTER THE VAULT →" : "OPEN A VAULT →"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "field-error",
					children: status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "small-note",
					children: mode === "login" ? "No account for that ID? You'll be sent to Signup. Demo teams: SIRIUS-01 / demo, ORION-07 / demo." : `Email is required — marshals send redemption tokens there. New vaults start with 400 BOBUX. Delegation IDs must be unique.`
				})
			]
		})
	});
}
function Home() {
	const currentTeamId = useHeist((s) => s.currentTeamId);
	const seedIfNeeded = useHeist((s) => s.seedIfNeeded);
	(0, import_react.useEffect)(() => {
		const run = () => seedIfNeeded();
		const persist = useHeist.persist;
		if (persist.hasHydrated()) run();
		return persist.onFinishHydration(run);
	}, [seedIfNeeded]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Decor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EasterEggs, {}),
		currentTeamId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthScreen, {})
	] });
}
//#endregion
export { Home as component };
