//This function is responsible to check user is registerd or not
const alreadyRegistered = userName => localStorage.getItem(userName);

//This function is responsible for redirecting to home page based on user role
const redirect = (role) => {
    if (role === "admin") { window.location="./admin/index.html"; }
    else if (role === "student") { window.location="./student/index.html"; }
};

//This function is responsible for matching the password
const passwordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

//This function is responsible for adding the user to the student's list
const addToStudentsList=userName =>{
    let students=localStorage.getItem("students");
    //Check if any student is there or not
    if(!students){
        students=[userName];
    }
    else{
        students=JSON.parse(students);
        students.push(userName);
    }
    localStorage.setItem("students",JSON.stringify(students));
};


//This function is responsible for creating the session
//Fle:/// can't be used to do operations with cookies so, I used local Storage
const createSession=(userName,role)=>{
    if(role=="student"){localStorage.setItem('currentStudent', userName);}
    else{localStorage.setItem('currentAdmin', userName);}
}

// This function is responsible for checking input provided by user is valid or not
const isValidInput=({userName,password,confirmPassword,role})=>{
    // username, password, confirm password and role aa 4 fields must be there
    if(userName && password && confirmPassword && role){
        // Password must contain uppercase, lowercase, digit & special symbol with length of 8-15
        const passwordPatten=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(passwordPatten.test(password)){
            // Password & confirm password must match
            if (passwordMatch(password, confirmPassword)) {
                userName=userName.replaceAll(" ","");
                if(userName){return true;}
                return alert("Username should not only contain whitespaces");
            }
            return alert("Your password didn't match, please enter again");
        }
        return alert("Password must contain uppercase,lowercase,digit & Symbol. Lenght must be {8-15}");
    }
    return alert("Please Enter All the fields");
}

//This function is responsible for sign up
const signUp = () => {
    //Get details of user
    let form = document.forms.signUpForm;
    const userName = form.elements.userName.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;
    const role = form.elements.role.value;

    if(!isValidInput({userName,password,confirmPassword,role})){
        return ;
    }
    
    //Check if user is already registered or not
    if (alreadyRegistered(userName)) {
        alert("You have already registerd...., Please login");
        window.location="./login.html";
        return;
    }

    //make object of user details and store it in local storage with username as key
    const userDetails = { password, role, courses: [] };
    localStorage.setItem(userName, JSON.stringify(userDetails));

    //Add to students list
    if(role==="student"){addToStudentsList(userName);}

    createSession(userName,role);

    //Redirect to home page
    redirect(role);
}    