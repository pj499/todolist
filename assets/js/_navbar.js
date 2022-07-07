var boxShow = false;
var profilePicture = document.getElementById("profile-picture");
var profileBox = document.getElementById("profile-box");
var body = document.getElementsByTagName("body")[0];

profilePicture.addEventListener("click", function () {
  console.log("Inside click", boxShow);

  if (boxShow == false) {
    profileBox.style.display = "flex";
    boxShow = true;
  } else {
    profileBox.style.display = "none";
    boxShow = false;
  }
});

console.log(window.location.href);

if(window.location.href.includes('/user/profile')){
  var home= document.getElementById('home-or-profile');
  home.innerText= 'Home';
  home.setAttribute('href', '/user/task');
}