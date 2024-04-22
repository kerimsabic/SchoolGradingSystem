<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting((E_ALL ^ (E_NOTICE | E_DEPRECATED)));

define( 'DBHOST', 'localhost' ); // Database
define( 'DBUSER', 'root' );     //
define( 'DBPASSWORD', 'sifra' );    //
define( "DBNAME",   "web-gms");
define('DB_PORT', 3306);



?>