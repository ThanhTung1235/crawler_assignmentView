const url = "https://beta-dot-assignmentcrawler.appspot.com/_api/account/login";
$('#btn-submit').click(function () {
    const username = $('form[name$="login-form"]input[name$="username"]').val();
    const password = $('form[name$="login-form"]input[name$="pass"]').val();
    const dataObj = {
        "username": username,
        "password": password
    };

    $.ajax({
        "url" : url,
        "method" : "post",
        "data" : JSON.stringify(dataObj),
        "success" : function (metaData) {
            if (metaData.status == 200){
                localStorage.setItem("token",metaData.data.token);
                window.location.href = "../dashboard.html";
            }else
                alert('Login fail')
        },
        "error":function () {
            alert('Login fail')
        }
    })
})