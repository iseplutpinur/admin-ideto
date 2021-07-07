<?php
defined('BASEPATH') or exit('No direct script access allowed');

class My404 extends Render_Controller
{

	public function index()
	{
		// Page config:
		$this->title = 'Error 404';
		$this->title_show = false;
		$this->content = 'err404';
		$this->plugins = [];
		$this->output->set_status_header('404');
		// Commit render:
		$this->render();
	}

	function __construct()
	{
		parent::__construct();
		$this->default_template = 'templates/dashboard';
		$this->load->library('plugin');
		$this->load->helper('url');

		// cek session
		$this->sesion->cek_session();
	}
}
