import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartCrack, RotateCcw } from "lucide-react";
import { Header } from "../comonents/Header";
import { Intro } from "../comonents/Intro";
import { Poster } from "../comonents/Poster";
import { clearSession, matches, movies, readSession } from "../model";

function ResultPage () {
    const nav = useNavigate();
   const s = readSession();
   const [tab, setTab] = useState<"matches" | "personal">("matches");
   const [person, setPerson] = useState<1 | 2>(2);

   if (!s || s.role !== 2 || !s.first || s.votes.length !== s.order.length)
      return (
         <Intro>
            <div className="center-block">
               <h2>Пока нет результатов</h2>
               <button className="primary" onClick={() => nav("/")}>
                  На главную
               </button>
            </div>
         </Intro>
      );

   const mine = s.votes.filter((v) => v.liked).map((v) => v.id);
   const shown = tab === "matches" ? matches(s.first.likes, mine) : person === 1 ? s.first.likes : mine;

   return (

<main className="workspace">
         <Header/>
         <section className="result-area">
            <nav className="result-tabs">
               <button className={tab === "matches" ? "active" : ""} onClick={() => setTab("matches")}>
                  Совпадения
               </button>
               <button className={tab === "personal" ? "active" : ""} onClick={() => setTab("personal")}>
                  Мой результат
               </button>
            </nav>
            {tab === "personal" && (
               <div className="person-tabs">
                  <button className={person === 1 ? "selected" : ""} onClick={() => setPerson(1)}>
                     {s.first.name}
                  </button>
                  <button className={person === 2 ? "selected" : ""} onClick={() => setPerson(2)}>
                     {s.name}
                  </button>
               </div>
            )}
            {shown.length ? (
               <div className="movie-grid">
                  {shown.map((id) => {
                     const m = movies.find((x) => x.id === id);
                     return m ? (
                        <div key={id} title={m.title}>
                           <Poster movie={m} small />
                        </div>
                     ) : null;
                  })}
               </div>
            ) : (
               <div className="empty-state">
                  <HeartCrack size={50} />
                  <h2>Пока нет совпадений</h2>
                  <p>Может быть, вы выберете что-то новое в следующий раз?</p>
               </div>
            )}
            <div className="result-footer">
               <button
                  onClick={() => {
                     clearSession();
                     nav("/");
                  }}
               >
                  <RotateCcw size={16} /> Начать снова
               </button>
            </div>
         </section>
      </main>
   )
}

export {ResultPage}