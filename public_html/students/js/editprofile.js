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
        $('#editpincode').val(data.pincode);
        $('#editcontact').val(data.contact);
        $('#editeducation').val(data.education);
        $('#editskills').val(data.skills);
        $('#editlanguages').val(data.languages);
        $('#editprojects').val(data.projects);
        $('#edittrainings').val(data.trainings);

    });
    $('#save').click(function () {
        var fn = $('#editfirstname').val();
        var ln = $('#editlastname').val();
        var email = $('#editemail').val();
        var pc = $('#editpincode').val();
        var contact = $('#editcontact').val();
        var edu = $('#editeducation').val();
        var skills = $('#editskills').val();
        var trainings = $('#edittrainings').val();
        var projects = $('#editprojects').val();
        var lang = $('#editlanguages').val();




        //  .
        // console.log(cbs);

        $.post("http://localhost:4000/student/update", {
            details: {
                id: localStorage.getItem("studentId"),
                firstname: fn,
                lastname: ln,
                email: email,
                pincode: pc,
                contact: contact,
                education: edu,
                skills: skills,
                trainings: trainings,
                projects: projects,
                languages: lang,
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