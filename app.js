const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");




const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("public"))

client.setConfig({
    apiKey: "f3edb40d10e0e6df1e236e948604e735-us11",
    server: "us11", //usX
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;


    const data = async () => {
        try{
        const response = await client.lists.addListMember("6aec84d25d", {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });
        console.log(response);
        res.sendFile(__dirname + "/success.html");
      } catch (err) {
        console.log(err.status);
        res.sendFile(__dirname + "/failure.html");
      }
    }

    run();

});



app.listen(3000, () => {
    console.log("Server is running on port 3000")
});