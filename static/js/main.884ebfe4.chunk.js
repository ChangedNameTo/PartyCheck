(this["webpackJsonpparty-check"]=this["webpackJsonpparty-check"]||[]).push([[0],{145:function(e,t,n){e.exports=n(292)},150:function(e,t,n){},292:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(28),c=n.n(r),o=(n(150),n(126)),i=n(127),u=n(56),s=n(135),m=n(136),f=n(33),d=n(35),h=n(37),g=n(300),p=n(304),E=n(29),b=n(293),k=n(307),v=n(301),w=n(305),j=n(302),O=n(306),C=n(151),y=n(152).default;n(169).config();var F="57867123b1f24ca0a00384cdb92cc4c7";function S(e){var t=Object(a.useState)(""),n=Object(h.a)(t,2),r=n[0],c=n[1],o=function(e){e!==r&&c(e.value)};return l.a.createElement("div",null,l.a.createElement(g.a,{fluid:!0,action:{color:"green",labelPosition:"left",icon:"search",content:"Search",onClick:function(){return e.onClick(r)}},onChange:function(e,t){return o(t)},icon:"search",iconPosition:"left",name:"fflogslink",placeholder:"Enter your FFLogs Username"}))}function P(e){var t=Object(a.useState)(!1),n=Object(h.a)(t,2),r=n[0],c=n[1];return l.a.createElement(a.Fragment,null,l.a.createElement(p.a.Row,null,l.a.createElement(p.a.Cell,null,e.name),l.a.createElement(p.a.Cell,null,e.fights.length),l.a.createElement(p.a.Cell,null,e.percentage),l.a.createElement(p.a.Cell,null,l.a.createElement(b.a,{key:e.name,onClick:function(){c(!r)}},"Show Fights ",r?l.a.createElement(E.a,{name:"angle double up"}):l.a.createElement(E.a,{name:"angle double down"})))),function(){if(r)return e.fights.map((function(e,t){var n=new Date(e.realtime).toDateString();return l.a.createElement(a.Fragment,null,l.a.createElement(p.a.Row,null,l.a.createElement(p.a.Cell,{textAlign:"right"},n),l.a.createElement(p.a.Cell,null,e.zoneName),l.a.createElement(p.a.Cell,null,e.bossPercentage/100),l.a.createElement(p.a.Cell,null)))}))}())}var A=function(e){var t,n=(t=function(e){return e.flatMap((function(e){return e.friendlies.reduce((function(t,n){return Object(d.a)({},t,Object(f.a)({},n.name,{fights:n.fights.map((function(t){var n=t.id;return Object(d.a)({},e.fights[n-1],{realtime:e.start+e.fights[n-1].start_time})})),job:n.type}))}),{})})).reduce((function(e,t){return Object.keys(t).reduce((function(e,n){return Object(d.a)({},e,Object(f.a)({},n,(e[n]||[]).concat(t[n])))}),e)}),{})}(e),Object.keys(t).reduce((function(e,n){return Object(d.a)({},e,Object(f.a)({},n,t[n].flatMap((function(e){return e.fights.map((function(t){return Object(d.a)({},t,{job:e.job})}))}))))}),{}));return Object.keys(n).map((function(e){return{name:e,fights:n[e],percentage:n[e].reduce((function(e,t,n,a){return e+(isNaN(parseInt(t.bossPercentage))?0:parseInt(t.bossPercentage))/100/a.length}),0).toFixed(2),pulls:n[e].length}}))},x=function(e,t){return[].concat(e).sort((function(e,n){return e[t]-n[t]}))};function H(){return l.a.createElement(k.a,{inverted:!0,raised:!0,vertical:!0,style:{width:"100%",height:"60px","background-repeat":"repeat","background-attachment":"scroll","background-position":"0% 0%",position:"fixed",bottom:0}},l.a.createElement(v.a,{textAlign:"center"},l.a.createElement(b.a,{color:"black",content:"black",icon:!0,inverted:!0,labelPosition:"left",onClick:function(){return window.open("https://github.com/ChangedNameTo/PartyCheck","_blank")}},l.a.createElement(E.a,{name:"github"}),"View on Github"),l.a.createElement(b.a,{color:"blue",inverted:!0,icon:!0,labelPosition:"left",onClick:function(){return window.open("https://www.linkedin.com/in/will--mitch/","_blank")}},l.a.createElement(E.a,{name:"linkedin"}),"Find me on LinkedIn")))}function _(e){var t=e.reports,n=Object(a.useState)([]),r=Object(h.a)(n,2),c=r[0],o=r[1],i=Object(a.useState)("pulls"),u=Object(h.a)(i,2),s=u[0],m=u[1],f=Object(a.useState)("descending"),d=Object(h.a)(f,2),g=d[0],E=d[1];Object(a.useEffect)((function(){t&&t.data&&Promise.all(t.data.filter((function(e){return"Eden's Verse"===e.title||"Trials (Extreme)"===e.title})).map((function(e){return y.get("https://www.fflogs.com/v1/report/fights/".concat(e.id,"?api_key=").concat(F))}))).then((function(e){var t=e.flatMap((function(e){return e.data}));o(A(t))}))}),[t,o]);var b=function(e){s!==e?(m(e),E(g)):E("ascending"===g?"descending":"ascending")},O="ascending"===g?x(c,s):x(c,s).reverse();return l.a.createElement(v.a,null,l.a.createElement(p.a,{compact:!0,celled:!0,sortable:!0},l.a.createElement(p.a.Header,null,l.a.createElement(p.a.Row,null,l.a.createElement(p.a.HeaderCell,null,"Name/Job"),l.a.createElement(p.a.HeaderCell,{sorted:"pulls"===s?g:null,onClick:function(){return b("pulls")}},"# Pulls"),l.a.createElement(p.a.HeaderCell,{sorted:"percentage"===s?g:null,onClick:function(){return b("percentage")}},"Avg. Boss % (0 is a kill)"),l.a.createElement(p.a.HeaderCell,null,"Actions"))),l.a.createElement(p.a.Body,null,O.length>0&&null!==t?O.map((function(e){return l.a.createElement(P,{key:e.name,name:e.name,pulls:e.pulls,fights:e.fights,percentage:e.percentage})})):null!==t?l.a.createElement(p.a.Row,null,l.a.createElement(p.a.Cell,{colSpan:"4"},l.a.createElement(k.a,null,l.a.createElement(w.a,{active:!0},l.a.createElement(j.a,null))))):void 0)))}var G=function(e){Object(m.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={link:null,reports:null,fights:null,error:null},a.checkAndGo=a.checkAndGo.bind(Object(u.a)(a)),a}return Object(i.a)(n,[{key:"goHome",value:function(e){}},{key:"checkAndGo",value:function(e){var t=this;if(e){this.setState({link:e,error:!1});var n=C("https://www.fflogs.com/v1/reports/user/{username}?api_key={api_key}",{username:e,api_key:F});y.get(n).then((function(e){t.setState({reports:e})})).catch((function(e){t.setState({reports:null,error:!0})}))}}},{key:"displayTable",value:function(){return!this.state.error&&this.state.reports?l.a.createElement(_,{link:this.state.link,reports:this.state.reports}):this.state.error?l.a.createElement(v.a,null,l.a.createElement(O.a,{warning:!0},l.a.createElement(E.a,{name:"error"}),"You need to enter a valid FFLogs username.")):l.a.createElement(v.a,null,l.a.createElement(O.a,null,l.a.createElement(O.a.Header,null,"Welcome to PartyCheck!"),l.a.createElement("p",null,"Please enter a valid FFLogs username.")))}},{key:"render",value:function(){return l.a.createElement(a.Fragment,null,l.a.createElement("br",null),l.a.createElement(v.a,null,l.a.createElement(k.a,null,l.a.createElement("div",null,l.a.createElement(S,{onClick:this.checkAndGo})))),l.a.createElement("br",null),this.displayTable(),l.a.createElement("br",null))}}]),n}(l.a.Component);var N=function(){return l.a.createElement(a.Fragment,null,l.a.createElement(G,null),l.a.createElement(H,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(291);c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[145,1,2]]]);
//# sourceMappingURL=main.884ebfe4.chunk.js.map