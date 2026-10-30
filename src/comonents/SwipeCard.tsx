import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Poster } from "./Poster";
import { type Movie } from "../model";
import { useRef } from "react";

function SwipeCard({movie, onChoice, disabled} : {movie: Movie, onChoice: (liked: boolean) => void, disabled: boolean}) {
    const x = useMotionValue(0);
   const rotate = useTransform(x, [-220, 220], [-16, 16]);
   const yes = useTransform(x, [0, 110], [0, 1]);
   const no = useTransform(x, [-110, 0], [1, 0]);
   const busy = useRef(false);

   function choose(liked: boolean) {
      if (busy.current || disabled) return;
      busy.current = true;
      animate(x, liked ? 550 : -550, { duration: 0.28 }).then(() => onChoice(liked));
   }
    return(
        <motion.div
         className="swipe-card"
         style={{ x, rotate }}
         drag={disabled ? false : "x"}
         dragConstraints={{ left: 0, right: 0 }}
         dragElastic={0.95}
         onDragEnd={(_e, info) => {
            if (Math.abs(info.offset.x) > 95 || Math.abs(info.velocity.x) > 650) {
               choose(info.offset.x > 0);
            } else {
               animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
            }
         }}
      >
         <Poster movie={movie} />
         <div className="card-shade" />
         <span className="card-label">Кино и сериалы</span>
         <motion.span className="vote-stamp vote-stamp--yes" style={{ opacity: yes }}>
            ЛАЙК
         </motion.span>
         <motion.span className="vote-stamp vote-stamp--no" style={{ opacity: no }}>
            ДИЗЛАЙК
         </motion.span>
         <span className="card-meta">
            <strong>{movie.title}</strong>
            <small>
               {movie.year} · {movie.genre}
            </small>
         </span>
      </motion.div>
    );
}

export { SwipeCard};