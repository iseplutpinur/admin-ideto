let global_date_start = "";
let global_date_end = "";
let filter_data_tanggal = { start: global_date_start, end: global_date_end };
let initial = false;
$(() => {
	// $('#filter_data_tanggal').daterangepicker();
	// date picker
	{
		var start = moment().startOf('month');
		var end = moment().endOf('month');

		function cb(start, end) {
			$('#datepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			global_date_start = start.format('YYYY-MM-DD');
			global_date_end = end.format('YYYY-MM-DD');
			filter_data_tanggal = { start: global_date_start, end: global_date_end };
			initial || dynamic(null, filter_data_tanggal, null);
			initial = true;
		}

		$('#datepicker').daterangepicker({
			startDate: start,
			endDate: end,
			ranges: {
				// 'Hari ini': [moment(), moment()],
				// 'Hari Kemarin': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Bulan ini': [moment().startOf('month'), moment().endOf('month')],
				// 'Bulan kemarin': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
				// 'Tahun ini': [moment().startOf('year'), moment().endOf('year')],
				// 'Tahun Kemarin': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
				// 'Semester 1': [moment().startOf('year'), moment().month("June").endOf('month')],
				// 'Semester 2': [moment().month("July").startOf('month'), moment().endOf('year')],
			}
		}, cb);

		cb(start, end);

		$('#datepicker').on('apply.daterangepicker', function (ev, picker) {
			global_date_start = picker.startDate.format('YYYY-MM-DD');
			global_date_end = picker.endDate.format('YYYY-MM-DD');
		});
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
			return prefix == undefined ? rupiah : (rupiah ? 'RM ' + rupiah : '')
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
			return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
		}
		else {
			return 0
		}
	}
	let base_url = '<?php echo base_url();?>'

	// initialize responsive datatable


	function dynamic(filter_data_kode, filter_data_tanggal, filter_data_cabang) {
		$("#dt_basic").dataTable().fnDestroy()
		$('#dt_basic').DataTable({
			"ajax": {
				"url": "<?= base_url()?>laporan/standard/ajax_data/",
				"data": {
					kode: filter_data_kode,
					tanggal: JSON.stringify(filter_data_tanggal),
					cabang: filter_data_cabang
				},
				"type": 'POST'
			},
			"scrollX": true,
			"processing": true,
			// "serverSide": true,
			"pageLength": 10,
			"columns": [
				{ "data": "npsn" },
				{ "data": "nama" },
				{ "data": "tanggal" },
				{ "data": "kode" },
				{ "data": "uraian" }, {
					"data": "harga_ringgit", render(data, type, full, meta) {
						return '<p style="text-align: right;">' + format_ringgit(full.harga_ringgit, null) + '</p>'
					}
				},
				{
					"data": "harga_rupiah", render(data, type, full, meta) {
						return '<p style="text-align: right;">' + format_ringgit(full.harga_rupiah, null) + '</p>'
					}
				},
			],
			"aoColumnDefs": [
				{ 'bSortable': false, 'aTargets': ["no-sort"] }
			]
		})
	}



	$('#filter-cari').click(function () {
		let filter_data_kode = $("#kode").val();
		filter_data_tanggal = { start: global_date_start, end: global_date_end }
		let filter_data_cabang = $("#filter_data_cabang").val();
		$("#dt_basic").dataTable().fnDestroy();
		// $.message('Pencarian Berhasil.','Laporan Penjualan','success');
		dynamic(filter_data_kode, filter_data_tanggal, filter_data_cabang);
	});

	$('#cetak').click(function () {
		let filter_data_kode = $("#kode").val()
		let filter_data_tanggal = $("#filter_data_tanggal").val()
		let filter_data_cabang = $("#filter_data_cabang").val()
		if (filter_data_cabang == '') {
			alert('Mohon maaf, NPSN tidak boleh dikosongkan')
		} else {
			window.location = "<?=base_url()?>laporan/standard/cetak?cabang=" + filter_data_cabang + "&tanggal-start=" + global_date_start + "&tanggal-end=" + global_date_end + "&kode=" + filter_data_kode;
		}
	});

})

