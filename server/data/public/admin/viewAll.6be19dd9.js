!function(e,t,n,r,i){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof o.parcelRequire&&o.parcelRequire,a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(n,r){if(!t[n]){if(!e[n]){var i="function"==typeof parcelRequire&&parcelRequire;if(!r&&i)return i(n,!0);if(l)return l(n,!0);if(a&&"string"==typeof n)return a(n);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}c.resolve=function(t){return e[n][1][t]||t},c.cache={};var u=t[n]=new s.Module(n);e[n][0].call(u.exports,c,u,u.exports,this)}return t[n].exports;function c(e){return s(c.resolve(e))}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=t,s.parent=l,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},o.parcelRequire=s;for(var u=0;u<n.length;u++)s(n[u])}({"347gq":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var o=r?Object.getOwnPropertyDescriptor(e,i):null;o&&(o.get||o.set)?Object.defineProperty(n,i,o):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(e("react")),i=e("../../model/bedEntity"),o=u(e("../../controller/lib/localization/localizer")),l=e("../lib/optionsInput"),a=u(e("../../controller/appController")),s=u(e("../entityCRUD/viewAllCrud"));function u(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}class p extends r.Component{_tableRef=null;columns=[{Header:"ID",accessor:"id",className:"center",width:40,minResizeWidth:20},{Header:"Name",accessor:"name",className:"center",minResizeWidth:20,Cell:({original:e})=>r.createElement("input",{value:e.name,className:"tableEditText",type:"text",onChange:t=>this.onNameChange(e,t.target.value)})},{Header:"Type",accessor:"type",className:"center",width:160,minResizeWidth:20,Cell:({original:e})=>r.createElement(l.OptionsInput,{title:"",options:i.bedTypes,index:e.type,OnOptionSelected:t=>this.onOptionSelected(e,t)})},{Header:"Description",accessor:"description",className:"center",minResizeWidth:20,Cell:({original:e})=>r.createElement("input",{value:e.description,className:"tableEditText",type:"text",onChange:t=>this.onDescriptionChange(e,t.target.value)})}];constructor(e){super(e)}render(){return r.createElement(s.default,{title:o.default.text("bed.all"),columns:this.columns,entityFetcher:a.default.bedsFetcher,ref:e=>this._tableRef=e,entityName:"bed"})}onNameChange=(e,t)=>{e.name=t,this._tableRef&&this._tableRef.onEntityModified(e)};onDescriptionChange=(e,t)=>{e.description=t,this._tableRef&&this._tableRef.onEntityModified(e)};onOptionSelected=(e,t)=>{e.type=t,this._tableRef&&this._tableRef.onEntityModified(e)}}n.default=p},{react:"28kAn","../../model/bedEntity":"2sKRw","../../controller/lib/localization/localizer":"2Lq0B","../lib/optionsInput":"4wkfJ","../../controller/appController":"5m3ws","../entityCRUD/viewAllCrud":"2rhHW"}],"2sKRw":[function(e,t,n){"use strict";let r;Object.defineProperty(n,"__esModule",{value:!0}),n.getDefaultBed=n.bedTypes=n.BedType=void 0,n.BedType=r,function(e){e[e.Single=0]="Single",e[e.Double=1]="Double",e[e.KingSize=2]="KingSize"}(r||(n.BedType=r={}));n.bedTypes=["Single Bed","Double Bed","KingSize Bed"];n.getDefaultBed=()=>({name:"",filenames:[],type:r.Single,description:""})},{}],"4wkfJ":[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.OptionsInput=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var l=r?Object.getOwnPropertyDescriptor(e,o):null;l&&(l.get||l.set)?Object.defineProperty(n,o,l):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(e("react"));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}e("./style.less");class o extends r.Component{constructor(e){super(e)}render(){const e=this.props.options.map(((e,t)=>r.createElement("option",{value:t,key:t},e)));let t="center roundedOptionInput nl fillContainer";return this.props.className&&(t+=" "+this.props.className),r.createElement("select",{className:t,name:this.props.title,onChange:this.onChange,value:this.props.index},e)}onChange=async e=>{const t=e.target.value;this.props.OnOptionSelected(t)}}n.OptionsInput=o},{react:"28kAn","./style.less":"62SMr"}],"62SMr":[function(){},{}]},{},[]);