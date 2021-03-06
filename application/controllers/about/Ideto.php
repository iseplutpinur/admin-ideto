<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ideto extends Render_Controller
{

    public function index()
    {
        // Page Settings
        $this->title = 'About - Ideto';
        $this->navigation = ['About', "Konten Ideto"];
        $this->plugins = ['summernote'];

        // Breadcrumb setting
        $this->breadcrumb_1 = 'Dashboard';
        $this->breadcrumb_1_url = base_url();
        $this->breadcrumb_2 = 'About';
        $this->breadcrumb_2_url = '#';
        $this->breadcrumb_3 = 'Ideto';
        $this->breadcrumb_3_url = '#';

        // content
        $this->content      = 'about/ideto';
        $this->data['about']  = $this->model->getData();

        // Send data to view
        $this->render();
    }

    public function insertSlider()
    {
        // get row jika ada
        $judul = $this->input->post('judul');
        $deskripsi = $this->input->post('deskripsi');
        $exe = $this->model->inputSlider($judul, $deskripsi);
        $this->output_json(["status" => $exe]);
    }

    public function insertProfile()
    {
        $judul = $this->input->post('judul');
        $gambars = $this->input->post('gambar');
        $folder = $this->input->post('folder');
        $deskripsi = $this->input->post('deskripsi', false);
        // list gambar yang dikirim
        $gambars = $gambars == null ? [] : $gambars;
        $list_gambar = '';
        foreach ($gambars as $gambar) {
            $list_gambar .= ($list_gambar == '') ? $gambar : ('|' . $gambar);
        }
        // hapus gambar yang tidak terpakai
        $this->insertDeleteImage($gambars, $folder);

        // insert
        $exe = $this->model->inputProfile($judul, $deskripsi, $list_gambar);
        $this->output_json(["status" => $exe]);
    }

    public function insertSejarah()
    {
        $judul = $this->input->post('judul');
        $gambars = $this->input->post('gambar');
        $folder = $this->input->post('folder');
        $deskripsi = $this->input->post('deskripsi', false);

        // list gambar yang dikirim
        $gambars = $gambars == null ? [] : $gambars;
        $list_gambar = '';
        foreach ($gambars as $gambar) {
            $list_gambar .= ($list_gambar == '') ? $gambar : ('|' . $gambar);
        }
        // hapus gambar yang tidak terpakai
        $this->insertDeleteImage($gambars, $folder);

        // insert
        $exe = $this->model->inputSejarah($judul, $deskripsi, $list_gambar);
        $this->output_json(["status" => $exe]);
    }

    private function insertDeleteImage($gambars, $folder)
    {
        $folder = $folder == null ? '' : ($folder . '/');
        $this->load->helper('directory');
        $path = './' . $this->path . $folder;
        $files = directory_map($path, FALSE, TRUE);
        if ($files) {
            foreach ($files as $file) {
                if (!in_array($file, $gambars)) {
                    $this->deleteImage($path . $file);
                }
            }
        }

        // jika tidak ada gambar maka folder akan dihapus
        if ($files == false || $gambars == false) {
            if (is_dir($path)) {
                rmdir($path);
            }
        }
    }

    public function uploadImage()
    {
        $folder = $this->input->post('folder');
        $folder = $folder == null ? '' : ($folder . '/');
        $path = './' . $this->path . $folder;
        // cek directory
        if (!is_dir($path)) {
            mkdir($path, 0755, TRUE);
        }

        $config['upload_path']          = $path;
        $config['allowed_types']        = 'gif|jpg|png|jpeg|JPG|PNG|JPEG';
        $config['overwrite']            = false;
        $config['max_size']             = 8024;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        $result = $this->upload->do_upload('image');
        if ($result) {
            $file_name = $this->upload->data("file_name");
            $url = base_url($this->path) . $folder . $file_name;
            $this->output_json([
                'url' => [
                    'status' => 1,
                    'path' => $url,
                    'file_name' => $file_name
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

    private function deleteImage($path)
    {
        if (file_exists($path)) {
            $result = unlink($path);
        }
        return $result;
    }

    function __construct()
    {
        parent::__construct();
        $this->sesion->cek_session();
        if ($this->session->userdata('data')['level'] != 'Administrator') {
            redirect('login', 'refresh');
        }

        $this->default_template = 'templates/dashboard';
        $this->load->library(['plugin', 'Libs']);
        $this->load->helper('url');

        // model
        $this->load->model("about/IdetoModel", 'model');

        // path
        $this->path = 'images/about/ideto/';
    }
}

/* End of file Dashboard.php */
/* Location: ./application/controllers/Dashboard.php */