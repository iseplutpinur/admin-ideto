<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ideto extends Render_Controller
{

    public function index()
    {
        // Page Settings
        $this->title = 'About Ideto';
        $this->navigation = ['About', "Ideto"];
        $this->plugins = ['summernote'];

        // Breadcrumb setting
        $this->breadcrumb_1 = 'Dashboard';
        $this->breadcrumb_2_url = base_url();
        $this->breadcrumb_2 = 'About';
        $this->breadcrumb_2_url = '#';
        $this->breadcrumb_3 = 'Ideto';
        $this->breadcrumb_3_url = '#';

        // content
        $this->content      = 'about/ideto';
        $this->data['about']  = $this->db->get('konten_about_ideto')->row_array();

        // Send data to view
        $this->render();
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

    public function insertSlider()
    {
        // get row jika ada
        $row = $this->db->select('id')->from('konten_about_ideto')->get()->result_array();
        $judul = $this->input->post('judul');
        $deskripsi = $this->input->post('deskripsi');
        if (count($row) > 0) {
            $id = $row[0]['id'];
            $this->db->where('id', $id);
            $exe = $this->db->update('konten_about_ideto', [
                'slider_judul' => $judul,
                'slider_deskripsi' => $deskripsi
            ]);
        } else {
            $exe                         = $this->db->insert('konten_about_ideto', [
                'slider_judul' => $judul,
                'slider_deskripsi' => $deskripsi
            ]);
        }
        $this->output_json(["status" => $exe]);
    }

    public function insertProfile()
    {
        // get row jika ada
        $row = $this->db->select('id')->from('konten_about_ideto')->get()->result_array();
        $judul = $this->input->post('judul');
        $deskripsi = $this->input->post('deskripsi', false);
        if (count($row) > 0) {
            $id = $row[0]['id'];
            $this->db->where('id', $id);
            $exe = $this->db->update('konten_about_ideto', [
                'profil_judul' => $judul,
                'profil_deskripsi' => $deskripsi
            ]);
        } else {
            $exe = $this->db->insert('konten_about_ideto', [
                'profil_judul' => $judul,
                'profil_deskripsi' => $deskripsi
            ]);
        }
        $this->output_json(["status" => $exe]);
    }

    public function insertSejarah()
    {
        // get row jika ada
        $row = $this->db->select('id')->from('konten_about_ideto')->get()->result_array();
        $judul = $this->input->post('judul');
        $deskripsi = $this->input->post('deskripsi', false);
        if (count($row) > 0) {
            $id = $row[0]['id'];
            $this->db->where('id', $id);
            $exe = $this->db->update('konten_about_ideto', [
                'sejarah_judul' => $judul,
                'sejarah_deskripsi' => $deskripsi
            ]);
        } else {
            $exe = $this->db->insert('konten_about_ideto', [
                'sejarah_judul' => $judul,
                'sejarah_deskripsi' => $deskripsi
            ]);
        }
        $this->output_json(["status" => $exe]);
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
        $this->load->model("about/IdetoModel", 'ideto');

        // path
        $this->path = 'images/about/ideto/';
    }
}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */