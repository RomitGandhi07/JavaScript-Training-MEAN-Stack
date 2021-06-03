"use strict";
const checkEmailAddressValidity=(emailAddress)=>{
  //regex pattern for email
  const pattern = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;

  //check email address can be matched with that pattern or not
  return pattern.test(emailAddress);
};
const emailAddress=prompt("Please Enter email address","gandhiromit77@gmail.com");
checkEmailAddressValidity(emailAddress)?alert("Valid Email Address"):alert("Invalid Email Address");