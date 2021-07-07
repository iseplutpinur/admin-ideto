$(() => {
	// replace total_ringgit
	{
		const element = $("#format_ringgit_total");
		element.text(window.apiClient.format.format_ringgit(element.text()));
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

			rupiah = split[1] != undefined ? rupiah + '.' + split[1] : rupiah

			// return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
			return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '')
		}
		else {
			return 0
		}
	}


	let base_url = '<?php echo base_url();?>'

	// initialize responsive datatable
	dynamic(npsn)

	function dynamic(npsn = null) {
		$('#dt_basic').DataTable({
			"ajax": {
				"url": "<?= base_url()?>rab/preview/ajax_data_detail/",
				"data": {
					'npsn': npsn
				},
				"type": 'POST'
			},
			"scrollX": true,
			"processing": true,
			// "serverSide": true,
			"columns": [
				{ "data": "kodes" },
				{ "data": "nama_aktifitas" },
				{ "data": "jumlah_1" },
				{ "data": "satuan_1" },
				{ "data": "jumlah_2" },
				{ "data": "satuan_2" },
				{ "data": "jumlah_3" },
				{ "data": "satuan_3" },
				{ "data": "jumlah_4" },
				{ "data": "satuan_4" },
				{
					"data": "harga_ringgit", render(data, type, full, meta) {
						return '<p style="text-align:right">' + format_ringgit(data) + '<p>';
					}
				},
				{
					"data": "harga_rupiah", render(data, type, full, meta) {
						return '<p style="text-align:right">' + format_rupiah(data) + '<p>';
					}
				},
				{
					"data": "total_harga_ringgit", render(data, type, full, meta) {
						return '<p style="text-align:right">' + format_ringgit(data) + '<p>';
					}
				},
				{
					"data": "total_harga_rupiah", render(data, type, full, meta) {
						return '<p style="text-align:right">' + format_rupiah(data) + '<p>';
					}
				}
			],
			"aoColumnDefs": [
				{ 'bSortable': false, 'aTargets': ["no-sort"] }
			]
		})
	}



})

