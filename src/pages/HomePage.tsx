import { Check } from "lucide-react";
import { GradientBackground } from "../comonents/GradientBackground";
import { useState } from "react";

function HomePage() {
const [name, setName] = useState("");

const ruchka = () => {
    localStorage.setItem("name", name);
};

    return (
        <>
        <GradientBackground />
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
        <p className="main_description">Выбери что-то на вечер</p>
    </main>  </>
   
    );
}

export {HomePage};