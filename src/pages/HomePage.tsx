import { useState } from "react";
import { freshSession, saveSession } from "../model";
import { useNavigate } from "react-router-dom";
import { Intro } from "../comonents/Intro";
import { Input } from "../comonents/input";

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
        <Input value={name} onChange={setName} onClick={ruchka} />
    </main> 
    </Intro>
   
    );
}

export {HomePage};