<?php
defined('BASEPATH') or exit('No direct script access allowed');

class KontenModel extends Render_Model
{
	function getData(){
		return $this->db->get('konten_home')->row_array();
	}
	
	function inputData($slider_judul, $slider_deskripsi, $informasi_judul, $informasi_deskripsi){
        $row = $this->db->select('id')->get('konten_home');
        if ($row->num_rows() > 0) {
            $row = $row->row_array();
            $id = $row['id'];
            $this->db->where('id', $id);
            $exe = $this->db->update('konten_home', [
                'slider_judul'          => $slider_judul,
                'slider_deskripsi'      => $slider_deskripsi,
                'informasi_judul'       => $informasi_judul,
                'informasi_deskripsi'   => $informasi_deskripsi, 
            ]);
        } else {
            $exe                         = $this->db->insert('konten_home', [
                'slider_judul'          => $slider_judul,
                'slider_deskripsi'      => $slider_deskripsi,
                'informasi_judul'       => $informasi_judul,
                'informasi_deskripsi'   => $informasi_deskripsi, 
            ]);
        }
        return $exe;
	}
}
