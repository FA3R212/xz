import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Intro } from "../comonents/Intro";
import { decodeInvitation, freshSession, getName, saveSession, setName as saveName } from "../model";

function JoinPage() {
    const nav = useNavigate();
   const loc = useLocation();
   const encoded = new URLSearchParams(loc.hash.slice(1)).get("s");
   const invitation = encoded ? decodeInvitation(encoded) : null;
   const [name, setName] = useState(getName());
   
    if (!invitation) {
      return (
         <Intro>
            <div className="center-block">
               <h2>Приглашение не найдено, попробуйте заново скопировать ссылку</h2>
            </div>
         </Intro>
      );
   }
    return(
        <Intro>
         <form
            className="join-form"
            onSubmit={(e) => {
               e.preventDefault();
               if (!name.trim()) return;
               const first = { name: invitation.name, likes: invitation.likes };
               saveName(name.trim());
               saveSession(freshSession(name.trim(), first));
               nav("/game");
            }}
         >
            <h2>{invitation.name} приглашает выбрать кино вместе!</h2>
            <p>Оцените те же 15 фильмов, и мы найдём совпадения</p>
            <input
               aria-label="Ваше имя"
               maxLength={40}
               placeholder="Ваше имя"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <button className="primary" disabled={!name.trim()}>
               Присоединиться
            </button>
         </form>
      </Intro>
    );
}

export { JoinPage }