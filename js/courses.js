$(document).ready(function getCourses() {
    // Fetch courses from JSON file
    $.ajax({
        url: 'data/courses.json', // Specify the path to your JSON file
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Handle successful response
            if (response && response.courses) {
                $("#courseList").empty();
                // Iterate over courses and create course cards
                $.each(response.courses, function(index, course) {
                    var courseCard = `
                    <div class="col-xl-6 col-md-6 clickableCard" data-course-id="${course.course_id}">
                        <div class="card bg-primary text-white mb-4 position-relative">
                            <div class="position-absolute top-0 end-0 p-2">${course.course_id}</div>
                            <div class="d-flex">
                                <div class="card-body">${course.course_name}</div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white stretched-link course-link" data-course-id="${course.course_id}" data-bs-toggle="modal" data-bs-target="#courseModal">View Details</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    `;
                    $('#courseList').append(courseCard);
                });

                // Click event handler for course cards
                $(".clickableCard").click(function(){
                    var courseId = $(this).data("course-id");
                    console.log("Clicked course ID:", courseId);
                    // Fetch course details using courseId and display in modal
                    getCourseById(courseId, function(course) {
                        console.log("Fetched course details:", course.course_name);
                        // Update modal content
                        $("#courseModalTitle").text(course.course_name);
                        $("#courseModalContent").html("<strong>Course ID:</strong> " + course.course_id + "<br>" +
                                                      "<strong>Course Name:</strong> " + course.course_name + "<br>" +
                                                      "<strong>Course Description:</strong> " + course.credits + "<br>"+
                                                      "<strong>Course Description:</strong> " + course.course_description);
                        // Open modal
                        $('#courseModal').modal('show');
                    });
                });
            } else {
                console.error('No courses found.');
            }
        },
        error: function(error) {
            console.error('Error fetching courses:', error);
        }
    });

    // Function to fetch course details by ID
    function getCourseById(courseId, callback) {
        // Fetch courses from JSON file
        $.ajax({
            url: 'data/courses.json', // Specify the path to your JSON file
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Check if courses data and courseId are provided
                if (response && response.courses && courseId) {
                    // Find the course by its ID
                    var course = response.courses.find(function(course) {
                        return course.course_id === courseId;
                    });

                    // Execute the callback function with the found course as parameter
                    if (course) {
                        callback(course);
                    } else {
                        console.error('Course not found.');
                    }
                } else {
                    console.error('Error: Courses data or course ID not provided.');
                }
            },
            error: function(error) {
                console.error('Error fetching courses:', error);
            }
        });
    }
});


