$(document).ready(function () {
    getEmployee();
});

function getEmployee() {
    $('#employeeBody').html('');
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/employee',
        dataType: 'json',
        data: {
            test: 'test data'
        },
        success: function (data) {
            $.each(data, function (i, data1) {
                let tblRow = "<tr><td>" + data1.id + "</td>" + "<td>" + data1.firstName + "</td>"
                    + "<td>" + data1.lastName + "</td>"
                    + "<td>" + data1.email + "</td>"
                    + "<td>" + "<a href=../component/editEmployee.html>" + "<button class=editbtn" + "data-id=" + data1.id + ">" + "<img src=" + '/src/Assests/edit.png' + "></button></a></td>"
                    + "<td calss-deleteEmp>" + "<button class=deletebtn data-id=" + data1.id + ">" + "<img src=" + '/src/Assests/delete.png' + "></button></td></tr>"
                $(tblRow).appendTo("#employeeBody");
            });
            loadButtons();
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
        success: function (employee) {
            console.log("Added successfully", employee);
            getEmployee();
        },
        error: function () {
            console.log("nont saving employee data");
        }
    });
}

function updateEmployee(id, data) {
    $.ajax({
        url: 'http://localhost:3000/employee/ ' + id,
        method: 'PUT',
        dataType: 'json',
        data: data,
        success: function (data) {
            console.log(data);
            getEmployee();
        },
        error: function () {
            console.log("nont saving employee data");
        }
    });
}

function loadButtons() {
    $(".editbtn").click(function (e) {
        e.preventDefault();
        editOneEmployeeValue($($(this)[0]).data("id"));
    });

    $(".deletebtn").click(function (e) {
        deleteEmployee($($(this)[0]).data("id"));
        e.preventDefault();
    });
}



function editOneEmployeeValue(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/employee',
        dataType: 'json',
        success: function (data) {
            $($('.EditForm')[0].editid).val(data.id),
            $($('.EditForm')[0].editFirstName).val(data.firstName),
            $($('.EditForm')[0].editLastName).val(data.lastName),
            $($('.EditForm')[0].editEmail).val(data.email)
            $('.EditForm').show();
        },
        error: function () {
            alert("nont saving employee data");
        }
    });
}

$("#editButton").on("click", function (e) {
    let employee = {
        id: $($('.EditForm')[0].editid).val(),
        firstName: $($('.EditForm')[0].editFirstName).val(),
        lastName: $($('.EditForm')[0].editLastName).val(),
        email: $($('.EditForm')[0].editEmail).val(),
    }
    updateEmployee($($('.EditForm')[0].editid).val(), employee);
    e.preventDefault();
    document.forms[0].reset();
});

function deleteEmployee(id) {
    $.ajax({
        url: 'http://localhost:3000/employee/' + id,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            getEmployee();
        },
        error: function () {
            alert("Not Deleted");
        }
    });
}
