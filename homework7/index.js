const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const pdf = require("html-pdf");
const colors = ["red", "blue", "green", "black", "yellow"];
async function runRunRun(){
    const userName = await inquirer.
        prompt({
            type : "input",
            name : "username",
            message : "Enter the username"
        });
    const pageColor = await inquirer.
        prompt({
            type : "list",
            name : "color",
            choices : colors
        })
    const queryUrl = `https://api.github.com/users/${userName.username}`;
    const queryUrlStarred = `https://api.github.com/users/${userName.username}/starred`;
    const userData = await axios.get(queryUrl);
    const userStars = await axios.get(queryUrlStarred);
    const theHtmls = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>profile</title>
    </head>
    <body style="color: white;">
        <div class="container">
            <div class="row" style="background-color: ${pageColor.color}; height: 380px;  padding: 100px 40px 0px 40px;">
                <div class="col-12" style="background-color: coral; height: 400px; text-align: center; z-index: 10;">
                    <img src="${userData.data.avatar_url}" alt="picture of ${userData.data.name}" style="width: 200px; border: 5px solid gold; border-radius: 50%; position: relative; bottom: 35px;">
                    <h2>Hi!</h2>
                    <h2>My name is ${userData.data.name}</h2>
                    <b>Currently ${userData.data.company}</b>
                    <br>
                    <br>
                    <b><span class="fa fa-map-marker"></span><a style="color:white;" href="https://www.google.com/maps/place/${userData.data.location}">location</a>    <span class="fa fa-github"></span><a style="color:white;" href="${userData.data.html_url}">GitHub</a>   <span class="fa fa-rss"></span><a style="color:white;" href="${userData.data.blog}">Blog</a></b>
                </div>
            </div>
            <div class="row" style="height: 120px;"><div class="col-12"></div></div>
            <div class="row" style="height: 400px;">
                <div class="col-12" style="text-align: center;">
                    <br>
                    <h2 style="color: black; text-align: center;">${userData.data.bio}</h2>
                    <br>
                    <div style="height: 100px; background-color: coral; width: 35%; float: left; margin: 0% 5% 0% 10%; padding-top: 10px;">
                    <h2>Public Repositories</h2>
                    <h2>${userData.data.public_repos}</h2>
                    </div>
                    <div style="height: 100px; background-color: coral; width: 35%; float: left; margin: 0% 10% 0% 5%; padding-top: 10px;">
                    <h2>Followers</h2>
                    <h2>${userData.data.followers}</h2>
                    </div>
                    <div style="height: 50px; width: 100%; float: left;"></div>
                    <div style="height: 100px; background-color: coral; width: 35%; float: left; margin: 0% 5% 0% 10%; padding-top: 10px;">
                    <h2>GitHub Stars</h2>
                    <h2>${userStars.data.length}</h2>
                    </div>
                    <div style="height: 100px; background-color: coral; width: 35%; float: left; margin: 0% 10% 0% 5%; padding-top: 10px;">
                    <h2>Following</h2>
                    <h2>${userData.data.following}</h2>
                    </div>
                </div>
            </div>
            <div class="row" style="background-color: ${pageColor.color}; height: 350px;">
                <div class="col-12"></div>
            </div>
        </div>
    </body>
    </html>`;
    fs.writeFileSync("index.html", theHtmls , function(err){
        return err;
    });
    var html = fs.readFileSync('index.html', 'utf8');

    var options = { format: 'Letter' };
    
    pdf.create(html, options).toFile('./MyProfile.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}
runRunRun();


