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
function calculateTip() {
    const billValueStr = billinput.value;
const peopleValueStr = numofPeople.value;
const customTipValueStr = customtip.value;
let selectedButtonTipStr = null
const activeButton = document.querySelector('.tip-calculator-btn.active')
if (activeButton) {
selectedButtonTipStr = activeButton.dataset.tip;
}
const billAmount = parseFloat(billValueStr)
const numberOfPeople = parseFloat(peopleValueStr)
const customTipPercent = parseFloat(customTipValueStr)
const selectedButtonTipPercent = selectedButtonTipStr ? parseFloat(selectedButtonTipStr) : null;

let actualTipPercent = 0
if (!isNaN(customTipPercent) && customTipPercent >= 0) {
    actualTipPercent = customTipPercent
}else if (selectedButtonTipPercent !== null && !isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
    actualTipPercent = selectedButtonTipPercent
}
let totalTipAmount = 0
if (!isNaN(billAmount) && billAmount >= 0) {
    totalTipAmount = billAmount * (actualTipPercent / 100)
}
const totalBillAmount = billAmount + totalTipAmount
let tipAmountPerPerson = 0
if (!isNaN(totalTipAmount) && !isNaN(numberOfPeople) && numberOfPeople > 0) {
    tipAmountPerPerson = totalTipAmount / numberOfPeople
}
let totalAmountPerPerson = 0
if (!isNaN(totalBillAmount) && !isNaN(numberOfPeople) && numberOfPeople > 0) {
    totalAmountPerPerson = totalBillAmount / numberOfPeople
}
console.log({ // Logging as an object for better readability in console
        billAmount,
        numberOfPeople,
        actualTipPercent,
        totalTipAmount,
        totalBillAmount,
        tipAmountPerPerson,
        totalAmountPerPerson
    });
}