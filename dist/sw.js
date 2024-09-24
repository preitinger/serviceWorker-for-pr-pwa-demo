(()=>{"use strict";var e={465:function(e,r,t){var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,i=t.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,i=r.length;a<i;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))};Object.defineProperty(r,"__esModule",{value:!0}),r.AsyncContract=void 0;var i=t(628),o=t(435);r.AsyncContract=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t=e.length-1,c=e.slice(0,t),u=e[t];return{enforce:function(e){return function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];if(r.length<c.length){var l="Expected ".concat(c.length," arguments but only received ").concat(r.length),f=o.FAILURE.ARGUMENT_INCORRECT(l);throw new i.ValidationError(f)}for(var s=0;s<c.length;s++)c[s].check(r[s]);var d=e.apply(void 0,a([],n(r),!1));if(!(d instanceof Promise))throw l="Expected function to return a promise, but instead got ".concat(d),f=o.FAILURE.RETURN_INCORRECT(l),new i.ValidationError(f);return d.then(u.check)}}}}},285:function(e,r,t){var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,i=t.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,i=r.length;a<i;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))};Object.defineProperty(r,"__esModule",{value:!0}),r.Contract=void 0;var i=t(628),o=t(435);r.Contract=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t=e.length-1,c=e.slice(0,t),u=e[t];return{enforce:function(e){return function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];if(r.length<c.length){var l="Expected ".concat(c.length," arguments but only received ").concat(r.length),f=o.FAILURE.ARGUMENT_INCORRECT(l);throw new i.ValidationError(f)}for(var s=0;s<c.length;s++)c[s].check(r[s]);return u.check(e.apply(void 0,a([],n(r),!1)))}}}}},774:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.checked=r.check=void 0;var n=t(628),a=t(435),i=new WeakMap;r.check=function(e,r,t){var n=i.get(e)||new Map;i.set(e,n);var a=n.get(r)||[];n.set(r,a),a.push(t)},r.checked=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(0===e.length)throw new Error("No runtype provided to `@checked`. Please remove the decorator.");return function(r,t,o){var c=o.value,u=(r.name||r.constructor.name+".prototype")+("string"==typeof t?'["'.concat(t,'"]'):"[".concat(String(t),"]")),l=function(e,r,t){var n=i.get(e),a=n&&n.get(r);if(a)return a;for(var o=[],c=0;c<t;c++)o.push(c);return o}(r,t,e.length);if(l.length!==e.length)throw new Error("Number of `@checked` runtypes and @check parameters not matched.");if(l.length>c.length)throw new Error("Number of `@checked` runtypes exceeds actual parameter length.");o.value=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return e.forEach((function(e,t){var i=l[t],o=e.validate(r[i]);if(!o.success){var c="".concat(u,", argument #").concat(i,": ").concat(o.message),f=a.FAILURE.ARGUMENT_INCORRECT(c);throw new n.ValidationError(f)}})),c.apply(this,r)}}}},628:function(e,r){var t,n=this&&this.__extends||(t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])},t(e,r)},function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)});Object.defineProperty(r,"__esModule",{value:!0}),r.ValidationError=void 0;var a=function(e){function r(t){var n=e.call(this,t.message)||this;return n.name="ValidationError",n.code=t.code,void 0!==t.details&&(n.details=t.details),Object.setPrototypeOf(n,r.prototype),n}return n(r,e),r}(Error);r.ValidationError=a},715:function(e,r,t){var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__exportStar||function(e,r){for(var t in e)"default"===t||Object.prototype.hasOwnProperty.call(r,t)||n(r,e,t)};Object.defineProperty(r,"__esModule",{value:!0}),r.InstanceOf=r.Nullish=r.Null=r.Undefined=r.Literal=void 0,a(t(758),r),a(t(594),r),a(t(285),r),a(t(465),r),a(t(642),r),a(t(628),r),a(t(143),r),a(t(339),r),a(t(811),r);var i=t(58);Object.defineProperty(r,"Literal",{enumerable:!0,get:function(){return i.Literal}}),Object.defineProperty(r,"Undefined",{enumerable:!0,get:function(){return i.Undefined}}),Object.defineProperty(r,"Null",{enumerable:!0,get:function(){return i.Null}}),Object.defineProperty(r,"Nullish",{enumerable:!0,get:function(){return i.Nullish}}),a(t(720),r),a(t(341),r),a(t(84),r),a(t(158),r),a(t(208),r),a(t(845),r),a(t(376),r),a(t(171),r),a(t(380),r),a(t(665),r),a(t(162),r),a(t(248),r),a(t(93),r),a(t(945),r);var o=t(175);Object.defineProperty(r,"InstanceOf",{enumerable:!0,get:function(){return o.InstanceOf}}),a(t(751),r),a(t(690),r),a(t(852),r),a(t(774),r)},642:function(e,r){var t=this&&this.__values||function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")},n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,i=t.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return o};Object.defineProperty(r,"__esModule",{value:!0}),r.when=r.match=void 0,r.match=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return function(r){var a,i;try{for(var o=t(e),c=o.next();!c.done;c=o.next()){var u=n(c.value,2),l=u[0],f=u[1];if(l.guard(r))return f(r)}}catch(e){a={error:e}}finally{try{c&&!c.done&&(i=o.return)&&i.call(o)}finally{if(a)throw a.error}}throw new Error("No alternatives were matched")}},r.when=function(e,r){return[e,r]}},758:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0})},594:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Failcode=void 0,r.Failcode={TYPE_INCORRECT:"TYPE_INCORRECT",VALUE_INCORRECT:"VALUE_INCORRECT",KEY_INCORRECT:"KEY_INCORRECT",CONTENT_INCORRECT:"CONTENT_INCORRECT",ARGUMENT_INCORRECT:"ARGUMENT_INCORRECT",RETURN_INCORRECT:"RETURN_INCORRECT",CONSTRAINT_FAILED:"CONSTRAINT_FAILED",PROPERTY_MISSING:"PROPERTY_MISSING",PROPERTY_PRESENT:"PROPERTY_PRESENT",NOTHING_EXPECTED:"NOTHING_EXPECTED"}},198:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.innerValidate=r.create=r.isRuntype=void 0;var n=t(715),a=t(666),i=t(628),o=t(435),c=Symbol();r.isRuntype=function(e){return(0,o.hasKey)(c,e)},r.create=function(e,r){return r[c]=!0,r.check=t,r.assert=t,r._innerValidate=function(t,n){return n.has(t,r)?(0,o.SUCCESS)(t):e(t,n)},r.validate=function(e){return r._innerValidate(e,(t=new WeakMap,n=function(e,r){if(null!==e&&"object"==typeof e){var n=t.get(e);t.set(e,n?n.set(r,!0):(new WeakMap).set(r,!0))}},a=function(e,r){var a=t.get(e),i=a&&a.get(r)||!1;return n(e,r),i},{has:a}));var t,n,a},r.guard=function(e){return r.validate(e).success},r.Or=function(e){return(0,n.Union)(r,e)},r.And=function(e){return(0,n.Intersect)(r,e)},r.optional=function(){return(0,n.Optional)(r)},r.nullable=function(){return(0,n.Union)(r,n.Null)},r.withConstraint=function(e,t){return(0,n.Constraint)(r,e,t)},r.withGuard=function(e,t){return(0,n.Constraint)(r,e,t)},r.withBrand=function(e){return(0,n.Brand)(e,r)},r.reflect=r,r.toString=function(){return"Runtype<".concat((0,a.default)(r),">")},r;function t(e){var t=r.validate(e);if(t.success)return t.value;throw new i.ValidationError(t)}},r.innerValidate=function(e,r,t){return e._innerValidate(r,t)}},666:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var t=function(e){return function(r){switch(r.tag){case"literal":return'"'.concat(String(r.value),'"');case"string":return"string";case"brand":return r.brand;case"constraint":return r.name||t(e)(r.underlying);case"union":return r.alternatives.map(t(e)).join(" | ");case"intersect":return r.intersectees.map(t(e)).join(" & ")}return"`${".concat(a(!1,e)(r),"}`")}},n=function(e){return function(r){switch(r.tag){case"literal":return String(r.value);case"brand":return"${".concat(r.brand,"}");case"constraint":return r.name?"${".concat(r.name,"}"):n(e)(r.underlying);case"union":if(1===r.alternatives.length){var t=r.alternatives[0];return n(e)(t.reflect)}break;case"intersect":if(1===r.intersectees.length)return t=r.intersectees[0],n(e)(t.reflect)}return"${".concat(a(!1,e)(r),"}")}},a=function(e,r){return function(o){var c=function(r){return e?"(".concat(r,")"):r};if(r.has(o))return c("CIRCULAR ".concat(o.tag));r.add(o);try{switch(o.tag){case"unknown":case"never":case"void":case"boolean":case"number":case"bigint":case"string":case"symbol":case"function":return o.tag;case"literal":var u=o.value;return"string"==typeof u?'"'.concat(u,'"'):String(u);case"template":if(0===o.strings.length)return'""';if(1===o.strings.length)return'"'.concat(o.strings[0],'"');if(2===o.strings.length&&o.strings.every((function(e){return""===e}))){var l=o.runtypes[0];return t(r)(l.reflect)}var f=!1,s=o.strings.reduce((function(e,t,a){var i=e+t,c=o.runtypes[a];if(c){var u=n(r)(c.reflect);return!f&&u.startsWith("$")&&(f=!0),i+u}return i}),"");return f?"`".concat(s,"`"):'"'.concat(s,'"');case"array":return"".concat(i(o)).concat(a(!0,r)(o.element),"[]");case"dictionary":return"{ [_: ".concat(o.key,"]: ").concat(a(!1,r)(o.value)," }");case"record":var d=Object.keys(o.fields);return d.length?"{ ".concat(d.map((function(e){return"".concat(i(o)).concat(e).concat((t=o,n=e,c=t.isPartial,u=t.fields,c||void 0!==n&&"optional"===u[n].tag?"?":""),": ").concat("optional"===o.fields[e].tag?a(!1,r)(o.fields[e].underlying):a(!1,r)(o.fields[e]),";");var t,n,c,u})).join(" ")," }"):"{}";case"tuple":return"[".concat(o.components.map(a(!1,r)).join(", "),"]");case"union":return c("".concat(o.alternatives.map(a(!0,r)).join(" | ")));case"intersect":return c("".concat(o.intersectees.map(a(!0,r)).join(" & ")));case"optional":return a(e,r)(o.underlying)+" | undefined";case"constraint":return o.name||a(e,r)(o.underlying);case"instanceof":return o.ctor.name;case"brand":return a(e,r)(o.entity)}}finally{r.delete(o)}throw Error("impossible")}};function i(e){return e.isReadonly?"readonly ":""}r.default=a(!1,new Set)},376:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Array=void 0;var n=t(198),a=t(435);function i(e,r){var t,o={tag:"array",isReadonly:r,element:e};return(t=(0,n.create)((function(r,t){if(!Array.isArray(r))return a.FAILURE.TYPE_INCORRECT(o,r);var i=(0,a.enumerableKeysOf)(r),c=i.map((function(a){return(0,n.innerValidate)(e,r[a],t)})),u=i.reduce((function(e,r){var t=c[r];return t.success||(e[r]=t.details||t.message),e}),[]);return 0!==(0,a.enumerableKeysOf)(u).length?a.FAILURE.CONTENT_INCORRECT(o,u):(0,a.SUCCESS)(r)}),o)).asReadonly=function(){return i(t.element,!0)},t}r.Array=function(e){return i(e,!1)}},158:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.BigInt=void 0;var n=t(198),a=t(435),i={tag:"bigint"};r.BigInt=(0,n.create)((function(e){return"bigint"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),i)},341:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Boolean=void 0;var n=t(198),a=t(435),i={tag:"boolean"};r.Boolean=(0,n.create)((function(e){return"boolean"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),i)},852:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Brand=void 0;var n=t(198);r.Brand=function(e,r){var t={tag:"brand",brand:e,entity:r};return(0,n.create)((function(e){return r.validate(e)}),t)}},690:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Guard=r.Constraint=void 0;var n=t(198),a=t(435),i=t(143);r.Constraint=function(e,r,t){var i=t&&t.name,o=t&&t.args,c={tag:"constraint",underlying:e,constraint:r,name:i,args:o};return(0,n.create)((function(t){var n=e.validate(t);if(!n.success)return n;var i=r(n.value);return"string"==typeof i?a.FAILURE.CONSTRAINT_FAILED(c,i):i?(0,a.SUCCESS)(n.value):a.FAILURE.CONSTRAINT_FAILED(c)}),c)},r.Guard=function(e,r){return i.Unknown.withGuard(e,r)}},665:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Dictionary=void 0;var n=t(198),a=t(208),i=t(690),o=t(666),c=t(435),u=(0,i.Constraint)(a.String,(function(e){return!isNaN(+e)}),{name:"number"});r.Dictionary=function(e,r){var t=void 0===r||"string"===r?a.String:"number"===r?u:r,i=(0,o.default)(t),l={tag:"dictionary",key:i,value:e};return(0,n.create)((function(r,a){if(null==r||"object"!=typeof r)return c.FAILURE.TYPE_INCORRECT(l,r);if(Object.getPrototypeOf(r)!==Object.prototype&&(!Array.isArray(r)||"string"===i))return c.FAILURE.TYPE_INCORRECT(l,r);var o=/^(?:NaN|-?\d+(?:\.\d+)?)$/,u=(0,c.enumerableKeysOf)(r),f=u.reduce((function(i,u){var f="string"==typeof u&&o.test(u),s=f?globalThis.Number(u):u;return(f?t.guard(s)||t.guard(u):t.guard(s))?i[u]=(0,n.innerValidate)(e,r[u],a):i[u]=c.FAILURE.KEY_INCORRECT(l,t.reflect,s),i}),{}),s=u.reduce((function(e,r){var t=f[r];return t.success||(e[r]=t.details||t.message),e}),{});return 0!==(0,c.enumerableKeysOf)(s).length?c.FAILURE.CONTENT_INCORRECT(l,s):(0,c.SUCCESS)(r)}),l)}},945:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Function=void 0;var n=t(198),a=t(435),i={tag:"function"};r.Function=(0,n.create)((function(e){return"function"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),i)},175:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.InstanceOf=void 0;var n=t(198),a=t(435);r.InstanceOf=function(e){var r={tag:"instanceof",ctor:e};return(0,n.create)((function(t){return t instanceof e?(0,a.SUCCESS)(t):a.FAILURE.TYPE_INCORRECT(r,t)}),r)}},248:function(e,r,t){var n=this&&this.__values||function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(r,"__esModule",{value:!0}),r.Intersect=void 0;var a=t(198),i=t(435);r.Intersect=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t={tag:"intersect",intersectees:e};return(0,a.create)((function(r,t){var o,c;try{for(var u=n(e),l=u.next();!l.done;l=u.next()){var f=l.value,s=(0,a.innerValidate)(f,r,t);if(!s.success)return s}}catch(e){o={error:e}}finally{try{l&&!l.done&&(c=u.return)&&c.call(u)}finally{if(o)throw o.error}}return(0,i.SUCCESS)(r)}),t)}},751:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Lazy=void 0;var n=t(198);r.Lazy=function(e){var r,t={get tag(){return a().tag}};function a(){if(!r)for(var n in r=e())"tag"!==n&&(t[n]=r[n]);return r}return(0,n.create)((function(e){return a().validate(e)}),t)}},58:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Nullish=r.Null=r.Undefined=r.Literal=r.literal=void 0;var n=t(198),a=t(435),i=t(162);function o(e){return Array.isArray(e)?String(e.map(String)):"bigint"==typeof e?String(e)+"n":String(e)}function c(e){var r={tag:"literal",value:e};return(0,n.create)((function(r){return r===e?(0,a.SUCCESS)(r):a.FAILURE.VALUE_INCORRECT("literal","`".concat(o(e),"`"),"`".concat(o(r),"`"))}),r)}r.literal=o,r.Literal=c,r.Undefined=c(void 0),r.Null=c(null),r.Nullish=(0,i.Union)(r.Null,r.Undefined)},339:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Never=void 0;var n=t(198),a=t(435);r.Never=(0,n.create)(a.FAILURE.NOTHING_EXPECTED,{tag:"never"})},84:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Number=void 0;var n=t(198),a=t(435),i={tag:"number"};r.Number=(0,n.create)((function(e){return"number"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),i)},93:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Optional=void 0;var n=t(198),a=t(435);r.Optional=function(e){var r={tag:"optional",underlying:e};return(0,n.create)((function(r){return void 0===r?(0,a.SUCCESS)(r):e.validate(r)}),r)}},380:function(e,r,t){var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,i=t.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,i=r.length;a<i;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))};Object.defineProperty(r,"__esModule",{value:!0}),r.Partial=r.Record=r.InternalRecord=void 0;var i=t(198),o=t(435);function c(e,r,t){var u,l={tag:"record",isPartial:r,isReadonly:t,fields:e};return(u=(0,i.create)((function(t,c){if(null==t)return o.FAILURE.TYPE_INCORRECT(l,t);var u=(0,o.enumerableKeysOf)(e);if(0!==u.length&&"object"!=typeof t)return o.FAILURE.TYPE_INCORRECT(l,t);var f=a([],n(new Set(a(a([],n(u),!1),n((0,o.enumerableKeysOf)(t)),!1))),!1),s=f.reduce((function(n,a){var u=(0,o.hasKey)(a,e),l=(0,o.hasKey)(a,t);if(u){var f=e[a],s=r||"optional"===f.reflect.tag;if(l){var d=t[a];n[a]=s&&void 0===d?(0,o.SUCCESS)(d):(0,i.innerValidate)(f,d,c)}else n[a]=s?(0,o.SUCCESS)(void 0):o.FAILURE.PROPERTY_MISSING(f.reflect)}else{if(!l)throw new Error("impossible");d=t[a],n[a]=(0,o.SUCCESS)(d)}return n}),{}),d=f.reduce((function(e,r){var t=s[r];return t.success||(e[r]=t.details||t.message),e}),{});return 0!==(0,o.enumerableKeysOf)(d).length?o.FAILURE.CONTENT_INCORRECT(l,d):(0,o.SUCCESS)(t)}),l)).asPartial=function(){return c(u.fields,!0,u.isReadonly)},u.asReadonly=function(){return c(u.fields,u.isPartial,!0)},u.pick=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t={};return e.forEach((function(e){t[e]=u.fields[e]})),c(t,u.isPartial,u.isReadonly)},u.omit=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t={};return(0,o.enumerableKeysOf)(u.fields).forEach((function(r){e.includes(r)||(t[r]=u.fields[r])})),c(t,u.isPartial,u.isReadonly)},u.extend=function(e){return c(Object.assign({},u.fields,e),u.isPartial,u.isReadonly)},u}r.InternalRecord=c,r.Record=function(e){return c(e,!1,!1)},r.Partial=function(e){return c(e,!0,!1)}},208:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.String=void 0;var n=t(198),a=t(435),i={tag:"string"};r.String=(0,n.create)((function(e){return"string"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),i)},845:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Symbol=void 0;var n=t(198),a=t(435),i={tag:"symbol"};r.Symbol=(0,n.create)((function(e){return"symbol"==typeof e?(0,a.SUCCESS)(e):a.FAILURE.TYPE_INCORRECT(i,e)}),Object.assign((function(e){var r={tag:"symbol",key:e};return(0,n.create)((function(t){if("symbol"!=typeof t)return a.FAILURE.TYPE_INCORRECT(r,t);var n=globalThis.Symbol.keyFor(t);return n!==e?a.FAILURE.VALUE_INCORRECT("symbol key",o(e),o(n)):(0,a.SUCCESS)(t)}),r)}),i));var o=function(e){return void 0===e?"undefined":'"'.concat(e,'"')}},720:function(e,r,t){var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,i=t.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,i=r.length;a<i;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))},i=this&&this.__values||function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(r,"__esModule",{value:!0}),r.Template=void 0;var o=t(198),c=t(666),u=t(435),l=t(58),f=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},s=function(e){switch(e.reflect.tag){case"literal":return e;case"brand":return s(e.reflect.entity);case"union":if(1===e.reflect.alternatives.length)return s(e.reflect.alternatives[0]);break;case"intersect":if(1===e.reflect.intersectees.length)return s(e.reflect.intersectees[0])}throw void 0},d=function(e){return e},v={string:[function(e){return globalThis.String(e)},".*"],number:[function(e){return globalThis.Number(e)},"[+-]?(?:\\d*\\.\\d+|\\d+\\.\\d*|\\d+)(?:[Ee][+-]?\\d+)?","0[Bb][01]+","0[Oo][0-7]+","0[Xx][0-9A-Fa-f]+"],bigint:[function(e){return globalThis.BigInt(e)},"-?[1-9]d*"],boolean:[function(e){return"false"!==e},"true","false"],null:[function(){return null},"null"],undefined:[function(){},"undefined"]},y=function(e){switch(e.tag){case"literal":return n(v[(0,u.typeOf)(e.value)]||[d],1)[0];case"brand":return y(e.entity);case"constraint":return y(e.underlying);case"union":return e.alternatives.map(y);case"intersect":return e.intersectees.map(y);default:return n(v[e.tag]||[d],1)[0]}},E=function(e,r){return function(t){var n,a,c,f,s=y(e);if(!Array.isArray(s)){var d=s;return(C=(0,o.innerValidate)(e,d(t),r)).success||"VALUE_INCORRECT"!==C.code||"literal"!==e.tag?C:u.FAILURE.VALUE_INCORRECT("literal",'"'.concat((0,l.literal)(e.value),'"'),'"'.concat(t,'"'))}switch(e.tag){case"union":try{for(var v=i(e.alternatives),p=v.next();!p.done;p=v.next()){var g=p.value;if((C=E(g.reflect,r)(t)).success)return C}}catch(e){n={error:e}}finally{try{p&&!p.done&&(a=v.return)&&a.call(v)}finally{if(n)throw n.error}}return u.FAILURE.TYPE_INCORRECT(e,t);case"intersect":try{for(var h=i(e.intersectees),R=h.next();!R.done;R=h.next()){var C,b=R.value;if(!(C=E(b.reflect,r)(t)).success)return C}}catch(e){c={error:e}}finally{try{R&&!R.done&&(f=h.return)&&f.call(h)}finally{if(c)throw c.error}}return(0,u.SUCCESS)(t);default:throw Error("impossible")}}},p=function(e){switch(e.tag){case"literal":return f(String(e.value));case"brand":return p(e.entity);case"constraint":return p(e.underlying);case"union":return e.alternatives.map(p).join("|");case"template":return e.strings.map(f).reduce((function(r,t,n){var a=r+t,i=e.runtypes[n];return i?a+"(?:".concat(p(i.reflect),")"):a}),"");default:return n(v[e.tag]||[void 0,".*"]).slice(1).join("|")}};r.Template=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t,i,d=n(function(e){var r=n(function(e){if(0<e.length&&Array.isArray(e[0])){var r=n(e),t=r[0],a=r.slice(1);return[Array.from(t),a]}var i=e;return[t=i.reduce((function(e,r){return(0,o.isRuntype)(r)?e.push(""):e.push(e.pop()+String(r)),e}),[""]),a=i.filter(o.isRuntype)]}(e),2),t=r[0],i=r[1];return function(e,r){for(var t=0;t<r.length;)switch(r[t].reflect.tag){case"literal":var i=r[t];r.splice(t,1);var o=String(i.value);e.splice(t,2,e[t]+o+e[t+1]);break;case"template":var c=r[t];r.splice.apply(r,a([t,1],n(c.runtypes),!1));var u=c.strings;if(1===u.length)e.splice(t,2,e[t]+u[0]+e[t+1]);else{var l=u[0],f=u.slice(1,-1),d=u[u.length-1];e.splice.apply(e,a(a([t,2,e[t]+l],n(f),!1),[d+e[t+1]],!1))}break;case"union":var v=r[t];if(1!==v.alternatives.length){t++;break}try{var y=s(v);r.splice(t,1),o=String(y.value),e.splice(t,2,e[t]+o+e[t+1]);break}catch(e){t++;break}case"intersect":var E=r[t];if(1!==E.intersectees.length){t++;break}try{var p=s(E);r.splice(t,1),o=String(p.value),e.splice(t,2,e[t]+o+e[t+1]);break}catch(e){t++;break}default:t++}}(t,i),[t,i]}(e),2),v=d[0],y=d[1],g={tag:"template",strings:v,runtypes:y},h=(i=(t=g).strings.map(f).reduce((function(e,r,n){var a=e+r,i=t.runtypes[n];return i?a+"(".concat(p(i.reflect),")"):a}),""),new RegExp("^".concat(i,"$"),"su"));return(0,o.create)((function(e,r){if("string"!=typeof e)return u.FAILURE.TYPE_INCORRECT(g,e);var t=function(e,r){var t=e.match(h);if(t){for(var n=t.slice(1),a=0;a<y.length;a++){var i=y[a],o=n[a],f=E(i.reflect,r)(o);if(!f.success)return f}return(0,u.SUCCESS)(e)}return u.FAILURE.VALUE_INCORRECT("string","".concat((0,c.default)(g)),'"'.concat((0,l.literal)(e),'"'))}(e,r);if(t.success)return(0,u.SUCCESS)(e);var n=u.FAILURE.VALUE_INCORRECT("string","".concat((0,c.default)(g)),'"'.concat(e,'"'));return n.message!==t.message&&(n.message+=" (inner: ".concat(t.message,")")),n}),g)}},171:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Tuple=void 0;var n=t(198),a=t(435);r.Tuple=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t={tag:"tuple",components:e};return(0,n.create)((function(r,i){if(!Array.isArray(r))return a.FAILURE.TYPE_INCORRECT(t,r);if(r.length!==e.length)return a.FAILURE.CONSTRAINT_FAILED(t,"Expected length ".concat(e.length,", but was ").concat(r.length));var o=(0,a.enumerableKeysOf)(r),c=o.map((function(t){return(0,n.innerValidate)(e[t],r[t],i)})),u=o.reduce((function(e,r){var t=c[r];return t.success||(e[r]=t.details||t.message),e}),[]);return 0!==(0,a.enumerableKeysOf)(u).length?a.FAILURE.CONTENT_INCORRECT(t,u):(0,a.SUCCESS)(r)}),t)}},162:function(e,r,t){var n=this&&this.__values||function(e){var r="function"==typeof Symbol&&Symbol.iterator,t=r&&e[r],n=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(r,"__esModule",{value:!0}),r.Union=void 0;var a=t(198),i=t(435);r.Union=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var t={tag:"union",alternatives:e,match:function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return function(t){for(var n=0;n<e.length;n++)if(e[n].guard(t))return r[n](t)}}};return(0,a.create)((function(r,o){var c,u,l,f,s,d,v,y;if("object"!=typeof r||null===r){try{for(var E=n(e),p=E.next();!p.done;p=E.next()){var g=p.value;if((0,a.innerValidate)(g,r,o).success)return(0,i.SUCCESS)(r)}}catch(e){c={error:e}}finally{try{p&&!p.done&&(u=E.return)&&u.call(E)}finally{if(c)throw c.error}}return i.FAILURE.TYPE_INCORRECT(t,r)}var h={};try{for(var R=n(e),C=R.next();!C.done;C=R.next())if("record"===(g=C.value).reflect.tag){var b=function(e){var r=g.reflect.fields[e];"literal"===r.tag&&(h[e]?h[e].every((function(e){return e!==r.value}))&&h[e].push(r.value):h[e]=[r.value])};for(var _ in g.reflect.fields)b(_)}}catch(e){l={error:e}}finally{try{C&&!C.done&&(f=R.return)&&f.call(R)}finally{if(l)throw l.error}}for(var _ in h)if(h[_].length===e.length)try{for(var O=(s=void 0,n(e)),S=O.next();!S.done;S=O.next())if("record"===(g=S.value).reflect.tag){var T=g.reflect.fields[_];if("literal"===T.tag&&(0,i.hasKey)(_,r)&&r[_]===T.value)return(0,a.innerValidate)(g,r,o)}}catch(e){s={error:e}}finally{try{S&&!S.done&&(d=O.return)&&d.call(O)}finally{if(s)throw s.error}}try{for(var I=n(e),N=I.next();!N.done;N=I.next()){var m=N.value;if((0,a.innerValidate)(m,r,o).success)return(0,i.SUCCESS)(r)}}catch(e){v={error:e}}finally{try{N&&!N.done&&(y=I.return)&&y.call(I)}finally{if(v)throw v.error}}return i.FAILURE.TYPE_INCORRECT(t,r)}),t)}},143:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Unknown=void 0;var n=t(198),a=t(435);r.Unknown=(0,n.create)((function(e){return(0,a.SUCCESS)(e)}),{tag:"unknown"})},811:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.Void=void 0;var n=t(143);r.Void=n.Unknown},435:function(e,r,t){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e},n.apply(this,arguments)};Object.defineProperty(r,"__esModule",{value:!0}),r.FAILURE=r.SUCCESS=r.enumerableKeysOf=r.typeOf=r.hasKey=void 0;var a=t(594),i=t(666);r.hasKey=function(e,r){return"object"==typeof r&&null!==r&&e in r},r.typeOf=function(e){var r,t,n;return"object"==typeof e?null===e?"null":Array.isArray(e)?"array":"Object"===(null===(r=e.constructor)||void 0===r?void 0:r.name)?"object":null!==(n=null===(t=e.constructor)||void 0===t?void 0:t.name)&&void 0!==n?n:typeof e:typeof e},r.enumerableKeysOf=function(e){return"object"==typeof e&&null!==e?Reflect.ownKeys(e).filter((function(r){var t,n;return null===(n=null===(t=e.propertyIsEnumerable)||void 0===t?void 0:t.call(e,r))||void 0===n||n})):[]},r.SUCCESS=function(e){return{success:!0,value:e}},r.FAILURE=Object.assign((function(e,r,t){return n({success:!1,code:e,message:r},t?{details:t}:{})}),{TYPE_INCORRECT:function(e,t){var n="Expected ".concat("template"===e.tag?"string ".concat((0,i.default)(e)):(0,i.default)(e),", but was ").concat((0,r.typeOf)(t));return(0,r.FAILURE)(a.Failcode.TYPE_INCORRECT,n)},VALUE_INCORRECT:function(e,t,n){return(0,r.FAILURE)(a.Failcode.VALUE_INCORRECT,"Expected ".concat(e," ").concat(String(t),", but was ").concat(String(n)))},KEY_INCORRECT:function(e,t,n){return(0,r.FAILURE)(a.Failcode.KEY_INCORRECT,"Expected ".concat((0,i.default)(e)," key to be ").concat((0,i.default)(t),", but was ").concat((0,r.typeOf)(n)))},CONTENT_INCORRECT:function(e,t){var n=JSON.stringify(t,null,2).replace(/^ *null,\n/gm,""),o="Validation failed:\n".concat(n,".\nObject should match ").concat((0,i.default)(e));return(0,r.FAILURE)(a.Failcode.CONTENT_INCORRECT,o,t)},ARGUMENT_INCORRECT:function(e){return(0,r.FAILURE)(a.Failcode.ARGUMENT_INCORRECT,e)},RETURN_INCORRECT:function(e){return(0,r.FAILURE)(a.Failcode.RETURN_INCORRECT,e)},CONSTRAINT_FAILED:function(e,t){var n=t?": ".concat(t):"";return(0,r.FAILURE)(a.Failcode.CONSTRAINT_FAILED,"Failed constraint check for ".concat((0,i.default)(e)).concat(n))},PROPERTY_MISSING:function(e){var t="Expected ".concat((0,i.default)(e),", but was missing");return(0,r.FAILURE)(a.Failcode.PROPERTY_MISSING,t)},PROPERTY_PRESENT:function(e){var t="Expected nothing, but was ".concat((0,r.typeOf)(e));return(0,r.FAILURE)(a.Failcode.PROPERTY_PRESENT,t)},NOTHING_EXPECTED:function(e){var t="Expected nothing, but was ".concat((0,r.typeOf)(e));return(0,r.FAILURE)(a.Failcode.NOTHING_EXPECTED,t)}})}},r={},t=function t(n){var a=r[n];if(void 0!==a)return a.exports;var i=r[n]={exports:{}};return e[n].call(i.exports,i,i.exports,t),i.exports}(715),n=t.Record({title:t.String,body:t.String,url:t.String,icon:t.Optional(t.String)});console.log("Custom service worker functions for pr-webrtc: version=",35),self.addEventListener("notificationclick",(e=>{e.notification.close(),"url"in e.notification.data&&e.waitUntil(self.clients.openWindow(e.notification.data.url))})),self.addEventListener("push",(e=>{var r,t=null===(r=e.data)||void 0===r?void 0:r.json(),a=n.guard(t)?{body:t.body,data:{url:t.url},requireInteraction:!0,silent:!1,icon:t.icon}:{body:"Unexpected push event (pr-webrtc)"},i=n.guard(t)?t.title:"Fehlerhafte PushMsg",o=self.registration.showNotification(i,a),c=self.clients.matchAll().then((r=>{r.forEach((r=>{var t;r.postMessage(null===(t=e.data)||void 0===t?void 0:t.json())}))}));e.waitUntil(Promise.all([o,c]))}))})();
//# sourceMappingURL=sw.js.map