//var baseURL = "localhost:9595/";
let counter = 25;
var averURL = "http://localhost:9595/flight/avg";
var minURL = "http://localhost:9595/flight/min";
var maxURL = "http://localhost:9595/flight/max";
var medURL = "http://localhost:9595/flight/median";

function getFlights(callback){
	let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9595/flight/all",true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            callback(this); //passing in the entire xhr object
        }
    }
    xhr.send();
}



function getAverMaxMin(callback, url){
	let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            callback(this); //passing in the entire xhr object
        }
    }
    xhr.send();
}

function printResponse(xhrObj){
    let jsonResponse = xhrObj.response;
    let books = JSON.parse(jsonResponse);
    console.log(books);
}

function addFlights(xhrObj){
	let jsonResponse = xhrObj.response;
    let flights = JSON.parse(jsonResponse);
    
    for(var i = 0; i < flights.length; i++){
    	if(flights[i].customer != null){
        	registFlight(flights[i].customer.id, flights[i].customer.firstName, flights[i].customer.lastName, 
        			flights[i].flightNumber, flights[i].destination, flights[i].departsFrom, flights[i].ticketPrice);
        }
    	let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        cell1.style.borderRight = "solid";
        cell2.style.borderRight = "solid";
        cell3.style.borderRight = "solid";
        cell1.innerHTML=flights[i].flightNumber;
        cell2.innerHTML=flights[i].destination;
        cell3.innerHTML=flights[i].departsFrom;
        cell4.innerHTML=flights[i].ticketPrice;
        document.getElementById("flightList").appendChild(row);
    }

}



function registFlight(custID, fname, lname, aline, destin, depart, tPrice){
    	let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let cell5 = document.createElement("td");
        let cell6 = document.createElement("td");
        let cell7 = document.createElement("td");
        

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        cell1.style.borderRight = "solid";
        cell2.style.borderRight = "solid";
        cell3.style.borderRight = "solid";
        cell4.style.borderRight = "solid";
        cell5.style.borderRight = "solid";
        cell6.style.borderRight = "solid";
        cell1.innerHTML= custID;
        cell2.innerHTML= fname;
        cell3.innerHTML= lname;
        cell4.innerHTML= aline;
        cell5.innerHTML= destin;
        cell6.innerHTML= depart;
        cell7.innerHTML= tPrice;
        document.getElementById("registeredFlight").appendChild(row);
}

function newFlight(flight){
	let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    
    

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    
    cell1.style.borderRight = "solid";
    cell2.style.borderRight = "solid";
    cell3.style.borderRight = "solid";
    
    cell1.innerHTML= flight.flightNumber;
    cell2.innerHTML= flight.destination;
    cell3.innerHTML= flight.departsFrom;
    cell4.innerHTML= flight.ticketPrice;
   
    document.getElementById("flightList").appendChild(row);
}

function maxVal(xhrObj){
	document.getElementById("maxVal").innerHTML = xhrObj.response;
}
function minVal(xhrObj){
	document.getElementById("minVal").innerHTML = xhrObj.response;
}
function averVal(xhrObj){
	document.getElementById("averagVal").innerHTML = Math.round(xhrObj.response* 100) / 100;
}
function mediVal(xhrObj){
	document.getElementById("medianVal").innerHTML = Math.round(xhrObj.response* 100) / 100;
}

document.getElementById("submitFlight").setAttribute("onclick", "CreateCustomerFlight(getCustomerID); window.location.reload();");
function CreateCustomerFlight(callback){
	var cstID = document.getElementById("custID").value;
	console.log(cstID);
	let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9595/customer/all",true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
        	callback(this, cstID);
        	document.getElementById("addFlight").getElementsByTagName("form")[0].reset();
        	location.reload();
        }
    }
    xhr.send();
    
    
}


function getCustomerID(xhr, custID){
	let jsonResponse = xhr.response;
    let customers = JSON.parse(jsonResponse);
    let customerID = custID;
    var fName = "";
    var lName = "";
    var airline = document.getElementById("airline").value;
    var destination = document.getElementById("destination").value;
    var depart = document.getElementById("depart").value;
    var ticketPrice = document.getElementById("ticketPrice").value;
    for(var i = 0; i < customers.length; i++){
    	if(customerID == customers[i].id){
    		fName = customers[i].firstName;
    		lName = customers[i].lastName;
    		}
    }
    console.log(customerID);
    var flight= {"customer": {
  		"firstName": fName,
  			"id": customerID,
  			"lastName": lName
    },
    "departsFrom": destination,
    "destination": depart,
    "flightNumber": airline,
    "ticketPrice": ticketPrice}
    if(customerID <= 25){
    	registFlight(customerID, fName, lName, airline, destination, depart, ticketPrice);
    }
//    else{
//    	console.log("invalid flight");
//    }
    if(customerID <= 25 && airline != "" && destination != "" && depart != "" && ticketPrice != ""){
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://localhost:9595/flight/all");
    xhr1.onreadystatechange=function(){
      if(xhr1.readyState ===4 && xhr.status===200){
    	  	let jsResponse = xhr1.response;
    	    let flights = JSON.parse(jsResponse);
    	    if(airline > flights.length){
    	    	let xhr2 = new XMLHttpRequest();
    	    	xhr2.open("POST", "http://localhost:9595/flight");
    	    	xhr2.onreadystatechange=function(){
    	    	  if(xhr2.readyState ===4 && xhr.status===200){
    	    		  	let jsonResponse = xhr2.response;
    	    		    let books = JSON.parse(jsonResponse);
    	    		    console.log(books);//passing in the entire xhr object

    	    	  }
    	    	  else{
    	    	      console.log(xhr2.response);
    	    	  }
    	    	}
    	    	let jsonUser = JSON.stringify(flight);
    	    	xhr2.setRequestHeader("Content-Type", "application/json");
    	    	xhr2.send(jsonUser);
    	    }
    	    newFlight(flight);
      }
      else{
          console.log(xhr1.response);
      }
    }  
    xhr1.send();
    document.getElementById("errorMessage").hidden = true;
    }
    else{
    	alert("Invalid Information!");
    	document.getElementById("errorMessage").hidden = false;
    }
}
document.getElementById("deleting").setAttribute("onclick", "removeFlight(deleteFlight);");
function removeFlight(callback){
	var deleting = document.getElementById("deleteRow").value;
	console.log(deleting);
	let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9595/flight/all",true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            callback(this, deleting); //passing in the entire xhr object
            location.reload();
        }
    }
    xhr.send();
}

function deleteFlight(xhr, airline){
	let jsonResponse = xhr.response;
    let flights = JSON.parse(jsonResponse);
    var flightNum = 0;
    let valid = false;
    for(var i = 0; i < flights.length; i++){
    	if(flights[i].flightNumber == airline){
    		flightNum  = i;
    		valid = true;
    	}
    }
    if(valid == true){
    let flight = flights[flightNum];
    console.log(flight);
    let xhr2 = new XMLHttpRequest();
    xhr2.open("Delete", "http://localhost:9595/flight");
    xhr2.onreadystatechange=function(){
      if(xhr2.readyState ===4 && xhr.status===200){
    	  console.log(xhr2.response);
      }
      else{
          console.log(xhr2.response);
      }
    }
    let jsonUser = JSON.stringify(flight);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.send(jsonUser);
    }
    else{
    	alert("This flight is not on the List!");
    }
}
//;
document.getElementById("updFlight").setAttribute("onclick", "updateFlight(updateThis);");
function updateFlight(callback){
	var updating = document.getElementById("updatingAirline").value;
	let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9595/flight/all",true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            callback(this, updating); //passing in the entire xhr object
            location.reload();
        }
    }
    xhr.send();
}

function updateThis(xhr, airline){
	let jsonResponse = xhr.response;
    let flights = JSON.parse(jsonResponse);
    var flightNum = 0;
    var newDestin = document.getElementById("updateDest").value;
    var newDepart = document.getElementById("updateDepart").value;
    var newPrice = document.getElementById("updatePrice").value;
    var newDestin = document.getElementById("updateDest").value;
    var newDepart = document.getElementById("updateDepart").value;
    var newPrice = document.getElementById("updatePrice").value;
    var newFName = "";
    var newLName = "";
    let valid = false;
    var newID = document.getElementById("updCustID").value;
    for(var i = 0; i < flights.length; i++){
    	if(flights[i].flightNumber == airline){
    		flightNum  = i;
    		valid = true;
    	}
    }
    if(valid == true){
    let flight = flights[flightNum];
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET","http://localhost:9595/customer/all",true);
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState===4&&xhr1.status===200){
        	let jsResponse = xhr1.response;
    	    let customers = JSON.parse(jsResponse);
        	for(i = 0; i < customers.length; i++){
        		if(newID != "" && newID == customers[i].id)
        			{
        			 newFName = customers[i].firstName;
        			 newLName = customers[i].lastName
        			}
        	}
    var cust = {
        "firstName": newFName,
        "id": newID,
        "lastName": newLName
      }
//    console.log(cust);
    if(cust.newFName != "" && newLName != ""){
    	flight.customer = cust;
    }
//    console.log(flight.customer);// = newFName;
    if(newDestin != ""){
    	flight.destination = newDestin;
    }
    if(newDepart != ""){
    	flight.departsFrom = newDepart;
    }
    if(newPrice != ""){
    	flight.ticketPrice = newPrice;
    }
    console.log(flight);
    let xhr2 = new XMLHttpRequest();
    xhr2.open("PUT", "http://localhost:9595/flight");
    xhr2.onreadystatechange=function(){
      if(xhr2.readyState ===4 && xhr.status===200){
    	  console.log(xhr2.response);
      }
      else{
          console.log(xhr2.response);
      }
    }
    let jsonUser = JSON.stringify(flight);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.send(jsonUser);
    }
        else{
        	console.log(xhr1.response);
        }
        
    }
    xhr1.send();
    }
    else{
    	alert("Invalid Inputs!");
    }
}

getAverMaxMin(averVal, averURL)
getAverMaxMin(minVal, minURL)
getAverMaxMin(maxVal, maxURL)
getFlights(addFlights);

getAverMaxMin(mediVal, medURL)
//addNewCustomer();
//addNewFlight(flight, printResponse);
getFlights(printResponse);
//removeFlight(25, deleteFlight)
//var value = getCustomerID("Jonathon", "Jee");
//console.log(value);
//CreateCustomerFlight("Verine","Caton",getCustomerID);

