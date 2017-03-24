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
   });
});