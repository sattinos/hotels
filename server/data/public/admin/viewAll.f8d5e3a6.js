!function(e,t,r,n,a){var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof l.parcelRequire&&l.parcelRequire,o="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(r,n){if(!t[r]){if(!e[r]){var a="function"==typeof parcelRequire&&parcelRequire;if(!n&&a)return a(r,!0);if(i)return i(r,!0);if(o&&"string"==typeof r)return o(r);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}u.resolve=function(t){return e[r][1][t]||t},u.cache={};var c=t[r]=new s.Module(r);e[r][0].call(c.exports,u,c,c.exports,this)}return t[r].exports;function u(e){return s(u.resolve(e))}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=t,s.parent=i,s.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},l.parcelRequire=s;for(var c=0;c<r.length;c++)s(r[c])}({"5n5vc":[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var l=n?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(r,a,l):r[a]=e[a]}r.default=e,t&&t.set(e,r);return r}(e("react"));e("./style.less");var a=s(e("../entityCRUD/viewAllCrud")),l=s(e("../../controller/lib/localization/localizer")),i=s(e("../../controller/appController")),o=s(e("../lib/digitsInput/input"));function s(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}class u extends n.Component{_tableRef=null;columns=[{Header:"ID",accessor:"id",className:"center",width:40,minResizeWidth:20},{Header:"Name",accessor:"name",className:"center",minResizeWidth:20,Cell:({original:e})=>n.createElement("input",{value:e.name,className:"tableEditText",type:"text",onChange:t=>this.onRowFieldChange(e,"name",t.target.value)})},{Header:"Price",accessor:"price",className:"center",minResizeWidth:20,Cell:({original:e})=>n.createElement(o.default,{value:e.price,className:"tableEditText",placeHolder:"",onChange:t=>this.onRowFieldChange(e,"price",t)})},{Header:"Count",accessor:"count",className:"center",minResizeWidth:20,Cell:({original:e})=>n.createElement(o.default,{value:e.count,className:"tableEditText",placeHolder:"",onChange:t=>this.onRowFieldChange(e,"count",t)})},{Header:"Area",accessor:"area",className:"center",minResizeWidth:20,Cell:({original:e})=>n.createElement(o.default,{value:e.area,className:"tableEditText",placeHolder:"",onChange:t=>this.onRowFieldChange(e,"area",t)})},{Header:"Description",accessor:"description",className:"center",minResizeWidth:20,Cell:({original:e})=>n.createElement("input",{value:e.description,className:"tableEditText",type:"text",onChange:t=>this.onRowFieldChange(e,"description",t.target.value)})}];constructor(e){super(e)}render(){return n.createElement(a.default,{title:l.default.text("flatType.all"),columns:this.columns,entityFetcher:i.default.flatTypeFetcher,ref:e=>this._tableRef=e,entityName:"flatType"})}onRowFieldChange=(e,t,r)=>{e[t]=r,this._tableRef&&this._tableRef.onEntityModified(e)}}var d=u;r.default=d},{react:"28kAn","./style.less":"2bK0R","../entityCRUD/viewAllCrud":"2rhHW","../../controller/lib/localization/localizer":"2Lq0B","../../controller/appController":"5m3ws","../lib/digitsInput/input":"1JZbi"}],"2bK0R":[function(){},{}],"1JZbi":[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if(Object.prototype.hasOwnProperty.call(e,l)){var i=n?Object.getOwnPropertyDescriptor(e,l):null;i&&(i.get||i.set)?Object.defineProperty(r,l,i):r[l]=e[l]}r.default=e,t&&t.set(e,r);return r}(e("react"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}class l extends n.Component{constructor(e){super(e),this.state={s:""}}render(){return n.createElement("input",{className:this.props.className,id:this.props.id,type:"tel",pattern:"[0-9]*",value:this.props.value,placeholder:this.props.placeHolder,readOnly:this.props.readOnly||!1,onChange:this.onChangeHandler})}onChangeHandler=({target:e})=>{const t=e.value;if(""===t)return void this.props.onChange(t);let r=!1;for(let e=0;e<t.length;e++){const n=t[e];if(!(n<="9"&&n>="0")){if("."!==n||r)return;r=!0}}this.props.onChange(t)}}var i=l;r.default=i},{react:"28kAn"}]},{},[]);