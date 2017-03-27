/**
 * Created by apoorvaa_gupta on 22/3/17.
 */

$('document').ready(function () {
    $.get("http://localhost:4000/student/profile?studentId="
        + localStorage.getItem("studentId"), function (data) {
        console.log("editprofile data");
        console.log(data);
        $('#editfirstname').val(data.firstname);
        $('#editlastname').val(data.lastname);
        $('#editemail').val(data.email);
    });
    $('#save').click(function () {
        var fn = $('#editfirstname').val();
        var ln = $('#editlastname').val();
        var email = $('#editemail').val();

        console.log(fn, ln, email);

        $.post("http://localhost:4000/student/update", {
            details: {
                id: localStorage.getItem("studentId"),
                firstname: fn,
                lastname: ln,
                email: email
            }
        }, function (data) {
            if (data.isSuccess === "true") {

                var url = data.url;
                console.log(url);
                //console.log(localStorage.getItem("studentId"));
                window.location.replace(url);
            }
        });
    })
});