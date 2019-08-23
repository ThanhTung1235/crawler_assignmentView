var url = "https://beta-dot-assignmentcrawler.appspot.com/admin/_api/source";

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("token") == null) {
        window.location.href = "../account/login.html";
    }
    $('#loader').show();
    $('#data-table').hide();
    loadDoc();
    loadCategory();

});
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#loader').hide();
            $('#data-table').show();
            var metaData = JSON.parse(xhttp.responseText);
            var _pageSize = 5;

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
    var token = "Bearer " + localStorage.getItem("token");
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", token);
    xhttp.send();
}
function dataTable(data, pageSize, pageNumber) {
    var data_table = "";
    $.each(data, function (index, item) {
        data_table += `  <tr>
                <td>${(pageNumber - 1) * pageSize + index + 1}</td>
                <td>
                    <p class="eclipse-text">${item.url}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.titleSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.thumbnailSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.linkSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.descriptionSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.contentSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.authorSelector}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.CreatedAt}</p>
                </td>
                <td>
                    <p class="eclipse-text">${item.UpdatedAt}</p>
                </td>
                </tr>`;
    })
    return data_table;
}


