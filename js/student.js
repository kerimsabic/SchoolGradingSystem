$(document).ready(function () {
    // AJAX call to fetch JSON data
    $.ajax({
        url: 'http://localhost/SchoolGradingSystem/data/students.json',
        dataType: 'json',
        success: function (data) {
            // Populate table with fetched data and add custom buttons
            $('#studentTable').DataTable({
                data: data,
                columns: [
                    { data: 'Name' },
                    { data: 'Age' },
                    { data: 'Email' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn-edit" data-id="' + row.id + '">Edit</button> <button class="btn-grade" data-id="' + row.id + '">Grade</button>';
                        }
                    }
                ]
            });
        }
    });

    // Event listener for edit button
    $('#studentTable').on('click', '.btn-edit', function () {
        var id = $(this).data('id');
        // Handle edit action here
        console.log('Edit clicked for ID: ' + id);
    });

    // Event listener for grade button
    $('#studentTable').on('click', '.btn-grade', function () {
        var id = $(this).data('id');
        // Handle grade action here
        console.log('Grade clicked for ID: ' + id);
    });
});