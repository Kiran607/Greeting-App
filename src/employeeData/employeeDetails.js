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
    if (validateForm() == true) {
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
    if (editValidateForm == true) {
        let employee = {
            id: $('#editid').val(),
            firstName: $('#editFirstName').val(),
            lastName: $('#editLastName').val(),
            email: $('#editEmail').val(),
        }
        updateEmployee($('#editid').val(), employee);
        e.preventDefault();
        $('#updateForm').toggle();
    }
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
    let firstName = document.getElementById('fName').value;
    let firstNameRGEX = /^[A-Z][a-z]{3,}$/;
    let firstNameResult = firstNameRGEX.test(firstName);

    let lastName = document.getElementById('lName').value;
    let lastNameRGEX = /^[A-Z][a-z]{2,}$/;
    let lastNameResult = lastNameRGEX.test(lastName);

    let email = document.getElementById('email').value;
    let emailRGEX = /^[a-z]{3,}(|[.]?[0-9a-zA-Z]+)([@])([a-z0-9]+)([.|+|_][a-z]{2,4})(|[.][a-zA-Z]{2})$/;
    let emailResult = emailRGEX.test(email);

    if (document.validteForm.id.value == "") {
        alert("Please provide ID!");
        document.validteForm.id.focus();
        return false;
    }
    if (firstNameResult == false) {
        alert("Name must contain starting captial letter and name length should be greater than 3!");
        document.validteForm.firstName.focus();
        return false;
    }
    if (lastNameResult == false) {
        alert("Last Name must contain starting captial letter and name length should be greater than 2!");
        document.validteForm.lastName.focus();
        return false;
    }
    if (emailResult == false) {
        alert("please provide valid email ex:abc@gmail.com");
        document.validteForm.email.focus();
        return false;
    }
    return true;
}

function editValidateForm() {
    let firstName = document.getElementById('updateFName').value;
    let firstNameRGEX = /^[A-Z][a-z]{3,}$/;
    let firstNameResult = firstNameRGEX.test(firstName);

    let lastName = document.getElementById('updateLName').value;
    let lastNameRGEX = /^[A-Z][a-z]{2,}$/;
    let lastNameResult = lastNameRGEX.test(lastName);

    let email = document.getElementById('updateEmail').value;
    let emailRGEX = /^[a-z]{3,}(|[.]?[0-9a-zA-Z]+)([@])([a-z0-9]+)([.|+|_][a-z]{2,4})(|[.][a-zA-Z]{2})$/;
    let emailResult = emailRGEX.test(email);

    if (document.editValidateForm.updateId.value == "") {
        alert("Please provide ID!");
        document.editValidateForm.id.focus();
        return false;
    }
    if (firstNameResult == false) {
        alert("Please provide your First Name!");
        document.editValidateForm.updateFName.focus();
        return false;
    }
    if (lastNameResult == false) {
        alert("Please provide your Last Name!");
        document.validteForm.updateLName.focus();
        return false;
    }
    if (emailResult == false) {
        alert("Please provide your Email!");
        document.validteForm.updateEmail.focus();
        return false;
    }
    return true;
}