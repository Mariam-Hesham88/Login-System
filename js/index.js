var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var signBtn = document.getElementById('signbtn');
var logBtn = document.getElementById('logbtn');
var emailInputLog = document.getElementById('emailInputlog');
var passwordInputLog = document.getElementById('PasswordInputlog');
var logOutBtn = document.getElementById('logOutBtn');
var usersList = [];
var userIndex;

//for display the name
let usernameValue = sessionStorage.getItem('Names');
if (usernameValue) {
    document.getElementById('username').innerHTML = 'welcome ' + usernameValue;
}

//for loading => when we open the project we but the data from localstorage in our list
if (localStorage.getItem("usersContainer") !== null) {
    usersList = JSON.parse(localStorage.getItem("usersContainer"));
}



/*register function => 
    1- create object: user
    2- push the object at array: usersList,then set value at localstorage
    3- display a succes msg
    4- if we create another register we check if the email is already exsist or not
*/
function register() {
    //1- create object: user
    var user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    //2- push the object at array: usersList,then set value at localstorage
    //=> if the inputs not null
    //3- display a succes msg
    if (user.name == "" || user.email == "" || user.password == "") {
        document.getElementById('msgEmptyInput').classList.remove('d-none');
        document.getElementById('msgS').classList.add('d-none');
        document.getElementById('msgF').classList.add('d-none');
    }
    else {
        usersList.push(user);
        localStorage.setItem("usersContainer", JSON.stringify(usersList));
        document.getElementById('msgS').classList.remove('d-none');
        document.getElementById('msgF').classList.add('d-none');
        document.getElementById('msgEmptyInput').classList.add('d-none');


        //4- if we create another register we check if the email is already exsist or not
        for (var i = 0; i < usersList.length - 1; i++) {
            if (usersList[usersList.length - 1].email == usersList[i].email) {
                usersList.pop();
                localStorage.setItem("usersContainer", JSON.stringify(usersList));
                document.getElementById('msgF').classList.remove('d-none');
                document.getElementById('msgS').classList.add('d-none');
            }
        }
    }
}


function login() {
    //1- take the value from inputs
    var emailterm = emailInputLog.value;
    var passwordterm = passwordInputLog.value;

    //to check if we find the email and password
    var found = false;
    if(emailterm =="" || passwordterm ==""){
        document.getElementById('msgEmptyInput').classList.remove('d-none');
    }
    //2- for => to pass at every element at the array : usersList
    //if we find the email and password => break , then make fo+und = true
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email.includes(emailterm) && usersList[i].password.includes(passwordterm)) {
            found = true;
            userIndex = i;
            break;
        }
    }

    //if found = true => go to welcomepage
    if (found) {
        logBtn.addEventListener('click', function () {
            window.location = './welcompage.html';
        });
        window.addEventListener("DOMContentLoaded", (event) => {
            const el = document.getElementById('toWelcome');
            if (el) {
                el.addEventListener('click', function () {
                    window.location = './welcompage.html';
                }, false);
            }
        });
        //Store name of user at sessionStorage to display it
        sessionStorage.setItem("Names", usersList[i].name)
        // console.log(usersList[userIndex].name);
       // document.getElementById('nameOfUser').innerHTML = usersList[userIndex].name;
    }
    else {
        //display faild msg
        document.getElementById('msgFaild').classList.remove('d-none');
    }
}


//When we click at the logout button => we go to log in page
function logout() {
    document.getElementById('logOutBtn').addEventListener('click', function () {
        window.location = './index.html';
    });

    window.addEventListener("DOMContentLoaded", (event) => {
        const el = document.getElementById('logOutBtn');
        if (el) {
            el.addEventListener('click', function () {
                window.location = './index.html';
            }, false);
        }
    });
}

//*********************************************//
//add events//

//register function
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('signbtn');
    if (el) {
        el.addEventListener('click', register, false);
    }
});

// document.getElementById('goLogin').addEventListener('click', function () {
//     window.location = './index.html';
// });

//Go to login
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('goLogin');
    if (el) {
        el.addEventListener('click', function () {
            window.location = './index.html';
        }, false);
    }
});

//Go to signup
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('goSign');
    if (el) {
        el.addEventListener('click', function () {
            window.location = './signup.html';
        }, false);
    }
});

// logBtn.addEventListener('click', login);
//login function
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('toWelcome');
    if (el) {
        el.addEventListener('click', login, false);
    }
});

//logot function
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('logOutBtn');
    if (el) {
        el.addEventListener('click', logout, false);
    }
});

