<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kategori extends Render_Controller
{

    public function index()
    {
        // Page Settings
        $this->title = 'Informasi - Kategori';
        $this->navigation = ['Informasi', "Kategori"];
        $this->plugins = ['datatables'];

        // Breadcrumb setting
        $this->breadcrumb_1 = 'Dashboard';
        $this->breadcrumb_1_url = base_url();
        $this->breadcrumb_2 = 'Informasi';
        $this->breadcrumb_2_url = '#';
        $this->breadcrumb_3 = 'List';
        $this->breadcrumb_3_url = '#';

        // content
        $this->content      = 'informasi/kategori';

        // Send data to view
        $this->render();
    }

    // Ajax Data
    public function ajax_data()
    {
        $order = ['order' => $this->input->post('order'), 'columns' => $this->input->post('columns')];
        $start = $this->input->post('start');
        $draw = $this->input->post('draw');
        $draw = $draw == null ? 1 : $draw;
        $length = $this->input->post('length');
        $cari = $this->input->post('search');

        if (isset($cari['value'])) {
            $_cari = $cari['value'];
        } else {
            $_cari = null;
        }

        $data = $this->model->getAllData($draw, $length, $start, $_cari, $order)->result_array();
        $count = $this->model->getAllData(null, null, null, $_cari, $order, null)->num_rows();

        $this->output_json(['recordsTotal' => $count, 'recordsFiltered' => $count, 'draw' => $draw, 'search' => $_cari, 'data' => $data]);
    }

    function __construct()
    {
        parent::__construct();
        // model
        $this->load->model("informasi/KategoriModel", 'model');
        $this->default_template = 'templates/dashboard';
        $this->load->library('plugin');
        $this->load->helper('url');

        // Cek session
        $this->sesion->cek_session();
    }
}

/* End of file Pengguna.php */
/* Location: ./application/controllers/pengaturan/Pengguna.php */