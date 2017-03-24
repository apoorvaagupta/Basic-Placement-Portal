/**
 * Created by apoorvaa_gupta on 23/3/17.
 */
$('document').ready(function () {

    $.get('http://localhost:4000/student/companies?choice=all', function (data) {
        console.log(data);
        const acc = $('#accordian');
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            console.log(i);
            let headingId = "heading" + i;
            let panelId = "panel" + i;
            console.log(headingId);
            console.log(panelId);

            acc.append(
                `<div class="panel panel-default">
                <div class="panel-heading" role="tab" id="` + headingId + `">
                <h3 class="panel-title">
                <a role="button" data-toggle="collapse"
            data-parent="#accordian" href="#` + panelId + `"
            aria-expanded="true" aria-controls="` + panelId + `">
                ` + data[i].name + `
            </a>
            </h3>
            </div>
            <div role="tabpanel" class="panel-collapse collapse"
            id="` + panelId + `" aria-labelledby="` + headingId + `">
                <div class="panel-body">
                <p>` + data[i].email + `</p>
                </div>
                </div>
                </div>`
            )
        }
    });

    document.getElementById('choice').addEventListener('change', function () {
        let choice = $('#choice').find(":selected").text();
        $.get('http://localhost:4000/student/companies?choice=' + choice, function (data) {
            console.log(data);
        });

    });


});