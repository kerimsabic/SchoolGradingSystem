var users = [];
var idCounter = 1;

$("#tutorial-form").validate({
  rules: {
    inputFirstName: {
      required: true,
      minlength: 5,
    },
    inputLastName: {
      required: true,
      minlength: 5,
    },
    inputEmail: {
      required: true,
     
    },
    inputPassword: {
      required: true,
      minlength: 5,
    },
    inputPasswordConfirm: {
      //   equalTo: "#password",
    },
  },
  messages: {
    inputFirstName: {
      required: "You have to fill it in!",
      minlength: "Too short buddy.!",
    },
    confirm_password: {
      //   equalTo: "The password and confirm password fields should be the same",
    },
  },
 submitHandler: function (form, event) {
  event.preventDefault();
  blockUi("#tutorial-form"); 
  let data = serializeForm(form);
  users.push(data);
  $("#tutorial-form")[0].reset();
  console.log(users); 
  unblockUi("#tutorial-form"); 
  window.location.href = "#login";
  },
});

function objectFormHandler(form, event) {


  event.preventDefault();
  blockUi("#tutorial-form");
  let data = serializeForm(form);

  data["id"] = idCounter;
  data[
    "action"
  ] = `<button onClick="editUserDetails(${idCounter})">Edit</button>`;
  idCounter += 1;
  users.push(data);

  if ($.fn.dataTable.isDataTable("#tutorials-table")) {
    $("#tutorials-table").DataTable().destroy();
  }
  initializeDatatable("#tutorials-table", users);

  $("#tutorial-form")[0].reset();

  unblockUi("#tutorial-form");
}

function apiFormHandler(form, event) {
  event.preventDefault();
  blockUi("#tutorial-form");
  let data = serializeForm(form);

  $.post(
    "http://localhost:8018/mobile-api/v1/api/sample",
    JSON.stringify(data)
  ).done(function (data) {
    $("#tutorial-form")[0].reset();
    $("#toast-description").text(data.message);
    $("#success-toast").toast("show");
  }).fail(function (xhr) {
    $("#toast-description").text(xhr.responseJSON.message);
    $("#success-toast").toast("show");
  }).always(function() {
    unblockUi("#tutorial-form");
  });
}

blockUi = (element) => {
  $(element).block({
    message: '<div class="spinner-border text-primary" role="status"></div>',
    css: {
      backgroundColor: "transparent",
      border: "0",
    },
    overlayCSS: {
      backgroundColor: "#000",
      opacity: 0.25,
    },
  });
};

unblockUi = (element) => {
  $(element).unblock({});
};

serializeForm = (form) => {
  let jsonResult = {};
  $.each($(form).serializeArray(), function () {
    jsonResult[this.name] = this.value;
  });
  return jsonResult;
};

editUserDetails = (userId) => {
  var selectedUser = {};
  $.each(users, (idx, user) => {
    if (user.id === userId) {
      selectedUser = user;
      return false; // break;
    }
  });

  if (selectedUser !== undefined) {
    $("#id").val(selectedUser.id);
    $("#first_name").val(selectedUser.first_name);
    $("#email").val(selectedUser.email);
    $("#password").val(selectedUser.password);
  }
};

initializeDatatable = (tableId, data) => {
  new DataTable(tableId, {
    columns: [
      { data: "id" },
      { data: "action" },
      { data: "first_name" },
      { data: "email" },
      { data: "password" },
    ],
    data: data,
  });
};