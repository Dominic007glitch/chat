console.log("Chat Amigos iniciado");


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
} 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// ===============================
// VARIÁVEIS
// ===============================


let nome = localStorage.getItem("nome");

let salaAtual = "geral";

let pararMensagens = null;



// ===============================
// ELEMENTOS HTML
// ===============================


const login = document.getElementById("login");

const chat = document.getElementById("chat");


const nomeInput = document.getElementById("nome");

const entrar = document.getElementById("entrar");


const usuario = document.getElementById("usuario");


const mensagens = document.getElementById("mensagens");


const input = document.getElementById("mensagem");

const enviar = document.getElementById("enviar");


const tituloSala = document.getElementById("tituloSala");



// sala privada

const senhaSala = document.getElementById("senhaSala");

const senhaInput = document.getElementById("senha");

const entrarSala = document.getElementById("entrarSala");

const erroSenha = document.getElementById("erroSenha");



// salas

const botoesSala = document.querySelectorAll(".sala");




// ===============================
// LOGIN
// ===============================


if(nome){

    login.style.display = "none";

    chat.style.display = "flex";

    usuario.innerHTML = nome;

    abrirSala("geral");

}




entrar.addEventListener("click",()=>{


    if(nomeInput.value.trim() === ""){

        alert("Digite seu nome");

        return;

    }


    nome = nomeInput.value.trim();


    localStorage.setItem("nome",nome);



    login.style.display="none";

    chat.style.display="flex";


    usuario.innerHTML = nome;


    abrirSala("geral");


});




// ===============================
// ABRIR SALA
// ===============================


function abrirSala(sala){


    salaAtual = sala;


    if(tituloSala){

        tituloSala.innerHTML =
        sala === "geral"
        ? "📚 Sala Geral"
        : "🔒 Sala Privada";

    }



    carregarMensagens();


}





// ===============================
// CARREGAR MENSAGENS
// ===============================


function carregarMensagens(){



    mensagens.innerHTML="";



    if(pararMensagens){

        pararMensagens();

    }



    const q = query(

        collection(
            db,
            "salas",
            salaAtual,
            "mensagens"
        ),

        orderBy("data")

    );




    pararMensagens = onSnapshot(q,(snapshot)=>{


        mensagens.innerHTML="";



        snapshot.forEach((documento)=>{


            const msg = documento.data();



            const div = document.createElement("div");



            div.className =
            msg.usuario === nome
            ? "minha-msg"
            : "msg";



            div.innerHTML = `

                <b>${msg.usuario}</b>

                <br>

                ${msg.texto}

            `;



            mensagens.appendChild(div);



        });



        mensagens.scrollTop =
        mensagens.scrollHeight;



    });



}






// ===============================
// ENVIAR MENSAGEM
// ===============================


enviar.addEventListener("click", async()=>{


    if(input.value.trim()==="") return;



    await addDoc(

        collection(
            db,
            "salas",
            salaAtual,
            "mensagens"
        ),

        {

            texto: input.value,

            usuario: nome,

            data: serverTimestamp()

        }

    );



    input.value="";


});






input.addEventListener("keypress",(e)=>{


    if(e.key==="Enter"){

        enviar.click();

    }


});





// ===============================
// TROCAR SALAS
// ===============================


botoesSala.forEach(botao=>{


    botao.addEventListener("click",async()=>{


        const sala = botao.dataset.sala;



        if(sala==="privada"){


            chat.style.display="none";

            senhaSala.style.display="flex";


            return;


        }



        abrirSala(sala);



    });



});






// ===============================
// ENTRAR SALA PRIVADA
// ===============================


entrarSala.addEventListener("click",async()=>{



    const sala = await getDoc(

        doc(
            db,
            "salas",
            "privada"
        )

    );



    if(sala.exists()){


        const senhaCorreta =
        sala.data().senha;



        if(senhaInput.value === senhaCorreta){



            senhaSala.style.display="none";

            chat.style.display="flex";



            abrirSala("privada");



        }

        else{


            erroSenha.innerHTML =
            "Senha incorreta";


        }


    }



});
