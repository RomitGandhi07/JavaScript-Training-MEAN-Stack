//This function is responsible for open section in tabs of respective city whose button is clicked
function openCityInTab(element) {
    // Make display none to all the contents
    $(".content").css("display", "none");

    //loop over each element of having class tablinks and if it has class active-tab then remove it
    $(".tablinks").each(function () {
        if ($(this).hasClass("active-tab")) {
            $(this).removeClass("active-tab");
        }
    });

    //Find city name and apply display as block and add class active-tab to current element
    const cityName = $(element).text();
    $(`#${cityName}`).css("display", "block");
    $(element).addClass("active-tab");
}

//This function is responsible for open section in accordian of respective city whose button is clicked
function openCityInAccordion(element) {
    //Get the next element and it's display property (which is div that conatains content)
    const nextElement = $(element).next();
    const nextElementDisplay = nextElement.css("display")

    //If display is none first close current opened section then make next element's display block
    if (nextElementDisplay == "none") {
        $('.content').css("display", "none");
        $(".arrow-icon").html(`<i class="fas fa-chevron-circle-right"></i>`)

        nextElement.css("display", "block");
        $(element).find(".arrow-icon").html(`<i class="fas fa-chevron-circle-down"></i>`)
    }
    //If display is block then make it none
    else if (nextElementDisplay == "block") {
        alert("Can't collpase all sections");
    }
}

// This function is responsible for doing task on screen resize
const changeAfterScreenResize = () => {
    //Get screen width
    const screenWidth = $(document).width();

    // If screen width less than 480 means mobile device
    if (screenWidth < 480) {
        //Get index of currently selected tab
        let counter = 0, index = -1;
        $(".tablinks").each(function () {
            if ($(this).hasClass("active-tab")) {
                index = counter;
            }
            ++counter;
        });
        
        //Make all arrows towards right
        $(".arrow-icon").each(function () {
            $(this).html(`<i class="fas fa-chevron-circle-right"></i>`);
        });

        //Make arrow to down using index
        $(".arrow-icon").eq(index).html(`<i class="fas fa-chevron-circle-down"></i>`);
    }
    else {
        //Get index of currently selected block
        let counter = 0, index = -1;
        $(".content").each(function () {
            if ($(this).css("display") == "block") {
                index = counter;
            }
            ++counter;
        });

        //Remove class active-tab from all tab links
        $(".tablinks").each(function () {
            if ($(this).hasClass("active-tab")) {
                $(this).removeClass("active-tab");
            }
        });

        //Add calss active-tab using index
        $(".tablinks").eq(index).addClass("active-tab");
    }
};