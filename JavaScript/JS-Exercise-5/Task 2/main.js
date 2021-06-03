//names
const names = ["Ashish Shah",
    "Rashmin Chhatrala",
    "Yash Dubey",
    "Prakash Jain",
    "Yashraj Singh",
    "Viraj Sinha",
    "Rajesh Kumar",
    "Mahesh Marwadi",
    "Suresh Sahni",
    "Amar Vilas",
    "Virdas Singhania",
    "Rajeshwari Bindra",
    "Birendra Bhalerao",
    "Virendra Bhupati",
    "Bhupendra Singh",
    "Bhuvam Bam",
    "Shri Raj",
    "Prashant Kamle",
    "Kamlesh Tomar",
    "Risabh Khare",
    "Rishi Kohli",
    "Kunwar Kharwanda",
    "Kartik Koli",
    "Komal Jain",
    "Kartikey Pandey"];

//This function is responsible for displaying all the names
const listAllNames = () => {
    //Loop over all names
    names.forEach(name=>{
        let string=`<h6>${name}</h6>`;
        namesList.insertAdjacentHTML('beforeend',string);
    });
}

//This function is responsible to display only matched names
const matchSearch=(searchText)=>{
    const searchTextLength=searchText.length;
    document.getElementById("namesList").innerHTML="";
    //loop through all names
    names.forEach(name=>{
        const position=name.indexOf(searchText);
        //If search text is found in the name
        if(position!=-1){
            const uptoPosition=position+searchTextLength;
            const firstPart=name.slice(0,position);
            const highlighedPart=name.slice(position,uptoPosition);
            const lastPart=name.slice(uptoPosition,name.length);
            let string=`<h6>${firstPart}<span class="highlight">${highlighedPart}</span>${lastPart}`
            namesList.insertAdjacentHTML('beforeend',string);
        }
    });
};

//This is responsible tracking key pressed and display results based on search text
document.addEventListener("keyup", (event)=> {
    let searchText=document.getElementById("searchText").value;
    if(searchText.length<2){ 
        document.getElementById("namesList").innerHTML="";
        listAllNames(); 
        return ;
    }

    matchSearch(searchText);
});