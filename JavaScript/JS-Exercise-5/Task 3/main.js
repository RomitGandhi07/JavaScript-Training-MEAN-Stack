let box2Counter = 1,
    box4Counter = 0,
    timerInteval,
    flag = false;

//This is resonsible for display initial alert and do opertations after that on DOM content load
window.addEventListener('DOMContentLoaded', () => {
    alert("Greetings from Mr.X, please choose the surprise box");
    initialAlert();
});

//Box2 and Box4 colors list
const box2Colors = ["yellow", "pink", "brown"],
    box4Colors = ["red", "green", "blue", "orange", "cyan"];

//This function is responsible for print Click Me in box1 and start changing colors of box2 at 3s
const initialAlert = () => {
    document.getElementById("oneText").innerHTML = "";
    const string = `<div class="m-5" id="clickMeText"><a href="#" id="clickMe" onclick="clickMe()"><h4>Click Me First</h4></a></div>`
    oneText.insertAdjacentHTML('beforeend', string);

    //change color of box 2 in every 3 seconds
    document.getElementById("two").style.backgroundColor = box2Colors[0];
    timerInterval = setInterval(changeBox2Color, 3000);
};

//This function is responsible for changing box2 colors
const changeBox2Color = () => {
    document.getElementById("two").style.backgroundColor = box2Colors[box2Counter];
    ++box2Counter;
    box2Counter %= box2Colors.length;
};

//This function is responsible for changing box4 to specific color
const changeBox4SpecificColor = (color) => {
    document.getElementById("four").style.backgroundColor = box4Colors[color];
};

//This function is responsible for changing box4 colors in every 5s
const changeBox4Color = () => {
    changeBox4SpecificColor(box4Counter);
    timerInteval = setInterval(() => {
        ++box4Counter;
        box4Counter %= box4Colors.length;
        changeBox4SpecificColor(box4Counter);
    }, 5000);
}

//This function is responsible for adding text in box3 and start changing color in box4 on click on click me text
const clickMe = () => {
    //Make Add text to box3
    document.getElementById("threeText").innerHTML = "";
    const string = `<div class="m-5" id="clickMeText"><h4>Oops! Something went wrong</h4></div>`
    threeText.insertAdjacentHTML('beforeend', string);

    //Disbable the click me link of box 1
    document.getElementById("oneText").className = "inactiveLink";

    //Start change of color in box4
    changeBox4Color();

};

//This is responsible to handle Arrow keys operations
document.addEventListener("keydown", function (event) {
    //If arrow is key is up or right
    if (event.code == "ArrowUp" || event.code == "ArrowRight") {
        clearInterval(timerInteval);
        ++box4Counter;
        box4Counter %= box4Colors.length;
    }
    //If arrow is key is down or left
    else if (event.code == "ArrowDown" || event.code == "ArrowLeft") {
        clearInterval(timerInteval);
        --box4Counter;
        if (box4Counter < 0) { box4Counter = box4Colors.length - 1; }
    }
    changeBox4Color();
});