import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/heist/app-shell";
import { AuthScreen } from "@/components/heist/auth-screen";
import { Decor, EasterEggs, ToastHost } from "@/components/heist/fx";
import { useHeist } from "@/lib/heist/store";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  const currentTeamId = useHeist((s) => s.currentTeamId);
  const seedIfNeeded = useHeist((s) => s.seedIfNeeded);

  useEffect(() => {
    const run = () => seedIfNeeded();
    const persist = useHeist.persist;
    if (persist.hasHydrated()) run();
    return persist.onFinishHydration(run);
  }, [seedIfNeeded]);

  return (
    <main>
      <Decor />
      <ToastHost />
      <EasterEggs />
      {currentTeamId ? <AppShell /> : <AuthScreen />}
    </main>
  );
}
