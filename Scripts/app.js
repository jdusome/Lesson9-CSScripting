/* JavaScript lives here */
/* forces you to use semi-colons, and it also makes you declare var or let */
"use strict";

// IIFE
(function(){ 

//Loads the Navbar using AJAX
function LoadNavBar(){
    let mainNav = document.getElementById("mainNav");
        let navbarHTML;

        //STEP 1 - Create an XHR object
        let navXHR = new XMLHttpRequest();

        //Step 2 - Open a file
        navXHR.open("GET","../navbar.html", true);

        //STEP 3 - Send the XMLHttpRequest
        navXHR.send();

        //STEP 4 - Listen for readystate of 4 and server status of 200 on readystatechange
        navXHR.onreadystatechange = function() {

            if((this.readyState === 4) && (this.status === 200)){
                //read the data
                navbarHTML = this.responseText;
            }

        };

        //STEP 5 - wait until the navbar file has finished loading
        navXHR.addEventListener("load", function(){

            mainNav.innerHTML = navbarHTML;

            switch(document.title) {

                case "Home":
                    let homeLink = document.getElementById("homeLink");
                    homeLink.setAttribute("class", "active");
                break;

                case "Projects":
                    let projectLink = document.getElementById("projectsLink");
                    projectLink.setAttribute("class", "active");
                break;

                case "Contact":
                    let contactLink = document.getElementById("contactLink");
                    contactLink.setAttribute("class", "active");
                break;
            }

        });
};


//Loads the Page content for each page using the document title as a switch
function LoadPageContent(){
    switch (document.title) {

        case "Home":
        LoadHomePage();
        break;

        case "Projects":
        LoadProjectsPage();
        break;

        case "Contact":
        LoadContactPage();
        break;

    } //end case
};

//loads the content of the home page
function LoadHomePage(){
    let today = new Date();

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let currentMonth = months[today.getMonth()];
    let currentDay = day[today.getDay()];
    console.log(currentDay + " " + currentMonth + " " + today.getDate() + ", " + today.getFullYear());

    /*
    console.log(today.getDate());
    console.log(today.getMonth());
    console.log(today.getFullYear());
    console.log(today.toLocaleDateString());
    */

    let myNumber = 3.14157826;


    console.log(myNumber.toFixed(4));

    //Math Examples
    let die = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;

    console.log(die);
    console.log(die2);
    console.log(die + die2);

    //This is our Point object
    let Point = (function(){

        //constructor
        function Point(x, y) {
        this.x = x,
        this.y = y

        //normalize method
        Point.prototype.normalize = function(){
            this.x = 1;
            this.y = 1;
        };

        //zero method
        Point.prototype.zero = function(){
            this.x = 0;
            this.y = 0;
        };

        //static method
        Point.Distance = function() {
            return Math.sqrt(Math.pow((Point2.x - Point1.x),2) + Math.pow((Point2.y - Point1.y), 2));
        };
    };

    return Point;

    })();

    //distance between two points
    let myPoint = new Point(30,30);


    //this is like a point class
    

    let Point1 = new Point(10,10);
    let Point2 = new Point(20,20);

    let distance = Math.sqrt(Math.pow((Point2.x - Point1.x),2) + Math.pow((Point2.y - Point1.y), 2));
    console.log(distance);

    //this is the same as doing Point1.x
    console.log("Point1 x: " + Point1["x"]);


    let data;

        //STEP 1 - instantiate an XHR object of a new XMLHttpRequest
        let XHR = new XMLHttpRequest();

        //STEP 2 - Open the JSON file
        //arguments - GET/POST, URL, Async (True or False)
        // GET is for non sensitive data, POST is more secure but slower
        XHR.open("GET", "../games.json", true);

        //STEP 3 - Initiate the call (send out a call to the XHR object)
        //you can also add a filter if you are looking for a particular document
        //for example, you could do "games". If it doesn't match anything in the document it will not filter
        XHR.send(null);

        //Step 4 - Listen for ready state for be 4
        //Creates a handler to be done when the 
    
        XHR.addEventListener("readystatechange", function(){

            //There are different ready states that represent the stage of data transfer, 4 means done
            //There are different server status codes that represent state of server, 200 means all is good
            if((XHR.readyState === 4) && (XHR.status === 200)){

                //convert the response text into a JSON file
                data = JSON.parse(this.responseText);

            }

        });

        //STEP 5 - wait until data is finished loading before injecting it into the document
        XHR.addEventListener("load", function(){

            //created a hook into our UI into back end JS
        let gameListBody = document.getElementById("gameListBody");

        //for each game in data.games, do this this...
        data.games.forEach(function(game){

            //create a new table row element called newRow
            let newRow = document.createElement("tr")

            //insert HTML within the newly created element
            newRow.innerHTML = `
            <tr>
                <td class="text-center">${game.name}</td>
                <td class="text-center">${game.cost}</td>
                <td class="text-center">${game.rating}</td>
            </tr>
            `;

            //append the element on to the gameListBody
            gameListBody.appendChild(newRow);
        }, this);

        });
};

function LoadProjectsPage(){
//setup references to all elements we need to hook into
        let HideButton = document.getElementById("HideButton");
        let HalfSizeButton = document.getElementById("HalfSizeButton");
        let ThreeQuarterSizeButton = document.getElementById("ThreeQuarterSizeButton");
        let ShowButton = document.getElementById("ShowButton");
        let FirstProjectImage = document.getElementById("FirstProjectImage");

        let ButtonArray = [HideButton, HalfSizeButton, ThreeQuarterSizeButton, ShowButton];

        //create a for statemento assign even listeners to each button in the array
        ButtonArray.forEach(function(button) {

            button.addEventListener("click", function(event){

                //store which button has been clicked in current button
                let currentButton = button.getAttribute("id")

                switch (currentButton){
                    case "HideButton":
                        FirstProjectImage.style.visibility = "hidden";
                    break;
                    case "HalfSizeButton":
                        FirstProjectImage.style.width = "50%";                 
                    break;
                    case "ThreeQuarterSizeButton":
                        FirstProjectImage.style.width = "75%"; 
                    break;
                    case "ShowButton":
                        FirstProjectImage.style.visibility = "visible";
                        FirstProjectImage.style.width = "100%";
                    break;
            };

        }, this);

        });

};

function LoadContactPage(){
    /*
      let FullName = document.getElementById("FullName");
      let ContactNumber = document.getElementById("ContactNumber");
      let Email = document.getElementById("Email");
      let Message = document.getElementById("Message");
      let SendButton = document.getElementById("SendButton");

      SendButton.addEventListener("click", function (event) {
        event.preventDefault();

        console.log(FullName);
        console.log(ContactNumber);
        console.log(Email);
        console.log(Message);
})

 */

};


//Function that is called on page load (entry point)
function Start() {
    LoadNavBar();
    LoadPageContent();
};


//call the start function when the window loads, start is a callback function/event handler
window.onload = Start;

})(); //end of the IIFE (immediately invoked function express)




