const socket = io();

const data = [
    { firstName: "Romit", lastName: "Gandhi" },
    { firstName: "Kishan", lastName: "Sheth" },
    { firstName: "Savan", lastName: "Aghera" },
    { firstName: "Parth", lastName: "Satasia" },
    { firstName: "Ravindra", lastName: "Singh" },
    { firstName: "Rashmin", lastName: "Chhatrala" },
    { firstName: "Savan", lastName: "Karathia" },
    { firstName: "Neel", lastName: "Dani" },
    { firstName: "Smit", lastName: "Panchal" }
];

let curId="";

// This function is responsible for getting the firstname and lastname
const getName = () => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    return { firstName, lastName };
};

// This function is responsible for making the input fields blank
const makeInputFieldsBlank = () => {
    $("#firstName").val("");
    $("#lastName").val("");
};

//This function is responsible for changing the button to add or update by changing their name and updating their onclick event
const changeButton = (type) => {
    //if type is add
    if (type === "add") {
        $("#addButton").text("Add");
        addButton.onclick = addName;
    }
    //if type if remove
    else if (type === "update") {
        $("#addButton").text("Update");
        addButton.onclick = updateName;
    }
}

//This function is responsible for adding the cells in the row
const addRowIntable = ({ _id, firstName, lastName }) => {
    //Row
    const row = `<tr>
                <td>
                    <div class="form-group col-8">
                        <input type="text" class="form-control col-6" id="${_id}firstName"  value="${firstName}" disabled>
                    </div>                     
               </td>
               <td>
                    <div class="form-group col-8">
                        <input type="text" class="form-control" id="${_id}lastName"  value="${lastName}" disabled>
                     </div>
               </td>
               <td>
                    <div class="form-group">
                        <button type="button" class="btn btn-md btn-success" id="${_id}edit" onclick="editName(this.id)">Edit</button>
                    </div>
               </td>
               <td>
                    <div class="form-group">
                        <button type="button" class="btn btn-md btn-danger" id="${_id}delete" onclick="deleteName(this.id)">Delete</button>
                    </div>
               </td>
               </tr>`;

    $("#dataTable").append(row);
};

// This function is responsible for fetching all the names from database and add it to DOM
function getAllNames(data) {
    try {
        // // Get all names
        // const response = await fetch("/api/names", {
        //     method: 'GET',
        // });

        // // If response is not ok then throw error
        // if (!response.ok) { throw new Error(); }

        // // get data from response and display them
        // const data = await response.json();
        $("#dataTable tr:gt(0)").remove();
        data.forEach(element => {
            addRowIntable(element);
        });
    }
    catch (err) {
        console.log(err);
        alert("Something Went wrong");
    }
}

// This function is responsible for adding the name
async function addName() {
    try {
        // Get name
        const data = getName();

        // call POST api to save name in the database
        const response = await fetch("/api/names", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        // // Add row in the table
        // let name=await response.json();
        // addRowIntable(name);

        // Make input fields blank
        makeInputFieldsBlank();

        socket.emit('action');

        // Redirect
        // window.location = "index.html";
    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for deleting the name
async function deleteName(id) {
    try {
        // Get user confirmation
        const userConfirmation = confirm("Are you sure want to Delete?");
        if (!userConfirmation) { return; }

        // Get id of database from element id
        id = id.slice(0, id.indexOf("delete"));

        // Call delete API
        const response = await fetch(`/api/names/${id}`, {
            method: 'DELETE',
        });

        // If response is not successful then throw error
        if (!response.ok) { throw new Error(); }

        // Remove Element
        $(`#${id}`).parent().parent().parent().remove();

        // Make input fields blank
        makeInputFieldsBlank();

        // change the update button to add
        changeButton("add");

        // Redirect
        // window.location = "./index.html";

        socket.emit('action');

    }
    catch (err) {
        alert("Something Went wrong");
    }
}

// This function is responsible for saving the id whose edit request has been creates and add their names to main input text
const editName = (id) => {
    //get id number which we have to edit
    id = id.slice(0, id.indexOf("edit"));
    curId = id;

    //make id's for firstname and last name
    const firstNameString = `#${id}firstName`,
        lastNameString = `#${id}lastName`;

    const firstName = $(firstNameString).val(),
        lastName = $(lastNameString).val();

    //put content of firstname and lastname 
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);

    //change button name to update and update the onclick event
    changeButton("update");
};

// This function is responsible for updating the name
async function updateName() {
    const data = getName();
    try {
        const response = await fetch(`/api/names/${curId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) { throw new Error(await response.text()); }

        // Make input fields blank
        makeInputFieldsBlank();

        // change buton to add
        changeButton("add");

        // redirect to index.html
        // window.location = "index.html";

        socket.emit('action');

    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for rendering the data
async function renderData() {
    // looping over all names and make post request for all names
    for (let name of data) {
        try {
            // make post request to save name in the database
            const response = await fetch("/api/names", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(name),
            });

            // If response is notok then throw error
            if (!response.ok) { throw new Error(await response.text());}

            // Add row in the table
            // addRowIntable(await response.json());
        }
        catch (err) {
            console.log(err);
        }
    }
    socket.emit('action');
    alert("Render Successful");
}

socket.emit('join');

socket.on('names',(names)=>{
    getAllNames(names);
})