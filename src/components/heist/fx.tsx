import { useEffect, useRef, useState } from "react";

export type ToastKind = "ok" | "bad" | "fun";
export interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
}

let toastPush: ((msg: string, kind?: ToastKind) => void) | null = null;
let toastSeq = 0;

export function toast(msg: string, kind: ToastKind = "ok") {
  toastPush?.(msg, kind);
}

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => {
    toastPush = (msg, kind = "ok") => {
      const id = ++toastSeq;
      setItems((prev) => [...prev, { id, msg, kind }]);
      window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3800);
    };
    return () => {
      toastPush = null;
    };
  }, []);
  return (
    <div className="toast-wrap" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function Decor() {
  useEffect(() => {
    const blobs = Array.from(document.querySelectorAll<HTMLElement>(".blob"));
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
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

  return (
    <>
      <div className="grove" aria-hidden="true" />
      <div className="bg-decor" aria-hidden="true">
        <div className="blob blob-mint" />
        <div className="blob blob-gold" />
        <div className="blob blob-sky" />
      </div>
      <Rocket />
    </>
  );
}

function Rocket() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const launch = () => {
      el.style.display = "block";
      el.classList.remove("launch");
      void el.getBoundingClientRect();
      el.classList.add("launch");
      window.setTimeout(() => {
        el.style.display = "none";
      }, 4600);
    };
    const t = window.setTimeout(launch, 2500);
    const iv = window.setInterval(launch, 28000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);
  return (
    <svg
      ref={ref}
      className="rocket-fly"
      viewBox="0 0 64 64"
      width="46"
      height="46"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <g transform="rotate(45 32 32)">
        <path
          d="M32 6c7 8 9 18 9 26 0 6-3 11-9 15-6-4-9-9-9-15 0-8 2-18 9-26z"
          fill="#3dcc9a"
          stroke="#041c16"
          strokeWidth="1.5"
        />
        <circle cx="32" cy="24" r="4.5" fill="#8ff7d0" stroke="#041c16" strokeWidth="1.2" />
        <path d="M23 34c-5 1-8 6-8 12 6 0 11-3 12-8z" fill="#e8c56b" stroke="#041c16" strokeWidth="1.2" />
        <path d="M41 34c5 1 8 6 8 12-6 0-11-3-12-8z" fill="#e8c56b" stroke="#041c16" strokeWidth="1.2" />
        <path d="M28 44h8l-2 8h-4z" fill="#ff7a7a" stroke="#041c16" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function Coin3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const clicks = useRef(0);

  useEffect(() => {
    const scene = sceneRef.current;
    const coin = coinRef.current;
    if (!scene || !coin) return;
    let rotationY = 0;
    let rotationX = 0;
    let dragging = false;
    let lastX = 0;
    let lastTime: number | null = null;
    let raf = 0;
    const AUTO = 24;
    const SENS = 0.7;
    const norm = (d: number) => {
      const r = d % 360;
      return r < 0 ? r + 360 : r;
    };
    const frame = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;
      if (!dragging) rotationY = norm(rotationY + AUTO * (dt / 1000));
      coin.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      scene.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        rotationY = norm(rotationY + dx * SENS);
      } else {
        const rect = scene.getBoundingClientRect();
        const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
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

  return (
    <div
      className="coin3d-scene"
      ref={sceneRef}
      title="Flick the coin"
      onClick={() => {
        clicks.current += 1;
        if (clicks.current >= 10) {
          clicks.current = 0;
          toast("The vault notices your dedication. No extra BOBUX, though.", "fun");
        }
      }}
    >
      <div className="coin3d" ref={coinRef}>
        <div className="coin3d-face coin3d-front">
          <img src="/coin.png" alt="" />
        </div>
        <div className="coin3d-face coin3d-back">
          <img src="/coin.png" alt="" />
        </div>
      </div>
    </div>
  );
}

const JOKES = [
  "Beep boop. You have unlocked... nothing. Nice try, though.",
  "This wolf does not, in fact, grant bonus BOBUX. Worth a shot.",
  "You've clicked the logo three times. A marshal somewhere felt a disturbance.",
  "The crest howls appreciatively but remains fiscally unmoved.",
];

export function Crest({ big, title }: { big?: boolean; title?: string }) {
  const clicks = useRef(0);
  const timer = useRef<number | null>(null);
  return (
    <img
      className={`crest js-logo ${big ? "big" : ""}`}
      src="/logo.png"
      alt="BNA"
      title={title}
      onClick={() => {
        clicks.current += 1;
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          clicks.current = 0;
        }, 700);
        if (clicks.current >= 3) {
          clicks.current = 0;
          toast(JOKES[Math.floor(Math.random() * JOKES.length)], "fun");
        }
      }}
    />
  );
}

export function EasterEggs() {
  useEffect(() => {
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let buffer: string[] = [];
    const confettiBurst = () => {
      const colors = ["#3dcc9a", "#e8c56b", "#7db8ff", "#ff7a7a", "#8ff7d0"];
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
    const onKey = (e: KeyboardEvent) => {
      buffer.push(e.key);
      buffer = buffer.slice(-KONAMI.length);
      if (buffer.join(",") === KONAMI.join(",")) {
        confettiBurst();
        toast("secret unlocked: you have the reflexes of a true hacker", "fun");
      }
      if (buffer.join("").toLowerCase().endsWith("howl")) {
        toast("Awoooo — the vault wolf heard that.", "fun");
      }
    };
    document.addEventListener("keydown", onKey);
    console.log(
      "%c psst — nice job opening the console. %cTry the Konami code, or type howl.",
      "font-weight:bold;color:#3dcc9a;font-size:14px;",
      "color:#8fb8a8;",
    );
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      className="secret-leaf"
      aria-label="A leaf in the grove"
      onClick={() => toast("You found a leaf in the grove. It is not legal tender.", "fun")}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M5 19c8-1 13-7 14-15-8 1-14 7-14 15z"
          fill="#3dcc9a"
          stroke="#041c16"
          strokeWidth="1.2"
        />
        <path d="M7 17c4-3 7-8 8-13" stroke="#041c16" strokeWidth="1.2" />
      </svg>
    </button>
  );
}

export function attachCardTilt(container: HTMLElement | null) {
  if (!container) return () => {};
  const cards = Array.from(container.querySelectorAll<HTMLElement>(".card"));
  const cleaners: Array<() => void> = [];
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
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
