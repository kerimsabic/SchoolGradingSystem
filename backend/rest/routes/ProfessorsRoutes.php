<?php


Flight::route('GET /api/professors', function () {
    
    Flight::json(Flight::professorServices()->get_all());
});


Flight::route('GET /api/professors/@id', function ($id) {
    Flight::json(Flight::professorServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/professors', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::professorServices()->add($data));
});


Flight::route('PUT /api/professors/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::professorServices()->update($id, $data);
    Flight::json(Flight::professorServices()->getById($id));
});


Flight::route('DELETE /api/professors/@id', function ($id) {
    Flight::professorServices()->delete($id);
});




?>