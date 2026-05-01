'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// enable button only when required fields are valid
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// submit form via Web3Forms without leaving the page
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  formBtn.setAttribute("disabled", "");
  formBtn.querySelector("span").innerText = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formStatus.innerText = "Message sent successfully.";
      formStatus.classList.add("success");
      formStatus.classList.remove("error");

      form.reset();
    } else {
      formStatus.innerText = "Something went wrong. Please try again.";
      formStatus.classList.add("error");
      formStatus.classList.remove("success");
    }
  } catch (error) {
    formStatus.innerText = "Something went wrong. Please try again.";
    formStatus.classList.add("error");
    formStatus.classList.remove("success");
  }

  formBtn.querySelector("span").innerText = "Send Message";

  setTimeout(() => {
    formStatus.innerText = "";
    formStatus.classList.remove("success", "error");
  }, 5000);
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function showPage(pageName) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === pageName) {
      pages[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
    }
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].dataset.target === pageName) {
      navigationLinks[i].classList.add("active");
    } else {
      navigationLinks[i].classList.remove("active");
    }
  }

  window.scrollTo(0, 0);
}

// click navigation
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.dataset.target;
    showPage(targetPage);
    history.replaceState(null, "", "#" + targetPage);
  });
}

// load with hash
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");

  if (hash) {
    showPage(hash);
  } else {
    showPage("about");
  }
});