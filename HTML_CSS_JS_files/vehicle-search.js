// initializing
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// connect my supabase
const supabase = createClient(vars.SUPABASE_CLIENT_ADDRESS, vars.SUPABASE_CLIENT_KEY);          
/**
 * function fetchData - fetch data from table 'Vehicle'
 * @param {*} input by user
 * @returns data - a promise object (USE .then() to accesss inner data)
 */
export async function fetchData(input){
    const { data } = await supabase.from('Vehicles')
                                .select(`VehicleID, Make, Model, Colour, People(Name, LicenseNumber)`).eq('VehicleID', input);
    console.log(data);
    return data;
}

// DOMContentLoaded - event fires only after the html doc has completely loaded / parsed and DOM tree is built
document.addEventListener("DOMContentLoaded", () => {
    // variables
    const plateNumber = document.getElementById("rego");
    const errorMessage = document.getElementById("message");
    const errorSign = document.getElementById("error");
    const submitButton = document.getElementById("submitted");
    const displayFrame = document.getElementById("frameTwo");
    const resultFrame = document.getElementById("result_frame");
    const resultHeading = document.getElementById("result_heading");
    const allResults = document.getElementById("results");
    const emptyDisplay = document.getElementById("empty_result");
    const numResults = document.getElementById("num_results");

    // added autocomplete attribute to input
    plateNumber.autocomplete = "on";

    errorSign.style.display = "none";

    // click - event fires only when submit button got clicked
    submitButton.addEventListener("click", () => {
        if(plateNumber.value === ""){ // if no input
            errorMessage.innerHTML = "Error - empty input. Please enter valid detail";
            errorMessage.style.color = "red";
            errorSign.style.display = "inline-block";
        }
        else{ // if have input
            errorSign.style.display = "none";
            displayFrame.style.backgroundColor = "aliceblue";
            resultFrame.style.display = "block";
            resultHeading.style.display = "block";
            emptyDisplay.style.display = "none";
            // fetch data from table to obtain promise
            const promise = fetchData(plateNumber.value);
            // access data in promise object by using .then()
            promise.then((data) => {
                if(data.length > 0){ // successful
                    errorMessage.innerHTML = "Search successful - feel free to start a new search or refresh the page";
                    errorMessage.style.color = "green";
                    numResults.innerHTML = data.length + " Results | Last search - plate number: " + plateNumber.value;
                    allResults.innerHTML = "";
                    // add result
                    for(let i = 0; i < data.length; i++){
                        const result = document.createElement('div');
                        result.className = 'result';
                        if(data[i].People === null){
                            result.innerHTML = "Vehicle's Registration (plate) number: " + data[i].VehicleID + "<br />"
                                                + "Make: " + data[i].Make + "<br />"
                                                + "Model: " + data[i].Model + "<br />"
                                                + "Colour: " + data[i].Colour + "<br />"
                                                + "Owner's Full Name: " + "none";
                        }
                        else{
                            result.innerHTML = "Vehicle's Registration (plate) number: " + data[i].VehicleID + "<br />"
                                                + "Make: " + data[i].Make + "<br />"
                                                + "Model: " + data[i].Model + "<br />"
                                                + "Colour: " + data[i].Colour + "<br />"
                                                + "Owner's Full Name: " + data[i].People.Name + "<br />"
                                                + "Owner's License Number: " + data[i].People.LicenseNumber;
                        }
                        allResults.appendChild(result);
                    }
                    // make input to empty
                    plateNumber.value = "";
                }
                else{ // if no result found
                    errorMessage.innerHTML = "No result found - feel free to start a new search or refresh the page";
                    errorMessage.style.color = "blue";
                    resultHeading.style.display = "block";
                    numResults.innerHTML = data.length + " Results | Last search - plate number: " + plateNumber.value;
                    allResults.innerHTML = "";
                    // make input to empty
                    plateNumber.value = "";
                }
            })
        }
    })
})
