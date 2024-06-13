(()=>{"use strict";const i=window.crypto||window.msCrypto,a=window.localStorage,c="hexo-blog-encrypt:#"+window.location.pathname,l=n("hexo-blog-encrypt的作者们都是大帅比!"),s=n("hexo-blog-encrypt是地表最强Hexo加密插件!"),d="<hbe-prefix></hbe-prefix>",e=document.getElementById("hexo-blog-encrypt"),r=e.dataset.wpm,y=e.dataset.whm;var t=e.getElementsByTagName("script").hbeData;const o=t.innerText,h=t.dataset.hmacdigest;function u(e){return new Uint8Array(e.match(/[\da-f]{2}/gi).map(e=>parseInt(e,16)))}function n(e){for(var t=e.length,n=0,r=new Array,o=0;o<t;){var a=e.codePointAt(o);a<128?(r[n++]=a,o++):127<a&&a<2048?(r[n++]=a>>6|192,r[n++]=63&a|128,o++):2047<a&&a<65536?(r[n++]=a>>12|224,r[n++]=a>>6&63|128,r[n++]=63&a|128,o++):(r[n++]=a>>18|240,r[n++]=a>>12&63|128,r[n++]=a>>6&63|128,r[n++]=63&a|128,o+=2)}return new Uint8Array(r)}async function m(e){var t=document.createElement("div");return t.innerHTML=e,t.querySelectorAll("script").forEach(async e=>{e.replaceWith(await async function(t){let n=document.createElement("script");return["type","text","src","crossorigin","defer","referrerpolicy"].forEach(e=>{t[e]&&(n[e]=t[e])}),n}(e))}),t}async function g(e,t,a){var n=u(o);return await i.subtle.decrypt({name:"AES-CBC",iv:t},e,n.buffer).then(async e=>{e=(new TextDecoder).decode(e);if(!e.startsWith(d))throw"Decode successfully but not start with KnownPrefix.";var t=document.createElement("button"),t=(t.textContent="Encrypt again",t.type="button",t.classList.add("hbe-button"),t.addEventListener("click",()=>{window.localStorage.removeItem(c),window.location.reload()}),document.getElementById("hexo-blog-encrypt").style.display="inline",document.getElementById("hexo-blog-encrypt").innerHTML="",document.getElementById("hexo-blog-encrypt").appendChild(await m(e)),document.getElementById("hexo-blog-encrypt").appendChild(t),document.querySelectorAll("img").forEach(e=>{e.getAttribute("data-src")&&!e.src&&(e.src=e.getAttribute("data-src"))}),window.NexT&&NexT.boot&&"function"==typeof NexT.boot.refresh&&NexT.boot.refresh(),document.getElementById("toc-div")),n=(t&&(t.style.display="inline"),document.getElementsByClassName("toc-div-class"));if(n&&0<n.length)for(var r=0;r<n.length;r++)n[r].style.display="inline";var o,t=new Event("hexo-blog-decrypt");return window.dispatchEvent(t),t=a,e=e,e=(new TextEncoder).encode(e),o=u(h),t=await i.subtle.verify({name:"HMAC",hash:"SHA-256"},t,o,e),console.log("Verification result: "+t),t||(alert(y),console.log(y+", got ",o," but proved wrong.")),t}).catch(e=>(alert(r),console.log(e),!1))}t=JSON.parse(a.getItem(c));if(t){console.log(`Password got from localStorage(${c}): `,t);const f=u(t.iv).buffer;var p=t.dk;const w=t.hmk;i.subtle.importKey("jwk",p,{name:"AES-CBC",length:256},!0,["decrypt"]).then(t=>{i.subtle.importKey("jwk",w,{name:"HMAC",hash:"SHA-256",length:256},!0,["verify"]).then(e=>{g(t,f,e).then(e=>{e||a.removeItem(c)})})})}e.addEventListener("keydown",async e=>{if(e.isComposing||"Enter"===e.key){e=document.getElementById("hbePass").value,t=(e=e,t=new TextEncoder,await i.subtle.importKey("raw",t.encode(e),{name:"PBKDF2"},!1,["deriveKey","deriveBits"]));e=t;const n=await i.subtle.deriveKey({name:"PBKDF2",hash:"SHA-256",salt:l.buffer,iterations:1024},e,{name:"HMAC",hash:"SHA-256",length:256},!0,["verify"]),r=(e=t,await i.subtle.deriveKey({name:"PBKDF2",hash:"SHA-256",salt:l.buffer,iterations:1024},e,{name:"AES-CBC",length:256},!0,["decrypt"])),o=(e=t,await i.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:s.buffer,iterations:512},e,128));g(r,o,n).then(e=>{console.log("Decrypt result: "+e),e&&i.subtle.exportKey("jwk",r).then(t=>{i.subtle.exportKey("jwk",n).then(e=>{e={dk:t,iv:function(e){if("object"!=typeof e||null===e||"number"!=typeof e.byteLength)throw new TypeError("Expected input to be an ArrayBuffer");for(var t,n=new Uint8Array(e),r="",o=0;o<n.length;o++)r+=1===(t=n[o].toString(16)).length?"0"+t:t;return r}(o),hmk:e};a.setItem(c,JSON.stringify(e))})})})}var t})})();