import { GradientBackground } from "./GradientBackground";
import type { ReactNode } from "react";

function Intro({ children }: { children: ReactNode }) {
   return (
      <main className="intro">
         <GradientBackground />
         <div className="intro__content">{children}</div>
         <footer>Выбери кино или сериал на вечер</footer>
      </main>
   );
}

export { Intro };