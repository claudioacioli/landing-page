/**
 * Wrapper to acces the DOM elements
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
*/

/**
 * Start Wrapper Functions
 *
*/
const 
  
  byId = (id, parent=document) =>
    parent.getElementById(id)
  ,

  bySelector = (selector, parent=document) =>
    parent.querySelector(selector)
  ,

  byAll = (selector, parent=document) => 
    parent.querySelectorAll(selector)
  ,

  byName = (name, parent=document) =>
    parent.getElementsByName(name)
  ,

  byClassName = (name, parent=document) =>
    parent.getElementsByClassName(name)
  ,

  byTag = (tag, parent=document) =>
    parent.getElementsByTagName(tag)
;
