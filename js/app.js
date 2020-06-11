/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: 
 *  by.js 
 *  AcitveElement.js
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

  let activeRoute = null;
  
  const  
// constants
    CLASSNAME_ACTIVE = "is-active",
// DOMElements
    menuElement = byId("navbar__list"),
    sectionElements = byAll("main section"),
// helpers
    menuActive = new ActiveElement(CLASSNAME_ACTIVE),

/**
* End Global Variables
* Start Helper Functions
* 
*/

    sanitizePath = path =>
      path
        .replace(/\/$/, "")
        .replace(/^\//, "")
        .replace(/^#/, "")
    ,

    goTo = (route) =>
      window.history.pushState(null, null, "/" + route)
    ,

    getRoute = () =>
      sanitizePath(decodeURI(window.location.pathname + window.location.search))
    ,

    getPositionY = element => 
      window.scrollY + element.getBoundingClientRect().top - menuElement.offsetHeight
    ,

    getPositionX = element => 
      window.scrollX + element.getBoundingClientRect().left
    ,

    scrollToElement = element =>
      scrollTo(0, getPositionY(element))
    ,

    handleMenuClick = e => {
      e.preventDefault();
      const element = e.target;

      if(element.nodeName.toLowerCase().trim() === "a") {
        const path = sanitizePath(element.getAttribute("href"));
        menuActive.toggle(element);
        goTo(path);
      }

    },

    handleRouteChange = () => {
      const route = getRoute();
      if(activeRoute === route)
        return;

      activeRoute = route;
      const element = byId(route);
      
      if(element) {
        menuActive.toggle(byId(element.dataset.menu));
        scrollToElement(element);
      }
    },

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/ 

    renderMenuLink = ({id, href, text}) => {
      const element = document.createElement("a");
      element.classList.add("menu__link");
      element.setAttribute("href", href);
      element.setAttribute("id", id);
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
      for(element of sectionElements){
        const id = element.id.toString().trim().replace("section", "menu");
        element.dataset.menu = id;
        fragment.appendChild(
          renderMenuItem({
            id,
            "href": `#${element.id}`,
            "text": element.dataset.nav
          })
        );
      }
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
  menuElement.addEventListener("click", handleMenuClick);

  setInterval(handleRouteChange, 50);

});
