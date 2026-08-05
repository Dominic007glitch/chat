import { db } from "./firebase-config.js";


import {

collection,
addDoc,
onSnapshot,
query,
orderBy,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const input = document.getElementById("mensagem");

const botao = document.getElementById("enviar");

const mensagens = document.getElementById("mensagens");



let nome = "Gabriel";



// ENVIAR MENSAGEM

botao.addEventListener("click", async ()=>{


if(input.value.trim() === ""){
return;
}



await addDoc(collection(db,"mensagens"),{


texto: input.value,

usuario: nome,

data: serverTimestamp()


});



input.value = "";


});




// RECEBER MENSAGENS


const q = query(

collection(db,"mensagens"),

orderBy("data")

);



onSnapshot(q,(snapshot)=>{


mensagens.innerHTML = "";



snapshot.forEach((doc)=>{


let msg = doc.data();



mensagens.innerHTML += `

<div class="msg">

<b>${msg.usuario}</b>

<br>

${msg.texto}

</div>

`;


});


});
