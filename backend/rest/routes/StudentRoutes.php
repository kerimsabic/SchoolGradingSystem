<?php


Flight::route('GET /api/students', function () {
    
    Flight::json(Flight::studentServices()->get_all());
});


Flight::route('GET /api/students/@id', function ($id) {
    Flight::json(Flight::studentServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/students', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::studentServices()->add($data));
});


Flight::route('PUT /api/students/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::studentServices()->update($id, $data);
    Flight::json(Flight::studentServices()->getById($id));
});


Flight::route('DELETE /api/students/@id', function ($id) {
    Flight::studentServices()->delete($id);
});




?>