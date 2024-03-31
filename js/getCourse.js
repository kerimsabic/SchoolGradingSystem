// getCourse.js

$(document).ready(function() {
    $('#getCourseBtn').click(function() {
        var courseId = $('#courseId').val();
        var endpoint = 'http://localhost/SchoolGradingSystem/#courses/' + courseId; // Modify this line to include your base endpoint
        $.ajax({
            url: endpoint,
            type: 'GET',
            success: function(response) {
                // Assuming response is in JSON format
                $('#courseInfo').html('<h3>Course Information:</h3>');
                $('#courseInfo').append('<p>Course ID: ' + response.course_id + '</p>');
                $('#courseInfo').append('<p>Course Name: ' + response.course_name + '</p>');
                $('#courseInfo').append('<p>Course Description: ' + response.course_description + '</p>');
                $('#courseInfo').append('<p>Instructor Name: ' + response.instructor.name + '</p>');
                $('#courseInfo').append('<p>Instructor Email: ' + response.instructor.email + '</p>');
                $('#courseInfo').append('<p>Credits: ' + response.credits + '</p>');
                // You can handle enrolled students here as well
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                $('#courseInfo').html('<p>Error retrieving course information.</p>');
            }
        });
    });
});
