// initializing
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// connect my supabase
const supabase = createClient('https://ucvynbtjdkujbfjkspox.supabase.co',
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdnluYnRqZGt1amJmamtzcG94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjE3MTg5OSwiZXhwIjoyMDI3NzQ3ODk5fQ.kMMVLH8ZkGTE9KRSWjjL73AnRd4yovbcb91ynyONEgA');

/**
 * function fetchDataOwner - fetch PersonID from table 'People'
 * @param {*} name by user
 * @returns data - a promise object (USE .then() to access the data)
 */
export async function fetchDataOwner(name){
    const { data } = await supabase.from('People')
                                .select('PersonID').eq('Name', name);
    console.log(data);
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
export async function addVehicle(rego, make, model, colour, ownerID){
    const { data, error } = await supabase.from('Vehicles')
                                .insert({ VehicleID: rego, 
                                            Make: make,
                                            Model: model,
                                            Colour: colour,
                                            OwnerID: ownerID })
                                .select();
    console.log(data);
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
export async function addOwner(personid, name, address, dob, license, expire, rego, make, model, colour, ownerID){
    const { data, error } = await supabase.from('People')
                                .insert({ PersonID: personid,
                                            Name: name,
                                            Address: address,
                                            DOB: dob,
                                            LicenseNumber: license,
                                            ExpiryDate: expire })
                                .select();
    console.log(data);
    // add vehicle automatically afterwards
    addVehicle(rego, make, model, colour, ownerID);
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
        const error = false; // check whether there is any error input (will change to true if yes)
        if(regoInput.value === ''){
            errorRego.style.display = "inline-block";
            error = true;
        }
        else if(makeInput.value === ''){
            errorMake.style.display = "inline-block";
            error = true;
        }
        else if(modelInput.value === ''){
            errorModel.style.display = "inline-block";
            error = true;
        }
        else if(colourInput.value === ''){
            errorColour.style.display = "inline-block";
            error = true;
        }
        else if(ownerInput.value === ''){
            errorOwner.style.display = "inline-block";
            error = true;
        }
        return error;
    }

    /**
     * function errorOwnerInputChecker - (for people) to check whether there is any error input/s
     * @returns error - to determine whether there exists an error input
     */
    function errorOwnerInputChecker(){
        const error = false
        if(personidInput.value === ''){
            errorPersonid.style.display = "inline-block";
            error = true;
        }
        else if(nameInput.value === ''){
            errorName.style.display = "inline-block";
            error = true;
        }
        else if(addressInput.value === ''){
            errorAddress.style.display = "inline-block";
            error = true;
        }
        else if(dobInput.value === ''){
            errorDOB.style.display = "inline-block";
            error = true;
        }
        else if(licenseInput.value === ''){
            errorLicense.style.display = "inline-block";
            error = true;
        }
        else if(expireInput.value === ''){
            errorExpire.style.display = "inline-block";
            error = true;
        }
        return error;
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
                        const ownerID = Number.parseInt(data.PersonID);
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
                            lastAddedInfo.appendChild(add1);
                        });
                    }
                })
            }
        }
    })
})
