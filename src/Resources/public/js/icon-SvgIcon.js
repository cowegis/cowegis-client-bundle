(window.webpackJsonp=window.webpackJsonp||[]).push([["icon-SvgIcon"],{FhJM:function(n,e,o){"use strict";o.r(e);var c=o("4R65");e.default=c.DivIcon.extend({options:{iconSize:[26,40],iconAnchor:[13,40],popupAnchor:[0,-41],className:"cowegis-icon",extraIconClasses:"",extraDivClasses:"",bgColor:"#80c22a",color:"#fff",pinViewBox:"0 0 26 40",pinPath:"M12.594 1.323C6.021 1.323.55 7.014.55 13.19c0 2.778 1.564 6.308 2.694 8.746l9.306 17.872 9.262-17.872c1.13-2.438 2.738-5.79 2.738-8.746 0-6.175-5.383-11.866-11.956-11.866z",size:"medium"},createIcon:function(n){var e=n&&"DIV"===n.tagName?n:document.createElement("div"),o=this.options;return e.className=o.className,o.extraDivClasses&&(e.className+=" "+o.extraDivClasses),e.innerHTML='<svg width="'.concat(o.iconSize[0],'px" \n            height="').concat(o.iconSize[1],'px" \n            viewBox="').concat(o.pinViewBox,'" \n            version="1.1" \n            xmlns="http://www.w3.org/2000/svg" \n            xmlns:xlink="http://www.w3.org/1999/xlink"\n            class="cowegis-marker-pin">\n            <path d="').concat(o.pinPath,'" fill="').concat(o.bgColor,'"></path>\n        </svg>'),this._createSymbol(e,o),this._setIconStyles(e,"icon"),e},_createSymbol:function(n,e){if(e.html){var o=document.createElement("span");o.classList.add("cowegis-marker-content"),o.innerHTML=e.html,e.color&&(o.style.color=e.color),n.appendChild(o)}}})}}]);