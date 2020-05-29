$.getJSON('employeeData.json', function (data) {
    $.each(data.Employee, function (i, data1) {
        let tblRow = "<tr><td>" + data1.firstName + "</td>"
            + "<td>" + data1.lastName + "</td>"
            + "<td>" + data1.email + "</td>"
            + "<td>" + "<img src=" + data1.edit +"></td>"
            + "<td>" + "<img src=" + data1.delete + "></td></tr>"
        $(tblRow).appendTo(".table");
    });
});