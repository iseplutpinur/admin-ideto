const profile_image = new Set();
const sejarah_image = new Set();
$(function () {
    // Summernote
    $('.summernote').summernote({
        toolbar: [
            ['fontsize', ['fontsize']], ['fontname', ['fontname']], ['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['color', ['color']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']], ['table', ['table']], ['insert', ['link', 'unlink', 'picture', 'video', 'hr']], ['view', ['fullscreen', 'codeview']], ['help', ['help']]],
        height: ($(window).height() - 400),
        callbacks: {
            onImageUpload: function (image) {
                uploadImage(image[0], $(this));
            }, onMediaDelete: function (target) {
                deleteFile(target[0].alt, $(this));
            }
        }
    })

    function uploadImage(image, id) {
        $.LoadingOverlay("show");
        var data = new FormData();
        data.append("image", image);
        $.ajax({
            url: "<?= base_url()?>about/ideto/uploadImage",
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: "post",
            success: function (data) {
                if (data.url.status == 1) {
                    var image = $('<img>').attr('src', data.url.path);
                    image.attr('alt', data.url.file_name);
                    id.summernote("insertNode", image[0]);
                    const path = data.url.path_upload;
                    if (id.prop("id") == "profile-deskripsi") {
                        profile_image.add(path);
                    } else {
                        sejarah_image.add(path);
                    }
                } else {
                    alert(data.url.message)
                }
            },
            error: function (data) {
                console.log(data);
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    }

    function deleteFile(name, id) {
        $.LoadingOverlay("show");
        $.ajax({
            url: "<?= base_url()?>about/ideto/deleteImage",
            data: {
                name: name
            },
            type: "post",
            success: function (data) {
                const path = data.url.path_upload;
                if (id.prop("id") == "profile-deskripsi") {
                    profile_image.delete(path);
                } else {
                    sejarah_image.delete(path);
                }
            },
            error: function (data) {
                alert(data.message);
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    }

    // simpan slider
    $("#form-slider").submit(function (ev) {
        ev.preventDefault();
        $.LoadingOverlay("show");
        $.ajax({
            url: "<?= base_url()?>about/ideto/insertSlider",
            data: {
                judul: $("#slider-judul").val(),
                deskripsi: $("#slider-deskripsi").val(),
            },
            type: "post",
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Berhasil diubah.'
                })
            },
            error: function (data) {
                Toast.fire({
                    icon: 'error',
                    title: 'Gagal Diubah..'
                })
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    })


    // simpan Profile
    $("#form-profile").submit(function (ev) {
        ev.preventDefault();

        $.LoadingOverlay("show");
        $.ajax({
            url: "<?= base_url()?>about/ideto/insertProfile",
            data: {
                judul: $("#profile-judul").val(),
                deskripsi: $("#profile-deskripsi").summernote('code'),
                gambar: Array.from(profile_image)
            },
            type: "post",
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Berhasil diubah.'
                })
            },
            error: function (data) {
                Toast.fire({
                    icon: 'error',
                    title: 'Gagal Diubah..'
                })
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    })

    // simpan Sejarah
    $("#form-sejarah").submit(function (ev) {
        ev.preventDefault();
        $.LoadingOverlay("show");
        $.ajax({
            url: "<?= base_url()?>about/ideto/insertSejarah",
            data: {
                judul: $("#sejarah-judul").val(),
                deskripsi: $("#sejarah-deskripsi").summernote('code'),
                gambar: Array.from(sejarah_image)
            },
            type: "post",
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Berhasil diubah.'
                })
            },
            error: function (data) {
                Toast.fire({
                    icon: 'error',
                    title: 'Gagal Diubah..'
                })
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    })
})