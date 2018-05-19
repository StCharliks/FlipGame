<?php
$file = file_get_contents(index.html)

if isset($_POST['field']) $field = $_POST['field'];

$file = preg_replace("/let Images = false;/", "let Images = $field", $file);

echo $file;
?>