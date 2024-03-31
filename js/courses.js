$(document).ready(function() {
    // Fetch courses from JSON file
    $.ajax({
        url: 'data/courses.json', // Specify the path to your JSON file
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Handle successful response
            if (response && response.courses) {
                // Iterate over courses and create course cards
                $.each(response.courses, function(index, course) {
                    var courseCard = `
                    <div class="col-xl-6 col-md-6">
                        <div class="card bg-primary text-white mb-4 position-relative">
                            <div class="position-absolute top-0 end-0 p-2">${course.course_id}</div>
                            <div class="d-flex">
                                <div class="card-body">${course.course_name}</div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link course-link" href="#" data-course-id="${course.course_id}">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    `;
                    $('#courseList').append(courseCard);
                });
                
                // Add click event listener to course links
                $('.course-link').click(function(event) {
                    event.preventDefault();
                    var courseId = $(this).data('course-id');
                    window.location.href = '#course-details.html?course_id=' + courseId;
                });
            } else {
                console.error('No courses found.');
            }
        },
        error: function(error) {
            console.error('Error fetching courses:', error);
        }
    });
});
