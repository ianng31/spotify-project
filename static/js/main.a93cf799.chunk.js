(this["webpackJsonpspotify-project"]=this["webpackJsonpspotify-project"]||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(1),c=n.n(r),i=n(15),o=n.n(i),s=(n(67),n(26),n(20)),l=n(52),u=n(51),d=n(47),f=n.n(d),h=n(25),b=(n(76),n(123)),p=n(107),y=n(122),m=n(121),g=n(53),x=n(124),k=(n(120),n(10)),v=(Object(k.a)((function(e){return{root:{width:200,height:100,padding:0,margin:e.spacing(1)},switchBase:{padding:1,"&$checked":{transform:"translateX(100px)",color:e.palette.common.white,"& + $track":{backgroundColor:"#52d869",opacity:1,border:"none"}},"&$focusVisible $thumb":{color:"#52d869",border:"6px solid #fff"}},thumb:{width:98,height:98},track:{borderRadius:13,border:"1px solid ".concat(e.palette.grey[400]),backgroundColor:e.palette.grey[50],opacity:1,transition:e.transitions.create(["background-color","border"])},checked:{},focusVisible:{}}}))((function(e){var t=e.classes,n=Object(g.a)(e,["classes"]);return Object(a.jsx)(x.a,Object(s.a)({focusVisibleClassName:t.focusVisible,disableRipple:!0,classes:{root:t.root,switchBase:t.switchBase,thumb:t.thumb,track:t.track,checked:t.checked}},n))})),n(37)),w=n(11),j=n.n(w),O=n(18),P=new(n(79))({clientId:"53dd95d5f7374e28a839828753099534",clientSecret:"b407566bddfc4a73b86b25fcc1e7962e",redirectUri:"http://localhost:3000/callback"}),D=Object(m.a)((function(){return{box:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center",height:"100vh",width:"100vw",textAlign:"center"},app:{width:"100%",height:"100%"},text:{marginBottom:"2%"},whiteText:{color:"white",marginBototm:"2%"},textTitle:{color:"#1db954",marginBottom:"2%"},button:{backgroundColor:"#1db954",color:"white",width:"70vw",Height:"50vh",fontSize:"4vw",borderRadius:"80px"}}})),T=function(){var e=f.a.get("spotifyAuthToken"),t=D(),n=c.a.useState({checkedB:!1}),r=Object(l.a)(n,2),i=r[0];r[1];return document.body.style.backgroundColor="white",e&&console.log("You are authorized with token: ".concat(e)),Object(a.jsx)("div",{className:t.app,children:e?Object(a.jsx)(u.b.Provider,{value:e,children:Object(a.jsxs)(b.a,{className:t.box,children:[Object(a.jsx)(p.a,{className:i.checkedB?t.whiteText:t.text,children:"Disclaimer: At the moment Spotify has not made an API for the daily mix playlists. For this feature to work please add all of your daily mix playlists to your library."}),Object(a.jsx)(y.a,{onClick:function(){return function(e){P.setAccessToken(e);var t=new Set,n=new Set;P.getMe().then((function(e){return{display_name:e.body.display_name,id:e.body.id}})).then(function(){var e=Object(O.a)(j.a.mark((function e(a){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(a.id),P.getUserPlaylists(a.id,{limit:50}).then(function(){var e=Object(O.a)(j.a.mark((function e(r){var c,i,o,s,l,u,d;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=function(){var e=Object(O.a)(j.a.mark((function e(){var t,n,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==(t=r.body.items.find((function(e){return"Discover Daily by Ian"===e.name})))){e.next=7;break}return e.next=4,P.createPlaylist("Discover Daily by Ian",{description:"My description",public:!0}).then((function(){return console.log("created playlist!")}));case 4:e.sent,e.next=18;break;case 7:return e.next=9,P.getPlaylist(t.id);case 9:return n=e.sent,a=n.body.tracks.items.map((function(e){return e.track.uri})),console.log(a),e.next=14,P.removeTracksFromPlaylist(t.id,a).then((function(){return console.log("successfully deleted")})).catch((function(e){return console.log("Something went wrong!",e)}));case 14:return e.next=16,P.getPlaylist(t.id);case 16:c=e.sent,console.log("should now be empty",c.body.tracks.total);case 18:console.log("done");case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=3,c();case 3:return e.next=5,P.getUserPlaylists(a.id,{limit:50});case 5:if(i=e.sent,o=i.body.items.find((function(e){return"Discover Daily by Ian"===e.name})),console.log("getting discoverDaily",void 0!==o),void 0===o){e.next=19;break}return s=function(){var e=Object(O.a)(j.a.mark((function e(){var a,r,c,i,o,s,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(v.a)(d),e.prev=1,a.s();case 3:if((r=a.n()).done){e.next=31;break}c=r.value,i=c.tracks.total,o=0;case 7:if(!(i-100>0)){e.next=20;break}return e.next=10,P.getPlaylist(c.id);case 10:return s=e.sent,e.next=13,P.getPlaylistTracks(s.body.id,{limit:100,offset:o});case 13:e.sent.body.items.forEach((function(e){null!=e&&null!=e.track&&(n.add(e.track.id),t.add(e.track.name))})),o+=100,i-=100,e.next=7;break;case 20:if(!(i>0)){e.next=29;break}return e.next=23,P.getPlaylist(c.id);case 23:return l=e.sent,e.next=26,P.getPlaylistTracks(l.body.id,{limit:i,offset:o});case 26:e.sent.body.items.forEach((function(e){null!=e&&null!=e.track&&(n.add(e.track.id),t.add(e.track.name))}));case 29:e.next=3;break;case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(1),a.e(e.t0);case 36:return e.prev=36,a.f(),e.finish(36);case 39:console.log("finished populating");case 40:case"end":return e.stop()}}),e,null,[[1,33,36,39]])})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(O.a)(j.a.mark((function e(){var a,r,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(v.a)(u),e.prev=1,c=j.a.mark((function e(){var a,c,i,s,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.value,e.next=3,P.getPlaylist(a.id);case 3:c=e.sent,i=c.body.tracks,s=i.items,l=[],s.forEach((function(e){n.has(e.track.id)||t.has(e.track.name)||l.push(e.track.uri)})),P.addTracksToPlaylist(o.id,l).then((function(e){console.log("Added tracks to playlist!")}),(function(e){console.log("Something went wrong!",e)}));case 9:case"end":return e.stop()}}),e)})),a.s();case 4:if((r=a.n()).done){e.next=8;break}return e.delegateYield(c(),"t0",6);case 6:e.next=4;break;case 8:e.next=13;break;case 10:e.prev=10,e.t1=e.catch(1),a.e(e.t1);case 13:return e.prev=13,a.f(),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[1,10,13,16]])})));return function(){return e.apply(this,arguments)}}(),u=r.body.items.filter((function(e){return e.name.startsWith("Daily Mix")})),d=(d=r.body.items.filter((function(e){return!e.name.startsWith("Daily Mix")}))).filter((function(e){return e.owner.id===a.id})),e.next=16,s().catch((function(e){return console.log(e)}));case 16:return console.log(n.size,t.size),e.next=19,l();case 19:console.log("pls");case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}(e)},className:t.button,children:"Generate Discover Daily"})]})}):Object(a.jsxs)(b.a,{className:t.box,children:[Object(a.jsx)(p.a,{className:t.textTitle,variant:"h1",children:"Discover Daily"}),Object(a.jsx)(p.a,{className:t.text,children:"Extract the songs you haven't heard of from the daily mix playlists every day for a complete playlist of just new songs."}),Object(a.jsx)(h.b,{redirectUri:"https://ianng31.github.io/spotify-project/callback",clientID:"53dd95d5f7374e28a839828753099534",scopes:[h.a.playlistReadPrivate,h.a.playlistModifyPublic,h.a.playlistReadCollaborative]})]})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,127)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(T,{})}),document.getElementById("root")),C()},67:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.a93cf799.chunk.js.map