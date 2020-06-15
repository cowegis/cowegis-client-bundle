(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["spin"],{

/***/ "./node_modules/spin.js/spin.js":
/*!**************************************!*\
  !*** ./node_modules/spin.js/spin.js ***!
  \**************************************/
/*! exports provided: Spinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return Spinner; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaults = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    scale: 1.0,
    corners: 1,
    color: '#000',
    fadeColor: 'transparent',
    animation: 'spinner-line-fade-default',
    rotate: 0,
    direction: 1,
    speed: 1,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: '0 0 1px transparent',
    position: 'absolute',
};
var Spinner = /** @class */ (function () {
    function Spinner(opts) {
        if (opts === void 0) { opts = {}; }
        this.opts = __assign(__assign({}, defaults), opts);
    }
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target by calling
     * stop() internally.
     */
    Spinner.prototype.spin = function (target) {
        this.stop();
        this.el = document.createElement('div');
        this.el.className = this.opts.className;
        this.el.setAttribute('role', 'progressbar');
        css(this.el, {
            position: this.opts.position,
            width: 0,
            zIndex: this.opts.zIndex,
            left: this.opts.left,
            top: this.opts.top,
            transform: "scale(" + this.opts.scale + ")",
        });
        if (target) {
            target.insertBefore(this.el, target.firstChild || null);
        }
        drawLines(this.el, this.opts);
        return this;
    };
    /**
     * Stops and removes the Spinner.
     * Stopped spinners may be reused by calling spin() again.
     */
    Spinner.prototype.stop = function () {
        if (this.el) {
            if (typeof requestAnimationFrame !== 'undefined') {
                cancelAnimationFrame(this.animateId);
            }
            else {
                clearTimeout(this.animateId);
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this.el = undefined;
        }
        return this;
    };
    return Spinner;
}());

/**
 * Sets multiple style properties at once.
 */
function css(el, props) {
    for (var prop in props) {
        el.style[prop] = props[prop];
    }
    return el;
}
/**
 * Returns the line color from the given string or array.
 */
function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length];
}
/**
 * Internal method that draws the individual lines.
 */
function drawLines(el, opts) {
    var borderRadius = (Math.round(opts.corners * opts.width * 500) / 1000) + 'px';
    var shadow = 'none';
    if (opts.shadow === true) {
        shadow = '0 2px 4px #000'; // default shadow
    }
    else if (typeof opts.shadow === 'string') {
        shadow = opts.shadow;
    }
    var shadows = parseBoxShadow(shadow);
    for (var i = 0; i < opts.lines; i++) {
        var degrees = ~~(360 / opts.lines * i + opts.rotate);
        var backgroundLine = css(document.createElement('div'), {
            position: 'absolute',
            top: -opts.width / 2 + "px",
            width: (opts.length + opts.width) + 'px',
            height: opts.width + 'px',
            background: getColor(opts.fadeColor, i),
            borderRadius: borderRadius,
            transformOrigin: 'left',
            transform: "rotate(" + degrees + "deg) translateX(" + opts.radius + "px)",
        });
        var delay = i * opts.direction / opts.lines / opts.speed;
        delay -= 1 / opts.speed; // so initial animation state will include trail
        var line = css(document.createElement('div'), {
            width: '100%',
            height: '100%',
            background: getColor(opts.color, i),
            borderRadius: borderRadius,
            boxShadow: normalizeShadow(shadows, degrees),
            animation: 1 / opts.speed + "s linear " + delay + "s infinite " + opts.animation,
        });
        backgroundLine.appendChild(line);
        el.appendChild(backgroundLine);
    }
}
function parseBoxShadow(boxShadow) {
    var regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
    var shadows = [];
    for (var _i = 0, _a = boxShadow.split(','); _i < _a.length; _i++) {
        var shadow = _a[_i];
        var matches = shadow.match(regex);
        if (matches === null) {
            continue; // invalid syntax
        }
        var x = +matches[2];
        var y = +matches[5];
        var xUnits = matches[4];
        var yUnits = matches[7];
        if (x === 0 && !xUnits) {
            xUnits = yUnits;
        }
        if (y === 0 && !yUnits) {
            yUnits = xUnits;
        }
        if (xUnits !== yUnits) {
            continue; // units must match to use as coordinates
        }
        shadows.push({
            prefix: matches[1] || '',
            x: x,
            y: y,
            xUnits: xUnits,
            yUnits: yUnits,
            end: matches[8],
        });
    }
    return shadows;
}
/**
 * Modify box-shadow x/y offsets to counteract rotation
 */
function normalizeShadow(shadows, degrees) {
    var normalized = [];
    for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
        var shadow = shadows_1[_i];
        var xy = convertOffset(shadow.x, shadow.y, degrees);
        normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
    }
    return normalized.join(', ');
}
function convertOffset(x, y, degrees) {
    var radians = degrees * Math.PI / 180;
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return [
        Math.round((x * cos + y * sin) * 1000) / 1000,
        Math.round((-x * sin + y * cos) * 1000) / 1000,
    ];
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3Bpbi5qcy9zcGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsZ0JBQWdCLFNBQUksSUFBSSxTQUFJO0FBQzVCO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVc7QUFDekMsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsdUJBQXVCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9zcGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG52YXIgZGVmYXVsdHMgPSB7XHJcbiAgICBsaW5lczogMTIsXHJcbiAgICBsZW5ndGg6IDcsXHJcbiAgICB3aWR0aDogNSxcclxuICAgIHJhZGl1czogMTAsXHJcbiAgICBzY2FsZTogMS4wLFxyXG4gICAgY29ybmVyczogMSxcclxuICAgIGNvbG9yOiAnIzAwMCcsXHJcbiAgICBmYWRlQ29sb3I6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBhbmltYXRpb246ICdzcGlubmVyLWxpbmUtZmFkZS1kZWZhdWx0JyxcclxuICAgIHJvdGF0ZTogMCxcclxuICAgIGRpcmVjdGlvbjogMSxcclxuICAgIHNwZWVkOiAxLFxyXG4gICAgekluZGV4OiAyZTksXHJcbiAgICBjbGFzc05hbWU6ICdzcGlubmVyJyxcclxuICAgIHRvcDogJzUwJScsXHJcbiAgICBsZWZ0OiAnNTAlJyxcclxuICAgIHNoYWRvdzogJzAgMCAxcHggdHJhbnNwYXJlbnQnLFxyXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbn07XHJcbnZhciBTcGlubmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3Bpbm5lcihvcHRzKSB7XHJcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cclxuICAgICAgICB0aGlzLm9wdHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdHMpLCBvcHRzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgc3Bpbm5lciB0byB0aGUgZ2l2ZW4gdGFyZ2V0IGVsZW1lbnQuIElmIHRoaXMgaW5zdGFuY2UgaXMgYWxyZWFkeVxyXG4gICAgICogc3Bpbm5pbmcsIGl0IGlzIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBmcm9tIGl0cyBwcmV2aW91cyB0YXJnZXQgYnkgY2FsbGluZ1xyXG4gICAgICogc3RvcCgpIGludGVybmFsbHkuXHJcbiAgICAgKi9cclxuICAgIFNwaW5uZXIucHJvdG90eXBlLnNwaW4gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gdGhpcy5vcHRzLmNsYXNzTmFtZTtcclxuICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xyXG4gICAgICAgIGNzcyh0aGlzLmVsLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLm9wdHMucG9zaXRpb24sXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRoaXMub3B0cy56SW5kZXgsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMub3B0cy5sZWZ0LFxyXG4gICAgICAgICAgICB0b3A6IHRoaXMub3B0cy50b3AsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZShcIiArIHRoaXMub3B0cy5zY2FsZSArIFwiKVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZSh0aGlzLmVsLCB0YXJnZXQuZmlyc3RDaGlsZCB8fCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJhd0xpbmVzKHRoaXMuZWwsIHRoaXMub3B0cyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBhbmQgcmVtb3ZlcyB0aGUgU3Bpbm5lci5cclxuICAgICAqIFN0b3BwZWQgc3Bpbm5lcnMgbWF5IGJlIHJldXNlZCBieSBjYWxsaW5nIHNwaW4oKSBhZ2Fpbi5cclxuICAgICAqL1xyXG4gICAgU3Bpbm5lci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1hdGVJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZWwucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTcGlubmVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBTcGlubmVyIH07XHJcbi8qKlxyXG4gKiBTZXRzIG11bHRpcGxlIHN0eWxlIHByb3BlcnRpZXMgYXQgb25jZS5cclxuICovXHJcbmZ1bmN0aW9uIGNzcyhlbCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICBlbC5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBsaW5lIGNvbG9yIGZyb20gdGhlIGdpdmVuIHN0cmluZyBvciBhcnJheS5cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbG9yKGNvbG9yLCBpZHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgPyBjb2xvciA6IGNvbG9yW2lkeCAlIGNvbG9yLmxlbmd0aF07XHJcbn1cclxuLyoqXHJcbiAqIEludGVybmFsIG1ldGhvZCB0aGF0IGRyYXdzIHRoZSBpbmRpdmlkdWFsIGxpbmVzLlxyXG4gKi9cclxuZnVuY3Rpb24gZHJhd0xpbmVzKGVsLCBvcHRzKSB7XHJcbiAgICB2YXIgYm9yZGVyUmFkaXVzID0gKE1hdGgucm91bmQob3B0cy5jb3JuZXJzICogb3B0cy53aWR0aCAqIDUwMCkgLyAxMDAwKSArICdweCc7XHJcbiAgICB2YXIgc2hhZG93ID0gJ25vbmUnO1xyXG4gICAgaWYgKG9wdHMuc2hhZG93ID09PSB0cnVlKSB7XHJcbiAgICAgICAgc2hhZG93ID0gJzAgMnB4IDRweCAjMDAwJzsgLy8gZGVmYXVsdCBzaGFkb3dcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzLnNoYWRvdyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBzaGFkb3cgPSBvcHRzLnNoYWRvdztcclxuICAgIH1cclxuICAgIHZhciBzaGFkb3dzID0gcGFyc2VCb3hTaGFkb3coc2hhZG93KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0cy5saW5lczsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRlZ3JlZXMgPSB+figzNjAgLyBvcHRzLmxpbmVzICogaSArIG9wdHMucm90YXRlKTtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZExpbmUgPSBjc3MoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogLW9wdHMud2lkdGggLyAyICsgXCJweFwiLFxyXG4gICAgICAgICAgICB3aWR0aDogKG9wdHMubGVuZ3RoICsgb3B0cy53aWR0aCkgKyAncHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG9wdHMud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBnZXRDb2xvcihvcHRzLmZhZGVDb2xvciwgaSksXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogYm9yZGVyUmFkaXVzLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICdsZWZ0JyxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBcInJvdGF0ZShcIiArIGRlZ3JlZXMgKyBcImRlZykgdHJhbnNsYXRlWChcIiArIG9wdHMucmFkaXVzICsgXCJweClcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgZGVsYXkgPSBpICogb3B0cy5kaXJlY3Rpb24gLyBvcHRzLmxpbmVzIC8gb3B0cy5zcGVlZDtcclxuICAgICAgICBkZWxheSAtPSAxIC8gb3B0cy5zcGVlZDsgLy8gc28gaW5pdGlhbCBhbmltYXRpb24gc3RhdGUgd2lsbCBpbmNsdWRlIHRyYWlsXHJcbiAgICAgICAgdmFyIGxpbmUgPSBjc3MoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGdldENvbG9yKG9wdHMuY29sb3IsIGkpLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IGJvcmRlclJhZGl1cyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBub3JtYWxpemVTaGFkb3coc2hhZG93cywgZGVncmVlcyksXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogMSAvIG9wdHMuc3BlZWQgKyBcInMgbGluZWFyIFwiICsgZGVsYXkgKyBcInMgaW5maW5pdGUgXCIgKyBvcHRzLmFuaW1hdGlvbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBiYWNrZ3JvdW5kTGluZS5hcHBlbmRDaGlsZChsaW5lKTtcclxuICAgICAgICBlbC5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kTGluZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VCb3hTaGFkb3coYm94U2hhZG93KSB7XHJcbiAgICB2YXIgcmVnZXggPSAvXlxccyooW2EtekEtWl0rXFxzKyk/KC0/XFxkKyhcXC5cXGQrKT8pKFthLXpBLVpdKilcXHMrKC0/XFxkKyhcXC5cXGQrKT8pKFthLXpBLVpdKikoLiopJC87XHJcbiAgICB2YXIgc2hhZG93cyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGJveFNoYWRvdy5zcGxpdCgnLCcpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBzaGFkb3cgPSBfYVtfaV07XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBzaGFkb3cubWF0Y2gocmVnZXgpO1xyXG4gICAgICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBpbnZhbGlkIHN5bnRheFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgeCA9ICttYXRjaGVzWzJdO1xyXG4gICAgICAgIHZhciB5ID0gK21hdGNoZXNbNV07XHJcbiAgICAgICAgdmFyIHhVbml0cyA9IG1hdGNoZXNbNF07XHJcbiAgICAgICAgdmFyIHlVbml0cyA9IG1hdGNoZXNbN107XHJcbiAgICAgICAgaWYgKHggPT09IDAgJiYgIXhVbml0cykge1xyXG4gICAgICAgICAgICB4VW5pdHMgPSB5VW5pdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5ID09PSAwICYmICF5VW5pdHMpIHtcclxuICAgICAgICAgICAgeVVuaXRzID0geFVuaXRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeFVuaXRzICE9PSB5VW5pdHMpIHtcclxuICAgICAgICAgICAgY29udGludWU7IC8vIHVuaXRzIG11c3QgbWF0Y2ggdG8gdXNlIGFzIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoYWRvd3MucHVzaCh7XHJcbiAgICAgICAgICAgIHByZWZpeDogbWF0Y2hlc1sxXSB8fCAnJyxcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgeFVuaXRzOiB4VW5pdHMsXHJcbiAgICAgICAgICAgIHlVbml0czogeVVuaXRzLFxyXG4gICAgICAgICAgICBlbmQ6IG1hdGNoZXNbOF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2hhZG93cztcclxufVxyXG4vKipcclxuICogTW9kaWZ5IGJveC1zaGFkb3cgeC95IG9mZnNldHMgdG8gY291bnRlcmFjdCByb3RhdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplU2hhZG93KHNoYWRvd3MsIGRlZ3JlZXMpIHtcclxuICAgIHZhciBub3JtYWxpemVkID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHNoYWRvd3NfMSA9IHNoYWRvd3M7IF9pIDwgc2hhZG93c18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBzaGFkb3cgPSBzaGFkb3dzXzFbX2ldO1xyXG4gICAgICAgIHZhciB4eSA9IGNvbnZlcnRPZmZzZXQoc2hhZG93LngsIHNoYWRvdy55LCBkZWdyZWVzKTtcclxuICAgICAgICBub3JtYWxpemVkLnB1c2goc2hhZG93LnByZWZpeCArIHh5WzBdICsgc2hhZG93LnhVbml0cyArICcgJyArIHh5WzFdICsgc2hhZG93LnlVbml0cyArIHNoYWRvdy5lbmQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQuam9pbignLCAnKTtcclxufVxyXG5mdW5jdGlvbiBjb252ZXJ0T2Zmc2V0KHgsIHksIGRlZ3JlZXMpIHtcclxuICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAqIE1hdGguUEkgLyAxODA7XHJcbiAgICB2YXIgc2luID0gTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICB2YXIgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIE1hdGgucm91bmQoKHggKiBjb3MgKyB5ICogc2luKSAqIDEwMDApIC8gMTAwMCxcclxuICAgICAgICBNYXRoLnJvdW5kKCgteCAqIHNpbiArIHkgKiBjb3MpICogMTAwMCkgLyAxMDAwLFxyXG4gICAgXTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9