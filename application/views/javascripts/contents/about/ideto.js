$(function () {
    // Summernote
    $('.summernote').summernote({
        toolbar: [
            ['fontsize', ['fontsize']], ['fontname', ['fontname']], ['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['color', ['color']], ['float', ['floatLeft', 'floatRight', 'floatNone']], ['remove', ['removeMedia']], ['table', ['table']], ['insert', ['link', 'unlink', 'picture', 'hr']], ['mybutton', ['myVideo']], ['view', ['fullscreen', 'codeview']], ['help', ['help']]],
        height: ($(window).height() - 400),
        callbacks: {
            onImageUpload: function (image) {
                uploadImage(image[0], $(this));
            }, onMediaDelete: function (target) {
                deleteFile(target[0].alt);
            }
        },
        buttons: {
            myVideo: function (context) {
                var ui = $.summernote.ui;
                var button = ui.button({
                    contents: '<i class="note-icon-video">',
                    tooltip: 'Youtube Video',
                    click: function () {
                        var div = document.createElement('div');
                        div.classList.add('embed-container');

                        var iframe = document.createElement('iframe');
                        const yturl = prompt('Enter video youtube url:');
                        if (yturl == "") {
                            return;
                        }

                        iframe.src = 'https://www.youtube.com/embed/' + getId(yturl);

                        iframe.setAttribute('frameborder', 0);
                        iframe.setAttribute('width', '788.54');
                        iframe.setAttribute('height', '443');
                        iframe.setAttribute('allowfullscreen', true);
                        div.appendChild(iframe);
                        context.invoke('editor.insertNode', div);
                    }
                });
                return button.render();
            }
        }
    })

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11) ? match[2] : null;
    }

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

    function deleteFile(name) {
        $.LoadingOverlay("show");
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
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    }
})