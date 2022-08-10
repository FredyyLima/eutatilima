<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if(isset($_POST['enviar'])){

$mail = new PHPMailer(true);

try {
    //Configurações do servidor 
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
    $mail->isSMTP();                                            
    $mail->Host       = 'mail.eutatilima.com.br';                    
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'suporte@eutatilima.com.br';                     
    $mail->Password   = 'Suporte@TatiLima5';                               
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         

    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->Port       = 465;           

    //Recipients
    $mail->setFrom($_POST['email'], 'Mailer');
    $mail->addAddress($_POST['email'], $_POST['name']);              
    $mail->addReplyTo('suporte@eutatilima.com.br', 'Suporte Tati Lima');
    $mail->isHTML(true);                             
    $mail->Subject = 'Lista de espera';
    
    $body = "
Nome: ".
    $_POST['name'] ."

Whatsapp: ".
    $_POST['phone'] ."

Instagram:
    @".$_POST['insta']."

A Jornada IDADE É SÓ 1 NÚMERO é um treinamento de 16 semanas pra te ensinar a desenvolver força, coragem, disciplina, autoconfiança e uma nova postura diante da vida. Pra que você comece a transformar sua lista de desejos em realidade, um a um, dia após dia, independente da sua idade ou se hoje a sua vida está muito dura e bagunçada. 

Por que você acredita que a Jornada Idade é só 1 Número será a oportunidade ideal para você?: 
    ".$_POST['oportunidade']."
    
Caso abra vagas, porque uma delas deveria ser sua?:
    ".$_POST['vaga']."
    
O valor do IDADE É SÓ 1 NÚMERO é 1.297,00 REAIS, podendo ser parcelado em até 12 vezes no cartão (com juros). Você tem esse valor para investir em você?:
    ".$_POST['valor']."

Caso surja uma vaga, o que você acredita que tenha que acontecer para que, daqui a 6 meses, a experiência da jornada IDADE É SÓ 1 NÚMERO tenha valido a pena?:
    ".$_POST['acreditar']."

    Esse e-mail foi enviado via PHP
    "

    $mail->Body    = $body;

    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    //Lista de copia e copia oculta
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Anexos (imagens, videos, etc...)
    // $mail->addAttachment('/var/tmp/file.tar.gz');         
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    

    $mail->send();
    echo 'Email enviado com sucesso';
    } catch (Exception $e) {
        echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    }

} else {
    echo "Erro ao enviar e-mail, acesso não foi feito via formulário";
};