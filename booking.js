document.addEventListener('DOMContentLoaded', function () {
    let currentBooking = '';
    let currentAdventureBooking = '';
    let currentCost = 0;
    let overallBooking = '';
    let overallCost = 0;
    let loyaltyPoints = 0;

    let roomType = document.getElementById('room-type');
    let numAdults = document.getElementById('num-adults');
    let numChildren = document.getElementById('num-children');
    let arrivalDate = document.getElementById('arrival-date');
    let departureDate = document.getElementById('departure-date');
    let wifi = document.getElementById('wifi');
    let view = document.getElementById('view');
    let promoCode = document.getElementById('promo-code');
    let phoneNumber = document.getElementById('phone-number');
    let bed = document.getElementById('bed');

    let current_booking = document.getElementById('current-booking');
    let current_cost = document.getElementById('current-cost');

    let overall_booking = document.getElementById('overall-booking');
    let overall_cost = document.getElementById('overall-cost');

    let adventureTypeSelect = document.getElementById('adventure-type');
    let numAdultsAdventure = document.getElementById('num-adults-adventure');
    let numChildrenAdventure = document.getElementById('num-children-adventure');
    let guideNeededAdventure = document.getElementById('guide-needed-adventure');

    let currentAdventureBookingDetails = document.getElementById('current-adventure-booking-details');
    let currentAdventureCost = document.getElementById('current-adventure-cost');

    let confirmationMessage = document.getElementById('confirmation-message');

    numAdults.addEventListener('change', updateDisplay);
    roomType.addEventListener('change', updateDisplay);
    numChildren.addEventListener('change', updateDisplay);
    arrivalDate.addEventListener('change', updateDisplay);
    departureDate.addEventListener('change', updateDisplay);
    wifi.addEventListener('change', updateDisplay);
    view.addEventListener('change', updateDisplay);
    phoneNumber.addEventListener('change', updateDisplay);
    bed.addEventListener('change', updateDisplay);
    promoCode.addEventListener('input', updateDisplay); // Add event listener for promo code input

    adventureTypeSelect.addEventListener('change', updateDisplayAdventure);
    numAdultsAdventure.addEventListener('change', updateDisplayAdventure);
    numChildrenAdventure.addEventListener('change', updateDisplayAdventure);
    guideNeededAdventure.addEventListener('change', updateDisplayAdventure);

    function updateDisplay(event) {
        let room = roomType.value;
        let room_price;

        if (room === 'single') {
            room_price = 25000;
        } else if (room === 'double') {
            room_price = 35000;
        } else if (room === 'triple') {
            room_price = 40000;
        }

        let child_amount = numChildren.value * 5000;
        let bed_price = bed.checked ? 8000 : 0;

        const arrival = new Date(arrivalDate.value);
        const departure = new Date(departureDate.value);
        const duration = Math.ceil((departure - arrival) / (1000 * 60 * 60 * 24));

        const totalRoomCost = room_price * numAdults.value * duration + child_amount + bed_price + (wifi.checked ? 0 : 0) + (view.value === 'pool' ? 1000 : view.value === 'garden' ? 500 : 0);

        // Apply promo code discount if valid
        const promoDiscount = promoCode.value === 'promo123' ? 0.05 : 0; // 5% discount if promo code is "promo123"
        const discountedRoomCost = totalRoomCost * (1 - promoDiscount);

        currentBooking = `Room Type: ${roomType.value}, Adults: ${numAdults.value}, Children: ${numChildren.value}, Arrival: ${arrivalDate.value}, Departure: ${departureDate.value}, Duration: ${duration} days, WiFi: ${wifi.checked ? 'Yes' : 'No'}, View: ${view.value}`;
        currentCost = discountedRoomCost;
        current_cost.innerHTML = `<h2>Current Booking</h2>${currentBooking}<p>Cost: ${currentCost} LKR</p>`;

        // Update current adventure booking details
        updateDisplayAdventure();
    }

    function bookNow() {
        console.log("Book Now function called!");
        localStorage.setItem('phoneNumber', phoneNumber.value);

        let roomCost = 0;
        switch (roomType.value) {
            case 'single':
                roomCost = 25000;
                break;
            case 'double':
                roomCost = 35000;
                break;
            case 'triple':
                roomCost = 40000;
                break;
            default:
                roomCost = 0;
        }

        // Initialize currentCost and currentAdventureCost to roomCost
        currentCost = roomCost;
        currentAdventureCost = 0;

        const combinedCost = currentCost + currentAdventureCost;
        overallBooking += currentBooking + '<br>' + currentAdventureBooking + '<br>';
        overallCost += combinedCost;

        current_booking.innerHTML = `<h2>Current Booking</h2>${currentBooking}<p>Cost: ${currentCost} LKR</p>`;
        overall_booking.innerHTML = `<h2>Overall Booking</h2>${overallBooking}<p>Cost: ${overallCost} LKR</p>`;

        // Display confirmation message using alert
        const confirmationMessage = `Thank you for booking!\nYour overall cost is ${overallCost} LKR.`;
        alert(confirmationMessage);

        // Clear current booking and cost
        currentBooking = '';
        currentCost = 0;

        // Clear current adventure booking and cost
        currentAdventureBooking = '';
        currentAdventureCost = 0;
    }

    function bookAdventure() {
        const adventureType = adventureTypeSelect.value;
        const numAdults = parseInt(numAdultsAdventure.value, 10);
        const numChildren = parseInt(numChildrenAdventure.value, 10);
        const guideNeeded = guideNeededAdventure.checked;

        const adventureCosts = {
            divingLocalAdult: 5000,
            divingLocalKids: 2000,
            divingForeignAdult: 10000,
            divingForeignKids: 5000,
            guideCostAdult: 1000,
            guideCostKid: 500
        };

        const totalAdventureCost =
            numAdults * (adventureType.includes('Adult') ? adventureCosts[adventureType] : 0) +
            numChildren * (adventureType.includes('Kids') ? adventureCosts[adventureType] : 0) +
            (guideNeeded ? (numAdults * adventureCosts.guideCostAdult + numChildren * adventureCosts.guideCostKid) : 0);

        currentAdventureBooking = `${adventureType} - Adults: ${numAdults}, Children: ${numChildren}, Guide Needed: ${guideNeeded ? 'Yes' : 'No'}`;
        currentCost = totalAdventureCost;

        overallBooking += currentAdventureBooking + '<br>';
        overallCost += totalAdventureCost;

        currentAdventureBookingDetails.innerHTML = `<h2>Current Adventure Booking</h2>${currentAdventureBooking}<p>Cost: ${currentCost} LKR</p>`;
        overall_booking.innerHTML = `<h2>Overall Booking</h2>${overallBooking}<p>Cost: ${overallCost} LKR</p>`;

        // Display confirmation message
        confirmationMessage.innerHTML = `<h2>Thank you for booking!</h2>Your overall cost is ${combinedCost} LKR.`;

        // Clear current adventure booking and cost
        currentAdventureBooking = '';
        currentCost = 0;
    }

    function updateDisplayAdventure() {
        const adventureType = adventureTypeSelect.value;
        const numAdults = parseInt(numAdultsAdventure.value, 10);
        const numChildren = parseInt(numChildrenAdventure.value, 10);
        const guideNeeded = guideNeededAdventure.checked;

        const adventureCosts = {
            divingLocalAdult: 5000,
            divingLocalKids: 2000,
            divingForeignAdult: 10000,
            divingForeignKids: 5000,
            guideCostAdult: 1000,
            guideCostKid: 500
        };

        const totalAdventureCost =
            numAdults * (adventureType.includes('Adult') ? adventureCosts[adventureType] : 0) +
            numChildren * (adventureType.includes('Kids') ? adventureCosts[adventureType] : 0) +
            (guideNeeded ? (numAdults * adventureCosts.guideCostAdult + numChildren * adventureCosts.guideCostKid) : 0);

        currentAdventureBooking = `${adventureType} - Adults: ${numAdults}, Children: ${numChildren}, Guide Needed: ${guideNeeded ? 'Yes' : 'No'}`;
        currentCost = totalAdventureCost;

        currentAdventureBookingDetails.innerHTML = `<h2>Current Adventure Booking</h2>${currentAdventureBooking}<p>Cost: ${currentCost} LKR</p>`;
    }

    function checkLoyaltyPoints() {
        alert(`Your current loyalty points: ${loyaltyPoints}`);
    }

    // Function to add the current booking to favorites
function addToFavorites() {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing favorites or initialize an empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Add the current booking to favorites (you can customize this)
        let favoriteBooking = {
            currentBooking: currentBooking,
            currentCost: currentCost,
            currentAdventureBooking: currentAdventureBooking,
            currentAdventureCost: currentAdventureCost,
            overallBooking: overallBooking,
            overallCost: overallCost
        };

        favorites.push(favoriteBooking);

        // Store the updated favorites back in local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Inform the user
        alert('Added to Favorites!');
    } else {
        // Local storage not supported, handle accordingly
        alert('Local storage is not supported on your browser. Unable to add to favorites.');
    }
}

    let bookNowButton = document.getElementById('book-now-button');
    if (bookNowButton) {
        bookNowButton.addEventListener('click', bookNow);
    }

    let checkLoyaltyButton = document.getElementById('check-loyalty-button');
    if (checkLoyaltyButton) {
        checkLoyaltyButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent page refresh
    
            checkLoyaltyPoints();
        });
    }
    let addToFavoritesButton = document.getElementById('add-to-favorites-button');
    if (addToFavoritesButton) {
        addToFavoritesButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent page refresh
            addToFavorites();
        });
    }
});
