import { GradientBackground } from "./GradientBackground";
import type { ReactNode } from "react";

function Intro({ children }: { children: ReactNode }) {
   return (
      <main className="intro">
         <GradientBackground />
         <div className="intro__content">{children}</div>
         <footer>Выбери на завтра завтрак</footer>
      </main>
   );
}

export { Intro };