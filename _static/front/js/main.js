(function(t){function e(e){for(var r,s,o=e[0],c=e[1],l=e[2],d=0,m=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&m.push(n[s][0]),n[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],r=!0,o=1;o<a.length;o++){var c=a[o];0!==n[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},n={main:0},i=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/front/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"488c":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("a026"),n=(a("d3b7"),a("bc3a")),i=a.n(n),s={},o=i.a.create(s);o.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),o.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),Plugin.install=function(t,e){t.axios=o,window.axios=o,Object.defineProperties(t.prototype,{axios:{get:function(){return o}},$axios:{get:function(){return o}}})},r["default"].use(Plugin);Plugin;var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("home")],1)},l=[],u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-app-bar",{attrs:{app:"",height:"120"}},[a("timer",{on:{dayDone:t.submit}}),a("info"),a("v-spacer"),a("div",{staticClass:"d-flex flex-column"},[t.$store.state.round_number>1?a("transaction-prices"):t._e(),a("instructions")],1)],1),a("v-main",[a("v-row",{staticClass:"d-flex align-stretch",staticStyle:{height:"100%"},attrs:{"fill-height":""}},[a("v-col",{attrs:{cols:"6"}},[a("market",{attrs:{name:"A",stocksData:{q:t.market_A.shares,price:t.market_A.price,money:t.availableMoney("A")}}})],1),a("v-col",{attrs:{cols:"6"}},[a("market",{attrs:{name:"B",stocksData:{q:t.market_B.shares,price:t.market_B.price,money:t.availableMoney("B")}}})],1)],1)],1)],1)},d=[],m=a("1da1"),v=a("5530"),_=a("4416"),p=a.n(_),f=a("5a3a"),h=a.n(f),b=(a("96cf"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-1 d-flex justify-center align-center",attrs:{color:"red",height:"100"}},[a("v-card-text",[t._v(" Time left: "),a("v-chip",{attrs:{color:"primary"}},[a("countdown",{ref:"timer",attrs:{"left-time":t.timeLeft,"auto-start":!0},on:{finish:t.dayOver},scopedSlots:t._u([{key:"before",fn:function(){return[a("span",[t._v(t._s(t.formattedFullTime))])]},proxy:!0},{key:"finish",fn:function(){return[a("span",[t._v(t._s(t.formattedFullTime))])]},proxy:!0},{key:"process",fn:function(e){return[a("span",[t._v(t._s(" "+e.timeObj.m+": "+e.timeObj.s))])]}}])})],1)],1)],1)}),g=[],k=(a("4d90"),a("25f0"),window.gameParams),x=k.dayLength,y=k.SEC,w=x*y,C={data:function(){return{timeLeft:w,endTime:(new Date).getTime()+w}},computed:{formattedFullTime:function(){var t=x;return Math.floor(t/60).toString().padStart(2,"0")+": "+(t%60?t%60:"00").toString().padStart(2,"0")}},methods:{dayOver:function(){this.$emit("dayDone")}}},O=C,B=a("2877"),V=a("6544"),S=a.n(V),j=a("b0af"),T=a("99d9"),A=a("cc20"),E=Object(B["a"])(O,b,g,!1,null,"4b678df7",null),M=E.exports;S()(E,{VCard:j["a"],VCardText:T["b"],VChip:A["a"]});var I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.merged?t._e():a("div",{staticClass:"d-flex"},[a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm flex-column mx-3",attrs:{elevation:"3",height:"100px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v("Market A value:")]),a("div",{staticClass:"d-flex flex-row"},[a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.stock_value_by_market("A").toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_A.cash.toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_market("A").toFixed(2))+" ")])])])],1)]),a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm flex-column mx-3",attrs:{elevation:"3",height:"100px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v("Market B value:")]),a("div",{staticClass:"d-flex flex-row"},[a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.stock_value_by_market("B").toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_B.cash.toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_market("B").toFixed(2))+" ")])])])],1)])],1),t.merged?a("div",[a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm",attrs:{elevation:"3",height:"64px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v(" Total markets A and B value: ")]),a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_stock_value().toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total.cash.toFixed(2))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_both_markets().toFixed(2))+" ")])])])],1)],1):t._e()])},R=[],P=a("2f62"),$={data:function(){return{}},computed:Object(v["a"])(Object(v["a"])({},Object(P["c"])(["stock_value_by_market","total_stock_value","total_in_market","total_in_both_markets"])),Object(P["d"])(["socket","total","market_A","market_B","merged"])),methods:{}},D=$,L=a("8dd9"),F=Object(B["a"])(D,I,R,!1,null,"49337ac5",null),z=F.exports;S()(F,{VSheet:L["a"]});var G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"v-100",staticStyle:{height:"90vh"},attrs:{"fill-height":""}},[a("v-toolbar",{attrs:{height:"80"}},[a("v-sheet",{staticClass:"mx-1 d-flex rounded-l-xl font-weight-bold  ",attrs:{outlined:""}},[a("v-list-item",[t._v("Market "+t._s(t.name)+".")])],1),a("v-sheet",{staticClass:"mx-0 d-flex ",attrs:{outlined:""}},[a("v-list-item",[a("v-list-item-content"),t._v(" Number of shares: ")],1),a("v-list-item-action",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.stocksData.q)+" ")])],1),a("v-sheet",{staticClass:"mx-1 rounded-r-xl ",attrs:{outlined:""}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Current price "+t._s(t.name)+": ")])],1),a("v-list-item-action",{staticClass:"font-weight-bold "},[t._v(" "+t._s(t.stocksData.price)+" ")])],1)],1),a("v-spacer"),a("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({attrs:{color:"green"}},"v-btn",n,!1),r),[t._v(" order "+t._s(t.name)+" ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5 grey lighten-2"},[t._v(" Put a selling/buying bid for Market "+t._s(t.name)+" ")]),a("v-card-text",[a("v-list",{attrs:{dense:""}},[a("v-subheader",[t._v("Info")]),a("v-list-item-group",{attrs:{color:"primary"}},[a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-account")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Money available")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(t._s(t.cash_available))])],1)],1)],1),t.onMarketSize("buy")?a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Your current buying order")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.currentActiveOrder(t.name,"buy").value))])],1)],1)],1):t._e(),t.onMarketSize("sell")?a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Your current selling order")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.currentActiveOrder(t.name,"sell").value))])],1)],1)],1):t._e(),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-cash-fast")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Stocks you own")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.stocksData.q))])],1)],1)],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-hand-coin")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Current stock price")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.stocksData.price))])],1)],1)],1)],1)],1),a("v-text-field",{attrs:{label:"Price",solo:"",placeholder:"Price",type:"number",autofocus:"",hint:"insert a price and click the corresponding  button",required:""},model:{value:t.bidValue,callback:function(e){t.bidValue=e},expression:"bidValue"}})],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary",outlined:""},on:{click:function(e){t.dialog=!1,t.bidValue=null}}},[t._v("Cancel ")]),a("v-btn",{attrs:{color:"orange",disabled:!t.transactionAllowed("buy")},on:{click:t.putBuyOrder}},[t._v(" "+t._s(t.buy_order_button_text)+" ")]),a("v-btn",{attrs:{color:"green",disabled:!t.transactionAllowed("sell")},on:{click:t.putSellOrder}},[t._v(" "+t._s(t.sell_order_button_text)+" ")])],1)],1)],1)],1),a("v-row",{staticStyle:{height:"calc(100vh - 190px)","margin-top":"20px","margin-bottom":"10px"}},[a("buy-bid-list",{attrs:{name:t.name,bids:t.buyingBids,type:"buy"}}),a("sell-bid-list",{attrs:{name:t.name,bids:t.sellingBids,type:"sell"}})],1)],1)},N=[],U=(a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[a("v-card",{staticClass:"d-flex flex-column buysellcard",staticStyle:{height:"95%"},attrs:{"fill-height":""}},[a("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Buying bids ")]),a("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[a("v-list",{staticClass:"listouter1"},[a("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[a("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,r){return a("v-list-item",{key:r,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?a("span",[t._v(" (Your own)")]):t._e(),e.trader__virtual&&!e.trader__is_mm?a("span",[t._v(" (V"+t._s(e.trader)+")")]):t._e(),e.trader__is_mm?a("span",[t._v(" (MM) ")]):t._e()])],1)],1)})),1)])],1)],1),a("v-footer",{staticClass:"bottom_footer"},[a("v-btn",{attrs:{color:"red",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))]),a("v-spacer"),t.onMarketSize?a("v-btn",{staticClass:"ml-2",attrs:{color:"red"},on:{click:t.cancelBid}},[t._v(" Cancel ")]):t._e()],1)],1)],1)}),H=[],q=a("2768"),K=a.n(q),J=(a("99af"),{components:{},name:"BuyBidList",props:["name","bids","type"],data:function(){return{}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(P["d"])(["player_id"])),Object(P["c"])(["get_num_shares","is_trader_on_market_size"])),{},{selectedSellingBid:function(){if(this.bids.length>0){var t=this.bids[0];if(t.trader!==this.player_id)return 0}return null},onMarketSize:function(){return this.is_trader_on_market_size(this.name,this.type)},current_num_shares:function(){return this.get_num_shares(this.name)},emptyBid:function(){return K()(this.selectedSellingBid)||0===this.current_num_shares},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Sell":"Sell 1 ".concat(this.name," for ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(P["b"])(["sendMessage"])),{},{cancelBid:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({action:"cancelBid",trader_id:t.player_id,market:t.name,type:t.type});case 2:case"end":return e.stop()}}),e)})))()},transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:case"end":return e.stop()}}),e)})))()}})}),Y=J,W=(a("62bf"),a("40dc")),Q=a("8336"),X=a("62ad"),Z=a("553a"),tt=a("8860"),et=a("da13"),at=a("5d23"),rt=a("1baa"),nt=a("2fa4"),it=Object(B["a"])(Y,U,H,!1,null,"ea075cfa",null),st=it.exports;S()(it,{VAppBar:W["a"],VBtn:Q["a"],VCard:j["a"],VCardText:T["b"],VCol:X["a"],VFooter:Z["a"],VList:tt["a"],VListItem:et["a"],VListItemContent:at["a"],VListItemGroup:rt["a"],VListItemTitle:at["b"],VSpacer:nt["a"]});var ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[a("v-card",{staticClass:"d-flex flex-column buysellcard",attrs:{"fill-height":""}},[a("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Selling bids ")]),a("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[a("v-list",{staticClass:"listouter1"},[a("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[a("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,r){return a("v-list-item",{key:r,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?a("span",[t._v(" (Your own)")]):t._e(),e.trader__virtual&&!e.trader__is_mm?a("span",[t._v(" (V"+t._s(e.trader)+")")]):t._e(),e.trader__is_mm?a("span",[t._v(" (MM) ")]):t._e()])],1)],1)})),1)])],1)],1),a("v-footer",{staticClass:"bottom_footer"},[a("v-btn",{attrs:{color:"green",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))]),a("v-spacer"),t.onMarketSize?a("v-btn",{staticClass:"ml-2",attrs:{color:"red"},on:{click:t.cancelBid}},[t._v(" Cancel ")]):t._e()],1)],1)],1)},ct=[],lt={components:{},props:["name","bids","type"],data:function(){return{}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(P["d"])(["player_id"])),Object(P["c"])(["get_cash","is_trader_on_market_size"])),{},{selectedSellingBid:function(){if(this.bids.length>0){var t=this.bids[0];if(t.trader!==this.player_id)return 0}return null},onMarketSize:function(){return this.is_trader_on_market_size(this.name,this.type)},cash_available:function(){return this.get_cash(this.name)},emptyBid:function(){return K()(this.selectedSellingBid)||this.cash_available<this.selectedBidValue.value},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Buy":"Buy 1 ".concat(this.name," for ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(P["b"])(["sendMessage"])),{},{cancelBid:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({action:"cancelBid",trader_id:t.player_id,market:t.name,type:t.type});case 2:case"end":return e.stop()}}),e)})))()},transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.cash_available>=t.selectedBidValue.value)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:case"end":return e.stop()}}),e)})))()}})},ut=lt,dt=(a("8267"),Object(B["a"])(ut,ot,ct,!1,null,"37e06c42",null)),mt=dt.exports;S()(dt,{VAppBar:W["a"],VBtn:Q["a"],VCard:j["a"],VCardText:T["b"],VCol:X["a"],VFooter:Z["a"],VList:tt["a"],VListItem:et["a"],VListItemContent:at["a"],VListItemGroup:rt["a"],VListItemTitle:at["b"],VSpacer:nt["a"]});var vt={props:["name","stocksData"],components:{BuyBidList:st,SellBidList:mt},name:"Market",data:function(){return{selectedSellingBid:null,bidValue:null,dialog:!1}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(P["c"])(["filteredBids","get_cash","get_num_shares","is_trader_on_market","is_trader_on_market_size","currentActiveOrder"])),{},{buy_order_button_text:function(){return this.onMarketSize("buy")?"Replace buy":"Buy order"},sell_order_button_text:function(){return this.onMarketSize("sell")?"Replace sell":"Sell order"},onMarket:function(){return this.is_trader_on_market(this.name)},current_num_shares:function(){return this.get_num_shares(this.name)},cash_available:function(){return this.get_cash(this.name)}},Object(P["d"])(["player_id"])),{},{buyingBids:function(){return this.filteredBids({market:this.name,type:"buy"})},sellingBids:function(){return this.filteredBids({market:this.name,type:"sell"})}}),watch:{dialog:function(t){t||(this.bidValue=null)}},methods:Object(v["a"])(Object(v["a"])({},Object(P["b"])(["sendMessage"])),{},{transactionAllowed:function(t){return!!this.bidValue&&("sell"===t?!(this.current_num_shares<1)&&!(this.onMarketSize("buy")&&parseFloat(this.bidValue)<=parseFloat(this.currentActiveOrder(this.name,"buy").value)):"buy"===t?!(this.bidValue>this.cash_available)&&!(this.onMarketSize("sell")&&parseFloat(this.bidValue)>=parseFloat(this.currentActiveOrder(this.name,"sell").value)):void 0)},onMarketSize:function(t){return this.is_trader_on_market_size(this.name,t)},putOrder:function(t){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.sendMessage({action:"addBid",type:t,value:e.bidValue,trader_id:e.player_id,market:e.name});case 2:e.bidValue=null,e.dialog=!1;case 4:case"end":return a.stop()}}),a)})))()},putBuyOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.bidValue<=t.cash_available)){e.next=3;break}return e.next=3,t.putOrder("buy");case 3:case"end":return e.stop()}}),e)})))()},putSellOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.putOrder("sell");case 3:case"end":return e.stop()}}),e)})))()}})},_t=vt,pt=(a("f4ed"),a("169a")),ft=a("ce7e"),ht=a("132d"),bt=a("1800"),gt=a("34c3"),kt=a("0fd9"),xt=a("e0c7"),yt=a("8654"),wt=a("71d9"),Ct=Object(B["a"])(_t,G,N,!1,null,null,null),Ot=Ct.exports;S()(Ct,{VBtn:Q["a"],VCard:j["a"],VCardActions:T["a"],VCardText:T["b"],VCardTitle:T["c"],VDialog:pt["a"],VDivider:ft["a"],VIcon:ht["a"],VList:tt["a"],VListItem:et["a"],VListItemAction:bt["a"],VListItemContent:at["a"],VListItemGroup:rt["a"],VListItemIcon:gt["a"],VListItemTitle:at["b"],VRow:kt["a"],VSheet:L["a"],VSpacer:nt["a"],VSubheader:xt["a"],VTextField:yt["a"],VToolbar:wt["a"]});var Bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"m-1",attrs:{color:"green",dark:"",width:"150"}},"v-btn",n,!1),r),[t._v(" Price history ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1),a("v-toolbar-title",[t._v("Price history for both markets")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")])],1)],1),a("v-card-text",[t.dialog?a("chart-module"):t._e()],1)],1)],1)},Vt=[],St=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticStyle:{height:"50vh"},attrs:{fluid:""}},[a("v-col",{attrs:{cols:"12"}},[a("highcharts",{ref:"priceGraph",staticClass:"hc",attrs:{options:t.chartOptions,constructorType:"stockChart"}})],1)],1)},jt=[],Tt=a("ea7f"),At=a.n(Tt),Et=a("37d8"),Mt=a.n(Et),It=a("4452");Mt()(At.a);var Rt={components:{highcharts:It["Chart"]},name:"ChartModule",data:function(){return{chartOptions:{time:{useUTC:!1},chart:{height:"100%",events:{load:function(t){t.target.reflow()}}},series:[{name:"A",type:"line",data:this.seriesA},{name:"B",type:"line",data:this.seriesB}]}}},watch:{priceHistory:function(){var t=this;this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},computed:Object(v["a"])(Object(v["a"])({},Object(P["d"])(["priceHistory"])),{},{seriesA:function(){return this.priceHistory.A},seriesB:function(){return this.priceHistory.B}}),mounted:function(){var t=this;this.chartOptions.series[0].data=this.seriesA,this.chartOptions.series[1].data=this.seriesB,this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},Pt=Rt,$t=a("a523"),Dt=Object(B["a"])(Pt,St,jt,!1,null,null,null),Lt=Dt.exports;S()(Dt,{VCol:X["a"],VContainer:$t["a"]});var Ft={components:{ChartModule:Lt},props:["marketName"],name:"TransactionPrices",data:function(){return{dialog:!1}}},zt=Ft,Gt=a("2a7f"),Nt=Object(B["a"])(zt,Bt,Vt,!1,null,null,null),Ut=Nt.exports;S()(Nt,{VBtn:Q["a"],VCard:j["a"],VCardText:T["b"],VDialog:pt["a"],VIcon:ht["a"],VSpacer:nt["a"],VToolbar:wt["a"],VToolbarItems:Gt["a"],VToolbarTitle:Gt["b"]});var Ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{scrollable:"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"m-1",attrs:{color:"red",dark:"",width:"150"}},"v-btn",n,!1),r),[t._v(" Instructions ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1),a("v-toolbar-title",[t._v("Instructions")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")])],1)],1),a("v-card-text",{domProps:{innerHTML:t._s(t.instructions)}})],1)],1)},qt=[],Kt={name:"Instructions",data:function(){return{instructions:document.getElementById("instructions").innerHTML,dialog:!1}}},Jt=Kt,Yt=Object(B["a"])(Jt,Ht,qt,!1,null,null,null),Wt=Yt.exports;S()(Yt,{VBtn:Q["a"],VCard:j["a"],VCardText:T["b"],VDialog:pt["a"],VIcon:ht["a"],VSpacer:nt["a"],VToolbar:wt["a"],VToolbarItems:Gt["a"],VToolbarTitle:Gt["b"]});var Qt={components:{Market:Ot,TransactionPrices:Ut,Timer:M,Info:z,Instructions:Wt},data:function(){return{cards:["Today","Yesterday"],innerList:h()(1,10),drawer:null}},computed:Object(v["a"])(Object(v["a"])({},Object(P["c"])(["stock_value_by_market","total_stock_value","total_in_market","total_in_both_markets"])),Object(P["d"])(["socket","total","market_A","market_B","merged"])),watch:{socket:function(t){t.isConnected&&this.sendMessage({app:"Mounted!"})},innerList:function(){var t=p()(this.innerList);this.$nextTick((function(){var e=document.getElementById("li_".concat(t));e.scrollIntoView({behavior:"smooth"})}))}},created:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$options.sockets.onopen=Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({name:"Trade_starts"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),t.$options.sockets.onmessage=function(t){return console.log(t)};case 2:case"end":return e.stop()}}),e)})))()},mounted:function(){this.socket.isConnected&&this.sendMessage({app:"Mounted!"})},methods:Object(v["a"])(Object(v["a"])({submit:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.endingGame();case 2:case"end":return e.stop()}}),e)})))()}},Object(P["b"])(["sendMessage","endingGame"])),{},{availableMoney:function(t){return this.merged?this.total.cash:"A"==t?this.market_A.cash:"B"==t?this.market_B.cash:void 0},scrollToEnd:function(){var t=this.$el.querySelector("#sellcontainer");t.scrollTop=t.scrollHeight}})},Xt=Qt,Zt=a("7496"),te=a("f6c4"),ee=Object(B["a"])(Xt,u,d,!1,null,null,null),ae=ee.exports;S()(ee,{VApp:Zt["a"],VAppBar:W["a"],VCol:X["a"],VMain:te["a"],VRow:kt["a"],VSpacer:nt["a"]});var re={components:{Home:ae},name:"App"},ne=re,ie=(a("5c0b"),Object(B["a"])(ne,c,l,!1,null,null,null)),se=ie.exports,oe=a("51f5"),ce=a.n(oe),le=a("93c6"),ue=a.n(le),de=a("9380"),me=a.n(de),ve=a("1a8c"),_e=a.n(ve),pe=a("006f"),fe=a.n(pe),he=a("2769"),be=a.n(he);a("a434");r["default"].use(P["a"]);var ge=new P["a"].Store({state:{round_number:window.round_number,merged:Boolean(window.merged),player_id:window.player_id,total:status.total,market_A:status.A,market_B:status.B,bids:[],priceHistory:window_history,socket:{isConnected:!1,message:"",reconnectError:!1}},getters:{is_trader_on_market:function(t){return function(e){var a=be()(t.bids,fe()({market:e,trader:t.player_id}));return _e()(a)}},is_trader_on_market_size:function(t,e){return function(t,a){return _e()(e.currentActiveOrder(t,a))}},currentActiveOrder:function(t){return function(e,a){var r=be()(t.bids,fe()({market:e,trader:t.player_id,type:a}));return r}},total_in_market:function(t,e){return function(a){var r=e.stock_value_by_market(a),n=t["market_".concat(a)].cash;return r+n}},total_in_both_markets:function(t,e){return function(){var t=e.total_in_market("A"),a=e.total_in_market("B");return t+a}},stock_value_by_market:function(t){return function(e){var a=t["market_".concat(e)],r=a.shares,n=a.price;return r*n}},cash_by_market:function(t){return function(e){var a=t["market_".concat(e)];return a.cash}},total_stock_value:function(t,e){return function(){var t=e.stock_value_by_market("A"),a=e.stock_value_by_market("B");return t+a}},get_cash:function(t){return function(e){return t.merged?t.total.cash:"A"===e?t.market_A.cash:"B"===e?t.market_B.cash:void 0}},get_num_shares:function(t){return function(e){return"A"===e?t.market_A.shares:"B"===e?t.market_B.shares:void 0}},filteredBids:function(t){return function(e){var a=e.market,r=e.type,n="buy"===r?"desc":"asc",i=me()(t.bids,fe()({market:a,type:r})),s=ue()(i,["value"],[n]);return s}}},mutations:{SET_BIDS:function(t,e){t.bids=e},UPDATE_STATUS:function(t,e){var a=e.total,r=e.A,n=e.B;t.total=a,t.market_A=r,t.market_B=n},UPDATE_PRICE:function(t,e){var a=e.market,r=e.price;"A"===a&&(t.market_A.price=r),"B"===a&&(t.market_B.price=r)},ADD_BID:function(t,e){e.value=parseFloat(e.value),t.bids.push(e)},REMOVE_BID:function(t,e){var a=ce()(t.bids,fe()({id:e}));t.bids.splice(a,1)},SOCKET_ONOPEN:function(t,e){r["default"].prototype.$socket=e.currentTarget,t.socket.isConnected=!0},SOCKET_ONCLOSE:function(t,e){t.socket.isConnected=!1},SOCKET_ONERROR:function(t,e){console.error(t,e)},SOCKET_ONMESSAGE:function(t,e){t.socket.message=e,console.debug("MESSAGE",e)},SOCKET_RECONNECT:function(t,e){console.info(t,e)},SOCKET_RECONNECT_ERROR:function(t){t.socket.reconnectError=!0}},actions:{endingGame:function(t){return Object(m["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.state,a=t.dispatch,e.next=3,a("sendMessage",{action:"gameEnds"});case 3:document.getElementById("form").submit();case 4:case"end":return e.stop()}}),e)})))()},getServerConfirmation:function(t,e){console.debug(e)},setBids:function(t,e){var a=e.bids,r=e.status,n=e.market,i=e.price;console.debug("JOPAJOPA JOPA",r,a),i&&t.commit("UPDATE_PRICE",{market:n,price:i}),r&&(t.commit("UPDATE_STATUS",r),t.commit("UPDATE_PRICE",r)),t.commit("SET_BIDS",a)},addBid:function(t,e){var a=e.bid,r=e.bid_to_remove;r&&t.commit("REMOVE_BID",r),t.commit("ADD_BID",a)},from_huey:function(t,e){console.debug("MESSAGE MOTHER FUCKER!!!",JSON.stringify(e))},removeBid:function(t,e){var a=e.bid_id,r=e.market,n=e.price;t.commit("REMOVE_BID",a),n&&t.commit("UPDATE_PRICE",{market:r,price:n})},remove_and_update:function(t,e){var a=e.bid_id,r=e.status;t.commit("REMOVE_BID",a),t.commit("UPDATE_STATUS",r),t.commit("UPDATE_PRICE",r)},sendMessage:function(){var t=Object(m["a"])(regeneratorRuntime.mark((function t(e,a){var n,i,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,i=n.market_A,s=n.market_B,o=n.player_id,t.next=4,r["default"].prototype.$socket.sendObj(Object(v["a"])({player_id:o,marketData:{market_A:i,market_B:s}},a));case 4:case"end":return t.stop()}}),t)})));function e(e,a){return t.apply(this,arguments)}return e}()},modules:{}}),ke=a("f309");r["default"].use(ke["a"]);var xe=new ke["a"]({icons:{iconfont:"mdi"}}),ye=a("8c4f");r["default"].use(ye["a"]);var we=[{path:"/priceChart",name:"priceChart",component:Lt},{path:"/marketA",name:"marketA",component:Ot,props:{marketName:"A"}},{path:"/marketB",name:"marketB",component:Ot,props:{marketName:"B"}}],Ce=new ye["a"]({routes:we}),Oe=Ce,Be=a("b408"),Ve=a.n(Be),Se=a("c986"),je=a.n(Se),Te="https:"===window.location.protocol?"wss":"ws",Ae=Te+"://"+window.location.host+window.socket_path;r["default"].use(Ve.a,Ae,{store:ge,format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),r["default"].config.productionTip=!1,r["default"].use(je.a,"vac"),new r["default"]({store:ge,vuetify:xe,router:Oe,render:function(t){return t(se)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";a("9c0c")},"5ca6":function(t,e,a){},"62bf":function(t,e,a){"use strict";a("5ca6")},"797b":function(t,e,a){},8267:function(t,e,a){"use strict";a("797b")},"9c0c":function(t,e,a){},f4ed:function(t,e,a){"use strict";a("488c")}});