import { Check } from "lucide-react";
import { useState } from "react";
import { freshSession, saveSession } from "../model";
import { useNavigate } from "react-router-dom";
import { Intro } from "../comonents/Intro";

function HomePage() {
const [name, setName] = useState("");
const nav = useNavigate();

const ruchka = () => {
    localStorage.setItem("name", name);
    saveSession(freshSession(name));
    nav("/game")
};

    return (
        <Intro>
       <main className="main">
        <h1 className="main_title">Poz</h1>
        <div className="main_name">
            <input className="main_input" 
            type="text" 
            placeholder="введите имя" 
            value={name} 
            onChange={(e) => setName(e.target.value)} />
            <button className="main_button" onClick={ruchka}>
                <Check />
            </button>
        </div>
    </main>  </Intro>
   
    );
}

export {HomePage};