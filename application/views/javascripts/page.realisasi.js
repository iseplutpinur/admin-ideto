let id_rab_send = [];
let ringgit_send = [];
let rupiah_send = [];
let jumlah_ringgit_send = 0;
let jumlah_rupiah_send = 0;

$(() => {
	// replace total_ringgit
	{
		const element = $("#format_ringgit_total");
		element.text(window.apiClient.format.format_ringgit(element.text()));
	}

	$("#dt_basic").DataTable({
		"pageLength": 1000,
		"aoColumnDefs": [
			{ "bSortable": false, "aTargets": [0] }
		],
		"order": [[1, 'asc']]
	});
	let base_url = '<?php echo base_url();?>'

	// initialize responsive datatable
	// dynamic(npsn)
	$("#val-npsn").val(npsn)
	function dynamic(npsn = null) {
		$('#dt_basic').DataTable({
			"ajax": {
				"url": "<?= base_url()?>realisasi/ajax_data/",
				"data": {
					'npsn': npsn
				},
				"type": 'POST'
			},
			"scrollX": true,
			"processing": true,
			"columns": [
				{ "data": "kodes" },
				{ "data": "nama_aktifitas" },
				{
					"data": "total_harga_ringgit", render(data, type, full, meta) {
						return window.apiClient.format.format_ringgit(full.total_harga_ringgit, null)
					}
				},
				{
					"data": "total_harga_rupiah", render(data, type, full, meta) {
						return window.apiClient.format.format_rupiah(full.total_harga_rupiah, null)
					}
				},
				{
					"data": "harga_ringgit", render(data, type, full, meta) {
						return window.apiClient.format.format_ringgit(full.harga_ringgit, null)
					}
				},
				{
					"data": "harga_rupiah", render(data, type, full, meta) {
						return window.apiClient.format.format_rupiah(full.harga_rupiah, null)
					}
				},
				{
					"data": "sisa_ringgit", render(data, type, full, meta) {
						let pre = full.sisa_ringgit < 0 ? "-" : "";
						return pre + window.apiClient.format.format_ringgit(full.sisa_ringgit, null)
					}
				},
				{
					"data": "sisa_rupiah", render(data, type, full, meta) {
						let pre = full.sisa_rupiah < 0 ? "-" : "";
						return pre + window.apiClient.format.format_rupiah(full.sisa_rupiah, null)
					}
				},
				{
					"data": "id_realisasi", render(data, type, full, meta) {
						if (data == null) {
							return `Belum Direalisasikan`
						} else {
							return `Sudah Direalisasikan`
						}
					}
				},
				{
					"data": "id_realisasi", render(data, type, full, meta) {
						if (data == null) {
							if (full.total_harga_ringgit > 0) {
								return `<button style="width: 100%;" class="btn btn-primary btn-xs" onclick="Belanja(${full.id})">
										<i class="fa fa-edit"></i> Belanja
									</button>`
							} else {
								return ``
							}

						} else {
							return `<button style="width: 100%;" class="btn btn-success btn-xs" onclick="Detail(${full.id_realisasi})">
										<i class="fa fa-edit"></i> Detail
									</button>`
						}
					}
				}
			],
			'columnDefs': [{
				'targets': [1, 2], /* table column index */
				'orderable': false, /* true or false */
			}]
		})
	}

	$('#form').submit(function (evt) {
		evt.preventDefault();

		var formData = new FormData(this);
		let id = $('#form input[name=id]').val();
		$.ajax({
			type: 'POST',
			url: '<?= base_url() ?>realisasi/insertUpload',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function (gambar) {
				const real_ringgit = $("#belanja-harga-ringgit").val();
				const real_rupiah = $("#belanja-harga-rupiah").val();
				$.ajax({
					type: 'POST',
					url: '<?= base_url() ?>realisasi/insert',
					data: {
						data: JSON.stringify({
							gambar: gambar.name,
							id_rab: id_rab_send,
							id_cabang: id_cabang,
							nama: $("#belanja-nama-0").val() + $("#belanja-nama-1").val() + $("#belanja-nama-2").val() + $("#belanja-nama-3").val(),
							keterangan: $("#belanja-keterangan").val(),
							ringgit: real_ringgit,
							rupiah: real_rupiah,
							tanggal: $("#belanja-tanggal").val(),
							ringgit_rab: ringgit_send,
							rupiah_rab: rupiah_send,
							sisa_ringgit: Number(jumlah_ringgit_send) - Number(real_ringgit),
							sisa_rupiah: Number(jumlah_rupiah_send) - Number(real_rupiah)
						})
					},
					success: function (data) {
						$.doneMessage('Berhasil ditambahkan.', 'Belanja')
						$('#myModal1').modal('toggle');
						setTimeout(() => {
							location.reload();
						}, 1000);
					},
					error: function (data) {
						$.failMessage('Gagal ditambahkan.', 'Belanja')
						$('#myModal1').modal('toggle');
						setTimeout(() => {
							location.reload();
						}, 1000);
					}
				});
			},
			error: function (data) {
				$.failMessage('Gagal ditambahkan.', 'Belanja')
				$('#myModal1').modal('toggle');
				location.reload();
			}
		});

	});


	$(".check").on('change', function () {
		setBtnUbah();
	});

	$('#belanja-text-harga-ringgit').on('change', function () {
		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>rab/cabang/getkurs',
			data: {
				ringgit: this.value,
			},
		}).done((data) => {
			$("#belanja-harga-ringgit").val(this.value)
			$("#belanja-text-harga-ringgit").val('RM ' + window.apiClient.format.format_ringgit(this.value, false))
			$("#belanja-harga-rupiah").val(data.rupiah)
			$("#belanja-text-harga-rupiah").val('Rp ' + window.apiClient.format.format_rupiah(data.rupiah, false))
		}).fail(($xhr) => {
			console.log($xhr)
		})

	})

})

function setBtnUbah() {

	let submitOk = false;
	let checkAll = true;
	$(".check").each(function () {
		if (this.checked) submitOk = true;
		if (!this.checked) checkAll = false;

	});
	if (submitOk) {
		$("#btn-ubah").removeAttr("disabled");
	} else {
		$("#btn-ubah").attr("disabled", "");
	}
	$("#check-all").prop('checked', checkAll);
}

function ubah(data) {
	if ($(data).attr("disabled") == undefined) {
		$("#belanja-text-harga-ringgit").val("");
		id_rab_send = [];
		ringgit_send = [];
		rupiah_send = [];
		let jml_ringgit = 0;
		let jml_rupiah = 0;

		let html_uraian = '';
		let html_kodes = '';

		$(".check").each(function () {
			if (this.checked) {
				id_rab_send.push(this.dataset.id_rab);
				ringgit_send.push(this.dataset.ringgit);
				rupiah_send.push(this.dataset.rupiah);

				jml_ringgit += Number(this.dataset.ringgit);
				jml_rupiah += Number(this.dataset.rupiah);

				jumlah_ringgit_send = jml_ringgit;
				jumlah_rupiah_send = jml_rupiah;

				html_kodes += html_kodes ? '<br>' + this.dataset.kode : this.dataset.kode;
				html_uraian += html_uraian ? '<br>' + this.dataset.uraian : this.dataset.uraian;
			}
		});
		$("#belanja-kode-standar-text").html(html_kodes);
		$("#belanja-uraianr-text").html(html_uraian);
		// $("#id_rab").val(id.value)
		$("#belanja-harga-ringgit").val(jml_ringgit)
		$("#belanja-harga-rupiah").val(jml_rupiah)
		$("#belanja-text-total-ringgit").val('RM ' + window.apiClient.format.format_ringgit(jml_ringgit))
		$("#belanja-text-total-rupiah").val('Rp ' + window.apiClient.format.format_rupiah(jml_rupiah))
		// $('#myModalLabel').html('Tambahkan Dana Sisa')
		$('#myModal1').modal('toggle')
	} else {
		$.failMessage('Belum ada realisasi yang dipilih', 'Dana Sisa');
	}
}


function format_ringgit(angka, prefix) {
	if (angka) {
		let number_string = angka.toString().replace(/[^,\d]/g, '').toString(),
			split = number_string.split(','),
			sisa = split[0].length % 3,
			rupiah = split[0].substr(0, sisa),
			ribuan = split[0].substr(sisa).match(/\d{3}/gi)

		// tambahkan titik jika yang di input sudah menjadi angka ribuan
		if (ribuan) {
			separator = sisa ? ',' : ''
			rupiah += separator + ribuan.join(',')
		}

		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah

		// return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
		return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '')
	}
	else {
		return 0
	}
}

function format_rupiah(angka, prefix) {
	if (angka) {
		let number_string = angka.toString().replace(/[^,\d]/g, '').toString(),
			split = number_string.split(','),
			sisa = split[0].length % 3,
			rupiah = split[0].substr(0, sisa),
			ribuan = split[0].substr(sisa).match(/\d{3}/gi)

		// tambahkan titik jika yang di input sudah menjadi angka ribuan
		if (ribuan) {
			separator = sisa ? '.' : ''
			rupiah += separator + ribuan.join('.')
		}

		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah

		// return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
		return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '')
	}
	else {
		return 0
	}
}

// Click Ubah
const Belanja = (id) => {
	$('#myModalLabel').html('Form Realisasi')
	$.ajax({
		method: 'post',
		url: '<?= base_url() ?>realisasi/getDetailRab',
		data: {
			id: id
		}
	}).done((data) => {
		// $("#npsn").text('NPSN: ' + data.npsn)
		$("#id").val(id)
		$("#id_cabang").val(data.id_cabang)
		$("#text-kode").val(data.kode)
		$("#text-nama").val(data.nama_aktifitas)
		$("#text-total-ringgit").val('RM ' + window.apiClient.format.format_ringgit(data.total_harga_ringgit))
		$("#text-total-rupiah").val('Rp ' + window.apiClient.format.format_rupiah(data.total_harga_rupiah))
		$("#kode").val(data.kode)

		$('#myModal').modal('toggle')
	})
		.fail(($data) => {
			$.failMessage('Gagal mendapatkan data.', ' cabang')
		})


}


let base_url = '<?php echo base_url();?>'
const Detail = (id) => {
	$('#myModalLabelRealisasi').html('Detail Realisasi')
	$.ajax({
		method: 'post',
		url: '<?= base_url() ?>realisasi/getDetailRealisasi',
		data: {
			id: id
		}
	}).done((data) => {
		// $("#npsn-realisasi").text('NPSN: ' + data.npsn)
		$("#id").val(id)
		$("#id_cabang").val(data.id_cabang)
		$("#kode-realisasi").val(data.kode)
		$("#nama-realisasi").val(data.nama)
		$("#keterangan-realisasi").val(data.keterangan)
		$("#harga-ringgit-realisasi").val('RM ' + window.apiClient.format.format_ringgit(data.harga_ringgit))
		$("#harga-rupiah-realisasi").val('Rp ' + window.apiClient.format.format_rupiah(data.harga_rupiah))
		$("#tanggal-realisasi").val(data.tanggal)
		$('#image').html('<img src="' + base_url + 'gambar/' + data.gambar + '" width="100%;">');

		$("#text2-kode").val(data.kode)
		$("#text2-nama").val(data.nama_aktifitas)
		$("#text2-total-ringgit").val('RM ' + window.apiClient.format.format_ringgit(data.total_harga_ringgit))
		$("#text2-total-rupiah").val('Rp ' + window.apiClient.format.format_rupiah(data.total_harga_rupiah))

		$('#myModalRealisasi').modal('toggle')
	})
		.fail(($data) => {
			$.failMessage('Gagal mendapatkan data.', ' cabang')
		})
}
