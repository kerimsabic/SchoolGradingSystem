$(document).ready(
    function getCourses() {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/courses', // Modify this line to include your API endpoint
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.length > 0) {
                    $("#courseList").empty();
    
                    $.each(response, function (index, course) {
                        var courseCard = `
                        <div class="col-xl-6 col-md-6 clickableCard" data-course-id="${course.id}">
                            <div class="card bg-primary text-white mb-4 position-relative">
                                <div class="position-absolute top-0 end-0 p-2">${course.id}</div>
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
    
                        // Assuming you have a function to fetch course details by ID
                        getCourseById(courseId, function (course) {
                            console.log("Fetched course details:", course.name);
    
                            // Assuming you have a function to fetch all students for the course
                            getAllStudentsForCourse(courseId, function (students) {
                                // Convert student data to array of arrays
                                var studentData = students.map(function (student) {
                                    return [student.id, student.name, student.age, student.email];
                                });
    
                                // Initialize DataTable with student data
                                $('#courseModalTitle').text(course.name);
                                $('#courseModalContent').html("<strong>Course ID:</strong> " + course.id + "<br>" +
                                    "<strong>Course Description:</strong> " + course.description + "<br>" +
                                    '<table id="studentTable" class="display"></table>');
                                $('#studentTable').DataTable({
                                    data: studentData,
                                    columns: [
                                        { title: 'ID', width: '10%' },
                                        { title: 'Name', width: '20%' },
                                        { title: 'Age', width: '10%' },
                                        { title: 'Email', width: '40%' },
                                        {
                                            title: "Action", width: '20%',
                                            data: null,
                                            render: function (data, type, row) {
                                                return '<button class="btn-edit" data-id="' + row.id + '">Edit</button> <button class="btn-grade" data-id="' + row.id + '">Grade</button>';
                                            }
                                        }
                                    ],
                                    scrollX: true,
                                    scrollCollapse: true
                                });
    
                                $('#courseModal').modal('show');
                            });
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


    function getCourseById(courseId, callback) {
        $.ajax({
            url: 'data/courses.json',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response && response.courses && courseId) {
                    var course = response.courses.find(function (course) {
                        return course.course_id === courseId;
                    });

                    if (course) {
                        callback(course);
                    } else {
                        console.error('Course not found.');
                    }
                } else {
                    console.error('Error: Courses data or course ID not provided.');
                }
            },
            error: function (error) {
                console.error('Error fetching courses:', error);
            }
        });
    }


    function getAllStudents(callback) {
        $.ajax({
            url: 'data/students.json',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response) {
                    callback(response);
                } else {
                    console.error('No students found.');
                }
            },
            error: function (error) {
                console.error('Error fetching students:', error);
            }
        });
    }
});
