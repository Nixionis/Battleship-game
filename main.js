/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";(t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})})({});const t=function(t){for(var e=t,r=[],n=[],o=0;o<e;o+=1){r[o]=[];for(var i=0;i<e;i+=1)r[o][i]=[!1,null]}function a(t,r){return!(t>=e||t<0||r>=e||r<0)}function c(t,e,o){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!a(e,o))return!1;for(var c=0;c<t;c+=1)if(i){if(!a(e,o+c))return!1;if(null!==r[e][o+c][1])return!1}else{if(!a(e+c,o))return!1;if(null!==r[e+c][o][1])return!1}var u=function(t,e,r){var n=t,o=0,i=[e,r],a=!1;return{getPosition:function(){return[].concat(i)},getLength:function(){return n},hit:function(){return n-(o+=1)==0&&(a=!0),n-o},isSunk:function(){return a}}}(t,e,o);n.push(u);for(var l=0;l<t;l+=1)i?r[e][o+l][1]=n[n.length-1]:r[e+l][o][1]=n[n.length-1];return!0}function u(t,n){if(!a(t,n))return!1;for(var o=-1;o<2;o+=1)for(var i=-1;i<2;i+=1){var c=t+o,u=n+i;if(!(c<0||c>=e||u<0||u>=e)&&null!==r[c][u][1])return!1}return!0}return{tryPlaceShip:c,getCellDataAt:function(t,e){return a(t,e)?r[t][e]:null},receiveAttack:function(t,e){if(!a(t,e))return null;r[t][e][0]=!0;var n=r[t][e][1];return null!==n?n.hit():null},getShipAliveAmount:function(){if(0===n.length)return 0;for(var t=[0,0,0,0],e=0;e<n.length;e+=1)n[e].isSunk()||(t[n[e].getLength()-1]+=1);return{Large:t[3],Big:t[2],Medium:t[1],Small:t[0]}},checkAdjacentCells:u,placeShipsRandomly:function(t){for(;t.length>0;){for(var r=Math.floor(Math.random()*e),n=Math.floor(Math.random()*e),o=Math.floor(2*Math.random())+1===1,i=!1,a=0;a<t[t.length-1]&&(i=u(o?r:r+a,o?n+a:n));a+=1);i&&c(t.pop(),r,n,o)}}}};function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function n(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?r(Object(o),!0).forEach((function(r){var n,i,a;n=t,i=r,a=o[r],(i=function(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}(i))in n?Object.defineProperty(n,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[i]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function o(){var t={Large:0,Big:0,Medium:0,Small:0},e=["Large","Big","Medium","Small"];return{addShip:function(r){return e.includes(r)?(t[r]+=1,null):"Unknown ship size"},removeShip:function(e){t[e]-=1},getAliveShips:function(){return n({},t)}}}const i=o;function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function c(){c=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var i=e&&e.prototype instanceof b?e:b,a=Object.create(i.prototype),c=new T(n||[]);return o(a,"_invoke",{value:P(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",m="completed",g={};function b(){}function S(){}function w(){}var L={};f(L,u,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(M([])));E&&E!==r&&n.call(E,u)&&(L=E);var A=w.prototype=b.prototype=Object.create(L);function k(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,c,u){var l=p(t[o],t,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==a(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function P(e,r,n){var o=y;return function(i,a){if(o===d)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=j(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var l=p(e,r,n);if("normal"===l.type){if(o=n.done?m:v,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function j(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,j(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=p(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function M(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(a(e)+" is not iterable")}return S.prototype=w,o(A,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:S,configurable:!0}),S.displayName=f(w,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===S||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,f(t,s,"GeneratorFunction")),t.prototype=Object.create(A),t},e.awrap=function(t){return{__await:t}},k(O.prototype),f(O.prototype,l,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new O(h(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},k(A),f(A,s,"Generator"),f(A,u,(function(){return this})),f(A,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=M,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:M(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function u(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}!function(e){var r,a=!0,l=!1,s=!0,f=!0,h=[],p=[1,1,1,1,2,2,2,3,3,4],y=!1,v=10,d=i(),m=(r=[],n({populateAttackCells:function(t){for(var e=0;e<t;e+=1)for(var n=0;n<t;n+=1)r.push([e,n])},attackRandomCell:function(){var t=Math.floor(Math.random()*r.length),e=r[t];return r.splice(t,1),e}},o())),g=t(v),b=t(v),S=function(t){var e=t.querySelector("#player-grid"),r=t.querySelector("#enemy-grid"),n=null,o=t.querySelector(".player-action"),i=t.querySelector("#player-large"),a=t.querySelector("#player-big"),c=t.querySelector("#player-medium"),u=t.querySelector("#player-small"),l=t.querySelector("#enemy-large"),s=t.querySelector("#enemy-big"),f=t.querySelector("#enemy-medium"),h=t.querySelector("#enemy-small"),p=[],y=[],v=[];function d(){for(;v.length>0;){var t=v.pop();t.classList.remove("valid"),t.classList.remove("invalid")}}return{subscribeToCellClick:function(t){p.push(t)},subscribeToCellHover:function(t){y.push(t)},generateGrid:function(o,i){n=o;for(var a=function(o){for(var a=function(n){var a=t.createElement("div");a.classList.add("grid__cell"),a.dataset.positionX=o,a.dataset.positionY=n,a.addEventListener("click",(function(){var t,e,r;t=o,e=n,r=i,p.forEach((function(n){return n(t,e,r)}))})),a.addEventListener("mouseover",(function(){var t,e;i&&(t=o,e=n,y.forEach((function(r){return r(t,e)})))})),i?(e.appendChild(a),e.addEventListener("mouseleave",(function(){return d()}))):r.appendChild(a)},c=0;c<n;c+=1)a(c)},c=0;c<n;c+=1)a(c)},showPlacement:function(t,r,o,i,a){d();for(var c=0;c<o;c+=1){var u=i?t:t+c,l=i?r+c:r;if(!(u<0||u>=n||l<0||l>=n)){var s=e.querySelector('.grid__cell[data-position-x="'.concat(u,'"][data-position-y="').concat(l,'"]'));s.classList.add(a?"valid":"invalid"),v.push(s)}}},placeShipForPlayer:function(t,r,n,o){for(var i=0;i<n;i+=1){var a=o?t:t+i,c=o?r+i:r;e.querySelector('.grid__cell[data-position-x="'.concat(a,'"][data-position-y="').concat(c,'"]')).classList.add("my-ship")}},updateShipScore:function(t,e){e?(i.textContent="Large: ".concat(t.Large),a.textContent="Big: ".concat(t.Big),c.textContent="Medium: ".concat(t.Medium),u.textContent="Small: ".concat(t.Small)):(l.textContent="Large: ".concat(t.Large),s.textContent="Big: ".concat(t.Big),f.textContent="Medium: ".concat(t.Medium),h.textContent="Small: ".concat(t.Small))},setActionText:function(t,e){o.textContent=t,o.classList.remove("info"),o.classList.remove("player-turn"),o.classList.remove("enemy-turn"),o.classList.add(0===e?"info":1===e?"player-turn":"enemy-turn")},markCell:function(t,n,o,i){var a={0:"Empty",1:"Damaged-ship"},c=i?e.querySelector('.grid__cell[data-position-x="'.concat(t,'"][data-position-y="').concat(n,'"]')):r.querySelector('.grid__cell[data-position-x="'.concat(t,'"][data-position-y="').concat(n,'"]'));c&&("Empty"===a[o]?c.classList.add("empty"):"Damaged-ship"===a[o]&&c.classList.add("damaged-ship"),c.innerHTML='<span class="material-icons-round"> close </span>')}}}(e);function w(){return L.apply(this,arguments)}function L(){var t;return t=c().mark((function t(){var e;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=m.attackRandomCell(),t.next=3,new Promise((function(t){setTimeout((function(){return t()}),500)}));case 3:return S.setActionText("Enemy thinking!",0),t.next=6,new Promise((function(t){setTimeout((function(){return t()}),Math.floor(1e3*Math.random())+250)}));case 6:console.log("enemy click at",e[0],e[1]),O(e[0],e[1],!0);case 8:case"end":return t.stop()}}),t)})),L=function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){u(i,n,o,a,c,"next",t)}function c(t){u(i,n,o,a,c,"throw",t)}a(void 0)}))},L.apply(this,arguments)}function x(){(a=!a)||w()}function E(){S.updateShipScore(g.getShipAliveAmount(),!0),S.updateShipScore(b.getShipAliveAmount(),!1)}function A(){console.log("alive player",g.getShipAliveAmount()),console.log("alive enemy",b.getShipAliveAmount());var t=Object.values(g.getShipAliveAmount()),e=Object.values(b.getShipAliveAmount());return 0===t.reduce((function(t,e){return t+e}),0)?(l=!1,S.setActionText("Enemy wins!",2),!0):0===e.reduce((function(t,e){return t+e}),0)&&(l=!1,S.setActionText("Player wins!",1),!0)}function k(t,e){if(h=[t,e],s){var r=p[p.length-1];y=!0;for(var n=0;n<r;n+=1){var o=f?t:t+n,i=f?e+n:e;if(!(y=g.checkAdjacentCells(o,i)))break}S.showPlacement(t,e,r,f,y)}}function O(t,e,r){if(console.log("Cell click!"),r&&y&&s)!function(t,e,r){var n=null;r&&(n=p.pop(),S.placeShipForPlayer(t,e,n,f));var o={1:"Small",2:"Medium",3:"Big",4:"Large"};r&&(d.addShip(o[n]),g.tryPlaceShip(n,t,e,f),S.updateShipScore(d.getAliveShips(),!0),0===p.length?(s=!1,function(){var t=[1,1,1,1,2,2,2,3,3,4],e={1:"Small",2:"Medium",3:"Big",4:"Large"};t.forEach((function(t){m.addShip(e[t])})),b.placeShipsRandomly(t),m.populateAttackCells(v)}(),S.setActionText("Your turn",1),l=!0):S.setActionText("Place your ".concat(o[p[p.length-1]]," ship (Press R to rotate)"),0))}(t,e,r);else if(l&&a&&!r){if(!0===b.getCellDataAt(t,e)[0])return;null!==b.receiveAttack(t,e)?(S.markCell(t,e,1,!1),S.setActionText("Hit! Your turn!",1),E(),A()):(S.markCell(t,e,0,!1),S.setActionText("Miss! Enemy turn!",2),x())}else if(l&&!a&&r){if(!0===g.getCellDataAt(t,e)[0])return void w();null!==g.receiveAttack(t,e)?(S.markCell(t,e,1,!0),S.setActionText("Hit! Enemy turn!",2),E(),A()||w()):(S.markCell(t,e,0,!0),S.setActionText("Miss! Your turn!",1),x())}}S.generateGrid(v,!0),S.generateGrid(v,!1),S.subscribeToCellHover(k),S.subscribeToCellClick(O),window.addEventListener("keydown",(function(t){"r"!==t.key&&"R"!==t.key||(f=!f,k(h[0],h[1]))}))}(document)})();