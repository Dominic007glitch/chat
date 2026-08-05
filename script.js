import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const input = document.getElementById("mensagem");
const botao = document.getElementById("enviar");
const mensagens = document.getElementById("mensagens");


// enviar mensagem

botao.addEventListener("click", async () => {

    if(input.value.trim() === "") return;


    await addDoc(collection(db, "mensagens"), {

        texto: input.value,

        data: serverTimestamp()

    });


    input.value = "";

});



// mostrar mensagens

const q = query(
    collection(db,"mensagens"),
    orderBy("data")
);


onSnapshot(q,(snapshot)=>{

    mensagens.innerHTML="";


    snapshot.forEach((doc)=>{

        let msg = doc.data();


        mensagens.innerHTML += `

        <div class="msg">
            ${msg.texto}
        </div>

        `;

    });


});
