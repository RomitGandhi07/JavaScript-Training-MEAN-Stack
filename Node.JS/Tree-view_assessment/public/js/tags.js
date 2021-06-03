// This function is responsible for making the HTML using element which has id and name
const makeHTML=(element)=>{
    return `<li id="${element._id}"><span>${element.name}</span>
    <div class="d-inline">
        
        <a href="#" id="${element._id}Add" onclick="showAdd(this.id)">Add</a>
        <a href="#" id="${element._id}Delete" onclick="deleteTag(this.id)">Delete</a>
        <a href="#" id="${element._id}Move" onclick="showMove(this.id)">Move</a>
        <a href="#" id="${element._id}Update" onclick="showUpdate(this.id)">Update</a>
    <div class="add-section" style="display:none" id="${element._id}AddSection">
        <input type="text" id="${element._id}ChildName" name="childName"/>
        <button id="${element._id}AddChild" onclick="addChild(this.id)">Add This Tag</button>
    </div>
    <div class="update-section" style="display:none" id="${element._id}UpdateSection">
        <input type="text" id="${element._id}UpdateName" name="updateName"/>
        <button id="${element._id}UpdateTag" onclick="updateName(this.id)">Update</button>
    </div>
  </div>`
};

// This function is responsibe for finding the children of parent and add it to the DOM
const findChildren = (children, tags, string) => {
    // If there are no children then return
    if (!children) { return; }

    // Add ul to string becuase display of children started
    string += "<ul>";

    // Looping through all child and add them to DOM as well as their children and so on
    children.forEach(element => {
        // Find current tag
        const subchildren = tags.filter(tag => tag._id == element._id);

        // Add HTML to String
        string += makeHTML(element);

        // Recursion for looping to their childern and save the updated string and add </li>
        string = findChildren(subchildren[0].children, tags, string);
        string += "</li>";
    });

    // Add </ul> and return the string
    string += "</ul>";
    return string;
};

// This function is responsible for getting all the tags
async function getAllTags() {
    try {
        // GET request
        const response = await fetch("/api/tags", {
            method: 'GET',
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        // Get data
        let tags = await response.json();

        return tags;
    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for loading all the tags on loading of index.html
async function loadTags() {
    try {
        // Get all tags
        let tags = await getAllTags();

        // Find parent elements
        const result = tags.filter(element => element.parent_id == null);

        // Looping through all parent element
        result.forEach(element => {
            // Make HTML string and append
            const string = makeHTML(element);
            let html = findChildren(element.children, tags, string);
            html += "</li>";
            $("#tagsList").append(html);
        });
    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for closing all the things like add,update section move button etc.
const closeAll=()=>{
    $("#moveSection").hide();
    $(".add-section").hide();
    $(".update-section").hide();
    $(".moveButton").remove();
    $("#moveDropdown").text("");
}

// This function is responsible for display add section
const showAdd = (id) => {
    // Close all
    closeAll();

    // Find id and display add section of their
    id = id.slice(0, id.indexOf("Add"));
    $(`#${id}AddSection`).show();

}

// This function is responsible for cheking that name is valid or not
const validName=(name)=>{
    name=name.replace(" ","");
    if(name.length<3){
        return false;
    }
    return true;
}

// This function is responsible for adding the child to the parent
async function addChild(id) {
    try {
        // User confirmation
        const userConfirmation = confirm("Are You Sure want to add it?");
        if (!userConfirmation) { return; }

        //Find parent id and name and make data which will be sent to the POST request
        id = id.slice(0, id.indexOf("AddChild"));

        // Check enterd name is valid or not
        const name = $(`#${id}ChildName`).val();
        if(!validName(name)){throw new Error("Tag name must be 3 characters long");}

        const data = { name, parent_id: id };

        // call POST endpoint to save tag in the database
        const response = await fetch("/api/tags", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        // Get tag from response
        let tag = await response.json();

        // Append HTML
        let html=makeHTML(tag);
        $(`#${tag.parent_id}`).append(`
            <ul>
            ${html}
            </li></ul>`);

        // Hide add-section class and make textbox blank
        $(`#${id}ChildName`).val("");
        closeAll();
    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for adding the parent
async function addParent(id) {
    try {
        // User confirmation
        const userConfirmation = confirm("Are You Sure want to add it?");
        if (!userConfirmation) { return; }

        // Check entered name is valid or not
        const name = $(`#parentName`).val();
        if(!validName(name)){throw new Error("Tag name must be 3 characters long");}

        //Find parent id and name and make data which will be sent to the POST request
        if (!name) { throw new Error("Please Enter parent name"); }
        const data = { name };

        // call POST endpoint to save tag in the database
        const response = await fetch("/api/tags/parent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        let tag = await response.json();

        // append HTML
        const html=makeHTML(tag);
        $(`#tagsList`).append(`
            ${html}
            </li>`);

        $("#parentName").val("");
    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for calling the delete tag API 
async function deleteTagAPICall(id,data) {
    try {
        // call Delete endpoint to save tag in the database
        const response = await fetch(`/api/tags/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        const tags = await response.json();
        return tags;

    }
    catch (err) {
        alert(err);
    }
}


// This function is responsibe for finding the children of parent and add it to the DOM
async function deleteChildren(id,tags,children) {
    // Add id to children array and check that id has children or not
    children.push(id);
    const deletedTag=tags.find(element=>element._id==id);

    // If there are no children then return
    if (!deletedTag.children) { return; }

    // Looping through all child
    for (let element of deletedTag.children) {
        children=await deleteChildren(element._id,tags,children);
    }
    return children;
}

// This function is responsible for deleting the tag and their children
async function deleteTag(id) {
    try {
        // User Confirmation
        const userConfirmation = confirm("Are You Sure want to delete it?");
        if (!userConfirmation) { return; }

        // Find id 
        id = id.slice(0, id.indexOf("Delete"));

        // Get all tags
        const tags=await getAllTags();

        // Find all children and delete them
        const children=await deleteChildren(id,tags,[]);
        await deleteTagAPICall(id,{elements: children});

        // Remove from DOM and close all
        $(`#${id}`).remove();
        closeAll();

    }
    catch (err) {
        alert(err);
    }
}

// This function is responsible for show all the children in move
const showAllChildrenInMove = (children, tags, string, parent_id) => {
    // If there are no children then return
    if (!children) { return; }

    // Looping through all child and add them to DOM as well as their children and so on
    children.forEach(element => {
        if (element._id != parent_id) {
            // Find current tag
            const subchildren = tags.filter(tag => tag._id == element._id);

            // Add to DOM
            let string = `<option id="${element._id}Option">${element.name}</option>`;
            $("#moveDropdown").append(string);

            // Recursion for looping to their childern
            showAllChildrenInMove(subchildren[0].children, tags, string, parent_id);
        }
    });
}

// This functino is responsible for show move section
async function showMove(id) {
    // Close all
    closeAll();
    
    // Find id 
    id = id.slice(0, id.indexOf("Move"));

    // GET request
    const response = await fetch(`/api/tags/${id}`);

    // If response is not ok then throw error
    if (!response.ok) { throw new Error(await response.text()); }


    let tag = await response.json();
    const tags = await getAllTags();

    // Find parent elements
    const parent = tags.filter(element => element.parent_id == null);

    // Loop through all parent
    parent.forEach(element => {
        if (element._id != tag.parent_id && element._id != tag._id) {
            // Add HTML
            let string = `<option id="${element._id}Option" val="${element.name}">${element.name}</option>`;
            $("#moveDropdown").append(string);

            // For getting children
            showAllChildrenInMove(element.children, tags, string, tag.parent_id);
        }
    });
    // Add button
    $("#moveSection").append(`<button class="btn btn-danger moveButton" id="${id}MoveButton" onclick="moveTag(this.id)">Move</button>`);

    // Show move section
    $("#moveSection").show();
}

// This function is responsible for mov the tag
async function moveTag(id) {
    // User Confirmation
    const userConfirmation = confirm("Are You Sure want to move it?");
    if (!userConfirmation) { return; }

    // Get id
    id = id.slice(0, id.indexOf("MoveButton"));

    // Get parent id
    const selectedId = $('#moveDropdown').find(":selected").attr("id");
    const parent_id = selectedId.slice(0, selectedId.indexOf("Option"));
    
    // call PUT endpoint to move tag in the database
    const response = await fetch(`/api/tags/move/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parent_id }),
    });

    // If response is not ok then throw error
    if (!response.ok) { throw new Error(await response.text()); }

    // Get tag from response
    let tag = await response.json();
    $("#moveButton").remove();

    // Change in DOM 
    const content=$(`#${id}`).html();
    $(`#${id}`).remove();

    $(`#${parent_id}`).append(`
        <ul class="demo">
        <li id="${id}">
        ${content}
        </li>
        </ul>`);

    closeAll();

};

// This function is reponsible for displaying the update section
const showUpdate = (id) => {
    closeAll();

    // Show update section of that tag
    id = id.slice(0, id.indexOf("Update"));
    $(`#${id}UpdateSection`).show();
}

// This function is responsible for update the tag name
async function updateName(id) {
    try {
        const userConfirmation = confirm("Are You Sure want to update it?");
        if (!userConfirmation) { return; }

        // Find parent id and name and make data which will be sent to the POST request
        id = id.slice(0, id.indexOf("UpdateTag"));
        
        // Check enterd name is valid or not
        const name = $(`#${id}UpdateName`).val();
        if(!validName(name)){throw new Error("Tag name must be 3 characters long");}

        
        // call POST endpoint to save tag in the database
        const response = await fetch(`/api/tags/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(await response.text()); }

        // Get tag from response
        let tag = await response.json();

        // Hide add-section class and make textbox blank
        $(".update-section").hide();
        $(`#${id}UpdateName`).val("");
        closeAll();

        // Change Name
        $(`#${id} > span`).text(name);
    }
    catch (err) {
        alert(err);
    }
}