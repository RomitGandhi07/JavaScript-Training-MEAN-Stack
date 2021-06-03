//This function is responsible to check user is registerd or not
const alreadyRegistered = userName => localStorage.getItem(userName);

//This function is responsible for redirecting to home page based on user role
const redirect = (role) => {
    if (role === "admin") { window.location="./admin/index.html"; }
    else if (role === "student") { window.location="./student/index.html"; }
};

//Check if user's password matches and user is authorized or not
const validUser=(userName,givenPassword,givenRole)=>{
    const userDetails=localStorage.getItem(userName);
    const {password,role}=JSON.parse(userDetails);
    
    //match the password
    if(password!=givenPassword){alert("Please Enter Correct password..."); return false;}

    //Check authorization
    if(role!=givenRole){alert("You are not authorized..."); return false;}

    return true;
};

//This function is responsible for creating the session
//Fle:/// can't be used to do operations with cookies so, I used local Storage
const createSession=(userName,role)=>{
    if(role=="student"){localStorage.setItem('currentStudent', userName);}
    else{localStorage.setItem('currentAdmin', userName);}
}

//This function is responsible for login
const login = () => {
    //Get details of user
    let form = document.forms.loginForm;
    const userName = form.elements.userName.value;
    const password = form.elements.password.value;
    const role = form.elements.role.value;

    if(!userName || !password || !role){
        alert("Please Enter all the fields");
        return;
    }

    //Check if user is already registered or not    
    if (!alreadyRegistered(userName)) {
        alert("You are not registerd...., Please sign up");
        window.location="./signup.html";
        return;
    }

    //Check user tried to logged in is valid and authorized
    if(!validUser(userName,password,role)){
        return;
    }

    createSession(userName,role); 

    //Redirect to home page
    redirect(role);
}    