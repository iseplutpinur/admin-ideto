<div id="content">

	<!-- row -->
	<div class="row">

		<!-- col -->
		<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
			<h1 class="page-title txt-color-blueDark" style="font-weight:bold; text-transform: unset;">
				<!-- PAGE HEADER -->
				<i class="fa-fw fa fa-table"></i>

				<?= $title ?> - <b><?= $npsn ?> (<?= $cabang ?>)</b>
			</h1>
		</div>

		<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
			<h1 class="page-title txt-color-blueDark" style="text-align: right;">
				Total Ringgit: <b id="format_ringgit_total"><?= $total['total_harga_ringgit']; ?></b>
			</h1>
		</div>
		<!-- end col -->

	</div>
	<!-- end row -->

	<!--
		The ID "widget-grid" will start to initialize all widgets below
		You do not need to use widgets if you dont want to. Simply remove
		the <section></section> and you can use wells or panels instead
		-->

	<!-- widget grid -->
	<section id="widget-grid" class="">

		<!-- row -->
		<div class="row">

			<!-- NEW WIDGET START -->
			<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

				<!-- Widget ID (each widget will need unique ID)-->
				<div class="jarviswidget" id="wid-id-0" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-deletebutton="false">
					<header>
						<span class="widget-icon"> <i class="fa fa-table"></i> </span>
					</header>

					<!-- widget div-->
					<div>

						<!-- widget edit box -->
						<div class="jarviswidget-editbox">
							<!-- This area used as dropdown edit box -->
							<input class="form-control" type="text">
						</div>
						<!-- end widget edit box -->

						<!-- widget content -->
						<div class="widget-body">
							<div class="pull-right">
								<!-- <a class="btn btn-success btn-sm" href="<?= base_url() ?>realisasi/cetakexcel">
									<i class="fa fa-download"></i> Excel
								</a> -->
								<!-- <button class="btn btn-danger btn-sm" id="pdf">
									<i class="fa fa-download"></i> PDF
								</button> -->
							</div>
							<table id="dt_basic" class="table table-striped table-bordered table-hover" width="100%">
								<thead>
									<tr>
										<th> <input type="checkbox" onchange="handleSetAllCheckbox(this)" id="check-all"> Semua</th>
										<th> Kode Standar</th>
										<th> Nama</th>
										<th> Anggaran RAB (RM)</th>
										<th> Anggaran RAB (Rp)</th>
										<th> Harga Real (RM)</th>
										<th> Harga Real (Rp)</th>
										<th> Selisih (RM)</th>
										<th> Selisih (Rp)</th>
										<th> Status</th>
									</tr>
								</thead>
								<tbody>
									<?php foreach ($rabs as $q) : ?>
										<tr>
											<?php if ($q['id_realisasi']) : ?>
												<td>
													<button style="width: 100%;" class="btn btn-success btn-xs" onclick="Detail(<?= $q['id_realisasi'] ?>)">
														<i class="fa fa-edit"></i> Detail
													</button>
												</td>
											<?php else : ?>
												<td><input name="id_rab" value="" type="checkbox" class="check" data-kode="<?= $q['kodes'] ?>" data-uraian="<?= $q['nama_aktifitas'] ?>" data-ringgit="<?= $q['total_harga_ringgit'] ?>" data-id_rab="<?= $q['id'] ?>" data-rupiah="<?= $q['total_harga_rupiah'] ?>"></td>
											<?php endif; ?>
											<td><?= $q['kodes'] ?></td>
											<td><?= $q['nama_aktifitas'] ?></td>
											<td><?= $this->libs->ringgit_non($q['total_harga_ringgit']); ?></td>
											<td><?= $this->libs->rupiah_non($q['total_harga_rupiah']); ?></td>
											<td><?= $this->libs->ringgit_non($q['harga_ringgit']); ?></td>
											<td><?= $this->libs->rupiah_non($q['harga_rupiah']); ?></td>
											<td><?= $this->libs->ringgit_non($q['sisa_ringgit']); ?></td>
											<td><?= $this->libs->rupiah_non($q['sisa_rupiah']); ?></td>
											<td><?= $q['id_realisasi'] ? 'Sudah Direalisasikan' : 'Belum Direalisasikan' ?></td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
							<br>
							<div class="row">
								<div class="col-md-12">
									<a href="#" onclick="ubah(this)" class="btn btn-default" id="btn-ubah" disabled> Belanja</a>
								</div>
							</div>
						</div>
						<!-- end widget content -->

					</div>
					<!-- end widget div -->

				</div>
				<!-- end widget -->

			</article>
			<!-- WIDGET END -->

		</div>

		<!-- end row -->

	</section>
	<!-- end widget grid -->

</div>
<!-- END MAIN CONTENT -->

<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<form id="form" method="post" enctype="multipart/form-data">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<div class="row">
						<div class="col">
							<br>
							<h4 style="font-weight: bold; text-align:center" class="modal-title" id="myModalLabel">Realisasi Bealnja</h4>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label for="belanja-kode-standar"> Kode Standar</label>
										<input type="text" class="form-control" id="belanja-kode-standar" readonly="" style="display: none;" />
										<p id="belanja-kode-standar-text"></p>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="belanja-uraianr"> Uraian</label>
										<input type="text" class="form-control" id="belanja-uraianr" readonly="" style="display: none;" />
										<p id="belanja-uraianr-text"></p>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="belanja-text-total-ringgit"> Anggaran RAB (RM)</label>
										<input type="text" class="form-control" id="belanja-text-total-ringgit" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="belanja-text-total-rupiah"> Anggaran RAB (Rp)</label>
										<input type="text" class="form-control" id="belanja-text-total-rupiah" readonly="" />
									</div>
								</div>
							</div>

						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="form-group">
									<div class="col-md-6">
										<input style="margin-left: 10px;" type="text" id="belanja-nama-0" class="form-control" name="belanja-nama" placeholder="" value="Dibayarkan kepada " readonly />
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control" id="belanja-nama-1" name="belanja-nama" placeholder="" value="" required />
									</div>
									<div class="col-md-6">
										<input style="margin-left: 10px;" type="text" id="belanja-nama-2" class="form-control" name="belanja-nama" placeholder="" value=" untuk " readonly />
									</div>
									<div class="col-md-6">
										<input type="text" class="form-control" id="belanja-nama-3" name="belanja-nama" placeholder="" value="" required />
									</div>
								</div>
							</div>
							<br>
							<div class="col-md-12">
								<div class="form-group">
									<label for="belanja-keterangan"> Keterangan</label>
									<textarea class="form-control" id="belanja-keterangan" name="belanja-keterangan"></textarea>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="belanja-harga-ringgit"> Harga Real (RM)</label>
									<input type="hidden" class="form-control" id="belanja-harga-ringgit" name="harga_ringgit">
									<input type="text" class="form-control" id="belanja-text-harga-ringgit">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="belanja-harga-rupiah"> Harga Real (Rp)</label>
									<input type="hidden" class="form-control" id="belanja-harga-rupiah" name="harga_rupiah">
									<input type="text" class="form-control" id="belanja-text-harga-rupiah">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="belanja-file"> Photo Resit / Nota / Kwitansi</label>
									<input type="file" class="form-control" accept="image/png, image/gif, image/jpg, image/jpeg" id="belanja-file" name="file" required />
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="belanja-tanggal"> Tanggal</label>
									<input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>" id="belanja-tanggal" name="tanggal" required />
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal">
					Cancel
				</button>
			</div>
	</div><!-- /.modal-content -->
	</form>
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<form id="form1" method="post" enctype="multipart/form-data">
			<input type="hidden" name="id" id="id">
			<input type="hidden" name="id_cabang" id="id_cabang">
			<input type="hidden" name="val_npsn" id="val-npsn">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<div class="row">
						<div class="col">
							<br>
							<h4 style="font-weight: bold; text-align:center" class="modal-title" id="myModalLabel">Label</h4>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Kode Standar</label>
										<input type="text" class="form-control" id="text-kode" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Uraian</label>
										<input type="text" class="form-control" id="text-nama" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Anggaran RAB (RM)</label>
										<input type="text" class="form-control" id="text-total-ringgit" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Anggaran RAB (Rp)</label>
										<input type="text" class="form-control" id="text-total-rupiah" readonly="" />
									</div>
								</div>
							</div>

						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-6" style="display: none;">
									<div class="form-group">
										<label for="nama"> Kode Standar</label>
										<input type="text" class="form-control" id="kode" name="kode" readonly="" placeholder="" required />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Nama</label>
										<input type="text" class="form-control" id="nama" name="nama" placeholder="" required />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Keterangan</label>
										<textarea class="form-control" id="keterangan" name="keterangan"></textarea>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Harga Real (RM)</label>
										<input type="hidden" class="form-control" id="harga-ringgit" name="harga_ringgit">
										<input type="text" class="form-control" id="text-harga-ringgit">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Harga Real (Rp)</label>
										<input type="hidden" class="form-control" id="harga-rupiah" name="harga_rupiah">
										<input type="text" class="form-control" id="text-harga-rupiah">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Photo Resit / Nota / Kwitansi</label>
										<input type="file" accept="image/png, image/gif, image/jpeg" class="form-control" id="file" name="file" required />
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Tanggal</label>
										<input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>" id="tanggal" name="tanggal" required />
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary">
						Submit
					</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">
						Cancel
					</button>
				</div>
			</div><!-- /.modal-content -->
		</form>
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="myModalRealisasi" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<form id="form2" method="post" enctype="multipart/form-data">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<div class="row">
						<div class="col-md-6">
							<br>
							<h4 style="font-weight: bold;" class="modal-title" id="myModalLabelRealisasi"></h4>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<h6 id="npsn-realisasi"></h6>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Kode</label>
										<input type="text" class="form-control" id="text2-kode" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Nama</label>
										<input type="text" class="form-control" id="text2-nama" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Total Ringgit</label>
										<input type="text" class="form-control" id="text2-total-ringgit" readonly="" />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Total Rupiah</label>
										<input type="text" class="form-control" id="text2-total-rupiah" readonly="" />
									</div>
								</div>
							</div>

						</div>
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Nama</label>
										<input type="text" class="form-control" id="nama-realisasi" readonly name="nama-realisasi" placeholder="" required />
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Keterangan</label>
										<textarea class="form-control" id="keterangan-realisasi" readonly name="keterangan-realisasi"></textarea>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Harga Ringgit</label>
										<input type="text" class="form-control" id="harga-ringgit-realisasi" readonly name="harga_ringgit">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label for="nama"> Harga Rupiah</label>
										<input type="text" class="form-control" id="harga-rupiah-realisasi" readonly name="harga_rupiah">
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<label for="nama"> Tanggal</label>
										<input type="date" class="form-control" id="tanggal-realisasi" readonly name="tanggal" required />
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3">
						</div>
						<div class="col-md-6" style="text-align: center;">
							<div class="form-group" style="text-align: center;">
								<label for="nama"> Gambar</label>
								<hr>
								<div id="image"></div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- /.modal-content -->
		</form>
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript">
	let npsn = '<?= $npsn ?>'
	let id_cabang = '<?= $id_cabang ?>'
	let isUbah = false;

	function handleSetAllCheckbox(data) {
		$(".check").prop("checked", data.checked);
		setBtnUbah();
	}
</script>