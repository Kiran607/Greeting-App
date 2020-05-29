$.ajax({
    url: 'employeeData.json',
    dataType: 'json',
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            let row = $('<tr><td>' + data[i].firstName + '</td><td>'
                + data[i].lastName + '</td><td>'
                + data[i].email + '</td><td>'
                +data[i].edit+'</td><td>'
                +data[i].delete+'</td></tr>');
            $('.table').append(row);
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log('Error:' + textStatus + '-' + errorThrown);
    }

});