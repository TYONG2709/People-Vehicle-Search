// initializing
import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// connect my supabase
const supabase = createClient('https://ucvynbtjdkujbfjkspox.supabase.co',
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdnluYnRqZGt1amJmamtzcG94Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjE3MTg5OSwiZXhwIjoyMDI3NzQ3ODk5fQ.kMMVLH8ZkGTE9KRSWjjL73AnRd4yovbcb91ynyONEgA');
                    
/**
 * function fetchData - fetch data from table 'People'
 * @param {*} nameORlicense either "Name" or "LicenseNumber"
 * @param {*} input by user
 * @returns data - a promise object (USE .then() to access inner data)
 */
export async function fetchData(nameORlicense, input){
    if(nameORlicense === "Name"){
        const { data } = await supabase.from('People')
                                    .select().ilike(nameORlicense, input);
        console.log(data);
        return data;
    }
    else{
        const { data } = await supabase.from('People')
                                    .select().eq(nameORlicense, input);
        console.log(data);
        return data;
    }
}

// DOMContentLoaded - event fires only after the html doc has completely loaded / parsed and DOM tree is built
document.addEventListener("DOMContentLoaded", () => {
    // variables
    const nameInput = document.getElementById("name");
    const licenseInput = document.getElementById("license");
    const errorMessage = document.getElementById("message");
    const errorSign = document.getElementsByClassName("error");
    const submitButton = document.getElementById("submitted");
    const displayFrame = document.getElementById("frameTwo");
    const resultFrame = document.getElementById("result_frame");
    const allResults = document.getElementById("results");
    const resultHeading = document.getElementById("result_heading");
    const emptyDisplay = document.getElementById("empty_result");
    const numResults = document.getElementById("num_results");

    // added autocomplete attribute to inputs
    nameInput.autocomplete = "on";
    licenseInput.autocomplete = "on";

    for(let i = 0; i < errorSign.length; i++){
        errorSign[i].style.display = "none";
    }

    // click - event fires only when submit button got clicked
    submitButton.addEventListener("click", () => {
        if(nameInput.value === "" && licenseInput.value === ""){ // if no inputs
            errorMessage.innerHTML = "Error - empty input. Please enter either driver's name OR license number";
            errorMessage.style.color = "red";
            for(let i = 0; i < errorSign.length; i++){
                errorSign[i].style.display = "inline-block";
            }
        }
        else if(nameInput.value !== "" && licenseInput.value === ""){
            for(let i = 0; i < errorSign.length; i++){
                errorSign[i].style.display = "none";
            }
            displayFrame.style.backgroundColor = "aliceblue";
            resultFrame.style.display = "block";
            resultHeading.style.display = "block";
            emptyDisplay.style.display = "none";
            // fetch data from table to obtain promise
            const promise = fetchData("Name", "%"+nameInput.value+"%");
            // access data in promise object by using .then()
            promise.then(((data) => {
                if(data.length > 0){ // successful
                    errorMessage.innerHTML = "Search successful - feel free to start new search or refresh the page";
                    errorMessage.style.color = "green";
                    numResults.innerHTML = data.length + " Results | Last search - driver name: " + nameInput.value;
                    // add result
                    allResults.innerHTML = "";
                    for(let i = 0; i < data.length; i++){
                        const result = document.createElement('div');
                        result.className = 'result';
                        result.innerHTML = "Driver's ID: " + data[i].PersonID + "<br />"
                                            + "Full Name: " + data[i].Name + "<br />"
                                            + "Address: " + data[i].Address + "<br />"
                                            + "Date of Birth (DOB): " + data[i].DOB + "<br />"
                                            + "Driving License Number: " + data[i].LicenseNumber + "<br />"
                                            + "License's Expiry Date: " + data[i].ExpiryDate;
                        allResults.appendChild(result);
                    }
                    // make inputs to empty
                    nameInput.value = "";
                    licenseInput.value = "";
                }
                else{ // if no result found
                    errorMessage.innerHTML = "No result found - feel free to start new search or refresh the page";
                    errorMessage.style.color = "blue";
                    numResults.innerHTML = data.length + " Results | Last search - driver name: " + nameInput.value;
                    allResults.innerHTML = "";
                    // make inputs to empty
                    nameInput.value = "";
                    licenseInput.value = "";
                }
            }))
        }
        else if(nameInput.value === "" && licenseInput.value !== ""){
            for(let i = 0; i < errorSign.length; i++){
                errorSign[i].style.display = "none";
            }
            displayFrame.style.backgroundColor = "aliceblue";
            resultFrame.style.display = "block";
            resultHeading.style.display = "block";
            emptyDisplay.style.display = "none";
            const promise = fetchData("LicenseNumber", licenseInput.value);
            promise.then(((data) => {
                if(data.length > 0){ // successful
                    errorMessage.innerHTML = "Search successful - feel free to start new search or refresh the page";
                    errorMessage.style.color = "green";
                    numResults.innerHTML = data.length + " Results | Last search - driving license number: " + licenseInput.value;
                    // add result
                    allResults.innerHTML = "";
                    for(let i = 0; i < data.length; i++){
                        const result = document.createElement('div');
                        result.className = 'result';
                        result.innerHTML = "Person ID: " + data[i].PersonID + "<br />"
                                            + "Name: " + data[i].Name + "<br />"
                                            + "Address: " + data[i].Address + "<br />"
                                            + "Date of Birth (DOB): " + data[i].DOB + "<br />"
                                            + "Driving License Number: " + data[i].LicenseNumber + "<br />"
                                            + "License Expiry Date: " + data[i].ExpiryDate;
                        allResults.appendChild(result);
                    }
                    // make inputs to empty
                    nameInput.value = "";
                    licenseInput.value = "";
                }
                else{ // if no result found
                    errorMessage.innerHTML = "No result found - feel free to start new search or refresh the page";
                    errorMessage.style.color = "blue";
                    numResults.innerHTML = data.length + " Results | Last search - driving license number: " + licenseInput.value;
                    allResults.innerHTML = "";
                    // make inputs to empty
                    nameInput.value = "";
                    licenseInput.value = "";
                }
            }))
        }
        else{ // if both inputs are detected
            errorMessage.innerHTML = "Error - please only select one method, either search by driver name OR driving lcense number";
            errorMessage.style.color = "red";
            for(let i = 0; i < errorSign.length; i++){
                errorSign[i].style.display = "inline-block";
            }
        }
    })
})