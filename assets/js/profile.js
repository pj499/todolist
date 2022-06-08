const bcrypt = require("bcrypt");

var oldPassword = document.getElementById("toggleOldPassword");
var oldPasswordInput = document.getElementsByClassName("password-input")[0];

var newPassword = document.getElementById("toggleNewPassword");
var newPasswordInput = document.getElementsByClassName("password-input")[1];

var newConfirmPassword = document.getElementById("toggleConfirmPassword");
var newConfirmPasswordInput =
  document.getElementsByClassName("password-input")[2];

// var toggleOldPassword = false;
oldPassword.addEventListener("mousedown", function (e) {
  // toggle the type attribute
  const type =
    oldPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  oldPasswordInput.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("bi-eye");
});

newPassword.addEventListener("mousedown", function (e) {
  // toggle the type attribute
  const type =
    newPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  newPasswordInput.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("bi-eye");
});

newConfirmPassword.addEventListener("mousedown", function (e) {
  // toggle the type attribute
  const type =
    newConfirmPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  newConfirmPasswordInput.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("bi-eye");
});

var updatePasswordAJAX = function () {
  let updatePasswordForm = $("#update-password-form");

  updatePasswordForm.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/user/update-password",
      data: updatePasswordForm.serialize(),
      success: async function (data) {
        console.log("Update password data", data);
        var ajaxData = data.data;
        const checkPassword = await bcrypt.compare(
          ajaxData.user.password,
          ajaxData.oldPassword
        );
        if (checkPassword) {
          if (ajaxData.newPassword == ajaxData.newConfirmPassword) {
            new Noty({
              theme: "metroui",
              text: "Passowrd Updated Successfully!",
              type: "success",
              layout: "topRight",
              timeout: 2000,
            }).show();
            return;
          } else {
            new Noty({
              theme: "metroui",
              text: "Please confirm correct new password!",
              type: "error",
              layout: "topRight",
              timeout: 5000,
            }).show();
            return;
          }
        } else {
          new Noty({
            theme: "metroui",
            text: "Please enter correct old password!",
            type: "error",
            layout: "topRight",
            timeout: 5000,
          }).show();
          return;
        }
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
};

updatePasswordAJAX();
