/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer/lib/smtp-transport");
require("dotenv").config();

(function () {
  "use strict";

  let fredy = {}
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      //let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      /*if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {*/
        //php_email_form_submit(thisForm, action, formData);
      //}
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {

      async function send (){
      const {name, phone, email, oportunidade, vaga, valor, acreditar} = fetch.body;
      let user = {
        nome: name,
        telefone: phone,
        email: email,
        oportunidade: oportunidade,
        vaga: vaga,
        valor: valor,
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
           
  Telefone: 
          ${user.telefone}
  
  A Jornada IDADE ?? S?? 1 N??MERO ?? um treinamento de 16 semanas pra te ensinar a desenvolver for??a, coragem, disciplina, autoconfian??a e uma nova postura diante da vida. Pra que voc?? comece a transformar sua lista de desejos em realidade, um a um, dia ap??s dia, independente da sua idade ou se hoje a sua vida est?? muito dura e bagun??ada. Por que voc?? acredita que a Jornada Idade ?? s?? 1 N??mero ser?? a oportunidade ideal para voc???: 
          ${user.oportunidade}
          
  Caso abra vagas, porque uma delas deveria ser sua?:
          ${user.vaga}
          
  O valor do IDADE ?? S?? 1 N??MERO ?? 1.297,00 REAIS, podendo ser parcelado em at?? 12 vezes no cart??o (com juros). Voc?? tem esse valor para investir em voc???:
          ${user.valor}
  
  Caso surja uma vaga, o que voc?? acredita que tenha que acontecer para que, daqui a 6 meses, a experi??ncia da jornada IDADE ?? S?? 1 N??MERO tenha valido a pena?:
          ${user.acreditar}
            `,
          })
    
          // .then((r) => {
          //     // loading.innerHTML = 'Carregando'
          //     console.log(r);
          //     // sent.innerHTML = `<div class="sent-message">Your message has been sent.Thank you!</div>`
          //     res.redirect('/');
              
          // })
          // .catch((e) => {
          //     // loading.innerHTML = 'Carregando'
          //     console.log(e);
          //     // error.innerHTML = `${user.name}, n??o foi poss??vel enviar a sua mensagem, recarregue a p??gina e tente novamente. Em caso de reincid??ncia, nos procure via Whatsapp`
          //     res.redirect('/');
              
          // })
      }
      
      

      if( response.ok ) {
        fredy={
          msg: response,
          ok: "Sua mensagem foi enviada com sucesso!"
        }
        
        let resposta = fredy.ok
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset()
        displayOk(thisForm,resposta)
        return response.text()
        
      } else {
        throw new Error(`${response.status}. Sua mensagem n??o foi enviada, favor recarregue a p??gina e tente novamente ou se preferir, clique no ??cone do telefone e entre em contato por WhatsApp`); 
      }
    })
    
    .then(data => {
      
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }
  
  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  function displayOk(thisForm, resposta) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.sent-message').innerHTML = resposta;
    thisForm.querySelector('.sent-message').classList.add('d-block');
  }

})();
