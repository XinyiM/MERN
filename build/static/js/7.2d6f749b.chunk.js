(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{42:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(49);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(47),c=a.n(n),r=a(48),l=a(10),o=a(0),s=a.n(o),i=a(1),u=a(42),m=(a(65),a(44)),p=a(58),d=(a(66),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:n});new window.google.maps.Marker({position:a,map:e})}),[a,n]),s.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),E=a(11),f=a(50),h=a(15),v=a(51),b=(a(67),function(e){var t=Object(o.useState)(!1),a=Object(l.a)(t,2),n=a[0],i=a[1],b=Object(o.useState)(!1),O=Object(l.a)(b,2),g=O[0],k=O[1],w=Object(v.a)(),N=w.isLoading,j=w.error,C=w.sendRequest,_=w.clearError,y=function(){var t=Object(r.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return k(!1),t.prev=1,t.next=4,C("https://acad-mern-application.herokuapp.com/api"+"/places/".concat(e.id),"DELETE",null,{authorization:"BEAR "+x.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}(),D=function(){return i(!1)},x=Object(o.useContext)(E.a);return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.a,{error:j,onClear:_}),s.a.createElement(p.a,{show:n,onCancel:D,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:s.a.createElement(m.a,{onClick:D},"CLOSE")},s.a.createElement("div",{className:"map-container"},s.a.createElement(d,{center:e.coordinates,zoom:16}))),s.a.createElement(p.a,{show:g,header:"Are you sure?",footerClass:"place-item__modal_actions",footer:s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{inverse:!0,onClick:function(){return k(!1)}}," CANCEL"),s.a.createElement(m.a,{danger:!0,onClick:y}," DELETE"))},s.a.createElement("p",null," Do you want to proceed and delete the place?"),s.a.createElement("p",null," Please note that this cannot be undone.")),s.a.createElement("li",{className:"place-item"},s.a.createElement(u.a,{className:"place-item__content"},N&&s.a.createElement(h.a,{asOverlay:!0}),s.a.createElement("div",{className:"place-item__image"},s.a.createElement("img",{src:"".concat("https://acad-mern-application.herokuapp.com/","/").concat(e.image),alt:e.title})),s.a.createElement("div",{className:"place-item__info"},s.a.createElement("h2",null," ",e.title),s.a.createElement("h3",null," ",e.address),s.a.createElement("p",null," ",e.description)),s.a.createElement("div",{className:"place-item__actions"},s.a.createElement(m.a,{inverse:!0,onClick:function(){return i(!0)}}," VIEW ON MAP"),x.userId===e.creatorId&&s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{to:"/places/".concat(e.id)}," EDIT"),s.a.createElement(m.a,{danger:!0,onClick:function(){return k(!0)}}," DELETE"))))))}),O=function(e){return 0===e.items.length?s.a.createElement("div",{className:"place-list center"},s.a.createElement(u.a,null,s.a.createElement("h2",null," No places found. Maybe create one?"),s.a.createElement(m.a,{to:"/places/new/"},"Share Place"))):s.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return s.a.createElement(b,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))};t.default=function(){var e=Object(v.a)(),t=e.isLoading,a=e.error,n=e.sendRequest,u=e.clearError,m=Object(o.useState)([]),p=Object(l.a)(m,2),d=p[0],E=p[1],b=Object(i.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("".concat("https://acad-mern-application.herokuapp.com/api","/places/user/").concat(b));case 3:t=e.sent,E(t.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[n,b]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.a,{error:a,asOverlay:!0,onClear:u}),t&&s.a.createElement("div",{className:"center"},s.a.createElement(h.a,null)),!t&&d&&s.a.createElement(O,{items:d,onDeletePlace:function(e){E((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.2d6f749b.chunk.js.map