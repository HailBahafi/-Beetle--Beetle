/* Toggle Hamburger Menu Function */
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const dropdownBtn = document.querySelectorAll(".dropdown-btn");
  const dropdown = document.querySelectorAll(".dropdown");
  const links = document.querySelectorAll(".dropdown a");

  // Function to toggle hamburger menu and handle dropdowns
  function toggleHamburger() {
    const isMenuShown = menu.classList.contains('show');
    menu.classList.toggle('show');
    hamburgerBtn.classList.toggle('active', !isMenuShown);
  }

  // Function to close all dropdown menus
  function closeDropdownMenu() {
    dropdown.forEach((drop) => {
      drop.classList.remove("active");
    });
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }

  hamburgerBtn.addEventListener("click", function() {
    toggleHamburger();
    closeDropdownMenu();
  });

   /* Dropdown Menu Functionality */
  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
      const isOpen = dropdownElement.classList.contains('active');
      
      closeDropdownMenu();
      
      if (!isOpen) {
        dropdownElement.classList.add('active');
        btn.setAttribute("aria-expanded", "true");
      }
      e.stopPropagation();
    });
  });

  /* Close Dropdown When Link Inside Is Clicked */
  links.forEach((link) => {
    link.addEventListener("click", function () {
      closeDropdownMenu();
      if (menu.classList.contains('show')) {
        toggleHamburger();
      }
    });
  });

  /* Clicking Outside Closes Dropdowns */
  document.documentElement.addEventListener("click", closeDropdownMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdownMenu();
      if (menu.classList.contains('show')) {
        toggleHamburger();
      }
    }
  });

});


/* Auto-Switch Hero Section Text */
  document.addEventListener('DOMContentLoaded', function() {
    const texts = document.querySelectorAll('.text-item');
    const buttons = document.querySelectorAll('.nav-button');
    let currentIndex = 0;

    const switchText = (index) => {
      texts.forEach((text, i) => {
        if (i === index) {
          text.classList.add('active');
        } else {
          text.classList.remove('active');
        }
      });

      buttons.forEach((button, i) => {
        if (i === index) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };

    const autoSwitch = () => {
      currentIndex = (currentIndex + 1) % texts.length;
      switchText(currentIndex);
    };

    let interval = setInterval(autoSwitch, 8000);

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = index;
        switchText(currentIndex);
        interval = setInterval(autoSwitch, 5000);
      });
    });
  });


 /* Initialize Range Sliders */
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach((slider) => {
    const rangeThumb = slider.querySelector(".range__thumb"),
          rangeNumber = slider.querySelector(".range__value-number"),
          rangeLine = slider.querySelector(".range__slider-line"),
          rangeInput = slider.querySelector(".range__input");

    const rangeInputSlider = () => {
      rangeNumber.textContent = rangeInput.value;

      const thumbPosition = rangeInput.value / rangeInput.max,
            space = rangeInput.offsetWidth - rangeThumb.offsetWidth;

      rangeThumb.style.left = (thumbPosition * space) + 'px';
      rangeLine.style.width = rangeInput.value + '%';
    };

    rangeInput.addEventListener('input', rangeInputSlider);

    rangeInputSlider();
  });
});


 /* Calculate New Signals */
function calculateNewSignals() {
  const numTeamMembers = document.getElementById('numTeamMembers').value || 0;
  const sizeOfNetwork = document.getElementById('sizeOfNetwork').value || 0;
  const numSignals = document.getElementById('numSignals').value || 0;
  const percentLegitimate = document.getElementById('percentLegitimate').value / 100 || 0;
  const percentUnique = document.getElementById('percentUnique').value / 100 || 0;

  const numNewSignals = numTeamMembers * sizeOfNetwork * numSignals * percentLegitimate * percentUnique;

  document.getElementById('numNewSignals').value = numNewSignals.toFixed(2);
}

document.getElementById('numTeamMembers').addEventListener('input', calculateNewSignals);
document.getElementById('sizeOfNetwork').addEventListener('input', calculateNewSignals);
document.getElementById('numSignals').addEventListener('input', calculateNewSignals);
document.getElementById('percentLegitimate').addEventListener('input', calculateNewSignals);
document.getElementById('percentUnique').addEventListener('input', calculateNewSignals);

document.addEventListener('DOMContentLoaded', calculateNewSignals);


/* Filter Posts Based on Categories */
$(document).ready(function() {
  $('.posts-section-menu ul li').click(function() {
      var filterValue = $(this).text().trim();
      $('.article').each(function() {
          var category = $(this).find('h6').text().trim();
          if (filterValue === 'All') {
              $(this).show();
          } else if (category === filterValue) {
              $(this).show();
          } else {
              $(this).hide();
          }
      });
  });


   /* Search Functionality in Posts */
  $('.posts-section-search input').on('keyup', function() {
      var searchTerm = $(this).val().toLowerCase();
      $('.article').each(function() {
          var title = $(this).find('h5').text().toLowerCase();
          var content = $(this).find('p').text().toLowerCase();
          if (title.includes(searchTerm) || content.includes(searchTerm)) {
              $(this).show();
          } else {
              $(this).hide();
          }
      });
  });
});


/* Load More Posts Functionality */
$(document).ready(function(){
  $(".article").hide(); 
  $(".article:lt(5)").show();

  $("#load-more-conainer").on("click", function(e){ 
    e.preventDefault();
    var hiddenArticles = $(".article:hidden").slice(0, 4);
    hiddenArticles.slideDown();
  });
});