$(document).ready(function () {
    function getStudentsAndUpdateTable() {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/students',
            dataType: 'json',
            success: function (data) {
                $('#studentTable').DataTable().clear().destroy();
                $('#studentTable').DataTable({
                    data: data,
                    columns: [
                        { data: 'firstName' },
                        { data: 'lastName' },
                        { data: 'email' },
                        {
                            data: null,
                            render: function (data, type, row) {
                                return '<button class="btn-edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#editFormModal" data-id="' + row.id + '"><i class="fas fa-edit"></i></button> ' +
                                    '<button class="btn-grade btn btn-primary" data-id="' + row.id + '"><i class="fas fa-graduation-cap"></i></button> ' +
                                    '<button class="btn-delete btn btn-danger" data-id="' + row.id + '"><i class="fas fa-trash-alt"></i></button>';
                            }
                        }
                    ]
                });
            }
        });
    }


    getStudentsAndUpdateTable();

    $('#studentTable').on('click', '.btn-edit', function () {
        var id = $(this).data('id');
    
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/students/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (student) {
                $('#studentModaledit').on('shown.bs.modal', function () {
                    $('#studentModaledit #id').val(student.id); 
                    $('#studentModaledit #firstName').val(student.firstName);
                    $('#studentModaledit #lastName').val(student.lastName);
                    $('#studentModaledit #email').val(student.email);
                    $('#studentModaledit #password').val(student.password);
                });
    
                $('#studentModaledit').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error fetching student data:', error);
            }
        });
    });
    

    $('#studentTable').on('click', '.btn-grade', function () {
        var id = $(this).data('id');
        $('#gradeFormModal').modal('show');
        console.log('Grade clicked for ID: ' + id);
    });


    $('#studentTable').on('click', '.btn-delete', function () {
        var id = $(this).data('id');
 
        if (confirm("Are you sure you want to delete this student?")) {
            deleteStudent(id);
        }
    });


    function deleteStudent(id) {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/students/' + id,
            type: 'DELETE',
            success: function (response) {
                console.log('Student deleted successfully:', response);
              
                $('#studentTable').DataTable().destroy(); 
                getStudentsAndUpdateTable();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting student:', error);
            }
        });
    }

   


    function validateForm() {
        var form = document.getElementById('studentForm');
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }


    function addStudent(studentData) {
        $.ajax({
            url: 'http://localhost/SchoolGradingSystem/backend/api/students',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(studentData),
            success: function (response) {
                console.log('Student added successfully:', response);
                alert("Student added");
                getStudentsAndUpdateTable();
            },
            error: function (xhr, status, error) {
                alert("Student not added");
                console.error('Error adding student:', error);
            }
        });
    }

    $('#saveChangesBtnStudnet').click(function () {
        validateForm();
        if ($('#studentForm')[0].checkValidity()) {
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var studentdata = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
    
            addStudent(studentdata);
        }
    });
});
