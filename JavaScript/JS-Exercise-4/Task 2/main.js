let rows = 0;
let rowNumber = 0;

//This function is responsible for adding the cells in the row
const addCells = (row, firstName, lastName) => {
    //Add firstname
    const cell0 = row.insertCell(0);
    cell0.innerHTML = `<div class="form-group col-8">
                        <input type="text" class="form-control col-6" id="${"firstName" + rows}" value="${firstName}" disabled>
                     </div>`;

    //Add lastname
    const cell1 = row.insertCell(1);
    cell1.innerHTML = `<div class="form-group col-8">
                        <input type="text" class="form-control" id="${"lastName" + rows}" value="${lastName}" disabled>
                     </div>`;

    //Add edit button
    const cell2 = row.insertCell(2);
    cell2.innerHTML = `<div class="form-group">
                        <button type="button" class="btn btn-md btn-success" id="${rows + "edit"}" onclick="editRow(this.id)" >Edit</button>
                    </div>`;

    //Add delete button
    const cell3 = row.insertCell(3);
    cell3.innerHTML = `<div class="form-group">
                        <button type="button" class="btn btn-md btn-danger" id="${rows + "delete"}" onclick="deleteRow(this)">Delete</button>
                    </div>`;

};

// This function is responsible for checking input is valid or not
// Here it is cheking firstName and lastName is entered or not and if yes it contains other letter then whitespace or not
const isValidInput=(firstName,lastName)=>{
    if(firstName && lastName){
        firstName=firstName.replaceAll(" ","");
        lastName=lastName.replaceAll(" ","");
        if(firstName && lastName){return true;}
    }
    return false;
}

//This function is responsible for make the input fields blank
const makeInputFieldsBlank=()=>{
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
}

// This function is responsible for adding the row
const addRow = () => {
    //Check Both the input fields are having valid value or not
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    
    // Check input is valid or not
    if(!isValidInput(firstName,lastName)){
        alert ("Please Enter All input fields & make sure field has not only whitespace");
        return ;
    }

    //Add Row in the table
    const row = document.getElementById("dataTable").insertRow(++rows);

    //Add cells in the row
    addCells(row, firstName, lastName);

    //Make input fields blank
    makeInputFieldsBlank();
};

//This function is responsible for finding the row number
const findRowNumber = element => element.parentNode.parentNode.parentNode.rowIndex;

//This function is responsible for changing the button to add or update by changing their name and updating their onclick event
const changeButton=(type)=>{
    //if type is add
    if(type==="add"){
        document.getElementById("addButton").innerHTML = "Add";
        addButton.onclick = addRow;
    }
    //if type if update
    else if(type==="update"){
        document.getElementById("addButton").innerHTML = "Update";
        addButton.onclick = updateRow;
    }
}

//This function is responsible for deleting the row
const deleteRow = (element) => {
    //finding the row number
    let rowNumber = findRowNumber(element);

    //delete row from the table
    document.getElementById("dataTable").deleteRow(rowNumber);
    --rows;

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();
};

//This function is responsible for edit the row
const editRow = (id) => {
    //get row number which we have to edit
    rowNumber = Number.parseInt(id, 10);

    //make id's for firstname and last name
    const firstNameString = "firstName" + rowNumber,
        lastNameString = "lastName" + rowNumber;

    //put content of firstname and lastname of that row into main firstname & lastname
    document.getElementById("firstName").value = document.getElementById(firstNameString).value;
    document.getElementById("lastName").value = document.getElementById(lastNameString).value;

    //change button to update
    changeButton("update");
};

//This function is responsible for update the row
const updateRow = () => {
    //make id's for firstname and last name
    const firstNameString = "firstName" + rowNumber,
        lastNameString = "lastName" + rowNumber;

    //Check Both the input fields are having valid value or not
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    
    // Check input is valid or not
    if(!isValidInput(firstName,lastName)){
        alert ("Please Enter All input fields & make sure field has not only whitespace");
        return ;
    }

    //Update the content
    document.getElementById(firstNameString).value = firstName;
    document.getElementById(lastNameString).value = lastName;

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();
};