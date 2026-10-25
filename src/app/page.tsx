import { AppHeader } from "@/components/app-header";
import { CricketBuilder } from "@/components/cricket-builder";

export default function Home() {
  return (
    <>
      <AppHeader />
      <CricketBuilder />
      <footer className="relative z-10 mt-auto border-t border-white/[0.06] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Funny Cricket · Daily card studio</p>
          <p>No login · No database · Made for the group chat</p>
        </div>
      </footer>
    </>
  );
}
