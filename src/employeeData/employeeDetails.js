$(document).ready(function () {
    getEmployee();
});

function getEmployee() {
    $('#employeeBody').html('');
    $.ajax({
        method: 'GET',
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
                    + "<td>" + "<button class=editbtn data-id=" + data1.id + " >" + "<img src=" + '/src/Assests/edit.png' + "></button></td>"
                    + "<td calss-deleteEmp>" + "<button class=deletebtn data-id=" + data1.id + ">" + "<img src=" + '/src/Assests/delete.png' + "></button></td></tr>"
                $(tblRow).appendTo("#employeeBody");
            });
            loadButtons();
        },

        error: function () {
            alert("not fetching employee data");
        }

    });
}

$("#btn").on("click", function (e) {
    if(validateForm()==true){
    let employee = {
        id: $($('.Form')[0].id).val(),
        firstName: $($('.Form')[0].fName).val(),
        lastName: $($('.Form')[0].lName).val(),
        email: $($('.Form')[0].email).val(),
    }
    addEmployee(employee);
    e.preventDefault();
    $(".Form").trigger("reset");
}
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
            location.href = "employeeDetails.html";
        },
        error: function () {
            console.log("nont saving employee data");
        }
    });
}

function updateEmployee(id, data) {
    $.ajax({
        url: 'http://localhost:3000/employee/' + id,
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
        updateForm();
    });

    $(".deletebtn").click(function (e) {
        deleteEmployee($($(this)[0]).data("id"));
        e.preventDefault();
    });
}

function editOneEmployeeValue(id) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/employee/' + id,
        dataType: 'json',
        success: function (data) {

            $('#editid').val(data.id);
            $('#editFirstName').val(data.firstName);
            $('#editLastName').val(data.lastName);
            $('#editEmail').val(data.email);
            $("#updateForm").show();
            getEmployee();

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
    $('#updateForm').toggle();
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

let modal = document.getElementById('updateDiv');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function updateForm() {
    document.getElementById("updateDiv").style.display = "block";
}

function validateForm() {
    if( document.validteForm.id.value == "" ) {
        alert( "Please provide ID!" );
        document.validteForm.id.focus() ;
        return false;
     }
     if( document.validteForm.firstName.value == "" ) {
        alert( "Please provide your First Name!" );
        document.validteForm.firstName.focus() ;
        return false;
     }
     if( document.validteForm.lastName.value == "" ) {
        alert( "Please provide your Last Name!" );
        document.validteForm.lastName.focus() ;
        return false;
     }
     if( document.validteForm.email.value == "" ) {
        alert( "Please provide your Email!" );
        document.validteForm.email.focus() ;
        return false;
     }
     return true;
}