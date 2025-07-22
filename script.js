const billinput=document.getElementById("bill")
const tipbutton=document.querySelectorAll(".tip-calculator-btn")
const customtip=document.getElementById("custom-tip")
const numofPeople=document.getElementById("num-people")
const tipamountdisplay=document.getElementById("tip-amount-display")
const totalamountdisplay=document.getElementById("total-amount-display")
const resetbtn=document.getElementById("reset-button")

billinput.addEventListener('input',calculateTip)

tipbutton.forEach(button=>{
    button.addEventListener('click',event=>{
        const clickedButton = event.target  
        const tipPercentage = clickedButton.dataset.tip;
        tipbutton.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        customtip.value = '';
        calculateTip();   
    })
})

customtip.addEventListener('input', ()=>{
    tipbutton.forEach(btn => btn.classList.remove('active'));
    calculateTip();
})

numofPeople.addEventListener('input',calculateTip)

if (resetbtn) {
    resetbtn.addEventListener('click', () => {
        resetCalculator()
    });
} else {
    console.error('Error: Reset button element not found. Cannot add event listener.');
}


function calculateTip() {
    const billValueStr = billinput.value;
    const peopleValueStr = numofPeople.value;
    const customTipValueStr = customtip.value;
    let selectedButtonTipStr = null;
    const activeButton = document.querySelector('.tip-calculator-btn.active');
    if (activeButton) {
        selectedButtonTipStr = activeButton.dataset.tip;
    }
    const billAmount = parseFloat(billValueStr);
    const numberOfPeople = parseFloat(peopleValueStr);
    const customTipPercent = parseFloat(customTipValueStr);

    const isBillValid = !isNaN(billAmount) && billAmount >= 0;
    const isCustomTipInputValid = customTipValueStr === '' || (!isNaN(customTipPercent) && customTipPercent >= 0);
    const isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0 && Number.isInteger(numberOfPeople);

    let actualTipPercent = 0;
    if (customTipValueStr !== '' && !isNaN(customTipPercent) && customTipPercent >= 0) { 
        actualTipPercent = customTipPercent;
    } else if (customTipValueStr === '' && activeButton) { 
        // Use activeButton.dataset.tip directly
        const selectedButtonTipPercent = parseFloat(activeButton.dataset.tip);
        if (!isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
            actualTipPercent = selectedButtonTipPercent;
        }
    }
const isTipValid = !isNaN(actualTipPercent) && actualTipPercent >= 0
let totalTipAmount = 0;
    if (isBillValid && isTipValid) { 
        totalTipAmount = billAmount * (actualTipPercent / 100);
    }
const totalBillAmount = billAmount + totalTipAmount

let tipAmountPerPerson = 0
let totalAmountPerPerson = 0
if (isBillValid && isTipValid && isPeopleValid) { 
        tipAmountPerPerson = totalTipAmount / numberOfPeople;
        totalAmountPerPerson = totalBillAmount / numberOfPeople;
    } else {
    tipAmountPerPerson = 0
    totalAmountPerPerson = 0
}
const formattedTipAmount = tipAmountPerPerson.toFixed(2)
const formattedTotalAmount = totalAmountPerPerson.toFixed(2)

const displayTipAmount = `$${formattedTipAmount}`
const displayTotalAmount = `$${formattedTotalAmount}`

if (tipamountdisplay) { 
        tipamountdisplay.textContent = displayTipAmount;
} else {
        console.error('Error: tipAmountDisplay element not found in the DOM.');
}
if (totalamountdisplay) { 
        totalamountdisplay.textContent = displayTotalAmount;
    } else {
        console.error('Error: totalAmountDisplay element not found in the DOM.');
    }

    if (billinput) {
        billinput.classList.toggle('error', !isBillValid)
    }
    if (numofPeople) {
        numofPeople.classList.toggle('error', !isPeopleValid)
    }
    if (customtip) {
        customtip.classList.toggle('error', !isCustomTipInputValid)
    }
}
function resetCalculator() {
    if (billinput) {
        billinput.value = '';
    }
    if (customtip) {
        customtip.value = '';
    }
    if(tipbutton&& tipbutton.length > 0) {
        tipbutton.forEach(button => {
        button.classList.remove('active');
    })
    }
    if (numofPeople) {
        numofPeople.value = '';
    }
    if (tipamountdisplay) {
        tipamountdisplay.textContent = '$0.00';
    }
    if (totalamountdisplay) {
        totalamountdisplay.textContent = '$0.00';
    }
    if (billinput) {
        billinput.classList.remove('error');
    }
    if (numofPeople) {
        numofPeople.classList.remove('error');
    }
    if (customtip) {
        customtip.classList.remove('error');
    }
}

document.addEventListener('DOMContentLoaded', calculateTip)