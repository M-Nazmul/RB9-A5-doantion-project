let mainBalance = 5500;

const currentDonations = {
    noakhali: 0,
    feni: 0,
    quota: 0,
};

function makeDonation(section) {
    let donationInput, donationTitle, currentDonationDisplay;

    if (section === 'noakhali') {
        donationInput = document.getElementById('donation-noakhali');
        donationTitle = 'Noakhali';
        currentDonationDisplay = document.getElementById('current-noakhali');
    } else if (section === 'feni') {
        donationInput = document.getElementById('donation-feni');
        donationTitle = 'Feni';
        currentDonationDisplay = document.getElementById('current-feni');
    } else if (section === 'quota') {
        donationInput = document.getElementById('donation-quota');
        donationTitle = 'Quota';
        currentDonationDisplay = document.getElementById('current-quota');
    }

    const donationAmount = parseFloat(donationInput.value);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount");
        return;
    }

    if (donationAmount > mainBalance) {
        alert("Donation amount exceeds the main balance");
        return;
    }

    mainBalance -= donationAmount;

    document.getElementById('main-balance').textContent = mainBalance;


    currentDonations[section] += donationAmount;
    currentDonationDisplay.textContent = currentDonations[section];

    addDonationToHistory(donationAmount, donationTitle);


    showModal();

    donationInput.value = '';
}

function addDonationToHistory(amount, title) {
    const historyList = document.getElementById('donation-history');
    const newDonation = document.createElement('li');


    const donationTitle = document.createElement('strong');
    donationTitle.textContent = `${amount} Taka is Donated for ${title}`;

    const donationDate = document.createElement('p');
    donationDate.style.fontSize = '0.9em';
    donationDate.style.color = 'gray';


    const now = new Date();
    const formattedDate = `Date: ${now.toString()}`;
    donationDate.textContent = formattedDate;


    newDonation.appendChild(donationTitle);
   
    newDonation.appendChild(document.createElement('br')); 
    newDonation.appendChild(donationDate);


    if (historyList.children[0].textContent === "No donations yet.") {
        historyList.innerHTML = '';
    }


    historyList.appendChild(newDonation);
    
}

function showModal() {
    const modal = document.getElementById('congrats-modal');
    modal.style.display = 'flex';  // Display modal as flexbox to center it
}

function closeModal() {
    const modal = document.getElementById('congrats-modal');
    modal.style.display = 'none';  // Hide modal
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById('congrats-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
