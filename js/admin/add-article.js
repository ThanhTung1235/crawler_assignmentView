var url = "https://beta-dot-assignmentcrawler.appspot.com/admin/_api/special-article";
var urlArticle = "https://beta-dot-assignmentcrawler.appspot.com/admin/_api/article";
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')

    var link = $('form[name$="edit-article"] input[name$="link"]').val();
    var title = $('form[name$="edit-article"] input[name$="title"]').val();
    var description = $('form[name$="edit-article"] input[name$="description"]').val();
    var content = $('form[name$="edit-article"] input[name$="content"]').val();
    var thumbnail = $('form[name$="edit-article"] input[name$="thumbnail"]').val();
    var status = $('form[name$="edit-article"] select[name$="status-opt"]').val();
    var categoryId = $('form[name$="edit-article"] select[name$="categoryId"]').val();
    var data = {
        "url": link,
        "titleSelector": title,
        "descriptionSelector": description,
        "contentSelector": content,
        "thumbnailSelector": thumbnail,
        "categorySelector": categoryId,
        "status": status
    }
    var article = JSON.stringify(data);
    var modal = $(this)
    modal.find('.modal-title').text('Edit article')
    $.ajax({
        url: url,
        data: article,
        method: "POST",
        success: function (metaData) {
            var status = "";
            if (metaData.data.status == 0) {
                status = "Pending";
            } if (metaData.data.status == 1) {
                status = "Indexed";
            }

            modal.find('.modal-body input').val(link)
            modal.find('.modal-body textarea[name$="title"]').val(metaData.data.title)
            modal.find('.modal-body textarea[name$="description"]').val(metaData.data.description)
            modal.find('.modal-body textarea[name$="content"]').val(metaData.data.content)
            modal.find('.modal-body textarea[name$="thumbnail"]').val(metaData.data.thumbnail)
            modal.find('.modal-body input[name$="author"]').val(metaData.data.author)
            modal.find('.modal-body input[name$="sourceId"]').val(metaData.data.sourceId)
            modal.find('.modal-body input[name$="createdAtMLS"]').val(metaData.data.createdAtMLS)
            modal.find('.modal-body input[name$="updatedAtMLS"]').val(metaData.data.updatedAtMLS)
            modal.find('.modal-body input[name$="status"]').val(status)
            modal.find('.modal-body input[name$="categoryId"]').val(metaData.data.categoryId)

            var img = "";
            if (metaData.data == null) {
                return;
            }
            metaData.data.thumbnail.forEach(element => {
                img += ` 
                <div class="col-4" style="display: inline-block;">
                    <img src="${element}" class="img-fluid" name="image">
                </div>`;
                modal.find('.modal-body div[name$="image"]').html(img);
            });
            modal.find('.modal-footer button[name$="addNews"]').click(function () {
                addNews();
            })
        },
        headers: {
            "Authorization": "Bear eefbd5f1811c454abfa0f66e3d5d8e1f",
        },
        error: function () {
            Swal.fire('Update fail!')
        }
    })

})
function addNews() {
    var link = $('.modal-body input[name$="link"]').val();
    var title = $('.modal-body textarea[name$="title"]').val();
    var description = $('.modal-body textarea[name$="description"]').val();
    var content = $('.modal-body textarea[name$="content"]').val();
    var thumbnail = $('.modal-body textarea[name$="thumbnail"]').val();
    var author = $('.modal-body input[name$="author"]').val();
    var sourceId = $('.modal-body input[name$="sourceId"]').val();
    var createdAtMLS = $('.modal-body input[name$="createdAtMLS"]').val();
    var updatedAtMLS = $('.modal-body input[name$="updatedAtMLS"]').val();
    var status = $('.modal-body select[name$="status-opt"]').val();
    var categoryId = $('.modal-body input[name$="categoryId"]').val();

    var article = {
        "link": link,
        "categoryId": categoryId,
        "title": title,
        "content": content,
        "thumbnail": [thumbnail],
        "author": author,
        "description": description,
        "sourceId": sourceId,
        "createdAtMLS": createdAtMLS,
        "updatedAtMLS": updatedAtMLS,
        "status": status
    }

    var data = JSON.stringify(article);
    console.log("stringify :" + data);
    $.ajax({
        "url": urlArticle,
        "method": "POST",
        "data": data,
        "success": function (data) {
            if (data.status == 200) {
                Swal.fire('Create success!')
                setInterval(function () {
                    window.location.href = "dashboard.html";
                }, 1000)


            } else
                Swal.fire('Create fail!')
        },
        headers: {
            "Authorization": "Bear eefbd5f1811c454abfa0f66e3d5d8e1f",
        },
        "error": function () {
            Swal.fire('Update fail!')
        }
    })
}