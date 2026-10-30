import { getName } from "../model";
import {UserRound} from "lucide-react";

function Header() {
    const name = getName ();
    return (
        <header className="header">
         <span className="logo">Swipey</span>
         <div className="profile">
            <span title={name}>{name}</span>
            <UserRound size={24} fill="currentColor" />
         </div>
      </header>
    );
}

export {Header}