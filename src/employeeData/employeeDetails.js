$(document).ready(function () {
    getEmployee();
});

function getEmployee() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/employee',
        dataType: 'json',
        data: {
            test: 'test data'
        },
        success: function (data) {
            $.each(data, function (i, data1) {
                let tblRow = "<tr><td>" + data1.id + "</td>"+"<td>" + data1.firstName + "</td>"
                    + "<td>" + data1.lastName + "</td>"
                    + "<td>" + data1.email + "</td>"
                    + "<td>" + "<button class=editbtn>" + "<img src=" + '/src/Assests/edit.png' + "></button></td>"
                    + "<td>" + "<button class=deletebtn>" + "<img src=" + '/src/Assests/delete.png'+ "></button></td></tr>"
                $(tblRow).appendTo(".table");
            });
        },
        error: function () {
            alert("nont saving employee data");
        }
    });
}

$("#btn").on("click", function (e) {
    let employee = {
        id: $($('.Form')[0].id).val(),
        firstName: $($('.Form')[0].fName).val(),
        lastName: $($('.Form')[0].lName).val(),
        email: $($('.Form')[0].email).val(),
    }
    addEmployee(employee);
    e.preventDefault();
});

function addEmployee(employee) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/employee',
        dataType: 'json',
        data: employee,
        success: function(employee) {
            console.log(employee);
            getEmployee();
        },
        error: function () {
            console.log("nont saving employee data");
        }
    });
}

function editEmployee(id,data) {
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/employee',
        dataType: 'json',
        data: data,
        success: function(employee) {
            console.log(employee);
            getEmployee();
        },
        error: function () {
            console.log("nont saving employee data");
        }
    });
}