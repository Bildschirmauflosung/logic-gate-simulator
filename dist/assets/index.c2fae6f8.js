var wt=Object.defineProperty,Tt=Object.defineProperties;var bt=Object.getOwnPropertyDescriptors;var nt=Object.getOwnPropertySymbols;var Et=Object.prototype.hasOwnProperty,It=Object.prototype.propertyIsEnumerable;var Y=(i,t,e)=>t in i?wt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,q=(i,t)=>{for(var e in t||(t={}))Et.call(t,e)&&Y(i,e,t[e]);if(nt)for(var e of nt(t))It.call(t,e)&&Y(i,e,t[e]);return i},X=(i,t)=>Tt(i,bt(t));var n=(i,t,e)=>(Y(i,typeof t!="symbol"?t+"":t,e),e);const Ct=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))s(h);new MutationObserver(h=>{for(const l of h)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function e(h){const l={};return h.integrity&&(l.integrity=h.integrity),h.referrerpolicy&&(l.referrerPolicy=h.referrerpolicy),h.crossorigin==="use-credentials"?l.credentials="include":h.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(h){if(h.ep)return;h.ep=!0;const l=e(h);fetch(h.href,l)}};Ct();var r;(function(i){i[i.GATE=0]="GATE",i[i.INPUT=1]="INPUT",i[i.OUTPUT=2]="OUTPUT"})(r||(r={}));const M=new Map([["and",{arity:2,outputCount:1,resolutionFunc:([i,t,...e])=>[i&&t],customStructureRef:null,prereqs:new Set,gType:r.GATE,colour:"#dfae9f"}],["not",{arity:1,outputCount:1,resolutionFunc:([i,...t])=>[!i],customStructureRef:null,prereqs:new Set,gType:r.GATE,colour:"#b5df9f"}],["input",{arity:0,customStructureRef:null,outputCount:1,resolutionFunc:i=>[],prereqs:new Set,gType:r.INPUT,colour:"#000000"}],["output",{arity:1,customStructureRef:null,outputCount:0,resolutionFunc:i=>i,prereqs:new Set,gType:r.OUTPUT,colour:"#000000"}]]);class K extends Error{}function z(i,t){if(!i)throw new K(t)}function ht(i,t){if(i==null)throw new K(t)}function lt(i,t){if(i!==t)throw new K(`Assertion failed: ${i} expected, ${t} got`)}class H{constructor(t,e){n(this,"visited",!1);n(this,"value",[!1]);n(this,"resolutionFunc");n(this,"arity",2);n(this,"outputCount",1);n(this,"gate");n(this,"children",[]);n(this,"iIndexes");this.gate=t,this.arity=t.arity,this.outputCount=t.outputCount,this.resolutionFunc=e.resolutionFunc,this.value=Array(this.outputCount).fill(!1),this.children=Array(this.arity).fill(null),this.iIndexes=Array(this.arity).fill(-1)}connect(t,e,s){z(t<this.children.length,`${t}, ${this.children.length}`),this.children[t]=e,this.iIndexes[t]=s}reset(){this.children.fill(null),this.iIndexes.fill(-1)}requestValue(){return this.visited||(this.visited=!0,ht(this.gate),this.value=this.resolutionFunc(this.gate.inputValues=this.children.map((t,e)=>t==null?void 0:t.requestValue()[this.iIndexes[e]]).flat())),this.gate.outputValues=this.value}}class Nt extends H{constructor(t){lt(t.type,r.INPUT);super(t,M.get("input"))}requestValue(){return this.gate.outputValues}}class yt extends H{constructor(t){lt(t.type,r.OUTPUT);super(t,M.get("output"))}requestValue(){return this.gate.inputValues=super.requestValue()}}class vt extends H{constructor(t,e,s){super(t,X(q({},e),{resolutionFunc:null}));n(this,"internalSim");this.internalSim=P.forCustomGate(s)}requestValue(){return this.visited||(this.visited=!0,ht(this.gate),this.gate.inputValues=this.children.map((t,e)=>t==null?void 0:t.requestValue()[this.iIndexes[e]]).flat(),this.internalSim.gates.filter(t=>t.gate.type===r.INPUT).forEach((t,e)=>t.gate.outputValues=[this.gate.inputValues[e]]),this.internalSim.tick(),this.gate.outputValues=this.value=this.internalSim.gates.filter(t=>t.gate.type===r.OUTPUT).map(t=>t.requestValue()).flat()),this.value}}function Ot(i){switch(i.type){case r.GATE:return M.has(i.name)?new H(i,M.get(i.name)):(z(o.currentProject.registry.has(i.name),`Gate "${i.name}" does not exist, this should be unreachable`),new vt(i,o.currentProject.registry.get(i.name),o.currentProject.gates.get(i.name)));case r.INPUT:return new Nt(i);case r.OUTPUT:return new yt(i)}}class P{constructor(t,e){n(this,"gates",[]);n(this,"outputs",[]);n(this,"prereqs",new Set);this.fGates=t,this.conMap=e,this.rebuild()}rebuild(){this.gates=this.fGates.map(Ot),this.gates.forEach(t=>{t.reset()}),this.conMap.forEach(t=>{this.gates[t.inputGateIndex]!==void 0&&this.gates[t.inputGateIndex].connect(t.inputIndex,this.gates[t.outputGateIndex],t.outputIndex)}),this.outputs=this.gates.filter(t=>t.gate.type===r.OUTPUT)}static forCustomGate(t){let e=new P(t.gates,t.conections);return e.prereqs=t.prereqs,e}static from(t){return new P(t.gates,t.connectionMap)}updateConMap(t){this.conMap=t}tick(){this.outputs.forEach(t=>{t.requestValue()})}}class A{constructor(){n(this,"html",document.createElement("div"));n(this,"items",[]);this.html.className="context-menu",document.body.appendChild(this.html)}addItem(t){t.create(this.html),this.items.push(t)}show(t,e){this.html.style.display="inline-flex",this.html.style.left=t>c.width-this.html.offsetWidth?t-this.html.offsetWidth+"px":t+"px",this.html.style.top=e>c.height-this.html.offsetHeight?e-this.html.offsetHeight+"px":e+"px"}hide(){this.html.style.display="none"}destroy(){this.html.remove()}}var v;(function(i){i[i.NORMAL=0]="NORMAL",i[i.DANGER=1]="DANGER"})(v||(v={}));class I{constructor(t,e,s=0){n(this,"html",document.createElement("div"));this.text=t,this.onClick=e,this.type=s}create(t){switch(this.html.innerText=this.text,this.html.classList.add("context-menu__item"),this.html.addEventListener("click",this.onClick),this.type){case 0:this.html.classList.add("context-menu__item--normal");break;case 1:this.html.classList.add("context-menu__item--danger");break}t.appendChild(this.html)}changeText(t){this.text=t,this.html.innerText=this.text}}var f;(function(i){i[i.MOVE=0]="MOVE",i[i.UP=1]="UP",i[i.DOWN=2]="DOWN",i[i.CONTEXTMENU=3]="CONTEXTMENU"})(f||(f={}));const Mt="#2f2f2f",Pt="#5f5f5f",Lt="#1f1f1f",J="#dfdfdf",Ft="#ff3f3f",Gt="#fff",Ut="#dfdfdf",kt="#afafaf",St="#000",_t="#ff0000",b=class{static setDarkTheme(){document.documentElement.setAttribute("data-theme","dark"),b.bgColour=Mt,b.hoverBgColour=Pt,b.activeBgColour=Lt,b.fgColour=J,b.enabledBgColour=Ft}static setLightTheme(){document.documentElement.setAttribute("data-theme","light"),b.bgColour=Gt,b.hoverBgColour=Ut,b.activeBgColour=kt,b.fgColour=St,b.enabledBgColour=_t}static setSystemTheme(){window.matchMedia("(prefers-color-scheme: dark)")?b.setDarkTheme():b.setLightTheme()}};let u=b;n(u,"bgColour"),n(u,"hoverBgColour"),n(u,"activeBgColour"),n(u,"fgColour"),n(u,"enabledBgColour");var O;(function(i){i[i.GATE=0]="GATE",i[i.POINT=1]="POINT",i[i.BIT_BUTTON=2]="BIT_BUTTON",i[i.ADD_BUTTON=3]="ADD_BUTTON"})(O||(O={}));class at{constructor(t,e,s,h,l=!0){n(this,"hovered",!1);n(this,"pressed",!1);n(this,"menu");n(this,"width",32);n(this,"height",32);n(this,"visible",!1);n(this,"enabled",!1);this.left=t,this.top=e,this.bit=s,this.name=h,this.isInput=l,this.menu=new A,this.menu.addItem(new I("Rename",()=>{this.menu.hide()},v.NORMAL))}handleMouseMove(t){this.hovered=N(t,this.width,this.height,this.left,this.top)}handleMouseUp(t){this.isInput&&this.pressed&&(this.enabled=!this.enabled,o.rs.update(o.ls)),this.pressed=!1}handleMouseDown(t){this.menu.hide(),this.pressed=this.hovered&&t.button===0}handleMouseContextMenu(t){N(t,this.width,this.height,this.left,this.top)&&this.menu.show(t.clientX,t.clientY)}destroyMenu(){this.menu.destroy()}handleEvent(t,e){if(this.visible)switch(t){case f.MOVE:this.handleMouseMove(e);break;case f.UP:this.handleMouseUp(e);break;case f.DOWN:this.handleMouseDown(e);break;case f.CONTEXTMENU:this.handleMouseContextMenu(e);break}}createWidgetData(){return{type:O.BIT_BUTTON,bitIndex:this.bit,isInput:this.isInput,name:this.name,top:this.top,left:this.left,gateRef:null}}render(t){if(this.visible){const e=4;t.beginPath(),t.strokeStyle=u.fgColour,this.enabled?t.fillStyle=u.enabledBgColour:t.fillStyle=u.bgColour,t.moveTo(this.left+e,this.top),t.lineTo(this.left+this.width-e,this.top),t.arcTo(this.left+this.width,this.top,this.left+this.width,this.top+e,e),t.lineTo(this.left+this.width,this.top+this.height-e),t.arcTo(this.left+this.width,this.top+this.height,this.left+this.height-e,this.top+this.height,e),t.lineTo(this.left+e,this.top+this.height),t.arcTo(this.left,this.top+this.height,this.left,this.top+this.height-e,e),t.lineTo(this.left,this.top+e),t.arcTo(this.left,this.top,this.left+e,this.top,e),t.stroke(),t.fill(),t.fillStyle=u.fgColour,t.textAlign="center",t.textBaseline="middle",t.font="normal 1.4rem 'Lato', sans-serif",t.fillText(this.bit.toString(),this.left+this.width/2,this.top+this.height/2)}}}class At{constructor(t,e){this.pointFrom=t,this.pointTo=e}render(t){t.beginPath(),t.strokeStyle=u.fgColour;const e=this.pointFrom.top<this.pointTo.top?4:this.pointFrom.top>this.pointTo.top?-4:0;if(this.pointFrom.left+16>=this.pointTo.left){const s=Math.round((this.pointTo.top+this.pointFrom.top)/2);t.moveTo(this.pointFrom.left,this.pointFrom.top),t.lineTo(this.pointFrom.left+12,this.pointFrom.top),t.arcTo(this.pointFrom.left+16,this.pointFrom.top,this.pointFrom.left+16,this.pointFrom.top+e,4),t.lineTo(this.pointFrom.left+16,s-e),t.arcTo(this.pointFrom.left+16,s,this.pointFrom.left+12,s,4),t.lineTo(this.pointTo.left-12,s),t.arcTo(this.pointTo.left-16,s,this.pointTo.left-16,s+e,4),t.lineTo(this.pointTo.left-16,this.pointTo.top-e),t.arcTo(this.pointTo.left-16,this.pointTo.top,this.pointTo.left-12,this.pointTo.top,4),t.lineTo(this.pointTo.left,this.pointTo.top),t.stroke()}else{const s=Math.round((this.pointTo.left+this.pointFrom.left)/2);t.moveTo(this.pointFrom.left,this.pointFrom.top),t.lineTo(s-4,this.pointFrom.top),t.arcTo(s,this.pointFrom.top,s,this.pointFrom.top+e,4),t.lineTo(s,this.pointTo.top-e),t.arcTo(s,this.pointTo.top,s+4,this.pointTo.top,4),t.lineTo(this.pointTo.left,this.pointTo.top),t.stroke()}}}class C{static swap(){const t=this.pointFrom;this.pointFrom=this.pointTo,this.pointTo=t}}n(C,"pointFrom"),n(C,"pointTo");class w{static swapIndices(){const t=this.inputGateIndex;this.inputGateIndex=this.outputGateIndex,this.outputGateIndex=t;const e=this.inputIndex;this.inputIndex=this.outputIndex,this.outputIndex=e}}n(w,"inputIndex"),n(w,"outputIndex"),n(w,"inputGateIndex"),n(w,"outputGateIndex");class L{}n(L,"showFieldNames",!0),n(L,"theme","System");class x{constructor(t,e,s,h,l,p=!0){n(this,"hovered",!1);n(this,"pressed",!1);n(this,"menu");n(this,"xOffset",0);n(this,"yOffset",0);this.isInput=t,this.left=e,this.top=s,this._parent=h,this.name=l,this.enabled=p,this.menu=new A,this.menu.addItem(new I("Disconnect",()=>{this.menu.hide();const U=[];o.rs.connectionData.forEach((d,F)=>{(d.pointFrom===this||d.pointTo===this)&&U.push(F)}),U.sort((d,F)=>d-F).reverse();for(const d of U)o.rs.connectionData.splice(d,1);o.rs.connectionMap=o.rs.connectionMap.filter(d=>!(h.getID()===d.inputGateIndex||h.getID()===d.outputGateIndex)),o.ls.updateConMap(o.rs.connectionMap)},v.DANGER))}handleMouseMove(t){this.hovered=N(t,12,12,this.left-6,this.top-6),this.xOffset=t.offsetX,this.yOffset=t.offsetY}handleMouseDown(t){var e,s;this.menu.hide(),this.hovered&&t.button===0&&(this.pressed=!0,C.pointFrom=this,this.isInput?(w.outputIndex=this._parent.getPoints()[0].findIndex(h=>h===this),w.outputGateIndex=(e=this._parent.getPoints()[0].find(h=>h===this))==null?void 0:e._parent.getID()):(w.outputIndex=this._parent.getPoints()[1].findIndex(h=>h===this),w.outputGateIndex=(s=this._parent.getPoints()[1].find(h=>h===this))==null?void 0:s._parent.getID()))}handleMouseUp(t){var e,s;if(this.pressed=!1,t.button===0&&this.hovered&&C.pointFrom!==this&&C.pointFrom.isInput!==this.isInput){C.pointTo=this,this.isInput?(w.inputIndex=this._parent.getPoints()[0].findIndex(d=>d===this),w.inputGateIndex=(e=this._parent.getPoints()[0].find(d=>d===this))==null?void 0:e._parent.getID()):(w.inputIndex=this._parent.getPoints()[1].findIndex(d=>d===this),w.inputGateIndex=(s=this._parent.getPoints()[1].find(d=>d===this))==null?void 0:s._parent.getID()),C.pointFrom.isInput&&(C.swap(),w.swapIndices());const h={inputIndex:w.inputIndex,outputIndex:w.outputIndex,inputGateIndex:w.inputGateIndex,outputGateIndex:w.outputGateIndex},l=o.rs.connectionData.findIndex(d=>d.pointFrom===C.pointFrom&&d.pointTo===C.pointTo);if(l!==-1){o.rs.connectionData.splice(l,1);const d=o.rs.connectionMap.findIndex(F=>JSON.stringify(F)===JSON.stringify(h));d!==-1&&(o.rs.connectionMap.splice(d,1),o.ls.updateConMap(o.rs.connectionMap));return}const p=new At(C.pointFrom,C.pointTo);if(o.rs.connectionData.findIndex(d=>d.pointTo===p.pointTo)!==-1)return;o.rs.connectionData.push(p),o.rs.connectionMap.push(h)}}handleMouseContextMenu(t){this.hovered&&this.menu.show(t.clientX,t.clientY)}destroyMenu(){this.menu.destroy()}handleEvent(t,e){switch(t){case f.MOVE:this.enabled&&this.handleMouseMove(e);break;case f.UP:this.enabled&&this.handleMouseUp(e);break;case f.DOWN:this.enabled&&this.handleMouseDown(e);break;case f.CONTEXTMENU:this.handleMouseContextMenu(e);break}}createWidgetData(){return{type:O.POINT,gateRef:this._parent,isInput:this.isInput,name:this.name,top:this.top,left:this.left,bitIndex:null}}render(t){if(t.beginPath(),this.hovered?(t.strokeStyle=u.hoverBgColour,t.fillStyle=u.hoverBgColour):(t.strokeStyle=u.fgColour,t.fillStyle=u.fgColour),t.moveTo(this.left,this.top-5),t.arcTo(this.left+5,this.top-5,this.left+5,this.top,5),t.arcTo(this.left+5,this.top+5,this.left,this.top+5,5),t.arcTo(this.left-5,this.top+5,this.left-5,this.top,5),t.arcTo(this.left-5,this.top-5,this.left,this.top-5,5),t.stroke(),t.fill(),this.pressed)if(t.beginPath(),t.strokeStyle=u.fgColour,this.xOffset>this.left&&this.isInput||this.xOffset<this.left&&!this.isInput){const e=Math.round((this.top+this.yOffset)/2);t.moveTo(this.left,this.top),t.lineTo(this.left+16*(this.isInput?-1:1),this.top),t.lineTo(this.left+16*(this.isInput?-1:1),e),t.lineTo(this.xOffset-16*(this.isInput?-1:1),e),t.lineTo(this.xOffset-16*(this.isInput?-1:1),this.yOffset),t.lineTo(this.xOffset,this.yOffset),t.stroke()}else t.moveTo(this.left,this.top),t.lineTo(Math.round((this.xOffset+this.left)/2),this.top),t.lineTo(Math.round((this.xOffset+this.left)/2),this.yOffset),t.lineTo(this.xOffset,this.yOffset),t.stroke();if(L.showFieldNames&&this.hovered&&this._parent.type===r.GATE){t.beginPath();const e=this.isInput?this.left-16:this.left+24;t.fillStyle=u.fgColour,t.textAlign="right",t.fillText(this.name,e,this.top)}}}class ${constructor(t){n(this,"widgets",[]);n(this,"gates",[]);n(this,"connectionData",[]);n(this,"connectionMap",[]);this.name=t}widgetsFromData(t){this.widgets.splice(0);for(const e of t)switch(e.type){case O.GATE:this.widgets.push(e.gateRef);break;case O.POINT:this.widgets.push(new x(e.isInput,e.left,e.top,e.gateRef,e.name,!0));break;case O.BIT_BUTTON:this.widgets.push(new at(e.left,e.top,e.bitIndex,e.name,e.isInput));break;case O.ADD_BUTTON:this.widgets.push(new Q(e.isInput));break}}render(t){for(const e of this.widgets)e.render(t)}renderWires(t){for(const e of this.connectionData)e.render(t)}handleEvents(t,e){for(const s of this.widgets)s.handleEvent(t,e)}update(t){t.rebuild()}}class rt{constructor(t){n(this,"simulators",new Map);n(this,"gates",new Map);n(this,"registry",new Map([...M]));this.name=t;const e=new $("New Gate");this.simulators.set("New Gate",[e,P.from(e)])}updateRegistry(t,e,s){const h=s.gates.filter(p=>p.type===r.INPUT).length,l=s.gates.filter(p=>p.type===r.OUTPUT).length;this.registry.set(t,{arity:h,outputCount:l,customStructureRef:t,colour:e,gType:r.GATE,prereqs:new Set,resolutionFunc:null}),this.gates.set(t,{conections:s.connectionMap,gates:s.gates,prereqs:new Set})}}var gt,mt;const W=class{};let o=W;n(o,"projects",new Map),n(o,"currentProject",new rt("New Project")),n(o,"rs",(gt=W.currentProject.simulators.get("New Gate"))==null?void 0:gt[0]),n(o,"ls",(mt=W.currentProject.simulators.get("New Gate"))==null?void 0:mt[1]);var g;(function(i){i[i.ONE=1]="ONE",i[i.TWO=2]="TWO",i[i.FOUR=4]="FOUR",i[i.EIGHT=8]="EIGHT"})(g||(g={}));class Q{constructor(t){n(this,"left");n(this,"top");n(this,"hovered",!1);n(this,"pressed",!1);n(this,"menu");n(this,"width",48);n(this,"height",48);this.isInput=t,this.menu=new A,this.menu.addItem(new I("1",()=>{this.createGate(g.ONE),o.ls.rebuild()},v.NORMAL)),this.menu.addItem(new I("2",()=>{this.createGate(g.TWO),o.ls.rebuild()},v.NORMAL)),this.menu.addItem(new I("4",()=>{this.createGate(g.FOUR),o.ls.rebuild()},v.NORMAL)),this.menu.addItem(new I("8",()=>{this.createGate(g.EIGHT),o.ls.rebuild()},v.NORMAL)),t?(this.left=8,this.top=c.height-this.height-8):(this.left=c.width-this.width-8,this.top=c.height-this.height-8)}createGate(t){this.menu.hide();const e=new ct(this.isInput?4:c.width-this.width-4,4,o.rs.gates.length,"X",this.isInput?r.INPUT:r.OUTPUT,t);o.rs.gates.push(e),o.rs.widgets.push(e)}handleMouseMove(t){this.hovered=N(t,this.width,this.height,this.left,this.top)}handleMouseDown(t){this.menu.hide(),t.button==0&&N(t,this.width,this.height,this.left,this.top)&&(this.pressed=!0)}handleMouseUp(t){this.hovered&&this.pressed&&t.button==0&&this.menu.show(t.x,t.y),this.hovered=!1,this.pressed=!1}align(){this.isInput||(this.left=c.width-this.width-8),this.top=c.height-this.height-8}handleEvent(t,e){switch(t){case f.MOVE:this.handleMouseMove(e);break;case f.UP:this.handleMouseUp(e);break;case f.DOWN:this.handleMouseDown(e);break;case f.CONTEXTMENU:break}}createWidgetData(){return{type:O.ADD_BUTTON,isInput:this.isInput,bitIndex:null,gateRef:null,name:null,top:null,left:null}}render(t){this.align(),t.strokeStyle=u.fgColour,t.lineWidth=1,t.beginPath(),t.moveTo(this.left+this.width/2,this.top),t.arcTo(this.left+this.width,this.top,this.left+this.width,this.top+this.width/2,this.width/2),t.arcTo(this.left+this.width,this.top+this.height,this.left+this.width-this.width/2,this.top+this.height,this.width/2),t.arcTo(this.left,this.top+this.height,this.left,this.top+this.height-this.width/2,this.width/2),t.arcTo(this.left,this.top,this.left+this.width/2,this.top,this.width/2),t.stroke(),this.pressed?t.fillStyle=u.activeBgColour:this.hovered?t.fillStyle=u.hoverBgColour:t.fillStyle=u.bgColour,t.fill(),t.beginPath(),t.lineWidth=2,t.moveTo(this.left+this.width/4,this.top+this.height/2),t.lineTo(this.left+this.width/2+this.width/4,this.top+this.height/2),t.moveTo(this.left+this.width/2,this.top+this.height/4),t.lineTo(this.left+this.width/2,this.top+this.height/2+this.height/4),t.stroke(),t.lineWidth=1}}function N(i,t,e,s,h){return i.offsetX>s&&i.offsetX<s+t&&i.offsetY>h&&i.offsetY<h+e}function Z(i,t,e){return Math.min(Math.max(i,t),e)}function dt(i){const t=[];o.rs.connectionData.forEach((e,s)=>{for(const h of i)(e.pointFrom===h||e.pointTo===h)&&t.push(s)}),t.sort((e,s)=>s-e);for(const e of t)o.rs.connectionData.splice(e,1)}function ut(i,t){let e=0;if(t)for(let s=i.length-1;s>=0;s--)s===i.length-1&&i[s]?e+=-Math.pow(2,s):e+=(i[s]?1:0)*Math.pow(2,s);else for(let s=i.length-1;s>=0;s--)e+=(i[s]?1:0)*Math.pow(2,s);return e}function k(){o.rs.widgets.push(new Q(!0)),o.rs.widgets.push(new Q(!1))}var T;(function(i){i[i.NORMAL=0]="NORMAL",i[i.DANGER=1]="DANGER"})(T||(T={}));class E{constructor(t,e,s){this.label=t,this.type=e,this.onClick=s}}var y;(function(i){i[i.INPUT=0]="INPUT",i[i.COLOUR=1]="COLOUR",i[i.CHECK=2]="CHECK",i[i.SELECT=3]="SELECT",i[i.TEXT=4]="TEXT",i[i.FLEX=5]="FLEX",i[i.LIST=6]="LIST"})(y||(y={}));class G{constructor(t){n(this,"modalBg",document.querySelector(".modal-bg"));n(this,"html",document.createElement("div"));n(this,"fields",[]);n(this,"buttons",[]);n(this,"areBtnsCreated",!1);const e=document.createElement("p");e.className="modal-bg__dialog-title",e.innerText=t,this.html.appendChild(e),this.html.className="modal-bg__dialog",this.modalBg.appendChild(this.html)}createButtons(){const t=document.createElement("div");t.className="modal-bg__dialog-btns",this.html.appendChild(t);for(const e of this.buttons){const s=document.createElement("div");e.type===T.DANGER?s.className="modal-bg__dialog-btns-btn modal-bg__dialog-btns-btn--danger":s.className="modal-bg__dialog-btns-btn",s.innerText=e.label,s.addEventListener("click",e.onClick),t.appendChild(s)}}addButton(t){this.buttons.push(t)}addField(t){if(t.getType()!==y.CHECK&&t.getType()!==y.TEXT){const e=document.createElement("p");e.className="modal-bg__dialog-label",e.innerText=t.getLabel(),this.html.appendChild(e)}t.create(this.html),this.fields.push(t)}getValueFromField(t){const e=this.fields.find(s=>s.getName()==t);return e==null?void 0:e.getValue()}show(){this.modalBg.style.display="flex",this.html.style.display="flex",this.areBtnsCreated||(this.createButtons(),this.areBtnsCreated=!0)}close(){this.modalBg.style.display="none",this.html.remove()}}class tt{constructor(t,e,s){n(this,"value","");this.name=t,this.label=e,this.maxLength=s}create(t){const e=document.createElement("input");e.className="modal-bg__dialog-input",e.type="text",e.maxLength=this.maxLength,e.addEventListener("change",()=>{this.value=e.value}),t.appendChild(e)}getLabel(){return this.label}getName(){return this.name}getType(){return y.INPUT}getValue(){return this.value}}class ct{constructor(t,e,s,h,l,p=g.ONE,U="#d98c8c"){n(this,"grabbed",!1);n(this,"entered",!1);n(this,"moving",!1);n(this,"menu");n(this,"width");n(this,"height");n(this,"ipoints",[]);n(this,"opoints",[]);n(this,"expanded",!1);n(this,"expandHeight",0);n(this,"buttons",[]);n(this,"numberValue",0);n(this,"isSigned",!1);n(this,"arity",-1);n(this,"outputCount",-1);n(this,"xOffset",0);n(this,"yOffset",0);n(this,"inputValues",[]);n(this,"outputValues",[]);n(this,"enabled",!1);this.left=t,this.top=e,this.id=s,this.name=h,this.type=l,this.bits=p,this.colour=U;let d;if((d=o.currentProject.registry.get(h))===void 0)switch(l){case r.OUTPUT:d=X(q({},M.get("output")),{arity:p});break;case r.INPUT:d=X(q({},M.get("input")),{outputCount:p});break;default:throw z(!1,`Unknown Gate ${h}`),new Error}this.arity=d.arity,this.outputCount=d.outputCount;const F=Math.max(this.arity,this.outputCount);if(l===r.GATE?(this.width=96,this.height=64+(F-1)*32):(this.width=48,this.height=48,this.expandHeight=this.height+p*48),this.menu=new A,l!==r.GATE){if(p!==g.ONE){const a=new I("Signed Mode",()=>{});a.onClick=()=>{this.menu.hide(),this.isSigned=!this.isSigned,a.changeText(this.isSigned?"Normal Mode":"Signed Mode")},this.menu.addItem(a)}this.menu.addItem(new I("Rename",()=>{this.menu.hide();const a=new G("Rename");a.addField(new tt("name","Name (max. 2 chars)",2)),a.addButton(new E("Cancel",T.NORMAL,()=>{a.close()})),a.addButton(new E("Rename",T.NORMAL,()=>{a.getValueFromField("name").length>0&&(a.close(),this.name=a.getValueFromField("name"))})),a.show()}))}if(this.menu.addItem(new I("Remove",()=>{this.menu.destroy();for(const a of this.ipoints){a.destroyMenu();const m=o.rs.widgets.findIndex(_=>_===a);o.rs.widgets.splice(m,m===-1?0:1)}for(const a of this.opoints){a.destroyMenu();const m=o.rs.widgets.findIndex(_=>_===a);o.rs.widgets.splice(m,m===-1?0:1)}for(const a of this.buttons){a.destroyMenu();const m=o.rs.widgets.findIndex(_=>_===a);o.rs.widgets.splice(m,m===-1?0:1)}o.rs.gates.splice(o.rs.gates.findIndex(a=>a===this),1),o.rs.widgets.splice(o.rs.widgets.findIndex(a=>a===this),1),dt(this.ipoints),dt(this.opoints),o.rs.connectionMap=o.rs.connectionMap.filter(a=>!(s===a.inputGateIndex||s===a.outputGateIndex)),o.ls.updateConMap(o.rs.connectionMap);for(const a of o.rs.gates)a.updateId()},v.DANGER)),l===r.GATE){for(let a=0;a<this.arity;a++){const m=new x(!0,this.left,this.top+this.height/(this.arity+1)*(a+1),this,"X");this.ipoints.push(m),o.rs.widgets.push(m)}for(let a=0;a<this.outputCount;a++){const m=new x(!1,this.left+this.width,this.top+this.height/(this.outputCount+1)*(a+1),this,"X");this.opoints.push(m),o.rs.widgets.push(m)}}else{if(l===r.OUTPUT)for(let a=0;a<p;a++){const m=new x(!0,this.left,this.top+this.height/2,this,"X",p===g.ONE);this.ipoints.push(m),o.rs.widgets.push(m)}else for(let a=0;a<p;a++){const m=new x(!1,this.left+this.width,this.top+this.height/2,this,"X",p===g.ONE);this.opoints.push(m),o.rs.widgets.push(m)}for(let a=0;a<p;a++)this.buttons.push(new at(t+8,e+(a+1)*48,a,"X",l===r.INPUT))}}isMaxId(t=!1){let e=-1;for(const s of o.rs.gates)t?s.entered&&s.id>e&&(e=s.id):s.grabbed&&s.id>e&&(e=s.id);return e===-1?!0:this.id===e}modifyPoint(t,e){t.enabled=!t.enabled,t.enabled?t.top=this.top+(e+1)*48+16:t.top=this.top+this.height/2}togglePoints(){this.ipoints.forEach((t,e)=>this.modifyPoint(t,e)),this.opoints.forEach((t,e)=>this.modifyPoint(t,e))}handleMouseMove(t){if(this.grabbed&&this.isMaxId())if(this.moving=!0,this.type===r.GATE&&(this.left=Z(Math.round((t.offsetX-this.xOffset)/16)*16,64,c.width-64-this.width)),this.expanded?this.top=Z(Math.round((t.offsetY-this.yOffset)/16)*16+4,4,c.height-64-this.expandHeight):this.top=Z(Math.round((t.offsetY-this.yOffset)/16)*16+4,4,c.height-64-this.height),this.type===r.GATE){for(let e=0;e<this.arity;e++)this.ipoints[e].left=this.left,this.ipoints[e].top=this.top+this.height/(this.arity+1)*(e+1);for(let e=0;e<this.outputCount;e++)this.opoints[e].left=this.left+this.width,this.opoints[e].top=this.top+this.height/(this.outputCount+1)*(e+1)}else this.ipoints.forEach((e,s)=>{e.enabled&&this.bits!==g.ONE?e.top=this.top+(s+1)*48+16:e.top=this.top+this.height/2}),this.opoints.forEach((e,s)=>{e.enabled&&this.bits!==g.ONE?e.top=this.top+(s+1)*48+16:e.top=this.top+this.height/2}),this.buttons.forEach((e,s)=>{e.top=this.top+(s+1)*48});this.entered=N(t,this.width,this.height,this.left,this.top)}handleMouseDown(t){if(this.menu.hide(),t.button==0){for(const e of this.ipoints)if(N(t,12,12,e.left-6,e.top-6))return;for(const e of this.opoints)if(N(t,12,12,e.left-6,e.top-6))return;this.grabbed=N(t,this.width,this.height,this.left,this.top),this.grabbed&&(this.xOffset=t.offsetX-this.left,this.yOffset=t.offsetY-this.top)}}handleMouseUp(t){if(this.grabbed=!1,this.entered&&!this.moving&&t.button===0){if(this.bits===g.ONE&&this.type===r.INPUT)this.enabled=!this.enabled,this.outputValues[0]=this.enabled,o.rs.update(o.ls);else if(this.type!==r.GATE&&this.bits!==g.ONE){this.expanded=!this.expanded,this.togglePoints();for(const e of this.buttons)e.visible=this.expanded}}this.moving=!1}handleMouseContextMenu(t){for(const e of this.ipoints)if(N(t,8,8,e.left-4,e.top-4))return;for(const e of this.opoints)if(N(t,8,8,e.left-4,e.top-4))return;N(t,this.width,this.height,this.left,this.top)&&this.isMaxId(!0)&&this.menu.show(t.clientX,t.clientY)}getID(){return this.id}updateId(){this.id=o.rs.gates.findIndex(t=>t===this)}getPoints(){return[this.ipoints,this.opoints]}align(){this.type===r.GATE&&this.left+this.width+R.offsetWidth>=c.clientWidth&&(this.left=Math.round((c.clientWidth-this.width-R.offsetWidth)/16)*16),this.expanded?this.top+this.expandHeight+64>=c.clientHeight&&(this.top=Math.round((c.clientHeight-this.expandHeight-ot.clientHeight)/16)*16-16):this.top+this.height+64>=c.clientHeight&&(this.top=Math.round((c.clientHeight-this.height-ot.clientHeight)/16)*16-16),this.type===r.OUTPUT&&(this.left=c.clientWidth-this.width-4),this.buttons.forEach((t,e)=>{t.left=this.left+8,t.top=this.top+(e+1)*48}),this.ipoints.forEach((t,e)=>{this.type===r.GATE||this.bits===g.ONE?t.top=this.top+this.height/(this.arity+1)*(e+1):this.expanded?t.top=this.top+(e+1)*48+16:t.top=this.top+this.height/2,t.left=this.left}),this.opoints.forEach((t,e)=>{this.type===r.GATE||this.bits===g.ONE?t.top=this.top+this.height/(this.outputCount+1)*(e+1):this.expanded?t.top=this.top+(e+1)*48+16:t.top=this.top+this.height/2,t.left=this.left+this.width})}handleEvent(t,e){switch(t){case f.MOVE:this.handleMouseMove(e);break;case f.UP:this.handleMouseUp(e);break;case f.DOWN:this.handleMouseDown(e);break;case f.CONTEXTMENU:this.handleMouseContextMenu(e);break}if(this.type!==r.GATE)for(const s of this.buttons)s.handleEvent(t,e)}updateInputs(){this.type===r.INPUT&&this.bits!==g.ONE&&this.buttons.forEach((t,e)=>{this.outputValues[e]=t.enabled,this.numberValue=ut(this.outputValues,this.isSigned)})}updateOutputs(){this.type===r.OUTPUT&&(this.bits===g.ONE?this.enabled=this.inputValues[0]:this.buttons.forEach((t,e)=>{t.enabled=this.inputValues[e],this.numberValue=ut(this.outputValues,this.isSigned)}))}createWidgetData(){return{type:O.GATE,gateRef:this,name:this.name,bitIndex:null,isInput:null,top:null,left:null}}render(t){const e=8;t.beginPath(),t.strokeStyle=u.fgColour,t.fillStyle=u.bgColour,this.type===r.INPUT?this.enabled&&(t.fillStyle=u.enabledBgColour):this.type===r.OUTPUT&&this.bits===g.ONE&&this.inputValues[0]&&(t.fillStyle=u.enabledBgColour);const s=this.expanded?this.expandHeight:this.height;if(t.moveTo(this.left+e,this.top),t.lineTo(this.left+this.width-e,this.top),t.arcTo(this.left+this.width,this.top,this.left+this.width,this.top+e,e),t.lineTo(this.left+this.width,this.top+s-e),t.arcTo(this.left+this.width,this.top+s,this.left+this.width-e,this.top+s,e),t.lineTo(this.left+e,this.top+s),t.arcTo(this.left,this.top+s,this.left,this.top+s-e,e),t.lineTo(this.left,this.top+e),t.arcTo(this.left,this.top,this.left+e,this.top,e),t.stroke(),t.fill(),this.type===r.GATE?(t.beginPath(),t.strokeStyle=this.colour,t.fillStyle=this.colour,t.arc(this.left+this.width-12,this.top+12,5,0,2*Math.PI),t.stroke(),t.fill()):this.isSigned&&(t.beginPath(),t.strokeStyle=J,t.fillStyle=J,t.arc(this.left+this.width/3,this.top+this.height*3/4,2,Math.PI/2,-Math.PI/2),t.rect(this.left+this.width/3,this.top+this.height*3/4-2,this.left+this.width/3-4,4),t.arc(this.left+this.width*2/3,this.top+this.height*3/4,2,-Math.PI/2,Math.PI/2),t.fill()),this.expanded)for(const h of this.buttons)h.render(t);t.beginPath(),t.fillStyle=u.fgColour,t.textAlign="center",t.textBaseline="middle",t.font="normal 1.4rem 'Lato', sans-serif",this.type===r.GATE?t.fillText(this.name.toUpperCase(),this.left+this.width/2,this.top+this.height/2):this.bits!==g.ONE&&t.fillText(this.numberValue.toString(),this.left+this.width/2,this.top+this.height/2);for(const h of this.ipoints)h.render(t);for(const h of this.opoints)h.render(t)}}class xt{constructor(t,e,s){this.name=t,this.label=e,this.value=s}create(t){const e=document.createElement("div");e.className="modal-bg__dialog-check";const s=document.createElement("input");s.className="modal-bg__dialog-check-box",s.id=this.getName()+"-check",s.type="checkbox",s.checked=this.getValue(),s.addEventListener("change",()=>{this.value=s.checked});const h=document.createElement("label");h.className="modal-bg__dialog-check-label",h.innerText=this.getLabel(),h.htmlFor=s.id,e.appendChild(s),e.appendChild(h),t.appendChild(e)}getLabel(){return this.label}getName(){return this.name}getType(){return y.CHECK}getValue(){return this.value}}class Dt{constructor(t,e,s,h=0){n(this,"value");this.name=t,this.label=e,this.values=s,this.value=s[h]}create(t){const e=document.createElement("div");e.className="modal-bg__dialog-select",e.innerText=this.value;const s=document.createElement("div");s.className="modal-bg__dialog-select-base";for(const h of this.values){const l=document.createElement("div");l.className="modal-bg__dialog-select-base-btn",l.innerText=h,l.addEventListener("click",()=>{this.value=l.innerText,e.innerText=this.value,s.style.display="none"}),s.appendChild(l)}e.addEventListener("click",()=>{s.style.display!=="flex"?s.style.display="flex":s.style.display="none",s.style.top=e.offsetTop-e.clientHeight*this.values.findIndex(h=>h===this.value)+"px"}),t.appendChild(e),t.appendChild(s)}getLabel(){return this.label}getName(){return this.name}getType(){return y.SELECT}getValue(){return this.value}}class et{static build(){const t=["System","Dark","Light"];this.dialog=new G("Settings"),this.dialog.addField(new xt("showFieldLabels","Show Field Labels",L.showFieldNames)),this.dialog.addField(new Dt("theme","Theme",t,t.findIndex(e=>e===L.theme))),this.dialog.addButton(new E("Cancel",T.NORMAL,()=>{this.dialog.close()})),this.dialog.addButton(new E("Save",T.NORMAL,()=>{switch(this.dialog.close(),L.showFieldNames=this.dialog.getValueFromField("showFieldLabels"),L.theme=this.dialog.getValueFromField("theme"),L.theme){case"System":u.setSystemTheme();break;case"Dark":u.setDarkTheme();break;case"Light":u.setLightTheme();break}}))}static show(){this.dialog.show()}}n(et,"dialog");class it{constructor(t,e=!0){n(this,"html",document.createElement("div"));n(this,"fields",[]);this.name=t,e?this.html.className="modal-bg__dialog-flex modal-bg__dialog-flex--vertical":this.html.className="modal-bg__dialog-flex modal-bg__dialog-flex--horizontal"}addField(t){t.create(this.html),this.fields.push(t)}create(t){t.appendChild(this.html)}getLabel(){return""}getName(){return this.name}getType(){return y.FLEX}getValue(){return this.fields}}class Bt{constructor(t,e){n(this,"items",[]);n(this,"value",-1);this.name=t,this.label=e}addItem(t){this.items.push(t)}create(t){const e=document.createElement("div");e.className="modal-bg__dialog-list";for(const s of this.items){const h=document.createElement("p");h.className="modal-bg__dialog-list-item-title",h.innerText=s.getName();const l=document.createElement("div");l.className="modal-bg__dialog-list-item",l.appendChild(h),l.addEventListener("click",p=>s.onClick(p)),e.appendChild(l)}t.appendChild(e)}getLabel(){return this.label}getName(){return this.name}getType(){return y.LIST}getValue(){return this.value}}class Rt{constructor(t,e,s){this.name=t,this.value=e,this.onClick=s}getName(){return this.name}getValue(){return this.value}}class D{constructor(t,e){this.name=t,this.label=e}create(t){const e=document.createElement("p");e.innerText=this.label,e.className="modal-bg__dialog-text",t.appendChild(e)}getLabel(){return this.label}getName(){return this.name}getType(){return y.TEXT}getValue(){return""}}class B{static build(){const t=new it("projectNew",!0);t.addField(new D("newText","Create a New Project")),t.addField(new tt("name","Project Name",64));const e=new it("projectOpen",!0),s=new Bt("projects","Projects");for(const l of o.projects)s.addItem(new Rt(l[0],l[0],()=>{this.dialog.close(),o.currentProject=l[1],o.rs=new $(l[0]),o.ls=P.from(o.rs),S.innerText=`${o.currentProject.name} / New Gate`,j(),k()}));e.addField(new D("openText","Open Existing Project")),e.addField(s);const h=new it("root",!1);h.addField(t),h.addField(e),this.dialog=new G("Projects"),this.dialog.addField(h),o.projects.size>0&&this.dialog.addButton(new E("Cancel",T.NORMAL,()=>{this.dialog.close(),k()})),this.dialog.addButton(new E("Create",T.NORMAL,()=>{const l=t.getValue()[1].getValue();l!==""&&(this.dialog.close(),o.projects.set(l,new rt(l)),o.currentProject=o.projects.get(l),o.rs=o.currentProject.simulators.get("New Gate")[0],o.ls=o.currentProject.simulators.get("New Gate")[1],S.innerText=`${o.currentProject.name} / New Gate`,j(),k())}))}static show(){this.dialog.show()}}n(B,"dialog");class Vt{constructor(t,e){n(this,"value",0);n(this,"pressed",!1);this.name=t,this.label=e}create(t){const e=document.createElement("div");e.className="modal-bg__dialog-colour";const s=document.createElement("div");s.className="modal-bg__dialog-colour-box",s.style.backgroundColor=`hsl(${this.getValue()}, 50%, 70%)`;const h=document.createElement("div");h.className="modal-bg__dialog-colour-slider";const l=document.createElement("input");l.className="modal-bg__dialog-colour-slider-input",l.type="range",l.value="0",l.min="0",l.max="360",l.addEventListener("input",()=>{s.style.backgroundColor=`hsl(${l.value}, 50%, 75%)`,this.value=l.valueAsNumber}),e.appendChild(s),h.appendChild(l),e.appendChild(h),t.appendChild(e)}getLabel(){return this.label}getName(){return this.name}getType(){return y.COLOUR}getValue(){return this.value}}class st{static build(){this.dialog=new G("Save Gate"),this.dialog.addField(new Vt("colour","Colour")),this.dialog.addField(new tt("name","Name (max. 8 characters)",8)),this.dialog.addButton(new E("Cancel",T.NORMAL,()=>{this.dialog.close()})),this.dialog.addButton(new E("Save",T.NORMAL,()=>{const t=this.dialog.getValueFromField("name");if(t.toLowerCase()==="and"||t.toLowerCase()==="not")return;if([...M].findIndex(h=>h[0].toLowerCase()===t.toLowerCase())!==-1){o.currentProject.simulators.delete(t),o.currentProject.simulators.set(t,[o.rs,o.ls]),S.innerText=`${o.currentProject.name} / New Gate`;return}this.dialog.close();const s=`hsl(${this.dialog.getValueFromField("colour")}, 50%, 75%)`;o.currentProject.updateRegistry(t,s,o.rs),o.rs.name=t,o.currentProject.simulators.set(t,[o.rs,o.ls]),o.rs=new $("New Gate"),o.ls=P.from(o.rs),S.innerText=`${o.currentProject.name} / New Gate`,j(),k()}))}static show(){this.dialog.show()}}n(st,"dialog");class jt{static show(t,e){const s=new G(e);s.addField(new D("text",t)),s.addButton(new E("OK",T.NORMAL,()=>s.close())),s.show()}}const c=document.querySelector(".content__canvas"),ot=document.querySelector(".navbar"),S=document.querySelector(".navbar__title"),R=document.querySelector(".content__sidebar");let V=c.getContext("2d");function qt(i){const t=document.createElement("div");t.className="content__sidebar-btn",t.innerText=i.toUpperCase(),t.addEventListener("click",()=>{var s;const e=new ct(64,4,o.rs.gates.length,i,r.GATE,g.ONE,(s=o.currentProject.registry.get(i))==null?void 0:s.colour);o.rs.gates.push(e),o.rs.widgets.push(e)}),t.addEventListener("contextmenu",e=>{if(i!=="and"&&i!=="not"){const s=new A;s.addItem(new I("Close",()=>s.hide())),s.addItem(new I("Edit",()=>{var h,l;s.hide(),o.rs=(h=o.currentProject.simulators.get(i))==null?void 0:h[0],o.ls=(l=o.currentProject.simulators.get(i))==null?void 0:l[1],S.innerText=`${o.currentProject.name} / ${i.toUpperCase()}`,k()})),s.addItem(new I("Delete",()=>{s.hide();const h=new G("Delete Gate");h.addField(new D("text",`Are you sure you want to delete ${i.toUpperCase()} gate? 
This action is irreversible.`)),h.addButton(new E("Cancel",T.NORMAL,()=>{h.close()})),h.addButton(new E("Delete",T.DANGER,()=>{h.close(),o.currentProject.registry.delete(i),j()})),h.show()},v.DANGER)),s.show(e.clientX,e.clientY)}}),R.appendChild(t)}function j(){R.replaceChildren(),[...o.currentProject.registry].filter(i=>i[1].gType===r.GATE).forEach(i=>{qt(i[0])})}function pt(){c.width=window.innerWidth-R.offsetWidth,c.height=window.innerHeight-ot.offsetHeight,V.fillStyle="#fff",V.fillRect(0,0,c.width,c.height);for(const i of o.rs.gates)i.align()}pt();document.querySelector("#settings-btn").addEventListener("click",()=>{et.build(),et.show()});document.querySelector("#projects-btn").addEventListener("click",()=>{B.build(),B.show()});document.querySelector("#save-btn").addEventListener("click",()=>{if(o.rs.gates.filter(i=>i.type!==r.GATE&&i.bits!==g.ONE).length>0){jt.show(`Cannot save gates with multiple-bit I/O ports.
Multiple-bit I/O ports are intended only for testing puropses.`,"Save Error");return}st.build(),st.show()});document.querySelector("#clear-btn").addEventListener("click",()=>{const i=new G("Clear");i.addField(new D("text",`This will clear your work area.
All unsaved changes will be lost.`)),i.addButton(new E("Cancel",T.NORMAL,()=>i.close())),i.addButton(new E("Clear",T.DANGER,()=>{i.close(),o.rs=new $("New Gate"),o.ls=P.from(o.rs),S.innerText=`${o.currentProject.name} / New Gate`,k()})),i.show()});u.setSystemTheme();B.build();B.show();function ft(){V.clearRect(0,0,c.width,c.height);for(const i of o.rs.gates)i.updateInputs();o.rs.update(o.ls),o.ls.tick();for(const i of o.rs.gates)i.updateOutputs();o.rs.render(V),o.rs.renderWires(V),requestAnimationFrame(ft)}document.addEventListener("contextmenu",i=>i.preventDefault());window.addEventListener("resize",pt);j();c.addEventListener("mousemove",i=>o.rs.handleEvents(f.MOVE,i));c.addEventListener("mousedown",i=>o.rs.handleEvents(f.DOWN,i));c.addEventListener("mouseup",i=>o.rs.handleEvents(f.UP,i));c.addEventListener("contextmenu",i=>o.rs.handleEvents(f.CONTEXTMENU,i));requestAnimationFrame(ft);
