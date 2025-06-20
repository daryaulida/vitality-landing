<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

header('Content-Type: application/json');

function cleanData($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['name']) ? cleanData($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? cleanData($_POST['phone']) : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Имя и телефон обязательны.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
   
        $mail->CharSet = 'UTF-8';

        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@vtbaza.ru';       // логин
        $mail->Password = 'ВАШ_ПАРОЛЬ';           // пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;


        $mail->setFrom('info@vtbaza.ru', 'VTBAZA');
        $mail->addReplyTo('info@vtbaza.ru', 'VTBAZA');
        $mail->addAddress('info@vtbaza.ru');

  
        $mail->isHTML(true);
        $mail->Subject = 'Заявка перевозчик сайт vtbaza.su';
        $mail->Body = "
            <h3>Новая заявка</h3>
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Телефон:</strong> {$phone}</p>
        ";

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
}
?>
