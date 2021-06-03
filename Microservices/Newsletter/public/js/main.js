// This function is responsible for checking that function is valid or not
const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    return regex.test(email);
}

// This function is responsible for sending the email
const sendEmail = async (email) => {
    try {
        // Define subject, text and make data for sending the email
        const subject = "Subscribed to DemoSystem!!!";
        const text = `Hello ${email}, you are successfully subscribed to DemoSystem. Now, you will get all the latest updates.`
        const data = {
            to: email,
            subject,
            text
        };

        // call POST api to send email
        const response = await fetch("http://localhost:7777/sendEmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // If response is not ok then throw error
        if (!response.ok) { throw new Error(); }

        // Prompt user
        alert("Subscribed Successfully...");
    }
    catch (err) {
        alert("Something went wrong, Please try again...");
    }

};

// This function is responsible for subscribe to newsletter
const subscribe = () => {
    // Get value of email and check that email is valid or not
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        alert("Please Enter Valid Email...");
        return;
    }

    // Send Email
    sendEmail(email);
}