<?php
session_start();
// router
// c: controller
// a: action trong controller đó
$c = $_GET['c'] ?? 'home'; //đặt controller student là mặc định
$a = $_GET['a'] ?? 'index'; //đặt action index là mặc định

// mục tiêu là call action có biến là $a nằm trong controller có biến là $c
$strController = ucfirst($c) . 'Controller';

//import controller vào hệ thống
require "controller/$strController.php";

// import model vào hệ thống
require '../bootstrap.php';

// import file cấu hình
require '../config.php';
require '../connectDB.php';

//khởi tạo đối tượng controller
$controller = new $strController();

//gọi hàm chạy
$controller->$a();
