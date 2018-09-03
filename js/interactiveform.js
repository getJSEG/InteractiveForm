//Basic Information
const otherTitle = document.querySelector('#other-title');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#mail');
const jobRole = document.querySelector('#title');

///register for Actvities
const labels = document.querySelectorAll('.activities label');
const activities = document.querySelector('.activities');
let itemsSelected = 0;

//T-Shirt Info
const colorOptions = document.querySelectorAll('#color option');
const colorContainer = document.querySelector('#colors-js-puns');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
let itemsFound = 0;

//Payment
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const fieldset = document.querySelector('.payment-info');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const ccNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const CVV = document.querySelector('#cvv');
let zipCodeValue;
let cvvValue;
let ccNumberValue;
let creditCardSelected = true;

///find out where this is used
const form = document.querySelector('form');
const submitButton = document.querySelector('button');

//Regular Expressions
const emailRegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);// cheks for email
const nameRegExp = new RegExp(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/);// checks for first and last name with a space in between first and last
const ccNumberRegExp = new RegExp(/^(\d{4}[- ]){3}\d{4}|\d{16}$/);//checks for a 16 digit credit card number all together or with dashes and spaces separating the (ex. 1234123412341234, 1234-1234-1234-1234 and 1234 1234 1234 1234)
const zipCodeRegExp = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)$/);  //Checks for U.S. zipcode
const cvvRegExp = new RegExp(/^[0-9]{3,4}$/); //Checks for CVV Code(3 or 4 digits Only)
const priceRegExp = new RegExp(/\$(\d+.\d{1,2})/); //Finds the any numbers with the literal Char '$' and/or number following '.' 1 and/or 2 decimal places
const TimeRegExp = new RegExp(/(Monday|Tuesday|Wednesday|Thurday|Friday|Saturday|Sunday)+ (\d{1,2}(am|pm)+\-+\d{1,2}(am|pm))/); //Checks for day of the week and Time in the registration for activites

const basicInfo = () =>{    
    //dont show 'other' field in job role
    otherTitle.style.display = 'none';
    //when page loads set cursor in the name input field
    inputName.autofocus = true;    
    //Setting Place Holder For name And Email
    inputName.setAttribute('placeholder', 'First And Last Name');               
    inputEmail.setAttribute('placeholder', 'JohnM@example.com');  
    
    //Job Role
    //unhides and hides 'other' text field when its selected or unselected
    jobRole.addEventListener('change', (e) => {
        const action = e.target.value;
        //hide other field box the its not selected else show it
        action === 'other' ? otherTitle.style.display = '' :otherTitle.style.display = 'none'; 
    });
}

//T-Shirt Info
//Adds 'change' event listeners and runs function findinItems
const tShirtInfo = () => { design.addEventListener('change', (e) => { findinItems();  });  }

//Removing the color options fromt the T-Shirt Info
const removeElements = () => {
    const colorLength = color.length; 
    colorContainer.style.display = 'none';
    for(let i = 0; i < colorLength; i++){ color.children[0].remove();  }
}

//checks witch item is selected in the design checks witch items from the design field belong in the color field and displays it in the color field
const findinItems = () => { 
    itemsFound = 0;
    //removing option elements and not displaying the color 'selection' field
    removeElements();
    // gets the 'Design' value that the user selects and removes 'Theme -' from the string and sets it to lowercase
    const value = design.selectedOptions[0].innerHTML.replace(/Theme - /g,'').toLowerCase();
    
    const visibleItems = [];
    //looping throught all the shirt Colors
    for(let i = 0; i < colorOptions.length; i++){
        //getting  text content of all shirt colors
        const specificShirts = colorOptions[i].textContent.toLowerCase();
        //search for value of item selected and match it to shirt Colors
        const isFound = specificShirts.search(value);
        //if item is found('isFound' dosen't out put -1)
        if (isFound !== -1){
            //pre-pending item in to 'visibleItem' array
            visibleItems.unshift(colorOptions[i]);
            //adding one every time condition is true
            itemsFound++;
            //displays color select Element
            colorContainer.style.display = '';
            //runs through 'visibleItems' array
            for(let options of visibleItems){                            
                //appens child to 'color' selection element
                color.appendChild(options);
            }
        }
    }
}

const registerForActivities = () => {    
    let totalCost = 0;
    //creating and appeding div container for totalCost and adding a class attribute
    const totalContainer = document.createElement('div');
    activities.appendChild(totalContainer);
    totalContainer.setAttribute('class', 'total');

    totalContainer.textContent = `Total: $${totalCost}.00`;
    for(let label of labels){
        label.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            //getting textContent of the selected element
            const selectedActivity = label.textContent;
            let comparingTime = ''; 
            let selectedTime = '';
            //finds matching regular expression of string and return an array of witch we get the 2nd Element and Parse Float
            let priceForActivity = parseFloat(priceRegExp.exec(selectedActivity)[1]);
            //if item is not null set trim string of 'selectedActivity' to 'selectedTime'
            if(TimeRegExp.test(selectedActivity)) selectedTime = TimeRegExp.exec(selectedActivity)[0];
            //looping though the labels and compare times
            for(let i = 0; i < labels.length; i++){
                //getting textContent of the other labels
                let allActivities = labels[i].textContent;                
                //if item is not null set trim string of 'allActivities' to 'comparingTime'
                if(TimeRegExp.test(allActivities)) comparingTime = TimeRegExp.exec(allActivities)[0];         
                //if ischecked compare selected time and times of other activities are the same and compare if its not the same as the selected checkbox
                //if this is true disable the checkbox and set the text color to gray
                //else if is unchecked undisable checkbox and set text color back to its original color
                if(isChecked && selectedTime === comparingTime && selectedActivity !== allActivities){
                    labels[i].children[0].disabled = true;
                    labels[i].style.color = "#d8d5d5";

                }else if (!isChecked && selectedTime === comparingTime && selectedActivity !== allActivities){
                    labels[i].children[0].disabled = false;
                    labels[i].style.color = "#8a8a8a";
                }
            }
            //if this item is checked add priceForActivity to totalCost else remove the unchecked price from totalCost
            if(isChecked){
                totalCost += priceForActivity; 
                itemsSelected++;
            }else{
                totalCost -= priceForActivity;
                itemsSelected--;
            }
            //showing the total at the bottom of registration activities
            totalContainer.textContent = `Total: $${totalCost}.00`;
        });        
    }
}

const paymentSelection = () => {    
    const options = payment.children;
    //disable 'select payment method'
    options[0].disabled = true;
    //Make 'Credit Card' default payment option
    options[1].setAttribute("selected","selected");
    //showing credit card payment option
    removingPayment('credit card'); 
    
    payment.addEventListener('change', (e) => {
        //get the selected form of payment and passes it to the function
        const selectedOption = payment.selectedOptions[0].value;
        //showing user selected payment option
        removingPayment(selectedOption);   
        disableButton();
    });
}

const removingPayment = (selectedItem) => {
    const paymentMethod = (appedingChild, elementRemoved, elementRemoved2, condition) =>{
        creditCardSelected = condition;
        fieldset.appendChild(appedingChild);
        elementRemoved.remove();
        elementRemoved2.remove();        
    }
    //Gets The Selected Form Of Payment and calls 'paymentMethod' and removes whats not selected and appens what the user selected
    switch(selectedItem){
       case 'credit card':
            paymentMethod(creditCard, paypal, bitcoin, true);
        break;
       case 'paypal':
            paymentMethod(paypal, creditCard, bitcoin, false);
        break;
       case 'bitcoin':
            paymentMethod(bitcoin, creditCard, paypal, false);
        break;
    }
}
//function that has two(2) parameters the DOM Element thats targeted And a boolen witch determines if class attribute is added or removed
const verifiyingCondition = (labelElement, switchCase, inputElement, event) =>{     
       inputElement.addEventListener(event, (e) => {
           //updating and validating condition from the fuction and setting and removing 'error' class
          liveValidation(switchCase) ? labelElement.setAttribute('class', 'error') : labelElement.removeAttribute('class', 'error');
           disableButton();
       });
}
//element conditions to check if everything in enter correctly or filled in
const liveValidation = (cases) => {
    switch(cases){
        case 1:
            return !nameRegExp.test(inputName.value);
        break;
        case 2:
            return !emailRegExp.test(inputEmail.value);
        break;
        case 3:
            return itemsFound === 0;
        break;
        case 4:
            return !itemsSelected >= 1;
        break;
        case 5:
            zipCodeValue = zipCode.value;
            return (!zipCodeRegExp.test(zipCodeValue) || zipCodeValue === '');
        break;
        case 6:
            cvvValue = CVV.value;
            return (!cvvRegExp.test(cvvValue) || cvvValue === '');
        break;
        case 7:
            ccNumberValue = ccNumber.value;
            return (!(ccNumberRegExp.test(ccNumberValue )) || ccNumberValue  === '');
        break;
    }
}

const checkInputFields = () => {
    //selecting labels for name and email
    const nameLabel = form.children[0].children[1];
    const emailLabel = form.children[0].children[3];
    //selecting labels for payment
    const creditCardLabel = form.children[3].children[3].children[0].children[0];
    const zipCodeLabel = form.children[3].children[3].children[1].children[0];
    const CVVLabel = form.children[3].children[3].children[2].children[0];
    //selecting legend 
    const TshirtLegend = form.children[1].children[0];
    const registerLegend = form.children[2].children[0];    
    
    //Name Label
    verifiyingCondition(nameLabel, 1, inputName, 'focusout');
    //Email Label
    verifiyingCondition(emailLabel, 2, inputEmail, 'focusout');
    //T-Shirt Info
    verifiyingCondition(TshirtLegend, 3, design , 'change');
    //Register for activities  
    for(let label of labels){
        verifiyingCondition(registerLegend, 4, label, 'change');
    }
    //Payment Info Credit Card Number
    verifiyingCondition(creditCardLabel, 7, ccNumber, 'focusout');
    //Payment Info Zip Code
    verifiyingCondition(zipCodeLabel, 5, zipCode, 'focusout');    
    //Payment Info CVV
    verifiyingCondition(CVVLabel, 6, CVV, 'focusout');
    
}

const disableButton = () =>{       
    //checking every input field if all of them are filled with the correct information undisable the button
    //else disable button
    if(!liveValidation(1) && !liveValidation(2) && !liveValidation(3) && !liveValidation(4) && ((!liveValidation(5) && !liveValidation(6) && !liveValidation(7)) || creditCardSelected === false)){
       submitButton.disabled = false;
        // 
    } else{ submitButton.disabled = true; }
}

disableButton();

basicInfo();
tShirtInfo();
registerForActivities();

paymentSelection();
checkInputFields();

removeElements();
