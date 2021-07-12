<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ListInformasi extends Render_Controller
{

	public function index()
	{
		// Page Settings
		$this->title = 'Informasi - Konten';
		$this->navigation = ['Informasi', "Konten Informasi"];
		$this->plugins = [];

		// Breadcrumb setting
		$this->breadcrumb_1 = 'Dashboard';
		$this->breadcrumb_1_url = base_url();
		$this->breadcrumb_2 = 'Informasi';
		$this->breadcrumb_2_url = '#';
		$this->breadcrumb_3 = 'Konten';
		$this->breadcrumb_3_url = '#';

		// content
		$this->content      = 'informasi/konten';
		$this->data['informasi']  = $this->model->getData();

		// Send data to view
		$this->render();
	}

	function __construct()
	{
		parent::__construct();
		// model
		$this->load->model("informasi/KontenModel", 'model');
		$this->default_template = 'templates/dashboard';
		$this->load->library('plugin');
		$this->load->helper('url');

		// Cek session
		$this->sesion->cek_session();
	}
}

/* End of file Pengguna.php */
/* Location: ./application/controllers/pengaturan/Pengguna.php */