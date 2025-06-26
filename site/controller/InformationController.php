<?php
class InformationController
{
    public function paymentPolicy()
    {
        require 'view/information/paymentPolicy.php';
    }
    public function returnPolicy()
    {
        require 'view/information/returnPolicy.php';
    }
    public function deliveryPolicy()
    {
        require 'view/information/deliveryPolicy.php';
    }
}