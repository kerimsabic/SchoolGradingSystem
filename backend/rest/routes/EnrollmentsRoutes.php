<?php


Flight::route('GET /api/enrollments', function () {
    
    Flight::json(Flight::enrollmentServices()->get_all());
});


Flight::route('GET /api/enrollments/@id', function ($id) {
    Flight::json(Flight::enrollmentServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/enrollments', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::enrollmentServices()->add($data));
});


Flight::route('PUT /api/enrollments/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::enrollmentServices()->update($id, $data);
    Flight::json(Flight::enrollmentServices()->getById($id));
});


Flight::route('DELETE /api/enrollments/@id', function ($id) {
    Flight::enrollmentServices()->delete($id);
});




?>