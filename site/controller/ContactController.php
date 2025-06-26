<?php
class ContactController
{
    function form()
    {
        require 'view/contact/form.php';
    }

    function sendEmail()
    {
        sleep(3);
        echo 'Đã gửi mail thành công';
    }
}
