<?php
require_once "model.php";

$user=new UserInfo();
$user->username="xuwenmin888";
$user->userpwd="fsdfsdf";
for($i=0;$i<100000;$i++){
   $a=$i;
}

echo json_encode($user);