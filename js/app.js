/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

document.addEventListener("DOMContentLoaded", e => {

/**
* Define Global Variables
* 
*/

  const 
    menuElement = byId("navbar__list"),
    sectionElements = byAll("main section")
  ;

/**
* End Global Variables
* Start Helper Functions
* 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

  const 

    renderMenuLink = ({href, text}) => {
      const element = document.createElement("a");
      element.classList.add("menu__link");
      element.setAttribute("href", href);
      element.textContent = text;
      return element;
    },

    renderMenuItem = attr => {
      const element = document.createElement("li");
      element.appendChild(renderMenuLink(attr));
      return element;
    },

    renderMenu = () => {
      const fragment = document.createDocumentFragment();
      sectionElements.forEach(element =>
        fragment.appendChild(
          renderMenuItem({
            "href": `#${element.id}`,
            "text": element.dataset.nav
          })
        )
      );
      menuElement.appendChild(fragment);
    }
  ;


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
  
  renderMenu();

// Scroll to section on link click

// Set sections as active

});
