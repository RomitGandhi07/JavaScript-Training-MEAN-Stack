/*
Approach: Here I have made number of stars= number of length of length/2 
Middle characters will be stars and left and right characters will be as it is
*/
"use strict";

// This function is responsible for validating email address
// This is just basic validation like @ only comes once, there must be .after @, last character shoudn't be .
const isValid = (emailAddress) => {
    // Email address must include @
    if (emailAddress.includes("@")) {
        const lastIndex = emailAddress.lastIndexOf("@");
        // there must be only one @
        if (emailAddress.indexOf("@") == lastIndex) {
            // There must be "." after @ and last element must not be "."
            if (emailAddress.lastIndexOf(".") > lastIndex && emailAddress[emailAddress.length - 1] != ".") {
                return true;
            }
        }
    }
    return false;
};

// This function is responsible for hiding the characters in the email address
const hideEmailAddress = (emailAddress) => {
    //Check email id valid or not
    if (!isValid(emailAddress)) {
        return "Email address is not valid...";
    }
    let hiddenUserName = "";

    //Split email with @
    const splitEmail = emailAddress.split("@");

    //Get username from email
    const userName = splitEmail[0];
    const userNameLength = userName.length;

    //If length is 1
    if (userNameLength == 1) { return "*@" + splitEmail[1]; }

    //If length is more then 1
    const mid = Math.floor(userNameLength / 2);
    const remaining = userNameLength - mid;

    //Make username hidden
    hiddenUserName += userName.slice(0, Math.ceil(remaining / 2));
    hiddenUserName += "*".repeat(mid);
    hiddenUserName += userName.slice(userNameLength - Math.floor(remaining / 2), userNameLength);

    //return hidden username+@+domain
    return hiddenUserName + "@" + splitEmail[1];

};

const emailAddress = prompt("Please Enter your email adress:", "abcdef@gmail.com");
alert(hideEmailAddress(emailAddress));