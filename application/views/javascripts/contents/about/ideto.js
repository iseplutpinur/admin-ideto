$(function () {
    // Summernote
    $('#summernote').summernote({

        toolbar: [
            ['fontsize', ['fontsize']], ['fontname', ['fontname']], ['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['color', ['color']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']], ['table', ['table']], ['insert', ['link', 'unlink', 'picture', 'video', 'hr']], ['view', ['fullscreen', 'codeview']], ['help', ['help']]],
        height: ($(window).height() - 300),
        callbacks: {
            onImageUpload: function (image) {
                uploadImage(image[0]);
            }, onMediaDelete: function (target) {
                deleteFile(target[0].alt);
            }
        }
    })

    function uploadImage(image) {
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
                    $('#summernote').summernote("insertNode", image[0]);
                } else {
                    alert(data.url.message)
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function deleteFile(name) {
        $.ajax({
            url: "<?= base_url()?>about/ideto/deleteImage",
            data: {
                name: name
            },
            type: "post",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                alert(data);
            }
        });
    }
})