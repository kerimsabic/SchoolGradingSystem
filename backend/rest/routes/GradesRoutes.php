<?php


Flight::route('GET /api/grades', function () {
    
    Flight::json(Flight::gradeServices()->get_all());
});


Flight::route('GET /api/grades/@id', function ($id) {
    Flight::json(Flight::gradeServices()->getById($id));
});


/*Flight::route('GET /api/cars/@firstName/@lastName', function ($firstName, $lastName) {
    Flight::json(Flight::carsServices()->getUserByFirstNameAndLastName($firstName, $lastName));
});*/


Flight::route('POST /api/grades', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::gradeServices()->add($data));
});


Flight::route('PUT /api/grades/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::gradeServices()->update($id, $data);
    Flight::json(Flight::gradeServices()->getById($id));
});


Flight::route('DELETE /api/grades/@id', function ($id) {
    Flight::gradeServices()->delete($id);
}); 




?>