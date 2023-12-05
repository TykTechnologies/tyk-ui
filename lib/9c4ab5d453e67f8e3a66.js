"no use strict";(()=>{var D=(u,h)=>()=>(h||u((h={exports:{}}).exports,h),h.exports);var E=D(M=>{(function(u){if(typeof u.window!="undefined"&&u.document||u.require&&u.define)return;u.console||(u.console=function(){var a=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:a})},u.console.error=u.console.warn=u.console.log=u.console.trace=u.console),u.window=u,u.ace=u,u.onerror=function(a,r,t,e,i){postMessage({type:"error",data:{message:a,data:i&&i.data,file:r,line:t,col:e,stack:i&&i.stack}})},u.normalizeModule=function(a,r){if(r.indexOf("!")!==-1){var t=r.split("!");return u.normalizeModule(a,t[0])+"!"+u.normalizeModule(a,t[1])}if(r.charAt(0)=="."){var e=a.split("/").slice(0,-1).join("/");for(r=(e?e+"/":"")+r;r.indexOf(".")!==-1&&i!=r;){var i=r;r=r.replace(/^\.\//,"").replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return r},u.require=function(r,t){if(t||(t=r,r=null),!t.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments");t=u.normalizeModule(r,t);var e=u.require.modules[t];if(e)return e.initialized||(e.initialized=!0,e.exports=e.factory().exports),e.exports;if(!u.require.tlns)return console.log("unable to load "+t);var i=h(t,u.require.tlns);return i.slice(-3)!=".js"&&(i+=".js"),u.require.id=t,u.require.modules[t]={},importScripts(i),u.require(r,t)};function h(a,r){for(var t=a,e="";t;){var i=r[t];if(typeof i=="string")return i+e;if(i)return i.location.replace(/\/*$/,"/")+(e||i.main||i.name);if(i===!1)return"";var o=t.lastIndexOf("/");if(o===-1)break;e=t.substr(o)+e,t=t.slice(0,o)}return a}u.require.modules={},u.require.tlns={},u.define=function(a,r,t){if(arguments.length==2?(t=r,typeof a!="string"&&(r=a,a=u.require.id)):arguments.length==1&&(t=a,r=[],a=u.require.id),typeof t!="function"){u.require.modules[a]={exports:t,initialized:!0};return}r.length||(r=["require","exports","module"]);var e=function(i){return u.require(a,i)};u.require.modules[a]={exports:{},factory:function(){var i=this,o=t.apply(this,r.slice(0,t.length).map(function(n){switch(n){case"require":return e;case"exports":return i.exports;case"module":return i;default:return e(n)}}));return o&&(i.exports=o),i}}},u.define.amd={},u.require.tlns={},u.initBaseUrls=function(r){for(var t in r)this.require.tlns[t]=r[t]},u.initSender=function(){var r=u.require("ace/lib/event_emitter").EventEmitter,t=u.require("ace/lib/oop"),e=function(){};return function(){t.implement(this,r),this.callback=function(i,o){postMessage({type:"call",id:o,data:i})},this.emit=function(i,o){postMessage({type:"event",name:i,data:o})}}.call(e.prototype),new e};var d=u.main=null,l=u.sender=null;u.onmessage=function(a){var r=a.data;if(r.event&&l)l._signal(r.event,r.data);else if(r.command)if(d[r.command])d[r.command].apply(d,r.args);else if(u[r.command])u[r.command].apply(u,r.args);else throw new Error("Unknown command:"+r.command);else if(r.init){u.initBaseUrls(r.tlns),l=u.sender=u.initSender();var t=this.require(r.module)[r.classname];d=u.main=new t(l)}}})(M);ace.define("ace/lib/oop",[],function(u,h,d){"use strict";h.inherits=function(l,a){l.super_=a,l.prototype=Object.create(a.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}})},h.mixin=function(l,a){for(var r in a)l[r]=a[r];return l},h.implement=function(l,a){h.mixin(l,a)}});ace.define("ace/apply_delta",[],function(u,h,d){"use strict";function l(t,e){throw console.log("Invalid Delta:",t),"Invalid Delta: "+e}function a(t,e){return e.row>=0&&e.row<t.length&&e.column>=0&&e.column<=t[e.row].length}function r(t,e){e.action!="insert"&&e.action!="remove"&&l(e,"delta.action must be 'insert' or 'remove'"),e.lines instanceof Array||l(e,"delta.lines must be an Array"),(!e.start||!e.end)&&l(e,"delta.start/end must be an present");var i=e.start;a(t,e.start)||l(e,"delta.start must be contained in document");var o=e.end;e.action=="remove"&&!a(t,o)&&l(e,"delta.end must contained in document for 'remove' actions");var n=o.row-i.row,s=o.column-(n==0?i.column:0);(n!=e.lines.length-1||e.lines[n].length!=s)&&l(e,"delta.range must match delta lines")}h.applyDelta=function(t,e,i){var o=e.start.row,n=e.start.column,s=t[o]||"";switch(e.action){case"insert":var c=e.lines;if(c.length===1)t[o]=s.substring(0,n)+e.lines[0]+s.substring(n);else{var f=[o,1].concat(e.lines);t.splice.apply(t,f),t[o]=s.substring(0,n)+t[o],t[o+e.lines.length-1]+=s.substring(n)}break;case"remove":var m=e.end.column,v=e.end.row;o===v?t[o]=s.substring(0,n)+s.substring(m):t.splice(o,v-o+1,s.substring(0,n)+t[v].substring(m));break}}});ace.define("ace/lib/event_emitter",[],function(u,h,d){"use strict";var l={},a=function(){this.propagationStopped=!0},r=function(){this.defaultPrevented=!0};l._emit=l._dispatchEvent=function(t,e){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var i=this._eventRegistry[t]||[],o=this._defaultHandlers[t];if(!(!i.length&&!o)){(typeof e!="object"||!e)&&(e={}),e.type||(e.type=t),e.stopPropagation||(e.stopPropagation=a),e.preventDefault||(e.preventDefault=r),i=i.slice();for(var n=0;n<i.length&&(i[n](e,this),!e.propagationStopped);n++);if(o&&!e.defaultPrevented)return o(e,this)}},l._signal=function(t,e){var i=(this._eventRegistry||{})[t];if(i){i=i.slice();for(var o=0;o<i.length;o++)i[o](e,this)}},l.once=function(t,e){var i=this;if(this.on(t,function o(){i.off(t,o),e.apply(null,arguments)}),!e)return new Promise(function(o){e=o})},l.setDefaultHandler=function(t,e){var i=this._defaultHandlers;if(i||(i=this._defaultHandlers={_disabled_:{}}),i[t]){var o=i[t],n=i._disabled_[t];n||(i._disabled_[t]=n=[]),n.push(o);var s=n.indexOf(e);s!=-1&&n.splice(s,1)}i[t]=e},l.removeDefaultHandler=function(t,e){var i=this._defaultHandlers;if(i){var o=i._disabled_[t];if(i[t]==e)o&&this.setDefaultHandler(t,o.pop());else if(o){var n=o.indexOf(e);n!=-1&&o.splice(n,1)}}},l.on=l.addEventListener=function(t,e,i){this._eventRegistry=this._eventRegistry||{};var o=this._eventRegistry[t];return o||(o=this._eventRegistry[t]=[]),o.indexOf(e)==-1&&o[i?"unshift":"push"](e),e},l.off=l.removeListener=l.removeEventListener=function(t,e){this._eventRegistry=this._eventRegistry||{};var i=this._eventRegistry[t];if(i){var o=i.indexOf(e);o!==-1&&i.splice(o,1)}},l.removeAllListeners=function(t){t||(this._eventRegistry=this._defaultHandlers=void 0),this._eventRegistry&&(this._eventRegistry[t]=void 0),this._defaultHandlers&&(this._defaultHandlers[t]=void 0)},h.EventEmitter=l});ace.define("ace/range",[],function(u,h,d){"use strict";var l=function(r,t){return r.row-t.row||r.column-t.column},a=function(){function r(t,e,i,o){this.start={row:t,column:e},this.end={row:i,column:o}}return r.prototype.isEqual=function(t){return this.start.row===t.start.row&&this.end.row===t.end.row&&this.start.column===t.start.column&&this.end.column===t.end.column},r.prototype.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},r.prototype.contains=function(t,e){return this.compare(t,e)==0},r.prototype.compareRange=function(t){var e,i=t.end,o=t.start;return e=this.compare(i.row,i.column),e==1?(e=this.compare(o.row,o.column),e==1?2:e==0?1:0):e==-1?-2:(e=this.compare(o.row,o.column),e==-1?-1:e==1?42:0)},r.prototype.comparePoint=function(t){return this.compare(t.row,t.column)},r.prototype.containsRange=function(t){return this.comparePoint(t.start)==0&&this.comparePoint(t.end)==0},r.prototype.intersects=function(t){var e=this.compareRange(t);return e==-1||e==0||e==1},r.prototype.isEnd=function(t,e){return this.end.row==t&&this.end.column==e},r.prototype.isStart=function(t,e){return this.start.row==t&&this.start.column==e},r.prototype.setStart=function(t,e){typeof t=="object"?(this.start.column=t.column,this.start.row=t.row):(this.start.row=t,this.start.column=e)},r.prototype.setEnd=function(t,e){typeof t=="object"?(this.end.column=t.column,this.end.row=t.row):(this.end.row=t,this.end.column=e)},r.prototype.inside=function(t,e){return this.compare(t,e)==0?!(this.isEnd(t,e)||this.isStart(t,e)):!1},r.prototype.insideStart=function(t,e){return this.compare(t,e)==0?!this.isEnd(t,e):!1},r.prototype.insideEnd=function(t,e){return this.compare(t,e)==0?!this.isStart(t,e):!1},r.prototype.compare=function(t,e){return!this.isMultiLine()&&t===this.start.row?e<this.start.column?-1:e>this.end.column?1:0:t<this.start.row?-1:t>this.end.row?1:this.start.row===t?e>=this.start.column?0:-1:this.end.row===t?e<=this.end.column?0:1:0},r.prototype.compareStart=function(t,e){return this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},r.prototype.compareEnd=function(t,e){return this.end.row==t&&this.end.column==e?1:this.compare(t,e)},r.prototype.compareInside=function(t,e){return this.end.row==t&&this.end.column==e?1:this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},r.prototype.clipRows=function(t,e){if(this.end.row>e)var i={row:e+1,column:0};else if(this.end.row<t)var i={row:t,column:0};if(this.start.row>e)var o={row:e+1,column:0};else if(this.start.row<t)var o={row:t,column:0};return r.fromPoints(o||this.start,i||this.end)},r.prototype.extend=function(t,e){var i=this.compare(t,e);if(i==0)return this;if(i==-1)var o={row:t,column:e};else var n={row:t,column:e};return r.fromPoints(o||this.start,n||this.end)},r.prototype.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},r.prototype.isMultiLine=function(){return this.start.row!==this.end.row},r.prototype.clone=function(){return r.fromPoints(this.start,this.end)},r.prototype.collapseRows=function(){return this.end.column==0?new r(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new r(this.start.row,0,this.end.row,0)},r.prototype.toScreenRange=function(t){var e=t.documentToScreenPosition(this.start),i=t.documentToScreenPosition(this.end);return new r(e.row,e.column,i.row,i.column)},r.prototype.moveBy=function(t,e){this.start.row+=t,this.start.column+=e,this.end.row+=t,this.end.column+=e},r}();a.fromPoints=function(r,t){return new a(r.row,r.column,t.row,t.column)},a.comparePoints=l,a.comparePoints=function(r,t){return r.row-t.row||r.column-t.column},h.Range=a});ace.define("ace/anchor",[],function(u,h,d){"use strict";var l=u("./lib/oop"),a=u("./lib/event_emitter").EventEmitter,r=function(){function i(o,n,s){this.$onChange=this.onChange.bind(this),this.attach(o),typeof s=="undefined"?this.setPosition(n.row,n.column):this.setPosition(n,s)}return i.prototype.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},i.prototype.getDocument=function(){return this.document},i.prototype.onChange=function(o){if(!(o.start.row==o.end.row&&o.start.row!=this.row)&&!(o.start.row>this.row)){var n=e(o,{row:this.row,column:this.column},this.$insertRight);this.setPosition(n.row,n.column,!0)}},i.prototype.setPosition=function(o,n,s){var c;if(s?c={row:o,column:n}:c=this.$clipPositionToDocument(o,n),!(this.row==c.row&&this.column==c.column)){var f={row:this.row,column:this.column};this.row=c.row,this.column=c.column,this._signal("change",{old:f,value:c})}},i.prototype.detach=function(){this.document.off("change",this.$onChange)},i.prototype.attach=function(o){this.document=o||this.document,this.document.on("change",this.$onChange)},i.prototype.$clipPositionToDocument=function(o,n){var s={};return o>=this.document.getLength()?(s.row=Math.max(0,this.document.getLength()-1),s.column=this.document.getLine(s.row).length):o<0?(s.row=0,s.column=0):(s.row=o,s.column=Math.min(this.document.getLine(s.row).length,Math.max(0,n))),n<0&&(s.column=0),s},i}();r.prototype.$insertRight=!1,l.implement(r.prototype,a);function t(i,o,n){var s=n?i.column<=o.column:i.column<o.column;return i.row<o.row||i.row==o.row&&s}function e(i,o,n){var s=i.action=="insert",c=(s?1:-1)*(i.end.row-i.start.row),f=(s?1:-1)*(i.end.column-i.start.column),m=i.start,v=s?m:i.end;return t(o,m,n)?{row:o.row,column:o.column}:t(v,o,!n)?{row:o.row+c,column:o.column+(o.row==v.row?f:0)}:{row:m.row,column:m.column}}h.Anchor=r});ace.define("ace/document",[],function(u,h,d){"use strict";var l=u("./lib/oop"),a=u("./apply_delta").applyDelta,r=u("./lib/event_emitter").EventEmitter,t=u("./range").Range,e=u("./anchor").Anchor,i=function(){function o(n){this.$lines=[""],n.length===0?this.$lines=[""]:Array.isArray(n)?this.insertMergedLines({row:0,column:0},n):this.insert({row:0,column:0},n)}return o.prototype.setValue=function(n){var s=this.getLength()-1;this.remove(new t(0,0,s,this.getLine(s).length)),this.insert({row:0,column:0},n||"")},o.prototype.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},o.prototype.createAnchor=function(n,s){return new e(this,n,s)},o.prototype.$detectNewLine=function(n){var s=n.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=s?s[1]:`
`,this._signal("changeNewLineMode")},o.prototype.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return`\r
`;case"unix":return`
`;default:return this.$autoNewLine||`
`}},o.prototype.setNewLineMode=function(n){this.$newLineMode!==n&&(this.$newLineMode=n,this._signal("changeNewLineMode"))},o.prototype.getNewLineMode=function(){return this.$newLineMode},o.prototype.isNewLine=function(n){return n==`\r
`||n=="\r"||n==`
`},o.prototype.getLine=function(n){return this.$lines[n]||""},o.prototype.getLines=function(n,s){return this.$lines.slice(n,s+1)},o.prototype.getAllLines=function(){return this.getLines(0,this.getLength())},o.prototype.getLength=function(){return this.$lines.length},o.prototype.getTextRange=function(n){return this.getLinesForRange(n).join(this.getNewLineCharacter())},o.prototype.getLinesForRange=function(n){var s;if(n.start.row===n.end.row)s=[this.getLine(n.start.row).substring(n.start.column,n.end.column)];else{s=this.getLines(n.start.row,n.end.row),s[0]=(s[0]||"").substring(n.start.column);var c=s.length-1;n.end.row-n.start.row==c&&(s[c]=s[c].substring(0,n.end.column))}return s},o.prototype.insertLines=function(n,s){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(n,s)},o.prototype.removeLines=function(n,s){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(n,s)},o.prototype.insertNewLine=function(n){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."),this.insertMergedLines(n,["",""])},o.prototype.insert=function(n,s){return this.getLength()<=1&&this.$detectNewLine(s),this.insertMergedLines(n,this.$split(s))},o.prototype.insertInLine=function(n,s){var c=this.clippedPos(n.row,n.column),f=this.pos(n.row,n.column+s.length);return this.applyDelta({start:c,end:f,action:"insert",lines:[s]},!0),this.clonePos(f)},o.prototype.clippedPos=function(n,s){var c=this.getLength();n===void 0?n=c:n<0?n=0:n>=c&&(n=c-1,s=void 0);var f=this.getLine(n);return s==null&&(s=f.length),s=Math.min(Math.max(s,0),f.length),{row:n,column:s}},o.prototype.clonePos=function(n){return{row:n.row,column:n.column}},o.prototype.pos=function(n,s){return{row:n,column:s}},o.prototype.$clipPosition=function(n){var s=this.getLength();return n.row>=s?(n.row=Math.max(0,s-1),n.column=this.getLine(s-1).length):(n.row=Math.max(0,n.row),n.column=Math.min(Math.max(n.column,0),this.getLine(n.row).length)),n},o.prototype.insertFullLines=function(n,s){n=Math.min(Math.max(n,0),this.getLength());var c=0;n<this.getLength()?(s=s.concat([""]),c=0):(s=[""].concat(s),n--,c=this.$lines[n].length),this.insertMergedLines({row:n,column:c},s)},o.prototype.insertMergedLines=function(n,s){var c=this.clippedPos(n.row,n.column),f={row:c.row+s.length-1,column:(s.length==1?c.column:0)+s[s.length-1].length};return this.applyDelta({start:c,end:f,action:"insert",lines:s}),this.clonePos(f)},o.prototype.remove=function(n){var s=this.clippedPos(n.start.row,n.start.column),c=this.clippedPos(n.end.row,n.end.column);return this.applyDelta({start:s,end:c,action:"remove",lines:this.getLinesForRange({start:s,end:c})}),this.clonePos(s)},o.prototype.removeInLine=function(n,s,c){var f=this.clippedPos(n,s),m=this.clippedPos(n,c);return this.applyDelta({start:f,end:m,action:"remove",lines:this.getLinesForRange({start:f,end:m})},!0),this.clonePos(f)},o.prototype.removeFullLines=function(n,s){n=Math.min(Math.max(0,n),this.getLength()-1),s=Math.min(Math.max(0,s),this.getLength()-1);var c=s==this.getLength()-1&&n>0,f=s<this.getLength()-1,m=c?n-1:n,v=c?this.getLine(m).length:0,p=f?s+1:s,g=f?0:this.getLine(p).length,y=new t(m,v,p,g),L=this.$lines.slice(n,s+1);return this.applyDelta({start:y.start,end:y.end,action:"remove",lines:this.getLinesForRange(y)}),L},o.prototype.removeNewLine=function(n){n<this.getLength()-1&&n>=0&&this.applyDelta({start:this.pos(n,this.getLine(n).length),end:this.pos(n+1,0),action:"remove",lines:["",""]})},o.prototype.replace=function(n,s){if(n instanceof t||(n=t.fromPoints(n.start,n.end)),s.length===0&&n.isEmpty())return n.start;if(s==this.getTextRange(n))return n.end;this.remove(n);var c;return s?c=this.insert(n.start,s):c=n.start,c},o.prototype.applyDeltas=function(n){for(var s=0;s<n.length;s++)this.applyDelta(n[s])},o.prototype.revertDeltas=function(n){for(var s=n.length-1;s>=0;s--)this.revertDelta(n[s])},o.prototype.applyDelta=function(n,s){var c=n.action=="insert";(c?n.lines.length<=1&&!n.lines[0]:!t.comparePoints(n.start,n.end))||(c&&n.lines.length>2e4?this.$splitAndapplyLargeDelta(n,2e4):(a(this.$lines,n,s),this._signal("change",n)))},o.prototype.$safeApplyDelta=function(n){var s=this.$lines.length;(n.action=="remove"&&n.start.row<s&&n.end.row<s||n.action=="insert"&&n.start.row<=s)&&this.applyDelta(n)},o.prototype.$splitAndapplyLargeDelta=function(n,s){for(var c=n.lines,f=c.length-s+1,m=n.start.row,v=n.start.column,p=0,g=0;p<f;p=g){g+=s-1;var y=c.slice(p,g);y.push(""),this.applyDelta({start:this.pos(m+p,v),end:this.pos(m+g,v=0),action:n.action,lines:y},!0)}n.lines=c.slice(p),n.start.row=m+p,n.start.column=v,this.applyDelta(n,!0)},o.prototype.revertDelta=function(n){this.$safeApplyDelta({start:this.clonePos(n.start),end:this.clonePos(n.end),action:n.action=="insert"?"remove":"insert",lines:n.lines.slice()})},o.prototype.indexToPosition=function(n,s){for(var c=this.$lines||this.getAllLines(),f=this.getNewLineCharacter().length,m=s||0,v=c.length;m<v;m++)if(n-=c[m].length+f,n<0)return{row:m,column:n+c[m].length+f};return{row:v-1,column:n+c[v-1].length+f}},o.prototype.positionToIndex=function(n,s){for(var c=this.$lines||this.getAllLines(),f=this.getNewLineCharacter().length,m=0,v=Math.min(n.row,c.length),p=s||0;p<v;++p)m+=c[p].length+f;return m+n.column},o.prototype.$split=function(n){return n.split(/\r\n|\r|\n/)},o}();i.prototype.$autoNewLine="",i.prototype.$newLineMode="auto",l.implement(i.prototype,r),h.Document=i});ace.define("ace/lib/deep_copy",[],function(u,h,d){h.deepCopy=function l(a){if(typeof a!="object"||!a)return a;var r;if(Array.isArray(a)){r=[];for(var t=0;t<a.length;t++)r[t]=l(a[t]);return r}if(Object.prototype.toString.call(a)!=="[object Object]")return a;r={};for(var t in a)r[t]=l(a[t]);return r}});ace.define("ace/lib/lang",[],function(u,h,d){"use strict";h.last=function(r){return r[r.length-1]},h.stringReverse=function(r){return r.split("").reverse().join("")},h.stringRepeat=function(r,t){for(var e="";t>0;)t&1&&(e+=r),(t>>=1)&&(r+=r);return e};var l=/^\s\s*/,a=/\s\s*$/;h.stringTrimLeft=function(r){return r.replace(l,"")},h.stringTrimRight=function(r){return r.replace(a,"")},h.copyObject=function(r){var t={};for(var e in r)t[e]=r[e];return t},h.copyArray=function(r){for(var t=[],e=0,i=r.length;e<i;e++)r[e]&&typeof r[e]=="object"?t[e]=this.copyObject(r[e]):t[e]=r[e];return t},h.deepCopy=u("./deep_copy").deepCopy,h.arrayToMap=function(r){for(var t={},e=0;e<r.length;e++)t[r[e]]=1;return t},h.createMap=function(r){var t=Object.create(null);for(var e in r)t[e]=r[e];return t},h.arrayRemove=function(r,t){for(var e=0;e<=r.length;e++)t===r[e]&&r.splice(e,1)},h.escapeRegExp=function(r){return r.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},h.escapeHTML=function(r){return(""+r).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},h.getMatchOffsets=function(r,t){var e=[];return r.replace(t,function(i){e.push({offset:arguments[arguments.length-2],length:i.length})}),e},h.deferredCall=function(r){var t=null,e=function(){t=null,r()},i=function(o){return i.cancel(),t=setTimeout(e,o||0),i};return i.schedule=i,i.call=function(){return this.cancel(),r(),i},i.cancel=function(){return clearTimeout(t),t=null,i},i.isPending=function(){return t},i},h.delayedCall=function(r,t){var e=null,i=function(){e=null,r()},o=function(n){e==null&&(e=setTimeout(i,n||t))};return o.delay=function(n){e&&clearTimeout(e),e=setTimeout(i,n||t)},o.schedule=o,o.call=function(){this.cancel(),r()},o.cancel=function(){e&&clearTimeout(e),e=null},o.isPending=function(){return e},o},h.supportsLookbehind=function(){try{new RegExp("(?<=.)")}catch(r){return!1}return!0},h.supportsUnicodeFlag=function(){try{new RegExp("^.$","u")}catch(r){return!1}return!0}});ace.define("ace/worker/mirror",[],function(u,h,d){"use strict";var l=u("../document").Document,a=u("../lib/lang"),r=h.Mirror=function(t){this.sender=t;var e=this.doc=new l(""),i=this.deferredUpdate=a.delayedCall(this.onUpdate.bind(this)),o=this;t.on("change",function(n){var s=n.data;if(s[0].start)e.applyDeltas(s);else for(var c=0;c<s.length;c+=2){var f,m;if(Array.isArray(s[c+1])?f={action:"insert",start:s[c],lines:s[c+1]}:f={action:"remove",start:s[c],end:s[c+1]},(f.action=="insert"?f.start:f.end).row>=e.$lines.length)throw m=new Error("Invalid delta"),m.data={path:o.$path,linesLength:e.$lines.length,start:f.start,end:f.end},m;e.applyDelta(f,!0)}if(o.$timeout)return i.schedule(o.$timeout);o.onUpdate()})};(function(){this.$timeout=500,this.setTimeout=function(t){this.$timeout=t},this.setValue=function(t){this.doc.setValue(t),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(t){this.sender.callback(this.doc.getValue(),t)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(r.prototype)});ace.define("ace/mode/json/json_parse",[],function(u,h,d){"use strict";var l,a,r={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:`
`,r:"\r",t:"	"},t,e=function(p){throw{name:"SyntaxError",message:p,at:l,text:t}},i=function(p){return p&&p!==a&&e("Expected '"+p+"' instead of '"+a+"'"),a=t.charAt(l),l+=1,a},o=function(){var p,g="";for(a==="-"&&(g="-",i("-"));a>="0"&&a<="9";)g+=a,i();if(a===".")for(g+=".";i()&&a>="0"&&a<="9";)g+=a;if(a==="e"||a==="E")for(g+=a,i(),(a==="-"||a==="+")&&(g+=a,i());a>="0"&&a<="9";)g+=a,i();if(p=+g,isNaN(p))e("Bad number");else return p},n=function(){var p,g,y="",L;if(a==='"')for(;i();){if(a==='"')return i(),y;if(a==="\\")if(i(),a==="u"){for(L=0,g=0;g<4&&(p=parseInt(i(),16),!!isFinite(p));g+=1)L=L*16+p;y+=String.fromCharCode(L)}else if(typeof r[a]=="string")y+=r[a];else break;else{if(a==`
`||a=="\r")break;y+=a}}e("Bad string")},s=function(){for(;a&&a<=" ";)i()},c=function(){switch(a){case"t":return i("t"),i("r"),i("u"),i("e"),!0;case"f":return i("f"),i("a"),i("l"),i("s"),i("e"),!1;case"n":return i("n"),i("u"),i("l"),i("l"),null}e("Unexpected '"+a+"'")},f,m=function(){var p=[];if(a==="["){if(i("["),s(),a==="]")return i("]"),p;for(;a;){if(p.push(f()),s(),a==="]")return i("]"),p;i(","),s()}}e("Bad array")},v=function(){var p,g={};if(a==="{"){if(i("{"),s(),a==="}")return i("}"),g;for(;a;){if(p=n(),s(),i(":"),Object.hasOwnProperty.call(g,p)&&e('Duplicate key "'+p+'"'),g[p]=f(),s(),a==="}")return i("}"),g;i(","),s()}}e("Bad object")};return f=function(){switch(s(),a){case"{":return v();case"[":return m();case'"':return n();case"-":return o();default:return a>="0"&&a<="9"?o():c()}},function(p,g){var y;return t=p,l=0,a=" ",y=f(),s(),a&&e("Syntax error"),typeof g=="function"?function L(_,$){var P,b,w=_[$];if(w&&typeof w=="object")for(P in w)Object.hasOwnProperty.call(w,P)&&(b=L(w,P),b!==void 0?w[P]=b:delete w[P]);return g.call(_,$,w)}({"":y},""):y}});ace.define("ace/mode/json_worker",[],function(u,h,d){"use strict";var l=u("../lib/oop"),a=u("../worker/mirror").Mirror,r=u("./json/json_parse"),t=h.JsonWorker=function(e){a.call(this,e),this.setTimeout(200)};l.inherits(t,a),function(){this.onUpdate=function(){var e=this.doc.getValue(),i=[];try{e&&r(e)}catch(n){var o=this.doc.indexToPosition(n.at-1);i.push({row:o.row,column:o.column,text:n.message,type:"error"})}this.sender.emit("annotate",i)}}.call(t.prototype)})});E();})();

//# sourceMappingURL=9c4ab5d453e67f8e3a66.js.map