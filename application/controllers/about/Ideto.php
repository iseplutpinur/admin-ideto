<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ideto extends Render_Controller
{

    public function index()
    {
        // Page Settings
        $this->title = 'About Ideto';
        $this->navigation = ['About', "Ideto"];
        $this->plugins = ['datatables'];

        // Breadcrumb setting
        $this->breadcrumb_1 = 'Dashboard';
        $this->breadcrumb_2_url = base_url();
        $this->breadcrumb_2 = 'About';
        $this->breadcrumb_2_url = '#';
        $this->breadcrumb_3 = 'Ideto';
        $this->breadcrumb_3_url = '#';

        // Send data to view
        $this->render();
    }

    function __construct()
    {
        parent::__construct();
        $this->default_template = 'templates/dashboard';
        $this->load->library('plugin');
        $this->load->helper('url');

        // Cek session
        $this->sesion->cek_session();

        // model
        $this->load->model("DashboardModel", 'dashbrd');
    }
}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */