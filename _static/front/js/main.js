(function(t){function e(e){for(var n,s,o=e[0],c=e[1],l=e[2],u=0,m=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&m.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={main:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/front/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0afd":function(t,e,a){"use strict";a("20c7")},"20c7":function(t,e,a){},"488c":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("a026"),r=(a("d3b7"),a("bc3a")),i=a.n(r),s={},o=i.a.create(s);o.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),o.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)})),Plugin.install=function(t,e){t.axios=o,window.axios=o,Object.defineProperties(t.prototype,{axios:{get:function(){return o}},$axios:{get:function(){return o}}})},n["default"].use(Plugin);Plugin;var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("home")],1)},l=[],d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-app-bar",{attrs:{app:"",height:"70"}},[t.merged?t._e():a("div",{staticClass:"d-flex"},[a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm",attrs:{elevation:"3",height:"64px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v("Market A value:")]),a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.stock_value_by_market("A"))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_A.cash)+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_market("A"))+" ")])])])],1),a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm",attrs:{elevation:"3",height:"64px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v("Market B value:")]),a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.stock_value_by_market("B"))+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.market_B.cash)+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_market("B"))+" ")])])])],1)],1),t.merged?a("div",[a("v-sheet",{staticClass:"d-flex pa-3 align-center rounded-sm",attrs:{elevation:"3",height:"64px"}},[a("div",{staticClass:"font-weight-bold mx-1 mr-3"},[t._v(" Total markets A and B value: ")]),a("v-sheet",{staticClass:"d-flex align-center rounded-l-xl pa-2 ",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In assets: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_stock_value())+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  "},[t._v(" In cash: "),a("div",{staticClass:"ml-1 pa-2 primary   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total.cash)+" ")])])]),a("v-sheet",{staticClass:"d-flex align-center ml-1 pa-2 rounded-r-xl",attrs:{outlined:""}},[a("div",{staticClass:"d-flex align-center  font-weight-bold "},[t._v(" Total: "),a("div",{staticClass:"ml-1 pa-2 red   white--text text-no-wrap rounded-pill"},[t._v(" $"+t._s(t.total_in_both_markets())+" ")])])])],1)],1):t._e(),a("v-spacer"),a("transaction-prices")],1),a("v-main",[a("v-row",{staticClass:"d-flex align-stretch",staticStyle:{height:"100%"},attrs:{"fill-height":""}},[a("v-col",{attrs:{cols:"6"}},[a("market",{attrs:{name:"A",stocksData:{q:t.market_A.shares,price:t.market_A.price,money:t.availableMoney("A")}}})],1),a("v-col",{attrs:{cols:"6"}},[a("market",{attrs:{name:"B",stocksData:{q:t.market_B.shares,price:t.market_B.price,money:t.availableMoney("B")}}})],1)],1)],1)],1)},u=[],m=a("1da1"),v=a("5530"),p=a("4416"),h=a.n(p),f=a("5a3a"),_=a.n(f),b=(a("96cf"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"v-100",staticStyle:{height:"90vh"},attrs:{"fill-height":""}},[a("v-toolbar",{attrs:{height:"80"}},[a("v-sheet",{staticClass:"mx-1 d-flex rounded-l-xl font-weight-bold  ",attrs:{outlined:""}},[a("v-list-item",[t._v("Market "+t._s(t.name)+".")])],1),a("v-sheet",{staticClass:"mx-0 d-flex ",attrs:{outlined:""}},[a("v-list-item",[a("v-list-item-content"),t._v(" Number of shares: ")],1),a("v-list-item-action",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.stocksData.q)+" ")])],1),a("v-sheet",{staticClass:"mx-1 rounded-r-xl ",attrs:{outlined:""}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Current price "+t._s(t.name)+": ")])],1),a("v-list-item-action",{staticClass:"font-weight-bold "},[t._v(" "+t._s(t.stocksData.price)+" ")])],1)],1),a("v-spacer"),a("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({attrs:{color:"green",disabled:t.onMarket}},"v-btn",r,!1),n),[t._v(" order "+t._s(t.name)+" ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5 grey lighten-2"},[t._v(" Put a selling/buying bid for Market "+t._s(t.name)+" ")]),a("v-card-text",[a("v-list",{attrs:{dense:""}},[a("v-subheader",[t._v("Info")]),a("v-list-item-group",{attrs:{color:"primary"}},[a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-account")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Money available")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(t._s(t.cash_available))])],1)],1)],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-cash-fast")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Stocks you own")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.stocksData.q))])],1)],1)],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-hand-coin")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Current stock price")])],1),a("v-list-item-action",[a("v-btn",{attrs:{icon:""}},[a("v-card",[t._v(" "+t._s(t.stocksData.price))])],1)],1)],1)],1)],1),a("v-text-field",{attrs:{label:"Price",solo:"",placeholder:"Price",type:"number",autofocus:"",hint:"insert a price and click the corresponding  button",required:""},model:{value:t.bidValue,callback:function(e){t.bidValue=e},expression:"bidValue"}})],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"orange",disabled:t.bidValue>t.cash_available},on:{click:t.putBuyOrder}},[t._v(" Buy order ")]),a("v-btn",{attrs:{color:"green",disabled:t.current_num_shares<1},on:{click:t.putSellOrder}},[t._v(" Sell order ")])],1)],1)],1)],1),a("v-row",{staticStyle:{height:"calc(100vh - 150px)","margin-top":"10px","margin-bottom":"10px"}},[a("buy-bid-list",{attrs:{name:t.name,bids:t.buyingBids}}),a("sell-bid-list",{attrs:{name:t.name,bids:t.sellingBids}})],1)],1)}),g=[],k=(a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[a("v-card",{staticClass:"d-flex flex-column buysellcard",staticStyle:{height:"95%"},attrs:{"fill-height":""}},[a("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Buying bids ")]),a("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[a("v-list",{staticClass:"listouter1"},[a("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[a("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,n){return a("v-list-item",{key:n,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?a("span",[t._v(" (Your own)")]):t._e()])],1)],1)})),1)])],1)],1),a("v-footer",{staticClass:"bottom_footer"},[a("v-btn",{attrs:{color:"red",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))])],1)],1)],1)}),x=[],y=a("2768"),w=a.n(y),C=(a("99af"),a("2f62")),B={components:{},name:"BuyBidList",props:["name","bids"],data:function(){return{selectedSellingBid:null}},computed:Object(v["a"])(Object(v["a"])({},Object(C["c"])(["get_num_shares"])),{},{current_num_shares:function(){return this.get_num_shares(this.name)},emptyBid:function(){return w()(this.selectedSellingBid)||0===this.current_num_shares},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Sell":"Sell 1 ".concat(this.name," for ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(C["b"])(["sendMessage"])),{},{transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:t.selectedSellingBid=null;case 4:case"end":return e.stop()}}),e)})))()}})},O=B,V=(a("e0ad"),a("2877")),S=a("6544"),j=a.n(S),T=a("40dc"),A=a("8336"),E=a("b0af"),I=a("99d9"),M=a("62ad"),R=a("553a"),$=a("8860"),D=a("da13"),P=a("5d23"),L=a("1baa"),N=Object(V["a"])(O,k,x,!1,null,"0942d40a",null),H=N.exports;j()(N,{VAppBar:T["a"],VBtn:A["a"],VCard:E["a"],VCardText:I["b"],VCol:M["a"],VFooter:R["a"],VList:$["a"],VListItem:D["a"],VListItemContent:P["a"],VListItemGroup:L["a"],VListItemTitle:P["b"]});var G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{staticClass:"mx-3 d-flex flex-column my-1",staticStyle:{height:"100%"}},[a("v-card",{staticClass:"d-flex flex-column buysellcard",attrs:{"fill-height":""}},[a("v-app-bar",{staticClass:"flex-grow-0",attrs:{dense:""}},[t._v(" Selling bids ")]),a("v-card-text",{staticClass:"overflow-y-auto",staticStyle:{"margin-bottom":"48px"}},[a("v-list",{staticClass:"listouter1"},[a("v-list-item-group",{staticClass:"listouter2",attrs:{"active-class":"border",color:"indigo"},model:{value:t.selectedSellingBid,callback:function(e){t.selectedSellingBid=e},expression:"selectedSellingBid"}},[a("div",{attrs:{id:"inner"}},t._l(t.bids,(function(e,n){return a("v-list-item",{key:n,attrs:{disabled:e.trader==t.$store.state.player_id,id:"li_"+e,dense:""}},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.value)+" "),e.trader==t.$store.state.player_id?a("span",[t._v(" (Your own)")]):t._e()])],1)],1)})),1)])],1)],1),a("v-footer",{staticClass:"bottom_footer"},[a("v-btn",{attrs:{color:"green",disabled:t.emptyBid},on:{click:t.transact}},[t._v(t._s(t.btntext))])],1)],1)],1)},U=[],q={components:{},props:["name","bids"],data:function(){return{selectedSellingBid:null}},computed:Object(v["a"])(Object(v["a"])({},Object(C["c"])(["get_cash"])),{},{cash_available:function(){return this.get_cash(this.name)},emptyBid:function(){return w()(this.selectedSellingBid)||this.cash_available<this.selectedBidValue.value},selectedBidValue:function(){return this.bids[this.selectedSellingBid]},btntext:function(){return this.emptyBid?"Buy":"Buy 1 ".concat(this.name," for ").concat(this.selectedBidValue.value)}}),methods:Object(v["a"])(Object(v["a"])({},Object(C["b"])(["sendMessage"])),{},{transact:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.cash_available>=t.selectedBidValue.value)){e.next=3;break}return e.next=3,t.sendMessage({action:"takeBid",bid_id:t.selectedBidValue.id});case 3:t.selectedSellingBid=null;case 4:case"end":return e.stop()}}),e)})))()}})},K=q,Y=(a("0afd"),Object(V["a"])(K,G,U,!1,null,"532b1dd4",null)),F=Y.exports;j()(Y,{VAppBar:T["a"],VBtn:A["a"],VCard:E["a"],VCardText:I["b"],VCol:M["a"],VFooter:R["a"],VList:$["a"],VListItem:D["a"],VListItemContent:P["a"],VListItemGroup:L["a"],VListItemTitle:P["b"]});var z={props:["name","stocksData"],components:{BuyBidList:H,SellBidList:F},name:"Market",data:function(){return{selectedSellingBid:null,bidValue:null,dialog:!1}},computed:Object(v["a"])(Object(v["a"])(Object(v["a"])({},Object(C["c"])(["filteredBids","get_cash","get_num_shares","is_trader_on_market"])),{},{onMarket:function(){return this.is_trader_on_market(this.name)},current_num_shares:function(){return this.get_num_shares(this.name)},cash_available:function(){return this.get_cash(this.name)}},Object(C["d"])(["player_id"])),{},{buyingBids:function(){return this.filteredBids({market:this.name,type:"buy"})},sellingBids:function(){return this.filteredBids({market:this.name,type:"sell"})}}),methods:Object(v["a"])(Object(v["a"])({},Object(C["b"])(["sendMessage"])),{},{putOrder:function(t){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.sendMessage({action:"addBid",type:t,value:e.bidValue,trader_id:e.player_id,market:e.name});case 2:e.bidValue=null,e.dialog=!1;case 4:case"end":return a.stop()}}),a)})))()},putBuyOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.bidValue<t.cash_available)){e.next=3;break}return e.next=3,t.putOrder("buy");case 3:case"end":return e.stop()}}),e)})))()},putSellOrder:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.current_num_shares>0)){e.next=3;break}return e.next=3,t.putOrder("sell");case 3:case"end":return e.stop()}}),e)})))()}})},J=z,W=(a("f4ed"),a("169a")),Q=a("ce7e"),X=a("132d"),Z=a("1800"),tt=a("34c3"),et=a("0fd9"),at=a("8dd9"),nt=a("2fa4"),rt=a("e0c7"),it=a("8654"),st=a("71d9"),ot=Object(V["a"])(J,b,g,!1,null,null,null),ct=ot.exports;j()(ot,{VBtn:A["a"],VCard:E["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VDialog:W["a"],VDivider:Q["a"],VIcon:X["a"],VList:$["a"],VListItem:D["a"],VListItemAction:Z["a"],VListItemContent:P["a"],VListItemGroup:L["a"],VListItemIcon:tt["a"],VListItemTitle:P["b"],VRow:et["a"],VSheet:at["a"],VSpacer:nt["a"],VSubheader:rt["a"],VTextField:it["a"],VToolbar:st["a"]});var lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({attrs:{color:"green",dark:""}},"v-btn",r,!1),n),[t._v(" Price history ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1),a("v-toolbar-title",[t._v("Price history for both markets")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")])],1)],1),a("v-card-text",[t.dialog?a("chart-module"):t._e()],1)],1)],1)},dt=[],ut=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticStyle:{height:"50vh"},attrs:{fluid:""}},[a("v-col",{attrs:{cols:"12"}},[a("highcharts",{ref:"priceGraph",staticClass:"hc",attrs:{options:t.chartOptions,constructorType:"stockChart"}})],1)],1)},mt=[],vt=a("ea7f"),pt=a.n(vt),ht=a("37d8"),ft=a.n(ht),_t=a("4452");ft()(pt.a);var bt={components:{highcharts:_t["Chart"]},name:"ChartModule",data:function(){return{chartOptions:{time:{useUTC:!1},chart:{height:"100%",events:{load:function(t){t.target.reflow()}}},series:[{name:"A",type:"spline",data:this.seriesA},{name:"B",type:"spline",data:this.seriesB}]}}},watch:{priceHistory:function(){var t=this;console.debug("SOME THINGSNAGES???"),this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},computed:Object(v["a"])(Object(v["a"])({},Object(C["d"])(["priceHistory"])),{},{seriesA:function(){return this.priceHistory.A},seriesB:function(){return this.priceHistory.B}}),mounted:function(){var t=this;this.chartOptions.series[0].data=this.seriesA,this.chartOptions.series[1].data=this.seriesB,this.$nextTick((function(){t.$refs.priceGraph.chart.setSize(window.inneWidth-100,window.innerHeight-150),t.$refs.priceGraph.chart.reflow()}))}},gt=bt,kt=a("a523"),xt=Object(V["a"])(gt,ut,mt,!1,null,null,null),yt=xt.exports;j()(xt,{VCol:M["a"],VContainer:kt["a"]});var wt={components:{ChartModule:yt},props:["marketName"],name:"TransactionPrices",data:function(){return{dialog:!1}}},Ct=wt,Bt=a("2a7f"),Ot=Object(V["a"])(Ct,lt,dt,!1,null,null,null),Vt=Ot.exports;j()(Ot,{VBtn:A["a"],VCard:E["a"],VCardText:I["b"],VDialog:W["a"],VIcon:X["a"],VSpacer:nt["a"],VToolbar:st["a"],VToolbarItems:Bt["a"],VToolbarTitle:Bt["b"]});var St={components:{Market:ct,TransactionPrices:Vt},data:function(){return{cards:["Today","Yesterday"],innerList:_()(1,10),drawer:null}},computed:Object(v["a"])(Object(v["a"])({},Object(C["c"])(["stock_value_by_market","total_stock_value","total_in_market","total_in_both_markets"])),Object(C["d"])(["socket","total","market_A","market_B","merged"])),watch:{socket:function(t){console.debug(t),t.isConnected&&this.sendMessage({app:"Mounted!"})},innerList:function(){var t=h()(this.innerList);this.$nextTick((function(){var e=document.getElementById("li_".concat(t));e.scrollIntoView({behavior:"smooth"})}))}},created:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$options.sockets.onopen=Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.sendMessage({name:"Trade_starts"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),t.$options.sockets.onmessage=function(t){return console.log(t)};case 2:case"end":return e.stop()}}),e)})))()},mounted:function(){this.socket.isConnected&&this.sendMessage({app:"Mounted!"})},methods:Object(v["a"])(Object(v["a"])({},Object(C["b"])(["sendMessage"])),{},{availableMoney:function(t){return this.merged?this.total.cash:"A"==t?this.market_A.cash:"B"==t?this.market_B.cash:void 0},scrollToEnd:function(){var t=this.$el.querySelector("#sellcontainer");t.scrollTop=t.scrollHeight}})},jt=St,Tt=a("7496"),At=a("f6c4"),Et=Object(V["a"])(jt,d,u,!1,null,null,null),It=Et.exports;j()(Et,{VApp:Tt["a"],VAppBar:T["a"],VCol:M["a"],VMain:At["a"],VRow:et["a"],VSheet:at["a"],VSpacer:nt["a"]});var Mt={components:{Home:It},name:"App"},Rt=Mt,$t=(a("5c0b"),Object(V["a"])(Rt,c,l,!1,null,null,null)),Dt=$t.exports,Pt=a("51f5"),Lt=a.n(Pt),Nt=a("93c6"),Ht=a.n(Nt),Gt=a("9380"),Ut=a.n(Gt),qt=a("1a8c"),Kt=a.n(qt),Yt=a("006f"),Ft=a.n(Yt),zt=a("2769"),Jt=a.n(zt);a("a434");n["default"].use(C["a"]);var Wt=new C["a"].Store({state:{merged:Boolean(window.merged),player_id:window.player_id,total:status.total,market_A:status.A,market_B:status.B,bids:[],priceHistory:window_history,socket:{isConnected:!1,message:"",reconnectError:!1}},getters:{is_trader_on_market:function(t){return function(e){var a=Jt()(t.bids,Ft()({market:e,trader:t.player_id}));return Kt()(a)}},total_in_market:function(t,e){return function(a){var n=e.stock_value_by_market(a),r=t["market_".concat(a)].cash;return n+r}},total_in_both_markets:function(t,e){return function(){var t=e.total_in_market("A"),a=e.total_in_market("B");return t+a}},stock_value_by_market:function(t){return function(e){var a=t["market_".concat(e)],n=a.shares,r=a.price;return n*r}},cash_by_market:function(t){return function(e){var a=t["market_".concat(e)];return a.cash}},total_stock_value:function(t,e){return function(){var t=e.stock_value_by_market("A"),a=e.stock_value_by_market("B");return t+a}},get_cash:function(t){return function(e){return t.merged?t.total.cash:"A"===e?t.market_A.cash:"B"===e?t.market_B.cash:void 0}},get_num_shares:function(t){return function(e){return"A"===e?t.market_A.shares:"B"===e?t.market_B.shares:void 0}},filteredBids:function(t){return function(e){var a=e.market,n=e.type,r="buy"===n?"desc":"asc",i=Ut()(t.bids,Ft()({market:a,type:n})),s=Ht()(i,["value"],[r]);return s}}},mutations:{ADD_HISTORY:function(t,e){var a=e.market,n=e.price,r=e.history_time;t.priceHistory[a].push([r,n])},SET_BIDS:function(t,e){t.bids=e},UPDATE_STATUS:function(t,e){var a=e.total,n=e.A,r=e.B;t.total=a,t.market_A=n,t.market_B=r},UPDATE_PRICE:function(t,e){var a=e.market,n=e.price;"A"===a&&(t.market_A.price=n),"B"===a&&(t.market_B.price=n)},ADD_BID:function(t,e){t.bids.push(e)},REMOVE_BID:function(t,e){var a=Lt()(t.bids,Ft()({id:e}));t.bids.splice(a,1)},SOCKET_ONOPEN:function(t,e){n["default"].prototype.$socket=e.currentTarget,t.socket.isConnected=!0},SOCKET_ONCLOSE:function(t,e){t.socket.isConnected=!1},SOCKET_ONERROR:function(t,e){console.error(t,e)},SOCKET_ONMESSAGE:function(t,e){t.socket.message=e,console.debug("MESSAGE",e)},SOCKET_RECONNECT:function(t,e){console.info(t,e)},SOCKET_RECONNECT_ERROR:function(t){t.socket.reconnectError=!0}},actions:{getServerConfirmation:function(t,e){console.debug(e)},setBids:function(t,e){console.debug(e);var a=e.bids;t.commit("SET_BIDS",a)},addBid:function(t,e){var a=e.bid;t.commit("ADD_BID",a)},removeBid:function(t,e){var a=e.bid_id,n=e.market,r=e.history_time,i=e.price;t.commit("REMOVE_BID",a),t.commit("UPDATE_PRICE",{market:n,price:i}),t.commit("ADD_HISTORY",{market:n,history_time:r,price:i})},remove_and_update:function(t,e){var a=e.bid_id,n=e.status,r=e.market,i=e.history_time,s=e.price;t.commit("REMOVE_BID",a),t.commit("UPDATE_STATUS",n),t.commit("UPDATE_PRICE",n),t.commit("ADD_HISTORY",{market:r,history_time:i,price:s})},sendMessage:function(){var t=Object(m["a"])(regeneratorRuntime.mark((function t(e,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n["default"].prototype.$socket.sendObj(Object(v["a"])({},a));case 2:case"end":return t.stop()}}),t)})));function e(e,a){return t.apply(this,arguments)}return e}()},modules:{}}),Qt=a("f309");n["default"].use(Qt["a"]);var Xt=new Qt["a"]({icons:{iconfont:"mdi"}}),Zt=a("8c4f");n["default"].use(Zt["a"]);var te=[{path:"/priceChart",name:"priceChart",component:yt},{path:"/marketA",name:"marketA",component:ct,props:{marketName:"A"}},{path:"/marketB",name:"marketB",component:ct,props:{marketName:"B"}}],ee=new Zt["a"]({routes:te}),ae=ee,ne=a("b408"),re=a.n(ne),ie="https:"===window.location.protocol?"wss":"ws",se=ie+"://"+window.location.host+window.socket_path;n["default"].use(re.a,se,{store:Wt,format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),n["default"].config.productionTip=!1,new n["default"]({store:Wt,vuetify:Xt,router:ae,render:function(t){return t(Dt)}}).$mount("#app")},"58a2":function(t,e,a){},"5c0b":function(t,e,a){"use strict";a("9c0c")},"9c0c":function(t,e,a){},e0ad:function(t,e,a){"use strict";a("58a2")},f4ed:function(t,e,a){"use strict";a("488c")}});