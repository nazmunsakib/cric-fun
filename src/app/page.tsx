import { AppHeader } from "@/components/app-header";
import { CricketBuilder } from "@/components/cricket-builder";

export default function Home() {
  return (
    <>
      <AppHeader />
      <CricketBuilder />
      <footer className="relative z-10 mt-auto border-t border-white/[0.06] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p>Cric Fun · Daily card studio</p>
            <p className="mt-1 text-slate-600">
              No login · No database · Made for the group chat
            </p>
          </div>
          <p>
            Developed by Sakib ·{" "}
            <a
              href="https://nazmunsakib.com"
              target="_blank"
              rel="noreferrer"
              className="text-field/80 underline-offset-2 transition hover:text-field hover:underline"
            >
              nazmunsakib.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
