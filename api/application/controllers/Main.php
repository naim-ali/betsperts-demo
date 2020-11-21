<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

    public function __construct() {
        parent:: __construct();
        $this->load->library('Template');
        $this->user_id = $this->get_user_id();
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    |
    | Desc: Display the error View
    |
    |__________________________________________________________________________
    */
    private function error()
    {
        $this->load->view('errors/html/access_error.php', $message);
    }
}
