<div class="card">
    <div class="card-header">
        <div class="d-flex justify-content-between w-100">
            <h3 class="card-title">List Data Menu</h3>
            <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i> Tambah</button>
        </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Parent</th>
                    <th>Nama</th>
                    <th>Keterangan</th>
                    <th>Index</th>
                    <th>Icon</th>
                    <th>Url</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php $no = 1;
                foreach ($records as $q) : ?>
                    <tr data-id="<?= $q['menu_id'] ?>">
                        <td><?= $q['parent'] ?></td>
                        <td><?= $q['menu_nama'] ?></td>
                        <td><?= $q['menu_keterangan'] ?></td>
                        <td><?= $q['menu_index'] ?></td>
                        <td><i class="<?= $q['menu_icon'] ?>"></i> <?= $q['menu_icon'] ?></td>
                        <td><?= $q['menu_url'] ?></td>
                        <td><?= $q['menu_status'] ?></td>
                        <td>
                            <div>
                                <button class="btn btn-primary btn-sm" onclick="Ubah(<?= $q['menu_id'] ?>)">
                                    <i class="fa fa-edit"></i> Ubah
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="Hapus(<?= $q['menu_id'] ?>)">
                                    <i class="fa fa-trash"></i> Hapus
                                </button>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <!-- /.card-body -->
</div>