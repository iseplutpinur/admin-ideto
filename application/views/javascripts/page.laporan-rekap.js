let global_date_start = "";
let global_date_end = "";
let filter_data_tanggal = { start: global_date_start, end: global_date_end };
let initial = false;
$(() => {
    // date picker
    {
        if (moment().isAfter(moment().month("June").endOf('month'))) {
            // semester 2
            var start = moment().month("July").startOf('month');
            var end = moment().endOf('year');
        } else {
            // semester 1
            var start = moment().startOf('year');
            var end = moment().month("June").endOf('month');
        }

        function cb(start, end) {
            $('#datepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            global_date_start = start.format('YYYY-MM-DD');
            global_date_end = end.format('YYYY-MM-DD');
            filter_data_tanggal = { start: global_date_start, end: global_date_end };
            initial || dynamic(filter_data_tanggal, $("#cabang").val());
            initial = true;
        }

        $('#datepicker').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hari ini': [moment(), moment()],
                'Hari Kemarin': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Bulan ini': [moment().startOf('month'), moment().endOf('month')],
                'Bulan kemarin': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Tahun ini': [moment().startOf('year'), moment().endOf('year')],
                'Tahun Kemarin': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                'Semester 1': [moment().startOf('year'), moment().month("June").endOf('month')],
                'Semester 2': [moment().month("July").startOf('month'), moment().endOf('year')],
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

    function dynamic(tanggal = null, cabang = null) {
        $("#dt_basic").dataTable().fnDestroy()
        $('#dt_basic').DataTable({
            "ajax": {
                "url": "<?= base_url()?>laporan/rekap/ajax_data/",
                "data": {
                    tanggal: JSON.stringify(tanggal),
                    cabang: cabang
                },
                "type": 'POST'
            },
            "processing": true,
            "scrollX": true,
            // "serverSide": true,
            "pageLength": 10,
            "columns": [
                { "data": "no_urut" },
                { "data": "uraian" },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[0] == undefined ? "" : format_ringgit(data[0])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[1] == undefined ? "" : format_ringgit(data[1])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[2] == undefined ? "" : format_ringgit(data[2])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[3] == undefined ? "" : format_ringgit(data[3])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[4] == undefined ? "" : format_ringgit(data[4])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[5] == undefined ? "" : format_ringgit(data[5])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[6] == undefined ? "" : format_ringgit(data[6])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[7] == undefined ? "" : format_ringgit(data[7])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[8] == undefined ? "" : format_ringgit(data[8])) + '</p>'
                    }
                },
                {
                    "data": "penggunaan", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + (data[9] == undefined ? "" : format_ringgit(data[9])) + '</p>'
                    }
                },
                {
                    "data": "jumlah", render(data, type, full, meta) {
                        return '<p style="text-align: right;">' + format_ringgit(data) + '</p>'
                    }
                },
            ],
            "aoColumnDefs": [
                { 'bSortable': false, 'aTargets': ["no-sort"] }
            ]
        })
    }

    $('#filter-cari').click(function () {
        filter_data_tanggal = { start: global_date_start, end: global_date_end };
        let cabang = $("#cabang").val()
        $("#dt_basic").dataTable().fnDestroy()
        dynamic(filter_data_tanggal, cabang)
    });

    $('#cetak').click(function () {
        let tanggal = $("#tanggal").val()
        let cabang = $("#cabang").val()
        if (cabang == "") {
            alert('Mohon maaf, NPSN tidak boleh dikosongkan');
        } else {
            window.location = "<?=base_url()?>laporan/rekap/cetak?cabang=" + cabang + "&&tanggal-start=" + global_date_start + "&tanggal-end=" + global_date_end;
        }
    });

})

