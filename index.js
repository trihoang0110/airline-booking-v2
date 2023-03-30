window.addEventListener('scroll', () =>{
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY >0);
});

rangeControl = (rangeSelector, valueSelector) => {
    const input = document.querySelector(rangeSelector);
    const value = document.querySelector(valueSelector);
    input.addEventListener("input", function () {
        value.textContent = this.value
    });
};

rangeControl("#no-tickets", ".ticket-value")
rangeControl("#baggage", ".weight")




const form = document.querySelector("#booking-form")

const requiredInputs = ['full-name', 'phone-number', 'email', 'birth-date', 'departure-date']
const dropDownInputs = ['region', 'route']

function isValidEmail(email, validFeedback) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        validFeedback.innerHTML = "Looks good!";
        validFeedback.style.color = "green";
    }else{
        validFeedback.innerHTML = "Invalid email!";
        validFeedback.style.color = "red";
    }
}

function isValidPhoneNumber(phoneNumber, validFeedback) {
    const phoneRegex = /^\d{10}$/;
    if (phoneRegex.test(phoneNumber)) {
        validFeedback.innerHTML = "Looks good!";
        validFeedback.style.color = "green";
    }else{
        validFeedback.innerHTML = "Invalid phone number!";
        validFeedback.style.color = "red";
    }
}


const checkRequiredInputs = function (id) {
    let formInput = document.querySelector(`#${id}`)
    let validFeedback = document.querySelector(`#${id} + div`)
    if (formInput.value !== "") {
        if (id === 'email') {
            isValidEmail(formInput.value, validFeedback)         
        }else if (id === 'phone-number') {
            isValidPhoneNumber(formInput.value, validFeedback)         
        }else {
            validFeedback.innerHTML = "Looks good!";
            validFeedback.style.color = "green";
        }
    }else if(formInput.value === ""){
        validFeedback.innerHTML = "Please fill this info!";
        validFeedback.style.color = "red";
    };

};


const handleDropDownInputs = function(id) {
    let DropDownBtn = document.querySelector(`#${id}`)
    let validFeedback = document.querySelector(`#${id} + div`)
    if (DropDownBtn.textContent.startsWith("You")) {
        validFeedback.innerHTML = "Looks good!";
        validFeedback.style.color = "green"; 
    }else{
        validFeedback.innerHTML = "Please select destination!";
        validFeedback.style.color = "red";
    }

}

// modal 
const modal = document.querySelector("#myModal");
const closeModal = document.querySelector(".close-button");
const openModal = document.querySelector(".open-button");

closeModal.addEventListener("click", () => {
    modal.close();
});


form.addEventListener('submit', function (e) {
    e.preventDefault()
    requiredInputs.forEach(id => {
        checkRequiredInputs(id);
    });

    dropDownInputs.forEach(id => {
        handleDropDownInputs(id);
    });
    const validCheck = Array.from(document.querySelectorAll(".valid")).every((div) => div.textContent==="Looks good!");
    if (validCheck){
        modal.showModal();
    } 
   
});

// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");

// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
    // Add an event listener that runs a function when the "click" event is triggered
    star.addEventListener("click", () => {
        // Loop through the "stars" NodeList Again
        stars.forEach((star, index2) => {
            // Add the "active" class to the clicked star and any stars with a lower index
            // and remove the "active" class from any stars with a higher index
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});




regionRouteMap = {
    'Region 2': ["A", 'B', 'F'],
    'Region 5': ["A", 'E', 'F'],
    'Region 6': ["A", 'C', 'D']
}

const regionBtn = document.querySelector("#region")
const routeBtn = document.querySelector("#route")

const regionItems =  document.querySelectorAll(".region-item")
// const routeItems =  document.querySelectorAll(".route-item")

const routeMenu =  document.querySelector(".route-menu")


regionItems.forEach(region => {
    region.addEventListener('click', function () {
        removeRouteItems();
        console.log(region.textContent);
        regionBtn.innerHTML = `You choose ${region.textContent} `;
        const routes = regionRouteMap[region.textContent];
        for (let i = 0; i < routes.length; i++) {
            const li = document.createElement('li');
            li.textContent = `Route ${routes[i]}`;
            li.classList.add("dropdown-item", "route-item");
            routeMenu.appendChild(li);
            
            li.addEventListener('click', function () {
                console.log(region.textContent);
                routeBtn.innerHTML = `You choose ${li.textContent} `;
            })
        }        
    });
});

// routeItems.forEach(route => {
//     region.addEventListener('click', function () {

//     });
// });


function removeRouteItems() {
    const routeItems = document.querySelectorAll('.route-item');
    routeItems.forEach((item) => {
      item.remove();
    });
  }


// departure Date handling
const todayDate = new Date();

const aYearFromToday = new Date(todayDate.getTime())
aYearFromToday.setFullYear(aYearFromToday.getFullYear() + 1);

const departureDate = document.querySelector('#departure-date')

departureDate.setAttribute("min", todayDate.toISOString().slice(0,10));
departureDate.setAttribute("max", aYearFromToday.toISOString().slice(0,10));



function scrollToElement() {
    const element = document.querySelector(".target-element");
    element.scrollIntoView({behavior: 'smooth',  block: "start", inline: "start"});
  }


