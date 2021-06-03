let rows = 1,
    rowNumber = 0;

//This function is responsible for adding the cells in the row
const addRowIntable = ({firstName, lastName, backgroundColor, fontSize}) => {
    //Row
    const row = $(`<tr>
                <td>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input rowCheckbox" onclick="printRowsSelected()">
                    </div>
                </td>
                <td>
                    <div class="form-group col-8">
                        <input type="text" class="form-control col-6" id="${"firstName" + rows}" value="${firstName}" disabled>
                    </div>                     
               </td>
               <td>
                    <div class="form-group col-8">
                        <input type="text" class="form-control" id="${"lastName" + rows}" value="${lastName}" disabled>
                     </div>
               </td>
               <td>
                    <div class="form-group">
                        <button type="button" class="btn btn-md btn-success" id="${rows}edit" onclick="editRow(this.id)" >Edit</button>
                    </div>
               </td>
               <td>
                    <div class="form-group">
                        <button type="button" class="btn btn-md btn-danger" id="${rows}"delete"" onclick="deleteRow(this)">Delete</button>
                    </div>
               </td>
               </tr>`);

    //Append row to the table and apply fade In effect
    row.hide().fadeIn("slow");
    $("#dataTable").append(row);

    //Apply CSS
    $("#dataTable tr:last td .form-control").css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });
};

// This function is responsible for validating the hex
const validHex=(hex)=>{
    const hexPattern = /^#[0-9a-f]{3,6}$/i;
    return hexPattern.test(hex);
};

//This function is responsible for check all the fields are fill or not
const validData=({firstName, lastName, backgroundColor, fontSize})=>{
    // Check all the fields are entered or not
    if(firstName && lastName && backgroundColor && fontSize){
        // Check background color has valid hex or not
        if(validHex(backgroundColor)){
            return true;
        }
        return alert("Please Enter valid Hex");
    }
    return alert("Please enter all the fields");
};

//This function is responsible for make the input fields blank
const makeInputFieldsBlank=()=>{
    $("#firstName").val("");
    $("#lastName").val("");
    $("#backgroundColor").val("");
    $("#textSize option:eq(0)").prop("selected",true);
}

// This function is responsible for enabling/dissabling selectall checkbox based on no of rows
const changeSelectAllDisablity=()=>{
    // document.getElementById("selectAll").disabled=(rows<=1);
    $("#selectAll").prop('disabled', (rows<=1));
};

// This function is responsible for adding the row
const addRow = () => {
    //Check all the fields are properly entered or not
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const backgroundColor = $("#backgroundColor").val();
    const fontSize=$("#textSize").val();
    if(!validData({firstName, lastName, backgroundColor, fontSize})){return ;}

    //Add row 
    addRowIntable({
        firstName, lastName, backgroundColor, fontSize
    });
    ++rows;

    //Make input fields blank
    makeInputFieldsBlank();

    //deselect selectAll checkbox
    $("#selectAll").prop("checked", false);

    // For enabling the selectAll checkbox
    changeSelectAllDisablity();

};

//This function is responsible for changing the button to add or update by changing their name and updating their onclick event
const changeButton=(type)=>{
    //if type is add
    if(type==="add"){
        $("#addButton").text("Add");
        addButton.onclick = addRow;
    }
    //if type if remove
    else if(type==="update"){
        $("#addButton").text("Update");
        addButton.onclick = updateRow;
    }
}

//This function is responsible for finding the row number
const findRowNumber = element => element.parentNode.parentNode.parentNode.rowIndex;

//This function is responsible for print how many rows are selected
const printRowsSelected = () => {
    //get no of checkboxes which are selected
    let selected = $('#dataTable .rowCheckbox:checked').length;

    //disable delete button if no checkbox is selected and hide modify section
    if (selected === 0) { 
        $("#deleteRowsButton").attr("disabled",true); 
        $("#modifySection").hide();
        
    }
    //enable delete button if any checkbox is selected and show modify section
    else {
        $("#deleteRowsButton").attr("disabled",false);
        $("#modifySection").show();
    }

    //check select all button if all the checkboxes are selected
    $("#selectAll").prop("checked",selected != 0 && selected == (rows - 1));

    //print content
    $("#rowsSelected").text(`Total ${selected} selected row(s)`);
}

//This function is responsible for deleting the row
const deleteRow = (element) => {
    const userConfirmation=confirm("Are you sure want to delete it?");
    if(!userConfirmation){
        return;
    }
    //finding the row number
    let rowNumber = findRowNumber(element);

    //delete row from the table
    $("#dataTable tr").eq(rowNumber).fadeOut("slow",function(){
        $(this).remove();

        //print selected rows
        printRowsSelected();
    });
    --rows;

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();

    //deselect selectAll checkbox
    $("#selectAll").prop("checked",false);

    // For disabling select all checkbox if there are no rows
    changeSelectAllDisablity();
};

// This functions are responsible to convert RGB to HEX
let hexDigits = new Array
    ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

function rgbToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#"+hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

//This function is responsible for finding the font size
const findFontSize=(fontInPX)=>{
    if(fontInPX=="13px"){
        return "Small";
    }
    else if(fontInPX=="16px"){
        return "Medium";
    }
    else if(fontInPX=="18px"){
        return "Large";
    }
}

//This function is responsible for edit the row
const editRow = (id) => {
    //get row number which we have to edit
    rowNumber = Number.parseInt(id, 10);

    //make id's for firstname and last name
    const firstNameString = "#firstName" + rowNumber,
        lastNameString = "#lastName" + rowNumber;
    
    //put content of firstname and lastname of that row into main firstname & lastname
    $("#firstName").val($(firstNameString).val());
    $("#lastName").val($(lastNameString).val());

    //Find value of background color and font-size and put them
    const backgroundColor=rgbToHex($(firstNameString).css("background-color")),
          fontSize=findFontSize($(firstNameString).css("font-size"));

    $("#backgroundColor").val(backgroundColor);
    $("#textSize").val(fontSize);

    //change button name to update and update the onclick event
    changeButton("update");
};

//This function is responsible for update the row
const updateRow = () => {
    //make id's for firstname and last name
    const firstNameString = "#firstName" + rowNumber,
        lastNameString = "#lastName" + rowNumber;

    //Check all the fields are properly entered or not
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const backgroundColor = $("#backgroundColor").val();
    const fontSize=$("#textSize").val();
    if(!validData({firstName, lastName, backgroundColor, fontSize})){return ;}

    //Update the content
    $(firstNameString).value = firstName;
    $(lastNameString).value = lastName;

    $(`${firstNameString}, ${lastNameString}`).css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });

    //change button to add
    changeButton("add")

    //Make input fields blank
    makeInputFieldsBlank();
};

//This function is responsible for selecting all the rows
const selectAll = () => {
    //check status of select all checkbox
    let status = Boolean($("input[name=selectAll]:checked").length);
    $('#dataTable .rowCheckbox').prop("checked",status);

    //Print how many rows are selected
    printRowsSelected();
};

//This function is responsible for deleting selected rows
const deleteRows = () => {
    const userConfirmation=confirm("Are you sure want to delete it?");
    if(!userConfirmation){
        return;
    }
    //delete all selected rows
    let elements=$('#dataTable .rowCheckbox:checked');
    rows-=elements.length;
    elements.parent().parent().parent().remove();

    //deselect selectAll checkbox
    $('#selectAll').prop("checked",false);

    //change button to add
    changeButton("add");

    //Make input fields blank
    makeInputFieldsBlank();
    
    //print selected rows
    printRowsSelected();

    // For disabling select all checkbox if there are no rows
    changeSelectAllDisablity();
};

//This function is responsible for modifying the background color and font-size of selected items
const modify=()=>{
    //Get values of background color and font-size and check if they are valid or not
    const backgroundColor = $("#modifyBackgroundColor").val();
    const fontSize=$("#modifyTextSize").val();

    // Check both the fields are entered or not and hex value is valid or not
    if(!backgroundColor || !fontSize){
        alert("Please Enter all the fields");    
        return ; 
    }
    if(!validHex(backgroundColor)){
        alert("Please Enter valid HEX");
        return;
    }

    //Find elements which are selected and apply css on them
    const elements=$('#dataTable .rowCheckbox:checked').parent().parent().parent().find(".form-control");
    elements.css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });

    //Set background color and drop down value to empty
    $("#modifyBackgroundColor").val("");
    $("#modifyTextSize option:eq(0)").prop("selected",true);
};