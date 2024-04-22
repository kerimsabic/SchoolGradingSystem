<?php

require 'vendor/autoload.php';


// import and register all business logic files (services) to FlightPHP
require_once __DIR__ . '/rest/services/StudentServices.class.php';
require_once __DIR__ . '/rest/services/ProfessorServices.class.php';
require_once __DIR__ . '/rest/services/CourseServices.class.php';
require_once __DIR__ . '/rest/services/AssignmentServices.class.php';
require_once __DIR__ . '/rest/services/GradeServices.class.php';
require_once __DIR__ . '/rest/services/EnrollmentServices.class.php';





Flight::register('studentServices', "StudentServices");
Flight::register('professorServices', "ProfessorServices");
Flight::register('courseServices', "CourseServices");
Flight::register('assignmentServices', "AssignmentServices");
Flight::register('gradeServices', "GradeServices");
Flight::register('enrollmentServices', "EnrollmentServices");


// import all routes
require_once __DIR__ . '/rest/routes/StudentRoutes.php';
require_once __DIR__ . '/rest/routes/ProfessorsRoutes.php';
require_once __DIR__ . '/rest/routes/CoursesRoutes.php';
require_once __DIR__ . '/rest/routes/AssignmentsRoutes.php';
require_once __DIR__ . '/rest/routes/GradesRoutes.php';
require_once __DIR__ . '/rest/routes/EnrollmentsRoutes.php';







Flight::route('GET /api/', function () {
    echo "Hello";
});


Flight::start();




?>