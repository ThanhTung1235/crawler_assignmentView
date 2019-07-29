var url = "https://beta-dot-assignmentcrawler.appspot.com/admin/_api/article";

document.addEventListener('DOMContentLoaded', function () {
    $('#loader').show();
    $('#data-table').hide();
    loadDoc();
});
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#loader').hide();
            $('#data-table').show();
            var metaData = JSON.parse(xhttp.responseText);
            var _pageSize = 30;

            $('#pagination-container').pagination({
                dataSource: metaData.data,
                pageSize: _pageSize,
                autoHidePrevious: true,
                autoHideNext: true,
                callback: function (data, pagination) {
                    console.log(pagination);
                    var html = dataTable(data, _pageSize, pagination.pageNumber);
                    $('#data-container').html(html);
                }
            })
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", "Bear eefbd5f1811c454abfa0f66e3d5d8e1f");
    xhttp.send();
}
function dataTable(data, pageSize, pageNumber) {
    var data_table = "";
    $.each(data, function (index, item) {
        var thumbnail;
        var status;
        var status_color;
        if (item.thumbnail == null || item.thumbnail == 0) {
            var thumbnail = "-"
        } else thumbnail = item.thumbnail[0];
        if (item.status == 0) {
            status = "Pending";
            status_color = "btn-primary"
        } if (item.status == 1) {
            status = "Indexed";
            status_color = "btn-success"
        }

        data_table += `  <tr>
                <td>${(pageNumber - 1) * pageSize + index + 1}</td>
                <td>
                    <p class="eclipse-text">${item.title}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.description}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.content}</p>
                </td>
                <td>
                    <img class="thumbnail" src="${thumbnail}">
                </td>
                <td>
                    <p class="eclipse-text">${item.createdAtMLS}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.updatedAtMLS}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.link}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.author}</p>
                </td>
                <td>
                    <button type="button" class="${status_color} btn-sm" name="status" data-toggle="modal" data-target="#exampleModal" data-article="${item.link}" >
                        ${status}
                    </button>
                </td>
                <td>
                <div style="min-width: 130px;">
                    <button class="btn-primary btn-sm" name="info" >
                        <i class="fas fa-info"></i>
                    </button>
                    <button type="button" class="btn-warning btn-sm" data-toggle="modal" data-target="#exampleModal" data-article="${item.link}">
                            <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger btn-sm" onclick="deleteArticle('${item.link}')" name="delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                </td>
                </tr>`;
    })
    return data_table;
}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var link = button.data('article');
    var modal = $(this)
    modal.find('.modal-title').text('Edit article')
    $.ajax({
        url: url + "?id=" + link,
        method: "GET",
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
            metaData.data.thumbnail.forEach(element => {
                img += ` 
                <div class="col-4" style="display: inline-block;">
                    <img src="${element}" class="img-fluid" name="image">
                </div>`;
                modal.find('.modal-body div[name$="image"]').html(img);
            });
            modal.find('.modal-footer button[name$="submit"]').click(function () {
                change(link);
            })
        },
        headers: {
            "Authorization": "Bear eefbd5f1811c454abfa0f66e3d5d8e1f",
        },
        error: function () {
            alert("fail")
        }

    })
})
function change(linkArticle) {

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
    $.ajax({
        "url": url + "?id=" + linkArticle,
        "method": "PUT",
        "data": data,
        "success": function (data) {
            if (data.status == 200) {
                Swal.fire('Update success!')
                setInterval(function () {
                    location.reload()
                }, 1000)


            } else
                Swal.fire('Update fail!')
        },
        headers: {
            "Authorization": "Bear eefbd5f1811c454abfa0f66e3d5d8e1f",
        },
        "error": function () {
            Swal.fire('Update fail!')
        }
    })
}
function deleteArticle(linkArticle) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            $.ajax({
                "url": url + "?id=" + linkArticle,
                "method": "DELETE",
                "success": function (data) {
                    if (data.status == 200) {
                        Swal.fire(data.message);
                    }
                    else
                        Swal.fire('Update fail!')
                },
                headers: {
                    "Authorization": "Bear eefbd5f1811c454abfa0f66e3d5d8e1f",
                },
                "error": function () {
                    Swal.fire('Update fail!')
                }
            })
        }
    })
}
$('#btn_menu').click(x => {
    $('#sidebar').toggle();

})