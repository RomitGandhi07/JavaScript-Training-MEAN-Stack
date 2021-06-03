const data = [
    {
        firstName: "Romit",
        lastName: "Gandhi",
    },
    {
        firstName: "Kishan",
        lastName: "Sheth",
    },
    {
        firstName: "Neel",
        lastName: "Dani",
    },
    {
        firstName: "Parth",
        lastName: "Satasia",
    },
    {
        firstName: "Ravindra",
        lastName: "Singh",
    },
    {
        firstName: "Rashmin",
        lastName: "Chhatrala",
    },
    {
        firstName: "Savan",
        lastName: "Karathia",
    },
    {
        firstName: "Savan",
        lastName: "Aghera",
    },
    {
        firstName: "Smit",
        lastName: "Panchal",
    },
    {
        firstName: "Rupesh",
        lastName: "Suryavanshi",
    },
];

let rows = 0,
    rowNumber = 0,
    oldName = "";
const names = [];

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
                        <button type="button" class="btn btn-md btn-success" id="${rows + "edit"}" onclick="editRow(this)" >Edit</button>
                    </div>`;

    //Add delete button
    const cell3 = row.insertCell(3);
    cell3.innerHTML = `<div class="form-group">
                        <button type="button" class="btn btn-md btn-danger" id="${rows + "delete"}" onclick="deleteRow(this)">Delete</button>
                    </div>`;

};

//This function is responsible for checking that name is already there or not
const isDuplicate = (firstName, lastName) => names.includes(firstName + lastName);

// This function is responsible for checking input is valid or not
// Here it is cheking firstName and lastName is entered or not and if yes it contains other letter then whitespace or not
const isValidInput = (firstName, lastName) => {
    if (firstName && lastName) {
        firstName = firstName.replaceAll(" ", "");
        lastName = lastName.replaceAll(" ", "");
        if (firstName && lastName) { return true; }
    }
    return false;
}

//This function is responsible for make the input fields blank
const makeInputFieldsBlank = () => {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
}

// This function is responsible for adding the row
const addRow = () => {
    //Check Both the input fields are having valid value or not
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    if (!isValidInput(firstName, lastName)) {
        alert("Please Enter All input fields & make sure field has not only whitespace");
        return;
    }

    //Check name is already there or not
    if (isDuplicate(firstName, lastName)) { alert("Name is already there..."); return; }

    //Add Row in the table
    const row = document.getElementById("dataTable").insertRow(++rows);

    //Add cells in the row
    addCells(row, firstName, lastName);

    //Make input fields blank
    makeInputFieldsBlank();

    //Add name in the names array
    names.push(firstName + lastName);
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

    //Delete entry from array
    const firstName = document.getElementById("dataTable").rows[rowNumber].cells[0].firstElementChild.firstElementChild.value;
    const lastName = document.getElementById("dataTable").rows[rowNumber].cells[1].firstElementChild.firstElementChild.value;
    names.splice(names.indexOf(firstName + lastName), 1);

    //delete row from the table
    document.getElementById("dataTable").deleteRow(rowNumber);
    --rows;

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();
};

//This function is responsible for edit the row
const editRow = (element) => {
    //get row number which we have to edit
    rowNumber = findRowNumber(element);

    const firstName = document.getElementById("dataTable").rows[rowNumber].cells[0].firstElementChild.firstElementChild.value;
    const lastName = document.getElementById("dataTable").rows[rowNumber].cells[1].firstElementChild.firstElementChild.value;

    //Store current name
    oldName = firstName + lastName;

    //put content of firstname and lastname of that row into main firstname & lastname
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;

    //change button name to update and update the onclick event
    changeButton("update");
};

//This function is responsible for update the row
const updateRow = () => {
    //Check Both the input fields are having valid value or not
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    
    if (!isValidInput(firstName, lastName)) {
        alert("Please Enter All input fields & make sure field has not only whitespace");
        return;
    }

    //Check name is already there or not
    if (oldName!=String(firstName+lastName) && isDuplicate(firstName, lastName)) { alert("Name is already there..."); return; }

    //Update the content
    document.getElementById("dataTable").rows[rowNumber].cells[0].firstElementChild.firstElementChild.value = firstName;
    document.getElementById("dataTable").rows[rowNumber].cells[1].firstElementChild.firstElementChild.value = lastName;

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();

    //Update the name in the name array
    names[names.indexOf(oldName)] = firstName + lastName;
};

//This function is responsible for rendering the data
const renderData = () => {
    let count = 0;
    //loop on each object of array
    data.forEach(name => {
        const { firstName, lastName } = name;
        //check already added or not
        if (!isDuplicate(firstName, lastName)) {
            ++count;
            //Add Row in the table
            const row = document.getElementById("dataTable").insertRow(++rows);

            //Add cells in the row
            addCells(row, firstName, lastName);

            //Add name to the names array
            names.push(firstName + lastName);
        }
    });
    //Giving alert that how much data is inserted
    if (count > 0) { alert(`${count} entries added`); }
    else { alert("All the entries are already there"); }
};