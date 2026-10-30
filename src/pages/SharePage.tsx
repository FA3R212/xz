import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { Intro } from "../comonents/Intro";
import { createInvitation, encodeInvitation, readSession } from "../model";

function SharePage() {
const nav = useNavigate();
   const s = readSession();
   const [copied, setCopied] = useState(false);

   useEffect(() => {
      if (!s || s.role !== 1 || s.votes.length !== s.order.length) nav("/", { replace: true });
   }, [s, nav]);

   if (!s || s.role !== 1) return null;

   const inv = createInvitation(s);
   const link = `${location.origin}/join#s=${encodeInvitation(inv)}`;

   function same() {
      nav("/join#s=" + encodeInvitation(inv));
   }
   async function copy() {
      await navigator.clipboard.writeText(link);
      setCopied(true);
   }

    return(
        <Intro>
         <div className="qr-content">
            <h2>Отсканируйте QR-код, чтобы подключиться</h2>
            <div className="qr-square">
               <QRCodeSVG value={link} size={206} marginSize={1} />
            </div>
            <p>Передайте ссылку второму игроку</p>
            <button className="outline-button" onClick={copy}>
               <Copy size={18} />
               {copied ? "Скопировано" : "Скопировать ссылку"}
            </button>
            <button className="text-button" onClick={same}>
               Продолжить на этом телефоне
            </button>
         </div>
      </Intro>
    );
}

export {SharePage}