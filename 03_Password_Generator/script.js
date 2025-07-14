// selecting elements
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector('.generateButton');
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]")

const symbols = '~`!@#$%^&*()_+=/*-+.?/:;<.,>{[}]';

// default settings
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// function to handle slider --> set password length
function handleSlider(){
    // default setting
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// set strength div color
function setIndicator(color){
    // default setting
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 15px 1px ${color}`;
}


// function to generate random integer generator
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

// function to generate random single digit number
function generateRandomNumber(){
    return getRndInteger(0,9);
}

// function to generate random lowerCase character
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
// function to generate random upperCase character
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90));
}

// function to generate random symbol
function generateSymbol(){
    const randIdx = getRndInteger(0,symbols.length);
    return symbols.charAt(randIdx);
}

// function to calculate strength 
function calcStrength(){

    // checking password contains what type of characters
    let hasUpper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    // rules to predict strength
    if(hasUpper && haslower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0"); // green
    }else if(
        (haslower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6
    ){ 
        setIndicator("#ff0"); // yellow
    }else{
        setIndicator("#f00"); // red
    }
}

// function to copy content to clipboard
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }catch(err){
        copyMsg.innerText = "failed";
    }
    // to make the span visible
    copyMsg.classList.add("active");

    // setting timeout
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

// function to handle checkbox count
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    // handle special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

// function to shuffle password
function shufflePassword(array){
    // Fisher Yates Method
    for(let i = array.length - 1; i > 0; i--){

        // finding j (j --> random index)
        const j = Math.floor(Math.random() * (i+1));

        // swapping the variables at index i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // creating password string after array elements is swapped
    let str = "";
    array.forEach((el) => str+= el);
    return str;
}


// event listener on the slider
inputSlider.addEventListener('input',(e) => {
    // setting the input passwordLength to the current input slider value
    passwordLength = e.target.value;
    handleSlider();
    // handleCheckBoxChange();
});

// event listener on the copy button
copyBtn.addEventListener('click', () => {
    // triggering only if the value is non empty
    if(passwordDisplay.value)
        copyContent();
});

// event listener for all checkboxes 
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',() => {
        // count again the checkbox clicked
        handleCheckBoxChange();
    });
});

// Main Event listener
generateBtn.addEventListener('click', (e) => {
    // if none of the checkox is selected
    if(checkCount <= 0){
        // console.log("No checkbox selected, returning early.");
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start journey to find the new password
    // console.log("Starting the journey");

    // remove old password
    password = "";

    // let's put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // compulsory addition (km se km ek to selected type ka hona chahiye)
    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]();
    }

    // console.log("Compulsory addition done");

    // remaining addition (bche hue characters randomly add krna)
    for(let i = 0; i < (passwordLength-funcArr.length); i++){
        let randIdx = getRndInteger(0, funcArr.length);
        let randomGenerateFn = funcArr[randIdx];
        // console.log(randomGenerateFn);
        password += randomGenerateFn();
    }

    // console.log("Remaining addition done");

    // shuffling the password
    password = shufflePassword(Array.from(password));

    // console.log("Shuffling done");
    
    // displaying on the UI
    passwordDisplay.value = password;
    
    // console.log("Displaying done");

    // calculating strength
    calcStrength();
});