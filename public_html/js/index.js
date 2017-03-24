/**
 * Created by bhavya on 17/3/17.
 */
$(document).ready(function () {

    function toggleClasses(active) {
        if (active === 'student') {
            if ($('#registerCompany').hasClass('active')) {
                $('#registerStudent').toggleClass('active');
                $('#registerCompany').toggleClass('active');
                $('#liRegisterStudent').toggleClass('active');
                $('#liRegisterCompany').toggleClass('active');
            }
        } else {
            if (!($('#registerCompany').hasClass('active'))) {
                $('#registerStudent').toggleClass('active');
                $('#registerCompany').toggleClass('active');
                $('#liRegisterStudent').toggleClass('active');
                $('#liRegisterCompany').toggleClass('active');
            }
        }
    }

    $("#signUpStudent").click(function () {
        toggleClasses("student");
        $("#signUpModal").modal('toggle');
    });
    $("#signUpCompany").click(function () {
        toggleClasses("");
        $("#signUpModal").modal('toggle');
    });

    $('#signUp').click(function () {
        toggleClasses("student");
        $('#signUpModal').modal('toggle');
    });

    $('#signIn').click(function () {
        $('#signInModal').modal('toggle');
    });

    $('#studentsignupform').submit(function (e) {
                e.preventDefault();
    });
    $('#studentsigninform').submit(function (e) {
        e.preventDefault();
    });
    $('#studentsignup').click(function () {

        var fn = $('#studfirstname').val();
        var ln = $('#studlastname').val();
        var email = $('#studemail').val();
        var pass = $('#studpassword').val();

        console.log(fn,ln,email,pass);

        $.post("http://localhost:4000/student/add",{
            firstname:fn,
            lastname:ln,
            email:email,
            password:pass
        },function (data){
            if(data.isSuccess==="true") {

                var url = data.url;
                console.log(url);
                localStorage.setItem("studentId", data.studentId);
                //console.log(localStorage.getItem("studentId"));
                window.location.replace(url);
            }
        });

    });

    $('#studentsignin').click(function () {

        var email = $('#studemaillogin').val();
        var pass = $('#studpasslogin').val();

        console.log(email,pass);

        $.post("http://localhost:4000/student/login",{
            email:email,
            password:pass
        },function (data){
            if(data.isSuccess==="true") {

                var url = data.url;
                console.log(url);
                localStorage.setItem("studentId", data.studentId);
                //console.log(localStorage.getItem("studentId"));
                window.location.replace(url);
            }
        });
    });




    // $('#myTabs a').click(function (e) {
    //     e.preventDefault();
    //     $(this).tab('show')
    // })

    $('#companySignUpForm').submit(function (e) {
        e.preventDefault();
    });

    $('#companySignInForm').submit(function (e) {
        e.preventDefault();
    });

    $('#companySignUpButton').click(function () {
        const name = $('#signUpCompanyName').val();
        const email = $('#signUpCompanyEmail').val();
        const password = $('#signUpCompanyPassword').val();
        //Validate Form
        //Uncomment after testing
        /*if(obj.name===""||obj.email===""||obj.password===""){
         //To check if field is empty
         }*/

        $.post("http://localhost:4000/company/add", {
                name: name,
                email : email,
                password : password
        },
        function (data) {
            if(data.isSuccess==="true"){
                localStorage.setItem("companyId",data.companyId);
                window.location.replace(data.url);
            }
        });

    });

    $('#companySignInButton').click(function () {
        const email = $('#signInCompanyEmail').val();
        const password = $('#signInCompanyPassword').val();
        //Validate Form
        //Uncomment after testing
        /*if(obj.name===""||obj.email===""||obj.password===""){
         //To check if field is empty
         }*/

        $.post("http://localhost:4000/company/login", {
                email : email,
                password : password
            },function (data) {
            if(data.isSuccess==="true"){
                localStorage.setItem("companyId",data.companyId);
                window.location.replace(data.url);
            }
        });

    });
});