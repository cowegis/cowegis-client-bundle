(window.webpackJsonp=window.webpackJsonp||[]).push([["icon-svgIconFactory","icon-SvgIcon"],{LoEh:function(o,n,e){"use strict";e.r(n);var s=e("ko8L"),t=e("4R65");n.default=function(o,n,e){const c=t.Util.extend({},o.options);return n["marker-color"]&&(c.bgColor=n["marker-color"]),n["symbol-color"]&&(c.color=n["symbol-color"]),new s.default(c)}},ko8L:function(o,n,e){"use strict";e.r(n);var s=e("4R65");n.default=s.DivIcon.extend({options:{iconSize:[26,40],iconAnchor:[13,40],popupAnchor:[0,-41],className:"cowegis-icon",extraIconClasses:"",extraDivClasses:"",bgColor:"#80c22a",color:"#fff",pinViewBox:"0 0 26 40",pinPath:"M12.594 1.323C6.021 1.323.55 7.014.55 13.19c0 2.778 1.564 6.308 2.694 8.746l9.306 17.872 9.262-17.872c1.13-2.438 2.738-5.79 2.738-8.746 0-6.175-5.383-11.866-11.956-11.866z",size:"medium"},createIcon:function(o){const n=o&&"DIV"===o.tagName?o:document.createElement("div"),e=this.options;return n.className=e.className,e.extraDivClasses&&(n.className+=" "+e.extraDivClasses),n.innerHTML=`<svg width="${e.iconSize[0]}px" \n            height="${e.iconSize[1]}px" \n            viewBox="${e.pinViewBox}" \n            version="1.1" \n            xmlns="http://www.w3.org/2000/svg" \n            xmlns:xlink="http://www.w3.org/1999/xlink"\n            class="cowegis-marker-pin">\n            <path d="${e.pinPath}" fill="${e.bgColor}"></path>\n        </svg>`,this._createSymbol(n,e),this._setIconStyles(n,"icon"),n},_createSymbol(o,n){if(n.html){const e=document.createElement("span");e.classList.add("cowegis-marker-content"),e.innerHTML=n.html,n.color&&(e.style.color=n.color),o.appendChild(e)}}})}}]);