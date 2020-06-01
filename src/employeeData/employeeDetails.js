$.getJSON('../employeeData/employeeData.json', function (data) {
    $.each(data.Employee, function (i, data1) {
        let tblRow = "<tr><td>" + data1.firstName + "</td>"
            + "<td>" + data1.lastName + "</td>"
            + "<td>" + data1.email + "</td>"
            + "<td>" + "<button class=editbtn>" + "<img src=" + data1.edit + "></button></td>"
            + "<td>" + "<button class=deletebtn>" + "<img src=" + data1.delete + "></button></td></tr>"
        $(tblRow).appendTo(".table");
    });
});