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

  let 
    activeRoute = null,
    isScrolling = false
  ;
  
  const  
// constants
    CLASSNAME_ACTIVE = "is-active",
// DOMElements
    menuElement = byId("navbar__list"),
    sectionElements = byAll("main section"),
// helpers
    menuActive = new ActiveElement(CLASSNAME_ACTIVE),
    sectionActive = new ActiveElement(CLASSNAME_ACTIVE),

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

    getPositionY = element => 
      window.scrollY + element.getBoundingClientRect().top - menuElement.offsetHeight
    ,

    getPositionX = element => 
      window.scrollX + element.getBoundingClientRect().left
    ,

    isElementInViewport = element => {
      let 
        top = element.offsetTop,
        left = element.offsetLeft,
        width = element.offsetWidth,
        height = element.offsetHeight
      ;

      while(element.offsetParent) {
        element = element.offsetParent;
        top += element.offsetTop;
        left += element.offsetLeft;
      }

      return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
      );
    },

    scrollToElement = element => {
      const from = window.scrollY;
      const to = getPositionY(element);
      const value = from <= to ? from + 50 : from - 50;

      if(Math.abs(from - to) < 50)
        return;

      window.scrollTo(0, value);
      requestAnimationFrame(() => {
        scrollToElement(element);
      });

    },

    activeElementInViewport = () => { 
      for(element of sectionElements) 
        if(isElementInViewport(element)) {
          menuActive.toggle(byId(element.dataset.menu));
          sectionActive.toggle(element);
          return;
        }
    },

    handleMenuClick = e => {
      e.preventDefault();
      const element = e.target;

      if(element.nodeName.toLowerCase().trim() === "a") {
        const sectionElement = byId(element.getAttribute("href").substr(1));
        menuActive.toggle(element);
        scrollToElement(sectionElement);
      }

    },

    handleScroll = e => {
      activeElementInViewport();
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

/**
 * End Main Functions
*/

// Build menu 
  renderMenu();
// Scroll to section on link click
  menuElement.addEventListener("click", handleMenuClick);
  window.addEventListener("scroll", handleScroll);
// Set sections as active
  activeElementInViewport();
});
