/**
 * Created by apoorvaa_gupta on 22/3/17.
 */

$('document').ready(function () {
   $.get("http://localhost:4000/student/profile?studentId="
       +localStorage.getItem("studentId"),function (data) {
       console.log(data);
       $('#firstname').text(data.firstname);
       $('#lastname').text(data.lastname);
       $('#email').text(data.email);
       $('#pincode').text(data.pincode);
       $('#contact').text(data.contact);
       $('#education').text(data.education);
       $('#skills').text(data.skills);
       $('#languages').text(data.languages);
       $('#projects').text(data.projects);
       $('#trainigs').text(data.trainings);
       $('#cbStudent').text(data.cbStudent);
       $('#cbCourses').text(data.cbCourses);

   });
});