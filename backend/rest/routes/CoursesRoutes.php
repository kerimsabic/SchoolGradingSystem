<?php


Flight::route('GET /api/courses', function () {
    
    Flight::json(Flight::courseServices()->get_all());
});


Flight::route('GET /api/courses/@id', function ($id) {
    Flight::json(Flight::courseServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/courses', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::courseServices()->add($data));
});


Flight::route('PUT /api/courses/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::courseServices()->update($id, $data);
    Flight::json(Flight::courseServices()->getById($id));
});


Flight::route('DELETE /api/courses/@id', function ($id) {
    Flight::courseServices()->delete($id);
});




?>