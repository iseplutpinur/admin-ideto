$(() => {

	let base_url = '<?php echo base_url();?>'

	// initialize responsive datatable
	dynamic()

	function dynamic()
	{
		$('#dt_basic').DataTable({
			"ajax": {
				"url": "<?= base_url()?>hutang/ajax_data/",
				"data": null,
				"type": 'POST'
			},
			"processing": true,
          	"serverSide": true,
			"columns": [
				{ "data": "nama" },
				{ "data": "no_hp" },
				{ "data": "keterangan" },
				{
					"data": "jumlah", render(data, type, full, meta) {
						return `<p style="text-align: right;">`+format_ringgit(data, null)+`</p>`
					}
				},
				// { "data": "dibayar" },
				// { "data": "sisa" },
				// { "data": "status" },
				{
					"data": "status", render(data, type, full, meta)
					{
						if(data == 0){
							return `belum lunas`
						}else{
							return `sudah lunas`
						}
					}
				},
				{ "data": "tanggal" },
				{
					"data": "id", render(data, type, full, meta)
					{
						if(full.status == 0){
							return `<div class="pull-right">
									<button class="btn btn-primary btn-xs" onclick="Ubah(${data})">
										<i class="fa fa-edit"></i> Ubah
									</button>
									<button class="btn btn-danger btn-xs" onclick="Hapus(${data})">
										<i class="fa fa-trash"></i> Hapus
									</button>
								</div>`
						}else{
							return `-`
						}
						
					}
				}
			],
			"aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ "no-sort" ] }
			]
		})
	}


	// Fungsi simpan 
	$('#form').submit((ev) => {
		ev.preventDefault()

		let id 			= $('#id').val()
		let nama 		= $('#nama').val()
		let no_hp 		= $('#no_hp').val()
		let keterangan 	= $('#keterangan').val()
		let jumlah 		= $('#jumlah').val()
		let tanggal 	= $('#tanggal').val()

		if (id == 0) {
			// Insert

			$.ajax({
					method: 'post',
					url: '<?= base_url() ?>hutang/insert',
					data: {
						nama: nama,
						no_hp: no_hp,
						keterangan: keterangan,
						jumlah: jumlah,
						tanggal: tanggal
					}
				}).done((data) => {
					$.doneMessage('Berhasil ditambahkan.', 'Hutang')
					$("#dt_basic").dataTable().fnDestroy()
					dynamic()

				})
				.fail(($xhr) => {
					$.failMessage('Gagal ditambahkan.', 'Hutang')
				}).
				always(() => {
					$('#myModal').modal('toggle')
				})
		} else {

			// Update

			$.ajax({
					method: 'post',
					url: '<?= base_url() ?>hutang/update',
					data: {
						id: id,
						nama: nama,
						no_hp: no_hp,
						keterangan: keterangan,
						jumlah: jumlah,
						tanggal: tanggal
					}
				}).done((data) => {
					$.doneMessage('Berhasil diubah.', 'Hutang')
					$("#dt_basic").dataTable().fnDestroy()
					dynamic()

				})
				.fail(($xhr) => {
					$.failMessage('Gagal diubah.', 'Hutang')
				}).
				always(() => {
					$('#myModal').modal('toggle')
				})
		}
	})

	// Fungsi simpan 
	$('#form-bayar-hutang').submit((ev) => {
		ev.preventDefault()

		let jumlah_saldo 	= $('#jumlah-saldo').val()
		let dibayar 		= $('#dibayar').val()

		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>hutang/bayar',
			data: {
				jumlah_saldo: jumlah_saldo,
				dibayar: dibayar
			}
		}).done((data) => {
			$.doneMessage('Berhasil dibayar.', 'Hutang')
			$("#dt_basic").dataTable().fnDestroy()
			dynamic()

		})
		.fail(($xhr) => {
			$.failMessage('Gagal dibayar.', 'Hutang')
		}).
		always(() => {
			$('#myModalHutang').modal('toggle')
		})
	})

	// Fungsi Delete
	$('#OkCheck').click(() => {

		let id = $("#idCheck").val()

		$.ajax({
				method: 'post',
				url: '<?= base_url() ?>hutang/delete',
				data: {
					id: id
				}
			}).done((data) => {
				$.doneMessage('Berhasil dihapus.', 'Hutang')
				$("#dt_basic").dataTable().fnDestroy()
				dynamic()

			})
			.fail(($xhr) => {
				$.failMessage('Gagal dihapus.', 'Hutang')
			}).
			always(() => {
				$('#ModalCheck').modal('toggle')
			})
	})
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
	// Clik Tambah
	$('#tambah').on('click', () => {
		$('#myModalLabel').html('Tambah Hutang')
		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>hutang/getSaldo',
			data: null
		}).done((data) => {
			if(data['jumlah_ringgit'] < 0){
				$('#totalSaldo').html('RM -'+format_ringgit(data['jumlah_ringgit']))
			}else{
				$('#totalSaldo').html('RM '+format_ringgit(data['jumlah_ringgit']))
			}
		
		})
		$('#id').val('')
		$('#nama').val('')
		$('#no_hp').val('')
		$('#keterangan').val('')
		$('#jumlah').val('')
		$('#tanggal').val('')
		$('#myModal').modal('toggle')
	})

	$('#bayar-hutang').on('click', () => {
		$('#myModalHutangLabel').html('Bayar Hutang')

		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>hutang/getSaldo',
			data: null
		}).done((data) => {
			if(data['jumlah_ringgit'] < 0){
				$('#jumlah-saldo').val('RM -'+format_ringgit(data['jumlah_ringgit']))
			}else{
				$('#jumlah-saldo').val('RM '+format_ringgit(data['jumlah_ringgit']))
			}
		})

		$.ajax({
			method: 'post',
			url: '<?= base_url() ?>hutang/getTotalHutang',
			data: null
		}).done((data) => {
			$('#totalHutang').html('Total = RM '+format_ringgit(data['sisa']))
			$('#dibayar').val('RM '+format_ringgit(data['sisa']))

			if(data['sisa'] <= 0){
				$.warningMessage('Mohon maaf, saat ini tidak ada hutang. Terimakasih', 'Bayar Hutang')
			}else{
				$('#myModalHutang').modal('toggle')
			}
			
		})

		
	})

})


// Click Hapus
const Hapus = (id) => {
	$("#idCheck").val(id)
	$("#LabelCheck").text('Form Hapus')
	$("#ContentCheck").text('Apakah anda yakin akan menghapus data ini?')
	$('#ModalCheck').modal('toggle')
}

// Click Ubah
const Ubah = (id) => {
	$.ajax({
		method: 'post',
		url: '<?= base_url() ?>hutang/getDataDetail',
		data: {
			id: id
		}
	}).done((data) => {
		$('#myModalLabel').html('Ubah Hutang')
		$('#id').val(data.id)
		$('#nama').val(data.nama)
		$('#no_hp').val(data.no_hp)
		$('#keterangan').val(data.keterangan)
		$('#jumlah').val(data.jumlah)
		$('#tanggal').val(data.tanggal)

		$('#myModal').modal('toggle')
	})
	.fail(($xhr) => {
		$.failMessage('Gagal mendapatkan data.', ' Hutang')
	})
}
