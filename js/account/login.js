var url = "https://beta-dot-assignmentcrawler.appspot.com/_api/account/login"
$('#btn-submit').click(function () {
    var username = $('form[name$="login-form"] input[name$="usename"]').val();
    var password = $('form[name$="login-form"] input[name$="pass"]').val();
    var dataObj = {
        "username": username,
        "password": password
    }

    $.ajax({
        "url": url,
        "method": "POST",
        "data": JSON.stringify(dataObj),
        "success": function (metaData) {
            if (metaData.status == 200) {
                localStorage.setItem("token", metaData.data.token);// chi cho login
                window.location.href = "../dashboard.html"; // register.html
            } else
                alert('Login fail')
        },
        "error": function () {
            alert('Login fail')
        }
    })
})