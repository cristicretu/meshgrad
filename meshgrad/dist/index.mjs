var c=class{constructor(t){this.seed=t%2147483647,this.seed<=0&&(this.seed+=2147483646)}next(){return this.seed=this.seed*16807%2147483647}nextFloat(){return(this.next()-1)/2147483646}},f=360,I=100,M=30,_=64,h=1.75,p=66,R=1.4,b=100,N=74,l="55%",T="0px",E="ellipse",S=new c(1337),G=()=>Math.round(S.nextFloat()*f);var m=(n,t,e)=>Math.round(t/e*(n*100)%I),L=n=>{if(!!n){n=n.replace(/#/g,""),n.length===3&&(n=n.split("").map(function(d){return d+d}).join(""));var t=/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(n);if(!!t){var e=parseInt(t[1],16),s=parseInt(t[2],16),r=parseInt(t[3],16);e/=255,s/=255,r/=255;var a=Math.max(e,s,r),u=Math.min(e,s,r),o=(a+u)/2;if(a==u)o=0;else{var i=a-u;switch(a){case e:o=(s-r)/i+(s<r?6:0);break;case s:o=(r-e)/i+2;break;case r:o=(e-s)/i+4;break}o/=6}return o=Math.round(360*o),o}}},H=(n,t,e)=>Array.from({length:n},(s,r)=>{if(r===0)return`hsl(${t}, ${b}%, ${N}%)`;let a=Math.round(e.nextFloat()*M*(1-2*(r%2))),u=Math.round(e.nextFloat()*h*(1-2*(r%2)));return r<n/R?`hsl(${(t+a)%f}, ${b}%, ${_-u}%)`:`hsl(${(t+a+180)%f}, ${b}%, ${p-u}%)`}),x=(n,t,e,s=l,r=T,a=E,u)=>{if(u&&u.length){let o=d=>/^#([0-9A-F]{3}){1,2}$/i.test(d),i=u.filter(o);return i.map((d,g)=>{let $=(g+1)/i.length*100;return`radial-gradient(${a} at 50% 50%, ${d} ${r}, transparent ${$}%)`})}else return Array.from({length:n},(o,i)=>{let d=m(i,e.next(),n),g=m(i*10,e.next(),n);return`radial-gradient(${a} at ${d}% ${g}%, ${t[i]} ${r}, transparent ${s})`})},A=(n,t,e,s)=>{let r=e?new c(e):S,a=L(t),u=a!==void 0?a:G(),o=H(n,u,r),i=x(n,o,r,l,T,E,s||void 0);return console.log(o,i),[o[0],i.join(",")]},v=(n,t,e,s)=>{let[r,a]=A(n,t||void 0,e||void 0,s||void 0);return{backgroundColor:r,backgroundImage:a}},F=(n,t,e,s)=>{let[r,a]=A(n,t,e||void 0,s||void 0);return{backgroundColor:r,backgroundImage:a}};export{v as generateJSXMeshGradient,F as generateMeshGradient};
