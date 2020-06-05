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
                    + "<td>" + "<a href=/component/editEmployee.html> <button class=editbtn data-id=" + data1.id + " >" + "<img src=" + '/src/Assests/edit.png' + "></button></a></td>"
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
    $(".Form").trigger("reset");
    // window.location.href="employeeDetails.html"
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
        url: 'http://localhost:3000/employee/'+id,
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
        console.log("kiran")
        editOneEmployeeValue($($(this)[0]).data("id"));
        window.location.href="editEmployee.html";
    });

    $(".deletebtn").click(function (e) {
        deleteEmployee($($(this)[0]).data("id"));
        e.preventDefault();
    });
}



function editOneEmployeeValue(id) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/employee/'+id,
        dataType: 'json',
        success: function (data) { 
            $($("#updateForm")[0].editid).val(data.id);
            $($("#updateForm")[0].editFirstName).val(data.firstName);
            $($("#updateForm")[0].editLastName).val(data.lastName);
            $($("#updateForm")[0].editEmail).val(data.email);
            // getEmployee();
            // $("#updateForm").show();
        },
        error: function (error) {
            alert(error);
            alert("nont fetching employee data");
        }
    });
}

$("#editButton").on("click", function (e) {
    let employee = {
        id: $('#editid').val(),
        firstName: $('#editFirstName').val(),
        lastName: $('#editLastName').val(),
        email: $('#editEmail').val(),
    }
    updateEmployee($('#editid').val(), employee);
    e.preventDefault();
    document.forms[0].reset();
    // window.location.href="employeeDetails.html"
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
