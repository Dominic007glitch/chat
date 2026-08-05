import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// LOGIN

const login = document.getElementById("login");
const chat = document.getElementById("chat");

const nomeInput = document.getElementById("nome");
const entrar = document.getElementById("entrar");


let nome = localStorage.getItem("nome");



if(nome){

    login.style.display = "none";
    chat.style.display = "flex";

}




entrar.addEventListener("click",()=>{


    if(nomeInput.value.trim()==""){

        alert("Digite seu nome");
        return;

    }


    nome = nomeInput.value;


    localStorage.setItem("nome",nome);


    login.style.display="none";
    chat.style.display="flex";


});





// CHAT


const input = document.getElementById("mensagem");
const botao = document.getElementById("enviar");
const mensagens = document.getElementById("mensagens");




// ENVIAR

botao.addEventListener("click",async()=>{


    if(input.value.trim()=="") return;



    await addDoc(collection(db,"mensagens"),{


        texto: input.value,

        usuario: nome,

        data: serverTimestamp()


    });



    input.value="";


});





// RECEBER


const q = query(

    collection(db,"mensagens"),

    orderBy("data")

);



onSnapshot(q,(snapshot)=>{


    mensagens.innerHTML="";



    snapshot.forEach((doc)=>{


        let msg = doc.data();



        let classe = msg.usuario === nome ? "minha-msg" : "msg";



        mensagens.innerHTML += `


        <div class="${classe}">

            <b>${msg.usuario}</b>

            <br>

            ${msg.texto}

        </div>


        `;



    });


});
