Endpoints:
----------
1) localhost:5000/api/names GET    -> This router is responsible for getting all the names
 
2) localhost:5000/api/names POST {firstName lastName is compulsory data}  -> This route is responsible for adding the name

3) localhost:5000/api/names/:id  PUT {firstName lastName is compulsory data} -> This route is responsible for updating the name by Id

4) localhost:5000/api/names/:id  DELETE -> This route is responsible for Deleting the name by Id

5) localhost:5000/api/jwtToken


Common Note:
------------
1. To run node index.js

2. After checking the Authorization middleware(JWT) comment app.use(authorized) line in index.js otherwise for every API call have to provide valid JWT token in header called x-auth-token

3. To test Authorization middleware set environment variable exercise2_jwtKey
like (For ubuntu) export exercise2_jwtKey="nodeExercise2PrivateKey"


8 Middlewares
-------------

**1. Request Logger**

This middleware is responsible for log all the requests
File is saved under ./logs/requests.logs file
Log Format: Current Date-time URL Method IP

Note: to test this call any API and check the log file

**2. Check DB is connected or not**

This middleware is responsible for checking DB is connected or not 
If it isn't then we will move to next error middleware otherwise next 

Note: To test this commnet mongoose.connect code and see response as well as see ./logs/erros.log files

**3. Authorized or not**

This middleware is responsible for cheking that JWT token is present in the header or not  and If yes then it is valid or not

Note: To check this call localhost:5000/api/jwtToken with input like {"id":"asdf"}

and then do any request with and without request header x-auth-token and also try with malformed JSON

**4. Is JSON**

This middleware is responsible for checking that is given data in the request body is JSON or not

Note: Test it with localhost:5000/api/names POST request with data like
{
    "firstName" : "Romit",
    "lastName" : "Gandhi"
}

and set content type to anything instead of JSON

**5. Add XSS Security**

This middleware is responsible for preventing the basic XSS attack
Here we replaces < with &lt; ,  > with $gt; , " with &quot;

Note: Test it with localhost:5000/api/names POST request with data like
{
    "firstName" : "<script>Romit</script>",
    "lastName" : "Gandhi"
}

**6. Error 404 for wrong URL**

This middleware is responsible for catching routes which are not specified

Note: To test this try with any endpoint which is not specified

**7. Code Error Handler**

This middleware is responsible for handling the code errors
First it will set staus to 500 and then log the error
Log file will be ./logs/errors.logs
Log format: Date-Time errorMessage URL Method

Note: Along with DB check middleware this is also tested
If wanna test more then uncomment line in the middlewares/addXSSSecurity.js file

**8. Page Request Error Handler**

This midleware is responsible for handling the different page request erros
Like 400,401,404,500 

Note: For 404 this is also tested

For any code error this is also tested (Gives 500)

For 400
http://localhost:5000/api/names POST request 

try with firstName or lastName empty OR less then 3 characters

like, {
    "firstName" : "",
    "lastName" : "Gandhi"
}

