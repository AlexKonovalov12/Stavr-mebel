<?
$data = file_get_contents('php://input');
$data = json_decode($data, true);
//if (!empty($data['message']['photo']))
file_put_contents('message.txt', print_r($data, true)); 