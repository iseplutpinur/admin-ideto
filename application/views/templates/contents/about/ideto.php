<div class="row">
    <div class="col-md-6">
        <div class="card card-outline card-secondary">
            <div class="card-header">
                <h3 class="card-title">
                    Slider
                </h3>
            </div>
            <form id="form-slider">
                <div class="card-body">
                    <div class="form-group">
                        <label for="slider-judul">Judul</label>
                        <input type="text" class="form-control" placeholder="Slider Judul" id="slider-judul" name="slider-judul" value="<?= isset($about['slider_judul']) ? $about['slider_judul'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label for="slider-deskripsi">Deskripsi</label>
                        <textarea class="form-control" rows="3" placeholder="Slider Deskripsi" id="slider-deskripsi" name="slider-deskripsi"><?= isset($about['slider_deskripsi']) ? $about['slider_deskripsi'] : '' ?></textarea>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-secondary">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card card-outline card-primary">
            <div class="card-header">
                <h3 class="card-title">
                    Profil
                </h3>
            </div>
            <form id="form-profile">
                <div class="card-body">
                    <div class="form-group">
                        <label for="profile-judul">Judul</label>
                        <input type="text" class="form-control" placeholder="Profil Judul" id="profile-judul" name="profile-judul" value="<?= isset($about['profil_judul']) ? $about['profil_judul'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label for="profile-deskripsi">Deskripsi</label>
                        <textarea id="profile-deskripsi" name="profile-deskripsi" class="summernote"><?= isset($about['profil_deskripsi']) ? $about['profil_deskripsi'] : '' ?></textarea>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" form="form-profile" class="btn btn-primary">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card card-outline card-info">
            <div class="card-header">
                <h3 class="card-title">
                    Sejarah
                </h3>
            </div>
            <form id="form-sejarah">
                <div class="card-body">
                    <div class="form-group">
                        <label for="sejarah-judul">Judul</label>
                        <input type="text" class="form-control" placeholder="Sejarah Judul" id="sejarah-judul" name="sejarah-judul" value="<?= isset($about['sejarah_judul']) ? $about['sejarah_judul'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label for="sejarah-deskripsi">Deskripsi</label>
                        <textarea id="sejarah-deskripsi" name="sejarah-deskripsi" class="summernote"><?= isset($about['sejarah_deskripsi']) ? $about['sejarah_deskripsi'] : '' ?></textarea>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-info" form="form-sejarah">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>