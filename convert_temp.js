"use strict";
const $ = selector => document.querySelector(selector);

/*********************
*  helper functions  *
**********************/
const calculateCelsius = temp => (temp - 32) * 5 / 9;
const calculateFahrenheit = temp => temp * 9 / 5 + 32;

const toggleDisplay = (label1Text, label2Text) => {
    //update labels
    $("#degree_label_1").textContent = label1Text;
    $("#degree_label_2").textContent = label2Text;

    //clear field
    $("#degrees_computed").value = "";

    //clear error messages
    $("#message").textContent = "";
};

/****************************
*  event handler functions  *
*****************************/
const convertTemp = () => {
    //get temp
    const tempInput = parseFloat($("#degrees_entered").value);

    //input validation
    if (isNaN(tempInput)) {
        $("#message").textContent = "You must enter a valid number for degrees."; // DISPLAY ERROR IN MESSAGE ELEMENT
        $("#degrees_computed").value = ""; //clear temp
        $("#degrees_entered").focus(); //focus on input
        $("#degrees_entered").select();
        return;
    }

    //determine conversion
    let convertedTemp;
    if ($("#to_celsius").checked) {
        convertedTemp = calculateCelsius(tempInput);
    } else if ($("#to_fahrenheit").checked) {
        convertedTemp = calculateFahrenheit(tempInput);
    }

    //display result
    $("#degrees_computed").value = Math.round(convertedTemp);

    //clear error message
    $("#message").textContent = ""; //clear if valid input
};

const toCelsius = () => toggleDisplay("Enter F degrees:", "Degrees Celsius:");
const toFahrenheit = () => toggleDisplay("Enter C degrees:", "Degrees Fahrenheit:");

document.addEventListener("DOMContentLoaded", () => {
    //error message
    const convertButton = $("#convert");
    const messageDiv = document.createElement("div");
    messageDiv.id = "message";
    messageDiv.style.color = "red";
    messageDiv.style.marginTop = "10px";
	messageDiv.style.textAlign = "center";
    convertButton.parentNode.appendChild(messageDiv);

    //given E.H.'s
    $("#convert").addEventListener("click", convertTemp);
    $("#to_celsius").addEventListener("click", toCelsius);
    $("#to_fahrenheit").addEventListener("click", toFahrenheit);

    $("#degrees_entered").focus();
});
