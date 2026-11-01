import { Check } from "lucide-react";

function Input ({value, onChange, onClick}: {value: string, onChange: (newVelue: string) => void, onClick: () => void}) {
    return(
        <div className="main__name">
            <input className="main__input" 
            type="text" 
            placeholder="введите имя" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} />
            <button className="main__button" onClick={onClick}>
                <Check />
            </button>
        </div>
    );
}

export {Input}