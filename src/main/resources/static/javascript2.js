function getCustomers(callback){
	let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:9595/customer/all",true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            callback(this); //passing in the entire xhr object
        }
    }
    xhr.send();
}

function addCustomers(xhrObj){
	let jsonResponse = xhrObj.response;
    let customers = JSON.parse(jsonResponse);
    
    for(var i = 0; i < customers.length; i++){
    	let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        cell1.style.borderRight = "solid";
        cell2.style.borderRight = "solid";
        cell1.innerHTML=customers[i].id;
        cell2.innerHTML=customers[i].firstName;
        cell3.innerHTML=customers[i].lastName;
        document.getElementById("customerList").appendChild(row);
    }
}

getCustomers(addCustomers);