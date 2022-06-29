// Importa o módulo express para esse arquivo
const express = require("express");
const { url } = require("inspector");
const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer/lib/smtp-transport");

require("dotenv").config();

// Instancia uma referência do express no projeto
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
app.set("view engine", "ejs");
const path = require("path");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.render("index");
});


app.post("/send", async (req,res) => {


//   let forms = req.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       //let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!')
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//     });
//   });

    const {name, phone, email, oportunidade, vaga, valor, acreditar, insta} = req.body;
    let user = {
      nome: name,
      telefone: phone,
      email: email,
      oportunidade: oportunidade,
      vaga: vaga,
      valor: valor,
      insta: insta,
      acreditar: acreditar
    }
  
      const transporter = nodemailer.createTransport( new smtpTransport({
          
              host: process.env.MAIL_HOST,
              port: Number(process.env.MAIL_PORT),
              // service:"yahoo",
              auth: {
                user: process.env.username,
                pass: process.env.password,
              },
              
              // debug: true,
              logger:true,
              // secureConnection: false,
              tls:{
                  rejectUnAuthorized:false,
                  ignoreTLS: true,
                  secure: true,
              },
              pool:true, 
            
      }));
  
      await transporter
       .sendMail({
        
        from: `${user.nome} <${user.email}> `,
        to: process.env.username,
        subject: `Lista de espera`,
        text: `
Nome: 
        ${user.nome}
         
Whatsapp: 
        ${user.telefone}

Instagram:
        @${user.insta}

A Jornada IDADE É SÓ 1 NÚMERO é um treinamento de 16 semanas pra te ensinar a desenvolver força, coragem, disciplina, autoconfiança e uma nova postura diante da vida. Pra que você comece a transformar sua lista de desejos em realidade, um a um, dia após dia, independente da sua idade ou se hoje a sua vida está muito dura e bagunçada. 

Por que você acredita que a Jornada Idade é só 1 Número será a oportunidade ideal para você?: 
        ${user.oportunidade}
        
Caso abra vagas, porque uma delas deveria ser sua?:
        ${user.vaga}
        
O valor do IDADE É SÓ 1 NÚMERO é 1.297,00 REAIS, podendo ser parcelado em até 12 vezes no cartão (com juros). Você tem esse valor para investir em você?:
        ${user.valor}

Caso surja uma vaga, o que você acredita que tenha que acontecer para que, daqui a 6 meses, a experiência da jornada IDADE É SÓ 1 NÚMERO tenha valido a pena?:
        ${user.acreditar}
          `,
        })
  
        .then((r) => {
            // loading.innerHTML = 'Carregando'
            console.log(r);
            // sent.innerHTML = `<div class="sent-message">Your message has been sent.Thank you!</div>`
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.reset()
            displayOk(thisForm,response)
            res.redirect('/');
            
        })
        .catch((e) => {
            // loading.innerHTML = 'Carregando'
            console.log(e);
            // error.innerHTML = `${user.name}, não foi possível enviar a sua mensagem, recarregue a página e tente novamente. Em caso de reincidência, nos procure via Whatsapp`
            res.redirect('/');
            
        })
   
  })


//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

//   function displayOk(thisForm, response) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.sent-message').innerHTML = response;
//     thisForm.querySelector('.sent-message').classList.add('d-block');
//   }

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));