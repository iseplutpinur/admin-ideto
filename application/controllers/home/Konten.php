<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Konten extends Render_Controller
{

    public function index()
    {
        // Page Settings
        $this->title = 'Home - Konten';
        $this->navigation = ['Home', "Konten Home"];
        $this->plugins = ['summernote'];

        // Breadcrumb setting
        $this->breadcrumb_1 = 'Dashboard';
        $this->breadcrumb_1_url = base_url();
        $this->breadcrumb_2 = 'Home';
        $this->breadcrumb_2_url = '#';
        $this->breadcrumb_3 = 'Konten';
        $this->breadcrumb_3_url = '#';

        // content
        $this->content      = 'home/konten';
        $this->data['home']  = $this->model->getData();

        // Send data to view
        $this->render();
    }

    public function insert()
    {
        // get row jika ada
        $slider_judul       = $this->input->post('slider_judul');
        $slider_deskripsi   = $this->input->post('slider_deskripsi');
        $informasi_judul            = $this->input->post('informasi_judul');
        $informasi_deskripsi        = $this->input->post('informasi_deskripsi', false);
        $exe = $this->model->inputData($slider_judul, $slider_deskripsi, $informasi_judul, $informasi_deskripsi);
        $this->output_json(["status" => $exe]);
    }

    public function uploadImage()
    {
        $path = $this->path;
        $config['upload_path']          = './' . $path;
        $config['allowed_types']        = 'gif|jpg|png|jpeg|JPG|PNG|JPEG';
        $config['overwrite']            = false;
        $config['max_size']             = 8024;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $result = $this->upload->do_upload('image');
        if ($result) {
            $file_name = $this->upload->data("file_name");
            $url = base_url($path) . $file_name;
            $this->output_json([
                'url' => [
                    'status' => 1,
                    'path' => $url,
                    'file_name' => $file_name,
                    'path_upload' => './' . $path . $file_name
                ]
            ]);
        } else {
            $this->output_json([
                'url' => [
                    'status' => 0,
                    'message' => $this->upload->display_errors()
                ]
            ], 500);
        }
    }

    public function deleteImage()
    {
        $name = $this->input->post('name');
        $path = './' . $this->path . $name;
        $result = true;

        if (file_exists($path)) {
            $result = unlink($path);
        }

        $this->output_json([
            'url' => [
                'status' => $result,
                'path_upload' => $path
            ]
        ]);
    }

    function __construct()
    {
        parent::__construct();
        $this->sesion->cek_session();
        if ($this->session->userdata('data')['level'] != 'Administrator') {
            redirect('login', 'refresh');
        }

        $this->default_template = 'templates/dashboard';
        $this->load->library('plugin');
        $this->load->helper('url');


        // model
        $this->load->model("home/KontenModel", 'model');

        // path
        $this->path = 'images/home/konten/';
    }
}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */