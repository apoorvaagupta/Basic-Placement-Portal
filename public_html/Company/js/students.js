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
            const cards = $('#cards');
            for (let i = 0; i < data.count; i++) {
                cards.append(`
                    <div class="card col-xs-4">
                        <img src="/img/student.png">
                        <div class="cardHeading"">
                            <h3>
                                <a href="#` + i + `" id="heading` + i + `">
                                </a>
                            </h3>
                        </div>
                        <div class="cardBody" id="body` + i + `">
                            <p id="body`+i+`">
                            </p>
                        </div>
                    </div>
                `);
                console.log(data.rows[i].firstname+" "+data.rows[i].lastname);
                $('#heading'+i).text(data.rows[i].firstname+" "+data.rows[i].lastname);
                $('#body'+i).text(data.rows[i].email);
            }
        }
    });
});