from flask import Flask, render_template, redirect, request
from flask_mail import Mail, Message
import os
import dotenv

dotenv.load_dotenv(dotenv.find_dotenv())

username = os.getenv("username")
senha = os.getenv("password")

app = Flask(__name__, template_folder='templates')

mail_settings = {
    "MAIL_SERVER": 'mail.eutatilima.com.br',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": username,
    "MAIL_PASSWORD": senha
}

app.config.update(mail_settings)
mail = Mail(app)


class Contato:
   def __init__ (self, name, email, msg, assunto):
      self.nome = name
      self.email = email
      self.mensagem = msg
      self.subject = assunto

@app.route('/')
def index():
   return render_template('index.ejs')

@app.route('/video')
def video():
   return render_template('video.ejs')

@app.route('/send', methods=['GET', 'POST'])
def send():
   if request.method == 'POST':
      formContato = Contato(
         request.form['name'],
         request.form['email'],
         request.form['msg'],
         request.form['subject']
      )

      msg = Message(
         subject=f'''{formContato.subject}''',
         sender=app.config.get("MAIL_USERNAME"),
         recipients=[app.config.get("MAIL_USERNAME")],
         body=f'''O {formContato.nome} com o email {formContato.email}, te mandou a seguinte mensagem: 
         
               {formContato.mensagem}''' 
         )
      mail.send(msg)
      return("Sua mensagem foi enviada com sucesso!")
   else:
      return("Lamentamos, mas houve um erro e sua mensagem não foi enviada. Favor atualizar a págia e tentar novamente.")

if __name__ == '__main__':
      port = int(os.environ.get("PORT", 3000))
      app.run(host='0.0.0.0', port=port)