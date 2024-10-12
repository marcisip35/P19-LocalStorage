const inputForm = document.querySelector("#inputForm");
const outputForms = document.querySelector("#outputForms");

window.addEventListener("DOMContentLoaded", displayedStoreData());

//This is when a form is submitted
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(inputForm); //Array of data from a form set as name : data
    const obj = Object.fromEntries(formData); //Convert FormData into an object

    let allInputForms = JSON.parse(localStorage.getItem("allInputForms")) || []; //Grab all data from local storage and turn the strings into an object
    allInputForms.push(obj); //Add the new form to the array

    localStorage.setItem("allInputForms", JSON.stringify(allInputForms)); // Save the updated array back to localStorage

    //Create a new div 
    const newOutputForm = document.createElement("div");
    newOutputForm.classList.add("outputForm");

    newOutputForm.innerHTML = `    
    <div class="firstNameContainer infoContainer">
        <h1>First Name</h1>
        <p>${obj.firstName}</p>
    </div>
    <div class="lastNameContainer infoContainer">
        <h1>Last Name</h1>
        <p>${obj.lastName}</p>
    </div>
    <div class="emailContainer infoContainer">
        <h1>Email</h1>
        <p>${obj.email}</p>
    </div>
    <div class="phoneContainer infoContainer">
        <h1>Phone</h1>
        <p>${obj.phone}</p>
    </div>`;

    outputForms.appendChild(newOutputForm);

    inputForm.reset();
});

function displayedStoreData() {
    const storedData = localStorage.getItem("allInputForms");

    if (storedData) {
        const inputDataArray = JSON.parse(storedData);

        //Display each container of info using a loop
        inputDataArray.forEach(inputData => {
            const newOutputForm = document.createElement("div");
            newOutputForm.classList.add("outputForm");

            newOutputForm.innerHTML = `    
            <div class="firstNameContainer infoContainer">
                <h1>First Name</h1>
                <p>${inputData.firstName}</p>
            </div>
            <div class="lastNameContainer infoContainer">
                <h1>Last Name</h1>
                <p>${inputData.lastName}</p>
            </div>
            <div class="emailContainer infoContainer">
                <h1>Email</h1>
                <p>${inputData.email}</p>
            </div>
            <div class="phoneContainer infoContainer">
                <h1>Phone</h1>
                <p>${inputData.phone}</p>
            </div>`;

            // Append the output form to the container
            outputForms.appendChild(newOutputForm);
        })
    }
}

document.querySelector("#clearDataBtn").addEventListener("click", () => {
    localStorage.removeItem("allInputForms"); // Or use localStorage.clear() to remove everything
    alert("All form data has been cleared.");
    
    // Optionally, clear the displayed output forms
    document.querySelector("#outputForms").innerHTML = "";
});