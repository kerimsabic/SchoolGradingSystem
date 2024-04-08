$(document).ready(function() {
    // Retrieve course ID from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course_id');
    
    if (courseId) {
        // Fetch course details based on the course ID
        $.ajax({
            url: 'data/courses.json', // Specify the path to your JSON file
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Find the course with the matching course ID
                const course = response.courses.find(course => course.course_id === courseId);
                
                if (course) {
                    // Display course details
                    const courseDetailsHtml = `
                        <h2>${course.course_name}</h2>
                        <p>Description: ${course.course_description}</p>
                        <p>Instructor: ${course.instructor.name}</p>
                        <p>Credits: ${course.credits}</p>
                    `;
                    $('#courseDetails').html(courseDetailsHtml);
                } else {
                    console.error('Course not found.');
                    $('#courseDetails').html('<p>Course not found.</p>');
                }
            },
            error: function(error) {
                console.error('Error fetching course details:', error);
                $('#courseDetails').html('<p>Error fetching course details.</p>');
            }
        });
    } else {
        console.error('Course ID not provided.');
        $('#courseDetails').html('<p>Course ID not provided.</p>');
    }
});
