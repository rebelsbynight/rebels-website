"use strict";(self.webpackChunkrebels=self.webpackChunkrebels||[]).push([[102],{4102:function(e,t,n){n.r(t),n.d(t,{AlchemyWebSocketProvider:function(){return W}});var r=n(37762),s=n(97326),i=n(11752),o=n(61120),a=n(60136),c=n(29388),u=n(42982),l=n(15671),h=n(43144),f=n(87757),d=n.n(f),p=n(35068),v=n(33372),b=n(52748),m=n(89833),k=n(82963),y=n(15120),g=n(70627),w=n(61498),_=n(86633),E=null;try{if(null==(E=WebSocket))throw new Error("inject please")}catch(q){var I=new w.Yd(_.i);E=function(){I.throwError("WebSockets not supported in this environment",w.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new WebSocket()"})}}var N=function(e,t,n,r){return new(n||(n=Promise))((function(s,i){function o(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}c((r=r.apply(e,t||[])).next())}))},x=new w.Yd(_.i),T=1,O=function(e){(0,a.Z)(n,e);var t=(0,c.Z)(n);function n(e,r){var a,c;(0,l.Z)(this,n),"any"===r&&x.throwError("WebSocketProvider does not support 'any' network yet",w.Yd.errors.UNSUPPORTED_OPERATION,{operation:"network:any"}),(c="string"===typeof e?t.call(this,e,r):t.call(this,"_websocket",r))._pollingInterval=-1,c._wsReady=!1,"string"===typeof e?(0,y.zG)((0,s.Z)(c),"_websocket",new E(c.connection.url)):(0,y.zG)((0,s.Z)(c),"_websocket",e),(0,y.zG)((0,s.Z)(c),"_requests",{}),(0,y.zG)((0,s.Z)(c),"_subs",{}),(0,y.zG)((0,s.Z)(c),"_subIds",{}),(0,y.zG)((0,s.Z)(c),"_detectNetwork",(0,i.Z)((a=(0,s.Z)(c),(0,o.Z)(n.prototype)),"detectNetwork",a).call(a)),c.websocket.onopen=function(){c._wsReady=!0,Object.keys(c._requests).forEach((function(e){c.websocket.send(c._requests[e].payload)}))},c.websocket.onmessage=function(e){var t=e.data,n=JSON.parse(t);if(null!=n.id){var r=String(n.id),i=c._requests[r];if(delete c._requests[r],void 0!==n.result)i.callback(null,n.result),c.emit("debug",{action:"response",request:JSON.parse(i.payload),response:n.result,provider:(0,s.Z)(c)});else{var o=null;n.error?(o=new Error(n.error.message||"unknown error"),(0,y.zG)(o,"code",n.error.code||null),(0,y.zG)(o,"response",t)):o=new Error("unknown error"),i.callback(o,void 0),c.emit("debug",{action:"response",error:o,request:JSON.parse(i.payload),provider:(0,s.Z)(c)})}}else if("eth_subscription"===n.method){var a=c._subs[n.params.subscription];a&&a.processFunc(n.params.result)}else console.warn("this should not happen")};var u=setInterval((function(){c.emit("poll")}),1e3);return u.unref&&u.unref(),(0,k.Z)(c)}return(0,h.Z)(n,[{key:"websocket",get:function(){return this._websocket}},{key:"detectNetwork",value:function(){return this._detectNetwork}},{key:"pollingInterval",get:function(){return 0},set:function(e){x.throwError("cannot set polling interval on WebSocketProvider",w.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPollingInterval"})}},{key:"resetEventsBlock",value:function(e){x.throwError("cannot reset events block on WebSocketProvider",w.Yd.errors.UNSUPPORTED_OPERATION,{operation:"resetEventBlock"})}},{key:"poll",value:function(){return N(this,void 0,void 0,d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",null);case 1:case"end":return e.stop()}}),e)})))}},{key:"polling",set:function(e){e&&x.throwError("cannot set polling on WebSocketProvider",w.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPolling"})}},{key:"send",value:function(e,t){var n=this,r=T++;return new Promise((function(s,i){var o=JSON.stringify({method:e,params:t,id:r,jsonrpc:"2.0"});n.emit("debug",{action:"request",request:JSON.parse(o),provider:n}),n._requests[String(r)]={callback:function(e,t){return e?i(e):s(t)},payload:o},n._wsReady&&n.websocket.send(o)}))}},{key:"_subscribe",value:function(e,t,n){return N(this,void 0,void 0,d().mark((function r(){var s,i,o=this;return d().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return null==(s=this._subIds[e])&&(s=Promise.all(t).then((function(e){return o.send("eth_subscribe",e)})),this._subIds[e]=s),r.next=4,s;case 4:i=r.sent,this._subs[i]={tag:e,processFunc:n};case 6:case"end":return r.stop()}}),r,this)})))}},{key:"_startEvent",value:function(e){var t=this;switch(e.type){case"block":this._subscribe("block",["newHeads"],(function(e){var n=b.O$.from(e.number).toNumber();t._emitted.block=n,t.emit("block",n)}));break;case"pending":this._subscribe("pending",["newPendingTransactions"],(function(e){t.emit("pending",e)}));break;case"filter":this._subscribe(e.tag,["logs",this._getFilter(e.filter)],(function(n){null==n.removed&&(n.removed=!1),t.emit(e.filter,t.formatter.filterLog(n))}));break;case"tx":var n=function(e){var n=e.hash;t.getTransactionReceipt(n).then((function(e){e&&t.emit(n,e)}))};n(e),this._subscribe("tx",["newHeads"],(function(e){t._events.filter((function(e){return"tx"===e.type})).forEach(n)}));break;case"debug":case"poll":case"willPoll":case"didPoll":case"error":break;default:console.log("unhandled:",e)}}},{key:"_stopEvent",value:function(e){var t=this,n=e.tag;if("tx"===e.type){if(this._events.filter((function(e){return"tx"===e.type})).length)return;n="tx"}else if(this.listenerCount(e.event))return;var r=this._subIds[n];r&&(delete this._subIds[n],r.then((function(e){t._subs[e]&&(delete t._subs[e],t.send("eth_unsubscribe",[e]))})))}},{key:"destroy",value:function(){return N(this,void 0,void 0,d().mark((function e(){var t=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.websocket.readyState!==E.CONNECTING){e.next=3;break}return e.next=3,new Promise((function(e){t.websocket.onopen=function(){e(!0)},t.websocket.onerror=function(){e(!1)}}));case 3:this.websocket.close(1e3);case 4:case"end":return e.stop()}}),e,this)})))}}],[{key:"defaultUrl",value:function(){return"ws://localhost:8546"}}]),n}(g.r),B=n(51023),C=(n(31881),n(7490)),S=function(){function e(t){(0,l.Z)(this,e),this.provider=t,this.maxBackfillBlocks=120}return(0,h.Z)(e,[{key:"getNewHeadsBackfill",value:function(e,t,n){return(0,p._)(this,void 0,void 0,d().mark((function r(){var s,i,o,a,c;return d().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return H(e),r.next=3,this.getBlockNumber();case 3:if(s=r.sent,H(e),0!==t.length){r.next=7;break}return r.abrupt("return",this.getHeadEventsInRange(Math.max(n,s-this.maxBackfillBlocks)+1,s+1));case 7:if(i=(0,p.f)(t[t.length-1].number),o=s-this.maxBackfillBlocks+1,!(i<=o)){r.next=11;break}return r.abrupt("return",this.getHeadEventsInRange(o,s+1));case 11:return r.next=13,this.getReorgHeads(e,t);case 13:return a=r.sent,H(e),r.next=17,this.getHeadEventsInRange(i+1,s+1);case 17:return c=r.sent,H(e),r.abrupt("return",[].concat((0,u.Z)(a),(0,u.Z)(c)));case 20:case"end":return r.stop()}}),r,this)})))}},{key:"getLogsBackfill",value:function(e,t,n,r){return(0,p._)(this,void 0,void 0,d().mark((function s(){var i,o,a,c,l,h,f;return d().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return H(e),s.next=3,this.getBlockNumber();case 3:if(i=s.sent,H(e),0!==n.length){s.next=7;break}return s.abrupt("return",this.getLogsInRange(t,Math.max(r,i-this.maxBackfillBlocks)+1,i+1));case 7:if(o=(0,p.f)(n[n.length-1].blockNumber),a=i-this.maxBackfillBlocks+1,!(o<a)){s.next=11;break}return s.abrupt("return",this.getLogsInRange(t,a,i+1));case 11:return s.next=13,this.getCommonAncestor(e,n);case 13:return c=s.sent,H(e),l=n.filter((function(e){return(0,p.f)(e.blockNumber)>c.blockNumber})).map((function(e){return Object.assign(Object.assign({},e),{removed:!0})})),h=c.blockNumber===Number.NEGATIVE_INFINITY?(0,p.f)(n[0].blockNumber):c.blockNumber,s.next=19,this.getLogsInRange(t,h,i+1);case 19:return f=(f=s.sent).filter((function(e){return e&&((0,p.f)(e.blockNumber)>c.blockNumber||(0,p.f)(e.logIndex)>c.logIndex)})),H(e),s.abrupt("return",[].concat((0,u.Z)(l),(0,u.Z)(f)));case 23:case"end":return s.stop()}}),s,this)})))}},{key:"setMaxBackfillBlock",value:function(e){this.maxBackfillBlocks=e}},{key:"getBlockNumber",value:function(){return(0,p._)(this,void 0,void 0,d().mark((function e(){var t;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.provider.send("eth_blockNumber");case 2:return t=e.sent,e.abrupt("return",(0,p.f)(t));case 4:case"end":return e.stop()}}),e,this)})))}},{key:"getHeadEventsInRange",value:function(e,t){return(0,p._)(this,void 0,void 0,d().mark((function n(){var r,s,i;return d().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(e>=t)){n.next=2;break}return n.abrupt("return",[]);case 2:for(r=[],s=e;s<t;s++)r.push({method:"eth_getBlockByNumber",params:[(0,p.t)(s),!1]});return n.next=6,this.provider.sendBatch(r);case 6:return i=n.sent,n.abrupt("return",i.map(A));case 8:case"end":return n.stop()}}),n,this)})))}},{key:"getReorgHeads",value:function(e,t){return(0,p._)(this,void 0,void 0,d().mark((function n(){var r,s,i,o;return d().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=[],s=t.length-1;case 2:if(!(s>=0)){n.next=14;break}return i=t[s],n.next=6,this.getBlockByNumber((0,p.f)(i.number));case 6:if(o=n.sent,H(e),i.hash!==o.hash){n.next=10;break}return n.abrupt("break",14);case 10:r.push(A(o));case 11:s--,n.next=2;break;case 14:return n.abrupt("return",r.reverse());case 15:case"end":return n.stop()}}),n,this)})))}},{key:"getBlockByNumber",value:function(e){return(0,p._)(this,void 0,void 0,d().mark((function t(){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.provider.send("eth_getBlockByNumber",[(0,p.t)(e),!1]));case 1:case"end":return t.stop()}}),t,this)})))}},{key:"getCommonAncestor",value:function(e,t){return(0,p._)(this,void 0,void 0,d().mark((function n(){var r,s,i;return d().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.getBlockByNumber((0,p.f)(t[t.length-1].blockNumber));case 2:r=n.sent,H(e),s=t.length-1;case 5:if(!(s>=0)){n.next=16;break}if((i=t[s]).blockNumber===r.number){n.next=11;break}return n.next=10,this.getBlockByNumber((0,p.f)(i.blockNumber));case 10:r=n.sent;case 11:if(i.blockHash!==r.hash){n.next=13;break}return n.abrupt("return",{blockNumber:(0,p.f)(i.blockNumber),logIndex:(0,p.f)(i.logIndex)});case 13:s--,n.next=5;break;case 16:return n.abrupt("return",{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY});case 17:case"end":return n.stop()}}),n,this)})))}},{key:"getLogsInRange",value:function(e,t,n){return(0,p._)(this,void 0,void 0,d().mark((function r(){var s;return d().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(t>=n)){r.next=2;break}return r.abrupt("return",[]);case 2:return s=Object.assign(Object.assign({},e),{fromBlock:(0,p.t)(t),toBlock:(0,p.t)(n-1)}),r.abrupt("return",this.provider.send("eth_getLogs",[s]));case 4:case"end":return r.stop()}}),r,this)})))}}]),e}();function A(e){var t=Object.assign({},e);return delete t.totalDifficulty,delete t.transactions,delete t.uncles,t}function P(e){return L(e,(function(e){return e.hash}))}function R(e){return L(e,(function(e){return"".concat(e.blockHash,"/").concat(e.logIndex)}))}function L(e,t){var n=new Set,r=[];return e.forEach((function(e){var s=t(e);n.has(s)||(n.add(s),r.push(e))})),r}var Z=new Error("Cancelled");function H(e){if(e())throw Z}var W=function(e){(0,a.Z)(f,e);var t=(0,c.Z)(f);function f(e,i){var o,a;(0,l.Z)(this,f);var c=B.AlchemyProvider.getApiKey(e.apiKey),u=B.AlchemyProvider.getAlchemyNetwork(e.network),h=B.AlchemyProvider.getAlchemyConnectionInfo(u,c,"wss"),b="alchemy-sdk-".concat(p.V),m=new v.Z(null!==(a=e.url)&&void 0!==a?a:h.url,b,{wsConstructor:null!==i&&void 0!==i?i:"undefined"!==typeof C&&null!=C&&null!=C.versions&&null!=C.versions.node?n(62467).w3cwebsocket:WebSocket}),k=p.E[u];return(o=t.call(this,m,k))._events=[],o.virtualSubscriptionsById=new Map,o.virtualIdsByPhysicalId=new Map,o.handleMessage=function(e){var t=JSON.parse(e.data);if(function(e){return!function(e){return Array.isArray(e)||"2.0"===e.jsonrpc&&void 0!==e.id}(e)}(t)){var n=t.params.subscription,r=o.virtualIdsByPhysicalId.get(n);if(r){var s=o.virtualSubscriptionsById.get(r);if("eth_subscribe"===s.method)switch(s.params[0]){case"newHeads":var i=s,a=t,c=i.isBackfilling,u=i.backfillBuffer,l=a.params.result;c?function(e,t){U(e,t,j)}(u,l):n!==r?o.emitAndRememberEvent(r,l,j):o.rememberEvent(r,l,j);break;case"logs":var h=s,f=t,d=h.isBackfilling,p=h.backfillBuffer,v=f.params.result;d?function(e,t){U(e,t,M)}(p,v):r!==n?o.emitAndRememberEvent(r,v,M):o.rememberEvent(r,v,M);break;default:if(n!==r){var b=t.params.result;o.emitEvent(r,b)}}}}},o.handleReopen=function(){o.virtualIdsByPhysicalId.clear();var e=function(){var e=!1;return{cancel:function(){return e=!0},isCancelled:function(){return e}}}(),t=e.cancel,n=e.isCancelled;o.cancelBackfill=t;var i,a=(0,r.Z)(o.virtualSubscriptionsById.values());try{var c=function(){var e=i.value;(0,p._)((0,s.Z)(o),void 0,void 0,d().mark((function t(){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.resubscribeAndBackfill(n,e);case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),n()||console.error('Error while backfilling "'.concat(e.params[0],'" subscription. Some events may be missing.'),t.t0);case 8:case"end":return t.stop()}}),t,this,[[0,5]])})))};for(a.s();!(i=a.n()).done;)c()}catch(u){a.e(u)}finally{a.f()}o.startHeartbeat()},o.stopHeartbeatAndBackfill=function(){null!=o.heartbeatIntervalId&&(clearInterval(o.heartbeatIntervalId),o.heartbeatIntervalId=void 0),o.cancelBackfill()},o.apiKey=c,o.backfiller=new S((0,s.Z)(o)),o.addSocketListeners(),o.startHeartbeat(),o.cancelBackfill=p.n,o}return(0,h.Z)(f,[{key:"on",value:function(e,t){return this._addEventListener(e,t,!1)}},{key:"once",value:function(e,t){return this._addEventListener(e,t,!0)}},{key:"off",value:function(e,t){return(0,p.i)(e)?this._off(e,t):(0,i.Z)((0,o.Z)(f.prototype),"off",this).call(this,e,t)}},{key:"removeAllListeners",value:function(e){return void 0!==e&&(0,p.i)(e)?this._removeAllListeners(e):(0,i.Z)((0,o.Z)(f.prototype),"removeAllListeners",this).call(this,e)}},{key:"listenerCount",value:function(e){return void 0!==e&&(0,p.i)(e)?this._listenerCount(e):(0,i.Z)((0,o.Z)(f.prototype),"listenerCount",this).call(this,e)}},{key:"listeners",value:function(e){return void 0!==e&&(0,p.i)(e)?this._listeners(e):(0,i.Z)((0,o.Z)(f.prototype),"listeners",this).call(this,e)}},{key:"_addEventListener",value:function(e,t,n){if((0,p.i)(e)){(0,p.v)(e);var r=new p.c((0,p.e)(e),t,n);return this._events.push(r),this._startEvent(r),this}return(0,i.Z)((0,o.Z)(f.prototype),"_addEventListener",this).call(this,e,t,n)}},{key:"_startEvent",value:function(e){[].concat((0,u.Z)(p.A),["block","filter"]).includes(e.type)?this.customStartEvent(e):(0,i.Z)((0,o.Z)(f.prototype),"_startEvent",this).call(this,e)}},{key:"_subscribe",value:function(e,t,n,r){return(0,p._)(this,void 0,void 0,d().mark((function s(){var i,o,a,c,u=this;return d().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return i=this._subIds[e],s.next=3,this.getBlockNumber();case 3:return o=s.sent,null==i&&(i=Promise.all(t).then((function(e){return u.send("eth_subscribe",e)})),this._subIds[e]=i),s.next=7,i;case 7:return a=s.sent,s.next=10,Promise.all(t);case 10:c=s.sent,this.virtualSubscriptionsById.set(a,{event:r,method:"eth_subscribe",params:c,startingBlockNumber:o,virtualId:a,physicalId:a,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(a,a),this._subs[a]={tag:e,processFunc:n};case 14:case"end":return s.stop()}}),s,this)})))}},{key:"emit",value:function(e){for(var t,n=this,r=arguments.length,s=new Array(r>1?r-1:0),a=1;a<r;a++)s[a-1]=arguments[a];if((0,p.i)(e)){var c=!1,u=[],l=(0,p.e)(e);return this._events=this._events.filter((function(e){return e.tag!==l||(setTimeout((function(){e.listener.apply(n,s)}),0),c=!0,!e.once||(u.push(e),!1))})),u.forEach((function(e){n._stopEvent(e)})),c}return(t=(0,i.Z)((0,o.Z)(f.prototype),"emit",this)).call.apply(t,[this,e].concat(s))}},{key:"sendBatch",value:function(e){return(0,p._)(this,void 0,void 0,d().mark((function t(){var n,r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=0,r=e.map((function(e){return{method:e.method,params:e.params,jsonrpc:"2.0",id:"alchemy-sdk:".concat(n++)}})),t.abrupt("return",this.sendBatchConcurrently(r));case 3:case"end":return t.stop()}}),t,this)})))}},{key:"destroy",value:function(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),(0,i.Z)((0,o.Z)(f.prototype),"destroy",this).call(this)}},{key:"isCommunityResource",value:function(){return this.apiKey===p.D}},{key:"_stopEvent",value:function(e){var t=this,n=e.tag;if(p.A.includes(e.type)){if(this._events.filter((function(e){return p.A.includes(e.type)})).length)return}else if("tx"===e.type){if(this._events.filter((function(e){return"tx"===e.type})).length)return;n="tx"}else if(this.listenerCount(e.event))return;var r=this._subIds[n];r&&(delete this._subIds[n],r.then((function(e){t._subs[e]&&(delete t._subs[e],t.send("eth_unsubscribe",[e]))})))}},{key:"addSocketListeners",value:function(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}},{key:"removeSocketListeners",value:function(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}},{key:"resubscribeAndBackfill",value:function(e,t){return(0,p._)(this,void 0,void 0,d().mark((function n(){var r,s,i,o,a,c,l,h,f,p,v=this;return d().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.virtualId,s=t.method,i=t.params,o=t.sentEvents,a=t.backfillBuffer,c=t.startingBlockNumber,t.isBackfilling=!0,a.length=0,n.prev=3,n.next=6,this.send(s,i);case 6:l=n.sent,H(e),t.physicalId=l,this.virtualIdsByPhysicalId.set(l,r),n.t0=i[0],n.next="newHeads"===n.t0?13:"logs"===n.t0?20:28;break;case 13:return n.next=15,F((function(){return G(v.backfiller.getNewHeadsBackfill(e,o,c),6e4)}),5,(function(){return!e()}));case 15:return h=n.sent,H(e),P([].concat((0,u.Z)(h),(0,u.Z)(a))).forEach((function(e){return v.emitNewHeadsEvent(r,e)})),n.abrupt("break",29);case 20:return f=i[1]||{},n.next=23,F((function(){return G(v.backfiller.getLogsBackfill(e,f,o,c),6e4)}),5,(function(){return!e()}));case 23:return p=n.sent,H(e),R([].concat((0,u.Z)(p),(0,u.Z)(a))).forEach((function(e){return v.emitLogsEvent(r,e)})),n.abrupt("break",29);case 28:return n.abrupt("break",29);case 29:return n.prev=29,t.isBackfilling=!1,a.length=0,n.finish(29);case 33:case"end":return n.stop()}}),n,this,[[3,,29,33]])})))}},{key:"emitNewHeadsEvent",value:function(e,t){this.emitAndRememberEvent(e,t,j)}},{key:"emitLogsEvent",value:function(e,t){this.emitAndRememberEvent(e,t,M)}},{key:"emitAndRememberEvent",value:function(e,t,n){this.rememberEvent(e,t,n),this.emitEvent(e,t)}},{key:"emitEvent",value:function(e,t){var n=this.virtualSubscriptionsById.get(e);n&&this.emitGenericEvent(n,t)}},{key:"rememberEvent",value:function(e,t,n){var r=this.virtualSubscriptionsById.get(e);r&&U(r.sentEvents,Object.assign({},t),n)}},{key:"emitGenericEvent",value:function(e,t){this.emitProcessFn(e.event)(t)}},{key:"startHeartbeat",value:function(){var e=this;null==this.heartbeatIntervalId&&(this.heartbeatIntervalId=setInterval((function(){return(0,p._)(e,void 0,void 0,d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,G(this.send("net_version"),1e4);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this._websocket.reconnect();case 8:case"end":return e.stop()}}),e,this,[[0,5]])})))}),3e4))}},{key:"sendBatchConcurrently",value:function(e){return(0,p._)(this,void 0,void 0,d().mark((function t(){var n=this;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Promise.all(e.map((function(e){return n.send(e.method,e.params)}))));case 1:case"end":return t.stop()}}),t)})))}},{key:"customStartEvent",value:function(e){if(e.type===p.h){var t=e.fromAddress,n=e.toAddress,r=e.hashesOnly;this._subscribe(e.tag,[p.j.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:n,hashesOnly:r}],this.emitProcessFn(e),e)}else if(e.type===p.k){var s=e.addresses,i=e.includeRemoved,o=e.hashesOnly;this._subscribe(e.tag,[p.j.MINED_TRANSACTIONS,{addresses:s,includeRemoved:i,hashesOnly:o}],this.emitProcessFn(e),e)}else"block"===e.type?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):"filter"===e.type&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}},{key:"emitProcessFn",value:function(e){var t=this;switch(e.type){case p.h:return function(n){return t.emit({method:p.j.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},n)};case p.k:return function(n){return t.emit({method:p.j.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},n)};case"block":return function(e){var n=b.O$.from(e.number).toNumber();t._emitted.block=n,t.emit("block",n)};case"filter":return function(n){null==n.removed&&(n.removed=!1),t.emit(e.filter,t.formatter.filterLog(n))};default:throw new Error("Invalid event type to `emitProcessFn()`")}}},{key:"_off",value:function(e,t){var n=this;if(null==t)return this.removeAllListeners(e);var r=[],s=!1,i=(0,p.e)(e);return this._events=this._events.filter((function(e){return e.tag!==i||e.listener!=t||(!!s||(s=!0,r.push(e),!1))})),r.forEach((function(e){n._stopEvent(e)})),this}},{key:"_removeAllListeners",value:function(e){var t=this,n=[];if(null==e)n=this._events,this._events=[];else{var r=(0,p.e)(e);this._events=this._events.filter((function(e){return e.tag!==r||(n.push(e),!1)}))}return n.forEach((function(e){t._stopEvent(e)})),this}},{key:"_listenerCount",value:function(e){if(!e)return this._events.length;var t=(0,p.e)(e);return this._events.filter((function(e){return e.tag===t})).length}},{key:"_listeners",value:function(e){if(null==e)return this._events.map((function(e){return e.listener}));var t=(0,p.e)(e);return this._events.filter((function(e){return e.tag===t})).map((function(e){return e.listener}))}}],[{key:"getNetwork",value:function(e){return"string"===typeof e&&e in p.C?p.C[e]:(0,m.H)(e)}}]),f}(O);function F(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){return!0};return(0,p._)(this,void 0,void 0,d().mark((function r(){var s,i;return d().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:s=0,i=0;case 2:return r.prev=3,r.next=6,e();case 6:return r.abrupt("return",r.sent);case 9:if(r.prev=9,r.t0=r.catch(3),!(++i>=t)&&n(r.t0)){r.next=14;break}throw r.t0;case 14:return r.next=16,D(s);case 16:if(n(r.t0)){r.next=18;break}throw r.t0;case 18:s=0===s?1e3:Math.min(3e4,2*s);case 19:r.next=2;break;case 21:case"end":return r.stop()}}),r,null,[[3,9]])})))}function D(e){return new Promise((function(t){return setTimeout(t,e)}))}function G(e,t){return Promise.race([e,new Promise((function(e,n){return setTimeout((function(){return n(new Error("Timeout"))}),t)}))])}function j(e){return(0,p.f)(e.number)}function M(e){return(0,p.f)(e.blockNumber)}function U(e,t,n){var r=n(t),s=e.findIndex((function(e){return n(e)>r-10}));-1===s?e.length=0:e.splice(0,s),e.push(t)}},33372:function(e,t){var n=function(){function e(t,n,s){if(void 0===s&&(s={}),this.url=t,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=e.CONNECTING,this.OPEN=e.OPEN,this.CLOSING=e.CLOSING,this.CLOSED=e.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==n||"string"===typeof n||Array.isArray(n)?this.protocols=n:s=n,this.options=r(s),!this.options.wsConstructor){if("undefined"===typeof WebSocket)throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.options.wsConstructor=WebSocket}this.openNewWebSocket()}return Object.defineProperty(e.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach((function(n){var r=function(e){return"string"===typeof e?2*e.length:e instanceof ArrayBuffer?e.byteLength:e instanceof Blob?e.size:void 0}(n);null!=r?e+=r:t=!0})),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this.isClosed?e.CLOSED:e.OPEN},enumerable:!0,configurable:!0}),e.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},e.prototype.send=function(e){if(this.isClosed)throw new Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},e.prototype.reconnect=function(){if(this.isClosed)throw new Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},e.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},e.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},e.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter((function(e){return e!==t})))},e.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,n=t.connectTimeout,r=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var s=new r(this.url,this.protocols);s.onclose=function(t){return e.handleClose(t)},s.onerror=function(t){return e.handleError(t)},s.onmessage=function(t){return e.handleMessage(t)},s.onopen=function(t){return e.handleOpen(t)},this.connectTimeoutId=setTimeout((function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)}),n),this.ws=s}},e.prototype.handleOpen=function(e){var t=this;if(this.ws&&!this.isClosed){var n=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach((function(e){return t.send(e)})),this.messageBuffer=[],this.allClearTimeoutId=setTimeout((function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var e=n/1e3|0;t.debugLog("WebSocket remained open for "+e+" seconds. Resetting retry time and count.")}),n)}},e.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},e.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var n=this.options,r=n.maxReconnectAttempts,s=n.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=r)this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());else{var i=!e||s(e);"boolean"===typeof i?this.handleWillReconnect(i,e,"Provided shouldReconnect() returned false. Closing permanently."):i.then((function(n){t.isClosed||t.handleWillReconnect(n,e,"Provided shouldReconnect() resolved to false. Closing permanently.")}))}}},e.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},e.prototype.handleWillReconnect=function(e,t,n){e?this.reestablishConnection():this.stopReconnecting(t,n)},e.prototype.reestablishConnection=function(){var e=this,t=this.options,n=t.minReconnectDelay,r=t.maxReconnectDelay,s=t.reconnectBackoffFactor;this.reconnectCount++;var i=this.nextRetryTime;this.nextRetryTime=Math.max(n,Math.min(this.nextRetryTime*s,r)),setTimeout((function(){return e.openNewWebSocket()}),i);var o=i/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+o+" seconds.")},e.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},e.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},e.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=s,this.ws.onclose=s,this.ws.onmessage=s,this.ws.onopen=s,this.ws.close(e,t),this.ws=void 0)},e.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},e.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},e.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},e.prototype.dispatchEventOfType=function(e,t){var n=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t)}return e in this.listeners&&this.listeners[e].slice().forEach((function(e){return n.callListener(e,t)})),!t||!t.defaultPrevented},e.prototype.callListener=function(e,t){"function"===typeof e?e.call(this,t):e.handleEvent.call(this,t)},e.prototype.debugLog=function(e){this.options.debug&&console.log(e)},e.prototype.getTooManyFailedReconnectsMessage=function(){var e,t=this.options.maxReconnectAttempts;return"Failed to reconnect after "+t+" "+(e="attempt",(1===t?e:e+"s")+". Closing permanently.")},e.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},e.CONNECTING=0,e.OPEN=1,e.CLOSING=2,e.CLOSED=3,e}();function r(e){var t={};return Object.keys(n.DEFAULT_OPTIONS).forEach((function(r){var s=e[r];t[r]=void 0===s?n.DEFAULT_OPTIONS[r]:s})),t}function s(){}t.Z=n}}]);