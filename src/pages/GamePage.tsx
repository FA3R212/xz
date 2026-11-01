import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, HeartCrack, RotateCcw } from "lucide-react";
import { Header } from "../comonents/Header";
import { movies, readSession, saveSession, type Session } from "../model";
import { SwipeCard } from "../comonents/SwipeCard.tsx";

function GamePage() {
   const nav = useNavigate();
   const [session, setSession] = useState<Session | null>(() => readSession());
   const [locked, setLocked] = useState(false);

   useEffect(() => {
      if (!session) {
         nav("/", { replace: true });
      } else if (session.votes.length === session.order.length) {
         nav(session.role === 1 ? "/share" : "/result", { replace: true });
      }
   }, [session, nav]);

   if (!session) return null;

   const id = session.order[session.votes.length];
   const movie = movies.find((m) => m.id === id);

   const update = (liked: boolean) => {
      if (locked || !movie) return;
      setLocked(true);
      const next = { ...session, votes: [...session.votes, { id: movie.id, liked }] };
      saveSession(next);
      setSession(next);
      setLocked(false);
   };
   const undo = () => {
      if (!session.votes.length || locked) return;
      const next = { ...session, votes: session.votes.slice(0, -1) };
      saveSession(next);
      setSession(next);
   };
   // TODO: загрузить сессию, хранить состояние игры и блокировки, найти текущий фильм.
   // TODO: без сессии вернуться к началу; после всех голосов открыть QR или результаты.
   return (
      <main className="workspace">
         <Header />

        {/* --- НАЧАЛО ПРОГРЕСС-БАРА --- */}
              {/* --- НАЧАЛО ПРОГРЕСС-БАРА --- */}
      {session && (
        <div style={{ padding: '10px 20px 0 20px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '6px',
            fontSize: '14px',
            color: '#4a5d4e', 
            fontWeight: 500
          }}>
            <span>Выбрано завтраков</span>
            <span>{session.votes.length} из {session.order.length}</span>
          </div>
          
          {/* Одна надежная полоса, которая красится градиентом в зависимости от прогресса */}
          <div style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: `linear-gradient(to right, #4CAF50 ${(session.votes.length / session.order.length) * 100}%, rgba(0, 0, 0, 0.08) ${(session.votes.length / session.order.length) * 100}%)`,
            transition: 'background 0.2s ease-out'
          }} />
        </div>
      )}
      {/* --- КОНЕЦ ПРОГРЕСС-БАРА --- */}


         <div className="swipe-area">
            {movie && (
               <Fragment key={movie.id}>
                  <SwipeCard
                     movie={movie}
                     onChoice={update}
                     disabled={locked}
                  />
                  <div className="vote-buttons">
                     <button
                        onClick={() => update(false)}
                        className="no"
                        aria-label="Дизлайк"
                     >
                        <HeartCrack size={64} />
                     </button>
                     <button
                        onClick={() => update(true)}
                        className="yes"
                        aria-label="Лайк"
                     >
                        <Heart size={64} />
                     </button>
                  </div>
               </Fragment>
            )}

            <div className="bottom-actions">
               <button
                  onClick={undo}
                  disabled={!session.votes.length}
               >
                  <RotateCcw size={17} /> Отменить
               </button>
                      <button
          onClick={
            () => {
              nav(session.role === 1 ? "/share" : "/result", { replace: true })
            }
          }
        >
          Завершить
        </button>

            </div>
         </div>
      </main>
   );
}

export { GamePage };