<?php

use PhpOffice\PhpSpreadsheet\Calculation\Logical\Boolean;

defined('BASEPATH') or exit('No direct script access allowed');

class KategoriModel extends Render_Model
{
    public function getAllData($draw = null, $show = null, $start = null, $cari = null, $order = null)
    {
        // select tabel
        $this->db->select("*");
        $this->db->from("kategori");

        // order by
        if ($order['order'] != null) {
            $columns = $order['columns'];
            $dir = $order['order'][0]['dir'];
            $order = $order['order'][0]['column'];
            $columns = $columns[$order];

            $order_colum = $columns['data'];
            $this->db->order_by($order_colum, $dir);
        }

        // initial data table
        if ($draw == 1) {
            $this->db->limit(10, 0);
        }

        // pencarian
        if ($cari != null) {
            $this->db->where("(nama LIKE '%$cari%' or tanggal LIKE '%$cari%' or created_at LIKE '%$cari%' or updated_at LIKE '%$cari%')");
        }

        // pagination
        if ($show == null && $start == null) {
            $this->db->limit($show, $start);
        }

        $result = $this->db->get();
        return $result;
    }

    public function getKategori($id)
    {
        $result = $this->db->get_where("kategori", ['id' => $id])->row_array();
        return $result;
    }

    public function insert($nama, $tanggal)
    {
    }

    public function update($id, $nama, $tanggal)
    {
    }
}
