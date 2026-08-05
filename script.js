import { db } from "./firebase-config.js";


import {

collection,
addDoc,
onSnapshot,
query,
orderBy,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const login = document.getElementById("login");

const chat = document.getElementById("chat");

const nomeInput = document.getElementById("nome");

const entrar = document.getElementById("entrar");



let nome = localStorage.getItem("nome");


// verifica se já tem nome salvo

if(nome){

login.style.display = "none";

chat.style.display = "block";

}



// botão entrar

entrar.addEventListener("click",()=>{


if(nomeInput.value.trim()==""){

alert("Digite um nome");

return;

}



nome = nomeInput.value;


localStorage.setItem("nome", nome);



login.style.display="none";

chat.style.display="block";


});





const input = document.getElementById("mensagem");

const botao = document.getElementById("enviar");

const mensagens = document.getElementById("mensagens");




// enviar mensagem

botao.addEventListener("click", async ()=>{


if(input.value.trim()=="") return;



await addDoc(collection(db,"mensagens"),{


texto:input.value,

usuario:nome,

data:serverTimestamp()


});



input.value="";


});





// receber mensagens


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

<b>${msg.usuario}</b>

<br>

${msg.texto}

</div>

`;


});


});
