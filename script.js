console.log("SCRIPT CARREGOU");

import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// LOGIN

const login = document.getElementById("login");
const chat = document.getElementById("chat");

const nomeInput = document.getElementById("nome");
const entrar = document.getElementById("entrar");
console.log("Botão entrar:", entrar);


let nome = localStorage.getItem("nome");

let salaAtual = "geral";



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


    localStorage.setItem("nome", nome);


    login.style.display = "none";
    chat.style.display = "flex";


});





// ELEMENTOS DO CHAT

const input = document.getElementById("mensagem");

const botao = document.getElementById("enviar");

const mensagens = document.getElementById("mensagens");





// ENVIAR MENSAGEM

botao.addEventListener("click", async()=>{


    if(input.value.trim()=="") return;



    await addDoc(
    collection(db, "salas", salaAtual, "mensagens"),
    {
        texto: input.value,
        usuario: nome,
        data: serverTimestamp()
    }
);



    input.value="";


});





// RECEBER MENSAGENS


const q = query(

    collection(db, "salas", salaAtual, "mensagens"),

    orderBy("data")

);



onSnapshot(q,(snapshot)=>{


    mensagens.innerHTML="";



    snapshot.forEach((documento)=>{


        let msg = documento.data();



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







// SALA PRIVADA


const salaPrivada = document.getElementById("salaPrivada");
console.log("Botão sala privada:", salaPrivada);


const senhaSala = document.getElementById("senhaSala");

const senhaInput = document.getElementById("senha");

const entrarSala = document.getElementById("entrarSala");

const erroSenha = document.getElementById("erroSenha");




salaPrivada.addEventListener("click",()=>{
console.log("Clicou na sala privada");

    chat.style.display="none";

    senhaSala.style.display="block";


});





entrarSala.addEventListener("click", async()=>{

    console.log("Clicou para entrar na sala privada");
    

    const sala = await getDoc(

        doc(db,"salas","privada")
        

    );

    console.log("Sala encontrada:", sala.exists());



    if(sala.exists()){


        let senhaCorreta = sala.data().senha;



        if(senhaInput.value === senhaCorreta){


            senhaSala.style.display="none";

            chat.style.display="flex";


            alert("Entrou na sala privada");


        }else{


            erroSenha.innerHTML="Senha incorreta";


        }


    }


});
