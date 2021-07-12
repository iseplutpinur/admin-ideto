
<div class="row">
    <div class="col-md-12">
        <div class="card card-outline card-info">
            <div class="card-header">
                <h3 class="card-title">
                    Konten
                </h3>
            </div>
            <form id="form-konten">
                <div class="card-body">
                    <div class="form-group">
                        <label for="slider-judul">Judul Slider</label>
                        <input type="text" class="form-control" placeholder="Slider Judul" id="slider-judul" name="slider-judul" value="<?= isset($home['slider_judul']) ? $home['slider_judul'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label for="slider-deskripsi">Deskripsi Slider</label>
                        <textarea class="form-control" rows="3" placeholder="Slider Deskripsi" id="slider-deskripsi" name="slider-deskripsi"><?= isset($home['slider_deskripsi']) ? $home['slider_deskripsi'] : '' ?></textarea>
                    </div>
                </div>

                <div class="card-body">
                    <div class="form-group">
                        <label for="informasi-judul">Judul Informasi</label>
                        <input type="text" class="form-control" placeholder="Judul Informasi" id="informasi-judul" name="informasi-judul" value="<?= isset($home['informasi_judul']) ? $home['informasi_judul'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label for="informasi-deskripsi">Deskripsi Informasi</label>
                        <textarea id="informasi-deskripsi" name="informasi-deskripsi" class="summernote"><?= isset($home['informasi_deskripsi']) ? $home['informasi_deskripsi'] : '' ?></textarea>
                    </div>
                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-info" form="form-konten">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>