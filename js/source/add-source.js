var url = "https://beta-dot-assignmentcrawler.appspot.com/admin/_api/source";

$().ready(function () {
    $('#add-source').validate();


});
$('form[name$="add-source"] input[name$="submit"]').click(function () {
    if ($("#add-source").valid()){
        sendData();
    }

});
function sendData() {

    var link = $('form[name$="add-source"] input[name$="link"]').val();
    var link_select = $('form[name$="add-source"] input[name$="linkSelect"]').val();
    var title = $('form[name$="add-source"] input[name$="title"]').val();
    var description = $('form[name$="add-source"] input[name$="description"]').val();
    var content = $('form[name$="add-source"] input[name$="content"]').val();
    var thumbnail = $('form[name$="add-source"] input[name$="thumbnail"]').val();
    var author = $('form[name$="add-source"] input[name$="author"]').val();
    var source = {
        "url": link,
        "linkSelector": link_select,
        "titleSelector": title,
        "descriptionSelector": description,
        "contentSelector": content,
        "authorSelector": author,
        "thumbnailSelector": thumbnail
    }
    console.log("stringify :" + JSON.stringify(source));
    $.ajax({
        "url": url,
        "method": "POST",
        "data": JSON.stringify(source),
        "success": function (data) {
            if (data.status == 201) {
                Swal.fire('Create success!')
                // setInterval(function () {
                //     window.location.href = "dashboard.html";
                // }, 1000)


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


