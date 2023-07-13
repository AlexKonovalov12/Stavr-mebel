<?
if (!$_POST)
exit();


ini_set('error_reporting', E_ALL);

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);




$ttoken='6234387809:AAEU1g5H7S3peZPHMgvGLt6MwWLzMb-A3aM';
$message="*С сайта получена новая заявка на консультацию!*\xF0\x9F\x94\xA5\r\n
Имя: {$_POST['name']} \r\n
Контактный телефон:{$_POST['phone']}";

$response = array(
	'chat_id' => 160559132,
	'text' => $message,
    'parse_mode' => 'markdown',
    'resize_keyboard' => true
);	
		

send($response,"sendMessage");










header("Location: ./?thankyou=show");





function send($param,$method)
{
    GLOBAL $ttoken;
$ch = curl_init('https://api.telegram.org/bot' . $ttoken . '/'.$method);  
curl_setopt($ch, CURLOPT_POST, 1);  
curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_exec($ch);
curl_close($ch);
}


?>