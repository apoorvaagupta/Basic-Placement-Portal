/**
 * Created by bhavya on 22/3/17.
 */
$(document).ready(function () {
    document.getElementById('select').addEventListener('change',function () {
        console.log('hi');
    })


    $.get("http://localhost:4000/company/students", function (data) {
        if (data.isSuccess == 'true') {

            console.log(data.rows);
            const accordian = $('#accordian');
            for (let i = 0; i < data.count; i++) {
                accordian.append(`<div class="panel panel-default">
                    <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordian" href="#acc` + i + `"
                aria-expanded="true" aria-controls="acc` + i + `" id="heading` + i + `">
                   </a>
                </h3>
                </div>
                <div role="tabpanel" class="panel-collapse collapse" id="acc` + i + `"
                aria-labelledby="heading`+i+`">
                    <div class="panel-body">
                    <p id="panelBody`+i+`">
                </p>
                </div>
                </div>
                </div>`);
                console.log(data.rows[i].firstname+" "+data.rows[i].lastname);
                $('#heading'+i).text(data.rows[i].firstname+" "+data.rows[i].lastname);
                $('#panelBody'+i).text(data.rows[i].email);
            }
            $('#acc0').toggleClass('in');
        }
    });
});