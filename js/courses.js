$(document).ready(function () {
    // Function to fetch courses
    function getCourses() {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/courses',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.length > 0) {
                    $("#courseList").empty();

                    $.each(response, function (index, course) {
                        var courseCard = `
                            <div class="col-xl-6 col-md-6 clickableCard" data-course-id="${course.id}">
                                <div class="card bg-primary text-white mb-4 position-relative">
                                    <div class="position-absolute top-0 end-0 p-2">${course.courseCode}</div>
                                    <div class="d-flex">
                                        <div class="card-body">${course.title}</div>
                                    </div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link course-link" data-course-id="${course.id}" data-bs-toggle="modal" data-bs-target="#courseModal">View Details</a>
                                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        `;
                        $('#courseList').append(courseCard);
                    });

                    $(".clickableCard").click(function () {
                        var courseId = $(this).data("course-id");
                        console.log("Clicked course ID:", courseId);
                    
                       
                        getCourseById(courseId, function (courses) {                     
                            var course = courses[0];
                            console.log("Fetched course details:", course.description);
  
                            $('#id').text(course.id);
                            $('#description2').text(course.description);

                            $('#courseModal').modal('show');
                        });
                    });
                } else {
                    console.error('No courses found.');
                }
            },
            error: function (error) {
                console.error('Error fetching courses:', error);
            }
        });
    }


    function getCourseById(courseId, callback) {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/courses/' + courseId,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response) {
                    callback(response);
                } else {
                    console.error('Course not found.');
                }
            },
            error: function (error) {
                console.error('Error fetching course by ID:', error);
            }
        });
    }

    // Function to fetch all students for a course
   /* function getAllStudentsForCourse(courseId, callback) {
        // Assuming you have a separate endpoint to fetch students for a course
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/courses/' + courseId + '/students',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response) {
                    callback(response);
                } else {
                    console.error('No students found for the course.');
                }
            },
            error: function (error) {
                console.error('Error fetching students for the course:', error);
            }
        });
    }*/

    // Function to add a new course
    function addCourse(courseData) {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/courses',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(courseData),
            success: function (response) {
                console.log('Course added successfully:', response);
                alert("Course added")
                getCourses();
            },
            error: function (xhr, status, error) {
                console.error('Error adding course:', error);
                alert("Error adding course")
            }
        });
    }

    function addProfessor(professorData) {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/professors',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(professorData),
            success: function (response) {
                console.log('Professor added successfully:', response);
                alert("Professor added")
                getCourses();
            },
            error: function (xhr, status, error) {
                alert("Professor not added")
                console.error('Error adding course:', error);
            }
        });
    }

    $('#saveChangesBtnProfessor').click(function () {
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val();
        var password = $('#password').val();

      
        var professorData = {
            firstName: firstName, 
            lastName: lastName,
            email: email,
            password: password
        };
        addProfessor(professorData);
    });


    $('#saveChangesBtn').click(function () {
        var courseName = $('#courseName').val();
        var courseDescription = $('#description').val();
        var courseECTS = $('#courseECTS').val();
        var professorId = $('#professor_id').val();


        var courseData = {
            courseCode: courseName, 
            title: courseName,
            description: courseDescription,
            ects: courseECTS,
            professor_id: professorId
        };

        addCourse(courseData);
    });

    getCourses();
});
