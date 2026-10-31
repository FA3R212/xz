import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Poster } from './Poster';

// Строгий интерфейс объекта, соответствующий нашему новому data.json
interface Movie {
   id: string;
   title: string;
   poster: string;
   year: string;        // Здесь хранится время приготовления (например, "15 мин")
   genre: string;       // Здесь хранятся краткие ингредиенты
   description: string; // Здесь хранится полный пошаговый рецепт
}

interface SwipeCardProps {
   movie: Movie;
   onChoice: (liked: boolean) => void;
   disabled?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ movie, onChoice, disabled = false }) => {
   const x = useMotionValue(0);

   // Оригинальный расчет наклона карточки при свайпе влево/вправо
   const rotate = useTransform(x, [-200, 200], [-30, 30]);

   // Оригинальное плавное проявление штампов ЛАЙК / ДИЗЛАЙК при перетаскивании
   const opacityYes = useTransform(x, [10, 100], [0, 1]);
   const opacityNo = useTransform(x, [-100, -10], [1, 0]);

   const choose = (liked: boolean) => {
      onChoice(liked);
   };

   const handleDragEnd = (_e: any, info: any) => {
      // Оригинальные пороги срабатывания жеста (расстояние или скорость)
      if (Math.abs(info.offset.x) > 95 || Math.abs(info.velocity.x) > 650) {
         choose(info.offset.x > 0);
      }
   };

   return (
      <motion.div
         className="swipe-card"
         style={{ x, rotate }}
         drag={!disabled ? "x" : false}
         dragConstraints={{ left: 0, right: 0 }}
         dragElastic={0.95}
         onDragEnd={handleDragEnd}
         whileTap={{ scale: 0.98 }}
         transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
         {/* Рендерим постер завтрака */}
         <Poster movie={movie} />

         {/* Оригинальные дизайн-слои и классы */}
         <div className="card-shade" />

         {/* Метка изменена на "Завтрак", класс сохранен */}
         <span className="card-label">Завтрак</span>

         {/* Штамп ЛАЙК */}
         <motion.span
            className="vote-stamp vote-stamp--yes"
            style={{ opacity: opacityYes }}
         >
            ЛАЙК
         </motion.span>

         {/* Штамп ДИЗЛАЙК */}
         <motion.span
            className="vote-stamp vote-stamp--no"
            style={{ opacity: opacityNo }}
         >
            ДИЗЛАЙК
         </motion.span>

         {/* Текстовая плашка внизу карточки (сохраняет оригинальный стиль) */}
         <span className="card-meta">
            <strong>{movie.title}</strong>
            <small>
               {movie.year} • {movie.genre}
            </small>
         </span>
      </motion.div>
   );
};
