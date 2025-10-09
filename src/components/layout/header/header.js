import {
  addTouchAttr,
  addLoadedAttr,
  isMobile,
  slideUp,
  slideDown,
  slideToggle,
  FLS
} from "@js/common/functions.js"
import './header.scss'



document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item');
  const menuItemHasChildren = document.querySelectorAll('.menu-item.menu-item-has-children');
  const mediaQuery = window.matchMedia('(max-width: 48.061em)');
  const isOpenClass = '_open-submenu';

  const isTouchDevice = isMobile.any();

  function hideAllSubMenus() {
    document.querySelectorAll('.sub-menu').forEach(subMenu => {
      slideUp(subMenu, 300);
    });
  }

  function resetSubMenusForDesktop() {
    document.querySelectorAll('.sub-menu').forEach(subMenu => {
      subMenu.removeAttribute('hidden');
      subMenu.classList.remove('--slide');
      subMenu.style.removeProperty('height');
      subMenu.style.removeProperty('overflow');
      subMenu.style.removeProperty('padding-top');
      subMenu.style.removeProperty('padding-bottom');
      subMenu.style.removeProperty('margin-top');
      subMenu.style.removeProperty('margin-bottom');
      subMenu.style.removeProperty('transition-duration');
      subMenu.style.removeProperty('transition-property');
    });
  }

  function toggleSubMenu(parentItem) {
    const subMenu = parentItem.querySelector('.sub-menu');
    if (!subMenu) return;

    if (subMenu.hidden) {
      parentItem.classList.add(isOpenClass);
      slideDown(subMenu, 300);
    } else {
      parentItem.classList.remove(isOpenClass);
      slideUp(subMenu, 300);
    }
  }

  function resetLinksAndEvents() {
    menuItemHasChildren.forEach(parentItem => {
      const oldLink = parentItem.querySelector(':scope > a');
      const newLink = oldLink.cloneNode(true);
      oldLink.replaceWith(newLink);
    });
  }

  function handleBreakpointChange(e) {
    resetLinksAndEvents();

    if (e.matches) {
      // Мобильная ширина
      hideAllSubMenus();
      menuItemHasChildren.forEach(item => item.classList.remove(isOpenClass));

      menuItemHasChildren.forEach(parentItem => {
        const link = parentItem.querySelector(':scope > a');
        link.addEventListener('click', e => {
          e.preventDefault();
          toggleSubMenu(parentItem);
        });
      });
    } else {
      // Десктопная ширина
      resetSubMenusForDesktop();
      menuItemHasChildren.forEach(item => item.classList.remove(isOpenClass));

      menuItemHasChildren.forEach(parentItem => {
        const link = parentItem.querySelector(':scope > a');
        link.addEventListener('click', e => e.preventDefault());

        let openedParent = null;

        if (isTouchDevice) {
          // 📱 Touch-девайсы — клик по ссылке
          link.addEventListener('click', e => {
            e.preventDefault();
            const isOpen = parentItem.classList.contains(isOpenClass);
          
            // Закрываем все перед открытием
            menuItemHasChildren.forEach(item => item.classList.remove(isOpenClass));
          
            if (!isOpen) {
              parentItem.classList.add(isOpenClass);
              openedParent = parentItem; 
            } else {
              openedParent = null;
            }
          });
        
          document.addEventListener('click', e => {
            if (!openedParent) return;
          
            const clickedInside = openedParent.contains(e.target);
            if (!clickedInside) {
              openedParent.classList.remove(isOpenClass);
              openedParent = null;
            }
          });
        } else {
          parentItem.addEventListener('pointerenter', () => {
            parentItem.classList.add(isOpenClass);
          });
          parentItem.addEventListener('pointerleave', () => {
            parentItem.classList.remove(isOpenClass);
          });
        }


      });
    }
  }

  if (menuItems.length > 0) {
    handleBreakpointChange(mediaQuery);
    mediaQuery.addEventListener('change', handleBreakpointChange);
  }
});
