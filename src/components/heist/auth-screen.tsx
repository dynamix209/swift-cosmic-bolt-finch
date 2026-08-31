import { useState } from "react";
import { MODULES, STARTING_BOBUX, type ModuleId } from "@/lib/heist/data";
import { useHeist } from "@/lib/heist/store";
import { Crest, toast } from "./fx";

export function AuthScreen() {
  const mode = useHeist((s) => s.authMode);
  const setAuthMode = useHeist((s) => s.setAuthMode);
  const login = useHeist((s) => s.login);
  const signup = useHeist((s) => s.signup);

  const [delegationId, setDelegationId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [moduleId, setModuleId] = useState<ModuleId | "">("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

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
      moduleId,
    });
    setBusy(false);
    if (!r.ok) {
      setStatus(r.error);
      return;
    }
    toast(`Vault opened. ${STARTING_BOBUX} BOBUX loaded.`, "ok");
  };

  return (
    <div className="login-shell">
      <div className="login-card pxframe gold-edge">
        <Crest big />
        <div className="eyebrow" style={{ color: "var(--color-mint-2)", letterSpacing: "2px", fontSize: 11, fontWeight: 700 }}>
          BEACONHOUSE NOTION OF ACADEMIA
        </div>
        <h2>HEIST</h2>
        <p className="lede">
          The official BOBUX exchange. Sign in with your Delegation ID — or open a vault if you're new.
        </p>

        <div className="auth-switch" role="tablist">
          <button type="button" className={mode === "login" ? "on" : ""} onClick={() => { setAuthMode("login"); setStatus(""); }}>
            Login
          </button>
          <button type="button" className={mode === "signup" ? "on" : ""} onClick={() => { setAuthMode("signup"); setStatus(""); }}>
            Signup
          </button>
        </div>

        {mode === "signup" && (
          <>
            <input
              type="text"
              autoComplete="name"
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              autoComplete="email"
              placeholder="EMAIL (required for notifications)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          autoComplete="username"
          placeholder="DELEGATION ID"
          value={delegationId}
          onChange={(e) => setDelegationId(e.target.value)}
        />
        <input
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (mode === "login" ? onLogin : onSignup)();
          }}
        />

        {mode === "signup" && (
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value as ModuleId)}
            aria-label="Module"
          >
            <option value="">SELECT YOUR MODULE</option>
            {MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.field}
              </option>
            ))}
          </select>
        )}

        <button className="action wide" disabled={busy} onClick={mode === "login" ? onLogin : onSignup}>
          {mode === "login" ? "ENTER THE VAULT →" : "OPEN A VAULT →"}
        </button>
        <div className="field-error">{status}</div>
        <div className="small-note">
          {mode === "login"
            ? "No account for that ID? You'll be sent to Signup. Demo teams: SIRIUS-01 / demo, ORION-07 / demo."
            : `Email is required — marshals send redemption tokens there. New vaults start with ${STARTING_BOBUX} BOBUX. Delegation IDs must be unique.`}
        </div>
      </div>
    </div>
  );
}
