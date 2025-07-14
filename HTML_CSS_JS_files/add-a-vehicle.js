

/**
 * function fetchDataOwner - fetch PersonID from table 'People'
 * @param {*} ownerName by user
 * @returns data - a promise object (USE .then() to access the data)
 */
export async function fetchDataOwner(ownerName) {
  const response = await fetch(`https://people-vehicle-search.onrender.com/api/people?field=Name&value=${encodeURIComponent(ownerName)}`);
  const data = await response.json();
  return data;
}


/**
 * function addVehicle - to add vehicle details into 'Vehicle' table
 * @param {*} rego vehicle registration / plate number in String
 * @param {*} make vehicle make in String
 * @param {*} model vehicle model in String
 * @param {*} colour vehicle colour in String
 * @param {*} ownerID vehicle owner ID as Integer (need to get with function fetchDataOwner)
 */
export async function addVehicle(rego, make, model, colour, ownerID) {
  const response = await fetch('https://people-vehicle-search.onrender.com/api/addVehicle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rego, make, model, colour, ownerID })
  });

  const data = await response.json();
  return data;
}

/**
 * function addOwner - to add owner details into 'People' table
 *                   - ! when owner doesn't appear in the database
 * @param {*} personid ID in 'People' table as Integer
 * @param {*} name owner name in String
 * @param {*} address owner address in String
 * @param {*} dob owner date of birth in String
 * @param {*} license owner license number in String
 * @param {*} expire owner license expiry date in String
 * @param {*} rego vehicle registration / plate number in String
 * @param {*} make vehicle make in String
 * @param {*} model vehicle model in String
 * @param {*} colour vehicle colour in String
 * @param {*} ownerID vehicle owner ID as Integer (need to get with function fetchDataOwner)
 */
export async function addOwner(personid, name, address, dob, license, expire) {
  const response = await fetch('https://people-vehicle-search.onrender.com/api/addPeople', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personid, name, address, dob, license, expire })
  });

  const data = await response.json();
  return data;
}


// DOMContentLoaded - event fires only after the html doc has completely loaded / parsed and DOM tree is built
document.addEventListener("DOMContentLoaded", () => {
    // variables
    const regoInput = document.getElementById("rego");
    const errorRego = document.getElementById("error_rego");
    const makeInput = document.getElementById("make");
    const errorMake = document.getElementById("error_make");
    const modelInput = document.getElementById("model");
    const errorModel = document.getElementById("error_model");
    const colourInput = document.getElementById("colour");
    const errorColour = document.getElementById("error_colour");
    const ownerInput = document.getElementById("owner");
    const errorOwner = document.getElementById("error_owner");
    // owner status - whether it's added into the system or not
    const ownerStatus = document.getElementById("owner_status");
    // ownersInfo - a div section for adding owner
    const ownersInfo = document.getElementById("owners_info");
    const personidInput = document.getElementById("personid");
    const errorPersonid = document.getElementById("error_personid");
    const nameInput = document.getElementById("name");
    const errorName = document.getElementById("error_name");
    const addressInput = document.getElementById("address");
    const errorAddress = document.getElementById("error_address");
    const dobInput = document.getElementById("dob");
    const errorDOB = document.getElementById("error_dob");
    const licenseInput = document.getElementById("license");
    const errorLicense = document.getElementById("error_license");
    const expireInput = document.getElementById("expire");
    const errorExpire = document.getElementById("error_expire");
    // message displays
    const errorMessage = document.getElementById("message");
    const lastAddedBox = document.getElementById("last_add");
    const lastAddedInfo = document.getElementById("added_info");
    // buttons
    const addButton = document.getElementById("added");

    // added autocomplete attribute to the inputs
    regoInput.autocomplete = "on";
    makeInput.autocomplete = "on";
    modelInput.autocomplete = "on";
    colourInput.autocomplete = "on";
    ownerInput.autocomplete = "on";
    personidInput.autocomplete = "on";
    nameInput.autocomplete = "on";
    addressInput.autocomplete = "on";
    dobInput.autocomplete = "on";
    licenseInput.autocomplete = "on";
    expireInput.autocomplete = "on";
    
    /**
     * function errorVehicleInputChecker - (for vehicle) to check whether there is any error input/s
     * @returns error - to determine whether there exists an error input
     */
    function errorVehicleInputChecker(){
        const error = [false]; // check whether there is any error input (will change to true if yes)
        if(regoInput.value === ''){
            errorRego.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(makeInput.value === ''){
            errorMake.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(modelInput.value === ''){
            errorModel.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(colourInput.value === ''){
            errorColour.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(ownerInput.value === ''){
            errorOwner.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        return error[0];
    }

    /**
     * function errorOwnerInputChecker - (for people) to check whether there is any error input/s
     * @returns error - to determine whether there exists an error input
     */
    function errorOwnerInputChecker(){
        const error = [false];
        if(personidInput.value === ''){
            errorPersonid.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(nameInput.value === ''){
            errorName.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(addressInput.value === ''){
            errorAddress.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(dobInput.value === ''){
            errorDOB.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(licenseInput.value === ''){
            errorLicense.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        if(expireInput.value === ''){
            errorExpire.style.display = "inline-block";
            error.pop();
            error.push(true);
        }
        return error[0];
    }

    // add button click - event fires only when Add button got clicked
    addButton.addEventListener("click", () => {
        // initialise variables below like there is no error
        errorRego.style.display = "none";
        errorMake.style.display = "none";
        errorModel.style.display = "none";
        errorColour.style.display = "none";
        errorOwner.style.display = "none";
        // check whether there is any error inputs
        const error_vehicle = errorVehicleInputChecker();

        if(error_vehicle){ // if there is empty input/s
            errorMessage.innerHTML = "Error - missing information. Please fill in the missing details"
            errorMessage.style.color = "red";
        }
        else if(!error_vehicle){ // if all inputs are filled
            // if the user page already appears add owner form
            if(ownerStatus.innerHTML === "Warning: Owner haven't been added into the system, please add owner's details before proceed, or check owner's name again"){
                // initialise variables below like there is no error
                errorPersonid.style.display = "none";
                errorName.style.display = "none";
                errorAddress.style.display = "none";
                errorDOB.style.display = "none";
                errorLicense.style.display = "none";
                errorExpire.style.display = "none";

                // check whether there is any error inputs
                const error_owner = errorOwnerInputChecker();

                if(error_owner){ // if there is empty input/s
                    errorMessage.innerHTML = "Error - missing information. Please fill in the missing details"
                    errorMessage.style.color = "red";
                }
                else if(!error_owner){ // if all inputs are filled
                    const personID = Number.parseInt(personidInput.value);
                    const promise = addOwner(personID, nameInput.value, addressInput.value, dobInput.value, licenseInput.value, expireInput.value,
                            regoInput.value, makeInput.value, modelInput.value, colourInput.value, personID);
                    promise.then((data) => {
                        // add last added box
                        const add2 = document.createElement("div");
                        add2.innerHTML = "<strong>Owner</strong>" + "<br />"
                                        + "Person ID: " + personidInput.value + "<br />"
                                        + "Name: " + nameInput.value + "<br />"
                                        + "Address: " + addressInput.value + "<br />"
                                        + "Date of Birth (DOB): " + dobInput.value + "<br />"
                                        + "Driving License Number: " + licenseInput.value + "<br />"
                                        + "License Expiry Date: " + expireInput.value;
                        add2.style.gridRow = "2";
                        add2.style.border = "1px solid black";
                        // make inputs to empty
                        personidInput.value = "";
                        nameInput.value = "";
                        addressInput.value = "";
                        dobInput.value = "";
                        licenseInput.value = "";
                        expireInput.value = "";
                        ownerStatus.innerHTML = "Owner added successfully - adding vehicle right now...";
                        ownerStatus.style.color = "green";
                        ownersInfo.style.display = "none";
                        addButton.innerHTML = "Add vehicle";
                        // add vehicle automatically afterwards
                        errorMessage.innerHTML = "Vehicle added successfully - feel free to add another new vehicle or refresh the page now";
                        errorMessage.style.color = "green";
                        // add last added box
                        const add1 = document.createElement("div");
                        add1.innerHTML = "<strong>Vehicle</strong>" + "<br />"
                                        + "Registration (plate) number: " + regoInput.value + "<br />"
                                        + "Make: " + makeInput.value + "<br />"
                                        + "Model: " + modelInput.value + "<br />"
                                        + "Colour: " + colourInput.value + "<br />"
                                        + "Owner (full name): " + ownerInput.value;
                        add1.style.gridRow = "1";
                        add1.style.border = "1px solid black";
                        // make inputs to empty
                        regoInput.value = "";
                        makeInput.value = "";
                        modelInput.value = "";
                        colourInput.value = "";
                        ownerInput.value = "";
                        // update "last added" box
                        lastAddedBox.style.display = "block";
                        lastAddedInfo.innerHTML = "";
                        lastAddedInfo.appendChild(add1);
                        lastAddedInfo.appendChild(add2);
                    });
                }
            }
            else{ // when add owner form didn't appear on user page
                // fetch data from table to obtain promise
                const promise = fetchDataOwner(ownerInput.value);
                // access data in promise object by using .then()
                promise.then((data) => {
                    if(data.length === 0){ // if owner not exist in table
                        ownerStatus.innerHTML = "Warning: Owner haven't been added into the system, please add owner's details before proceed, or check owner's name again";
                        ownerStatus.style.color = "blue";
                        ownersInfo.style.display = "inline-block";
                        addButton.innerHTML = "Add owner";
                        nameInput.value = ownerInput.value;
                        // initialise variables below like there is no error
                        errorPersonid.style.display = "none";
                        errorName.style.display = "none";
                        errorAddress.style.display = "none";
                        errorDOB.style.display = "none";
                        errorLicense.style.display = "none";
                        errorExpire.style.display = "none";
                    }
                    else{ // if owner exist in table
                        ownerStatus.style.innerHTML = "";
                        const ownerID = Number.parseInt(data[0].PersonID);
                        const promise = addVehicle(regoInput.value, makeInput.value, modelInput.value, colourInput.value, ownerID);
                        promise.then((data) => {
                            errorMessage.innerHTML = "Vehicle added successfully - feel free to add another new vehicle or refresh the page now";
                            errorMessage.style.color = "green";
                            // add last added box
                            const add1 = document.createElement("div");
                            add1.innerHTML = "<strong>Vehicle</strong>" + "<br />"
                                            + "Registration (plate) number: " + regoInput.value + "<br />"
                                            + "Make: " + makeInput.value + "<br />"
                                            + "Model: " + modelInput.value + "<br />"
                                            + "Colour: " + colourInput.value + "<br />"
                                            + "Owner (full name): " + ownerInput.value;
                            add1.style.gridRow = "1 / 3";
                            add1.style.border = "1px solid black";
                            // make inputs to empty
                            regoInput.value = "";
                            makeInput.value = "";
                            modelInput.value = "";
                            colourInput.value = "";
                            ownerInput.value = "";
                            // update "last added" box
                            lastAddedBox.style.display = "block";
                            lastAddedInfo.innerHTML = "";
                            lastAddedInfo.appendChild(add1);
                        });
                    }
                })
            }
        }
    })
})
