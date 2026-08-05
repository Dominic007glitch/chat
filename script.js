import { db } from "./firebase-config.js";

import {
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const area = document.getElementById("mensagens");


onSnapshot(collection(db,"mensagens"), (snapshot)=>{

    area.innerHTML = "";

    snapshot.forEach((doc)=>{

        let mensagem = doc.data();


        area.innerHTML += `
        <p>
        <b>${mensagem.usuario}</b>: 
        ${mensagem.texto}
        </p>
        `;

    });

});
