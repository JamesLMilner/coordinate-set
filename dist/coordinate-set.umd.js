!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).coordinateSet={})}(this,function(e){function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function r(e,r){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n;n=Symbol.iterator,e.CoordinateSet=/*#__PURE__*/function(){function e(t){var r=this;this._size=void 0,this._map=void 0,this._map=new Map,Array.isArray(t)?(t.forEach(function(e){r._validateCoordinate(e),r._map.set(r._getKey(e),e)}),this._size=t.length):t instanceof e?(t.forEach(function(e){r._map.set(r._getKey(e),e)}),this._size=t.size):this._size=0}var t,i,o=e.prototype;return o._getKey=function(e){return e[0]+","+e[1]},o._validateCoordinate=function(e){var t=e[0],r=e[1];if(!("number"==typeof t&&!isNaN(t)&&t>=-180&&t<=180))throw new Error("Longitude must be valid");if(!("number"==typeof r&&!isNaN(r)&&r>=-90&&r<=90))throw new Error("Latitude must be valid")},o[n]=/*#__PURE__*/regeneratorRuntime.mark(function e(){var t,n,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=r(this._map.entries());case 1:if((n=t()).done){e.next=7;break}return i=n.value,e.next=5,[i[1],i[1]];case 5:e.next=1;break;case 7:case"end":return e.stop()}},e,this)}),o.entries=function(){return this[Symbol.iterator]()},o.forEach=function(e){var t=this;[].concat(this.entries()).forEach(function(r,n){e(r[0],n,t)})},o.has=function(e){return this._validateCoordinate(e),Boolean(this._map.get(this._getKey(e)))},o.add=function(e){this._validateCoordinate(e);var t=this._getKey(e);if(!this._map.get(t))return this._size++,this._map.set(t,e),this},o.delete=function(e){this._validateCoordinate(e);var t=this._getKey(e);return!!this._map.get(t)&&(this._size--,this._map.delete(t))},o.clear=function(){this._map=new Map,this._size=0},t=e,(i=[{key:"size",get:function(){return this._size},set:function(e){}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}()});
//# sourceMappingURL=coordinate-set.umd.js.map