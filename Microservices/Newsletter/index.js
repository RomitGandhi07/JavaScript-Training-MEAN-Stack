const express=require('express');
const app=express();

app.use(express.static('public'));

const port = 6000;
app.listen(port, () => console.log(`NewsLetter Service: Listening on port ${port}...`));