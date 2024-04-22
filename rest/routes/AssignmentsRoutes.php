<?php


Flight::route('GET /api/assignments', function () {
    
    Flight::json(Flight::assignmentServices()->get_all());
});


Flight::route('GET /api/assignments/@id', function ($id) {
    Flight::json(Flight::assignmentServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/assignments', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::assignmentServices()->add($data));
});


Flight::route('PUT /api/assignments/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::assignmentServices()->update($id, $data);
    Flight::json(Flight::assignmentServices()->getById($id));
});


Flight::route('DELETE /api/assignments/@id', function ($id) {
    Flight::assignmentServices()->delete($id);
});




?>