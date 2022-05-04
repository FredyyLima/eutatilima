// Importa o módulo express para esse arquivo
const express = require("express");
const { url } = require("inspector");
const nodemailer = require('nodemailer');
// Instancia uma referência do express no projeto
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
app.set("view engine", "ejs");
const path = require("path");
app.use(express.urlencoded());


app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/envio", async (req, res) => {

const {email,subject,msg, name} = req.body
const user = {
  nome: name,
  email: email,
  assunto: subject,
  mensagem: msg
}
console.log(user)

  var transport = nodemailer.createTransport({
      host: "mail.eutatilima.com.br",
      port: 465,
      auth: {
          user: "suporte@eutatilima.com.br",
          pass: "suporte123"
      }
  });

  var message = {
      from: user.email,
      to: "suporte@eutatilima.com.br",
      subject: user.assunto,
      text: user.mensagem,
      
  };

  transport.sendMail(message, function (err) {
      if (err) return res.status(400).json({
          erro: true,
          mensagem: "Erro: E-mail não enviado com sucesso!"
      });
      res.redirect("/")
  });

  return res.json({
      erro: false,
      mensagem: `${user.nome} seu e-mail foi enviado com sucesso! Agradecemos o seu contato.`
  });
});

// app.get("/produto", (req, res) => {
//     res.render("portfolio-details")
// })


app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));