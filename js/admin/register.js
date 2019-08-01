const url = "https://beta-dot-assignmentcrawler.appspot.com/_api/account/register";
$('#btn-submit').click(function () {
    const username = $('form[name$="register-form"] input[name$="username"]').val();
    const password = $('form[name$="register-form"] input[name$="pass"]').val();
    const dataObj = {
        "username": username,
        "password": password
    };
    $.ajax({
        "url" : url,
        "method" : "post",
        "data" : JSON.stringify(dataObj),
        "success" : function (metaData) {
            if (metaData.status == 201){
                window.location.href = "login.html";
            }else
                alert('Register fail')
        },
        "error":function () {
            alert('Register fail')
        }
    })
})