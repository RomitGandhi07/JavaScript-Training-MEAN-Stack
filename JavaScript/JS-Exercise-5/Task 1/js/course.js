let cid = 0;

//This function is responsible for adding the user to the student's list
const addToCoursesList = (courseTitle, courseImageURL) => {
    let courses = localStorage.getItem("courses");
    //Check if any student is there or not
    if (!courses) {
        courses = [cid];
    }
    else {
        courses = JSON.parse(courses);
        courses.push(cid);
    }
    localStorage.setItem("courses", JSON.stringify(courses));
};

//This function is responsible for changing change navbar in admin and put current user name there
const changeAdminNav=()=>{
    let userName=localStorage.getItem("currentAdmin");
    if(!userName){window.location="../signup.html";}
    document.getElementById("userName").innerHTML="Welcome.. "+userName+"(admin)";
};

//This function is responsible for changing change navbar in user and put current user name there
const changeStudentNav=()=>{
    let userName=localStorage.getItem("currentStudent");
    if(!userName){window.location="../signup.html";}
    document.getElementById("userName").innerHTML="Welcome.. "+userName+"(student)";
};

//This function is responsible for logout for admin
const logoutAdmin=()=>{
    localStorage.removeItem("currentAdmin");
    window.location="../signup.html";
};

//This function is responsible for logout for student
const logoutStudent=()=>{
    localStorage.removeItem("currentStudent");
    window.location="../signup.html";
};

const isValidCourseDetails=(courseTitle,courseImageURL)=>{
    if (courseTitle && courseImageURL) {
        courseTitle = courseTitle.replaceAll(" ", "");
        courseImageURL = courseImageURL.replaceAll(" ", "");
        if (courseTitle && courseImageURL) { return true; }
    }
    return false;
};

//This function is responsible for adding the course
const addCourse = () => {
    //Get details of course
    let form = document.forms.addCourseForm;
    const courseTitle = form.elements.courseTitle.value;
    const courseImageURL = form.elements.courseImageURL.value;

    if(!isValidCourseDetails(courseTitle,courseImageURL)){
        alert("Please Enter both the fields and make sure field has not only whitespaces")
        return;
    }

    //maintain counter of course
    let coursesCounter = localStorage.getItem("coursesCounter");
    if (coursesCounter) { cid = +coursesCounter + 1; }
    else { cid = 1; }
    localStorage.setItem("coursesCounter", cid);

    //Add course into local storage
    const course = {
        title: courseTitle,
        image: courseImageURL,
        students: []
    };
    localStorage.setItem(cid, JSON.stringify(course));

    //Add course into course list
    addToCoursesList(courseTitle, courseImageURL);

    //redirect
    window.location="./index.html";
};

//This function is responsible for deleting the course
const deleteCourse = (id) => {
    const { students } = JSON.parse(localStorage.getItem(id));

    //remove course from students which are enrolled to this course
    students.forEach(student => {
        let studentDetails = JSON.parse(localStorage.getItem(student));
        studentDetails.courses.splice(studentDetails.courses.indexOf(+id), 1);
        localStorage.setItem(student, JSON.stringify(studentDetails));
    });

    //remove from courses list
    const coursesList = JSON.parse(localStorage.getItem("courses"));
    coursesList.splice(coursesList.indexOf(+id), 1);
    localStorage.setItem("courses", JSON.stringify(coursesList));

    //Delete Course
    localStorage.removeItem(id);

    //Reload the page
    window.location.reload(true);
};

//This function is responsible for add all courses to DOM which is used for admin side
const addToDOMAllCourses = (courseId, title, image) => {
    let string = `<div class="col-4 border text-center course-box">
                    <img src="${image}" class="img img-responsive course-image" alt="Course">
                    <h4>${title}</h4>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary" id="assignCourseButton" onclick="changeToAssignCoursesPage()">Assign Course</button>
                        <button type="button" id=${courseId} class="btn btn-primary" onclick="deleteCourse(this.id)">Delete Course</button>
                    </div>
                </div>`;
    coursesList.insertAdjacentHTML('beforeend', string);
}

//This function is responsible for displaying all courses to admin side
const displayAllCourses = () => {
    changeAdminNav();
    //Fetch course id from courses and loop them to get details
    const courses = JSON.parse(localStorage.getItem("courses"));
    if(!courses){
        let string=`<h5 class="text-center">No Courses...</h5>`;
        coursesList.insertAdjacentHTML('beforeend', string);
        return;
    }
    courses.forEach(courseId => {
        const { title, image } = JSON.parse(localStorage.getItem(courseId));
        //Add course to DOM
        addToDOMAllCourses(courseId, title, image);
    });
};

//This function is responsible to change to assignCourse.html page when assign course is clicked
const changeToAssignCoursesPage = () => {
    window.location = "./assignCourse.html"
};

//This function is responsible for managing all student's courses
const manageStudentCourses = (student) => {

    document.getElementById("courses").innerHTML = " ";

    //Add who's course list is displayed
    let nameString = `<h5 class="text-center mb-1">${student}'s Courses</h5>`;
    courses.insertAdjacentHTML('afterbegin', nameString);

    //get all courses
    let coursesList = JSON.parse(localStorage.getItem("courses"));

    if(!coursesList){
        let string=`<h5 class="text-center">No Courses...</h5>`;
        courses.insertAdjacentHTML('beforeend', string);
        return;
    }
    
    //loop through all courses
    coursesList.forEach(course => {
        let { title } = JSON.parse(localStorage.getItem(course));
        let coursesAssigned = JSON.parse(localStorage.getItem(student)).courses;
        let string = `<div class="col-12 d-flex justify-content-around mb-2">
            <div class="courseTitle"><h5>${title}</h5></div>`;

        //Check user is assigned on that course or not
        if (coursesAssigned.includes(course)) {
            string += `<div><button id="${student}:${course}" class="btn btn-danger" onclick="deleteCourseAssigned(this.id)">Remove</button></div>
                </div>`;
        }
        else {
            string += `<div><button id="${student}:${course}" class="btn btn-success" onclick="assignCourse(this.id)">Add</button></div>
                </div>`;
        }
        courses.insertAdjacentHTML('beforeend', string);
    });
};

//This function is responsible for assigning the course to the user
const assignCourse = (id) => {
    const [student, course] = id.split(":");

    //Assign course to student
    let studentDetails = JSON.parse(localStorage.getItem(student));
    studentDetails.courses.push(+course);
    localStorage.setItem(student, JSON.stringify(studentDetails));

    //Add student detail to course
    let courseDetails = JSON.parse(localStorage.getItem(course));
    courseDetails.students.push(student);
    localStorage.setItem(course, JSON.stringify(courseDetails));

    //Change button to remove
    document.getElementById(id).innerHTML = "Remove";
    document.getElementById(id).className = "btn btn-danger";
    document.getElementById(id).onclick = function () { deleteCourseAssigned(id) };
}

//This function is responsible for assigning the course from the user
const deleteCourseAssigned = (id) => {
    const [student, course] = id.split(":");

    //Delete assigned course to student
    let studentDetails = JSON.parse(localStorage.getItem(student));
    studentDetails.courses.splice(studentDetails.courses.indexOf(+course), 1);
    localStorage.setItem(student, JSON.stringify(studentDetails));

    //Delete student assigned to the course
    let courseDetails = JSON.parse(localStorage.getItem(course));
    courseDetails.students.splice(courseDetails.students.indexOf(student), 1);
    localStorage.setItem(course, JSON.stringify(courseDetails));

    //Change button to add
    document.getElementById(id).innerHTML = "Add";
    document.getElementById(id).className = "btn btn-success";
    document.getElementById(id).onclick = function () { assignCourse(id) };
}

//This function is responsible for displaying the student names
const displayStudents = () => {
    changeAdminNav();
    let students = JSON.parse(localStorage.getItem("students"));
    students.forEach(student => {
        let string = `<li>
                <div><a href="#" id="${student}" class="m-2" onclick="manageStudentCourses(this.id)">${student}</a></div>     
        </li>`;
        studentsList.insertAdjacentHTML('beforeend', string);
    });
};

//This function is for adding course to DOM which were assigned to student
const addToDOMForAssignedCourses = (title, image) => {
    let string = `<div class="col-4 border text-center course-box">
                    <img src="${image}" class="img img-responsive course-image" alt="Course">
                    <h4>${title}</h4>
                </div>`;
    coursesList.insertAdjacentHTML('beforeend', string);
}

//This function is responsible to display assigned courses to student side
const displayAssignedCourses = () => {
    changeStudentNav();
    //check user is logged in or not
    const student=localStorage.getItem("currentStudent");
    if(!student){window.location="../signup.html";}

    const { courses } = JSON.parse(localStorage.getItem(student));

    //If not any course assigned
    if(courses.length===0){
        let string=`<h5 class="text-center">No Courses Assigned...</h5>`;
        coursesList.insertAdjacentHTML('beforeend', string);
        return;
    }

    //If courses asigned then loop over them and display it
    courses.forEach(course => {
        const { title, image } = JSON.parse(localStorage.getItem(course));
        addToDOMForAssignedCourses(title, image);
    });
};