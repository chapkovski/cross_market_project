(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],d=0,m=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&m.push(a[s][0]),a[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,o=1;o<r.length;o++){var c=r[o];0!==a[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=r[0]))}return t}var n={},a={main:0},i=[];function s(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=n,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/front/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"3a8a":function(t,e,r){"use strict";r("fb15")},"488c":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("a026"),a=(r("d3b7"),r("bc3a")),i=r.n(a),s={},o=i.a.create(s);o.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),o.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),Plugin.install=function(t,e){t.axios=o,window.axios=o,Object.defineProperties(t.prototype,{axios:{get:function(){return o}},$axios:{get:function(){return o}}})},n["default"].use(Plugin);Plugin;var c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("home")],1)},l=[],u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"inspire"}},[r("v-app-bar",{attrs:{app:"",height:"90"}},[r("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm flex-column mx-3",attrs:{elevation:"3",height:"80px"}},[r("div",{staticClass:"d-flex flex-row"},[r("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[r("div",{staticClass:"d-flex align-center  "},[t._v("Periodo: "),r("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" "+t._s(t.$store.state.round_number)+" ")])])])],1)]),r("timer",{on:{dayDone:t.submit}}),r("info"),r("v-spacer"),r("div",{staticClass:"d-flex flex-column"},[t.$store.state.round_number>1?r("transaction-prices"):t._e(),r("instructions")],1)],1),r("v-main",[r("v-row",{staticClass:"d-flex align-stretch",staticStyle:{height:"100%"},attrs:{"fill-height":""}},[r("v-col",{attrs:{cols:"6"}},[r("market",{attrs:{name:"A",stocksData:{q:t.market_A.shares,price:t.market_A.price,money:t.availableMoney("A")}}})],1),r("v-col",{attrs:{cols:"6"}},[r("market",{attrs:{name:"B",stocksData:{q:t.market_B.shares,price:t.market_B.price,money:t.availableMoney("B")}}})],1)],1)],1)],1)},d=[],m=r("1da1"),v=r("5530"),f=r("4416"),p=r.n(f),_=r("5a3a"),h=r.n(_),b=(r("96cf"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"ma-1 d-flex justify-center align-center",attrs:{color:"red",height:"80px"}},[r("v-card-text",[t._v(" Tempo Rimanente: "),r("v-chip",{attrs:{color:"primary"}},[r("countdown",{ref:"timer",attrs:{"left-time":t.timeLeft,"auto-start":!0},on:{finish:t.dayOver},scopedSlots:t._u([{key:"before",fn:function(){return[r("span",[t._v(t._s(t.formattedFullTime))])]},proxy:!0},{key:"finish",fn:function(){return[r("span",[t._v(t._s(t.formattedFullTime))])]},proxy:!0},{key:"process",fn:function(e){return[r("span",[t._v(t._s(" "+e.timeObj.m+": "+e.timeObj.s))])]}}])})],1)],1)],1)}),g=[],k=(r("4d90"),r("25f0"),window.gameParams),y=k.dayLength,x=k.SEC,O=y*x,w={data:function(){return{timeLeft:O,endTime:(new Date).getTime()+O}},computed:{formattedFullTime:function(){var t=y;return Math.floor(t/60).toString().padStart(2,"0")+": "+(t%60?t%60:"00").toString().padStart(2,"0")}},methods:{dayOver:function(){this.$emit("dayDone")}}},C=w,V=r("2877"),B=r("6544"),S=r.n(B),j=r("b0af"),A=r("99d9"),T=r("cc20"),E=Object(V["a"])(C,b,g,!1,null,"92504ce8",null),M=E.exports;S()(E,{VCard:j["a"],VCardText:A["b"],VChip:T["a"]});var R=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.merged?t._e():r("div",{staticClass:"ma-1 d-flex justify-center align-center"},[r("v-sheet",{staticClass:"ma-1 d-flex justify-center align-center",attrs:{elevation:"3",height:"80"}},[r("div",{staticClass:"d-flex flex-row"},[r("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-pill",attrs:{outlined:""}},[r("div",{staticClass:"d-flex align-center  "},[t._v(" Contante Disponibile al Mercato A: "),r("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_A.cash.toFixed(2))+" ")])])])],1)]),r("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm flex-column mx-3",attrs:{elevation:"3",height:"80"}},[r("div",{staticClass:"d-flex flex-row"},[r("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-pill",attrs:{outlined:""}},[r("div",{staticClass:"d-flex align-center  "},[t._v(" Contante Disponibile al Mercato B: "),r("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_B.cash.toFixed(2))+" ")])])])],1)])],1),t.merged?r("div",[r("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm",attrs:{elevation:"3",height:"64px"}},[r("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v(" Contante Disponibile: ")]),r("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[r("div",{staticClass:"d-flex align-center  "},[r("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total.cash.toFixed(2))+" ")])])]),t._e()],1)],1):t._e()])},I=[],D=r("2f62"),P={data:function(){return{}},computed:Object(v["a"])(Object(v["a"])({},Object(D["c"])(["stock_value_by_market","total_stock_value","total_in_market","total_in_both_markets"])),Object(D["d"])(["socket","total","market_A","market_B","merged"])),methods:{}},z=P,$=r("8dd9"),L=Object(V["a"])(z,R,I,!1,null,"29c312cb",null),F=L.exports;S()(L,{VSheet:$["a"]});var G=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"v-100",staticStyle:{height:"90vh"},attrs:{"fill-height":""}},[r("v-toolbar",{attrs:{height:"80"}},[r("v-sheet",{staticClass:"mx-1 d-flex rounded-l-xl font-weight-bold  ",attrs:{outlined:""}},[r("v-list-item",[t._v("Mercato "+t._s(t.name)+".")])],1),r("v-sheet",{staticClass:"mx-0 d-flex ",attrs:{outlined:""}},[r("v-list-item",[r("v-list-item-content"),t._v(" Numero di Azioni: ")],1),r("v-list-item-action",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.stocksData.q)+" ")])],1),r("v-sheet",{staticClass:"mx-1 rounded-r-xl ",attrs:{outlined:""}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[t._v("Prezzo Corrente "+t._s(t.name)+": ")])],1),r("v-list-item-action",{staticClass:"font-weight-bold "},[t._v(" "+t._s(t.stocksData.price.toFixed(2))+" ")])],1)],1),r("v-spacer"),r("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[r("v-btn",t._g(t._b({attrs:{color:"green"}},"v-btn",a,!1),n),[t._v(" Ordina "+t._s(t.name)+" ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5 grey lighten-2"},[t._v(" Immetti un ordine di vendita/acquisto per il Mercato "+t._s(t.name)+" ")]),r("v-card-text",[r("v-list",{attrs:{dense:""}},[r("v-subheader",[t._v("Info")]),r("v-list-item-group",{attrs:{color:"primary"}},[r("v-list-item",[r("v-list-item-icon",[r("v-icon",[t._v("mdi-account")])],1),r("v-list-item-content",[r("v-list-item-title",[t._v("Contante Disponibile")])],1),r("v-list-item-action",[r("v-btn",{attrs:{icon:""}},[r("v-card",[t._v(t._s(t.cash_available))])],1)],1)],1),t.onMarketSize("buy")?r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[t._v("Your current buying order")])],1),r("v-list-item-action",[r("v-btn",{attrs:{icon:""}},[r("v-card",[t._v(" "+t._s(t.currentActiveOrder(t.name,"buy").value))])],1)],1)],1):t._e(),t.onMarketSize("sell")?r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[t._v("Your current selling order")])],1),r("v-list-item-action",[r("v-btn",{attrs:{icon:""}},[r("v-card",[t._v(" "+t._s(t.currentActiveOrder(t.name,"sell").value))])],1)],1)],1):t._e(),r("v-list-item",[r("v-list-item-icon",[r("v-icon",[t._v("mdi-cash-fast")])],1),r("v-list-item-content",[r("v-list-item-title",[t._v("Azioni")])],1),r("v-list-item-action",[r("v-btn",{attrs:{icon:""}},[r("v-card",[t._v(" "+t._s(t.stocksData.q))])],1)],1)],1),r("v-list-item",[r("v-list-item-icon",[r("v-icon",[t._v("mdi-hand-coin")])],1),r("v-list-item-content",[r("v-list-item-title",[t._v("Prezzo corrente")])],1),r("v-list-item-action",[r("v-btn",{attrs:{icon:""}},[r("v-card",[t._v(" "+t._s(t.stocksData.price.toFixed(2)))])],1)],1)],1)],1)],1),r("v-text-field",{attrs:{label:"Prezzo",solo:"",placeholder:"Prezzo",type:"number",autofocus:"",hint:"inserire un prezzo e cliccare sul pulsante corrispondente",required:""},model:{value:t.bidValue,callback:function(e){t.bidValue=e},expression:"bidValue"}})],1),r("v-divider"),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"secondary",outlined:""},on:{click:function(e){t.dialog=!1,t.bidValue=null}}},[t._v("Cancella ")]),r("v-btn",{attrs:{color:"orange",disabled:!t.transactionAllowed("buy")},on:{click:t.putBuyOrder}},[t._v(" "+t._s(t.buy_order_button_text)+" ")]),r("v-btn",{attrs:{color:"green",disabled:!t.transactionAllowed("sell")},on:{click:t.putSellOrder}},[t._v(" "+t._s(t.sell_order_button_text)+" ")])],1)],1)],1)],1),r("v-row",{staticStyle:{height:"calc(100vh - 190px)","margin-top":"20px","margin-bottom":"10px"}},[r("buy-bid-list",{attrs:{name:t.name,bids:t.buyingBids,type:"buy"}}),r("sell-bid-list",{attrs:{name:t.name,bids:t.sellingBids,type:"sell"}})],1)],1)},N=[],U=(r("b0c0"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[r("v-card",{staticClass:"d-flex flex-column buysellcard",staticStyle:{height:"95%"},attrs:{"fill-height":""}},[r("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Offerte di Acquisto ")]),r("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[r("v-list",{staticClass:"listouter1"},[r("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[r("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,n){return r("v-list-item",{key:n,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?r("span",[t._v(" (Your own)")]):t._e()])],1)],1)})),1)])],1)],1),r("v-footer",{staticClass:"bottom_footer"},[r("v-btn",{attrs:{color:"red",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))]),r("v-spacer"),t.onMarketSize?r("v-btn",{staticClass:"ml-2",attrs:{color:"red"},on:{click:t.cancelBid}},[t._v(" Cancel ")]):t._e()],1)],1)],1)}),H=[],q=r("2768"),K=r.n(q),Y=(r("99af"),{components:{},name:"BuyBidList",props:["name","bids","type"],data:function(){return{}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(D["d"])(["player_id"])),Object(D["c"])(["get_num_shares","is_trader_on_market_size"])),{},{selectedSellingBid:function(){if(this.bids.length>0){var t=this.bids[0];if(t.trader!==this.player_id)return 0}return null},onMarketSize:function(){return this.is_trader_on_market_size(this.name,this.type)},current_num_shares:function(){return this.get_num_shares(this.name)},emptyBid:function(){return K()(this.selectedSellingBid)||0===this.current_num_shares},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Vendi":"Vendi 1 ".concat(this.name," per ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(D["b"])(["sendMessage"])),{},{cancelBid:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({action:"cancelBid",trader_id:t.player_id,market:t.name,type:t.type});case 2:case"end":return e.stop()}}),e)})))()},transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:case"end":return e.stop()}}),e)})))()}})}),J=Y,W=(r("7e59"),r("40dc")),Q=r("8336"),X=r("62ad"),Z=r("553a"),tt=r("8860"),et=r("da13"),rt=r("5d23"),nt=r("1baa"),at=r("2fa4"),it=Object(V["a"])(J,U,H,!1,null,"6e669694",null),st=it.exports;S()(it,{VAppBar:W["a"],VBtn:Q["a"],VCard:j["a"],VCardText:A["b"],VCol:X["a"],VFooter:Z["a"],VList:tt["a"],VListItem:et["a"],VListItemContent:rt["a"],VListItemGroup:nt["a"],VListItemTitle:rt["b"],VSpacer:at["a"]});var ot=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[r("v-card",{staticClass:"d-flex flex-column buysellcard",attrs:{"fill-height":""}},[r("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Offerte di Vendita ")]),r("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[r("v-list",{staticClass:"listouter1"},[r("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[r("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,n){return r("v-list-item",{key:n,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?r("span",[t._v(" (Your own)")]):t._e()])],1)],1)})),1)])],1)],1),r("v-footer",{staticClass:"bottom_footer"},[r("v-btn",{attrs:{color:"green",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))]),r("v-spacer"),t.onMarketSize?r("v-btn",{staticClass:"ml-2",attrs:{color:"red"},on:{click:t.cancelBid}},[t._v(" Cancel ")]):t._e()],1)],1)],1)},ct=[],lt={components:{},props:["name","bids","type"],data:function(){return{}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(D["d"])(["player_id"])),Object(D["c"])(["get_cash","is_trader_on_market_size"])),{},{selectedSellingBid:function(){if(this.bids.length>0){var t=this.bids[0];if(t.trader!==this.player_id)return 0}return null},onMarketSize:function(){return this.is_trader_on_market_size(this.name,this.type)},cash_available:function(){return this.get_cash(this.name)},emptyBid:function(){return K()(this.selectedSellingBid)||this.cash_available<this.selectedBidValue.value},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Compra":"Compra 1 ".concat(this.name," per ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(D["b"])(["sendMessage"])),{},{cancelBid:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({action:"cancelBid",trader_id:t.player_id,market:t.name,type:t.type});case 2:case"end":return e.stop()}}),e)})))()},transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.cash_available>=t.selectedBidValue.value)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:case"end":return e.stop()}}),e)})))()}})},ut=lt,dt=(r("3a8a"),Object(V["a"])(ut,ot,ct,!1,null,"373547d6",null)),mt=dt.exports;S()(dt,{VAppBar:W["a"],VBtn:Q["a"],VCard:j["a"],VCardText:A["b"],VCol:X["a"],VFooter:Z["a"],VList:tt["a"],VListItem:et["a"],VListItemContent:rt["a"],VListItemGroup:nt["a"],VListItemTitle:rt["b"],VSpacer:at["a"]});var vt={props:["name","stocksData"],components:{BuyBidList:st,SellBidList:mt},name:"Market",data:function(){return{selectedSellingBid:null,bidValue:null,dialog:!1}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(D["c"])(["filteredBids","get_cash","get_num_shares","is_trader_on_market","is_trader_on_market_size","currentActiveOrder"])),{},{buy_order_button_text:function(){return this.onMarketSize("buy")?"Sostituire l'ordine di Acquisto":"Ordine di Acquisto"},sell_order_button_text:function(){return this.onMarketSize("sell")?"Sostituire l'ordine di Vendita":"Ordine di Vendita"},onMarket:function(){return this.is_trader_on_market(this.name)},current_num_shares:function(){return this.get_num_shares(this.name)},cash_available:function(){return this.get_cash(this.name)}},Object(D["d"])(["player_id"])),{},{buyingBids:function(){return this.filteredBids({market:this.name,type:"buy"})},sellingBids:function(){return this.filteredBids({market:this.name,type:"sell"})}}),watch:{dialog:function(t){t||(this.bidValue=null)}},methods:Object(v["a"])(Object(v["a"])({},Object(D["b"])(["sendMessage"])),{},{transactionAllowed:function(t){return!!this.bidValue&&("sell"===t?!(this.current_num_shares<1)&&!(this.onMarketSize("buy")&&parseFloat(this.bidValue)<=parseFloat(this.currentActiveOrder(this.name,"buy").value)):"buy"===t?!(this.bidValue>this.cash_available)&&!(this.onMarketSize("sell")&&parseFloat(this.bidValue)>=parseFloat(this.currentActiveOrder(this.name,"sell").value)):void 0)},onMarketSize:function(t){return this.is_trader_on_market_size(this.name,t)},putOrder:function(t){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.sendMessage({action:"addBid",type:t,value:e.bidValue,trader_id:e.player_id,market:e.name});case 2:e.bidValue=null,e.dialog=!1;case 4:case"end":return r.stop()}}),r)})))()},putBuyOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.bidValue<=t.cash_available)){e.next=3;break}return e.next=3,t.putOrder("buy");case 3:case"end":return e.stop()}}),e)})))()},putSellOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.putOrder("sell");case 3:case"end":return e.stop()}}),e)})))()}})},ft=vt,pt=(r("f4ed"),r("169a")),_t=r("ce7e"),ht=r("132d"),bt=r("1800"),gt=r("34c3"),kt=r("0fd9"),yt=r("e0c7"),xt=r("8654"),Ot=r("71d9"),wt=Object(V["a"])(ft,G,N,!1,null,null,null),Ct=wt.exports;S()(wt,{VBtn:Q["a"],VCard:j["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VDialog:pt["a"],VDivider:_t["a"],VIcon:ht["a"],VList:tt["a"],VListItem:et["a"],VListItemAction:bt["a"],VListItemContent:rt["a"],VListItemGroup:nt["a"],VListItemIcon:gt["a"],VListItemTitle:rt["b"],VRow:kt["a"],VSheet:$["a"],VSpacer:at["a"],VSubheader:yt["a"],VTextField:xt["a"],VToolbar:Ot["a"]});var Vt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"m-1",attrs:{color:"green",dark:"",width:"150"}},"v-btn",a,!1),n),[t._v(" Storico dei Prezzi ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-toolbar",{attrs:{dark:"",color:"primary"}},[r("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[r("v-icon",[t._v("mdi-close")])],1),r("v-toolbar-title",[t._v("Price history for both markets")]),r("v-spacer"),r("v-toolbar-items",[r("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")])],1)],1),r("v-card-text",[t.dialog?r("chart-module"):t._e()],1)],1)],1)},Bt=[],St=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticStyle:{height:"50vh"},attrs:{fluid:""}},[r("v-col",{attrs:{cols:"12"}},[r("highcharts",{ref:"priceGraph",staticClass:"hc",attrs:{options:t.chartOptions,constructorType:"stockChart"}})],1)],1)},jt=[],At=r("ea7f"),Tt=r.n(At),Et=r("37d8"),Mt=r.n(Et),Rt=r("4452");Mt()(Tt.a);var It={components:{highcharts:Rt["Chart"]},name:"ChartModule",data:function(){return{chartOptions:{time:{useUTC:!1},chart:{height:"100%",events:{load:function(t){t.target.reflow()}}},series:[{name:"A",type:"line",data:this.seriesA},{name:"B",type:"line",data:this.seriesB}]}}},watch:{priceHistory:function(){var t=this;this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},computed:Object(v["a"])(Object(v["a"])({},Object(D["d"])(["priceHistory"])),{},{seriesA:function(){return this.priceHistory.A},seriesB:function(){return this.priceHistory.B}}),mounted:function(){var t=this;this.chartOptions.series[0].data=this.seriesA,this.chartOptions.series[1].data=this.seriesB,this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},Dt=It,Pt=r("a523"),zt=Object(V["a"])(Dt,St,jt,!1,null,null,null),$t=zt.exports;S()(zt,{VCol:X["a"],VContainer:Pt["a"]});var Lt={components:{ChartModule:$t},props:["marketName"],name:"TransactionPrices",data:function(){return{dialog:!1}}},Ft=Lt,Gt=r("2a7f"),Nt=Object(V["a"])(Ft,Vt,Bt,!1,null,null,null),Ut=Nt.exports;S()(Nt,{VBtn:Q["a"],VCard:j["a"],VCardText:A["b"],VDialog:pt["a"],VIcon:ht["a"],VSpacer:at["a"],VToolbar:Ot["a"],VToolbarItems:Gt["a"],VToolbarTitle:Gt["b"]});var Ht=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{scrollable:"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"m-1",attrs:{color:"red",dark:"",width:"150"}},"v-btn",a,!1),n),[t._v(" Istruzioni ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-toolbar",{attrs:{dark:"",color:"primary"}},[r("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[r("v-icon",[t._v("mdi-close")])],1),r("v-toolbar-title",[t._v("Istruzioni")]),r("v-spacer"),r("v-toolbar-items",[r("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Chiudere ")])],1)],1),r("v-card-text",{domProps:{innerHTML:t._s(t.instructions)}})],1)],1)},qt=[],Kt={name:"Instructions",data:function(){return{instructions:document.getElementById("instructions").innerHTML,dialog:!1}}},Yt=Kt,Jt=Object(V["a"])(Yt,Ht,qt,!1,null,null,null),Wt=Jt.exports;S()(Jt,{VBtn:Q["a"],VCard:j["a"],VCardText:A["b"],VDialog:pt["a"],VIcon:ht["a"],VSpacer:at["a"],VToolbar:Ot["a"],VToolbarItems:Gt["a"],VToolbarTitle:Gt["b"]});var Qt={components:{Market:Ct,TransactionPrices:Ut,Timer:M,Info:F,Instructions:Wt},data:function(){return{cards:["Today","Yesterday"],innerList:h()(1,10),drawer:null}},computed:Object(v["a"])(Object(v["a"])({},Object(D["c"])(["stock_value_by_market","total_stock_value","total_in_market","total_in_both_markets"])),Object(D["d"])(["socket","total","market_A","market_B","merged"])),watch:{socket:function(t){t.isConnected&&this.sendMessage({app:"Mounted!"})},innerList:function(){var t=p()(this.innerList);this.$nextTick((function(){var e=document.getElementById("li_".concat(t));e.scrollIntoView({behavior:"smooth"})}))}},created:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$options.sockets.onopen=Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({name:"Trade_starts"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),t.$options.sockets.onmessage=function(t){return console.log(t)};case 2:case"end":return e.stop()}}),e)})))()},mounted:function(){this.socket.isConnected&&this.sendMessage({app:"Mounted!"})},methods:Object(v["a"])(Object(v["a"])({submit:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.endingGame();case 2:case"end":return e.stop()}}),e)})))()}},Object(D["b"])(["sendMessage","endingGame"])),{},{availableMoney:function(t){return this.merged?this.total.cash:"A"==t?this.market_A.cash:"B"==t?this.market_B.cash:void 0},scrollToEnd:function(){var t=this.$el.querySelector("#sellcontainer");t.scrollTop=t.scrollHeight}})},Xt=Qt,Zt=r("7496"),te=r("f6c4"),ee=Object(V["a"])(Xt,u,d,!1,null,null,null),re=ee.exports;S()(ee,{VApp:Zt["a"],VAppBar:W["a"],VCol:X["a"],VMain:te["a"],VRow:kt["a"],VSheet:$["a"],VSpacer:at["a"]});var ne={components:{Home:re},name:"App"},ae=ne,ie=(r("5c0b"),Object(V["a"])(ae,c,l,!1,null,null,null)),se=ie.exports,oe=r("51f5"),ce=r.n(oe),le=r("93c6"),ue=r.n(le),de=r("9380"),me=r.n(de),ve=r("1a8c"),fe=r.n(ve),pe=r("006f"),_e=r.n(pe),he=r("2769"),be=r.n(he);r("a434");n["default"].use(D["a"]);var ge=new D["a"].Store({state:{round_number:window.round_number,merged:Boolean(window.merged),player_id:window.player_id,total:status.total,market_A:status.A,market_B:status.B,bids:[],priceHistory:window_history,socket:{isConnected:!1,message:"",reconnectError:!1}},getters:{is_trader_on_market:function(t){return function(e){var r=be()(t.bids,_e()({market:e,trader:t.player_id}));return fe()(r)}},is_trader_on_market_size:function(t,e){return function(t,r){return fe()(e.currentActiveOrder(t,r))}},currentActiveOrder:function(t){return function(e,r){var n=be()(t.bids,_e()({market:e,trader:t.player_id,type:r}));return n}},total_in_market:function(t,e){return function(r){var n=e.stock_value_by_market(r),a=t["market_".concat(r)].cash;return n+a}},total_in_both_markets:function(t,e){return function(){var t=e.total_in_market("A"),r=e.total_in_market("B");return t+r}},stock_value_by_market:function(t){return function(e){var r=t["market_".concat(e)],n=r.shares,a=r.price;return n*a}},cash_by_market:function(t){return function(e){var r=t["market_".concat(e)];return r.cash}},total_stock_value:function(t,e){return function(){var t=e.stock_value_by_market("A"),r=e.stock_value_by_market("B");return t+r}},get_cash:function(t){return function(e){return t.merged?t.total.cash:"A"===e?t.market_A.cash:"B"===e?t.market_B.cash:void 0}},get_num_shares:function(t){return function(e){return"A"===e?t.market_A.shares:"B"===e?t.market_B.shares:void 0}},filteredBids:function(t){return function(e){var r=e.market,n=e.type,a="buy"===n?"desc":"asc",i=me()(t.bids,_e()({market:r,type:n})),s=ue()(i,["value"],[a]);return s}}},mutations:{SET_BIDS:function(t,e){t.bids=e},UPDATE_STATUS:function(t,e){var r=e.total,n=e.A,a=e.B;t.total=r,t.market_A=n,t.market_B=a},UPDATE_PRICE:function(t,e){var r=e.market,n=e.price;"A"===r&&(t.market_A.price=n),"B"===r&&(t.market_B.price=n)},ADD_BID:function(t,e){e.value=parseFloat(e.value),t.bids.push(e)},REMOVE_BID:function(t,e){var r=ce()(t.bids,_e()({id:e}));t.bids.splice(r,1)},SOCKET_ONOPEN:function(t,e){n["default"].prototype.$socket=e.currentTarget,t.socket.isConnected=!0},SOCKET_ONCLOSE:function(t,e){t.socket.isConnected=!1},SOCKET_ONERROR:function(t,e){console.error(t,e)},SOCKET_ONMESSAGE:function(t,e){t.socket.message=e,console.debug("MESSAGE",e)},SOCKET_RECONNECT:function(t,e){console.info(t,e)},SOCKET_RECONNECT_ERROR:function(t){t.socket.reconnectError=!0}},actions:{endingGame:function(t){return Object(m["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.state,r=t.dispatch,e.next=3,r("sendMessage",{action:"gameEnds"});case 3:document.getElementById("form").submit();case 4:case"end":return e.stop()}}),e)})))()},getServerConfirmation:function(t,e){console.debug(e)},setBids:function(t,e){var r=e.bids,n=e.status,a=e.market,i=e.price;i&&t.commit("UPDATE_PRICE",{market:a,price:i}),n&&(t.commit("UPDATE_STATUS",n),t.commit("UPDATE_PRICE",n)),t.commit("SET_BIDS",r)},addBid:function(t,e){var r=e.bid,n=e.bid_to_remove;n&&t.commit("REMOVE_BID",n),t.commit("ADD_BID",r)},from_huey:function(t,e){console.debug("MESSAGE MOTHER FUCKER!!!",JSON.stringify(e))},removeBid:function(t,e){var r=e.bid_id,n=e.market,a=e.price;t.commit("REMOVE_BID",r),a&&t.commit("UPDATE_PRICE",{market:n,price:a})},remove_and_update:function(t,e){var r=e.bid_id,n=e.status;t.commit("REMOVE_BID",r),t.commit("UPDATE_STATUS",n),t.commit("UPDATE_PRICE",n)},sendMessage:function(){var t=Object(m["a"])(regeneratorRuntime.mark((function t(e,r){var a,i,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.state,i=a.market_A,s=a.market_B,o=a.player_id,t.next=4,n["default"].prototype.$socket.sendObj(Object(v["a"])({player_id:o,marketData:{market_A:i,market_B:s}},r));case 4:case"end":return t.stop()}}),t)})));function e(e,r){return t.apply(this,arguments)}return e}()},modules:{}}),ke=r("f309");n["default"].use(ke["a"]);var ye=new ke["a"]({icons:{iconfont:"mdi"}}),xe=r("8c4f");n["default"].use(xe["a"]);var Oe=[{path:"/priceChart",name:"priceChart",component:$t},{path:"/marketA",name:"marketA",component:Ct,props:{marketName:"A"}},{path:"/marketB",name:"marketB",component:Ct,props:{marketName:"B"}}],we=new xe["a"]({routes:Oe}),Ce=we,Ve=r("b408"),Be=r.n(Ve),Se=r("c986"),je=r.n(Se),Ae="https:"===window.location.protocol?"wss":"ws",Te=Ae+"://"+window.location.host+window.socket_path;n["default"].use(Be.a,Te,{store:ge,format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),n["default"].config.productionTip=!1,n["default"].use(je.a,"vac"),new n["default"]({store:ge,vuetify:ye,router:Ce,render:function(t){return t(se)}}).$mount("#app")},"5c0b":function(t,e,r){"use strict";r("9c0c")},"7e59":function(t,e,r){"use strict";r("8eef")},"8eef":function(t,e,r){},"9c0c":function(t,e,r){},f4ed:function(t,e,r){"use strict";r("488c")},fb15:function(t,e,r){}});