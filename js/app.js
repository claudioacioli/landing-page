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
    navBarElement = byId("navbar__list"),
    sectionElements = byAll("main section")
  ;

/**
* End Global Variables
* Start Helper Functions
* 
*/

  const 

    renderNavLink = ({href, text}) => {
      const element = document.createElement("a");
      element.setAttribute("href", href);
      element.textContent = text;
      return element;
    },

    renderNavItem = attr => {
      const element = document.createElement("li");
      element.appendChild(renderNavLink(attr));
      return element;
    },

    renderNavBar = () => {
      const fragment = document.createDocumentFragment();
      sectionElements.forEach(element =>
        fragment.appendChild(
          renderNavItem({
            "href": `#${element.id}`,
            "text": element.dataset.nav
          })
        )
      );
      navBarElement.appendChild(fragment);
    }
  ;

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
  
  renderNavBar();

// Scroll to section on link click

// Set sections as active

});
