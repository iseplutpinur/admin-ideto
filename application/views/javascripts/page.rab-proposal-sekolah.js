let global_dynamic;
$(() => {

	let base_url = '<?php echo base_url();?>'

	// initialize responsive datatable
	dynamic()
	function dynamic() {
		$("#dt_basic").dataTable().fnDestroy()
		$('#dt_basic').DataTable({
			"ajax": {
				"url": "<?= base_url()?>rab/proposal/ajax_data/",
				"data": {
					id: global_id_cabang
				},
				"type": 'POST'
			},
			"scrollX": true,
			"processing": true,
			"serverSide": true,
			"pageLength": 10,
			"paging": true,
			"columns": [
				{ "data": "judul", className: "max-width200" },
				{ "data": "keterangan", className: "max-width200" },
				{
					"data": "total_ringgit", render(data, type, full, meta) {
						return window.apiClient.format.format_ringgit(data);
					}, className: "max-width200",
				},
				{
					"data": "status", render(data, type, full, meta) {
						return `${(data == 0) ? "Diporses" : (data == 1 ? "Diajukan" : (data == 2 ? "Diterima" : (data == 3 ? "Ditolak" : (data == 4 ? "Dicairkan" : ""))))}`;
					}, className: "nowrap width70",
				},
				{
					"data": "id", render(data, type, full, meta) {
						// cek status
						const btndetail = `
						<button class="btn btn-primary btn-xs" data-id="${data}" data-judul="${full.judul}" data-tanggal_dari="${full.periode_dari}" data-termin="${full.periode_termin}" data-tanggal_sampai="${full.periode_sampai}" data-keterangan="${full.keterangan}" data-ringgit="${full.total_ringgit}" data="${full.id}" data-status="${full.status}" onclick="Ubah(this)">
						<i class="fa fa-edit"></i> Detail
						</button>
						`;

						const btnhapus = `
						<button class="btn btn-danger btn-xs" onclick="Hapus(${data})">
						<i class="fa fa-upload"></i> Hapus
						</button>
						`;

						const btnajukan = `
						<button class="btn btn-success btn-xs" onclick="Ajukan(${data})">
						<i class="fa fa-trash"></i> Ajukan
						</button>
						`;

						const btnexcel = `
						<a href="<?= base_url('/rab/proposal/exportexcel?id_cabang=${full.id_cabang}&id_proposal=${full.id}')?>" class="btn btn-success btn-xs">
						<i class="fa fa-file-excel-o"></i> Excel
						</a>
						`;

						let btn = '';

						if (full.status == 0) {
							btn = btndetail + btnajukan + btnhapus + btnexcel;
						} else if (full.status == 1) {
							btn = btndetail + btnexcel;
						} else if (full.status == 2) {
							btn = btndetail + btnexcel;
						} else if (full.status == 3) {
							btn = btndetail + btnhapus + btnexcel;
						} else if (full.status == 4) {
							btn = btndetail + btnexcel;
						}
						return btn;
					}, className: "nowrap max-width170",
				}
			],
			"aoColumnDefs": [
				{ 'bSortable': false, 'aTargets': ["no-sort"] }
			]
		})
	}

	global_dynamic = dynamic;

	// Fungsi simpan
	$('#form').submit((ev) => {
		ev.preventDefault();
		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/proposal/insert',
			data: {
				id_cabang: global_id_cabang,
				judul: $('#judul').val(),
				keterangan: $('#keterangan').val(),
				tanggal_dari: $("#tgl-dari").val(),
				tanggal_sampai: $("#tgl-sampai").val(),
				termin: $("#termin").val(),
			}
		}).done((data) => {
			$.doneMessage('Berhasil ditambahkan.', 'proposal')
			$('#judul').val('')
			$('#keterangan').val('')
			dynamic()
		}).fail(($xhr) => {
			$.failMessage('Gagal ditambahkan.', 'proposal')
		}).always(() => {
			$('#myModal').modal('toggle')
		})
	})

	// Clik Tambah
	$('#tambah').on('click', () => {
		// cek apakah sudah ada proposal atau belum
		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/proposal/cekTambah',
			data: {
				id: global_id_cabang
			}
		}).done((data) => {
			if (data) {
				// console.log(data);
				if (data.status == 2 && data.proposal == 0) {
					$('#judul').val('')
					$('#keterangan').val('')
					$('#myModalLabel').html('Tambah proposal')
					$('#myModal').modal('toggle')
				} else if (data.proposal > 0) {
					$.warningMessage('Mohon maaf, Proposal sudah ada. Terimakasih', 'Proposal')
				} else {
					$.warningMessage('Mohon maaf, Belum ada RAB yang disetujui. Terimakasih', 'Proposal')
				}
			} else {
				$.failMessage('Gagal mendapatkan data.', 'Proposal')
			}
		}).fail(($xhr) => {
			$.failMessage('Gagal mendapatkan data.', 'Proposal')
		})
	})

	// Fungsi Delete
	$('#OkCheck').click(() => {

		let id = $("#idCheck").val()

		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/proposal/delete',
			data: {
				id: id
			}
		}).done((data) => {
			$.doneMessage('Berhasil dihapus.', 'proposal')
			$("#dt_basic").dataTable().fnDestroy()
			dynamic()

		}).fail(($xhr) => {
			$.failMessage('Gagal dihapus.', 'proposal')
		}).
			always(() => {
				$('#ModalCheck').modal('toggle')
			})
	})

	// simpan detail
	$("#btn-ubah").click(function () {
		// validasi judul
		const judul = $("#detail-judul");
		if (judul.val() == "") {
			$.failMessage('Judul Wajib di isi.', ' Proposal')
			judul.focus();
			return;
		}

		// validasi keterangan
		const keterangan = $("#detail-keterangan");
		if (keterangan.val() == "") {
			$.failMessage('Keterangan Wajib di isi.', ' Proposal')
			keterangan.focus();
			return;
		}

		// validasi keterangan
		const tanggal_dari = $("#detail-tgl-dari");
		if (tanggal_dari.val() == "") {
			$.failMessage('Tanggal dari Wajib di isi.', ' Proposal')
			tanggal_dari.focus();
			return;
		}

		// validasi keterangan
		const tanggal_sampai = $("#detail-tgl-sampai");
		if (tanggal_sampai.val() == "") {
			$.failMessage('Tanggal sampai Wajib di isi.', ' Proposal')
			tanggal_sampai.focus();
			return;
		}

		// validasi keterangan
		const termin = $("#detail-termin");
		if (termin.val() == "") {
			$.failMessage('Termin Wajib di isi.', ' Proposal')
			termin.focus();
			return;
		}

		// data proposal
		const id_proposal = $("#detail-id");

		// collect data rabs
		const id_rabs = [];
		const ringgit = [];
		const rupiah = [];
		let total_ringgit = 0;
		let total_rupiah = 0;
		$(".check").each(function () {
			if (this.checked) {
				total_ringgit += parseFloat(this.dataset.ringgit);
				total_rupiah += parseFloat(this.dataset.rupiah);
				id_rabs.push(this.dataset.id);
				ringgit.push(this.dataset.ringgit);
				rupiah.push(this.dataset.rupiah);
			}
		});
		const rabs = JSON.stringify({
			id_rabs: id_rabs,
			ringgit: ringgit,
			rupiah: rupiah,
		});

		// kirim update

		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/proposal/update',
			data: {
				id_proposal: id_proposal.val(),
				id_cabang: global_id_cabang,
				judul: judul.val(),
				keterangan: keterangan.val(),
				rabs: rabs,
				ringgit: total_ringgit,
				rupiah: total_rupiah,
				tanggal_dari: tanggal_dari.val(),
				tanggal_sampai: tanggal_sampai.val(),
				termin: termin.val(),
			}
		}).done((data) => {
			$.doneMessage('Berhasil diubah.', 'Proposal')
			dynamic();
		}).fail(($xhr) => {
			$.failMessage('Gagal mendapatkan data.', ' Proposal')
		}).always(() => {
			$("#modalDetail").modal("toggle");
		})
	})

	$("#btn-ajukan").click(function () {
		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/proposal/ajukan',
			data: {
				id_proposal: $("#ajukan-id").val()
			}
		}).done((data) => {
			$.doneMessage('Proposal berhasil diajukan', 'Proposal')
			global_dynamic();
		}).fail(($xhr) => {
			$.failMessage('Proposal gagal diajukan', 'Proposal')
		}).always(() => {
			$("#modalAjukan").modal("toggle");
		})
	});

})


// Click Hapus
const Hapus = (id) => {
	$("#idCheck").val(id)
	$("#LabelCheck").text('Form Hapus')
	$("#ContentCheck").text('Apakah anda yakin akan menghapus data ini?')
	$('#ModalCheck').modal('toggle')
}

// Click Ubah
const Ubah = (dataset) => {
	let status = dataset.dataset.status;
	// cek status
	$.ajax({
		method: 'post',
		url: '<?= base_url() ?>rab/proposal/getDataDetail',
		data: {
			id_cabang: global_id_cabang,
			id_proposal: dataset.dataset.id,
			status: dataset.dataset.status
		}
	}).done((data) => {
		$("#detail-id").val(dataset.dataset.id);
		$("#detail-judul").val(dataset.dataset.judul);
		$("#detail-keterangan").val(dataset.dataset.keterangan);
		$("#detail-total-saldo").html("RM " + window.apiClient.format.format_ringgit(dataset.dataset.ringgit));
		$("#detail-tgl-dari").val(dataset.dataset.tanggal_dari);
		$("#detail-tgl-sampai").val(dataset.dataset.tanggal_sampai);
		$("#detail-termin").val(dataset.dataset.termin);
		// set component
		window.apiClient.component.hidden("btn-ubah", (status != 0));
		window.apiClient.component.disabled("detail-judul", (status != 0));
		window.apiClient.component.disabled("detail-keterangan", (status != 0));

		let strbody = '';
		data.forEach(e => {

			strbody += `
			<tr>
			${status == 0 ? `<td><input type="checkbox" class="check"
			data-id="${e.id}"
			data-ringgit="${e.total_harga_ringgit}"
			data-rupiah="${e.total_harga_rupiah}" ${e.ischeck == 0 ? "" : "checked"}
			id="check-${e.id}"></td>` : ''}
			<td>${e.kode}</td>
			<td>${e.nama}</td>
			<td>${"RM " + window.apiClient.format.format_ringgit(e.total_harga_ringgit)}</td>
			<td>${"Rp " + window.apiClient.format.format_rupiah(e.total_harga_rupiah)}</td>
			</tr>
			`;
		});

		$("#detail-table").html(strbody);
		$("#detail-table-head").html(`
			<tr>
			${status == 0 ? `<th><input type="checkbox" name="semua" id="detail-check-semua" onchange="handleSetAllCheckbox(this)"><label for="detail-check-semua">Semua</label></th>` : ''}
			<th>Kode</th>
			<th>Uraian</th>
			<th>Ringgit</th>
			<th>Rupiah</th>
			</tr>
		`);


		$(".check").on('change', function () {
			cekChecked();
		});
		$("#modalDetail").modal("toggle");
	}).fail(($xhr) => {
		$.failMessage('Gagal mendapatkan data.', ' proposal')
	})
}
function handleSetAllCheckbox(data) {
	$(".check").prop("checked", data.checked);
	cekSaldo();
}

function cekChecked() {
	let submitOk = false;
	let checkAll = true;
	$(".check").each(function () {
		if (this.checked) submitOk = true;
		if (!this.checked) checkAll = false;
	});
	$("#detail-check-semua").prop('checked', checkAll);
	cekSaldo();
}

function cekSaldo() {
	let jumlah_total_ringgit = 0;
	$(".check").each(function () {
		if (this.checked) {
			jumlah_total_ringgit += parseFloat(this.dataset.ringgit);
		}
	});
	$("#detail-total-saldo").html("RM " + window.apiClient.format.format_ringgit(jumlah_total_ringgit));
}

function Ajukan(id) {
	$("#modalAjukan").modal("toggle");
	$("#ajukan-id").val(id);
}

