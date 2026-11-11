(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ra="170",ul=0,io=1,dl=2,Mc=1,Sc=2,cn=3,An=0,Re=1,Ie=2,Tn=0,mi=1,so=2,ro=3,ao=4,fl=5,kn=100,pl=101,ml=102,gl=103,vl=104,_l=200,xl=201,yl=202,Ml=203,Fr=204,Br=205,Sl=206,El=207,wl=208,bl=209,Tl=210,Al=211,Rl=212,Cl=213,Pl=214,zr=0,kr=1,Vr=2,xi=3,Hr=4,Gr=5,Wr=6,Xr=7,Ca=0,Ll=1,Dl=2,un=0,Il=1,Ul=2,Nl=3,Ol=4,Fl=5,Bl=6,zl=7,Ec=300,yi=301,Mi=302,qr=303,Yr=304,qs=306,$r=1e3,Hn=1001,Zr=1002,Ye=1003,kl=1004,ss=1005,Je=1006,Qs=1007,Gn=1008,pn=1009,wc=1010,bc=1011,$i=1012,Pa=1013,Wn=1014,ln=1015,ji=1016,La=1017,Da=1018,Si=1020,Tc=35902,Ac=1021,Rc=1022,qe=1023,Cc=1024,Pc=1025,gi=1026,Ei=1027,Lc=1028,Ia=1029,Dc=1030,Ua=1031,Na=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,jr=35840,Kr=35841,Jr=35842,Qr=35843,ta=36196,ea=37492,na=37496,ia=37808,sa=37809,ra=37810,aa=37811,oa=37812,ca=37813,la=37814,ha=37815,ua=37816,da=37817,fa=37818,pa=37819,ma=37820,ga=37821,Os=36492,va=36494,_a=36495,Ic=36283,xa=36284,ya=36285,Ma=36286,Vl=3200,Hl=3201,Oa=0,Gl=1,bn="",Fe="srgb",Ai="srgb-linear",Ys="linear",Zt="srgb",Zn=7680,oo=519,Wl=512,Xl=513,ql=514,Uc=515,Yl=516,$l=517,Zl=518,jl=519,Sa=35044,co="300 es",hn=2e3,Bs=2001;class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lo=1234567;const Gi=Math.PI/180,Zi=180/Math.PI;function dn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ye[s&255]+ye[s>>8&255]+ye[s>>16&255]+ye[s>>24&255]+"-"+ye[t&255]+ye[t>>8&255]+"-"+ye[t>>16&15|64]+ye[t>>24&255]+"-"+ye[e&63|128]+ye[e>>8&255]+"-"+ye[e>>16&255]+ye[e>>24&255]+ye[n&255]+ye[n>>8&255]+ye[n>>16&255]+ye[n>>24&255]).toLowerCase()}function ge(s,t,e){return Math.max(t,Math.min(e,s))}function Fa(s,t){return(s%t+t)%t}function Kl(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Jl(s,t,e){return s!==t?(e-s)/(t-s):0}function Wi(s,t,e){return(1-e)*s+e*t}function Ql(s,t,e,n){return Wi(s,t,1-Math.exp(-e*n))}function th(s,t=1){return t-Math.abs(Fa(s,t*2)-t)}function eh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function nh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function ih(s,t){return s+Math.floor(Math.random()*(t-s+1))}function sh(s,t){return s+Math.random()*(t-s)}function rh(s){return s*(.5-Math.random())}function ah(s){s!==void 0&&(lo=s);let t=lo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function oh(s){return s*Gi}function ch(s){return s*Zi}function lh(s){return(s&s-1)===0&&s!==0}function hh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function uh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function dh(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),f=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*u,c*h,c*f,o*l);break;case"YZY":s.set(c*f,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*f,o*u,o*l);break;case"XZX":s.set(o*u,c*g,c*p,o*l);break;case"YXY":s.set(c*p,o*u,c*g,o*l);break;case"ZYZ":s.set(c*g,c*p,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Yt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const le={DEG2RAD:Gi,RAD2DEG:Zi,generateUUID:dn,clamp:ge,euclideanModulo:Fa,mapLinear:Kl,inverseLerp:Jl,lerp:Wi,damp:Ql,pingpong:th,smoothstep:eh,smootherstep:nh,randInt:ih,randFloat:sh,randFloatSpread:rh,seededRandom:ah,degToRad:oh,radToDeg:ch,isPowerOfTwo:lh,ceilPowerOfTwo:hh,floorPowerOfTwo:uh,setQuaternionFromProperEuler:dh,normalize:Yt,denormalize:Xe};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Lt{constructor(t,e,n,i,r,a,o,c,l){Lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l)}set(t,e,n,i,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],v=i[0],m=i[3],d=i[6],E=i[1],T=i[4],M=i[7],N=i[2],A=i[5],R=i[8];return r[0]=a*v+o*E+c*N,r[3]=a*m+o*T+c*A,r[6]=a*d+o*M+c*R,r[1]=l*v+u*E+h*N,r[4]=l*m+u*T+h*A,r[7]=l*d+u*M+h*R,r[2]=f*v+p*E+g*N,r[5]=f*m+p*T+g*A,r[8]=f*d+p*M+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,f=o*c-u*r,p=l*r-a*c,g=e*h+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=h*v,t[1]=(i*l-u*n)*v,t[2]=(o*n-i*a)*v,t[3]=f*v,t[4]=(u*e-i*c)*v,t[5]=(i*r-o*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(tr.makeScale(t,e)),this}rotate(t){return this.premultiply(tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const tr=new Lt;function Nc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function zs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function fh(){const s=zs("canvas");return s.style.display="block",s}const ho={};function Vi(s){s in ho||(ho[s]=!0,console.warn(s))}function ph(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function mh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function gh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ht={enabled:!0,workingColorSpace:Ai,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Zt&&(s.r=fn(s.r),s.g=fn(s.g),s.b=fn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Zt&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bn?Ys:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function fn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function vi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const uo=[.64,.33,.3,.6,.15,.06],fo=[.2126,.7152,.0722],po=[.3127,.329],mo=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),go=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ht.define({[Ai]:{primaries:uo,whitePoint:po,transfer:Ys,toXYZ:mo,fromXYZ:go,luminanceCoefficients:fo,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:uo,whitePoint:po,transfer:Zt,toXYZ:mo,fromXYZ:go,luminanceCoefficients:fo,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}});let jn;class vh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{jn===void 0&&(jn=zs("canvas")),jn.width=t.width,jn.height=t.height;const n=jn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=jn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=zs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=fn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(fn(e[n]/255)*255):e[n]=fn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _h=0;class Oc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(er(i[a].image)):r.push(er(i[a]))}else r=er(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function er(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?vh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xh=0;class be extends Ri{constructor(t=be.DEFAULT_IMAGE,e=be.DEFAULT_MAPPING,n=Hn,i=Hn,r=Je,a=Gn,o=qe,c=pn,l=be.DEFAULT_ANISOTROPY,u=bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=dn(),this.name="",this.source=new Oc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $r:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case Zr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $r:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case Zr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}be.DEFAULT_IMAGE=null;be.DEFAULT_MAPPING=Ec;be.DEFAULT_ANISOTROPY=1;class Kt{constructor(t=0,e=0,n=0,i=1){Kt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],v=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,M=(p+1)/2,N=(d+1)/2,A=(u+f)/4,R=(h+v)/4,I=(g+m)/4;return T>M&&T>N?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=A/n,r=R/n):M>N?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=A/i,r=I/i):N<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(N),n=R/r,i=I/r),this.set(n,i,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-v)/E,this.z=(f-u)/E,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yh extends Ri{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Kt(0,0,t,e),this.scissorTest=!1,this.viewport=new Kt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new be(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Oc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends yh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Fc extends be{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mh extends be{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ki{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(h!==v||c!==f||l!==p||u!==g){let m=1-o;const d=c*f+l*p+u*g+h*v,E=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){const N=Math.sqrt(T),A=Math.atan2(N,d*E);m=Math.sin(m*A)/N,o=Math.sin(o*A)/N}const M=o*E;if(c=c*m+f*M,l=l*m+p*M,u=u*m+g*M,h=h*m+v*M,m===1-o){const N=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=N,l*=N,u*=N,h*=N}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*p-l*f,t[e+1]=c*g+u*f+l*h-o*p,t[e+2]=l*g+u*p+o*f-c*h,t[e+3]=u*g-o*h-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),f=c(n/2),p=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,n=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),u=2*(o*e-r*i),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=i+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nr=new w,vo=new Ki;class Ji{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(r,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rs.copy(n.boundingBox)),rs.applyMatrix4(t.matrixWorld),this.union(rs)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Di),as.subVectors(this.max,Di),Kn.subVectors(t.a,Di),Jn.subVectors(t.b,Di),Qn.subVectors(t.c,Di),vn.subVectors(Jn,Kn),_n.subVectors(Qn,Jn),Dn.subVectors(Kn,Qn);let e=[0,-vn.z,vn.y,0,-_n.z,_n.y,0,-Dn.z,Dn.y,vn.z,0,-vn.x,_n.z,0,-_n.x,Dn.z,0,-Dn.x,-vn.y,vn.x,0,-_n.y,_n.x,0,-Dn.y,Dn.x,0];return!ir(e,Kn,Jn,Qn,as)||(e=[1,0,0,0,1,0,0,0,1],!ir(e,Kn,Jn,Qn,as))?!1:(os.crossVectors(vn,_n),e=[os.x,os.y,os.z],ir(e,Kn,Jn,Qn,as))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new w,new w,new w,new w,new w,new w,new w,new w],Ve=new w,rs=new Ji,Kn=new w,Jn=new w,Qn=new w,vn=new w,_n=new w,Dn=new w,Di=new w,as=new w,os=new w,In=new w;function ir(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){In.fromArray(s,r);const o=i.x*Math.abs(In.x)+i.y*Math.abs(In.y)+i.z*Math.abs(In.z),c=t.dot(In),l=e.dot(In),u=n.dot(In);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Sh=new Ji,Ii=new w,sr=new w;class $s{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ii.subVectors(t,this.center);const e=Ii.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ii,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ii.copy(t.center).add(sr)),this.expandByPoint(Ii.copy(t.center).sub(sr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new w,rr=new w,cs=new w,xn=new w,ar=new w,ls=new w,or=new w;class Ba{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){rr.copy(t).add(e).multiplyScalar(.5),cs.copy(e).sub(t).normalize(),xn.copy(this.origin).sub(rr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(cs),o=xn.dot(this.direction),c=-xn.dot(cs),l=xn.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,p=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(rr).addScaledVector(cs,f),p}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const n=sn.dot(this.direction),i=sn.dot(sn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,i,r){ar.subVectors(e,t),ls.subVectors(n,t),or.crossVectors(ar,ls);let a=this.direction.dot(or),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;xn.subVectors(this.origin,t);const c=o*this.direction.dot(ls.crossVectors(xn,ls));if(c<0)return null;const l=o*this.direction.dot(ar.cross(xn));if(l<0||c+l>a)return null;const u=-o*xn.dot(or);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,i,r,a,o,c,l,u,h,f,p,g,v,m){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l,u,h,f,p,g,v,m)}set(t,e,n,i,r,a,o,c,l,u,h,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ti.setFromMatrixColumn(t,0).length(),r=1/ti.setFromMatrixColumn(t,1).length(),a=1/ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=a*u,p=a*h,g=o*u,v=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+g*l,e[5]=f-v*l,e[9]=-o*c,e[2]=v-f*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*u,p=c*h,g=l*u,v=l*h;e[0]=f+v*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=v+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*u,p=c*h,g=l*u,v=l*h;e[0]=f-v*o,e[4]=-a*h,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=v-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*u,p=a*h,g=o*u,v=o*h;e[0]=c*u,e[4]=g*l-p,e[8]=f*l+v,e[1]=c*h,e[5]=v*l+f,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*u,e[4]=v-f*h,e[8]=g*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=p*h+g,e[10]=f-v*h}else if(t.order==="XZY"){const f=a*c,p=a*l,g=o*c,v=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+v,e[5]=a*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=o*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Eh,t,wh)}lookAt(t,e,n){const i=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),yn.crossVectors(n,Pe),yn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),yn.crossVectors(n,Pe)),yn.normalize(),hs.crossVectors(Pe,yn),i[0]=yn.x,i[4]=hs.x,i[8]=Pe.x,i[1]=yn.y,i[5]=hs.y,i[9]=Pe.y,i[2]=yn.z,i[6]=hs.z,i[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],E=n[3],T=n[7],M=n[11],N=n[15],A=i[0],R=i[4],I=i[8],S=i[12],y=i[1],C=i[5],k=i[9],z=i[13],W=i[2],Z=i[6],G=i[10],K=i[14],H=i[3],st=i[7],ht=i[11],yt=i[15];return r[0]=a*A+o*y+c*W+l*H,r[4]=a*R+o*C+c*Z+l*st,r[8]=a*I+o*k+c*G+l*ht,r[12]=a*S+o*z+c*K+l*yt,r[1]=u*A+h*y+f*W+p*H,r[5]=u*R+h*C+f*Z+p*st,r[9]=u*I+h*k+f*G+p*ht,r[13]=u*S+h*z+f*K+p*yt,r[2]=g*A+v*y+m*W+d*H,r[6]=g*R+v*C+m*Z+d*st,r[10]=g*I+v*k+m*G+d*ht,r[14]=g*S+v*z+m*K+d*yt,r[3]=E*A+T*y+M*W+N*H,r[7]=E*R+T*C+M*Z+N*st,r[11]=E*I+T*k+M*G+N*ht,r[15]=E*S+T*z+M*K+N*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15];return g*(+r*c*h-i*l*h-r*o*f+n*l*f+i*o*p-n*c*p)+v*(+e*c*p-e*l*f+r*a*f-i*a*p+i*l*u-r*c*u)+m*(+e*l*h-e*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+d*(-i*o*u-e*c*h+e*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],E=h*m*l-v*f*l+v*c*p-o*m*p-h*c*d+o*f*d,T=g*f*l-u*m*l-g*c*p+a*m*p+u*c*d-a*f*d,M=u*v*l-g*h*l+g*o*p-a*v*p-u*o*d+a*h*d,N=g*h*c-u*v*c-g*o*f+a*v*f+u*o*m-a*h*m,A=e*E+n*T+i*M+r*N;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=E*R,t[1]=(v*f*r-h*m*r-v*i*p+n*m*p+h*i*d-n*f*d)*R,t[2]=(o*m*r-v*c*r+v*i*l-n*m*l-o*i*d+n*c*d)*R,t[3]=(h*c*r-o*f*r-h*i*l+n*f*l+o*i*p-n*c*p)*R,t[4]=T*R,t[5]=(u*m*r-g*f*r+g*i*p-e*m*p-u*i*d+e*f*d)*R,t[6]=(g*c*r-a*m*r-g*i*l+e*m*l+a*i*d-e*c*d)*R,t[7]=(a*f*r-u*c*r+u*i*l-e*f*l-a*i*p+e*c*p)*R,t[8]=M*R,t[9]=(g*h*r-u*v*r-g*n*p+e*v*p+u*n*d-e*h*d)*R,t[10]=(a*v*r-g*o*r+g*n*l-e*v*l-a*n*d+e*o*d)*R,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*p-e*o*p)*R,t[12]=N*R,t[13]=(u*v*i-g*h*i+g*n*f-e*v*f-u*n*m+e*h*m)*R,t[14]=(g*o*i-a*v*i-g*n*c+e*v*c+a*n*m-e*o*m)*R,t[15]=(a*h*i-u*o*i+u*n*c-e*h*c-a*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,f=r*l,p=r*u,g=r*h,v=a*u,m=a*h,d=o*h,E=c*l,T=c*u,M=c*h,N=n.x,A=n.y,R=n.z;return i[0]=(1-(v+d))*N,i[1]=(p+M)*N,i[2]=(g-T)*N,i[3]=0,i[4]=(p-M)*A,i[5]=(1-(f+d))*A,i[6]=(m+E)*A,i[7]=0,i[8]=(g+T)*R,i[9]=(m-E)*R,i[10]=(1-(f+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ti.set(i[0],i[1],i[2]).length();const a=ti.set(i[4],i[5],i[6]).length(),o=ti.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],He.copy(this);const l=1/r,u=1/a,h=1/o;return He.elements[0]*=l,He.elements[1]*=l,He.elements[2]*=l,He.elements[4]*=u,He.elements[5]*=u,He.elements[6]*=u,He.elements[8]*=h,He.elements[9]*=h,He.elements[10]*=h,e.setFromRotationMatrix(He),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=hn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let p,g;if(o===hn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Bs)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=hn){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(a-r),f=(e+t)*l,p=(n+i)*u;let g,v;if(o===hn)g=(a+r)*h,v=-2*h;else if(o===Bs)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ti=new w,He=new Qt,Eh=new w(0,0,0),wh=new w(1,1,1),yn=new w,hs=new w,Pe=new w,_o=new Qt,xo=new Ki;class Ze{constructor(t=0,e=0,n=0,i=Ze.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _o.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_o,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xo.setFromEuler(this),this.setFromQuaternion(xo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ze.DEFAULT_ORDER="XYZ";class za{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bh=0;const yo=new w,ei=new Ki,rn=new Qt,us=new w,Ui=new w,Th=new w,Ah=new Ki,Mo=new w(1,0,0),So=new w(0,1,0),Eo=new w(0,0,1),wo={type:"added"},Rh={type:"removed"},ni={type:"childadded",child:null},cr={type:"childremoved",child:null};class de extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new w,e=new Ze,n=new Ki,i=new w(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Lt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new za,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(Mo,t)}rotateY(t){return this.rotateOnAxis(So,t)}rotateZ(t){return this.rotateOnAxis(Eo,t)}translateOnAxis(t,e){return yo.copy(t).applyQuaternion(this.quaternion),this.position.add(yo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mo,t)}translateY(t){return this.translateOnAxis(So,t)}translateZ(t){return this.translateOnAxis(Eo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?us.copy(t):us.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ui,us,this.up):rn.lookAt(us,Ui,this.up),this.quaternion.setFromRotationMatrix(rn),i&&(rn.extractRotation(i.matrixWorld),ei.setFromRotationMatrix(rn),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wo),ni.child=t,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rh),cr.child=t,this.dispatchEvent(cr),cr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wo),ni.child=t,this.dispatchEvent(ni),ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,t,Th),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Ah,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}de.DEFAULT_UP=new w(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new w,an=new w,lr=new w,on=new w,ii=new w,si=new w,bo=new w,hr=new w,ur=new w,dr=new w,fr=new Kt,pr=new Kt,mr=new Kt;class Be{constructor(t=new w,e=new w,n=new w){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ge.subVectors(t,e),i.cross(Ge);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Ge.subVectors(i,e),an.subVectors(n,e),lr.subVectors(t,e);const a=Ge.dot(Ge),o=Ge.dot(an),c=Ge.dot(lr),l=an.dot(an),u=an.dot(lr),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,on)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,on.x),c.addScaledVector(a,on.y),c.addScaledVector(o,on.z),c)}static getInterpolatedAttribute(t,e,n,i,r,a){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(t,e),pr.fromBufferAttribute(t,n),mr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(fr,r.x),a.addScaledVector(pr,r.y),a.addScaledVector(mr,r.z),a}static isFrontFacing(t,e,n,i){return Ge.subVectors(n,e),an.subVectors(t,e),Ge.cross(an).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Ge.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Be.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Be.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Be.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Be.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Be.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;ii.subVectors(i,n),si.subVectors(r,n),hr.subVectors(t,n);const c=ii.dot(hr),l=si.dot(hr);if(c<=0&&l<=0)return e.copy(n);ur.subVectors(t,i);const u=ii.dot(ur),h=si.dot(ur);if(u>=0&&h<=u)return e.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(ii,a);dr.subVectors(t,r);const p=ii.dot(dr),g=si.dot(dr);if(g>=0&&p<=g)return e.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(si,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return bo.subVectors(r,i),o=(h-u)/(h-u+(p-g)),e.copy(i).addScaledVector(bo,o);const d=1/(m+v+f);return a=v*d,o=f*d,e.copy(n).addScaledVector(ii,a).addScaledVector(si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},ds={h:0,s:0,l:0};function gr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Rt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ht.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Ht.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ht.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Ht.workingColorSpace){if(t=Fa(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=gr(a,r,t+1/3),this.g=gr(a,r,t),this.b=gr(a,r,t-1/3)}return Ht.toWorkingColorSpace(this,i),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const n=Bc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}copyLinearToSRGB(t){return this.r=vi(t.r),this.g=vi(t.g),this.b=vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return Ht.fromWorkingColorSpace(Me.copy(this),t),Math.round(ge(Me.r*255,0,255))*65536+Math.round(ge(Me.g*255,0,255))*256+Math.round(ge(Me.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ht.workingColorSpace){Ht.fromWorkingColorSpace(Me.copy(this),e);const n=Me.r,i=Me.g,r=Me.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Ht.workingColorSpace){return Ht.fromWorkingColorSpace(Me.copy(this),e),t.r=Me.r,t.g=Me.g,t.b=Me.b,t}getStyle(t=Fe){Ht.fromWorkingColorSpace(Me.copy(this),t);const e=Me.r,n=Me.g,i=Me.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Mn),this.setHSL(Mn.h+t,Mn.s+e,Mn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mn),t.getHSL(ds);const n=Wi(Mn.h,ds.h,e),i=Wi(Mn.s,ds.s,e),r=Wi(Mn.l,ds.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Me=new Rt;Rt.NAMES=Bc;let Ch=0;class Cn extends Ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=dn(),this.name="",this.blending=mi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fr,this.blendDst=Br,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mi&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fr&&(n.blendSrc=this.blendSrc),this.blendDst!==Br&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==oo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Se extends Cn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Ca,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new w,fs=new nt;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sa,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fs.fromBufferAttribute(this,e),fs.applyMatrix3(t),this.setXY(e,fs.x,fs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xe(e,this.array)),e}setX(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xe(e,this.array)),e}setY(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xe(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xe(e,this.array)),e}setW(t,e){return this.normalized&&(e=Yt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),r=Yt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sa&&(t.usage=this.usage),t}}class zc extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class kc extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ph=0;const Oe=new Qt,vr=new de,ri=new w,Le=new Ji,Ni=new Ji,me=new w;class _e extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nc(t)?kc:zc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,n){return Oe.makeTranslation(t,e,n),this.applyMatrix4(Oe),this}scale(t,e,n){return Oe.makeScale(t,e,n),this.applyMatrix4(Oe),this}lookAt(t){return vr.lookAt(t),vr.updateMatrix(),this.applyMatrix4(vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $t(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Le.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const n=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ni.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(Le.min,Ni.min),Le.expandByPoint(me),me.addVectors(Le.max,Ni.max),Le.expandByPoint(me)):(Le.expandByPoint(Ni.min),Le.expandByPoint(Ni.max))}Le.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)me.fromBufferAttribute(o,l),c&&(ri.fromBufferAttribute(t,l),me.add(ri)),i=Math.max(i,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new w,c[I]=new w;const l=new w,u=new w,h=new w,f=new nt,p=new nt,g=new nt,v=new w,m=new w;function d(I,S,y){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,y),f.fromBufferAttribute(r,I),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),u.sub(l),h.sub(l),p.sub(f),g.sub(f);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),o[I].add(v),o[S].add(v),o[y].add(v),c[I].add(m),c[S].add(m),c[y].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,S=E.length;I<S;++I){const y=E[I],C=y.start,k=y.count;for(let z=C,W=C+k;z<W;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const T=new w,M=new w,N=new w,A=new w;function R(I){N.fromBufferAttribute(i,I),A.copy(N);const S=o[I];T.copy(S),T.sub(N.multiplyScalar(N.dot(S))).normalize(),M.crossVectors(A,S);const C=M.dot(c[I])<0?-1:1;a.setXYZW(I,T.x,T.y,T.z,C)}for(let I=0,S=E.length;I<S;++I){const y=E[I],C=y.start,k=y.count;for(let z=C,W=C+k;z<W;z+=3)R(t.getX(z+0)),R(t.getX(z+1)),R(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new w,r=new w,a=new w,o=new w,c=new w,l=new w,u=new w,h=new w;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new $e(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=t(f,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const To=new Qt,Un=new Ba,ps=new $s,Ao=new w,ms=new w,gs=new w,vs=new w,_r=new w,_s=new w,Ro=new w,xs=new w;class Ut extends de{constructor(t=new _e,e=new Se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){_s.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(_r.fromBufferAttribute(h,t),a?_s.addScaledVector(_r,u):_s.addScaledVector(_r.sub(e),u))}e.add(_s)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),Un.copy(t.ray).recast(t.near),!(ps.containsPoint(Un.origin)===!1&&(Un.intersectSphere(ps,Ao)===null||Un.origin.distanceToSquared(Ao)>(t.far-t.near)**2))&&(To.copy(r).invert(),Un.copy(t.ray).applyMatrix4(To),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=E,N=T;M<N;M+=3){const A=o.getX(M),R=o.getX(M+1),I=o.getX(M+2);i=ys(this,d,t,n,l,u,h,A,R,I),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const E=o.getX(m),T=o.getX(m+1),M=o.getX(m+2);i=ys(this,a,t,n,l,u,h,E,T,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=a[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=E,N=T;M<N;M+=3){const A=M,R=M+1,I=M+2;i=ys(this,d,t,n,l,u,h,A,R,I),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const E=m,T=m+1,M=m+2;i=ys(this,a,t,n,l,u,h,E,T,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Lh(s,t,e,n,i,r,a,o){let c;if(t.side===Re?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===An,o),c===null)return null;xs.copy(o),xs.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(xs);return l<e.near||l>e.far?null:{distance:l,point:xs.clone(),object:s}}function ys(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,ms),s.getVertexPosition(c,gs),s.getVertexPosition(l,vs);const u=Lh(s,t,e,n,ms,gs,vs,Ro);if(u){const h=new w;Be.getBarycoord(Ro,ms,gs,vs,h),i&&(u.uv=Be.getInterpolatedAttribute(i,o,c,l,h,new nt)),r&&(u.uv1=Be.getInterpolatedAttribute(r,o,c,l,h,new nt)),a&&(u.normal=Be.getInterpolatedAttribute(a,o,c,l,h,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new w,materialIndex:0};Be.getNormal(ms,gs,vs,f.normal),u.face=f,u.barycoord=h}return u}class Ae extends _e{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(h,2));function g(v,m,d,E,T,M,N,A,R,I,S){const y=M/R,C=N/I,k=M/2,z=N/2,W=A/2,Z=R+1,G=I+1;let K=0,H=0;const st=new w;for(let ht=0;ht<G;ht++){const yt=ht*C-z;for(let Nt=0;Nt<Z;Nt++){const Jt=Nt*y-k;st[v]=Jt*E,st[m]=yt*T,st[d]=W,l.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[d]=A>0?1:-1,u.push(st.x,st.y,st.z),h.push(Nt/R),h.push(1-ht/I),K+=1}}for(let ht=0;ht<I;ht++)for(let yt=0;yt<R;yt++){const Nt=f+yt+Z*ht,Jt=f+yt+Z*(ht+1),q=f+(yt+1)+Z*(ht+1),tt=f+(yt+1)+Z*ht;c.push(Nt,Jt,tt),c.push(Jt,q,tt),H+=6}o.addGroup(p,H,S),p+=H,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ae(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function wi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function we(s){const t={};for(let e=0;e<s.length;e++){const n=wi(s[e]);for(const i in n)t[i]=n[i]}return t}function Dh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Vc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ht.workingColorSpace}const Ih={clone:wi,merge:we};var Uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Cn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uh,this.fragmentShader=Nh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wi(t.uniforms),this.uniformsGroups=Dh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Hc extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sn=new w,Co=new nt,Po=new nt;class De extends Hc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(Gi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Sn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z),Sn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z)}getViewSize(t,e){return this.getViewBounds(t,Co,Po),e.subVectors(Po,Co)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,oi=1;class Oh extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new De(ai,oi,t,e);i.layers=this.layers,this.add(i);const r=new De(ai,oi,t,e);r.layers=this.layers,this.add(r);const a=new De(ai,oi,t,e);a.layers=this.layers,this.add(a);const o=new De(ai,oi,t,e);o.layers=this.layers,this.add(o);const c=new De(ai,oi,t,e);c.layers=this.layers,this.add(c);const l=new De(ai,oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Gc extends be{constructor(t,e,n,i,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:yi,super(t,e,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fh extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Gc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ae(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:Tn});r.uniforms.tEquirect.value=e;const a=new Ut(i,r),o=e.minFilter;return e.minFilter===Gn&&(e.minFilter=Je),new Oh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const xr=new w,Bh=new w,zh=new Lt;class Bn{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=xr.subVectors(n,e).cross(Bh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(xr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||zh.getNormalMatrix(t),i=this.coplanarPoint(xr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new $s,Ms=new w;class ka{constructor(t=new Bn,e=new Bn,n=new Bn,i=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],p=i[8],g=i[9],v=i[10],m=i[11],d=i[12],E=i[13],T=i[14],M=i[15];if(n[0].setComponents(c-r,f-l,m-p,M-d).normalize(),n[1].setComponents(c+r,f+l,m+p,M+d).normalize(),n[2].setComponents(c+a,f+u,m+g,M+E).normalize(),n[3].setComponents(c-a,f-u,m-g,M-E).normalize(),n[4].setComponents(c-o,f-h,m-v,M-T).normalize(),e===hn)n[5].setComponents(c+o,f+h,m+v,M+T).normalize();else if(e===Bs)n[5].setComponents(o,h,v,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(t){return Nn.center.set(0,0,0),Nn.radius=.7071067811865476,Nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ms.x=i.normal.x>0?t.max.x:t.min.x,Ms.y=i.normal.y>0?t.max.y:t.min.y,Ms.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ms)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wc(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function kh(s){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(s.bindBuffer(l,o),h.length===0)s.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];s.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class bi extends _e{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=t/o,f=e/c,p=[],g=[],v=[],m=[];for(let d=0;d<u;d++){const E=d*f-a;for(let T=0;T<l;T++){const M=T*h-r;g.push(M,-E,0),v.push(0,0,1),m.push(T/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let E=0;E<o;E++){const T=E+l*d,M=E+l*(d+1),N=E+1+l*(d+1),A=E+1+l*d;p.push(T,M,A),p.push(M,N,A)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(v,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Vh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$h=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,jh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,du=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",_u=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Mu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Su=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Au=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ru=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Du=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Iu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Uu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ou=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ku=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$u=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ju=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ku=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ju=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,td=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ed=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,id=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ad=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ld=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ud=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,md=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,gd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_d=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Md=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ed=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Td=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ad=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Rd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ld=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Id=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ud=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Nd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$d=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,af=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,of=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,df=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ff=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:Vh,alphahash_pars_fragment:Hh,alphamap_fragment:Gh,alphamap_pars_fragment:Wh,alphatest_fragment:Xh,alphatest_pars_fragment:qh,aomap_fragment:Yh,aomap_pars_fragment:$h,batching_pars_vertex:Zh,batching_vertex:jh,begin_vertex:Kh,beginnormal_vertex:Jh,bsdfs:Qh,iridescence_fragment:tu,bumpmap_pars_fragment:eu,clipping_planes_fragment:nu,clipping_planes_pars_fragment:iu,clipping_planes_pars_vertex:su,clipping_planes_vertex:ru,color_fragment:au,color_pars_fragment:ou,color_pars_vertex:cu,color_vertex:lu,common:hu,cube_uv_reflection_fragment:uu,defaultnormal_vertex:du,displacementmap_pars_vertex:fu,displacementmap_vertex:pu,emissivemap_fragment:mu,emissivemap_pars_fragment:gu,colorspace_fragment:vu,colorspace_pars_fragment:_u,envmap_fragment:xu,envmap_common_pars_fragment:yu,envmap_pars_fragment:Mu,envmap_pars_vertex:Su,envmap_physical_pars_fragment:Iu,envmap_vertex:Eu,fog_vertex:wu,fog_pars_vertex:bu,fog_fragment:Tu,fog_pars_fragment:Au,gradientmap_pars_fragment:Ru,lightmap_pars_fragment:Cu,lights_lambert_fragment:Pu,lights_lambert_pars_fragment:Lu,lights_pars_begin:Du,lights_toon_fragment:Uu,lights_toon_pars_fragment:Nu,lights_phong_fragment:Ou,lights_phong_pars_fragment:Fu,lights_physical_fragment:Bu,lights_physical_pars_fragment:zu,lights_fragment_begin:ku,lights_fragment_maps:Vu,lights_fragment_end:Hu,logdepthbuf_fragment:Gu,logdepthbuf_pars_fragment:Wu,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:qu,map_fragment:Yu,map_pars_fragment:$u,map_particle_fragment:Zu,map_particle_pars_fragment:ju,metalnessmap_fragment:Ku,metalnessmap_pars_fragment:Ju,morphinstance_vertex:Qu,morphcolor_vertex:td,morphnormal_vertex:ed,morphtarget_pars_vertex:nd,morphtarget_vertex:id,normal_fragment_begin:sd,normal_fragment_maps:rd,normal_pars_fragment:ad,normal_pars_vertex:od,normal_vertex:cd,normalmap_pars_fragment:ld,clearcoat_normal_fragment_begin:hd,clearcoat_normal_fragment_maps:ud,clearcoat_pars_fragment:dd,iridescence_pars_fragment:fd,opaque_fragment:pd,packing:md,premultiplied_alpha_fragment:gd,project_vertex:vd,dithering_fragment:_d,dithering_pars_fragment:xd,roughnessmap_fragment:yd,roughnessmap_pars_fragment:Md,shadowmap_pars_fragment:Sd,shadowmap_pars_vertex:Ed,shadowmap_vertex:wd,shadowmask_pars_fragment:bd,skinbase_vertex:Td,skinning_pars_vertex:Ad,skinning_vertex:Rd,skinnormal_vertex:Cd,specularmap_fragment:Pd,specularmap_pars_fragment:Ld,tonemapping_fragment:Dd,tonemapping_pars_fragment:Id,transmission_fragment:Ud,transmission_pars_fragment:Nd,uv_pars_fragment:Od,uv_pars_vertex:Fd,uv_vertex:Bd,worldpos_vertex:zd,background_vert:kd,background_frag:Vd,backgroundCube_vert:Hd,backgroundCube_frag:Gd,cube_vert:Wd,cube_frag:Xd,depth_vert:qd,depth_frag:Yd,distanceRGBA_vert:$d,distanceRGBA_frag:Zd,equirect_vert:jd,equirect_frag:Kd,linedashed_vert:Jd,linedashed_frag:Qd,meshbasic_vert:tf,meshbasic_frag:ef,meshlambert_vert:nf,meshlambert_frag:sf,meshmatcap_vert:rf,meshmatcap_frag:af,meshnormal_vert:of,meshnormal_frag:cf,meshphong_vert:lf,meshphong_frag:hf,meshphysical_vert:uf,meshphysical_frag:df,meshtoon_vert:ff,meshtoon_frag:pf,points_vert:mf,points_frag:gf,shadow_vert:vf,shadow_frag:_f,sprite_vert:xf,sprite_frag:yf},et={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Ke={basic:{uniforms:we([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:we([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Rt(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:we([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:we([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:we([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new Rt(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:we([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:we([et.points,et.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:we([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:we([et.common,et.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:we([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:we([et.sprite,et.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:we([et.common,et.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:we([et.lights,et.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};Ke.physical={uniforms:we([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const Ss={r:0,b:0,g:0},On=new Ze,Mf=new Qt;function Sf(s,t,e,n,i,r,a){const o=new Rt(0);let c=r===!0?0:1,l,u,h=null,f=0,p=null;function g(E){let T=E.isScene===!0?E.background:null;return T&&T.isTexture&&(T=(E.backgroundBlurriness>0?e:t).get(T)),T}function v(E){let T=!1;const M=g(E);M===null?d(o,c):M&&M.isColor&&(d(M,1),T=!0);const N=s.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,a):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(E,T){const M=g(T);M&&(M.isCubeTexture||M.mapping===qs)?(u===void 0&&(u=new Ut(new Ae(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:wi(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(N,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),On.copy(T.backgroundRotation),On.x*=-1,On.y*=-1,On.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Mf.makeRotationFromEuler(On)),u.material.toneMapped=Ht.getTransfer(M.colorSpace)!==Zt,(h!==M||f!==M.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=s.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ut(new bi(2,2),new Rn({name:"BackgroundMaterial",uniforms:wi(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Ht.getTransfer(M.colorSpace)!==Zt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,p=s.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function d(E,T){E.getRGB(Ss,Vc(s)),n.buffers.color.setClear(Ss.r,Ss.g,Ss.b,T,a)}return{getClearColor:function(){return o},setClearColor:function(E,T=1){o.set(E),c=T,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,d(o,c)},render:v,addToRenderList:m}}function Ef(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(y,C,k,z,W){let Z=!1;const G=h(z,k,C);r!==G&&(r=G,l(r.object)),Z=p(y,z,k,W),Z&&g(y,z,k,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(y,C,k,z),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return s.createVertexArray()}function l(y){return s.bindVertexArray(y)}function u(y){return s.deleteVertexArray(y)}function h(y,C,k){const z=k.wireframe===!0;let W=n[y.id];W===void 0&&(W={},n[y.id]=W);let Z=W[C.id];Z===void 0&&(Z={},W[C.id]=Z);let G=Z[z];return G===void 0&&(G=f(c()),Z[z]=G),G}function f(y){const C=[],k=[],z=[];for(let W=0;W<e;W++)C[W]=0,k[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:z,object:y,attributes:{},index:null}}function p(y,C,k,z){const W=r.attributes,Z=C.attributes;let G=0;const K=k.getAttributes();for(const H in K)if(K[H].location>=0){const ht=W[H];let yt=Z[H];if(yt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),ht===void 0||ht.attribute!==yt||yt&&ht.data!==yt.data)return!0;G++}return r.attributesNum!==G||r.index!==z}function g(y,C,k,z){const W={},Z=C.attributes;let G=0;const K=k.getAttributes();for(const H in K)if(K[H].location>=0){let ht=Z[H];ht===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor));const yt={};yt.attribute=ht,ht&&ht.data&&(yt.data=ht.data),W[H]=yt,G++}r.attributes=W,r.attributesNum=G,r.index=z}function v(){const y=r.newAttributes;for(let C=0,k=y.length;C<k;C++)y[C]=0}function m(y){d(y,0)}function d(y,C){const k=r.newAttributes,z=r.enabledAttributes,W=r.attributeDivisors;k[y]=1,z[y]===0&&(s.enableVertexAttribArray(y),z[y]=1),W[y]!==C&&(s.vertexAttribDivisor(y,C),W[y]=C)}function E(){const y=r.newAttributes,C=r.enabledAttributes;for(let k=0,z=C.length;k<z;k++)C[k]!==y[k]&&(s.disableVertexAttribArray(k),C[k]=0)}function T(y,C,k,z,W,Z,G){G===!0?s.vertexAttribIPointer(y,C,k,W,Z):s.vertexAttribPointer(y,C,k,z,W,Z)}function M(y,C,k,z){v();const W=z.attributes,Z=k.getAttributes(),G=C.defaultAttributeValues;for(const K in Z){const H=Z[K];if(H.location>=0){let st=W[K];if(st===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),st!==void 0){const ht=st.normalized,yt=st.itemSize,Nt=t.get(st);if(Nt===void 0)continue;const Jt=Nt.buffer,q=Nt.type,tt=Nt.bytesPerElement,vt=q===s.INT||q===s.UNSIGNED_INT||st.gpuType===Pa;if(st.isInterleavedBufferAttribute){const rt=st.data,wt=rt.stride,At=st.offset;if(rt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<H.locationSize;Ot++)d(H.location+Ot,rt.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ot=0;Ot<H.locationSize;Ot++)m(H.location+Ot);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let Ot=0;Ot<H.locationSize;Ot++)T(H.location+Ot,yt/H.locationSize,q,ht,wt*tt,(At+yt/H.locationSize*Ot)*tt,vt)}else{if(st.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)d(H.location+rt,st.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let rt=0;rt<H.locationSize;rt++)m(H.location+rt);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let rt=0;rt<H.locationSize;rt++)T(H.location+rt,yt/H.locationSize,q,ht,yt*tt,yt/H.locationSize*rt*tt,vt)}}else if(G!==void 0){const ht=G[K];if(ht!==void 0)switch(ht.length){case 2:s.vertexAttrib2fv(H.location,ht);break;case 3:s.vertexAttrib3fv(H.location,ht);break;case 4:s.vertexAttrib4fv(H.location,ht);break;default:s.vertexAttrib1fv(H.location,ht)}}}}E()}function N(){I();for(const y in n){const C=n[y];for(const k in C){const z=C[k];for(const W in z)u(z[W].object),delete z[W];delete C[k]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const k in C){const z=C[k];for(const W in z)u(z[W].object),delete z[W];delete C[k]}delete n[y.id]}function R(y){for(const C in n){const k=n[C];if(k[y.id]===void 0)continue;const z=k[y.id];for(const W in z)u(z[W].object),delete z[W];delete k[y.id]}}function I(){S(),a=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:N,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function wf(s,t,e){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,n,1)}function c(l,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*f[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function bf(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==qe&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const I=R===ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==pn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ln&&!I)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:N,maxSamples:A}}function Tf(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Bn,o=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||i;return i=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,d=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const E=r?0:n,T=E*4;let M=d.clippingState||null;c.value=M,M=u(g,f,T,p);for(let N=0;N!==T;++N)M[N]=e[N];d.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const d=p+v*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,M=p;T!==v;++T,M+=4)a.copy(h[T]).applyMatrix4(E,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Af(s){let t=new WeakMap;function e(a,o){return o===qr?a.mapping=yi:o===Yr&&(a.mapping=Mi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===qr||o===Yr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Fh(c.height);return l.fromEquirectangularTexture(s,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Xc extends Hc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const pi=4,Lo=[.125,.215,.35,.446,.526,.582],Vn=20,yr=new Xc,Do=new Rt;let Mr=null,Sr=0,Er=0,wr=!1;const zn=(1+Math.sqrt(5))/2,ci=1/zn,Io=[new w(-zn,ci,0),new w(zn,ci,0),new w(-ci,0,zn),new w(ci,0,zn),new w(0,zn,-ci),new w(0,zn,ci),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Uo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Mr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),Er=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Mr,Sr,Er),this._renderer.xr.enabled=wr,t.scissorTest=!1,Es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===Mi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Mr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),Er=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:ji,format:qe,colorSpace:Ai,depthBuffer:!1},i=No(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=No(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rf(r)),this._blurMaterial=Cf(r,t,e)}return i}_compileMaterial(t){const e=new Ut(this._lodPlanes[0],t);this._renderer.compile(e,yr)}_sceneToCubeUV(t,e,n,i){const o=new De(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Do),u.toneMapping=un,u.autoClear=!1;const p=new Se({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),g=new Ut(new Ae,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Do),v=!0);for(let d=0;d<6;d++){const E=d%3;E===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):E===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const T=this._cubeSize;Es(i,E*T,d>2?T:0,T,T),u.setRenderTarget(i),v&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===yi||t.mapping===Mi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ut(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,yr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Io[(i-r-1)%Io.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ut(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Vn-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):Vn;m>Vn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vn}`);const d=[];let E=0;for(let R=0;R<Vn;++R){const I=R/v,S=Math.exp(-I*I/2);d.push(S),R===0?E+=S:R<m&&(E+=2*S)}for(let R=0;R<d.length;R++)d[R]=d[R]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-n;const M=this._sizeLods[i],N=3*M*(i>T-pi?i-T+pi:0),A=4*(this._cubeSize-M);Es(e,N,A,3*M,2*M),c.setRenderTarget(e),c.render(h,yr)}}function Rf(s){const t=[],e=[],n=[];let i=s;const r=s-pi+1+Lo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>s-pi?c=Lo[a-s+pi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,v=3,m=2,d=1,E=new Float32Array(v*g*p),T=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let A=0;A<p;A++){const R=A%3*2/3-1,I=A>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];E.set(S,v*g*A),T.set(f,m*g*A);const y=[A,A,A,A,A,A];M.set(y,d*g*A)}const N=new _e;N.setAttribute("position",new $e(E,v)),N.setAttribute("uv",new $e(T,m)),N.setAttribute("faceIndex",new $e(M,d)),t.push(N),i>pi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function No(s,t,e){const n=new Xn(s,t,e);return n.texture.mapping=qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Es(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Cf(s,t,e){const n=new Float32Array(Vn),i=new w(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Oo(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Fo(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Va(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pf(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===qr||c===Yr,u=c===yi||c===Mi;if(l||u){let h=t.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Uo(s)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&i(p)?(e===null&&(e=new Uo(s)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Lf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Vi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Df(s,t,e,n){const i={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete i[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)t.update(v[m],s.ARRAY_BUFFER)}}function l(h){const f=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const E=p.array;v=p.version;for(let T=0,M=E.length;T<M;T+=3){const N=E[T+0],A=E[T+1],R=E[T+2];f.push(N,A,A,R,R,N)}}else if(g!==void 0){const E=g.array;v=g.version;for(let T=0,M=E.length/3-1;T<M;T+=3){const N=T+0,A=T+1,R=T+2;f.push(N,A,A,R,R,N)}}else return;const m=new(Nc(f)?kc:zc)(f,1);m.version=v;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function If(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,p){s.drawElements(n,p,r,f*a),e.update(p,n,1)}function l(f,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,f*a,g),e.update(p,n,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function h(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/a,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,v,0,g);let d=0;for(let E=0;E<g;E++)d+=p[E]*v[E];e.update(d,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Uf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Nf(s,t,e){const n=new WeakMap,i=new Kt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let y=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let N=o.attributes.position.count*M,A=1;N>t.maxTextureSize&&(A=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const R=new Float32Array(N*A*4*h),I=new Fc(R,N,A,h);I.type=ln,I.needsUpdate=!0;const S=M*4;for(let C=0;C<h;C++){const k=d[C],z=E[C],W=T[C],Z=N*A*4*C;for(let G=0;G<k.count;G++){const K=G*S;g===!0&&(i.fromBufferAttribute(k,G),R[Z+K+0]=i.x,R[Z+K+1]=i.y,R[Z+K+2]=i.z,R[Z+K+3]=0),v===!0&&(i.fromBufferAttribute(z,G),R[Z+K+4]=i.x,R[Z+K+5]=i.y,R[Z+K+6]=i.z,R[Z+K+7]=0),m===!0&&(i.fromBufferAttribute(W,G),R[Z+K+8]=i.x,R[Z+K+9]=i.y,R[Z+K+10]=i.z,R[Z+K+11]=W.itemSize===4?i.w:1)}}f={count:h,texture:I,size:new nt(N,A)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",v),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Of(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class qc extends be{constructor(t,e,n,i,r,a,o,c,l,u=gi){if(u!==gi&&u!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===gi&&(n=Wn),n===void 0&&u===Ei&&(n=Si),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ye,this.minFilter=c!==void 0?c:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Yc=new be,Bo=new qc(1,1),$c=new Fc,Zc=new Mh,jc=new Gc,zo=[],ko=[],Vo=new Float32Array(16),Ho=new Float32Array(9),Go=new Float32Array(4);function Ci(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=zo[i];if(r===void 0&&(r=new Float32Array(i),zo[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function fe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function pe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Zs(s,t){let e=ko[t];e===void 0&&(e=new Int32Array(t),ko[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ff(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Bf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2fv(this.addr,t),pe(e,t)}}function zf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;s.uniform3fv(this.addr,t),pe(e,t)}}function kf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4fv(this.addr,t),pe(e,t)}}function Vf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Go.set(n),s.uniformMatrix2fv(this.addr,!1,Go),pe(e,n)}}function Hf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Ho.set(n),s.uniformMatrix3fv(this.addr,!1,Ho),pe(e,n)}}function Gf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Vo.set(n),s.uniformMatrix4fv(this.addr,!1,Vo),pe(e,n)}}function Wf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Xf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2iv(this.addr,t),pe(e,t)}}function qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;s.uniform3iv(this.addr,t),pe(e,t)}}function Yf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4iv(this.addr,t),pe(e,t)}}function $f(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Zf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2uiv(this.addr,t),pe(e,t)}}function jf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;s.uniform3uiv(this.addr,t),pe(e,t)}}function Kf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4uiv(this.addr,t),pe(e,t)}}function Jf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Bo.compareFunction=Uc,r=Bo):r=Yc,e.setTexture2D(t||r,i)}function Qf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Zc,i)}function tp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||jc,i)}function ep(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||$c,i)}function np(s){switch(s){case 5126:return Ff;case 35664:return Bf;case 35665:return zf;case 35666:return kf;case 35674:return Vf;case 35675:return Hf;case 35676:return Gf;case 5124:case 35670:return Wf;case 35667:case 35671:return Xf;case 35668:case 35672:return qf;case 35669:case 35673:return Yf;case 5125:return $f;case 36294:return Zf;case 36295:return jf;case 36296:return Kf;case 35678:case 36198:case 36298:case 36306:case 35682:return Jf;case 35679:case 36299:case 36307:return Qf;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return ep}}function ip(s,t){s.uniform1fv(this.addr,t)}function sp(s,t){const e=Ci(t,this.size,2);s.uniform2fv(this.addr,e)}function rp(s,t){const e=Ci(t,this.size,3);s.uniform3fv(this.addr,e)}function ap(s,t){const e=Ci(t,this.size,4);s.uniform4fv(this.addr,e)}function op(s,t){const e=Ci(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function cp(s,t){const e=Ci(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function lp(s,t){const e=Ci(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function hp(s,t){s.uniform1iv(this.addr,t)}function up(s,t){s.uniform2iv(this.addr,t)}function dp(s,t){s.uniform3iv(this.addr,t)}function fp(s,t){s.uniform4iv(this.addr,t)}function pp(s,t){s.uniform1uiv(this.addr,t)}function mp(s,t){s.uniform2uiv(this.addr,t)}function gp(s,t){s.uniform3uiv(this.addr,t)}function vp(s,t){s.uniform4uiv(this.addr,t)}function _p(s,t,e){const n=this.cache,i=t.length,r=Zs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Yc,r[a])}function xp(s,t,e){const n=this.cache,i=t.length,r=Zs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Zc,r[a])}function yp(s,t,e){const n=this.cache,i=t.length,r=Zs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||jc,r[a])}function Mp(s,t,e){const n=this.cache,i=t.length,r=Zs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||$c,r[a])}function Sp(s){switch(s){case 5126:return ip;case 35664:return sp;case 35665:return rp;case 35666:return ap;case 35674:return op;case 35675:return cp;case 35676:return lp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return vp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return yp;case 36289:case 36303:case 36311:case 36292:return Mp}}class Ep{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=np(e.type)}}class wp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sp(e.type)}}class bp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const br=/(\w+)(\])?(\[|\.)?/g;function Wo(s,t){s.seq.push(t),s.map[t.id]=t}function Tp(s,t,e){const n=s.name,i=n.length;for(br.lastIndex=0;;){const r=br.exec(n),a=br.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Wo(e,l===void 0?new Ep(o,s,t):new wp(o,s,t));break}else{let h=e.map[o];h===void 0&&(h=new bp(o),Wo(e,h)),e=h}}}class Fs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Tp(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Xo(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Ap=37297;let Rp=0;function Cp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const qo=new Lt;function Pp(s){Ht._getMatrix(qo,Ht.workingColorSpace,s);const t=`mat3( ${qo.elements.map(e=>e.toFixed(4))} )`;switch(Ht.getTransfer(s)){case Ys:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Yo(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Cp(s.getShaderSource(t),a)}else return i}function Lp(s,t){const e=Pp(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Dp(s,t){let e;switch(t){case Il:e="Linear";break;case Ul:e="Reinhard";break;case Nl:e="Cineon";break;case Ol:e="ACESFilmic";break;case Bl:e="AgX";break;case zl:e="Neutral";break;case Fl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ws=new w;function Ip(){Ht.getLuminanceCoefficients(ws);const s=ws.x.toFixed(4),t=ws.y.toFixed(4),e=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Up(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hi).join(`
`)}function Np(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Op(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Hi(s){return s!==""}function $o(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zo(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(s){return s.replace(Fp,zp)}const Bp=new Map;function zp(s,t){let e=It[t];if(e===void 0){const n=Bp.get(t);if(n!==void 0)e=It[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const kp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jo(s){return s.replace(kp,Vp)}function Vp(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ko(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Mc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===cn&&(t="SHADOWMAP_TYPE_VSM"),t}function Gp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case yi:case Mi:t="ENVMAP_TYPE_CUBE";break;case qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Mi:t="ENVMAP_MODE_REFRACTION";break}return t}function Xp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ca:t="ENVMAP_BLENDING_MULTIPLY";break;case Ll:t="ENVMAP_BLENDING_MIX";break;case Dl:t="ENVMAP_BLENDING_ADD";break}return t}function qp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Yp(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Hp(e),l=Gp(e),u=Wp(e),h=Xp(e),f=qp(e),p=Up(e),g=Np(r),v=i.createProgram();let m,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),d.length>0&&(d+=`
`)):(m=[Ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),d=[Ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==un?"#define TONE_MAPPING":"",e.toneMapping!==un?It.tonemapping_pars_fragment:"",e.toneMapping!==un?Dp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,Lp("linearToOutputTexel",e.outputColorSpace),Ip(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hi).join(`
`)),a=Ea(a),a=$o(a,e),a=Zo(a,e),o=Ea(o),o=$o(o,e),o=Zo(o,e),a=jo(a),o=jo(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===co?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=E+m+a,M=E+d+o,N=Xo(i,i.VERTEX_SHADER,T),A=Xo(i,i.FRAGMENT_SHADER,M);i.attachShader(v,N),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(C){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(v).trim(),z=i.getShaderInfoLog(N).trim(),W=i.getShaderInfoLog(A).trim();let Z=!0,G=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,N,A);else{const K=Yo(i,N,"vertex"),H=Yo(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+K+`
`+H)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||W==="")&&(G=!1);G&&(C.diagnostics={runnable:Z,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:d}})}i.deleteShader(N),i.deleteShader(A),I=new Fs(i,v),S=Op(i,v)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,Ap)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=N,this.fragmentShader=A,this}let $p=0;class Zp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new jp(t),e.set(t,n)),n}}class jp{constructor(t){this.id=$p++,this.code=t,this.usedTimes=0}}function Kp(s,t,e,n,i,r,a){const o=new za,c=new Zp,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,C,k,z){const W=k.fog,Z=z.geometry,G=S.isMeshStandardMaterial?k.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),H=K&&K.mapping===qs?K.image.height:null,st=g[S.type];S.precision!==null&&(p=i.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const ht=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,yt=ht!==void 0?ht.length:0;let Nt=0;Z.morphAttributes.position!==void 0&&(Nt=1),Z.morphAttributes.normal!==void 0&&(Nt=2),Z.morphAttributes.color!==void 0&&(Nt=3);let Jt,q,tt,vt;if(st){const qt=Ke[st];Jt=qt.vertexShader,q=qt.fragmentShader}else Jt=S.vertexShader,q=S.fragmentShader,c.update(S),tt=c.getVertexShaderID(S),vt=c.getFragmentShaderID(S);const rt=s.getRenderTarget(),wt=s.state.buffers.depth.getReversed(),At=z.isInstancedMesh===!0,Ot=z.isBatchedMesh===!0,ae=!!S.map,kt=!!S.matcap,ce=!!K,U=!!S.aoMap,Ue=!!S.lightMap,Ft=!!S.bumpMap,Bt=!!S.normalMap,St=!!S.displacementMap,ne=!!S.emissiveMap,Mt=!!S.metalnessMap,b=!!S.roughnessMap,_=S.anisotropy>0,O=S.clearcoat>0,Y=S.dispersion>0,j=S.iridescence>0,X=S.sheen>0,_t=S.transmission>0,at=_&&!!S.anisotropyMap,ut=O&&!!S.clearcoatMap,Vt=O&&!!S.clearcoatNormalMap,J=O&&!!S.clearcoatRoughnessMap,dt=j&&!!S.iridescenceMap,Et=j&&!!S.iridescenceThicknessMap,bt=X&&!!S.sheenColorMap,ft=X&&!!S.sheenRoughnessMap,zt=!!S.specularMap,Dt=!!S.specularColorMap,te=!!S.specularIntensityMap,P=_t&&!!S.transmissionMap,it=_t&&!!S.thicknessMap,V=!!S.gradientMap,$=!!S.alphaMap,lt=S.alphaTest>0,ot=!!S.alphaHash,Ct=!!S.extensions;let oe=un;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(oe=s.toneMapping);const xe={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:Jt,fragmentShader:q,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:vt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Ot,batchingColor:Ot&&z._colorsTexture!==null,instancing:At,instancingColor:At&&z.instanceColor!==null,instancingMorph:At&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Ai,alphaToCoverage:!!S.alphaToCoverage,map:ae,matcap:kt,envMap:ce,envMapMode:ce&&K.mapping,envMapCubeUVHeight:H,aoMap:U,lightMap:Ue,bumpMap:Ft,normalMap:Bt,displacementMap:f&&St,emissiveMap:ne,normalMapObjectSpace:Bt&&S.normalMapType===Gl,normalMapTangentSpace:Bt&&S.normalMapType===Oa,metalnessMap:Mt,roughnessMap:b,anisotropy:_,anisotropyMap:at,clearcoat:O,clearcoatMap:ut,clearcoatNormalMap:Vt,clearcoatRoughnessMap:J,dispersion:Y,iridescence:j,iridescenceMap:dt,iridescenceThicknessMap:Et,sheen:X,sheenColorMap:bt,sheenRoughnessMap:ft,specularMap:zt,specularColorMap:Dt,specularIntensityMap:te,transmission:_t,transmissionMap:P,thicknessMap:it,gradientMap:V,opaque:S.transparent===!1&&S.blending===mi&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:lt,alphaHash:ot,combine:S.combine,mapUv:ae&&v(S.map.channel),aoMapUv:U&&v(S.aoMap.channel),lightMapUv:Ue&&v(S.lightMap.channel),bumpMapUv:Ft&&v(S.bumpMap.channel),normalMapUv:Bt&&v(S.normalMap.channel),displacementMapUv:St&&v(S.displacementMap.channel),emissiveMapUv:ne&&v(S.emissiveMap.channel),metalnessMapUv:Mt&&v(S.metalnessMap.channel),roughnessMapUv:b&&v(S.roughnessMap.channel),anisotropyMapUv:at&&v(S.anisotropyMap.channel),clearcoatMapUv:ut&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:ft&&v(S.sheenRoughnessMap.channel),specularMapUv:zt&&v(S.specularMap.channel),specularColorMapUv:Dt&&v(S.specularColorMap.channel),specularIntensityMapUv:te&&v(S.specularIntensityMap.channel),transmissionMapUv:P&&v(S.transmissionMap.channel),thicknessMapUv:it&&v(S.thicknessMap.channel),alphaMapUv:$&&v(S.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Bt||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Z.attributes.uv&&(ae||$),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:wt,skinning:z.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Nt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:oe,decodeVideoTexture:ae&&S.map.isVideoTexture===!0&&Ht.getTransfer(S.map.colorSpace)===Zt,decodeVideoTextureEmissive:ne&&S.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(S.emissiveMap.colorSpace)===Zt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ie,flipSided:S.side===Re,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ct&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&S.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function d(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)y.push(C),y.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(E(y,S),T(y,S),y.push(s.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function E(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function T(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function M(S){const y=g[S.type];let C;if(y){const k=Ke[y];C=Ih.clone(k.uniforms)}else C=S.uniforms;return C}function N(S,y){let C;for(let k=0,z=u.length;k<z;k++){const W=u[k];if(W.cacheKey===y){C=W,++C.usedTimes;break}}return C===void 0&&(C=new Yp(s,y,S,r),u.push(C)),C}function A(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function R(S){c.remove(S)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:N,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:I}}function Jp(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Qp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Jo(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Qo(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(h,f,p,g,v,m){let d=s[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},s[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=v,d.group=m),t++,d}function o(h,f,p,g,v,m){const d=a(h,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):e.push(d)}function c(h,f,p,g,v,m){const d=a(h,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):e.unshift(d)}function l(h,f){e.length>1&&e.sort(h||Qp),n.length>1&&n.sort(f||Jo),i.length>1&&i.sort(f||Jo)}function u(){for(let h=t,f=s.length;h<f;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function tm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Qo,s.set(n,[a])):i>=r.length?(a=new Qo,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function em(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new Rt};break;case"SpotLight":e={position:new w,direction:new w,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new w,halfWidth:new w,halfHeight:new w};break}return s[t.id]=e,e}}}function nm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let im=0;function sm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function rm(s){const t=new em,e=nm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);const i=new w,r=new Qt,a=new Qt;function o(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,E=0,T=0,M=0,N=0,A=0,R=0;l.sort(sm);for(let S=0,y=l.length;S<y;S++){const C=l[S],k=C.color,z=C.intensity,W=C.distance,Z=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=k.r*z,h+=k.g*z,f+=k.b*z;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],z);R++}else if(C.isDirectionalLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const K=C.shadow,H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=C.shadow.matrix,E++}n.directional[p]=G,p++}else if(C.isSpotLight){const G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(k).multiplyScalar(z),G.distance=W,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[v]=G;const K=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,K.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[v]=K.matrix,C.castShadow){const H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=Z,M++}v++}else if(C.isRectAreaLight){const G=t.get(C);G.color.copy(k).multiplyScalar(z),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=G,m++}else if(C.isPointLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const K=C.shadow,H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=C.shadow.matrix,T++}n.point[g]=G,g++}else if(C.isHemisphereLight){const G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(z),G.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[d]=G,d++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=et.LTC_FLOAT_1,n.rectAreaLTC2=et.LTC_FLOAT_2):(n.rectAreaLTC1=et.LTC_HALF_1,n.rectAreaLTC2=et.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==d||I.numDirectionalShadows!==E||I.numPointShadows!==T||I.numSpotShadows!==M||I.numSpotMaps!==N||I.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=M+N-A,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.directionalLength=p,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=d,I.numDirectionalShadows=E,I.numPointShadows=T,I.numSpotShadows=M,I.numSpotMaps=N,I.numLightProbes=R,n.version=im++)}function c(l,u){let h=0,f=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let d=0,E=l.length;d<E;d++){const T=l[d];if(T.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),h++}else if(T.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function tc(s){const t=new rm(s),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function am(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new tc(s),t.set(i,[o])):r>=a.length?(o=new tc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class om extends Cn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cm extends Cn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function um(s,t,e){let n=new ka;const i=new nt,r=new nt,a=new Kt,o=new om({depthPacking:Hl}),c=new cm,l={},u=e.maxTextureSize,h={[An]:Re,[Re]:An,[Ie]:Ie},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:lm,fragmentShader:hm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ut(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mc;let d=this.type;this.render=function(A,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),y=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Tn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=d!==cn&&this.type===cn,W=d===cn&&this.type!==cn;for(let Z=0,G=A.length;Z<G;Z++){const K=A[Z],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const st=H.getFrameExtents();if(i.multiply(st),r.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/st.x),i.x=r.x*st.x,H.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/st.y),i.y=r.y*st.y,H.mapSize.y=r.y)),H.map===null||z===!0||W===!0){const yt=this.type!==cn?{minFilter:Ye,magFilter:Ye}:{};H.map!==null&&H.map.dispose(),H.map=new Xn(i.x,i.y,yt),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const ht=H.getViewportCount();for(let yt=0;yt<ht;yt++){const Nt=H.getViewport(yt);a.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),k.viewport(a),H.updateMatrices(K,yt),n=H.getFrustum(),M(R,I,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===cn&&E(H,I),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(S,y,C)};function E(A,R){const I=t.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Xn(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,I,f,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,I,p,v,null)}function T(A,R,I,S){let y=null;const C=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)y=C;else if(y=I.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const k=y.uuid,z=R.uuid;let W=l[k];W===void 0&&(W={},l[k]=W);let Z=W[z];Z===void 0&&(Z=y.clone(),W[z]=Z,R.addEventListener("dispose",N)),y=Z}if(y.visible=R.visible,y.wireframe=R.wireframe,S===cn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=s.properties.get(y);k.light=I}return y}function M(A,R,I,S,y){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===cn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=t.update(A),W=A.material;if(Array.isArray(W)){const Z=z.groups;for(let G=0,K=Z.length;G<K;G++){const H=Z[G],st=W[H.materialIndex];if(st&&st.visible){const ht=T(A,st,S,y);A.onBeforeShadow(s,A,R,I,z,ht,H),s.renderBufferDirect(I,null,z,ht,A,H),A.onAfterShadow(s,A,R,I,z,ht,H)}}}else if(W.visible){const Z=T(A,W,S,y);A.onBeforeShadow(s,A,R,I,z,Z,null),s.renderBufferDirect(I,null,z,Z,A,null),A.onAfterShadow(s,A,R,I,z,Z,null)}}const k=A.children;for(let z=0,W=k.length;z<W;z++)M(k[z],R,I,S,y)}function N(A){A.target.removeEventListener("dispose",N);for(const I in l){const S=l[I],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const dm={[zr]:kr,[Vr]:Wr,[Hr]:Xr,[xi]:Gr,[kr]:zr,[Wr]:Vr,[Xr]:Hr,[Gr]:xi};function fm(s,t){function e(){let P=!1;const it=new Kt;let V=null;const $=new Kt(0,0,0,0);return{setMask:function(lt){V!==lt&&!P&&(s.colorMask(lt,lt,lt,lt),V=lt)},setLocked:function(lt){P=lt},setClear:function(lt,ot,Ct,oe,xe){xe===!0&&(lt*=oe,ot*=oe,Ct*=oe),it.set(lt,ot,Ct,oe),$.equals(it)===!1&&(s.clearColor(lt,ot,Ct,oe),$.copy(it))},reset:function(){P=!1,V=null,$.set(-1,0,0,0)}}}function n(){let P=!1,it=!1,V=null,$=null,lt=null;return{setReversed:function(ot){if(it!==ot){const Ct=t.get("EXT_clip_control");it?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);const oe=lt;lt=null,this.setClear(oe)}it=ot},getReversed:function(){return it},setTest:function(ot){ot?rt(s.DEPTH_TEST):wt(s.DEPTH_TEST)},setMask:function(ot){V!==ot&&!P&&(s.depthMask(ot),V=ot)},setFunc:function(ot){if(it&&(ot=dm[ot]),$!==ot){switch(ot){case zr:s.depthFunc(s.NEVER);break;case kr:s.depthFunc(s.ALWAYS);break;case Vr:s.depthFunc(s.LESS);break;case xi:s.depthFunc(s.LEQUAL);break;case Hr:s.depthFunc(s.EQUAL);break;case Gr:s.depthFunc(s.GEQUAL);break;case Wr:s.depthFunc(s.GREATER);break;case Xr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=ot}},setLocked:function(ot){P=ot},setClear:function(ot){lt!==ot&&(it&&(ot=1-ot),s.clearDepth(ot),lt=ot)},reset:function(){P=!1,V=null,$=null,lt=null,it=!1}}}function i(){let P=!1,it=null,V=null,$=null,lt=null,ot=null,Ct=null,oe=null,xe=null;return{setTest:function(qt){P||(qt?rt(s.STENCIL_TEST):wt(s.STENCIL_TEST))},setMask:function(qt){it!==qt&&!P&&(s.stencilMask(qt),it=qt)},setFunc:function(qt,ze,tn){(V!==qt||$!==ze||lt!==tn)&&(s.stencilFunc(qt,ze,tn),V=qt,$=ze,lt=tn)},setOp:function(qt,ze,tn){(ot!==qt||Ct!==ze||oe!==tn)&&(s.stencilOp(qt,ze,tn),ot=qt,Ct=ze,oe=tn)},setLocked:function(qt){P=qt},setClear:function(qt){xe!==qt&&(s.clearStencil(qt),xe=qt)},reset:function(){P=!1,it=null,V=null,$=null,lt=null,ot=null,Ct=null,oe=null,xe=null}}}const r=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,E=null,T=null,M=null,N=null,A=null,R=new Rt(0,0,0),I=0,S=!1,y=null,C=null,k=null,z=null,W=null;const Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=K>=2);let st=null,ht={};const yt=s.getParameter(s.SCISSOR_BOX),Nt=s.getParameter(s.VIEWPORT),Jt=new Kt().fromArray(yt),q=new Kt().fromArray(Nt);function tt(P,it,V,$){const lt=new Uint8Array(4),ot=s.createTexture();s.bindTexture(P,ot),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ct=0;Ct<V;Ct++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(it,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,lt):s.texImage2D(it+Ct,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,lt);return ot}const vt={};vt[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(s.DEPTH_TEST),a.setFunc(xi),Ft(!1),Bt(io),rt(s.CULL_FACE),U(Tn);function rt(P){u[P]!==!0&&(s.enable(P),u[P]=!0)}function wt(P){u[P]!==!1&&(s.disable(P),u[P]=!1)}function At(P,it){return h[P]!==it?(s.bindFramebuffer(P,it),h[P]=it,P===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=it),P===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=it),!0):!1}function Ot(P,it){let V=p,$=!1;if(P){V=f.get(it),V===void 0&&(V=[],f.set(it,V));const lt=P.textures;if(V.length!==lt.length||V[0]!==s.COLOR_ATTACHMENT0){for(let ot=0,Ct=lt.length;ot<Ct;ot++)V[ot]=s.COLOR_ATTACHMENT0+ot;V.length=lt.length,$=!0}}else V[0]!==s.BACK&&(V[0]=s.BACK,$=!0);$&&s.drawBuffers(V)}function ae(P){return g!==P?(s.useProgram(P),g=P,!0):!1}const kt={[kn]:s.FUNC_ADD,[pl]:s.FUNC_SUBTRACT,[ml]:s.FUNC_REVERSE_SUBTRACT};kt[gl]=s.MIN,kt[vl]=s.MAX;const ce={[_l]:s.ZERO,[xl]:s.ONE,[yl]:s.SRC_COLOR,[Fr]:s.SRC_ALPHA,[Tl]:s.SRC_ALPHA_SATURATE,[wl]:s.DST_COLOR,[Sl]:s.DST_ALPHA,[Ml]:s.ONE_MINUS_SRC_COLOR,[Br]:s.ONE_MINUS_SRC_ALPHA,[bl]:s.ONE_MINUS_DST_COLOR,[El]:s.ONE_MINUS_DST_ALPHA,[Al]:s.CONSTANT_COLOR,[Rl]:s.ONE_MINUS_CONSTANT_COLOR,[Cl]:s.CONSTANT_ALPHA,[Pl]:s.ONE_MINUS_CONSTANT_ALPHA};function U(P,it,V,$,lt,ot,Ct,oe,xe,qt){if(P===Tn){v===!0&&(wt(s.BLEND),v=!1);return}if(v===!1&&(rt(s.BLEND),v=!0),P!==fl){if(P!==m||qt!==S){if((d!==kn||M!==kn)&&(s.blendEquation(s.FUNC_ADD),d=kn,M=kn),qt)switch(P){case mi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case so:s.blendFunc(s.ONE,s.ONE);break;case ro:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ao:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case mi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case so:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ro:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ao:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}E=null,T=null,N=null,A=null,R.set(0,0,0),I=0,m=P,S=qt}return}lt=lt||it,ot=ot||V,Ct=Ct||$,(it!==d||lt!==M)&&(s.blendEquationSeparate(kt[it],kt[lt]),d=it,M=lt),(V!==E||$!==T||ot!==N||Ct!==A)&&(s.blendFuncSeparate(ce[V],ce[$],ce[ot],ce[Ct]),E=V,T=$,N=ot,A=Ct),(oe.equals(R)===!1||xe!==I)&&(s.blendColor(oe.r,oe.g,oe.b,xe),R.copy(oe),I=xe),m=P,S=!1}function Ue(P,it){P.side===Ie?wt(s.CULL_FACE):rt(s.CULL_FACE);let V=P.side===Re;it&&(V=!V),Ft(V),P.blending===mi&&P.transparent===!1?U(Tn):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const $=P.stencilWrite;o.setTest($),$&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ne(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):wt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(P){y!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),y=P)}function Bt(P){P!==ul?(rt(s.CULL_FACE),P!==C&&(P===io?s.cullFace(s.BACK):P===dl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):wt(s.CULL_FACE),C=P}function St(P){P!==k&&(G&&s.lineWidth(P),k=P)}function ne(P,it,V){P?(rt(s.POLYGON_OFFSET_FILL),(z!==it||W!==V)&&(s.polygonOffset(it,V),z=it,W=V)):wt(s.POLYGON_OFFSET_FILL)}function Mt(P){P?rt(s.SCISSOR_TEST):wt(s.SCISSOR_TEST)}function b(P){P===void 0&&(P=s.TEXTURE0+Z-1),st!==P&&(s.activeTexture(P),st=P)}function _(P,it,V){V===void 0&&(st===null?V=s.TEXTURE0+Z-1:V=st);let $=ht[V];$===void 0&&($={type:void 0,texture:void 0},ht[V]=$),($.type!==P||$.texture!==it)&&(st!==V&&(s.activeTexture(V),st=V),s.bindTexture(P,it||vt[P]),$.type=P,$.texture=it)}function O(){const P=ht[st];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Y(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function X(){try{s.texSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function _t(){try{s.texSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function at(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ut(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Vt(){try{s.texStorage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{s.texStorage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Et(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(P){Jt.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Jt.copy(P))}function ft(P){q.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),q.copy(P))}function zt(P,it){let V=l.get(it);V===void 0&&(V=new WeakMap,l.set(it,V));let $=V.get(P);$===void 0&&($=s.getUniformBlockIndex(it,P.name),V.set(P,$))}function Dt(P,it){const $=l.get(it).get(P);c.get(it)!==$&&(s.uniformBlockBinding(it,$,P.__bindingPointIndex),c.set(it,$))}function te(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},st=null,ht={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,E=null,T=null,M=null,N=null,A=null,R=new Rt(0,0,0),I=0,S=!1,y=null,C=null,k=null,z=null,W=null,Jt.set(0,0,s.canvas.width,s.canvas.height),q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:wt,bindFramebuffer:At,drawBuffers:Ot,useProgram:ae,setBlending:U,setMaterial:Ue,setFlipSided:Ft,setCullFace:Bt,setLineWidth:St,setPolygonOffset:ne,setScissorTest:Mt,activeTexture:b,bindTexture:_,unbindTexture:O,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:dt,texImage3D:Et,updateUBOMapping:zt,uniformBlockBinding:Dt,texStorage2D:Vt,texStorage3D:J,texSubImage2D:X,texSubImage3D:_t,compressedTexSubImage2D:at,compressedTexSubImage3D:ut,scissor:bt,viewport:ft,reset:te}}function ec(s,t,e,n){const i=pm(n);switch(e){case Ac:return s*t;case Cc:return s*t;case Pc:return s*t*2;case Lc:return s*t/i.components*i.byteLength;case Ia:return s*t/i.components*i.byteLength;case Dc:return s*t*2/i.components*i.byteLength;case Ua:return s*t*2/i.components*i.byteLength;case Rc:return s*t*3/i.components*i.byteLength;case qe:return s*t*4/i.components*i.byteLength;case Na:return s*t*4/i.components*i.byteLength;case Ds:case Is:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Us:case Ns:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Kr:case Qr:return Math.max(s,16)*Math.max(t,8)/4;case jr:case Jr:return Math.max(s,8)*Math.max(t,8)/2;case ta:case ea:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case na:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ia:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case oa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ca:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case la:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ha:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ua:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case da:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case fa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case pa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ma:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ga:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Os:case va:case _a:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ic:case xa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ya:case Ma:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pm(s){switch(s){case pn:case wc:return{byteLength:1,components:1};case $i:case bc:case ji:return{byteLength:2,components:1};case La:case Da:return{byteLength:2,components:4};case Wn:case Pa:case ln:return{byteLength:4,components:1};case Tc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function mm(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):zs("canvas")}function v(b,_,O){let Y=1;const j=Mt(b);if((j.width>O||j.height>O)&&(Y=O/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(Y*j.width),_t=Math.floor(Y*j.height);h===void 0&&(h=g(X,_t));const at=_?g(X,_t):h;return at.width=X,at.height=_t,at.getContext("2d").drawImage(b,0,0,X,_t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+_t+")."),at}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){s.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?s.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(b,_,O,Y,j=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=_;if(_===s.RED&&(O===s.FLOAT&&(X=s.R32F),O===s.HALF_FLOAT&&(X=s.R16F),O===s.UNSIGNED_BYTE&&(X=s.R8)),_===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(X=s.R8UI),O===s.UNSIGNED_SHORT&&(X=s.R16UI),O===s.UNSIGNED_INT&&(X=s.R32UI),O===s.BYTE&&(X=s.R8I),O===s.SHORT&&(X=s.R16I),O===s.INT&&(X=s.R32I)),_===s.RG&&(O===s.FLOAT&&(X=s.RG32F),O===s.HALF_FLOAT&&(X=s.RG16F),O===s.UNSIGNED_BYTE&&(X=s.RG8)),_===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(X=s.RG8UI),O===s.UNSIGNED_SHORT&&(X=s.RG16UI),O===s.UNSIGNED_INT&&(X=s.RG32UI),O===s.BYTE&&(X=s.RG8I),O===s.SHORT&&(X=s.RG16I),O===s.INT&&(X=s.RG32I)),_===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(X=s.RGB8UI),O===s.UNSIGNED_SHORT&&(X=s.RGB16UI),O===s.UNSIGNED_INT&&(X=s.RGB32UI),O===s.BYTE&&(X=s.RGB8I),O===s.SHORT&&(X=s.RGB16I),O===s.INT&&(X=s.RGB32I)),_===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(X=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(X=s.RGBA16UI),O===s.UNSIGNED_INT&&(X=s.RGBA32UI),O===s.BYTE&&(X=s.RGBA8I),O===s.SHORT&&(X=s.RGBA16I),O===s.INT&&(X=s.RGBA32I)),_===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&(X=s.RGB9_E5),_===s.RGBA){const _t=j?Ys:Ht.getTransfer(Y);O===s.FLOAT&&(X=s.RGBA32F),O===s.HALF_FLOAT&&(X=s.RGBA16F),O===s.UNSIGNED_BYTE&&(X=_t===Zt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(X=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(X=s.RGB5_A1)}return(X===s.R16F||X===s.R32F||X===s.RG16F||X===s.RG32F||X===s.RGBA16F||X===s.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(b,_){let O;return b?_===null||_===Wn||_===Si?O=s.DEPTH24_STENCIL8:_===ln?O=s.DEPTH32F_STENCIL8:_===$i&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Wn||_===Si?O=s.DEPTH_COMPONENT24:_===ln?O=s.DEPTH_COMPONENT32F:_===$i&&(O=s.DEPTH_COMPONENT16),O}function N(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ye&&b.minFilter!==Je?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){const _=b.target;_.removeEventListener("dispose",A),I(_),_.isVideoTexture&&u.delete(_)}function R(b){const _=b.target;_.removeEventListener("dispose",R),y(_)}function I(b){const _=n.get(b);if(_.__webglInit===void 0)return;const O=b.source,Y=f.get(O);if(Y){const j=Y[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(b),Object.keys(Y).length===0&&f.delete(O)}n.remove(b)}function S(b){const _=n.get(b);s.deleteTexture(_.__webglTexture);const O=b.source,Y=f.get(O);delete Y[_.__cacheKey],a.memory.textures--}function y(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let j=0;j<_.__webglFramebuffer[Y].length;j++)s.deleteFramebuffer(_.__webglFramebuffer[Y][j]);else s.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)s.deleteFramebuffer(_.__webglFramebuffer[Y]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=b.textures;for(let Y=0,j=O.length;Y<j;Y++){const X=n.get(O[Y]);X.__webglTexture&&(s.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(O[Y])}n.remove(b)}let C=0;function k(){C=0}function z(){const b=C;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),C+=1,b}function W(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function Z(b,_){const O=n.get(b);if(b.isVideoTexture&&St(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(O,b,_);return}}e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+_)}function G(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){q(O,b,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+_)}function K(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){q(O,b,_);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+_)}function H(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){tt(O,b,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+_)}const st={[$r]:s.REPEAT,[Hn]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},ht={[Ye]:s.NEAREST,[kl]:s.NEAREST_MIPMAP_NEAREST,[ss]:s.NEAREST_MIPMAP_LINEAR,[Je]:s.LINEAR,[Qs]:s.LINEAR_MIPMAP_NEAREST,[Gn]:s.LINEAR_MIPMAP_LINEAR},yt={[Wl]:s.NEVER,[jl]:s.ALWAYS,[Xl]:s.LESS,[Uc]:s.LEQUAL,[ql]:s.EQUAL,[Zl]:s.GEQUAL,[Yl]:s.GREATER,[$l]:s.NOTEQUAL};function Nt(b,_){if(_.type===ln&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Je||_.magFilter===Qs||_.magFilter===ss||_.magFilter===Gn||_.minFilter===Je||_.minFilter===Qs||_.minFilter===ss||_.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,st[_.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,st[_.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,st[_.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,ht[_.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,ht[_.minFilter]),_.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,yt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ye||_.minFilter!==ss&&_.minFilter!==Gn||_.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Jt(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let j=f.get(Y);j===void 0&&(j={},f.set(Y,j));const X=W(_);if(X!==b.__cacheKey){j[X]===void 0&&(j[X]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),j[X].usedTimes++;const _t=j[b.__cacheKey];_t!==void 0&&(j[b.__cacheKey].usedTimes--,_t.usedTimes===0&&S(_)),b.__cacheKey=X,b.__webglTexture=j[X].texture}return O}function q(b,_,O){let Y=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=s.TEXTURE_3D);const j=Jt(b,_),X=_.source;e.bindTexture(Y,b.__webglTexture,s.TEXTURE0+O);const _t=n.get(X);if(X.version!==_t.__version||j===!0){e.activeTexture(s.TEXTURE0+O);const at=Ht.getPrimaries(Ht.workingColorSpace),ut=_.colorSpace===bn?null:Ht.getPrimaries(_.colorSpace),Vt=_.colorSpace===bn||at===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let J=v(_.image,!1,i.maxTextureSize);J=ne(_,J);const dt=r.convert(_.format,_.colorSpace),Et=r.convert(_.type);let bt=T(_.internalFormat,dt,Et,_.colorSpace,_.isVideoTexture);Nt(Y,_);let ft;const zt=_.mipmaps,Dt=_.isVideoTexture!==!0,te=_t.__version===void 0||j===!0,P=X.dataReady,it=N(_,J);if(_.isDepthTexture)bt=M(_.format===Ei,_.type),te&&(Dt?e.texStorage2D(s.TEXTURE_2D,1,bt,J.width,J.height):e.texImage2D(s.TEXTURE_2D,0,bt,J.width,J.height,0,dt,Et,null));else if(_.isDataTexture)if(zt.length>0){Dt&&te&&e.texStorage2D(s.TEXTURE_2D,it,bt,zt[0].width,zt[0].height);for(let V=0,$=zt.length;V<$;V++)ft=zt[V],Dt?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,ft.width,ft.height,dt,Et,ft.data):e.texImage2D(s.TEXTURE_2D,V,bt,ft.width,ft.height,0,dt,Et,ft.data);_.generateMipmaps=!1}else Dt?(te&&e.texStorage2D(s.TEXTURE_2D,it,bt,J.width,J.height),P&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,J.width,J.height,dt,Et,J.data)):e.texImage2D(s.TEXTURE_2D,0,bt,J.width,J.height,0,dt,Et,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Dt&&te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,it,bt,zt[0].width,zt[0].height,J.depth);for(let V=0,$=zt.length;V<$;V++)if(ft=zt[V],_.format!==qe)if(dt!==null)if(Dt){if(P)if(_.layerUpdates.size>0){const lt=ec(ft.width,ft.height,_.format,_.type);for(const ot of _.layerUpdates){const Ct=ft.data.subarray(ot*lt/ft.data.BYTES_PER_ELEMENT,(ot+1)*lt/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,ot,ft.width,ft.height,1,dt,Ct)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,ft.width,ft.height,J.depth,dt,ft.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,bt,ft.width,ft.height,J.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?P&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,ft.width,ft.height,J.depth,dt,Et,ft.data):e.texImage3D(s.TEXTURE_2D_ARRAY,V,bt,ft.width,ft.height,J.depth,0,dt,Et,ft.data)}else{Dt&&te&&e.texStorage2D(s.TEXTURE_2D,it,bt,zt[0].width,zt[0].height);for(let V=0,$=zt.length;V<$;V++)ft=zt[V],_.format!==qe?dt!==null?Dt?P&&e.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,ft.width,ft.height,dt,ft.data):e.compressedTexImage2D(s.TEXTURE_2D,V,bt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,ft.width,ft.height,dt,Et,ft.data):e.texImage2D(s.TEXTURE_2D,V,bt,ft.width,ft.height,0,dt,Et,ft.data)}else if(_.isDataArrayTexture)if(Dt){if(te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,it,bt,J.width,J.height,J.depth),P)if(_.layerUpdates.size>0){const V=ec(J.width,J.height,_.format,_.type);for(const $ of _.layerUpdates){const lt=J.data.subarray($*V/J.data.BYTES_PER_ELEMENT,($+1)*V/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,J.width,J.height,1,dt,Et,lt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,dt,Et,J.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,bt,J.width,J.height,J.depth,0,dt,Et,J.data);else if(_.isData3DTexture)Dt?(te&&e.texStorage3D(s.TEXTURE_3D,it,bt,J.width,J.height,J.depth),P&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,dt,Et,J.data)):e.texImage3D(s.TEXTURE_3D,0,bt,J.width,J.height,J.depth,0,dt,Et,J.data);else if(_.isFramebufferTexture){if(te)if(Dt)e.texStorage2D(s.TEXTURE_2D,it,bt,J.width,J.height);else{let V=J.width,$=J.height;for(let lt=0;lt<it;lt++)e.texImage2D(s.TEXTURE_2D,lt,bt,V,$,0,dt,Et,null),V>>=1,$>>=1}}else if(zt.length>0){if(Dt&&te){const V=Mt(zt[0]);e.texStorage2D(s.TEXTURE_2D,it,bt,V.width,V.height)}for(let V=0,$=zt.length;V<$;V++)ft=zt[V],Dt?P&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,dt,Et,ft):e.texImage2D(s.TEXTURE_2D,V,bt,dt,Et,ft);_.generateMipmaps=!1}else if(Dt){if(te){const V=Mt(J);e.texStorage2D(s.TEXTURE_2D,it,bt,V.width,V.height)}P&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,dt,Et,J)}else e.texImage2D(s.TEXTURE_2D,0,bt,dt,Et,J);m(_)&&d(Y),_t.__version=X.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function tt(b,_,O){if(_.image.length!==6)return;const Y=Jt(b,_),j=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+O);const X=n.get(j);if(j.version!==X.__version||Y===!0){e.activeTexture(s.TEXTURE0+O);const _t=Ht.getPrimaries(Ht.workingColorSpace),at=_.colorSpace===bn?null:Ht.getPrimaries(_.colorSpace),ut=_.colorSpace===bn||_t===at?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Vt=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,dt=[];for(let $=0;$<6;$++)!Vt&&!J?dt[$]=v(_.image[$],!0,i.maxCubemapSize):dt[$]=J?_.image[$].image:_.image[$],dt[$]=ne(_,dt[$]);const Et=dt[0],bt=r.convert(_.format,_.colorSpace),ft=r.convert(_.type),zt=T(_.internalFormat,bt,ft,_.colorSpace),Dt=_.isVideoTexture!==!0,te=X.__version===void 0||Y===!0,P=j.dataReady;let it=N(_,Et);Nt(s.TEXTURE_CUBE_MAP,_);let V;if(Vt){Dt&&te&&e.texStorage2D(s.TEXTURE_CUBE_MAP,it,zt,Et.width,Et.height);for(let $=0;$<6;$++){V=dt[$].mipmaps;for(let lt=0;lt<V.length;lt++){const ot=V[lt];_.format!==qe?bt!==null?Dt?P&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,0,0,ot.width,ot.height,bt,ot.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,zt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,0,0,ot.width,ot.height,bt,ft,ot.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,zt,ot.width,ot.height,0,bt,ft,ot.data)}}}else{if(V=_.mipmaps,Dt&&te){V.length>0&&it++;const $=Mt(dt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,it,zt,$.width,$.height)}for(let $=0;$<6;$++)if(J){Dt?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,dt[$].width,dt[$].height,bt,ft,dt[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,zt,dt[$].width,dt[$].height,0,bt,ft,dt[$].data);for(let lt=0;lt<V.length;lt++){const Ct=V[lt].image[$].image;Dt?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,0,0,Ct.width,Ct.height,bt,ft,Ct.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,zt,Ct.width,Ct.height,0,bt,ft,Ct.data)}}else{Dt?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,bt,ft,dt[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,zt,bt,ft,dt[$]);for(let lt=0;lt<V.length;lt++){const ot=V[lt];Dt?P&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,0,0,bt,ft,ot.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,zt,bt,ft,ot.image[$])}}}m(_)&&d(s.TEXTURE_CUBE_MAP),X.__version=j.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function vt(b,_,O,Y,j,X){const _t=r.convert(O.format,O.colorSpace),at=r.convert(O.type),ut=T(O.internalFormat,_t,at,O.colorSpace),Vt=n.get(_),J=n.get(O);if(J.__renderTarget=_,!Vt.__hasExternalTextures){const dt=Math.max(1,_.width>>X),Et=Math.max(1,_.height>>X);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,X,ut,dt,Et,_.depth,0,_t,at,null):e.texImage2D(j,X,ut,dt,Et,0,_t,at,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),Bt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,j,J.__webglTexture,0,Ft(_)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,j,J.__webglTexture,X),e.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(b,_,O){if(s.bindRenderbuffer(s.RENDERBUFFER,b),_.depthBuffer){const Y=_.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,X=M(_.stencilBuffer,j),_t=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=Ft(_);Bt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,at,X,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,at,X,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,X,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,_t,s.RENDERBUFFER,b)}else{const Y=_.textures;for(let j=0;j<Y.length;j++){const X=Y[j],_t=r.convert(X.format,X.colorSpace),at=r.convert(X.type),ut=T(X.internalFormat,_t,at,X.colorSpace),Vt=Ft(_);O&&Bt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Vt,ut,_.width,_.height):Bt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Vt,ut,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,ut,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function wt(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z(_.depthTexture,0);const j=Y.__webglTexture,X=Ft(_);if(_.depthTexture.format===gi)Bt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(_.depthTexture.format===Ei)Bt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function At(b){const _=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Y}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");wt(_.__webglFramebuffer,b)}else if(O){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=s.createRenderbuffer(),rt(_.__webglDepthbuffer[Y],b,!1);else{const j=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[Y];s.bindRenderbuffer(s.RENDERBUFFER,X),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,X)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),rt(_.__webglDepthbuffer,b,!1);else{const Y=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,j)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ot(b,_,O){const Y=n.get(b);_!==void 0&&vt(Y.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&At(b)}function ae(b){const _=b.texture,O=n.get(b),Y=n.get(_);b.addEventListener("dispose",R);const j=b.textures,X=b.isWebGLCubeRenderTarget===!0,_t=j.length>1;if(_t||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=_.version,a.memory.textures++),X){O.__webglFramebuffer=[];for(let at=0;at<6;at++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[at]=[];for(let ut=0;ut<_.mipmaps.length;ut++)O.__webglFramebuffer[at][ut]=s.createFramebuffer()}else O.__webglFramebuffer[at]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let at=0;at<_.mipmaps.length;at++)O.__webglFramebuffer[at]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(_t)for(let at=0,ut=j.length;at<ut;at++){const Vt=n.get(j[at]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=s.createTexture(),a.memory.textures++)}if(b.samples>0&&Bt(b)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let at=0;at<j.length;at++){const ut=j[at];O.__webglColorRenderbuffer[at]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[at]);const Vt=r.convert(ut.format,ut.colorSpace),J=r.convert(ut.type),dt=T(ut.internalFormat,Vt,J,ut.colorSpace,b.isXRRenderTarget===!0),Et=Ft(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Et,dt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,O.__webglColorRenderbuffer[at])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),rt(O.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(X){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Nt(s.TEXTURE_CUBE_MAP,_);for(let at=0;at<6;at++)if(_.mipmaps&&_.mipmaps.length>0)for(let ut=0;ut<_.mipmaps.length;ut++)vt(O.__webglFramebuffer[at][ut],b,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,ut);else vt(O.__webglFramebuffer[at],b,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(_)&&d(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let at=0,ut=j.length;at<ut;at++){const Vt=j[at],J=n.get(Vt);e.bindTexture(s.TEXTURE_2D,J.__webglTexture),Nt(s.TEXTURE_2D,Vt),vt(O.__webglFramebuffer,b,Vt,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,0),m(Vt)&&d(s.TEXTURE_2D)}e.unbindTexture()}else{let at=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(at=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(at,Y.__webglTexture),Nt(at,_),_.mipmaps&&_.mipmaps.length>0)for(let ut=0;ut<_.mipmaps.length;ut++)vt(O.__webglFramebuffer[ut],b,_,s.COLOR_ATTACHMENT0,at,ut);else vt(O.__webglFramebuffer,b,_,s.COLOR_ATTACHMENT0,at,0);m(_)&&d(at),e.unbindTexture()}b.depthBuffer&&At(b)}function kt(b){const _=b.textures;for(let O=0,Y=_.length;O<Y;O++){const j=_[O];if(m(j)){const X=E(b),_t=n.get(j).__webglTexture;e.bindTexture(X,_t),d(X),e.unbindTexture()}}}const ce=[],U=[];function Ue(b){if(b.samples>0){if(Bt(b)===!1){const _=b.textures,O=b.width,Y=b.height;let j=s.COLOR_BUFFER_BIT;const X=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=n.get(b),at=_.length>1;if(at)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),at){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,_t.__webglColorRenderbuffer[ut]);const Vt=n.get(_[ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Vt,0)}s.blitFramebuffer(0,0,O,Y,0,0,O,Y,j,s.NEAREST),c===!0&&(ce.length=0,U.length=0,ce.push(s.COLOR_ATTACHMENT0+ut),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ce.push(X),U.push(X),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,U)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ce))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),at)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,_t.__webglColorRenderbuffer[ut]);const Vt=n.get(_[ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,Vt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function Ft(b){return Math.min(i.maxSamples,b.samples)}function Bt(b){const _=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function St(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function ne(b,_){const O=b.colorSpace,Y=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==Ai&&O!==bn&&(Ht.getTransfer(O)===Zt?(Y!==qe||j!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),_}function Mt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=Z,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=Ot,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Bt}function gm(s,t){function e(n,i=bn){let r;const a=Ht.getTransfer(i);if(n===pn)return s.UNSIGNED_BYTE;if(n===La)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Da)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===wc)return s.BYTE;if(n===bc)return s.SHORT;if(n===$i)return s.UNSIGNED_SHORT;if(n===Pa)return s.INT;if(n===Wn)return s.UNSIGNED_INT;if(n===ln)return s.FLOAT;if(n===ji)return s.HALF_FLOAT;if(n===Ac)return s.ALPHA;if(n===Rc)return s.RGB;if(n===qe)return s.RGBA;if(n===Cc)return s.LUMINANCE;if(n===Pc)return s.LUMINANCE_ALPHA;if(n===gi)return s.DEPTH_COMPONENT;if(n===Ei)return s.DEPTH_STENCIL;if(n===Lc)return s.RED;if(n===Ia)return s.RED_INTEGER;if(n===Dc)return s.RG;if(n===Ua)return s.RG_INTEGER;if(n===Na)return s.RGBA_INTEGER;if(n===Ds||n===Is||n===Us||n===Ns)if(a===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jr||n===Kr||n===Jr||n===Qr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ta||n===ea)return a===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===na)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ia||n===sa||n===ra||n===aa||n===oa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ia)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ra)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===aa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ca)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===la)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ha)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ua)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===da)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pa)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ma)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ga)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Os||n===va||n===_a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Os)return a===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ic||n===xa||n===ya||n===Ma)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Os)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Si?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class vm extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _m={type:"move"};class Tr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),d=this._getHandJoint(l,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_m)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ym=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Mm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new be,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Rn({vertexShader:xm,fragmentShader:ym,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ut(new bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sm extends Ri{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null;const v=new Mm,m=e.getContextAttributes();let d=null,E=null;const T=[],M=[],N=new nt;let A=null;const R=new De;R.viewport=new Kt;const I=new De;I.viewport=new Kt;const S=[R,I],y=new vm;let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=T[q];return tt===void 0&&(tt=new Tr,T[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=T[q];return tt===void 0&&(tt=new Tr,T[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=T[q];return tt===void 0&&(tt=new Tr,T[q]=tt),tt.getHandSpace()};function z(q){const tt=M.indexOf(q.inputSource);if(tt===-1)return;const vt=T[tt];vt!==void 0&&(vt.update(q.inputSource,q.frame,l||a),vt.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Z);for(let q=0;q<T.length;q++){const tt=M[q];tt!==null&&(M[q]=null,T[q].disconnect(tt))}C=null,k=null,v.reset(),t.setRenderTarget(d),p=null,f=null,h=null,i=null,E=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(N),i.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Xn(p.framebufferWidth,p.framebufferHeight,{format:qe,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,vt=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?Ei:gi,vt=m.stencil?Si:Wn);const wt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(wt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new Xn(f.textureWidth,f.textureHeight,{format:qe,type:pn,depthTexture:new qc(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Jt.setContext(i),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(q){for(let tt=0;tt<q.removed.length;tt++){const vt=q.removed[tt],rt=M.indexOf(vt);rt>=0&&(M[rt]=null,T[rt].disconnect(vt))}for(let tt=0;tt<q.added.length;tt++){const vt=q.added[tt];let rt=M.indexOf(vt);if(rt===-1){for(let At=0;At<T.length;At++)if(At>=M.length){M.push(vt),rt=At;break}else if(M[At]===null){M[At]=vt,rt=At;break}if(rt===-1)break}const wt=T[rt];wt&&wt.connect(vt)}}const G=new w,K=new w;function H(q,tt,vt){G.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(vt.matrixWorld);const rt=G.distanceTo(K),wt=tt.projectionMatrix.elements,At=vt.projectionMatrix.elements,Ot=wt[14]/(wt[10]-1),ae=wt[14]/(wt[10]+1),kt=(wt[9]+1)/wt[5],ce=(wt[9]-1)/wt[5],U=(wt[8]-1)/wt[0],Ue=(At[8]+1)/At[0],Ft=Ot*U,Bt=Ot*Ue,St=rt/(-U+Ue),ne=St*-U;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ne),q.translateZ(St),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),wt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Mt=Ot+St,b=ae+St,_=Ft-ne,O=Bt+(rt-ne),Y=kt*ae/b*Mt,j=ce*ae/b*Mt;q.projectionMatrix.makePerspective(_,O,Y,j,Mt,b),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function st(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let tt=q.near,vt=q.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(vt=v.depthFar)),y.near=I.near=R.near=tt,y.far=I.far=R.far=vt,(C!==y.near||k!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,k=y.far),R.layers.mask=q.layers.mask|2,I.layers.mask=q.layers.mask|4,y.layers.mask=R.layers.mask|I.layers.mask;const rt=q.parent,wt=y.cameras;st(y,rt);for(let At=0;At<wt.length;At++)st(wt[At],rt);wt.length===2?H(y,R,I):y.projectionMatrix.copy(R.projectionMatrix),ht(q,y,rt)};function ht(q,tt,vt){vt===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(vt.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Zi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let yt=null;function Nt(q,tt){if(u=tt.getViewerPose(l||a),g=tt,u!==null){const vt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let rt=!1;vt.length!==y.cameras.length&&(y.cameras.length=0,rt=!0);for(let At=0;At<vt.length;At++){const Ot=vt[At];let ae=null;if(p!==null)ae=p.getViewport(Ot);else{const ce=h.getViewSubImage(f,Ot);ae=ce.viewport,At===0&&(t.setRenderTargetTextures(E,ce.colorTexture,f.ignoreDepthValues?void 0:ce.depthStencilTexture),t.setRenderTarget(E))}let kt=S[At];kt===void 0&&(kt=new De,kt.layers.enable(At),kt.viewport=new Kt,S[At]=kt),kt.matrix.fromArray(Ot.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Ot.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(ae.x,ae.y,ae.width,ae.height),At===0&&(y.matrix.copy(kt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),rt===!0&&y.cameras.push(kt)}const wt=i.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const At=h.getDepthInformation(vt[0]);At&&At.isValid&&At.texture&&v.init(t,At,i.renderState)}}for(let vt=0;vt<T.length;vt++){const rt=M[vt],wt=T[vt];rt!==null&&wt!==void 0&&wt.update(rt,tt,l||a)}yt&&yt(q,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Jt=new Wc;Jt.setAnimationLoop(Nt),this.setAnimationLoop=function(q){yt=q},this.dispose=function(){}}}const Fn=new Ze,Em=new Qt;function wm(s,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Vc(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,E,T,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,E,T):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Re&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Re&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const E=t.get(d),T=E.envMap,M=E.envMapRotation;T&&(m.envMap.value=T,Fn.copy(M),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),m.envMapRotation.value.setFromMatrix4(Em.makeRotationFromEuler(Fn)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,E,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=T*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Re&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const E=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bm(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,T){const M=T.program;n.uniformBlockBinding(E,M)}function l(E,T){let M=i[E.id];M===void 0&&(g(E),M=u(E),i[E.id]=M,E.addEventListener("dispose",m));const N=T.program;n.updateUBOMapping(E,N);const A=t.render.frame;r[E.id]!==A&&(f(E),r[E.id]=A)}function u(E){const T=h();E.__bindingPointIndex=T;const M=s.createBuffer(),N=E.__size,A=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,N,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,M),M}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const T=i[E.id],M=E.uniforms,N=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let A=0,R=M.length;A<R;A++){const I=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,y=I.length;S<y;S++){const C=I[S];if(p(C,A,S,N)===!0){const k=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let Z=0;Z<z.length;Z++){const G=z[Z],K=v(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,k+W,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(E,T,M,N){const A=E.value,R=T+"_"+M;if(N[R]===void 0)return typeof A=="number"||typeof A=="boolean"?N[R]=A:N[R]=A.clone(),!0;{const I=N[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return N[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(E){const T=E.uniforms;let M=0;const N=16;for(let R=0,I=T.length;R<I;R++){const S=Array.isArray(T[R])?T[R]:[T[R]];for(let y=0,C=S.length;y<C;y++){const k=S[y],z=Array.isArray(k.value)?k.value:[k.value];for(let W=0,Z=z.length;W<Z;W++){const G=z[W],K=v(G),H=M%N,st=H%K.boundary,ht=H+st;M+=st,ht!==0&&N-ht<K.storage&&(M+=N-ht),k.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=K.storage}}}const A=M%N;return A>0&&(M+=N-A),E.__size=M,E.__cache={},this}function v(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function m(E){const T=E.target;T.removeEventListener("dispose",m);const M=a.indexOf(T.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function d(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}class Tm{constructor(t={}){const{canvas:e=fh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const E=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this.toneMapping=un,this.toneMappingExposure=1;const M=this;let N=!1,A=0,R=0,I=null,S=-1,y=null;const C=new Kt,k=new Kt;let z=null;const W=new Rt(0);let Z=0,G=e.width,K=e.height,H=1,st=null,ht=null;const yt=new Kt(0,0,G,K),Nt=new Kt(0,0,G,K);let Jt=!1;const q=new ka;let tt=!1,vt=!1;const rt=new Qt,wt=new Qt,At=new w,Ot=new Kt,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function ce(){return I===null?H:1}let U=n;function Ue(x,L){return e.getContext(x,L)}try{const x={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ra}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",ot,!1),U===null){const L="webgl2";if(U=Ue(L,x),U===null)throw Ue(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ft,Bt,St,ne,Mt,b,_,O,Y,j,X,_t,at,ut,Vt,J,dt,Et,bt,ft,zt,Dt,te,P;function it(){Ft=new Lf(U),Ft.init(),Dt=new gm(U,Ft),Bt=new bf(U,Ft,t,Dt),St=new fm(U,Ft),Bt.reverseDepthBuffer&&f&&St.buffers.depth.setReversed(!0),ne=new Uf(U),Mt=new Jp,b=new mm(U,Ft,St,Mt,Bt,Dt,ne),_=new Af(M),O=new Pf(M),Y=new kh(U),te=new Ef(U,Y),j=new Df(U,Y,ne,te),X=new Of(U,j,Y,ne),bt=new Nf(U,Bt,b),J=new Tf(Mt),_t=new Kp(M,_,O,Ft,Bt,te,J),at=new wm(M,Mt),ut=new tm,Vt=new am(Ft),Et=new Sf(M,_,O,St,X,p,c),dt=new um(M,X,Bt),P=new bm(U,ne,Bt,St),ft=new wf(U,Ft,ne),zt=new If(U,Ft,ne),ne.programs=_t.programs,M.capabilities=Bt,M.extensions=Ft,M.properties=Mt,M.renderLists=ut,M.shadowMap=dt,M.state=St,M.info=ne}it();const V=new Sm(M,U);this.xr=V,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const x=Ft.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ft.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(G,K,!1))},this.getSize=function(x){return x.set(G,K)},this.setSize=function(x,L,F=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=x,K=L,e.width=Math.floor(x*H),e.height=Math.floor(L*H),F===!0&&(e.style.width=x+"px",e.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(G*H,K*H).floor()},this.setDrawingBufferSize=function(x,L,F){G=x,K=L,H=F,e.width=Math.floor(x*F),e.height=Math.floor(L*F),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(C)},this.getViewport=function(x){return x.copy(yt)},this.setViewport=function(x,L,F,B){x.isVector4?yt.set(x.x,x.y,x.z,x.w):yt.set(x,L,F,B),St.viewport(C.copy(yt).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Nt)},this.setScissor=function(x,L,F,B){x.isVector4?Nt.set(x.x,x.y,x.z,x.w):Nt.set(x,L,F,B),St.scissor(k.copy(Nt).multiplyScalar(H).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(x){St.setScissorTest(Jt=x)},this.setOpaqueSort=function(x){st=x},this.setTransparentSort=function(x){ht=x},this.getClearColor=function(x){return x.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(x=!0,L=!0,F=!0){let B=0;if(x){let D=!1;if(I!==null){const Q=I.texture.format;D=Q===Na||Q===Ua||Q===Ia}if(D){const Q=I.texture.type,ct=Q===pn||Q===Wn||Q===$i||Q===Si||Q===La||Q===Da,pt=Et.getClearColor(),mt=Et.getClearAlpha(),Tt=pt.r,Pt=pt.g,gt=pt.b;ct?(g[0]=Tt,g[1]=Pt,g[2]=gt,g[3]=mt,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=Tt,v[1]=Pt,v[2]=gt,v[3]=mt,U.clearBufferiv(U.COLOR,0,v))}else B|=U.COLOR_BUFFER_BIT}L&&(B|=U.DEPTH_BUFFER_BIT),F&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),ut.dispose(),Vt.dispose(),Mt.dispose(),_.dispose(),O.dispose(),X.dispose(),te.dispose(),P.dispose(),_t.dispose(),V.dispose(),V.removeEventListener("sessionstart",Za),V.removeEventListener("sessionend",ja),Ln.stop()};function $(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const x=ne.autoReset,L=dt.enabled,F=dt.autoUpdate,B=dt.needsUpdate,D=dt.type;it(),ne.autoReset=x,dt.enabled=L,dt.autoUpdate=F,dt.needsUpdate=B,dt.type=D}function ot(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ct(x){const L=x.target;L.removeEventListener("dispose",Ct),oe(L)}function oe(x){xe(x),Mt.remove(x)}function xe(x){const L=Mt.get(x).programs;L!==void 0&&(L.forEach(function(F){_t.releaseProgram(F)}),x.isShaderMaterial&&_t.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,F,B,D,Q){L===null&&(L=ae);const ct=D.isMesh&&D.matrixWorld.determinant()<0,pt=cl(x,L,F,B,D);St.setMaterial(B,ct);let mt=F.index,Tt=1;if(B.wireframe===!0){if(mt=j.getWireframeAttribute(F),mt===void 0)return;Tt=2}const Pt=F.drawRange,gt=F.attributes.position;let Gt=Pt.start*Tt,ee=(Pt.start+Pt.count)*Tt;Q!==null&&(Gt=Math.max(Gt,Q.start*Tt),ee=Math.min(ee,(Q.start+Q.count)*Tt)),mt!==null?(Gt=Math.max(Gt,0),ee=Math.min(ee,mt.count)):gt!=null&&(Gt=Math.max(Gt,0),ee=Math.min(ee,gt.count));const ie=ee-Gt;if(ie<0||ie===1/0)return;te.setup(D,B,pt,F,mt);let Te,Wt=ft;if(mt!==null&&(Te=Y.get(mt),Wt=zt,Wt.setIndex(Te)),D.isMesh)B.wireframe===!0?(St.setLineWidth(B.wireframeLinewidth*ce()),Wt.setMode(U.LINES)):Wt.setMode(U.TRIANGLES);else if(D.isLine){let xt=B.linewidth;xt===void 0&&(xt=1),St.setLineWidth(xt*ce()),D.isLineSegments?Wt.setMode(U.LINES):D.isLineLoop?Wt.setMode(U.LINE_LOOP):Wt.setMode(U.LINE_STRIP)}else D.isPoints?Wt.setMode(U.POINTS):D.isSprite&&Wt.setMode(U.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)Wt.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))Wt.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const xt=D._multiDrawStarts,en=D._multiDrawCounts,Xt=D._multiDrawCount,ke=mt?Y.get(mt).bytesPerElement:1,$n=Mt.get(B).currentProgram.getUniforms();for(let Ce=0;Ce<Xt;Ce++)$n.setValue(U,"_gl_DrawID",Ce),Wt.render(xt[Ce]/ke,en[Ce])}else if(D.isInstancedMesh)Wt.renderInstances(Gt,ie,D.count);else if(F.isInstancedBufferGeometry){const xt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,en=Math.min(F.instanceCount,xt);Wt.renderInstances(Gt,ie,en)}else Wt.render(Gt,ie)};function qt(x,L,F){x.transparent===!0&&x.side===Ie&&x.forceSinglePass===!1?(x.side=Re,x.needsUpdate=!0,is(x,L,F),x.side=An,x.needsUpdate=!0,is(x,L,F),x.side=Ie):is(x,L,F)}this.compile=function(x,L,F=null){F===null&&(F=x),d=Vt.get(F),d.init(L),T.push(d),F.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),x!==F&&x.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),d.setupLights();const B=new Set;return x.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const Q=D.material;if(Q)if(Array.isArray(Q))for(let ct=0;ct<Q.length;ct++){const pt=Q[ct];qt(pt,F,D),B.add(pt)}else qt(Q,F,D),B.add(Q)}),T.pop(),d=null,B},this.compileAsync=function(x,L,F=null){const B=this.compile(x,L,F);return new Promise(D=>{function Q(){if(B.forEach(function(ct){Mt.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){D(x);return}setTimeout(Q,10)}Ft.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ze=null;function tn(x){ze&&ze(x)}function Za(){Ln.stop()}function ja(){Ln.start()}const Ln=new Wc;Ln.setAnimationLoop(tn),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(x){ze=x,V.setAnimationLoop(x),x===null?Ln.stop():Ln.start()},V.addEventListener("sessionstart",Za),V.addEventListener("sessionend",ja),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(L),L=V.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,L,I),d=Vt.get(x,T.length),d.init(L),T.push(d),wt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),q.setFromProjectionMatrix(wt),vt=this.localClippingEnabled,tt=J.init(this.clippingPlanes,vt),m=ut.get(x,E.length),m.init(),E.push(m),V.enabled===!0&&V.isPresenting===!0){const Q=M.xr.getDepthSensingMesh();Q!==null&&Js(Q,L,-1/0,M.sortObjects)}Js(x,L,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(st,ht),kt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,kt&&Et.addToRenderList(m,x),this.info.render.frame++,tt===!0&&J.beginShadows();const F=d.state.shadowsArray;dt.render(F,x,L),tt===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,D=m.transmissive;if(d.setupLights(),L.isArrayCamera){const Q=L.cameras;if(D.length>0)for(let ct=0,pt=Q.length;ct<pt;ct++){const mt=Q[ct];Ja(B,D,x,mt)}kt&&Et.render(x);for(let ct=0,pt=Q.length;ct<pt;ct++){const mt=Q[ct];Ka(m,x,mt,mt.viewport)}}else D.length>0&&Ja(B,D,x,L),kt&&Et.render(x),Ka(m,x,L);I!==null&&(b.updateMultisampleRenderTarget(I),b.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(M,x,L),te.resetDefaultState(),S=-1,y=null,T.pop(),T.length>0?(d=T[T.length-1],tt===!0&&J.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Js(x,L,F,B){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||q.intersectsSprite(x)){B&&Ot.setFromMatrixPosition(x.matrixWorld).applyMatrix4(wt);const ct=X.update(x),pt=x.material;pt.visible&&m.push(x,ct,pt,F,Ot.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||q.intersectsObject(x))){const ct=X.update(x),pt=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ot.copy(x.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Ot.copy(ct.boundingSphere.center)),Ot.applyMatrix4(x.matrixWorld).applyMatrix4(wt)),Array.isArray(pt)){const mt=ct.groups;for(let Tt=0,Pt=mt.length;Tt<Pt;Tt++){const gt=mt[Tt],Gt=pt[gt.materialIndex];Gt&&Gt.visible&&m.push(x,ct,Gt,F,Ot.z,gt)}}else pt.visible&&m.push(x,ct,pt,F,Ot.z,null)}}const Q=x.children;for(let ct=0,pt=Q.length;ct<pt;ct++)Js(Q[ct],L,F,B)}function Ka(x,L,F,B){const D=x.opaque,Q=x.transmissive,ct=x.transparent;d.setupLightsView(F),tt===!0&&J.setGlobalState(M.clippingPlanes,F),B&&St.viewport(C.copy(B)),D.length>0&&ns(D,L,F),Q.length>0&&ns(Q,L,F),ct.length>0&&ns(ct,L,F),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function Ja(x,L,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Xn(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?ji:pn,minFilter:Gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ht.workingColorSpace}));const Q=d.state.transmissionRenderTarget[B.id],ct=B.viewport||C;Q.setSize(ct.z,ct.w);const pt=M.getRenderTarget();M.setRenderTarget(Q),M.getClearColor(W),Z=M.getClearAlpha(),Z<1&&M.setClearColor(16777215,.5),M.clear(),kt&&Et.render(F);const mt=M.toneMapping;M.toneMapping=un;const Tt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),tt===!0&&J.setGlobalState(M.clippingPlanes,B),ns(x,F,B),b.updateMultisampleRenderTarget(Q),b.updateRenderTargetMipmap(Q),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let gt=0,Gt=L.length;gt<Gt;gt++){const ee=L[gt],ie=ee.object,Te=ee.geometry,Wt=ee.material,xt=ee.group;if(Wt.side===Ie&&ie.layers.test(B.layers)){const en=Wt.side;Wt.side=Re,Wt.needsUpdate=!0,Qa(ie,F,B,Te,Wt,xt),Wt.side=en,Wt.needsUpdate=!0,Pt=!0}}Pt===!0&&(b.updateMultisampleRenderTarget(Q),b.updateRenderTargetMipmap(Q))}M.setRenderTarget(pt),M.setClearColor(W,Z),Tt!==void 0&&(B.viewport=Tt),M.toneMapping=mt}function ns(x,L,F){const B=L.isScene===!0?L.overrideMaterial:null;for(let D=0,Q=x.length;D<Q;D++){const ct=x[D],pt=ct.object,mt=ct.geometry,Tt=B===null?ct.material:B,Pt=ct.group;pt.layers.test(F.layers)&&Qa(pt,L,F,mt,Tt,Pt)}}function Qa(x,L,F,B,D,Q){x.onBeforeRender(M,L,F,B,D,Q),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),D.onBeforeRender(M,L,F,B,x,Q),D.transparent===!0&&D.side===Ie&&D.forceSinglePass===!1?(D.side=Re,D.needsUpdate=!0,M.renderBufferDirect(F,L,B,D,x,Q),D.side=An,D.needsUpdate=!0,M.renderBufferDirect(F,L,B,D,x,Q),D.side=Ie):M.renderBufferDirect(F,L,B,D,x,Q),x.onAfterRender(M,L,F,B,D,Q)}function is(x,L,F){L.isScene!==!0&&(L=ae);const B=Mt.get(x),D=d.state.lights,Q=d.state.shadowsArray,ct=D.state.version,pt=_t.getParameters(x,D.state,Q,L,F),mt=_t.getProgramCacheKey(pt);let Tt=B.programs;B.environment=x.isMeshStandardMaterial?L.environment:null,B.fog=L.fog,B.envMap=(x.isMeshStandardMaterial?O:_).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,Tt===void 0&&(x.addEventListener("dispose",Ct),Tt=new Map,B.programs=Tt);let Pt=Tt.get(mt);if(Pt!==void 0){if(B.currentProgram===Pt&&B.lightsStateVersion===ct)return eo(x,pt),Pt}else pt.uniforms=_t.getUniforms(x),x.onBeforeCompile(pt,M),Pt=_t.acquireProgram(pt,mt),Tt.set(mt,Pt),B.uniforms=pt.uniforms;const gt=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(gt.clippingPlanes=J.uniform),eo(x,pt),B.needsLights=hl(x),B.lightsStateVersion=ct,B.needsLights&&(gt.ambientLightColor.value=D.state.ambient,gt.lightProbe.value=D.state.probe,gt.directionalLights.value=D.state.directional,gt.directionalLightShadows.value=D.state.directionalShadow,gt.spotLights.value=D.state.spot,gt.spotLightShadows.value=D.state.spotShadow,gt.rectAreaLights.value=D.state.rectArea,gt.ltc_1.value=D.state.rectAreaLTC1,gt.ltc_2.value=D.state.rectAreaLTC2,gt.pointLights.value=D.state.point,gt.pointLightShadows.value=D.state.pointShadow,gt.hemisphereLights.value=D.state.hemi,gt.directionalShadowMap.value=D.state.directionalShadowMap,gt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,gt.spotShadowMap.value=D.state.spotShadowMap,gt.spotLightMatrix.value=D.state.spotLightMatrix,gt.spotLightMap.value=D.state.spotLightMap,gt.pointShadowMap.value=D.state.pointShadowMap,gt.pointShadowMatrix.value=D.state.pointShadowMatrix),B.currentProgram=Pt,B.uniformsList=null,Pt}function to(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=Fs.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function eo(x,L){const F=Mt.get(x);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.batchingColor=L.batchingColor,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.instancingMorph=L.instancingMorph,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function cl(x,L,F,B,D){L.isScene!==!0&&(L=ae),b.resetTextureUnits();const Q=L.fog,ct=B.isMeshStandardMaterial?L.environment:null,pt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ai,mt=(B.isMeshStandardMaterial?O:_).get(B.envMap||ct),Tt=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pt=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),gt=!!F.morphAttributes.position,Gt=!!F.morphAttributes.normal,ee=!!F.morphAttributes.color;let ie=un;B.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ie=M.toneMapping);const Te=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Wt=Te!==void 0?Te.length:0,xt=Mt.get(B),en=d.state.lights;if(tt===!0&&(vt===!0||x!==y)){const Ne=x===y&&B.id===S;J.setState(B,x,Ne)}let Xt=!1;B.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==en.state.version||xt.outputColorSpace!==pt||D.isBatchedMesh&&xt.batching===!1||!D.isBatchedMesh&&xt.batching===!0||D.isBatchedMesh&&xt.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&xt.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&xt.instancing===!1||!D.isInstancedMesh&&xt.instancing===!0||D.isSkinnedMesh&&xt.skinning===!1||!D.isSkinnedMesh&&xt.skinning===!0||D.isInstancedMesh&&xt.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&xt.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&xt.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&xt.instancingMorph===!1&&D.morphTexture!==null||xt.envMap!==mt||B.fog===!0&&xt.fog!==Q||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==J.numPlanes||xt.numIntersection!==J.numIntersection)||xt.vertexAlphas!==Tt||xt.vertexTangents!==Pt||xt.morphTargets!==gt||xt.morphNormals!==Gt||xt.morphColors!==ee||xt.toneMapping!==ie||xt.morphTargetsCount!==Wt)&&(Xt=!0):(Xt=!0,xt.__version=B.version);let ke=xt.currentProgram;Xt===!0&&(ke=is(B,L,D));let $n=!1,Ce=!1,Pi=!1;const se=ke.getUniforms(),je=xt.uniforms;if(St.useProgram(ke.program)&&($n=!0,Ce=!0,Pi=!0),B.id!==S&&(S=B.id,Ce=!0),$n||y!==x){St.buffers.depth.getReversed()?(rt.copy(x.projectionMatrix),mh(rt),gh(rt),se.setValue(U,"projectionMatrix",rt)):se.setValue(U,"projectionMatrix",x.projectionMatrix),se.setValue(U,"viewMatrix",x.matrixWorldInverse);const mn=se.map.cameraPosition;mn!==void 0&&mn.setValue(U,At.setFromMatrixPosition(x.matrixWorld)),Bt.logarithmicDepthBuffer&&se.setValue(U,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&se.setValue(U,"isOrthographic",x.isOrthographicCamera===!0),y!==x&&(y=x,Ce=!0,Pi=!0)}if(D.isSkinnedMesh){se.setOptional(U,D,"bindMatrix"),se.setOptional(U,D,"bindMatrixInverse");const Ne=D.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),se.setValue(U,"boneTexture",Ne.boneTexture,b))}D.isBatchedMesh&&(se.setOptional(U,D,"batchingTexture"),se.setValue(U,"batchingTexture",D._matricesTexture,b),se.setOptional(U,D,"batchingIdTexture"),se.setValue(U,"batchingIdTexture",D._indirectTexture,b),se.setOptional(U,D,"batchingColorTexture"),D._colorsTexture!==null&&se.setValue(U,"batchingColorTexture",D._colorsTexture,b));const Li=F.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&bt.update(D,F,ke),(Ce||xt.receiveShadow!==D.receiveShadow)&&(xt.receiveShadow=D.receiveShadow,se.setValue(U,"receiveShadow",D.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(je.envMap.value=mt,je.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&L.environment!==null&&(je.envMapIntensity.value=L.environmentIntensity),Ce&&(se.setValue(U,"toneMappingExposure",M.toneMappingExposure),xt.needsLights&&ll(je,Pi),Q&&B.fog===!0&&at.refreshFogUniforms(je,Q),at.refreshMaterialUniforms(je,B,H,K,d.state.transmissionRenderTarget[x.id]),Fs.upload(U,to(xt),je,b)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Fs.upload(U,to(xt),je,b),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&se.setValue(U,"center",D.center),se.setValue(U,"modelViewMatrix",D.modelViewMatrix),se.setValue(U,"normalMatrix",D.normalMatrix),se.setValue(U,"modelMatrix",D.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ne=B.uniformsGroups;for(let mn=0,gn=Ne.length;mn<gn;mn++){const no=Ne[mn];P.update(no,ke),P.bind(no,ke)}}return ke}function ll(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function hl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,L,F){Mt.get(x.texture).__webglTexture=L,Mt.get(x.depthTexture).__webglTexture=F;const B=Mt.get(x);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,L){const F=Mt.get(x);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(x,L=0,F=0){I=x,A=L,R=F;let B=!0,D=null,Q=!1,ct=!1;if(x){const mt=Mt.get(x);if(mt.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(U.FRAMEBUFFER,null),B=!1;else if(mt.__webglFramebuffer===void 0)b.setupRenderTarget(x);else if(mt.__hasExternalTextures)b.rebindTextures(x,Mt.get(x.texture).__webglTexture,Mt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const gt=x.depthTexture;if(mt.__boundDepthTexture!==gt){if(gt!==null&&Mt.has(gt)&&(x.width!==gt.image.width||x.height!==gt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(x)}}const Tt=x.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ct=!0);const Pt=Mt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Pt[L])?D=Pt[L][F]:D=Pt[L],Q=!0):x.samples>0&&b.useMultisampledRTT(x)===!1?D=Mt.get(x).__webglMultisampledFramebuffer:Array.isArray(Pt)?D=Pt[F]:D=Pt,C.copy(x.viewport),k.copy(x.scissor),z=x.scissorTest}else C.copy(yt).multiplyScalar(H).floor(),k.copy(Nt).multiplyScalar(H).floor(),z=Jt;if(St.bindFramebuffer(U.FRAMEBUFFER,D)&&B&&St.drawBuffers(x,D),St.viewport(C),St.scissor(k),St.setScissorTest(z),Q){const mt=Mt.get(x.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,mt.__webglTexture,F)}else if(ct){const mt=Mt.get(x.texture),Tt=L||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,mt.__webglTexture,F||0,Tt)}S=-1},this.readRenderTargetPixels=function(x,L,F,B,D,Q,ct){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(pt=pt[ct]),pt){St.bindFramebuffer(U.FRAMEBUFFER,pt);try{const mt=x.texture,Tt=mt.format,Pt=mt.type;if(!Bt.textureFormatReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-B&&F>=0&&F<=x.height-D&&U.readPixels(L,F,B,D,Dt.convert(Tt),Dt.convert(Pt),Q)}finally{const mt=I!==null?Mt.get(I).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(x,L,F,B,D,Q,ct){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(pt=pt[ct]),pt){const mt=x.texture,Tt=mt.format,Pt=mt.type;if(!Bt.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=x.width-B&&F>=0&&F<=x.height-D){St.bindFramebuffer(U.FRAMEBUFFER,pt);const gt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,gt),U.bufferData(U.PIXEL_PACK_BUFFER,Q.byteLength,U.STREAM_READ),U.readPixels(L,F,B,D,Dt.convert(Tt),Dt.convert(Pt),0);const Gt=I!==null?Mt.get(I).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,Gt);const ee=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ph(U,ee,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,gt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Q),U.deleteBuffer(gt),U.deleteSync(ee),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,L=null,F=0){x.isTexture!==!0&&(Vi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,x=arguments[1]);const B=Math.pow(2,-F),D=Math.floor(x.image.width*B),Q=Math.floor(x.image.height*B),ct=L!==null?L.x:0,pt=L!==null?L.y:0;b.setTexture2D(x,0),U.copyTexSubImage2D(U.TEXTURE_2D,F,0,0,ct,pt,D,Q),St.unbindTexture()},this.copyTextureToTexture=function(x,L,F=null,B=null,D=0){x.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,x=arguments[1],L=arguments[2],D=arguments[3]||0,F=null);let Q,ct,pt,mt,Tt,Pt,gt,Gt,ee;const ie=x.isCompressedTexture?x.mipmaps[D]:x.image;F!==null?(Q=F.max.x-F.min.x,ct=F.max.y-F.min.y,pt=F.isBox3?F.max.z-F.min.z:1,mt=F.min.x,Tt=F.min.y,Pt=F.isBox3?F.min.z:0):(Q=ie.width,ct=ie.height,pt=ie.depth||1,mt=0,Tt=0,Pt=0),B!==null?(gt=B.x,Gt=B.y,ee=B.z):(gt=0,Gt=0,ee=0);const Te=Dt.convert(L.format),Wt=Dt.convert(L.type);let xt;L.isData3DTexture?(b.setTexture3D(L,0),xt=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(b.setTexture2DArray(L,0),xt=U.TEXTURE_2D_ARRAY):(b.setTexture2D(L,0),xt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);const en=U.getParameter(U.UNPACK_ROW_LENGTH),Xt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ke=U.getParameter(U.UNPACK_SKIP_PIXELS),$n=U.getParameter(U.UNPACK_SKIP_ROWS),Ce=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ie.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ie.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,mt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Tt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Pt);const Pi=x.isDataArrayTexture||x.isData3DTexture,se=L.isDataArrayTexture||L.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const je=Mt.get(x),Li=Mt.get(L),Ne=Mt.get(je.__renderTarget),mn=Mt.get(Li.__renderTarget);St.bindFramebuffer(U.READ_FRAMEBUFFER,Ne.__webglFramebuffer),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,mn.__webglFramebuffer);for(let gn=0;gn<pt;gn++)Pi&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.get(x).__webglTexture,D,Pt+gn),x.isDepthTexture?(se&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.get(L).__webglTexture,D,ee+gn),U.blitFramebuffer(mt,Tt,Q,ct,gt,Gt,Q,ct,U.DEPTH_BUFFER_BIT,U.NEAREST)):se?U.copyTexSubImage3D(xt,D,gt,Gt,ee+gn,mt,Tt,Q,ct):U.copyTexSubImage2D(xt,D,gt,Gt,ee+gn,mt,Tt,Q,ct);St.bindFramebuffer(U.READ_FRAMEBUFFER,null),St.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else se?x.isDataTexture||x.isData3DTexture?U.texSubImage3D(xt,D,gt,Gt,ee,Q,ct,pt,Te,Wt,ie.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(xt,D,gt,Gt,ee,Q,ct,pt,Te,ie.data):U.texSubImage3D(xt,D,gt,Gt,ee,Q,ct,pt,Te,Wt,ie):x.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,D,gt,Gt,Q,ct,Te,Wt,ie.data):x.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,D,gt,Gt,ie.width,ie.height,Te,ie.data):U.texSubImage2D(U.TEXTURE_2D,D,gt,Gt,Q,ct,Te,Wt,ie);U.pixelStorei(U.UNPACK_ROW_LENGTH,en),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Xt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ke),U.pixelStorei(U.UNPACK_SKIP_ROWS,$n),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ce),D===0&&L.generateMipmaps&&U.generateMipmap(xt),St.unbindTexture()},this.copyTextureToTexture3D=function(x,L,F=null,B=null,D=0){return x.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,x=arguments[2],L=arguments[3],D=arguments[4]||0),Vi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,L,F,B,D)},this.initRenderTarget=function(x){Mt.get(x).__webglFramebuffer===void 0&&b.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?b.setTextureCube(x,0):x.isData3DTexture?b.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?b.setTexture2DArray(x,0):b.setTexture2D(x,0),St.unbindTexture()},this.resetState=function(){A=0,R=0,I=null,St.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Ht._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ht._getUnpackColorSpace()}}class ks{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Rt(t),this.near=e,this.far=n}clone(){return new ks(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Am extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Rm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sa,this.updateRanges=[],this.version=0,this.uuid=dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ee=new w;class Vs{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Xe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Yt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Yt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Xe(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Xe(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Xe(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Xe(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),r=Yt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new $e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Vs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wa extends Cn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let li;const Oi=new w,hi=new w,ui=new w,di=new nt,Fi=new nt,Kc=new Qt,bs=new w,Bi=new w,Ts=new w,nc=new nt,Ar=new nt,ic=new nt;class sc extends de{constructor(t=new wa){if(super(),this.isSprite=!0,this.type="Sprite",li===void 0){li=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rm(e,5);li.setIndex([0,1,2,0,2,3]),li.setAttribute("position",new Vs(n,3,0,!1)),li.setAttribute("uv",new Vs(n,2,3,!1))}this.geometry=li,this.material=t,this.center=new nt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hi.setFromMatrixScale(this.matrixWorld),Kc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ui.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hi.multiplyScalar(-ui.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;As(bs.set(-.5,-.5,0),ui,a,hi,i,r),As(Bi.set(.5,-.5,0),ui,a,hi,i,r),As(Ts.set(.5,.5,0),ui,a,hi,i,r),nc.set(0,0),Ar.set(1,0),ic.set(1,1);let o=t.ray.intersectTriangle(bs,Bi,Ts,!1,Oi);if(o===null&&(As(Bi.set(-.5,.5,0),ui,a,hi,i,r),Ar.set(0,1),o=t.ray.intersectTriangle(bs,Ts,Bi,!1,Oi),o===null))return;const c=t.ray.origin.distanceTo(Oi);c<t.near||c>t.far||e.push({distance:c,point:Oi.clone(),uv:Be.getInterpolation(Oi,bs,Bi,Ts,nc,Ar,ic,new nt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function As(s,t,e,n,i,r){di.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Fi.x=r*di.x-i*di.y,Fi.y=i*di.x+r*di.y):Fi.copy(di),s.copy(t),s.x+=Fi.x,s.y+=Fi.y,s.applyMatrix4(Kc)}class Ha extends Cn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Hs=new w,Gs=new w,rc=new Qt,zi=new Ba,Rs=new $s,Rr=new w,ac=new w;class Jc extends de{constructor(t=new _e,e=new Ha){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Hs.fromBufferAttribute(e,i-1),Gs.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Hs.distanceTo(Gs);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(i),Rs.radius+=r,t.ray.intersectsSphere(Rs)===!1)return;rc.copy(i).invert(),zi.copy(t.ray).applyMatrix4(rc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const d=u.getX(v),E=u.getX(v+1),T=Cs(this,t,zi,c,d,E);T&&e.push(T)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),d=Cs(this,t,zi,c,v,m);d&&e.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const d=Cs(this,t,zi,c,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=Cs(this,t,zi,c,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Cs(s,t,e,n,i,r){const a=s.geometry.attributes.position;if(Hs.fromBufferAttribute(a,i),Gs.fromBufferAttribute(a,r),e.distanceSqToSegment(Hs,Gs,Rr,ac)>n)return;Rr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Rr);if(!(c<t.near||c>t.far))return{distance:c,point:ac.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const oc=new w,cc=new w;class Cm extends Jc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)oc.fromBufferAttribute(e,i),cc.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+oc.distanceTo(cc);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qc extends be{constructor(t,e,n,i,r,a,o,c,l){super(t,e,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qe{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);const u=n[i],f=n[i+1]-u,p=(a-u)/f;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),c=e||(a.isVector2?new nt:new w);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new w,i=[],r=[],a=[],o=new w,c=new Qt;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new w)}r[0]=new w,a[0]=new w;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ge(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(ge(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ga extends Qe{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new nt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*h+this.aX,l=f*h+p*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Pm extends Ga{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Wa(){let s=0,t=0,e=0,n=0;function i(r,a,o,c){s=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,h){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,p=(o-a)/u-(c-a)/(u+h)+(c-o)/h;f*=u,p*=u,i(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ps=new w,Cr=new Wa,Pr=new Wa,Lr=new Wa;class Lm extends Qe{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new w){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=i[(o-1)%r]:(Ps.subVectors(i[0],i[1]).add(i[0]),l=Ps);const h=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(Ps.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Ps),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),v=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Cr.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,v,m),Pr.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,v,m),Lr.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(Cr.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Pr.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Lr.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Cr.calc(c),Pr.calc(c),Lr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new w().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function lc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,c=s*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*s+e}function Dm(s,t){const e=1-s;return e*e*t}function Im(s,t){return 2*(1-s)*s*t}function Um(s,t){return s*s*t}function Xi(s,t,e,n){return Dm(s,t)+Im(s,e)+Um(s,n)}function Nm(s,t){const e=1-s;return e*e*e*t}function Om(s,t){const e=1-s;return 3*e*e*s*t}function Fm(s,t){return 3*(1-s)*s*s*t}function Bm(s,t){return s*s*s*t}function qi(s,t,e,n,i){return Nm(s,t)+Om(s,e)+Fm(s,n)+Bm(s,i)}class tl extends Qe{constructor(t=new nt,e=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qi(t,i.x,r.x,a.x,o.x),qi(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zm extends Qe{constructor(t=new w,e=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new w){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(qi(t,i.x,r.x,a.x,o.x),qi(t,i.y,r.y,a.y,o.y),qi(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class el extends Qe{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class km extends Qe{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nl extends Qe{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Xi(t,i.x,r.x,a.x),Xi(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vm extends Qe{constructor(t=new w,e=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new w){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Xi(t,i.x,r.x,a.x),Xi(t,i.y,r.y,a.y),Xi(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class il extends Qe{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(lc(o,c.x,l.x,u.x,h.x),lc(o,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new nt().fromArray(i))}return this}}var hc=Object.freeze({__proto__:null,ArcCurve:Pm,CatmullRomCurve3:Lm,CubicBezierCurve:tl,CubicBezierCurve3:zm,EllipseCurve:Ga,LineCurve:el,LineCurve3:km,QuadraticBezierCurve:nl,QuadraticBezierCurve3:Vm,SplineCurve:il});class Hm extends Qe{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new hc[i.type]().fromJSON(i))}return this}}class Gm extends Hm{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new el(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new nl(this.currentPoint.clone(),new nt(t,e),new nt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new tl(this.currentPoint.clone(),new nt(t,e),new nt(n,i),new nt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new il(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,r,a,o,c),this}absellipse(t,e,n,i,r,a,o,c){const l=new Ga(t,e,n,i,r,a,o,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Xa extends _e{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ge(i,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],u=1/e,h=new w,f=new nt,p=new w,g=new w,v=new w;let m=0,d=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,d=t[E+1].y-t[E].y,p.x=d*1,p.y=-m,p.z=d*0,v.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[E+1].x-t[E].x,d=t[E+1].y-t[E].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),c.push(p.x,p.y,p.z),v.copy(g)}for(let E=0;E<=e;E++){const T=n+E*u*i,M=Math.sin(T),N=Math.cos(T);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*M,h.y=t[A].y,h.z=t[A].x*N,a.push(h.x,h.y,h.z),f.x=E/e,f.y=A/(t.length-1),o.push(f.x,f.y);const R=c[3*A+0]*M,I=c[3*A+1],S=c[3*A+0]*N;l.push(R,I,S)}}for(let E=0;E<e;E++)for(let T=0;T<t.length-1;T++){const M=T+E*t.length,N=M,A=M+t.length,R=M+t.length+1,I=M+1;r.push(N,A,I),r.push(R,I,A)}this.setIndex(r),this.setAttribute("position",new $t(a,3)),this.setAttribute("uv",new $t(o,2)),this.setAttribute("normal",new $t(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xa(t.points,t.segments,t.phiStart,t.phiLength)}}class qa extends Xa{constructor(t=1,e=1,n=4,i=8){const r=new Gm;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new qa(t.radius,t.length,t.capSegments,t.radialSegments)}}class js extends _e{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new w,u=new nt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const p=n+h/e*i;l.x=t*Math.cos(p),l.y=t*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(o,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new js(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pn extends _e{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],p=[];let g=0;const v=[],m=n/2;let d=0;E(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new $t(h,3)),this.setAttribute("normal",new $t(f,3)),this.setAttribute("uv",new $t(p,2));function E(){const M=new w,N=new w;let A=0;const R=(e-t)/n;for(let I=0;I<=r;I++){const S=[],y=I/r,C=y*(e-t)+t;for(let k=0;k<=i;k++){const z=k/i,W=z*c+o,Z=Math.sin(W),G=Math.cos(W);N.x=C*Z,N.y=-y*n+m,N.z=C*G,h.push(N.x,N.y,N.z),M.set(Z,R,G).normalize(),f.push(M.x,M.y,M.z),p.push(z,1-y),S.push(g++)}v.push(S)}for(let I=0;I<i;I++)for(let S=0;S<r;S++){const y=v[S][I],C=v[S+1][I],k=v[S+1][I+1],z=v[S][I+1];(t>0||S!==0)&&(u.push(y,C,z),A+=3),(e>0||S!==r-1)&&(u.push(C,k,z),A+=3)}l.addGroup(d,A,0),d+=A}function T(M){const N=g,A=new nt,R=new w;let I=0;const S=M===!0?t:e,y=M===!0?1:-1;for(let k=1;k<=i;k++)h.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const C=g;for(let k=0;k<=i;k++){const W=k/i*c+o,Z=Math.cos(W),G=Math.sin(W);R.x=S*G,R.y=m*y,R.z=S*Z,h.push(R.x,R.y,R.z),f.push(0,y,0),A.x=Z*.5+.5,A.y=G*.5*y+.5,p.push(A.x,A.y),g++}for(let k=0;k<i;k++){const z=N+k,W=C+k;M===!0?u.push(W,W+1,z):u.push(W+1,W,z),I+=3}l.addGroup(d,I,M===!0?1:2),d+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ya extends Pn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ya(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qi extends _e{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],u=[];let h=t;const f=(e-t)/i,p=new w,g=new nt;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=h*Math.cos(d),p.y=h*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let v=0;v<i;v++){const m=v*(n+1);for(let d=0;d<n;d++){const E=d+m,T=E,M=E+n+1,N=E+n+2,A=E+1;o.push(T,M,A),o.push(M,N,A)}}this.setIndex(o),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class qn extends _e{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new w,f=new w,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const E=[],T=d/n;let M=0;d===0&&a===0?M=.5/e:d===n&&c===Math.PI&&(M=-.5/e);for(let N=0;N<=e;N++){const A=N/e;h.x=-t*Math.cos(i+A*r)*Math.sin(a+T*o),h.y=t*Math.cos(a+T*o),h.z=t*Math.sin(i+A*r)*Math.sin(a+T*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(A+M,1-T),E.push(l++)}u.push(E)}for(let d=0;d<n;d++)for(let E=0;E<e;E++){const T=u[d][E+1],M=u[d][E],N=u[d+1][E],A=u[d+1][E+1];(d!==0||a>0)&&p.push(T,M,A),(d!==n-1||c<Math.PI)&&p.push(M,N,A)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(v,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ts extends _e{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],u=new w,h=new w,f=new w;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const v=g/i*r,m=p/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(v),h.y=(t+e*Math.cos(m))*Math.sin(v),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const v=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,d=(i+1)*(p-1)+g,E=(i+1)*p+g;a.push(v,m,E),a.push(m,d,E)}this.setIndex(a),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class En extends Cn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oa,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ti extends Cn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oa,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Ca,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ks extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Wm extends Ks{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Dr=new Qt,uc=new w,dc=new w;class sl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ka,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;uc.setFromMatrixPosition(t.matrixWorld),e.position.copy(uc),dc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dc),e.updateMatrixWorld(),Dr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fc=new Qt,ki=new w,Ir=new w;class Xm extends sl{constructor(){super(new De(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new Kt(2,1,1,1),new Kt(0,1,1,1),new Kt(3,1,1,1),new Kt(1,1,1,1),new Kt(3,0,1,1),new Kt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ki.setFromMatrixPosition(t.matrixWorld),n.position.copy(ki),Ir.copy(n.position),Ir.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ir),n.updateMatrixWorld(),i.makeTranslation(-ki.x,-ki.y,-ki.z),fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fc)}}class Yi extends Ks{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qm extends sl{constructor(){super(new Xc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rl extends Ks{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new qm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ba extends Ks{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ym{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=pc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=pc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function pc(){return performance.now()}const mc=new Qt;class al{constructor(t,e,n=0,i=1/0){this.ray=new Ba(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new za,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return mc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mc),this}intersectObject(t,e=!0,n=[]){return Ta(t,this,n,e),n.sort(gc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Ta(t[i],this,n,e);return n.sort(gc),n}}function gc(s,t){return s.distance-t.distance}function Ta(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Ta(r[a],t,e,!0)}}class $m extends Cm{constructor(t=10,e=10,n=4473924,i=8947848){n=new Rt(n),i=new Rt(i);const r=e/2,a=t/e,o=t/2,c=[],l=[];for(let f=0,p=0,g=-o;f<=e;f++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);const v=f===r?n:i;v.toArray(l,p),p+=3,v.toArray(l,p),p+=3,v.toArray(l,p),p+=3,v.toArray(l,p),p+=3}const u=new _e;u.setAttribute("position",new $t(c,3)),u.setAttribute("color",new $t(l,3));const h=new Ha({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ra}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ra);const vc={assault:{label:"ASSALTO",color:"#ff5b2e",description:"Pressão, mobilidade e avanço agressivo."},defense:{label:"DEFESA",color:"#42d9ee",description:"Barreiras, resistência e proteção de objetivo."},support:{label:"SUPORTE",color:"#74e69a",description:"Recuperação, utilidade e benefícios de equipe."},recon:{label:"RECONHECIMENTO",color:"#f8c95c",description:"Informação, varredura e leitura do campo."},control:{label:"CONTROLE",color:"#b07cff",description:"Bloqueio de caminhos e controle de áreas."}},_i=[{id:"iara",name:"IARA",codename:"MARÉ VIVA",age:27,role:"assault",description:"Ex-salvadora costeira. Transforma velocidade em pressão e abre caminhos onde não deveria existir nenhum.",appearance:"Pele escura, trança longa presa em colete tático azul-petróleo e detalhes coral.",personality:"Direta, calorosa e sempre em movimento.",health:100,movement:{walk:4.3,run:7.4,jump:6.4,mass:1},passive:{name:"MARÉ VIVA",description:"Eliminações e dano alto concedem um breve ganho de velocidade.",flags:{momentumOnDamage:!0,momentumSpeed:1.12,momentumDuration:2.4}},active:{name:"IMPULSO",icon:"◈",cooldown:12,duration:0,type:"dash",description:"Avanço explosivo para frente, útil para flanquear ou escapar."},special:{name:"TSUNAMI",icon:"✦",cooldown:38,duration:3.4,type:"slowfield",description:"Onda de choque que reduz a velocidade e a mira dos inimigos próximos."},cooldowns:{active:12,special:38},voice:["A maré chegou.","Vem, que eu abro o caminho.","Rápida, direta, eficiente."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"TÁTICA MARÉ",colors:{cloth:"#25606f",accent:"#ff5b2e",skin:"#6b4030",hair:"#231a18",gear:"#182a33"}},{id:"deep",name:"PROFUNDEZA",colors:{cloth:"#184a5a",accent:"#41e0d8",skin:"#6b4030",hair:"#2c2320",gear:"#122a35"}},{id:"storm",name:"TEMPESTADE",colors:{cloth:"#2c3348",accent:"#f8c95c",skin:"#6b4030",hair:"#1d1a20",gear:"#1e2634"}}]},{id:"brasa",name:"BRASA",age:24,role:"assault",description:"Capoeirista de periferia. Nada teme mais do que uma esquina quando ela está do outro lado.",appearance:"Pele morena, cabelo afro curto, jaqueta cortada verde-limão e faixas nos antebraços.",personality:"Provocante, confiante e acrobática.",health:95,movement:{walk:4.5,run:7.8,jump:7,mass:.92},passive:{name:"CALOR DE ESQUINA",description:"Munição reservas e recarga são mais rápidas com vida baixa.",flags:{lowHealthReloadBoost:!0}},active:{name:"INVESTIDA",icon:"⚔",cooldown:14,duration:1.1,type:"speedburst",description:"Aceleração extrema por curto tempo, com recarga automática da arma principal."},special:{name:"TEMPESTADE DE BRASAS",icon:"🔥",cooldown:40,duration:4.5,type:"incendiary",description:"Distribui faíscas incendiárias que causam dano contínuo em área."},cooldowns:{active:14,special:40},voice:["Chegou a hora.","Corre que eu sou mais rápida.","Isso aqui é minha rua."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"COMBATE VERDE",colors:{cloth:"#3a7d44",accent:"#ff5b2e",skin:"#8a5741",hair:"#2a1c16",gear:"#1c2b23"}},{id:"fire",name:"BRASA ALTA",colors:{cloth:"#c8462c",accent:"#ffd166",skin:"#8a5741",hair:"#241714",gear:"#2a1a18"}},{id:"street",name:"RUA 21",colors:{cloth:"#27303d",accent:"#d0f24a",skin:"#8a5741",hair:"#1e1718",gear:"#18202a"}}]},{id:"neblina",name:"NEBLINA",codename:"OLHOS DA NÉVOA",age:29,role:"recon",description:"Piloto de drones e ex-meteorologista militar. Ela vê o que os outros escondem.",appearance:"Pele clara, cabelo cinza-prata curto, capuz e óculos de coleta de dados amarelos.",personality:"Analítica, tranquila e irônica.",health:92,movement:{walk:4.2,run:6.9,jump:6,mass:.9},passive:{name:"LEITURA DE NÉVOA",description:"Acertos marcam inimigos por poucos segundos.",flags:{markOnHit:!0,markDuration:3.2}},active:{name:"PULSO SONORO",icon:"◎",cooldown:16,duration:0,type:"scanpulse",description:"Revela inimigos em raio médio por alguns segundos."},special:{name:"NÉVOA FANTASMA",icon:"☁",cooldown:42,duration:7,type:"smokefield",description:"Nuvem densa que bloqueia visão e diminui precisão dos bots."},cooldowns:{active:16,special:42},voice:["Estão exatamente ali.","Névoa não mentira pra mim.","Só dados."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"RECON PRATA",colors:{cloth:"#576374",accent:"#f8c95c",skin:"#d8b193",hair:"#b7bfc4",gear:"#2a3341"}},{id:"noct",name:"NOCTURNE",colors:{cloth:"#2b3246",accent:"#7de7ff",skin:"#d8b193",hair:"#c1c8d0",gear:"#212737"}},{id:"sand",name:"DESERTO 12",colors:{cloth:"#8b7a5d",accent:"#ff9a55",skin:"#d8b193",hair:"#b1b6b8",gear:"#403829"}}]},{id:"sol",name:"SOL",age:31,role:"support",description:"Médica de campo com oito missões de extração. Dá vida onde o round quer tirar.",appearance:"Pele clara, cabelo ruivo preso em coque, jaqueta branca-médica com detalhes dourados.",personality:"Calma, firme e maternal de propósito.",health:100,movement:{walk:4.1,run:6.7,jump:5.9,mass:1},passive:{name:"CUIDADO CONTÍNUO",description:"Regenera vida lentamente quando fora de combate.",flags:{passiveRegen:!0,regenPerSecond:2.4,regenDelay:4.2}},active:{name:"KIT DE EMERGÊNCIA",icon:"✚",cooldown:18,duration:0,type:"heal",description:"Recupera vida instantaneamente, com pequeno excedente temporário."},special:{name:"ZONA DE VIDA",icon:"✫",cooldown:45,duration:7,type:"healzone",description:"Cria área regenerativa que protege e cura aliados."},cooldowns:{active:18,special:45},voice:["Respira, tô aqui.","Ninguém morre hoje.","Te seguro."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"PROTOCOLO BRANCO",colors:{cloth:"#e8e8e4",accent:"#f0b23b",skin:"#d9ae90",hair:"#8c3a22",gear:"#33383f"}},{id:"gold",name:"ÁUREA",colors:{cloth:"#d7b570",accent:"#4ec0b5",skin:"#d9ae90",hair:"#8c3a22",gear:"#3a352b"}},{id:"night",name:"PLANTÃO NOITE",colors:{cloth:"#2f3a4e",accent:"#f2c75e",skin:"#d9ae90",hair:"#8c3a22",gear:"#232933"}}]},{id:"vera",name:"VERA",codename:"MURALHA",age:33,role:"defense",description:"Engenheira de demolição defensiva. Transforma qualquer corredor em um problema sério.",appearance:"Pele morena, cabelo preto em tranças curtas, armadura pesada cinza-escura e visor frontal.",personality:"Concentrada, determinada e quase indestrutível.",health:118,movement:{walk:3.6,run:6.2,jump:5.3,mass:1.25},passive:{name:"BLINDAGEM",description:"Reduz dano recebido, especialmente em explosões e balas de corpo.",flags:{damageReduction:.18}},active:{name:"BARREIRA TÁTICA",icon:"▣",cooldown:20,duration:8,type:"wall",description:"Implanta uma barreira sólida temporária para bloquear passagens."},special:{name:"FORTALEZA",icon:"⛨",cooldown:50,duration:5.5,type:"shieldaura",description:"Escudo por tempo limitado, reduzindo dano fortemente."},cooldowns:{active:20,special:50},voice:["Essa linha não passa.","Forte, não é?,","Aguenta."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"AÇO NEUTRO",colors:{cloth:"#4a4f5a",accent:"#42d9ee",skin:"#7d5340",hair:"#211722",gear:"#2b2f36"}},{id:"royal",name:"GUARDA ROYAL",colors:{cloth:"#384b62",accent:"#ffd166",skin:"#7d5340",hair:"#211722",gear:"#242a33"}},{id:"rust",name:"FERRUGEM",colors:{cloth:"#6a4b39",accent:"#ff8c46",skin:"#7d5340",hair:"#211722",gear:"#3a2c22"}}]},{id:"luma",name:"LUMA",age:26,role:"control",description:"Arquiteta militar de campo. Cria geometria onde a arena não tinha espaço.",appearance:"Pele parda, cabelo roxo escuro em rabo alto, traje técnico com painéis holográficos.",personality:"Intelectual, espirituosa e obcecada por ângulos.",health:95,movement:{walk:4.2,run:7,jump:6.2,mass:.94},passive:{name:"PERÍMETRO ATIVO",description:"Entra em posição favorável mais rápido ao defender sites.",flags:{siteControlBonus:!0}},active:{name:"MURO DE LUZ",icon:"▮",cooldown:19,duration:6.5,type:"wall",description:"Muro holográfico sólido temporário, com brilho roxo intenso."},special:{name:"SINGULARIDADE",icon:"⌾",cooldown:44,duration:5,type:"gravitywell",description:"Campo que atrai e desacelera inimigos, prejudicando mira."},cooldowns:{active:19,special:44},voice:["Geometria resolve.","Aqui, não.","A arena é minha planta."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"ARQUITETA",colors:{cloth:"#543b77",accent:"#b07cff",skin:"#a97b5b",hair:"#391f5f",gear:"#24202e"}},{id:"prism",name:"PRISMA",colors:{cloth:"#3a4a68",accent:"#7de7ff",skin:"#a97b5b",hair:"#391f5f",gear:"#1d2735"}},{id:"urban",name:"CONCRETO",colors:{cloth:"#50545c",accent:"#ff5b2e",skin:"#a97b5b",hair:"#391f5f",gear:"#2f333b"}}]},{id:"jade",name:"JADE",age:22,role:"assault",description:"Sprinter da federação. Se você piscou, provavelmente ela já está atrás.",appearance:"Pele escura, cabelo azul-elétrico curto, macacão esportivo preto com detalhe ciano.",personality:"Impaciente, divertida e extremamente rápida.",health:88,movement:{walk:4.8,run:8.2,jump:7.2,mass:.85},passive:{name:"PASSO LEVE",description:"Ruído de movimento reduzido, difícil de detectar pelos bots.",flags:{footstepNoiseReduction:!0}},active:{name:"RAJADA",icon:"⚡",cooldown:13,duration:2.6,type:"rapidfire",description:"Cadência e velocidade aumentadas por tempo curto."},special:{name:"TROVÃO",icon:"🌩",cooldown:40,duration:0,type:"shockstrike",description:"Descarga elétrica instantânea em inimigos próximos, causando dano direto."},cooldowns:{active:13,special:40},voice:["Vai tentar acompanhar?","Rápida, sempre.","Cheguei."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"CORRENTE",colors:{cloth:"#24262c",accent:"#4ce0e0",skin:"#573a30",hair:"#2c5fd6",gear:"#181b21"}},{id:"neon",name:"NEON RUNNER",colors:{cloth:"#1b2a3f",accent:"#f2f23c",skin:"#573a30",hair:"#4ce0e0",gear:"#152030"}},{id:"ember",name:"FAÍSCA",colors:{cloth:"#3b2b2b",accent:"#ff7a45",skin:"#573a30",hair:"#d9582c",gear:"#261e1e"}}]},{id:"cacau",name:"CACAU",age:25,role:"recon",description:"Hacker operacional. Enxerga a arena como código quebrado e corrige tudo do jeito dela.",appearance:"Pele escura, cabelo preto volumoso, moletom marrom sobre armadura leve e fones de campo.",personality:"Calada, observadora e surpreendentemente provocante.",health:92,movement:{walk:4.3,run:7.2,jump:6.4,mass:.9},passive:{name:"ASSINATURA MÍNIMA",description:"Fica mais difícil de ser detectada pelos bots.",flags:{detectionNoise:!0}},active:{name:"RASTREADOR",icon:"◍",cooldown:15,duration:0,type:"marknearest",description:"Marca inimigos próximos, tornando-os visíveis para você e aliados."},special:{name:"BLACKOUT",icon:"⬛",cooldown:44,duration:5.5,type:"blackout",description:"Derruba visão e capacidade de mira dos inimigos em área ampla."},cooldowns:{active:15,special:44},voice:["Estão gravados.","Sem mais mistério.","Aqui."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"SINAL MARROM",colors:{cloth:"#5b3a2a",accent:"#f8c95c",skin:"#6d4a37",hair:"#20150f",gear:"#26201b"}},{id:"ghost",name:"GHOST CODE",colors:{cloth:"#323a48",accent:"#8ef2c7",skin:"#6d4a37",hair:"#20150f",gear:"#222832"}},{id:"rose",name:"ROSE HACK",colors:{cloth:"#7c2c3b",accent:"#ff869e",skin:"#6d4a37",hair:"#20150f",gear:"#2b1e22"}}]},{id:"nina",name:"NINA",codename:"BÚSSOLA",age:28,role:"support",description:"Pilota aeronaves de resgate tático. Otimista por orgulho, cirúrgica por obrigação.",appearance:"Pele clara, cabelo loiro curto, jaqueta verde-escura com marcações brancas.",personality:"Animada, generosa e impecavelmente organizada.",health:100,movement:{walk:4.3,run:7,jump:6.2,mass:.96},passive:{name:"COORDENAÇÃO",description:"Recarga do time e equipamento são otimizados ao ficar perto de aliados.",flags:{allyReloadAura:!0,allyReloadMultiplier:.75}},active:{name:"CORTINA DE FUMAÇA",icon:"▨",cooldown:17,duration:6.5,type:"smokefield",description:"Cria nuvem de fumaça tática para cobertura rápida."},special:{name:"REFORÇO AÉREO",icon:"✈",cooldown:46,duration:8,type:"armoraura",description:"Distribui blindagem temporária para aliados próximos."},cooldowns:{active:17,special:46},voice:["Reforço chegando.","Aqui, alguém precisa?","Plano B é meu."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"ASA VERDE",colors:{cloth:"#3d5b4d",accent:"#e9ecef",skin:"#d8a685",hair:"#c8a24e",gear:"#252c2c"}},{id:"tide",name:"MARÉ AZUL",colors:{cloth:"#35526b",accent:"#7de7ff",skin:"#d8a685",hair:"#c8a24e",gear:"#1e2b37"}},{id:"signal",name:"SINAL LARANJA",colors:{cloth:"#ca5e28",accent:"#f6f0e4",skin:"#d8a685",hair:"#c8a24e",gear:"#3a2820"}}]},{id:"mara",name:"MARA",age:30,role:"defense",description:"Tiro policial de elite. Prefere posição sólida a promessas rápidas.",appearance:"Pele clara, cabelo castanho curto, uniforme azul-marinho com colete reforçado.",personality:"Rígida, honesta e praticamente imóvel sob pressão.",health:110,movement:{walk:3.8,run:6.4,jump:5.6,mass:1.15},passive:{name:"POSIÇÃO FIRME",description:"Quando parada, precisão aumenta significativamente.",flags:{stationaryAccuracy:!0,accuracyBonus:.38}},active:{name:"ESCUDO BALÍSTICO",icon:"⬛",cooldown:21,duration:6,type:"shieldaura",description:"Cria escudo parcial sobre si mesma por alguns segundos."},special:{name:"CONTRA-ATAQUE",icon:"✕",cooldown:48,duration:5,type:"barricadefield",description:"Barreira rotativa que empurra inimigos e bloqueia rotas."},cooldowns:{active:21,special:48},voice:["Aguente o tiroteio.","Aqui é nosso.","Três, dois, um."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"ORDINÁRIA",colors:{cloth:"#2c3a58",accent:"#42d9ee",skin:"#d8a685",hair:"#5a3a25",gear:"#1f2a3b"}},{id:"night",name:"TURNO NOITE",colors:{cloth:"#202839",accent:"#8ef2c7",skin:"#d8a685",hair:"#5a3a25",gear:"#182030"}},{id:"storm",name:"TEMPO FECHADO",colors:{cloth:"#4c566a",accent:"#ff5b2e",skin:"#d8a685",hair:"#5a3a25",gear:"#2b313d"}}]},{id:"zara",name:"ZARA",age:35,role:"control",description:"Demolidora veterana. Quando ela fala em incêndio, a arena escuta.",appearance:"Pele morena, cabelo rastafari curto laranja, armadura industrial com marcas amarelas.",personality:"Sarcástica, veterana e sem paciência para medo.",health:105,movement:{walk:3.9,run:6.6,jump:5.7,mass:1.1},passive:{name:"MÃO PESADA",description:"Planta e desarma bombas mais rápido.",flags:{bombSpeed:.78}},active:{name:"MINA DE CONCUSSÃO",icon:"◉",cooldown:22,duration:0,type:"concussionmine",description:"Mina de impacto que atordoa inimigos em área."},special:{name:"CHUVA DE FOGO",icon:"☄",cooldown:48,duration:5.5,type:"incendiary",description:"Barreira incendiária que causa dano em área por tempo longo."},cooldowns:{active:22,special:48},voice:["Se afasta.","Isso é arte.","Tá achando que é brincadeira?"],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"INDÚSTRIA",colors:{cloth:"#6a4a2b",accent:"#ff8c46",skin:"#8a5741",hair:"#c04a28",gear:"#2f2a24"}},{id:"toxic",name:"TÓXICO",colors:{cloth:"#2f4a30",accent:"#d0f24a",skin:"#8a5741",hair:"#c04a28",gear:"#202620"}},{id:"ash",name:"CINZA",colors:{cloth:"#4c4c52",accent:"#f8c95c",skin:"#8a5741",hair:"#c04a28",gear:"#2b2b30"}}]},{id:"ayra",name:"AYRA",codename:"PRISMA",age:27,role:"recon",description:"Especialista em óptica de guerra. Enxerga ângulos que não deveriam existir.",appearance:"Pele clara, cabelo verde-água longo, lente ciano sobre o olho esquerdo e manto técnico.",personality:"Serena, enigmática e sempre um passo adiante.",health:95,movement:{walk:4.2,run:7,jump:6.3,mass:.92},passive:{name:"REFLEXO ÓPTICO",description:"O primeiro hit recebido em cada round é reduzido.",flags:{firstHitReduce:!0}},active:{name:"HOLOGRAMA",icon:"⧫",cooldown:16,duration:5.5,type:"decoy",description:"Cria cópia holográfica para atrair atenção."},special:{name:"OLHO DE VIDRO",icon:"◎",cooldown:44,duration:6,type:"widevision",description:"Revela todos os inimigos vivos por tempo limitado."},cooldowns:{active:16,special:44},voice:["Eu já vi isso antes.","Vê melhor.","Pronto."],animationSet:{idle:"idle",walk:"walk",run:"run",jump:"jump",shoot:"shoot",reload:"reload",death:"death"},skins:[{id:"default",name:"ÓPTICA",colors:{cloth:"#34565c",accent:"#4ce0e0",skin:"#e0b89a",hair:"#35c4b8",gear:"#1f2a30"}},{id:"aurora",name:"AURORA",colors:{cloth:"#3c4b70",accent:"#a4f5c8",skin:"#e0b89a",hair:"#35c4b8",gear:"#212a3c"}},{id:"ember",name:"CRISOL",colors:{cloth:"#5c3a34",accent:"#ff9a55",skin:"#e0b89a",hair:"#35c4b8",gear:"#2c2422"}}]}];function Ws(s){return _i.find(t=>t.id===s)||_i[0]}function fi(s){return vc[s]||vc.assault}function _c(s){return s.name.replace(/[^A-Z]/g,"").slice(0,2)||"VC"}const Ur="vem-comer-settings-v1",Nr={sensitivity:1,musicVolume:.45,sfxVolume:.85,masterVolume:.8,quality:"medium",fov:78,shadows:!0,particles:!0,vibration:!0,invertY:!1,stickScale:1,selectedCharacter:"iara",selectedSkin:0,selectedBanner:0,botDifficulty:"veteran",roundTarget:4};class Zm{constructor(){this.values={...Nr},this.listeners=new Set;try{const t=localStorage.getItem(Ur);if(t){const e=JSON.parse(t);e&&typeof e=="object"&&(this.values={...Nr,...e})}}catch{}}get(t){return this.values[t]}set(t,e){if(t in this.values){this.values[t]=e;try{localStorage.setItem(Ur,JSON.stringify(this.values))}catch{}this.listeners.forEach(n=>n(t,e))}}reset(){const t={};t.selectedCharacter=this.values.selectedCharacter,t.selectedSkin=this.values.selectedSkin,t.selectedBanner=this.values.selectedBanner,this.values={...Nr,...t};try{localStorage.setItem(Ur,JSON.stringify(this.values))}catch{}this.listeners.forEach(e=>e("reset",this.values))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}}class jm{constructor(t){this.settings=t,this.context=null,this.ready=!1,this.musicNodes=[]}ensureContext(){if(this.ready)return this.context;const t=window.AudioContext||window.webkitAudioContext;return t?(this.context=new t,this.master=this.context.createGain(),this.sfxGain=this.context.createGain(),this.musicGain=this.context.createGain(),this.sfxGain.connect(this.master),this.musicGain.connect(this.master),this.master.connect(this.context.destination),this.applyVolumes(),this.ready=!0,this.context):null}applyVolumes(){this.ready&&(this.master.gain.value=this.settings.get("masterVolume"),this.sfxGain.gain.value=this.settings.get("sfxVolume"),this.musicGain.gain.value=this.settings.get("musicVolume")*.55)}resume(){const t=this.ensureContext();t&&t.state==="suspended"&&t.resume()}playTone({frequency:t=220,duration:e=.18,type:n="sine",gain:i=.2,sweep:r=null,delay:a=0,destination:o="sfx"}){const c=this.ensureContext();if(!c)return;const l=c.currentTime+a,u=c.createOscillator(),h=c.createGain();u.type=n,u.frequency.setValueAtTime(t,l),r&&(Array.isArray(r)?u.frequency.exponentialRampToValueAtTime(Math.max(10,r[1]),l+e):u.frequency.exponentialRampToValueAtTime(Math.max(10,r),l+e)),h.gain.setValueAtTime(1e-4,l),h.gain.exponentialRampToValueAtTime(Math.max(.001,i),l+Math.min(e*.2,.03)),h.gain.exponentialRampToValueAtTime(1e-4,l+e),u.connect(h).connect(o==="music"?this.musicGain:this.sfxGain),u.start(l),u.stop(l+e+.02)}playNoise({duration:t=.16,gain:e=.18,filter:n=600,sweep:i=null,delay:r=0}){const a=this.ensureContext();if(!a)return;const o=Math.floor(a.sampleRate*t),c=a.createBuffer(1,o,a.sampleRate),l=c.getChannelData(0);for(let p=0;p<o;p+=1)l[p]=(Math.random()*2-1)*(1-p/o);const u=a.createBufferSource();u.buffer=c;const h=a.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(n,a.currentTime+r),i&&h.frequency.exponentialRampToValueAtTime(Math.max(50,i),a.currentTime+r+t);const f=a.createGain();f.gain.setValueAtTime(e,a.currentTime+r),f.gain.exponentialRampToValueAtTime(1e-4,a.currentTime+r+t),u.connect(h).connect(f).connect(this.sfxGain),u.start(a.currentTime+r)}ui(t="click"){this.resume(),t==="click"&&this.playTone({frequency:720,duration:.06,type:"triangle",gain:.05}),t==="confirm"&&(this.playTone({frequency:540,duration:.08,type:"triangle",gain:.07}),this.playTone({frequency:780,duration:.1,type:"triangle",gain:.06,delay:.07})),t==="back"&&this.playTone({frequency:430,duration:.09,type:"triangle",gain:.05}),t==="error"&&this.playTone({frequency:220,duration:.14,type:"sawtooth",gain:.07,sweep:90}),t==="deploy"&&this.playTone({frequency:300,duration:.32,type:"sawtooth",gain:.09,sweep:[300,90]})}shot(t="rifle",e=0){const n=Math.max(.28,1-e/70);t==="pistol"?(this.playNoise({duration:.08,gain:.15*n,filter:1900,sweep:500}),this.playTone({frequency:230,duration:.05,type:"square",gain:.05*n,sweep:110})):t==="smg"?(this.playNoise({duration:.06,gain:.11*n,filter:2400,sweep:700}),this.playTone({frequency:190,duration:.04,type:"square",gain:.045*n,sweep:90})):t==="shotgun"?(this.playNoise({duration:.18,gain:.24*n,filter:1200,sweep:260}),this.playTone({frequency:130,duration:.14,type:"sawtooth",gain:.08*n,sweep:55})):t==="sniper"?(this.playNoise({duration:.2,gain:.25*n,filter:1600,sweep:320}),this.playTone({frequency:175,duration:.18,type:"sawtooth",gain:.1*n,sweep:55})):(this.playNoise({duration:.09,gain:.16*n,filter:2200,sweep:520}),this.playTone({frequency:215,duration:.06,type:"square",gain:.06*n,sweep:85}))}impact(){this.playNoise({duration:.05,gain:.07,filter:900})}hit(){this.playTone({frequency:900,duration:.045,type:"square",gain:.08,sweep:500})}kill(){this.playTone({frequency:640,duration:.08,type:"triangle",gain:.08}),this.playTone({frequency:940,duration:.1,type:"triangle",gain:.07,delay:.07})}reload(){this.playTone({frequency:420,duration:.07,type:"square",gain:.06}),this.playTone({frequency:300,duration:.08,type:"square",gain:.05,delay:.16}),this.playTone({frequency:620,duration:.07,type:"square",gain:.07,delay:.35})}jump(){this.playTone({frequency:300,duration:.1,type:"sine",gain:.045,sweep:520})}footstep(t=0){const e=Math.max(.02,.07-t/400);this.playNoise({duration:.06,gain:e,filter:420,sweep:190})}ability(t="normal"){t==="special"?(this.playTone({frequency:320,duration:.3,type:"sawtooth",gain:.12,sweep:[320,110]}),this.playNoise({duration:.25,gain:.11,filter:1500,sweep:320})):(this.playTone({frequency:480,duration:.13,type:"triangle",gain:.09,sweep:[480,190]}),this.playNoise({duration:.12,gain:.06,filter:1e3}))}bombBeep(t=1){this.playTone({frequency:900,duration:.06,type:"square",gain:.09}),t>1.4&&this.playTone({frequency:1150,duration:.05,type:"square",gain:.07,delay:.08})}plant(){this.playTone({frequency:420,duration:.12,type:"triangle",gain:.08}),this.playTone({frequency:660,duration:.16,type:"triangle",gain:.07,delay:.1})}defuse(){this.playTone({frequency:560,duration:.16,type:"triangle",gain:.08}),this.playTone({frequency:760,duration:.22,type:"triangle",gain:.07,delay:.12})}explosion(){this.playNoise({duration:.55,gain:.4,filter:1600,sweep:70}),this.playTone({frequency:80,duration:.65,type:"sawtooth",gain:.16,sweep:30}),this.playNoise({duration:.8,gain:.2,filter:500,sweep:60,delay:.07})}roundStart(){this.playTone({frequency:420,duration:.15,type:"triangle",gain:.1}),this.playTone({frequency:640,duration:.2,type:"triangle",gain:.09,delay:.16})}victory(){[520,660,790,1050].forEach((e,n)=>this.playTone({frequency:e,duration:.3,type:"triangle",gain:.12,delay:n*.13}))}defeat(){[380,300,230,170].forEach((e,n)=>this.playTone({frequency:e,duration:.36,type:"sawtooth",gain:.1,delay:n*.15}))}ambience(){this.ready&&(this.playTone({frequency:58,duration:2.5,type:"sine",gain:.05,destination:"music"}),this.playTone({frequency:87,duration:2.8,type:"sine",gain:.03,destination:"music",delay:.4}))}}class Km{constructor(){this.reset()}reset(){this.attackers=[],this.defenders=[],this.attackersScore=0,this.defendersScore=0,this.roundAttackersWins=0}register(t,e){e==="attackers"?this.attackers.push(t):this.defenders.push(t)}unregister(t){this.attackers=this.attackers.filter(e=>e!==t),this.defenders=this.defenders.filter(e=>e!==t)}clear(){this.attackers=[],this.defenders=[]}alive(t){return this.get(t).filter(e=>e.isAlive&&e.isAlive()).length}get(t){return t==="attackers"?this.attackers:this.defenders}opponent(t){return t==="attackers"?"defenders":"attackers"}player(t){return this.get(t).find(e=>e.isPlayer)}playersAliveCount(){return{attackers:this.alive("attackers"),defenders:this.alive("defenders")}}addScore(t,e=1){t==="attackers"?this.attackersScore+=e:this.defendersScore+=e}resetRoundState(){[...this.attackers,...this.defenders].forEach(t=>{t.resetRound&&t.resetRound()})}resetMatch(){this.attackersScore=0,this.defendersScore=0}}class Jm{constructor(t,e="medium"){this.scene=t,this.quality=e,this.colliders=[],this.meshes=[],this.siteZones=[{id:"A",center:new nt(-18,0),radius:6},{id:"B",center:new nt(18,0),radius:6}],this.spawnPoints={attackers:[new w(-10,0,18),new w(-5,0,18.5),new w(0,0,18),new w(5,0,18.5),new w(10,0,18)],defenders:[new w(-10,0,-18),new w(-5,0,-18.5),new w(0,0,-18),new w(5,0,-18.5),new w(10,0,-18)]},this.patrolPoints={defenders:[new w(-18,0,-2),new w(-13,0,4),new w(0,0,-3),new w(13,0,4),new w(18,0,-2),new w(-4,0,-8),new w(4,0,-8)],attackers:[new w(-18,0,2),new w(0,0,4),new w(18,0,2),new w(-12,0,9),new w(12,0,9)]},this.effects=[],this.group=new ue,t.add(this.group),this.build(),this.buildGrid()}build(){this.createGround(),this.createPerimeter(),this.createArchitecture(),this.createSites(),this.createLights(),this.createProps()}createGround(){const t=new bi(70,44),e=new En({color:1844012}),n=new Ut(t,e);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,n.userData.blockBullet=!0,this.group.add(n),this.meshes.push(n);const i=new $m(70,70,2765890,1844012);i.position.y=.02,i.material.opacity=.18,i.material.transparent=!0,this.group.add(i);const r=new Ut(new bi(70,44),new Se({color:658707,transparent:!0,opacity:.28}));r.rotation.x=-Math.PI/2,r.position.y=.01,this.group.add(r)}createPerimeter(){const t=new En({color:4870750});[{x:0,z:22,width:70,depth:1,height:5},{x:0,z:-22,width:70,depth:1,height:5},{x:35,z:0,width:1,depth:45,height:5},{x:-35,z:0,width:1,depth:45,height:5}].forEach(n=>this.addBox(n,t))}createArchitecture(){const t=new En({color:5397608}),e=new En({color:3291974}),n=new En({color:2043192,emissive:1848902,emissiveIntensity:.35});[{x:-10,z:-11,width:14,depth:2.2,height:4,material:t},{x:10,z:11,width:14,depth:2.2,height:4,material:t},{x:-10,z:11,width:8,depth:2.2,height:4,material:t},{x:10,z:-11,width:8,depth:2.2,height:4,material:t},{x:0,z:0,width:2.4,depth:16,height:5,material:e},{x:-18,z:7,width:8,depth:1.6,height:3.2,material:t},{x:18,z:-7,width:8,depth:1.6,height:3.2,material:t},{x:-20,z:-10,width:2,depth:12,height:3.6,material:t},{x:20,z:10,width:2,depth:12,height:3.6,material:t},{x:-4,z:4,width:3.4,depth:3.4,height:2.2,material:e},{x:4,z:-4,width:3.4,depth:3.4,height:2.2,material:e},{x:-13,z:2,width:4,depth:3,height:2.4,material:n},{x:13,z:-2,width:4,depth:3,height:2.4,material:n},{x:-28,z:-14,width:7,depth:5,height:2.6,material:t},{x:28,z:14,width:7,depth:5,height:2.6,material:t}].forEach(r=>this.addBox(r,r.material||t)),[[-25,0],[25,0],[-12,-18],[12,18]].forEach(([r,a])=>{this.addBox({x:r,z:a,width:1.5,depth:1.5,height:4.5},e)})}createSites(){this.siteZones.forEach(t=>{const e=t.id==="A"?16735022:4381166,n=new Ut(new Qi(t.radius-.55,t.radius,32),new Se({color:e,transparent:!0,opacity:.42,side:Ie}));n.rotation.x=-Math.PI/2,n.position.set(t.center.x,.05,t.center.y),this.group.add(n);const i=new Ut(new js(t.radius-1.1,32),new Se({color:e,transparent:!0,opacity:.07,side:Ie}));i.rotation.x=-Math.PI/2,i.position.set(t.center.x,.035,t.center.y),this.group.add(i);const r=new sc(new wa({map:eg(t.id,t.id==="A"?"#ff5b2e":"#42d9ee"),transparent:!0,opacity:.9}));r.position.set(t.center.x,3.4,t.center.y),r.scale.set(3.2,1.6,1),this.group.add(r);const a=new Yi(e,.65,18,2);a.position.set(t.center.x,3.2,t.center.y),this.group.add(a)})}createLights(){const t=new ba(7831692,this.quality==="low"?.65:.45);this.group.add(t);const e=new Wm(6122106,1119515,.5);this.group.add(e);const n=new rl(16771282,this.quality==="low"?1:1.7);n.position.set(18,28,-14),this.quality==="low"?n.castShadow=!1:(n.castShadow=!0,n.shadow.mapSize.set(this.quality==="high"?2048:1024,this.quality==="high"?2048:1024),n.shadow.camera.near=1,n.shadow.camera.far=90,n.shadow.camera.left=-48,n.shadow.camera.right=48,n.shadow.camera.top=40,n.shadow.camera.bottom=-40,n.shadow.bias=-6e-4),this.group.add(n),this.directional=n;const i=new Yi(16740167,.55,26,2);i.position.set(-14,4,10),this.group.add(i);const r=new Yi(4187888,.5,26,2);r.position.set(14,4,-10),this.group.add(r)}createProps(){const t=[4871521,3818318,5726574,3028802];[{x:-23,z:5,w:1.5,d:1.5,h:1.5},{x:-17,z:-4,w:1.5,d:1.5,h:1.2},{x:-8,z:7,w:1.3,d:1.3,h:1.3},{x:-2,z:-7,w:1.5,d:1.5,h:1.4},{x:3,z:7,w:1.5,d:1.5,h:1.3},{x:9,z:-7,w:1.5,d:1.5,h:1.5},{x:17,z:4,w:1.5,d:1.5,h:1.2},{x:23,z:-5,w:1.5,d:1.5,h:1.5},{x:-27,z:-6,w:2,d:2,h:2.2},{x:27,z:6,w:2,d:2,h:2.2},{x:-6,z:-17,w:3.5,d:2,h:2.5},{x:6,z:17,w:3.5,d:2,h:2.5}].forEach((c,l)=>{const u=new En({color:t[l%t.length]});this.addBox({x:c.x,z:c.z,width:c.w,depth:c.d,height:c.h},u)});const n=new Pn(.45,.45,1.1,10),i=[[-15,.55,3],[15,.55,-3],[-26,.55,2],[26,.55,-2],[-11,.55,-15],[11,.55,15]],r=new En({color:4213592}),a=new En({color:1780278,emissive:2177610,emissiveIntensity:.35});i.forEach((c,l)=>{const u=new Ut(n,l%2?a:r);u.position.set(c[0],c[1],c[2]),u.castShadow=!0,u.receiveShadow=!0,this.group.add(u),this.meshes.push(u),this.colliders.push(Qm(c[0],c[2],.95,.95,1.1))}),[{text:"SITE A",color:"#ff5b2e",pos:[-18,2.8,0]},{text:"SITE B",color:"#42d9ee",pos:[18,2.8,0]},{text:"VC",color:"#f4f0e8",pos:[0,2.6,18.6]}].forEach(c=>{const l=new sc(new wa({map:tg(c.text,c.color),transparent:!0}));l.position.set(c.pos[0],c.pos[1],c.pos[2]),l.scale.set(3,1.1,1),this.group.add(l)})}addBox(t,e){const n=new Ae(t.width,t.height,t.depth),i=new Ut(n,e);i.position.set(t.x,t.height/2,t.z),i.castShadow=!0,i.receiveShadow=!1,i.userData.blockBullet=!0,this.group.add(i),this.meshes.push(i),this.colliders.push({minX:t.x-t.width/2,maxX:t.x+t.width/2,minZ:t.z-t.depth/2,maxZ:t.z+t.depth/2,minY:0,maxY:t.height,height:t.height})}buildGrid(){this.gridSize=1,this.gridMinX=-35,this.gridMinZ=-22,this.cols=Math.round(70/this.gridSize),this.rows=Math.round(44/this.gridSize),this.grid=new Array(this.cols*this.rows).fill(0),this.colliders.forEach(t=>{if(t.height<=.8)return;const e=Math.max(0,Math.floor((t.minX-this.gridMinX)/this.gridSize)),n=Math.min(this.cols-1,Math.floor((t.maxX-this.gridMinX)/this.gridSize)),i=Math.max(0,Math.floor((t.minZ-this.gridMinZ)/this.gridSize)),r=Math.min(this.rows-1,Math.floor((t.maxZ-this.gridMinZ)/this.gridSize));for(let a=e;a<=n;a+=1)for(let o=i;o<=r;o+=1)this.grid[o*this.cols+a]=1})}nearestFreeCell(t){if(!t)return null;if(!this.grid[t.row*this.cols+t.col])return t;for(let e=1;e<=8;e+=1){let n=null,i=1/0;for(let r=-e;r<=e;r+=1)for(let a=-e;a<=e;a+=1){if(Math.max(Math.abs(r),Math.abs(a))!==e)continue;const o=t.row+r,c=t.col+a;if(o<0||o>=this.rows||c<0||c>=this.cols||this.grid[o*this.cols+c])continue;const l=r*r+a*a;l<i&&(i=l,n={col:c,row:o})}if(n)return n}return null}findPath(t,e){const n=this.nearestFreeCell(this.worldToCell(t)),i=this.nearestFreeCell(this.worldToCell(e));if(!n||!i)return[];const r=[n],a=new Map,o=f=>f.row*this.cols+f.col;a.set(o(n),null);let c=null,l=0;for(;r.length&&l<9e3;){l+=1;let f=0,p=1/0;for(let m=0;m<r.length;m+=1){const d=Math.abs(r[m].col-i.col)+Math.abs(r[m].row-i.row);d<p&&(p=d,f=m)}const g=r.splice(f,1)[0];if(g.row===i.row&&g.col===i.col){c=g;break}[{row:g.row+1,col:g.col},{row:g.row-1,col:g.col},{row:g.row,col:g.col+1},{row:g.row,col:g.col-1},{row:g.row+1,col:g.col+1},{row:g.row+1,col:g.col-1},{row:g.row-1,col:g.col+1},{row:g.row-1,col:g.col-1}].forEach(m=>{m.row<0||m.row>=this.rows||m.col<0||m.col>=this.cols||this.grid[m.row*this.cols+m.col]||a.has(o(m))||(a.set(o(m),g),r.push(m))})}if(!c)return[];const u=[];let h=c;for(;h;)u.unshift(this.cellToWorld(h)),h=a.get(o(h));return u.slice(1)}worldToCell(t){const e=Math.floor((t.x-this.gridMinX)/this.gridSize),n=Math.floor((t.z-this.gridMinZ)/this.gridSize);return e<0||e>=this.cols||n<0||n>=this.rows?null:{col:e,row:n}}cellToWorld(t){return new w(this.gridMinX+(t.col+.5)*this.gridSize,0,this.gridMinZ+(t.row+.5)*this.gridSize)}randomPointInSite(t){const e=this.siteZones.find(r=>r.id===t),n=Math.random()*Math.PI*2,i=Math.random()*e.radius*.7;return new w(e.center.x+Math.cos(n)*i,0,e.center.y+Math.sin(n)*i)}siteAt(t){return this.siteZones.find(e=>Math.hypot(t.x-e.center.x,t.z-e.center.y)<=e.radius)}resolveCollision(t,e=.45){let n=!1;for(const i of this.colliders){if(t.y>i.maxY||t.y+1.6<i.minY)continue;const r=le.clamp(t.x,i.minX,i.maxX),a=le.clamp(t.z,i.minZ,i.maxZ),o=t.x-r,c=t.z-a,l=o*o+c*c;if(l<e*e){const u=Math.sqrt(l)||1e-4,h=(e-u)/u;t.x+=o*h,t.z+=c*h,n=!0}}return t.x=le.clamp(t.x,-34.2,34.2),t.z=le.clamp(t.z,-21.2,21.2),n}raycastTargets(){return this.meshes}update(t){this.siteZones.forEach(e=>{var i;const n=Math.sin(performance.now()*.002+e.center.x)*.08+1;(i=e.meshes)==null||i.forEach(r=>r.material.opacity=e.id==="A"?.28+n*.07:.24+n*.07)})}dispose(){this.group.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose())}),this.scene.remove(this.group)}}function Qm(s,t,e,n,i){return{minX:s-e/2,maxX:s+e/2,minZ:t-n/2,maxZ:t+n/2,minY:0,maxY:i,height:i}}function tg(s,t="#f4f0e8"){const e=document.createElement("canvas");e.width=256,e.height=96;const n=e.getContext("2d");n.clearRect(0,0,e.width,e.height),n.fillStyle="rgba(5,8,12,0.72)",n.fillRect(0,0,e.width,e.height),n.strokeStyle=t,n.lineWidth=4,n.strokeRect(6,6,e.width-12,e.height-12),n.fillStyle=t,n.font='700 44px "Barlow Condensed", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(s,e.width/2,e.height/2+2);const i=new Qc(e);return i.needsUpdate=!0,i}function eg(s,t){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="rgba(0,0,0,0)",n.fillRect(0,0,e.width,e.height),n.strokeStyle=t,n.lineWidth=5,n.strokeRect(10,10,236,108),n.fillStyle=t,n.font='900 76px "Barlow Condensed", sans-serif',n.textAlign="center",n.fillText(`SITE ${s}`,e.width/2,e.height/2+22);const i=new Qc(e);return i.needsUpdate=!0,i}const jt={NOT_PLANTED:"notPlanted",PLANTING:"planting",PLANTED:"planted",DEFUSING:"defusing",DEFUSED:"defused",EXPLODED:"exploded"};class ng{constructor({scene:t,map:e,audio:n}){this.scene=t,this.map=e,this.audio=n,this.state=jt.NOT_PLANTED,this.position=new w,this.site=null,this.timer=35,this.plantProgress=0,this.defuseProgress=0,this.entity=null,this.plantingEntity=null,this.defusingEntity=null,this.isBotAction=!1,this.lastBeep=0,this.visible=!1,this.createMesh(),this.hide()}createMesh(){this.group=new ue;const t=new Ut(new Ae(.7,.3,.45),new Ti({color:2831164}));t.position.y=.15,t.castShadow=!0;const e=new Ut(new qn(.07,8,6),new Se({color:16725067}));e.position.set(0,.28,0);const n=new Ut(new Pn(.012,.012,.18,6),new Se({color:14672872}));n.position.set(.25,.32,0);const i=new Ut(new Qi(.8,1.1,26),new Se({color:16725067,transparent:!0,opacity:.5,side:Ie}));i.rotation.x=-Math.PI/2,i.position.y=.04,this.group.add(t,e,n,i),this.lightMesh=e,this.pulseMesh=i,this.group.userData.isBomb=!0,this.scene.add(this.group)}resetRound(){this.state=jt.NOT_PLANTED,this.position.set(0,0,0),this.site=null,this.timer=35,this.plantProgress=0,this.defuseProgress=0,this.entity=null,this.plantingEntity=null,this.defusingEntity=null,this.isBotAction=!1,this.hide()}hide(){this.group.visible=!1,this.visible=!1}show(t){this.group.position.copy(t),this.group.position.y=0,this.group.visible=!0,this.visible=!0}canPlant(t,e){if(!t||!t.isAlive()||t.team!=="attackers"||this.state!==jt.NOT_PLANTED&&this.state!==jt.PLANTING)return!1;const n=this.map.siteAt(t.mesh.position);return!(!n||e&&n.id!==e)}startPlant(t,e=!1){return this.canPlant(t)?(this.state=jt.PLANTING,this.site=this.map.siteAt(t.mesh.position).id,this.position.copy(t.mesh.position),this.position.y=0,this.plantProgress=0,this.plantingEntity=t,this.isBotAction=e,this.audio.plant(),!0):!1}updatePlant(t,e=!0){var i,r,a,o;if(this.state!==jt.PLANTING)return!1;if(!e||!((i=this.plantingEntity)!=null&&i.isAlive())||((r=this.map.siteAt(this.plantingEntity.mesh.position))==null?void 0:r.id)!==this.site)return this.state=jt.NOT_PLANTED,this.plantProgress=0,this.plantingEntity=null,this.site=null,!1;const n=((o=(a=this.plantingEntity.character)==null?void 0:a.passive.flags)==null?void 0:o.bombSpeed)||1;return this.plantProgress+=t*(1/n),this.plantProgress>=3.2?(this.completePlant(),!0):!1}completePlant(){this.state=jt.PLANTED,this.timer=35,this.plantProgress=0,this.show(this.position),this.audio.bombBeep(1)}canDefuse(t){return!t||!t.isAlive()||t.team!=="defenders"||this.state!==jt.PLANTED&&this.state!==jt.DEFUSING?!1:t.mesh.position.distanceTo(this.position)<3.2}startDefuse(t,e=!1){return this.canDefuse(t)?(this.state=jt.DEFUSING,this.defusingEntity=t,this.defuseProgress=0,this.isBotAction=e,this.audio.defuse(),!0):!1}updateDefuse(t,e=!0){var i,r,a;if(this.state!==jt.DEFUSING)return!1;if(!e||!((i=this.defusingEntity)!=null&&i.isAlive())||this.defusingEntity.mesh.position.distanceTo(this.position)>3.4)return this.state=jt.PLANTED,this.defuseProgress=0,this.defusingEntity=null,!1;const n=((a=(r=this.defusingEntity.character)==null?void 0:r.passive.flags)==null?void 0:a.bombSpeed)||1;return this.defuseProgress+=t*(1/n),this.defuseProgress>=5?(this.defused(),!0):!1}defused(){this.state=jt.DEFUSED,this.defuseProgress=0,this.defusingEntity=null,this.audio.defuse()}explode(){this.state=jt.EXPLODED,this.audio.explosion(),this.hide()}update(t){if(this.state===jt.PLANTED||this.state===jt.DEFUSING){this.timer-=t;const e=this.timer<8?.24:this.timer<16?.45:.85;this.lastBeep-=t,this.lastBeep<=0&&(this.audio.bombBeep(this.timer<8?1.6:1),this.lastBeep=e),this.lightMesh.material.color.setHex(Math.floor(performance.now()/180)%2?16725067:8917534);const n=1+Math.sin(performance.now()*.008)*.1;if(this.pulseMesh.scale.setScalar(n),this.pulseMesh.material.opacity=.28+Math.sin(performance.now()*.006)*.15,this.timer<=0)return this.explode(),!0}else this.lightMesh.material.color.setHex(16725067),this.pulseMesh.scale.setScalar(1);return!1}status(){return{state:this.state,timer:this.timer,site:this.site,plantProgress:this.plantProgress,defuseProgress:this.defuseProgress,position:this.position.clone()}}}const re={WAITING_FOR_PLAYERS:"waitingForPlayers",PREPARING:"preparingRound",STARTING:"roundStarting",ACTIVE:"roundActive",BOMB_PLANTED:"bombPlanted",ENDING:"roundEnding",MATCH_FINISHED:"matchFinished"};class ig{constructor({teamManager:t,bomb:e,audio:n,settings:i}){this.teamManager=t,this.bomb=e,this.audio=n,this.settings=i,this.state=re.WAITING_FOR_PLAYERS,this.roundNumber=0,this.roundTarget=i.get("roundTarget"),this.timer=0,this.roundTime=95,this.prepTime=3.2,this.endDelay=3.4,this.onStateChange=null,this.onRoundStart=null,this.onRoundEnd=null,this.onMatchEnd=null}setState(t){var e;this.state!==t&&(this.state=t,(e=this.onStateChange)==null||e.call(this,t,this.roundNumber))}startMatch(){this.roundTarget=Number(this.settings.get("roundTarget")),this.teamManager.resetMatch(),this.roundNumber=0,this.setState(re.WAITING_FOR_PLAYERS),this.startRound()}startRound(){var t;this.roundNumber+=1,this.teamManager.resetRoundState(),this.bomb.resetRound(),this.roundTime=95,this.setState(re.PREPARING),this.timer=this.prepTime,(t=this.onRoundStart)==null||t.call(this,this.roundNumber,this.state),this.audio.roundStart()}activateRound(){var t;this.setState(re.ACTIVE),this.timer=this.roundTime,(t=this.onRoundStart)==null||t.call(this,this.roundNumber,this.state)}update(t){switch(this.state){case re.PREPARING:this.timer-=t,this.timer<=0&&this.activateRound();break;case re.ACTIVE:case re.BOMB_PLANTED:this.timer-=t,this.checkElimination(),this.state===re.ACTIVE&&this.timer<=0&&this.endRound("defenders","Tempo esgotado");break;case re.ENDING:if(this.timer-=t,this.timer<=0){const e=this.matchWinner();e?this.finishMatch(e):this.startRound()}break}}checkElimination(){const t=this.teamManager.playersAliveCount();if(t.attackers===0&&this.bomb.state!==jt.PLANTED){this.endRound("defenders","Atacantes eliminados");return}t.defenders===0&&this.endRound("attackers","Defensores eliminados")}onBombExploded(){this.state===re.BOMB_PLANTED&&this.endRound("attackers","Bomba explodiu")}onBombDefused(){this.state!==re.BOMB_PLANTED&&this.state!==re.ACTIVE||this.endRound("defenders","Bomba desarmada")}endRound(t,e){var n;this.state===re.ENDING||this.state===re.MATCH_FINISHED||(this.teamManager.addScore(t,1),this.setState(re.ENDING),this.timer=this.endDelay,(n=this.onRoundEnd)==null||n.call(this,t,e,this.roundNumber))}matchWinner(){const t=Number(this.settings.get("roundTarget"));return this.teamManager.attackersScore>=t?"attackers":this.teamManager.defendersScore>=t?"defenders":null}finishMatch(t){var e;this.setState(re.MATCH_FINISHED),(e=this.onMatchEnd)==null||e.call(this,t)}status(){return{state:this.state,roundNumber:this.roundNumber,timer:this.timer,roundTarget:Number(this.settings.get("roundTarget")),stateLabel:this.stateLabel()}}stateLabel(){switch(this.state){case re.WAITING_FOR_PLAYERS:return"PREPARANDO";case re.PREPARING:return"PREPARAÇÃO";case re.STARTING:return"INICIANDO";case re.ACTIVE:return"ROUND ATIVO";case re.BOMB_PLANTED:return"BOMBA PLANTADA";case re.ENDING:return"FIM DE ROUND";case re.MATCH_FINISHED:return"PARTIDA ENCERRADA";default:return"AGUARDANDO"}}}class sg{constructor(){this.root=document.getElementById("hud-layer"),this.elements={playerRoot:this.root,atkScore:document.getElementById("hud-atk-score"),defScore:document.getElementById("hud-def-score"),atkAlive:document.getElementById("hud-atk-alive"),defAlive:document.getElementById("hud-def-alive"),roundLabel:document.getElementById("hud-round-label"),timer:document.getElementById("hud-timer"),bombClock:document.getElementById("hud-bomb-clock"),objective:document.getElementById("hud-objective"),objectiveText:document.querySelector("#hud-objective span"),killfeed:document.getElementById("killfeed"),minimap:document.getElementById("minimap"),minimapSite:document.getElementById("minimap-site"),crosshair:document.getElementById("crosshair"),hitmarker:document.getElementById("hitmarker"),damageVignette:document.getElementById("damage-vignette"),killBanner:document.getElementById("kill-banner"),killName:document.getElementById("kill-name"),abilityFeed:document.getElementById("ability-feed"),playerName:document.getElementById("hud-player-name"),playerRole:document.getElementById("hud-player-role"),healthFill:document.getElementById("health-fill"),healthText:document.getElementById("health-text"),shieldRow:document.getElementById("shield-row"),shieldFill:document.getElementById("shield-fill"),weapon:document.getElementById("hud-weapon"),ammo:document.getElementById("hud-ammo"),reserve:document.getElementById("hud-reserve"),reloadBar:document.getElementById("reload-bar"),abilityActive:document.getElementById("ability-active"),abilityActiveIcon:document.getElementById("ability-active-icon"),abilityActiveName:document.getElementById("ability-active-name"),abilityActiveCd:document.getElementById("ability-active-cd"),abilityActiveRing:document.getElementById("ability-active-ring"),abilitySpecial:document.getElementById("ability-special"),abilitySpecialIcon:document.getElementById("ability-special-icon"),abilitySpecialName:document.getElementById("ability-special-name"),abilitySpecialCd:document.getElementById("ability-special-cd"),abilitySpecialRing:document.getElementById("ability-special-ring"),prompt:document.getElementById("interaction-prompt"),promptKey:document.getElementById("prompt-key"),promptTitle:document.getElementById("prompt-title"),promptSub:document.getElementById("prompt-sub"),promptFill:document.getElementById("prompt-progress-fill"),roundBanner:document.getElementById("round-banner"),roundBannerKicker:document.getElementById("round-banner-kicker"),roundBannerTitle:document.getElementById("round-banner-title"),roundBannerSub:document.getElementById("round-banner-sub"),deathOverlay:document.getElementById("death-overlay"),deathDamage:document.getElementById("death-damage"),deathKills:document.getElementById("death-kills"),matchEnd:document.getElementById("match-end"),matchEndTitle:document.getElementById("match-end-title"),matchEndSub:document.getElementById("match-end-sub"),matchScoreAtk:document.getElementById("match-score-atk"),matchScoreDef:document.getElementById("match-score-def"),matchStats:document.getElementById("match-stats"),mobileControls:document.getElementById("mobile-controls"),mobileInteract:document.getElementById("m-btn-interact"),toastRoot:document.getElementById("toast-root")},this.minimapCtx=this.elements.minimap.getContext("2d"),this.lastHealth=100,this.hitmarkerTimer=0,this.killBannerTimer=0,this.damageTimer=0,this.promptText=null}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden")}update(t,e){var g,v,m,d;const n=t.player,i=t.round,r=t.bomb,a=t.teamManager;this.elements.atkScore.textContent=a.attackersScore,this.elements.defScore.textContent=a.defendersScore;const o=a.playersAliveCount();this.elements.atkAlive.textContent=`${o.attackers} VIVOS`,this.elements.defAlive.textContent=`${o.defenders} VIVOS`,this.elements.roundLabel.textContent=`ROUND ${i.roundNumber}`,i.state==="bombPlanted"||r.state==="planted"||r.state==="defusing"?(this.elements.timer.textContent=this.formatTime(r.timer),this.elements.bombClock.classList.remove("hidden"),this.elements.bombClock.querySelector("strong").textContent=this.formatTime(r.timer)):(this.elements.timer.textContent=this.formatTime(i.timer),this.elements.bombClock.classList.add("hidden"));const c=Math.max(0,Math.round(n.health.currentHealth)),l=n.health.maxHealth;this.elements.healthFill.style.width=`${c/l*100}%`,this.elements.healthText.textContent=c,this.elements.healthFill.parentElement.classList.toggle("low",c<=35),n.health.shield>0?(this.elements.shieldRow.classList.remove("hidden"),this.elements.shieldFill.style.width=`${Math.min(100,n.health.shield)}%`):this.elements.shieldRow.classList.add("hidden");const u=n.weapon.weapon;if(this.elements.weapon.textContent=u.name,this.elements.ammo.textContent=u.currentAmmo,this.elements.reserve.textContent=u.reserveAmmo,n.weapon.reloading){this.elements.reloadBar.classList.remove("hidden");const E=1-n.weapon.reloadTimer/u.reloadTime;this.elements.reloadBar.querySelector("i").style.width=`${E*100}%`}else this.elements.reloadBar.classList.add("hidden");const h=n.abilityController.status();if(this.elements.abilityActiveIcon.textContent=((g=h.active)==null?void 0:g.icon)||"◈",this.elements.abilityActiveName.textContent=((v=h.active)==null?void 0:v.name)||"HABILIDADE",h.activeReady)this.elements.abilityActiveCd.textContent="PRONTO",this.elements.abilityActiveCd.classList.add("ready"),this.elements.abilityActiveRing.style.strokeDashoffset="276",this.elements.abilityActive.classList.remove("cooling");else{const E=1-h.activeCooldown/h.active.cooldown;this.elements.abilityActiveCd.textContent=`${h.activeCooldown.toFixed(1)}s`,this.elements.abilityActiveCd.classList.remove("ready"),this.elements.abilityActiveRing.style.strokeDashoffset=`${276*(1-E)}`,this.elements.abilityActive.classList.add("cooling")}if(this.elements.abilitySpecialIcon.textContent=((m=h.special)==null?void 0:m.icon)||"✦",this.elements.abilitySpecialName.textContent=((d=h.special)==null?void 0:d.name)||"ESPECIAL",h.specialReady)this.elements.abilitySpecialCd.textContent="PRONTO",this.elements.abilitySpecialCd.classList.add("ready"),this.elements.abilitySpecialRing.style.strokeDashoffset="276",this.elements.abilitySpecial.classList.remove("cooling");else{const E=1-h.specialCooldown/h.special.cooldown;this.elements.abilitySpecialCd.textContent=`${h.specialCooldown.toFixed(1)}s`,this.elements.abilitySpecialCd.classList.remove("ready"),this.elements.abilitySpecialRing.style.strokeDashoffset=`${276*(1-E)}`,this.elements.abilitySpecial.classList.add("cooling")}let f="AVANCE PARA O SITE";n.team==="attackers"?r.state==="notPlanted"||r.state==="planting"?f="PLANTE A BOMBA":(r.state==="planted"||r.state==="defusing")&&(f="DEFENDA A BOMBA"):n.team==="defenders"&&(r.state==="notPlanted"?f="DEFENDA OS SITES":f="DESARME A BOMBA"),i.state==="preparingRound"&&(f="PREPARE-SE"),i.state==="roundEnding"&&(f=i.lastReason||"FIM DE ROUND"),this.elements.objectiveText.textContent!==f&&(this.elements.objectiveText.textContent=f),this.updateMinimap(t),this.hitmarkerTimer>0&&(this.hitmarkerTimer-=e,this.hitmarkerTimer<=0&&this.elements.hitmarker.classList.remove("show","kill")),this.killBannerTimer>0&&(this.killBannerTimer-=e,this.killBannerTimer<=0&&this.elements.killBanner.classList.add("hidden")),this.damageTimer>0?(this.damageTimer-=e,this.elements.damageVignette.style.opacity=Math.max(0,this.damageTimer/.6)):this.elements.damageVignette.style.opacity=0;const p=!n.health.isAlive;this.elements.deathOverlay.classList.toggle("hidden",!p),p&&(this.elements.deathDamage.textContent=Math.round(n.health.damageTaken),this.elements.deathKills.textContent=n.kills||0)}formatTime(t){const e=Math.max(0,t),n=Math.floor(e/60),i=Math.floor(e%60);return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}hitmarker(t=!1){this.elements.hitmarker.classList.add("show"),this.elements.hitmarker.classList.toggle("kill",t),this.hitmarkerTimer=t?.3:.16}killBanner(t){this.elements.killName.textContent=t,this.elements.killBanner.classList.remove("hidden"),this.killBannerTimer=1.6}damageFlash(){this.damageTimer=.55}addKillEntry(t,e,n="VECTOR-7"){const i=document.createElement("div");for(i.className="kill-entry",i.innerHTML=`<b>${t}</b> <span class="friendly">✕</span> <span class="enemy">${e}</span>`,this.elements.killfeed.prepend(i);this.elements.killfeed.children.length>5;)this.elements.killfeed.lastChild.remove();setTimeout(()=>i.remove(),5e3)}abilityFeed(t){const e=document.createElement("span");e.textContent=t,this.elements.abilityFeed.innerHTML="",this.elements.abilityFeed.appendChild(e),setTimeout(()=>e.remove(),1600)}toast(t){const e=document.createElement("div");e.className="toast",e.textContent=t,this.elements.toastRoot.appendChild(e),setTimeout(()=>e.remove(),3e3)}showPrompt({key:t="E",title:e,sub:n="",progress:i=null}){this.elements.prompt.classList.remove("hidden"),this.elements.promptKey.textContent=t,this.elements.promptTitle.textContent=e,this.elements.promptSub.textContent=n,i===null?this.elements.promptFill.style.width="0%":this.elements.promptFill.style.width=`${Math.max(0,Math.min(100,i*100))}%`}hidePrompt(){this.elements.prompt.classList.add("hidden")}showRoundBanner(t,e,n){this.elements.roundBannerKicker.textContent=t,this.elements.roundBannerTitle.textContent=e,this.elements.roundBannerSub.textContent=n,this.elements.roundBanner.classList.remove("hidden"),clearTimeout(this.bannerTimeout),this.bannerTimeout=setTimeout(()=>this.elements.roundBanner.classList.add("hidden"),2400)}hideRoundBanner(){this.elements.roundBanner.classList.add("hidden")}showMatchEnd(t,e,n,i){const r=t===e;this.elements.matchEndTitle.textContent=r?"VITÓRIA":"DERROTA",this.elements.matchEndTitle.classList.toggle("loss",!r),this.elements.matchEndSub.textContent=r?"Sua equipe dominou a Doca Meridiana.":"Sua equipe foi superada. Ajuste o plano e volte.",this.elements.matchScoreAtk.textContent=n.attackers,this.elements.matchScoreDef.textContent=n.defenders,this.elements.matchStats.innerHTML=`
      <div><span>ELIMINAÇÕES</span><b>${i.kills}</b></div>
      <div><span>DANO CAUSADO</span><b>${Math.round(i.damage)}</b></div>
      <div><span>ROUNDS</span><b>${i.rounds}</b></div>
    `,this.elements.matchEnd.classList.remove("hidden")}hideMatchEnd(){this.elements.matchEnd.classList.add("hidden")}updateMinimap(t){const e=this.minimapCtx,n=this.elements.minimap.width,i=this.elements.minimap.height;e.clearRect(0,0,n,i),e.fillStyle="rgba(9,13,19,0.65)",e.fillRect(0,0,n,i);const r=t.map,a=n/70,o=i/44,c=h=>(h+35)*a,l=h=>(h+22)*o;r.siteZones.forEach(h=>{e.strokeStyle=h.id==="A"?"#ff5b2e":"#42d9ee",e.lineWidth=1.5,e.beginPath(),e.arc(c(h.center.x),l(h.center.y),h.radius*a,0,Math.PI*2),e.stroke(),e.fillStyle=h.id==="A"?"#ff5b2e":"#42d9ee",e.font="700 10px Inter, sans-serif",e.textAlign="center",e.fillText(h.id,c(h.center.x),l(h.center.y)+4)}),e.fillStyle="rgba(255,255,255,0.08)",r.colliders.forEach(h=>{e.fillRect(c(h.minX),l(h.minZ),(h.maxX-h.minX)*a,(h.maxZ-h.minZ)*o)});const u=(h,f,p)=>{e.fillStyle=f,e.beginPath(),e.arc(c(h.mesh.position.x),l(h.mesh.position.z),p?4:3,0,Math.PI*2),e.fill()};t.teamManager.get("attackers").forEach(h=>{h.isAlive()&&u(h,"#ff6b35",h.isPlayer)}),t.teamManager.get("defenders").forEach(h=>{h.isAlive()&&u(h,"#42d9ee",h.isPlayer)}),t.bomb.visible&&(e.fillStyle="#ff344b",e.fillRect(c(t.bomb.position.x)-3,l(t.bomb.position.z)-3,6,6)),this.elements.minimapSite.textContent=t.bomb.site?`SITE ${t.bomb.site}`:"SITES A / B"}}const Aa={pistol:{id:"pistol",name:"PÓLVORA-9",type:"PISTOLA",damage:26,headshotMultiplier:1.9,fireRate:.19,magazineSize:12,reserveAmmo:48,reloadTime:1.4,range:32,spread:.012,recoil:.055,automatic:!1,sound:"pistol",scale:1},rifle:{id:"rifle",name:"VECTOR-7",type:"RIFLE AUTOMÁTICO",damage:21,headshotMultiplier:2.1,fireRate:.095,magazineSize:30,reserveAmmo:90,reloadTime:2.2,range:48,spread:.018,recoil:.07,automatic:!0,sound:"rifle",scale:1.18},smg:{id:"smg",name:"STING-4",type:"SUBMETRALHADORA",damage:17,headshotMultiplier:1.75,fireRate:.07,magazineSize:24,reserveAmmo:96,reloadTime:1.9,range:28,spread:.033,recoil:.045,automatic:!0,sound:"smg",scale:.92},shotgun:{id:"shotgun",name:"RUÍDO-12",type:"ESPINGARDA",damage:15,pellets:7,headshotMultiplier:1.4,fireRate:.68,magazineSize:6,reserveAmmo:24,reloadTime:2.8,range:18,spread:.052,recoil:.14,automatic:!1,sound:"shotgun",scale:1.12},sniper:{id:"sniper",name:"HORIZONTE",type:"FUZIL DE PRECISÃO",damage:71,headshotMultiplier:2.2,fireRate:1.05,magazineSize:5,reserveAmmo:20,reloadTime:3.1,range:90,spread:.002,recoil:.25,automatic:!1,sound:"sniper",scale:1.4}};function Xs(s){return Aa[s]||Aa.rifle}function rg(s){const t=Xs(s);return{name:t.name,type:t.type,damage:t.damage,fireRate:Math.round(60/t.fireRate),magazine:t.magazineSize,range:Math.round(t.range*10),accuracy:Math.max(4,Math.min(100,Math.round(100-t.spread*1400)))}}class ag{constructor({settings:t,audio:e,onCharacterChanged:n,onSkinChanged:i,onStartMatch:r}){this.settings=t,this.audio=e,this.onCharacterChanged=n,this.onSkinChanged=i,this.onStartMatch=r,this.selectedSide="attackers",this.screens=document.querySelectorAll("[data-screen-view]"),this.selectedCharacter=Ws(t.get("selectedCharacter")),this.initMenu(),this.buildRoster(),this.buildArmory(),this.buildCustomization(),this.bindSettings(),this.updateHero(),this.updateDetail(),this.updateDeploy()}initMenu(){document.querySelectorAll("[data-screen]").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const n=t.dataset.screen;n==="characters"&&t.id==="deploy-change"&&this.hideDeploy(),this.showScreen(n),this.audio.ui(n==="main"?"back":"click")})}),document.getElementById("quickplay-btn").addEventListener("click",()=>{this.audio.ui("confirm"),this.showDeploy()}),document.getElementById("deploy-close").addEventListener("click",()=>{this.audio.ui("back"),this.hideDeploy()}),document.querySelectorAll(".side-card").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".side-card").forEach(e=>e.classList.remove("selected")),t.classList.add("selected"),this.selectedSide=t.dataset.side,this.audio.ui("click")})}),document.getElementById("start-match-btn").addEventListener("click",()=>{var n;const t=document.getElementById("bot-difficulty").value,e=Number(document.getElementById("round-target").value);this.settings.set("botDifficulty",t),this.settings.set("roundTarget",e),this.audio.ui("deploy"),this.hideDeploy(),(n=this.onStartMatch)==null||n.call(this,{side:this.selectedSide,difficulty:t,roundTarget:e})}),document.getElementById("audio-toggle").addEventListener("click",()=>{const e=this.settings.get("masterVolume")>0;this.settings.set("masterVolume",e?0:.8),document.getElementById("audio-toggle").classList.toggle("active",!e),this.audio.ui("click")}),document.getElementById("fullscreen-btn").addEventListener("click",()=>{var t,e,n;document.fullscreenElement?(n=document.exitFullscreen)==null||n.call(document):(e=(t=document.documentElement).requestFullscreen)==null||e.call(t).catch(()=>{}),this.audio.ui("click")})}showScreen(t){this.screens.forEach(e=>e.classList.toggle("active",e.dataset.screenView===t)),this.currentScreen=t,t==="main"&&this.updateHero()}currentScreenName(){return this.currentScreen||"main"}showDeploy(){document.getElementById("deploy-modal").classList.remove("hidden"),this.updateDeploy()}hideDeploy(){document.getElementById("deploy-modal").classList.add("hidden")}updateHero(){const t=this.selectedCharacter;document.getElementById("hero-name").textContent=t.name;const e=fi(t.role);document.getElementById("hero-role").textContent=`${e.label} • ${t.codename||e.description.split(" ")[0]}`,document.getElementById("hero-desc").textContent=t.description,document.getElementById("hero-age").textContent=`${t.age} ANOS`}buildRoster(){const t=document.getElementById("roster");t.innerHTML="",_i.forEach((e,n)=>{const i=fi(e.role),r=document.createElement("button");r.className="roster-card",r.dataset.characterId=e.id,r.style.setProperty("--accent",i.color),r.innerHTML=`
        <span class="roster-num">${String(n+1).padStart(2,"0")}</span>
        <span class="roster-avatar">${_c(e)}</span>
        <span class="roster-name">${e.name}</span>
        <span class="roster-role">${i.label}</span>
      `,r.addEventListener("click",()=>{this.selectCharacter(e.id),this.audio.ui("click")}),t.appendChild(r)}),this.updateRosterSelection()}updateRosterSelection(){document.querySelectorAll(".roster-card").forEach(t=>{t.classList.toggle("selected",t.dataset.characterId===this.selectedCharacter.id)})}selectCharacter(t){var n;const e=Ws(t);this.selectedCharacter=e,this.settings.set("selectedCharacter",t),this.settings.set("selectedSkin",0),this.updateRosterSelection(),this.updateDetail(),this.updateHero(),this.updateCustomization(),this.updateDeploy(),(n=this.onCharacterChanged)==null||n.call(this,e,0)}updateDetail(){const t=this.selectedCharacter,e=_i.findIndex(l=>l.id===t.id),n=fi(t.role);document.getElementById("detail-index").textContent=`${String(e+1).padStart(2,"0")} / ${String(_i.length).padStart(2,"0")}`,document.getElementById("detail-name").textContent=t.name,document.getElementById("detail-age").textContent=`${t.age} ANOS • ${t.codename||n.label}`,document.getElementById("detail-role").textContent=n.label,document.getElementById("detail-role").style.setProperty("--accent",n.color),document.querySelector(".character-detail").style.setProperty("--accent",n.color),document.getElementById("detail-desc").textContent=`${t.description} ${t.appearance} Personalidade: ${t.personality}`;const i=Math.min(100,t.health/120*100),r=Math.min(100,t.movement.run/8.2*100),a=Math.max(25,Math.min(100,100-t.movement.mass*55));document.getElementById("stat-health").style.width=`${i}%`,document.getElementById("stat-health-val").textContent=t.health,document.getElementById("stat-speed").style.width=`${r}%`,document.getElementById("stat-speed-val").textContent=t.movement.run.toFixed(1),document.getElementById("stat-control").style.width=`${a}%`,document.getElementById("stat-control-val").textContent=Math.round(a);const o=[{label:"PASSIVA",icon:"◆",...t.passive},{label:"ATIVA",icon:t.active.icon,...t.active},{label:"ESPECIAL",icon:t.special.icon,...t.special}];document.getElementById("detail-abilities").innerHTML=o.map(l=>`
      <div class="ability-row">
        <div class="ab-icon">${l.icon||"◆"}</div>
        <div><b>${l.name}</b><small>${l.description}</small></div>
        <div class="ab-type">${l.label}<br>${l.cooldown?`${l.cooldown}s`:"AUTO"}</div>
      </div>
    `).join("");const c=document.getElementById("detail-skins");c.innerHTML="",t.skins.forEach((l,u)=>{const h=document.createElement("button");h.className="swatch"+(u===(this.settings.get("selectedSkin")||0)?" active":""),h.style.background=`linear-gradient(120deg, ${l.colors.cloth}, ${l.colors.accent})`,h.title=l.name,h.addEventListener("click",()=>{var f;this.settings.set("selectedSkin",u),this.updateDetail(),this.updateCustomization(),(f=this.onSkinChanged)==null||f.call(this,t,u),this.audio.ui("click")}),c.appendChild(h)}),document.getElementById("select-character-btn").addEventListener("click",()=>{this.audio.ui("confirm"),this.showScreen("main"),this.updateHero()}),document.getElementById("detail-deploy-btn").addEventListener("click",()=>{this.audio.ui("confirm"),this.showDeploy()})}buildArmory(){const t=document.getElementById("armory-grid");t.innerHTML="",Object.values(Aa).forEach(e=>{const n=rg(e.id),i=document.createElement("div");i.className="weapon-card",i.style.setProperty("--accent",e.id==="pistol"?"#42d9ee":e.id==="sniper"?"#f8c95c":e.id==="shotgun"?"#ff5b2e":"#74e69a"),i.innerHTML=`
        <div class="weapon-art"><div class="gun-silhouette"></div></div>
        <h3>${e.name}</h3>
        <span class="weapon-type">${e.type}</span>
        <div class="weapon-stats">
          <div class="weapon-stat"><span>DANO</span><div class="bar"><i style="width:${Math.min(100,e.damage/80*100)}%"></i></div><b>${e.damage}</b></div>
          <div class="weapon-stat"><span>CADÊNCIA</span><div class="bar"><i style="width:${Math.min(100,n.fireRate/900*100)}%"></i></div><b>${n.fireRate}</b></div>
          <div class="weapon-stat"><span>MUNIÇÃO</span><div class="bar"><i style="width:${Math.min(100,e.magazineSize/30*100)}%"></i></div><b>${e.magazineSize}</b></div>
          <div class="weapon-stat"><span>PRECISÃO</span><div class="bar"><i style="width:${n.accuracy}%"></i></div><b>${n.accuracy}%</b></div>
        </div>
        <div class="weapon-footer"><span>${e.automatic?"AUTOMÁTICA":"SEMI-AUTOMÁTICA"}</span><b>DISPONÍVEL</b></div>
      `,t.appendChild(i)})}buildCustomization(){const t=[{id:0,name:"VC",colors:["#ff5b2e","#7b2b1c"]},{id:1,name:"ARENA",colors:["#42d9ee","#143241"]},{id:2,name:"MERIDIANA",colors:["#f8c95c","#40301c"]}],e=document.getElementById("banner-grid");e.innerHTML="",t.forEach(n=>{const i=document.createElement("button");i.className="banner-thumb",i.style.setProperty("--b1",n.colors[0]),i.style.setProperty("--b2",n.colors[1]),i.textContent=n.name,i.addEventListener("click",()=>{this.settings.set("selectedBanner",n.id),this.updateCustomization(),this.audio.ui("click")}),e.appendChild(i)}),this.updateCustomization()}updateCustomization(){const t=this.selectedCharacter,e=fi(t.role);document.getElementById("custom-name").textContent=t.name,document.getElementById("custom-role").textContent=`${e.label} • ${t.codename||e.description.split(".")[0]}`;const n=document.getElementById("custom-swatches");n.innerHTML="",t.skins.forEach((i,r)=>{const a=document.createElement("button");a.className="custom-swatch"+(r===(this.settings.get("selectedSkin")||0)?" active":""),a.style.background=`linear-gradient(120deg, ${i.colors.cloth}, ${i.colors.gear})`,a.innerHTML=`<span>${i.name}</span>`,a.addEventListener("click",()=>{var o;this.settings.set("selectedSkin",r),this.updateDetail(),this.updateCustomization(),(o=this.onSkinChanged)==null||o.call(this,t,r),this.audio.ui("click")}),n.appendChild(a)}),document.querySelectorAll(".banner-thumb").forEach((i,r)=>{i.classList.toggle("active",r===(this.settings.get("selectedBanner")||0))})}updateDeploy(){const t=this.selectedCharacter;document.getElementById("deploy-avatar").textContent=_c(t),document.getElementById("deploy-name").textContent=t.name,document.getElementById("deploy-role").textContent=`${fi(t.role).label} • ${t.codename||"OPERADORA"}`,document.getElementById("bot-difficulty").value=this.settings.get("botDifficulty"),document.getElementById("round-target").value=this.settings.get("roundTarget"),document.querySelectorAll(".side-card").forEach(e=>{e.classList.toggle("selected",e.dataset.side===this.selectedSide)})}bindSettings(){const t=this.settings,e=(r,a,o=l=>l,c=l=>l)=>{const l=document.getElementById(r),u=l.nextElementSibling,h=()=>{const f=Number(l.value),p=o(f);u&&(u.textContent=c(p));const g=(f-Number(l.min))/(Number(l.max)-Number(l.min))*100;l.style.setProperty("--p",`${g}%`),t.set(a,p)};return l.addEventListener("input",h),l.value=t.get(a),h(),l},n=(r,a)=>{const o=document.getElementById(r);return o.checked=!!t.get(a),o.addEventListener("change",()=>t.set(a,o.checked)),o},i=(r,a)=>{const o=document.getElementById(r);return o.value=t.get(a),o.addEventListener("change",()=>t.set(a,o.value)),o};e("sens-range","sensitivity",r=>r,r=>`${r.toFixed(1)}×`),e("stick-range","stickScale",r=>r/100,r=>`${Math.round(r*100)}%`),e("master-range","masterVolume",r=>r/100,r=>`${Math.round(r)}%`),e("music-range","musicVolume",r=>r/100,r=>`${Math.round(r)}%`),e("sfx-range","sfxVolume",r=>r/100,r=>`${Math.round(r)}%`),e("fov-range","fov",r=>r,r=>`${r}°`),i("quality-select","quality"),n("vibration-toggle","vibration"),n("invert-toggle","invertY"),n("shadows-toggle","shadows"),n("particles-toggle","particles"),document.getElementById("reset-settings").addEventListener("click",()=>{this.settings.reset(),this.audio.ui("back"),window.location.reload()})}}class ol{constructor(t=100){this.maxHealth=t,this.currentHealth=t,this.isAlive=!0,this.regenTimer=0,this.shield=0,this.shieldTimer=0,this.damageTaken=0,this.lastDamageTime=0}reset(t=this.maxHealth){this.currentHealth=Math.min(t,this.maxHealth),this.isAlive=!0,this.shield=0,this.shieldTimer=0,this.regenTimer=0,this.damageTaken=0,this.lastDamageTime=0}takeDamage(t,e){if(!this.isAlive)return 0;const n=Math.max(1,Math.round(t)),i=Math.min(this.shield,n);this.shield-=i;const r=n-i;return this.currentHealth=Math.max(0,this.currentHealth-r),this.damageTaken+=n,this.lastDamageTime=performance.now(),this.currentHealth<=0&&this.die(e),n}heal(t){this.isAlive&&(this.currentHealth=Math.min(this.maxHealth,this.currentHealth+t))}addShield(t,e){this.shield=Math.max(this.shield,t),this.shieldTimer=e}update(t){this.isAlive&&(this.shieldTimer>0&&(this.shieldTimer-=t,this.shieldTimer<=0&&(this.shield=0)),this.regenTimer>0&&(this.regenTimer-=t))}die(t){this.isAlive&&(this.isAlive=!1,this.currentHealth=0,this.onDeath&&this.onDeath(t))}}class og{constructor(t,e,n,i="attackers"){this.camera=t,this.audio=e,this.settings=n,this.team=i,this.raycaster=new al,this.raycaster.far=120,this.slots={primary:this.instantiate(xc(i)),secondary:this.instantiate("pistol")},this.currentSlot="primary",this.fireCooldown=0,this.reloading=!1,this.reloadTimer=0,this.recoilOffset=0,this.recoilVelocity=0,this.pellets=[],this.lastShotTime=0}instantiate(t){const e=Xs(t);return{...e,currentAmmo:e.magazineSize,reserveAmmo:e.reserveAmmo}}get weapon(){return this.slots[this.currentSlot]}switchTo(t){return!this.slots[t]||this.reloading||this.currentSlot===t?!1:(this.currentSlot=t,this.fireCooldown=Math.max(this.fireCooldown,.24),!0)}canFire(){return!this.reloading&&this.fireCooldown<=0&&this.weapon.currentAmmo>0}tryFire(t,e,n={}){var l,u,h;const i=this.weapon;if(!i.automatic&&!t)return!1;if(this.fireCooldown>0||this.reloading||i.currentAmmo<=0)return i.currentAmmo<=0&&this.weapon.reserveAmmo>0&&this.reload(),!1;const r=performance.now();if(r-this.lastShotTime<i.fireRate*1e3)return!1;this.lastShotTime=r,this.fireCooldown=i.fireRate,i.currentAmmo-=1;const a=this.camera.getWorldPosition(new w),o=new w;this.camera.getWorldDirection(o);const c=i.pellets||1;for(let f=0;f<c;f+=1){const p=o.clone(),g=i.spread*(((l=this.settings)==null?void 0:l.get("botDifficulty"))==="elite"?.9:1);p.x+=(Math.random()-.5)*g,p.y+=(Math.random()-.5)*g,p.z+=(Math.random()-.5)*g,p.normalize(),this.raycaster.set(a,p),this.raycaster.far=i.range;const m=this.raycaster.intersectObjects(e,!0).filter(d=>{const E=d.object.userData;return E.blockBullet?!0:E.isCharacter||E.isEntity||E.isBomb||E.isProp}).find(d=>d.object.userData.blockBullet||d.object.userData.isCharacter||d.object.userData.isEntity);if(m){const d=m.distance,E=i.damage*(1-Math.min(.55,d/i.range*.5)),T=m.object.userData.isHead||m.object.name==="head";(u=n.onHit)==null||u.call(n,{point:m.point,distance:d,damage:T?E*i.headshotMultiplier:E,isHead:T,object:m.object,userData:m.object.userData})}else(h=n.onMiss)==null||h.call(n,{origin:a,direction:p,distance:i.range})}return this.recoilVelocity+=i.recoil,!0}reload(){const t=this.weapon;return this.reloading||t.currentAmmo>=t.magazineSize||t.reserveAmmo<=0?!1:(this.reloading=!0,this.reloadTimer=t.reloadTime,this.audio.reload(),!0)}update(t){if(this.fireCooldown=Math.max(0,this.fireCooldown-t),this.reloading&&(this.reloadTimer-=t,this.reloadTimer<=0)){const e=this.weapon,n=e.magazineSize-e.currentAmmo,i=Math.min(n,e.reserveAmmo);e.currentAmmo+=i,e.reserveAmmo-=Math.max(0,i),this.reloading=!1,this.reloadTimer=0}this.recoilOffset+=this.recoilVelocity*t,this.recoilVelocity-=this.recoilOffset*18*t,this.recoilOffset=le.clamp(this.recoilOffset,-.12,.2),this.recoilVelocity*=.88}resetRound(){this.slots.primary=this.instantiate(xc(this.team)),this.slots.secondary=this.instantiate("pistol"),this.currentSlot="primary",this.reloading=!1,this.fireCooldown=0,this.reloadTimer=0,this.recoilOffset=0,this.recoilVelocity=0}}function xc(s){return"rifle"}const Yn={capsule:5,sphere:8,cylinder:8};function es(s,t={}){const e=new Rt(s).multiplyScalar(1.35);return new Se({color:e,transparent:!!t.transparent,opacity:t.opacity??1})}function We(s,t,e,n={}){const i=new Ut(new qa(s,t,Yn.capsule,Yn.sphere),es(e,n));return i.castShadow=!0,i.receiveShadow=!1,i}function wn(s,t,e={}){const n=new Ut(new qn(s,Yn.sphere,Yn.sphere/2),es(t,e));return n.castShadow=!0,n.receiveShadow=!1,n}function ve(s,t,e,n,i={}){const r=new Ut(new Ae(s,t,e),es(n,i));return r.castShadow=!0,r.receiveShadow=!1,r}function Ls(s,t,e,n,i={}){const r=new Ut(new Pn(s,t,e,Yn.cylinder),es(n,i));return r.castShadow=!0,r.receiveShadow=!1,r}class cg extends ue{constructor(t,e=0){super(),this.character=t,this.skinIndex=e%t.skins.length,this.colors=t.skins[this.skinIndex].colors,this.group=this,this.name=`character-${t.id}`,this.userData.isCharacter=!0,this.userData.characterId=t.id,this.buildBody(),this.buildGear(),this.buildHair(),this.buildFace(),this.buildWeaponProp(),this.parts=this.group.userData.parts,this.action={type:"idle",time:0},this.gait=0,this.lastFootstep=0}buildBody(){const t=this.colors.skin,e=this.colors.cloth,n=new ue;n.position.y=0,this.bodyRoot=n,this.group.add(n);const i=We(.245,.18,t);i.position.y=.82,i.scale.set(1.02,1,1),n.add(i);const r=We(.235,.2,e);r.position.y=.84,r.scale.set(1.08,.92,1),n.add(r);const a=We(.28,.38,e);a.position.y=1.2,a.scale.set(1.05,1.02,.92),n.add(a);const o=We(.255,.32,e);o.position.y=1.42,o.scale.set(1.03,1,.94),n.add(o);const c=ve(.46,.34,.2,this.colors.gear);c.position.set(0,1.35,.025),n.add(c);const l=ve(.42,.09,.16,this.colors.accent,{emissive:this.colors.accent});l.position.set(0,1.54,.02),n.add(l);const u=Ls(.075,.075,.1,t);u.position.y=1.58,n.add(u);const h=wn(.155,t);h.position.y=1.74,n.add(h);const f=new ue;[-.25,.25].forEach(p=>{const g=wn(.08,e);g.position.set(p,1.5,0),f.add(g)}),n.add(f),this.leftArm=new ue,this.rightArm=new ue,n.add(this.leftArm,this.rightArm),[this.leftArm,this.rightArm].forEach((p,g)=>{const v=We(.06,.16,e);v.position.y=-.16;const m=We(.055,.16,g===0?e:this.colors.gear);m.position.y=-.4;const d=wn(.065,this.colors.gear);d.position.y=-.58,p.add(v,m,d),p.position.set(g===0?-.25:.25,1.48,0),p.rotation.z=g===0?.25:-.25}),this.leftLeg=new ue,this.rightLeg=new ue,n.add(this.leftLeg,this.rightLeg),[this.leftLeg,this.rightLeg].forEach((p,g)=>{const v=We(.08,.2,e);v.position.y=-.22;const m=We(.07,.18,this.colors.gear);m.position.y=-.55;const d=ve(.1,.07,.19,"#25282d");d.position.set(0,-.72,.03),p.add(v,m,d),p.position.set(g===0?-.115:.115,.8,0)}),n.userData.parts={torso:a,upperTorso:o,head:h,chestPlate:c,collar:l,leftArm:this.leftArm,rightArm:this.rightArm,leftLeg:this.leftLeg,rightLeg:this.rightLeg,shoulders:f}}buildGear(){const t=this.colors.accent,e=this.colors.gear,n=this.bodyRoot,i=ve(.44,.07,.18,e);i.position.y=.95,n.add(i);const r=ve(.12,.09,.05,t,{});r.position.set(.14,.95,.09),n.add(r);const a=ve(.36,.28,.08,e);a.position.set(0,1.33,-.1),n.add(a);const o=Ls(.05,.05,.08,t,{});o.position.set(0,1.23,-.13),n.add(o);const c=this.character.role;if(c==="defense"||c==="assault"){const u=wn(.16,e);u.position.set(0,1.79,-.015),u.scale.set(1.05,.88,1.05),n.add(u);const h=ve(.18,.045,.06,t,{});h.position.set(0,1.76,.13),n.add(h)}else if(c==="recon"){const u=ve(.23,.07,.06,"#20242a");u.position.set(0,1.75,.12),n.add(u);const h=ve(.06,.035,.01,t,{});h.position.set(.05,1.75,.155),n.add(h);const f=l(.14,.018,e);f.rotation.x=Math.PI/2,f.position.y=1.74,n.add(f)}else if(c==="support"){const u=ve(.26,.05,.07,e);u.position.y=1.82,n.add(u);const h=ve(.035,.015,.02,t,{});h.position.set(0,1.38,.14),n.add(h)}else{const u=ve(.23,.04,.07,e);u.position.y=1.81,n.add(u);const h=Ls(.025,.025,.09,t,{});h.position.set(.1,1.28,-.12),n.add(h)}[this.leftLeg,this.rightLeg].forEach(u=>{const h=ve(.13,.11,.11,e);h.position.set(0,-.34,.02),u.add(h)});function l(u,h,f){const p=new ts(u,h,Yn.capsule,Yn.sphere),g=new Ut(p,es(f));return g.castShadow=!0,g}}buildHair(){const t=this.colors.hair,e=this.bodyRoot,n=new ue,i=this.character.role;if(i==="assault"||i==="recon"){const r=We(.05,.18,t);r.position.set(0,1.66,-.14),r.rotation.x=-.35,n.add(r);const a=wn(.135,t);a.position.set(0,1.82,-.03),a.scale.set(1.08,.72,1.02),n.add(a)}else if(i==="support"){const r=wn(.09,t);r.position.set(0,1.77,-.11),n.add(r);const a=wn(.13,t);a.position.set(0,1.83,-.02),a.scale.set(1.05,.58,1),n.add(a)}else if(i==="defense"){const r=[];for(let a=0;a<4;a+=1){const o=We(.025,.16,t);o.position.set((a-1.5)*.055,1.68,-.14),o.rotation.x=-.18,r.push(o)}n.add(...r)}else{const r=We(.07,.28,t);r.position.set(0,1.62,-.13),n.add(r)}e.add(n),e.userData.parts.hair=n}buildFace(){const t=this.bodyRoot,e=new ue;[-.06,.06].forEach(i=>{const r=wn(.021,"#121620");r.position.set(i,1.75,.14),r.scale.set(1,.8,.5),e.add(r)});const n=ve(.09,.012,.008,this.colors.accent,{emissive:this.colors.accent});n.position.set(0,1.79,.145),t.add(e,n)}buildWeaponProp(){const t=new ue,e="#2a2f36",n=this.colors.accent,i=Ls(.02,.02,.36,e);i.rotation.z=Math.PI/2,i.position.x=.18,t.add(i);const r=ve(.18,.06,.05,e);r.position.x=.04,t.add(r);const a=ve(.05,.09,.04,e);a.position.set(-.03,-.05,0),t.add(a);const o=ve(.02,.02,.02,n,{});o.position.set(.13,.03,0),t.add(o),t.position.set(.19,1.4,.12),t.rotation.set(0,-.15,0),this.bodyRoot.add(t),this.weaponProp=t,this.bodyRoot.userData.parts.weaponProp=t}setSkin(t){this.skinIndex=t%this.character.skins.length,this.bodyRoot.userData.parts.collar.material.color.set(this.colors.accent)}setAction(t,e=0){this.action.type=t,this.action.time=e}animate(t,e=0,n=!0,i=!0){if(!this.bodyRoot)return;this.gait+=t*(e*2.2+.4);const r=this.bodyRoot.userData.parts;if(this.action.time,this.action.time+=t,!i){this.bodyRoot.rotation.x=le.lerp(this.bodyRoot.rotation.x,1.4,Math.min(1,t*4)),this.bodyRoot.position.y=le.lerp(this.bodyRoot.position.y,-.18,Math.min(1,t*4)),r.leftArm.rotation.z=le.lerp(r.leftArm.rotation.z,1.3,t*5),r.rightArm.rotation.z=le.lerp(r.rightArm.rotation.z,-1.3,t*5);return}this.bodyRoot.rotation.x=le.lerp(this.bodyRoot.rotation.x,0,t*6),this.bodyRoot.position.y=le.lerp(this.bodyRoot.position.y,0,t*6);const a=le.clamp(e/7.5,0,1),o=Math.sin(this.gait*2.6)*.42*a,c=Math.sin(this.gait*5.2)*.04*a;if(this.bodyRoot.position.y+=c,r.leftLeg.rotation.x=o,r.rightLeg.rotation.x=-o,r.leftArm.rotation.x=-o*.5,r.rightArm.rotation.x=o*.45,n||(r.leftLeg.rotation.x=-.25,r.rightLeg.rotation.x=.28,r.leftArm.rotation.x=-.35,r.rightArm.rotation.x=-.3),this.action.type==="shoot"&&this.action.time<.16){const l=this.action.time/.16;r.rightArm.rotation.x=-.35+l*.16,r.rightArm.rotation.z=-.25+l*.12,this.weaponProp.position.z=.12+l*.012}else this.weaponProp.position.z=le.lerp(this.weaponProp.position.z,.12,t*5);if(this.action.type==="reload"&&this.action.time<1.6?(r.leftArm.rotation.x=-.6,r.rightArm.rotation.x=-.55,this.weaponProp.rotation.z=Math.sin(this.action.time*4)*.14):this.weaponProp.rotation.z=le.lerp(this.weaponProp.rotation.z,0,t*5),this.action.type==="ability"&&this.action.time<.55){const l=Math.sin(this.action.time*14)*.22;this.bodyRoot.rotation.y=l,r.leftArm.rotation.z=.25+Math.abs(l)*.6,r.rightArm.rotation.z=-.25-Math.abs(l)*.6}else this.bodyRoot.rotation.y=le.lerp(this.bodyRoot.rotation.y,0,t*5);this.action.type==="plantBomb"&&this.action.time<1.1&&(r.rightArm.rotation.x=-.7,r.leftArm.rotation.x=-.55,this.bodyRoot.position.y=-.05),this.action.type==="defuseBomb"&&this.action.time<1.1&&(r.rightArm.rotation.x=-.62,r.leftArm.rotation.x=-.5,this.bodyRoot.position.y=-.08)}}function $a(s,t=0){return new cg(s,t)}class lg{constructor({camera:t,scene:e,settings:n,audio:i,map:r,character:a,team:o,id:c="player"}){this.camera=t,this.scene=e,this.settings=n,this.audio=i,this.map=r,this.character=a,this.team=o,this.id=c,this.isPlayer=!0,this.health=new ol(a.health),this.mesh=$a(a,n.get("selectedSkin")),this.mesh.visible=!1,this.mesh.userData.entityId=this.id,this.mesh.userData.isEntity=!0,this.mesh.userData.isPlayer=!0,this.scene.add(this.mesh),this.velocity=new w,this.horizontalVelocity=new w,this.grounded=!0,this.gravity=21,this.jumpForce=a.movement.jump,this.walkSpeed=a.movement.walk,this.runSpeed=a.movement.run,this.momentumUntil=0,this.accuracyNoise=0,this.slowUntil=0,this.visionDisabledUntil=0,this.gravityUntil=0,this.markedUntil=0,this.deathTime=0,this.yaw=o==="attackers"?Math.PI:0,this.pitch=0,this.movementInput=new nt,this.abilityController=null,this.weapon=new og(t,i,n,o),this.buildViewModel(),this.setSpawn(o==="attackers"?new w(0,0,18):new w(0,0,-18)),this.health.onDeath=()=>this.handleDeath()}buildViewModel(){this.viewModel=new ue,this.camera.add(this.viewModel),this.buildGun("rifle"),this.viewModel.position.set(.24,-.24,-.45),this.viewModel.rotation.set(.04,-.1,.02)}buildGun(t="rifle"){this.clearChildren(this.viewModel);const e=new Ti({color:2238254}),n=new Ti({color:1845813,emissive:2771548,emissiveIntensity:.35}),i=new ue,r=t==="pistol"?.14:t==="sniper"?.5:.28,a=new Ut(new Pn(.018,.018,r,7),e);a.rotation.x=Math.PI/2,a.position.z=-r/2-.05,i.add(a);const o=new Ut(new Ae(.05,.07,t==="pistol"?.12:.24),e);o.position.z=-.02,i.add(o);const c=new Ut(new Ae(.035,.09,.045),e);c.position.set(0,-.065,t==="pistol"?.02:-.02),i.add(c);const l=new Ut(new Ae(.035,.08,.05),e);l.position.set(0,-.05,.07),l.rotation.x=-.15,i.add(l);const u=new Ut(new Ae(.014,.014,.014),n);u.position.set(0,.04,-.08),i.add(u);const h=t==="pistol"?0:.1;if(h>0){const f=new Ut(new Ae(.035,.05,h),e);f.position.set(0,-.02,.12),i.add(f)}this.viewModel.add(i),this.gunGroup=i}clearChildren(t){var e,n,i,r;for(;t.children.length;){const a=t.children.pop();(n=(e=a.geometry)==null?void 0:e.dispose)==null||n.call(e),(r=(i=a.material)==null?void 0:i.dispose)==null||r.call(i)}}setSpawn(t){this.mesh.position.copy(t),this.mesh.position.y=0,this.velocity.set(0,0,0),this.horizontalVelocity.set(0,0,0),this.grounded=!0,this.yaw=this.team==="attackers"?Math.PI:0,this.pitch=0,this.mesh.rotation.set(0,this.yaw,0),this.updateCamera(0)}addVelocity(t){this.velocity.add(t)}isAlive(){return this.health.isAlive}enemies(){return this.enemiesList||[]}allies(){return this.alliesList||[]}takeDamage(t,e=null){var a,o;if(!this.health.isAlive||this.spawnProtectUntil&&this.spawnProtectUntil>performance.now())return 0;let n=t;const i=((a=this.character.passive)==null?void 0:a.flags)||{};i.damageReduction&&(n*=1-i.damageReduction),i.firstHitReduce&&!this.firstHitUsed&&(n*=.62,this.firstHitUsed=!0);const r=this.health.takeDamage(n,e);return(o=this.character.passive.flags)!=null&&o.momentumOnDamage&&r>0&&(this.momentumUntil=performance.now()+this.character.passive.flags.momentumDuration*1e3),r}handleDeath(){this.mesh.visible=!0,this.mesh.setAction("death",0),this.deathTime=performance.now(),this.health.isAlive=!1}resetRound(){var t,e;this.health.reset(this.character.health),this.firstHitUsed=!1,this.mesh.visible=!1,this.mesh.setAction("idle",0),this.mesh.rotation.set(0,this.team==="attackers"?Math.PI:0,0),this.mesh.position.set(0,0,this.team==="attackers"?18:-18),(t=this.abilityController)==null||t.resetRound(),(e=this.weapon)==null||e.resetRound(),this.deathTime=0,this.spawnProtectUntil=performance.now()+2500,this.momentumUntil=0,this.slowUntil=0,this.visionDisabledUntil=0,this.accuracyNoise=0,this.markedUntil=0}update(t,e){var u,h,f,p;const n=new w(e.moveX||0,0,e.moveZ||0);n.lengthSq()>1&&n.normalize();const i=new w(Math.sin(this.yaw),0,Math.cos(this.yaw)),r=new w(i.z,0,-i.x),a=new w;a.addScaledVector(i,-n.z),a.addScaledVector(r,n.x);const o=Math.min(1,a.length());o>0&&a.normalize();let c=e.sprint?this.runSpeed:this.walkSpeed;this.momentumUntil>performance.now()&&(c*=1.12),this.slowUntil>performance.now()&&(c*=.55),(u=this.abilityController)!=null&&u.temporaryStats.speedMultiplier&&(c*=this.abilityController.temporaryStats.speedMultiplier),this.gravityUntil>performance.now()&&(c*=.4),this.health.isAlive?this.horizontalVelocity.lerp(a.multiplyScalar(c*o),1-Math.pow(.0015,t)):this.horizontalVelocity.multiplyScalar(.9),this.health.isAlive&&this.grounded&&e.jump&&(this.velocity.y=this.jumpForce,this.grounded=!1,this.audio.jump()),this.velocity.y-=this.gravity*t,this.mesh.position.addScaledVector(this.horizontalVelocity,t),this.mesh.position.addScaledVector(this.velocity,t),this.mesh.position.y<=0&&(this.mesh.position.y=0,this.velocity.y=0,this.grounded=!0),this.map.resolveCollision(this.mesh.position,.5);const l=Math.hypot(this.horizontalVelocity.x,this.horizontalVelocity.z);this.mesh.rotation.y=this.yaw,this.mesh.animate(t,l,this.grounded,this.health.isAlive),l>1.4&&this.grounded&&(this.footstepTimer=(this.footstepTimer||0)-t,this.footstepTimer<=0&&(this.audio.footstep(l),this.footstepTimer=l>this.runSpeed*.85?.34:.52)),(h=this.character.passive.flags)!=null&&h.passiveRegen&&this.health.isAlive&&performance.now()-this.health.lastDamageTime>this.character.passive.flags.regenDelay*1e3&&this.health.heal(this.character.passive.flags.regenPerSecond*t),(p=this.weapon)==null||p.update(t*(((f=this.abilityController)==null?void 0:f.temporaryStats.fireRateMultiplier)||1)),this.updateCamera(t),this.updateViewModel(t,e,l)}updateCamera(t){const e=1.62+Math.sin(performance.now()*.006)*.012*(this.horizontalVelocity.length()>.6?1:0);this.camera.position.set(this.mesh.position.x,this.mesh.position.y+e,this.mesh.position.z),this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ");const n=this.settings.get("fov");this.camera.fov!==n&&(this.camera.fov=n,this.camera.updateProjectionMatrix())}updateViewModel(t,e,n){var c,l;if(!this.viewModel)return;const i=Math.sin(performance.now()*.003)*.004,r=Math.cos(performance.now()*.004)*.005,a=n>.4?Math.sin(performance.now()*.02)*.008:0,o=((c=this.weapon)==null?void 0:c.recoilOffset)||0;this.viewModel.position.set(.24+i,-.24+r+a,-.45+o*.35),this.viewModel.rotation.set(.04+o*.3,-.1+i*2,.02),(l=this.weapon)!=null&&l.reloading?this.viewModel.rotation.z=Math.sin(performance.now()*.012)*.18:this.viewModel.rotation.z=le.lerp(this.viewModel.rotation.z,0,t*7),this.weapon&&this.weapon.currentSlot!==this.lastSlot&&(this.lastSlot=this.weapon.currentSlot,this.buildGun(this.weapon.currentSlot))}eyePosition(){return new w(this.mesh.position.x,this.mesh.position.y+1.55,this.mesh.position.z)}dispose(){this.clearChildren(this.viewModel),this.camera.remove(this.viewModel),this.scene.remove(this.mesh)}}const yc={recruit:{accuracy:.32,reaction:.8,viewDistance:22,fireRateMultiplier:1.8,aggression:.7,damageScale:.75},veteran:{accuracy:.45,reaction:.55,viewDistance:26,fireRateMultiplier:1.6,aggression:.85,damageScale:.85},elite:{accuracy:.68,reaction:.3,viewDistance:34,fireRateMultiplier:1.15,aggression:1.1,damageScale:1}};function Or(s,t,e){const n=Math.atan2(Math.sin(t-s),Math.cos(t-s));return s+n*e}class hg{constructor({scene:t,map:e,audio:n,character:i,team:r,difficulty:a="veteran",id:o,settings:c}){this.scene=t,this.map=e,this.audio=n,this.character=i,this.team=r,this.id=o,this.isPlayer=!1,this.settings=c,this.difficulty=yc[a]||yc.veteran,this.health=new ol(i.health),this.mesh=$a(i,Math.floor(Math.random()*i.skins.length)),this.mesh.userData.entityId=o,this.mesh.userData.isEntity=!0,this.mesh.userData.isBot=!0,this.mesh.userData.isCharacter=!0,t.add(this.mesh),this.velocity=new w,this.speed=i.movement.walk,this.walkSpeed=i.movement.walk,this.runSpeed=i.movement.run,this.grounded=!0,this.yaw=0,this.weapon={...Xs("rifle"),currentAmmo:Xs("rifle").magazineSize,reserveAmmo:90},this.fireCooldown=0,this.reloading=!1,this.reloadTimer=0,this.target=null,this.path=[],this.pathTimer=0,this.objective=null,this.bombRole="none",this.patrolIndex=Math.floor(Math.random()*4),this.repathTimer=0,this.momentum=0,this.accuracyNoise=0,this.slowUntil=0,this.visionDisabledUntil=0,this.gravityUntil=0,this.markedUntil=0,this.spawn=new w,this.raycaster=new al,this.lastPosition=new w,this.stuckTimer=0,this.footstepTimer=0,this.plantTimer=0,this.defuseTimer=0}setSpawn(t,e=0){this.mesh.position.copy(t),this.mesh.position.y=0,this.spawn.copy(t),this.yaw=e,this.mesh.rotation.y=e,this.velocity.set(0,0,0),this.path=[],this.target=null}isAlive(){return this.health.isAlive}enemies(){return this.enemiesList||[]}allies(){return this.alliesList||[]}addVelocity(t){this.velocity.add(t)}takeDamage(t,e=null){var r,a;if(!this.health.isAlive)return 0;let n=t;(r=this.character.passive.flags)!=null&&r.damageReduction&&(n*=1-this.character.passive.flags.damageReduction),(a=this.character.passive.flags)!=null&&a.firstHitReduce&&!this.firstHitUsed&&(n*=.62,this.firstHitUsed=!0);const i=this.health.takeDamage(n,e);return i>0&&!this.target&&e&&e.mesh&&this.setTarget(e),i}setTarget(t){this.target=t,this.targetMemory=performance.now()}resetRound(){this.health.reset(this.character.health),this.firstHitUsed=!1,this.mesh.visible=!0,this.mesh.setAction("idle",0),this.mesh.position.copy(this.spawn),this.mesh.rotation.y=this.yaw,this.weapon.currentAmmo=this.weapon.magazineSize,this.weapon.reserveAmmo=90,this.reloading=!1,this.reloadTimer=0,this.fireCooldown=0,this.target=null,this.path=[],this.plantTimer=0,this.defuseTimer=0,this.bombRole="none",this.slowUntil=0,this.visionDisabledUntil=0,this.accuracyNoise=0,this.markedUntil=0}update(t,e){var r;if(!this.health.isAlive){this.mesh.animate(t,0,!1,!1);return}this.fireCooldown-=t,this.pathTimer-=t,this.repathTimer-=t,this.team==="attackers"&&this.bombRole!=="carrier"&&e.bomb.state==="notPlanted"&&((this.alliesList||[]).find(o=>o.bombRole==="carrier"&&o.isAlive())||(this.bombRole="carrier")),this.selectTarget(e),this.target&&!this.target.isAlive()&&(this.target=null),this.target&&performance.now()-(this.targetMemory||0)>4e3&&!this.hasLineOfSight(this.target)&&(this.target=null);let n=null;this.team==="attackers"?n=this.attackObjective(e):n=this.defendObjective(e),n?this.moveTowards(t,n):this.moveStrafe(t),this.team==="attackers"&&this.bombRole==="carrier"&&e.round.state==="roundActive"&&e.bomb.state==="notPlanted"&&(this.map.siteAt(this.mesh.position)&&!this.target&&!this.hasEnemyNear(e,10)?(this.plantTimer+=t,this.mesh.setAction("plantBomb",0),this.plantTimer>1.6&&(this.plantTimer=0,e.bomb.startPlant(this,!0))):this.plantTimer>0&&(this.plantTimer=0)),this.team==="defenders"&&e.bomb.state==="planted"&&e.round.state==="bombPlanted"&&(this.mesh.position.distanceTo(e.bomb.position)<2.4?(this.defuseTimer+=t,this.mesh.setAction("defuseBomb",0),this.defuseTimer>2.8&&(this.defuseTimer=0,e.bomb.startDefuse(this,!0))):this.defuseTimer>0&&(this.defuseTimer=0)),this.target?this.engageTarget(t,e):this.fireCooldown=Math.max(this.fireCooldown,.06);const i=Math.hypot(this.velocity.x,this.velocity.z);if(this.mesh.rotation.y=this.yaw,this.mesh.position.addScaledVector(this.velocity,t),this.velocity.y-=21*t,this.mesh.position.y<=0&&(this.mesh.position.y=0,this.velocity.y=0,this.grounded=!0),this.map.resolveCollision(this.mesh.position,.5),this.mesh.animate(t,i,!0,!0),i>1.2&&(this.footstepTimer-=t,this.footstepTimer<=0)){const o=e.player.mesh.position.distanceTo(this.mesh.position);o<22&&!((r=this.character.passive.flags)!=null&&r.footstepNoiseReduction)&&this.audio.footstep(o),this.footstepTimer=.42}}selectTarget(t){const e=this.eyePosition();let n=null,i=1/0;(this.enemiesList||[]).forEach(a=>{var g,v;if(!a.isAlive())return;const o=((g=a.eyePosition)==null?void 0:g.call(a))||a.mesh.position.clone().setY(a.mesh.position.y+1.5),c=e.distanceTo(o),l=this.difficulty.viewDistance*((v=a.character.passive.flags)!=null&&v.detectionNoise?.72:1);if(c>l)return;const u=o.clone().sub(e).normalize();if(new w(Math.sin(this.yaw),0,Math.cos(this.yaw)).dot(u)<.35||!this.hasLineOfSight(a))return;const p=c/(a.isPlayer?.9:1);p<i&&(i=p,n=a)}),n&&(!this.target||n!==this.target)&&(!this.target||performance.now()-(this.targetMemory||0)>this.difficulty.reaction*1e3)&&this.setTarget(n)}hasLineOfSight(t){var c;const e=this.eyePosition(),n=((c=t.eyePosition)==null?void 0:c.call(t))||t.mesh.position.clone().setY(t.mesh.position.y+1.5),i=n.clone().sub(e).normalize(),r=e.distanceTo(n);this.raycaster.set(e,i),this.raycaster.far=r-.4;const a=this.map.raycastTargets();return this.raycaster.intersectObjects(a,!1).length===0}hasEnemyNear(t,e){return(this.enemiesList||[]).some(i=>i.isAlive()&&i.mesh.position.distanceTo(this.mesh.position)<e)}attackObjective(t){const e=t.bomb;if(e.state==="planted")return this.mesh.position.distanceTo(e.position)>6?e.position:null;const n=t.attackSite||"A",i=this.map.siteZones.find(a=>a.id===n).center;if(!this.bombRole||this.bombRole==="none"){const o=(this.alliesList||[]).filter(c=>c.isAlive()).find(c=>c.bombRole==="carrier");if(o&&o!==this&&o.mesh.position.distanceTo(this.mesh.position)>4.5)return o.mesh.position}if(this.bombRole==="carrier"){const a=this.map.siteAt(this.mesh.position);return!a||a.id!==n?new w(i.x,0,i.y):(this.hasEnemyNear(t,12),null)}const r=new w(i.x,0,i.y);return this.mesh.position.distanceTo(r)>5.5?r:null}defendObjective(t){const e=t.bomb;if(e.state==="planted"||e.state==="defusing")return this.mesh.position.distanceTo(e.position)>2.4?e.position:null;const n=this.defendSite||t.defendSite||"A",i=this.map.siteZones.find(c=>c.id===n).center,r=new w(i.x,0,i.y);if(!(Math.hypot(this.mesh.position.x-i.x,this.mesh.position.z-i.y)<6))return r;const o=[new w(i.x-6,0,i.y+4),new w(i.x+6,0,i.y-4),new w(i.x,0,i.y+6),new w(i.x-4,0,i.y-6)];return(!this.patrolTarget||this.mesh.position.distanceTo(this.patrolTarget)<1.6)&&(this.patrolIndex=((this.patrolIndex||0)+1)%o.length,this.patrolTarget=o[this.patrolIndex]),this.patrolTarget}moveTowards(t,e){if(this.mesh.position.distanceTo(e)<1.4){this.velocity.multiplyScalar(.4);return}(this.pathTimer<=0||this.path.length===0)&&(this.path=this.map.findPath(this.mesh.position,e),this.pathTimer=.65);const r=(this.path.length?this.path[0]:e).clone().sub(this.mesh.position);r.y=0,r.length()<.6&&this.path.length&&this.path.shift();const o=r.normalize().multiplyScalar(this.runSpeed*(this.target?.68:1));this.slowUntil>performance.now()&&o.multiplyScalar(.5),this.gravityUntil>performance.now()&&o.multiplyScalar(.4),this.velocity.lerp(o,1-Math.pow(9e-4,t));const c=Math.atan2(o.x,o.z);this.yaw=Or(this.yaw,c,Math.min(1,t*6)),this.detectStuck(t,e)}moveStrafe(t){const e=Math.sin(performance.now()*.001+this.mesh.position.x)*.4,n=new w(e,0,Math.cos(performance.now()*.0012+this.mesh.position.z)*.2);if(this.velocity.lerp(n.multiplyScalar(this.walkSpeed*.3),1-Math.pow(.001,t)),this.target){const r=this.target.mesh.position.clone().sub(this.mesh.position);this.yaw=Or(this.yaw,Math.atan2(r.x,r.z),Math.min(1,t*5))}}detectStuck(t,e){if(this.mesh.position.distanceTo(this.lastPosition)<.015&&this.velocity.lengthSq()>.2){if(this.stuckTimer+=t,this.stuckTimer>.5){this.stuckTimer=0,this.path=[],this.pathTimer=0;const i=new w((Math.random()-.5)*2,0,(Math.random()-.5)*2);this.velocity.add(i.multiplyScalar(3.2)),this.map.resolveCollision(this.mesh.position,.5)}}else this.stuckTimer=0;this.lastPosition.copy(this.mesh.position)}engageTarget(t,e){var f,p;const n=this.target;if(!n||!n.isAlive())return;const i=this.eyePosition(),r=((f=n.eyePosition)==null?void 0:f.call(n))||n.mesh.position.clone().setY(n.mesh.position.y+1.4),a=r.clone().sub(i),o=a.length();if(o>this.weapon.range||!this.hasLineOfSight(n))return;const c=Math.atan2(a.x,a.z);if(this.yaw=Or(this.yaw,c,Math.min(1,t*7)),this.reloading){this.reloadTimer-=t,this.reloadTimer<=0&&(this.weapon.currentAmmo=this.weapon.magazineSize,this.reloading=!1);return}if(this.weapon.currentAmmo<=0){this.weapon.currentAmmo=0,this.reloading=!0,this.reloadTimer=this.weapon.reloadTime,this.audio.reload();return}if(this.fireCooldown>0||performance.now()-(this.targetMemory||0)<this.difficulty.reaction*1e3)return;this.fireCooldown=this.weapon.fireRate*this.difficulty.fireRateMultiplier,this.weapon.currentAmmo-=1,this.mesh.setAction("shoot",0);const l=this.difficulty.accuracy*((p=this.character.passive.flags)!=null&&p.stationaryAccuracy&&this.velocity.lengthSq()<.2?1.25:1)*(1-this.accuracyNoise*.7),u=le.clamp(l*(1-Math.min(.7,o/this.weapon.range*.75)),.08,.94),h=Math.random()<u;if(e.spawnTracer(i,r,h),this.audio.shot(this.weapon.sound,i.distanceTo(e.player.mesh.position)),h){const g=this.weapon.damage*this.difficulty.damageScale*(1-Math.min(.5,o/this.weapon.range*.45)),m=Math.random()<.08?g*this.weapon.headshotMultiplier:g;n.takeDamage(m,this)}}eyePosition(){return new w(this.mesh.position.x,this.mesh.position.y+1.55,this.mesh.position.z)}dispose(){this.scene.remove(this.mesh),this.mesh.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}}class ug{constructor(t,e,n){this.scene=t,this.audio=e,this.settings=n,this.character=null,this.cooldowns={active:0,special:0},this.activeEffects=[],this.temporaryStats={speedMultiplier:1,fireRateMultiplier:1,shield:0,shieldTimer:0,marked:0,scanActive:0}}loadCharacter(t){this.character=t,this.cooldowns.active=0,this.cooldowns.special=0,this.temporaryStats={speedMultiplier:1,fireRateMultiplier:1,shield:0,shieldTimer:0,marked:0,scanActive:0}}resetRound(){this.character&&this.loadCharacter(this.character),this.clearEffects()}clearEffects(){this.activeEffects.forEach(t=>{t.mesh&&(this.scene.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),t.mesh.material&&t.mesh.material.dispose())}),this.activeEffects=[]}tryActive(t){if(!this.character||this.cooldowns.active>0||!t.isAlive())return!1;const e=this.character.active;return this.cooldowns.active=e.cooldown,this.execute(e,t,!1),!0}trySpecial(t){if(!this.character||this.cooldowns.special>0||!t.isAlive())return!1;const e=this.character.special;return this.cooldowns.special=e.cooldown,this.execute(e,t,!0),!0}execute(t,e,n){var o,c,l,u,h;const i=t.type,r=((o=e.mesh)==null?void 0:o.position.clone())||new w,a=new w;switch(e.mesh?a.set(Math.sin(e.mesh.rotation.y),0,Math.cos(e.mesh.rotation.y)):a.set(0,0,1),this.audio.ability(n?"special":"normal"),(l=(c=e.mesh)==null?void 0:c.setAction)==null||l.call(c,"ability",0),i){case"dash":e.addVelocity(a.clone().multiplyScalar(11));break;case"speedburst":this.temporaryStats.speedMultiplier=1.55,this.speedTimer=t.duration,e.addVelocity(a.clone().multiplyScalar(3.5));break;case"rapidfire":this.temporaryStats.fireRateMultiplier=.45,this.fireRateTimer=t.duration,this.temporaryStats.speedMultiplier=1.22;break;case"heal":e.health.heal(e.health.maxHealth*.42),this.spawnPulse(r,e.team==="attackers"?16735022:4381166,2.6);break;case"shieldaura":e.health.addShield(45,t.duration),e.team&&this.auraAllies(e,t.duration,"shield",45),this.spawnRing(r,e.team==="attackers"?16747834:4381166,3.2);break;case"armoraura":this.auraAllies(e,t.duration,"shield",38),this.spawnRing(r,4381166,4);break;case"healzone":this.addZone(r,t,e.team,"heal",3.4,7661210);break;case"wall":this.addWall(r,a,e.team==="attackers"?16735022:4381166,t.duration);break;case"barricadefield":this.addWall(r,a,e.team==="attackers"?16735022:4381166,t.duration,2.4);break;case"smokefield":this.addZone(r,t,e.team,"smoke",4.2,12109007);break;case"scanpulse":case"widevision":case"marknearest":{(((u=e.enemies)==null?void 0:u.call(e))||[]).forEach(p=>{if(!p.isAlive())return;const g=p.mesh.position.distanceTo(r);(i==="widevision"||g<15)&&(p.markedUntil=performance.now()+(i==="widevision"?t.duration*1e3:5200))}),this.spawnPulse(r,16304476,6.5);break}case"slowfield":this.addZone(r,t,e.team,"slow",4.4,9075967);break;case"gravitywell":this.addZone(r,t,e.team,"gravity",4.6,11566335);break;case"incendiary":this.addZone(r,t,e.team,"burn",4.2,16735022);break;case"blackout":this.addZone(r,t,e.team,"blackout",5.8,1120288);break;case"shockstrike":{(((h=e.enemies)==null?void 0:h.call(e))||[]).forEach(p=>{if(!p.isAlive())return;p.mesh.position.distanceTo(r)<8&&p.takeDamage(38,e)}),this.spawnPulse(r,8251391,6.5);break}case"concussionmine":{this.addZone(r.clone().add(a.multiplyScalar(2.2)),{...t,duration:.5},e.team,"shock",3.4,16747590);break}case"decoy":{const f=new Ut(new Ya(.55,1.9,10),new Se({color:9368263,transparent:!0,opacity:.4}));f.position.copy(r).add(a.clone().multiplyScalar(2)),f.position.y=1,this.scene.add(f),this.activeEffects.push({type:"decoy",mesh:f,duration:t.duration,timer:t.duration,team:e.team,entityId:e.id});break}}}auraAllies(t,e,n,i){var a;(((a=t.allies)==null?void 0:a.call(t))||[]).forEach(o=>{if(!o.isAlive()||o===t)return;o.mesh.position.distanceTo(t.mesh.position)<6&&(n==="shield"&&o.health.addShield(i,e),n==="armor"&&o.health.addShield(i,e))})}addZone(t,e,n,i,r,a){const o=new qn(r,12,8),c=new Se({color:a,transparent:!0,opacity:i==="smoke"?.44:i==="blackout"?.5:.16}),l=new Ut(o,c);l.position.copy(t),l.position.y=i==="smoke"||i==="blackout"?1.4:.25,this.scene.add(l);const u={type:i,mesh:l,team:n,radius:r,duration:e.duration,timer:e.duration,damagePerSecond:i==="burn"?16:i==="shock"?32:0,owner:e};return this.activeEffects.push(u),u}addWall(t,e,n,i,r=4.2){const a=new Ut(new Ae(r,2.4,.42),new Ti({color:n,transparent:!0,opacity:.52})),o=Math.atan2(e.x,e.z)+Math.PI/2;a.position.copy(t).add(e.clone().multiplyScalar(2.4)),a.position.y=1.2,a.rotation.y=o,this.scene.add(a);const c={type:"wall",mesh:a,duration:i,timer:i,team:"neutral",width:r};return this.activeEffects.push(c),c}spawnPulse(t,e,n){const i=new Qi(n-.7,n,24),r=new Se({color:e,transparent:!0,opacity:.55,side:Ie}),a=new Ut(i,r);a.rotation.x=-Math.PI/2,a.position.copy(t),a.position.y=.06,this.scene.add(a),this.activeEffects.push({type:"pulse",mesh:a,duration:.55,timer:.55})}spawnRing(t,e,n){const i=new ts(n,.08,6,24),r=new Se({color:e,transparent:!0,opacity:.5}),a=new Ut(i,r);a.rotation.x=Math.PI/2,a.position.copy(t),a.position.y=1.1,this.scene.add(a),this.activeEffects.push({type:"ring",mesh:a,duration:1.3,timer:1.3})}update(t,e=[],n=null){this.speedTimer&&(this.speedTimer-=t,this.speedTimer<=0&&(this.temporaryStats.speedMultiplier=1)),this.fireRateTimer&&(this.fireRateTimer-=t,this.fireRateTimer<=0&&(this.temporaryStats.fireRateMultiplier=1)),this.cooldowns.active=Math.max(0,this.cooldowns.active-t),this.cooldowns.special=Math.max(0,this.cooldowns.special-t);for(let i=this.activeEffects.length-1;i>=0;i-=1){const r=this.activeEffects[i];r.timer-=t;const a=r.duration>0?Math.max(0,r.timer/r.duration):0;r.mesh&&(r.type==="pulse"?(r.mesh.material.opacity=a*.55,r.mesh.scale.setScalar(1+(1-a)*.7)):r.type==="ring"?(r.mesh.material.opacity=a*.5,r.mesh.rotation.z+=t*3):r.type==="smoke"||r.type==="blackout"?(r.mesh.material.opacity=Math.min(.55,a*.65),r.mesh.scale.setScalar(1+(1-a)*.12)):r.type==="decoy"?(r.mesh.material.opacity=a*.4,r.mesh.position.y=1+Math.sin(performance.now()*.004)*.05):r.type==="burn"||r.type==="shock"||r.type==="slow"||r.type==="gravity"||r.type==="heal"?(r.mesh.material.opacity=a*.2,r.mesh.rotation.y+=t*1.5):r.type==="wall"&&(r.mesh.material.opacity=a*.5)),r.type==="burn"&&r.damagePerSecond&&e.forEach(o=>{if(!o.isAlive()||o.team===r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&o.takeDamage(r.damagePerSecond*t,{ability:!0})}),r.type==="shock"&&r.damagePerSecond&&e.forEach(o=>{if(!o.isAlive()||o.team===r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&(o.takeDamage(r.damagePerSecond*t,{ability:!0}),o.slowUntil=performance.now()+1500,o.visionDisabledUntil=performance.now()+1200)}),(r.type==="slow"||r.type==="gravity")&&e.forEach(o=>{if(!o.isAlive()||o.team===r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&(o.slowUntil=performance.now()+350,r.type==="gravity"&&(o.gravityUntil=performance.now()+350))}),r.type==="blackout"&&e.forEach(o=>{if(!o.isAlive()||o.team===r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&(o.visionDisabledUntil=performance.now()+320)}),r.type==="smoke"&&e.forEach(o=>{if(!o.isAlive()||o.team===r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&(o.accuracyNoise=.55)}),r.type==="heal"&&e.forEach(o=>{if(!o.isAlive()||o.team!==r.team)return;o.mesh.position.distanceTo(r.mesh.position)<=r.radius&&o.health.heal(14*t)}),r.timer<=0&&(this.scene.remove(r.mesh),r.mesh.geometry&&r.mesh.geometry.dispose(),r.mesh.material&&r.mesh.material.dispose(),this.activeEffects.splice(i,1))}}status(){var t,e;return{activeReady:this.cooldowns.active<=0,specialReady:this.cooldowns.special<=0,activeCooldown:this.cooldowns.active,specialCooldown:this.cooldowns.special,active:(t=this.character)==null?void 0:t.active,special:(e=this.character)==null?void 0:e.special,speedMultiplier:this.temporaryStats.speedMultiplier,fireRateMultiplier:this.temporaryStats.fireRateMultiplier}}}class dg{constructor({settings:t,audio:e}){this.settings=t,this.audio=e,this.state={moveX:0,moveZ:0,lookX:0,lookY:0,jump:!1,sprint:!1,shoot:!1,reload:!1,ability:!1,special:!1,interact:!1,deployHeld:!1},this.joystickActive=!1,this.lookActive=!1,this.lastLook={x:0,y:0},this.elements={joystickZone:document.getElementById("joystick-zone"),joystickBase:document.getElementById("joystick-base"),joystickKnob:document.getElementById("joystick-knob"),lookZone:document.getElementById("look-zone"),shoot:document.getElementById("m-btn-shoot"),reload:document.getElementById("m-btn-reload"),jump:document.getElementById("m-btn-jump"),interact:document.getElementById("m-btn-interact"),ability:document.getElementById("m-btn-ability"),special:document.getElementById("m-btn-special"),pause:document.getElementById("pause-btn")},this.init()}init(){var c;const t=window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window;document.body.classList.toggle("touch-device",t),t&&(this.elements.mobileControls=document.getElementById("mobile-controls"));const e=this.elements.joystickZone,n=this.elements.joystickKnob;this.elements.joystickBase;const i=l=>{l.preventDefault();const u=e.getBoundingClientRect(),h=u.left+u.width/2,f=u.top+u.height/2,p=l.touches?l.touches[0].clientX:l.clientX,g=l.touches?l.touches[0].clientY:l.clientY,v=u.width/2-12;let m=p-h,d=g-f;const E=Math.hypot(m,d);E>v&&(m=m/E*v,d=d/E*v),n.style.transform=`translate(calc(-50% + ${m}px), calc(-50% + ${d}px))`;const T=m/v,M=d/v;this.state.moveX=T,this.state.moveZ=M,this.state.sprint=Math.hypot(T,M)>.82,this.joystickActive=!0},r=()=>{this.joystickActive=!1,this.state.moveX=0,this.state.moveZ=0,this.state.sprint=!1,n.style.transform="translate(-50%,-50%)"};e.addEventListener("pointerdown",l=>{e.setPointerCapture(l.pointerId),i(l),this.vibrate(8)}),e.addEventListener("pointermove",l=>{this.joystickActive&&i(l)}),e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("lostpointercapture",r);const a=this.elements.lookZone;a.addEventListener("pointerdown",l=>{a.setPointerCapture(l.pointerId),this.lookActive=!0,this.lastLook.x=l.clientX,this.lastLook.y=l.clientY}),a.addEventListener("pointermove",l=>{if(!this.lookActive)return;const u=this.settings.get("sensitivity"),h=this.settings.get("invertY")?-1:1,f=l.clientX-this.lastLook.x,p=l.clientY-this.lastLook.y;this.state.lookX+=f*.0024*u,this.state.lookY+=p*.0024*u*h,this.lastLook.x=l.clientX,this.lastLook.y=l.clientY});const o=()=>{this.lookActive=!1};a.addEventListener("pointerup",o),a.addEventListener("pointercancel",o),a.addEventListener("lostpointercapture",o),this.bindButton(this.elements.shoot,"shoot",!0),this.bindButton(this.elements.reload,"reload",!0),this.bindButton(this.elements.jump,"jump",!0),this.bindButton(this.elements.interact,"interact",!0),this.bindButton(this.elements.ability,"ability",!0),this.bindButton(this.elements.special,"special",!0),(c=this.elements.pause)==null||c.addEventListener("click",()=>this.audio.ui("click"))}bindButton(t,e,n){if(!t)return;const i=a=>{a.preventDefault(),this.state[e]=!0,t.classList.add("active"),this.vibrate(4),(e==="ability"||e==="special")&&this.audio.ui("click")},r=a=>{a.preventDefault(),this.state[e]=!1,t.classList.remove("active")};t.addEventListener("pointerdown",i),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r),t.addEventListener("pointerleave",r)}vibrate(t=4){if(!(!this.settings.get("vibration")||!navigator.vibrate))try{navigator.vibrate(t)}catch{}}update(){this.frameLookX=this.state.lookX,this.frameLookY=this.state.lookY,this.state.lookX=0,this.state.lookY=0}read(){return{moveX:this.state.moveX,moveZ:this.state.moveZ,lookX:this.frameLookX||0,lookY:this.frameLookY||0,jump:this.state.jump,sprint:this.state.sprint,shoot:this.state.shoot,reload:this.state.reload,ability:this.state.ability,special:this.state.special,interact:this.state.interact}}showInteract(t="INTERAGIR"){this.elements.interact&&(this.elements.interact.classList.remove("hidden"),this.elements.interact.querySelector("small").textContent=t)}hideInteract(){var t;(t=this.elements.interact)==null||t.classList.add("hidden")}consumeLook(){const t={lookX:this.frameLookX||0,lookY:this.frameLookY||0};return this.frameLookX=0,this.frameLookY=0,t}}class fg{constructor({hud:t,mobileInput:e}){this.hud=t,this.mobileInput=e}update({player:t,bomb:e,round:n}){if(!t.isAlive()){this.hud.hidePrompt(),this.mobileInput.hideInteract();return}const i=t.team==="attackers";if(n.state==="preparingRound"){this.hud.hidePrompt(),this.mobileInput.hideInteract();return}if(i&&e.canPlant(t)){const r=e.state==="planting"?"PLANTANDO":"PLANTAR";this.hud.showPrompt({key:"E",title:"PLANTAR BOMBA",sub:"Mantenha pressionado até concluir",progress:e.state==="planting"?e.plantProgress/3.2:0}),this.mobileInput.showInteract(r);return}if(!i&&e.canDefuse(t)){const r=e.state==="defusing"?"DESARMANDO":"DESARMAR";this.hud.showPrompt({key:"E",title:"DESARMAR BOMBA",sub:"Mantenha pressionado até concluir",progress:e.state==="defusing"?e.defuseProgress/5:0}),this.mobileInput.showInteract(r);return}this.hud.hidePrompt(),this.mobileInput.hideInteract()}}class pg{constructor(){this.canvas=document.getElementById("game-canvas"),this.settings=new Zm,this.audio=new jm(this.settings),this.renderer=new Tm({canvas:this.canvas,antialias:this.settings.get("quality")!=="low",powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.settings.get("quality")==="high"?2:1.4)),this.renderer.shadowMap.enabled=this.settings.get("shadows"),this.renderer.shadowMap.type=Sc,this.renderer.toneMapping=un,this.renderer.toneMappingExposure=1,this.scene=new Am,this.camera=new De(this.settings.get("fov"),window.innerWidth/window.innerHeight,.1,220),this.clock=new Ym,this.teamManager=new Km,this.hud=new sg,this.menu=new ag({settings:this.settings,audio:this.audio,onCharacterChanged:(t,e)=>this.setCharacterPreview(t,e),onSkinChanged:(t,e)=>this.setCharacterPreview(t,e),onStartMatch:t=>this.startMatch(t)}),this.mobileInput=new dg({settings:this.settings,audio:this.audio}),this.interaction=new fg({hud:this.hud,mobileInput:this.mobileInput}),this.mode="menu",this.previewMesh=null,this.previewGroup=null,this.map=null,this.entities=[],this.player=null,this.round=null,this.bomb=null,this.tracers=[],this.impacts=[],this.input={moveX:0,moveZ:0,lookX:0,lookY:0,jump:!1,sprint:!1,shoot:!1,reload:!1,ability:!1,special:!1,interact:!1},this.keys=new Set,this.mouseDown=!1,this.previewTargetYaw=0,this.previewYaw=0,this.previewDistance=4.6,this.previewPitch=.15,this.stats={kills:0,damage:0,rounds:0},this.pointerLocked=!1,this.paused=!1,this.init()}init(){this.setupResize(),this.setupInput(),this.setupMenuShowroom(),this.setupOverlays(),this.animate(),setTimeout(()=>{document.getElementById("loading-screen").classList.add("done"),this.menu.showScreen("main")},450),window.addEventListener("pointerdown",()=>this.audio.resume(),{once:!0}),window.addEventListener("keydown",()=>this.audio.resume(),{once:!0})}setupResize(){window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()})}setupInput(){window.addEventListener("keydown",t=>{this.keys.add(t.code),t.code==="Escape"&&this.mode==="match"&&this.togglePause(!0),["Space","KeyQ","KeyF","KeyE","KeyR","Digit1","Digit2"].includes(t.code)&&t.preventDefault()}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),this.canvas.addEventListener("mousedown",t=>{this.mode==="match"&&(this.mouseDown=!0,!this.pointerLocked&&!this.paused&&t.button===0&&this.requestPointerLock())}),window.addEventListener("mouseup",()=>{this.mouseDown=!1}),document.addEventListener("pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===this.canvas,!this.pointerLocked&&this.mode==="match"&&!this.paused&&this.togglePause(!0)}),document.addEventListener("mousemove",t=>{if(!this.pointerLocked||this.mode!=="match"||this.paused)return;const e=this.settings.get("sensitivity"),n=this.settings.get("invertY")?-1:1;this.player.yaw-=t.movementX*.0022*e,this.player.pitch-=t.movementY*.0022*e*n,this.player.pitch=le.clamp(this.player.pitch,-Math.PI/2.05,Math.PI/2.05)}),this.canvas.addEventListener("pointerdown",t=>{this.mode==="menu"&&(this.previewDrag={x:t.clientX,y:t.clientY,active:!0},this.canvas.setPointerCapture(t.pointerId))}),this.canvas.addEventListener("pointermove",t=>{var i;if(this.mode!=="menu"||!((i=this.previewDrag)!=null&&i.active))return;const e=t.clientX-this.previewDrag.x,n=t.clientY-this.previewDrag.y;this.previewDrag.x=t.clientX,this.previewDrag.y=t.clientY,this.previewTargetYaw+=e*.008,this.previewPitch=le.clamp(this.previewPitch+n*.004,-.35,.55)}),this.canvas.addEventListener("pointerup",()=>{this.previewDrag=null}),this.canvas.addEventListener("wheel",t=>{this.mode==="menu"&&(this.previewDistance=le.clamp(this.previewDistance+t.deltaY*.002,1.6,6),t.preventDefault())},{passive:!1})}requestPointerLock(){this.canvas.requestPointerLock&&this.canvas.requestPointerLock()}setupMenuShowroom(){this.scene.clear();const t=new ue;t.name="showroom";const e=new Ut(new js(4,42),new Ti({color:1120288}));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,t.add(e);const n=new Ut(new Pn(1.35,1.5,.16,42),new Ti({color:1975856}));n.position.y=.08,t.add(n);const i=new Ut(new ts(1.42,.025,8,42),new Se({color:16735022}));i.rotation.x=Math.PI/2,i.position.y=.16,t.add(i);const r=new rl(16770246,2.2);r.position.set(2.5,4.5,3),r.castShadow=!0,t.add(r);const a=new Yi(4381166,1.2,10,2);a.position.set(-2.6,1.5,-1.8),t.add(a);const o=new Yi(16735022,.8,10,2);o.position.set(2.6,1.4,-2.2),t.add(o);const c=new ba(9213602,1.1);t.add(c);const l=new ks(527122,5,16);this.scene.fog=l,this.scene.background=new Rt(461328),this.scene.add(t),this.showroom=t,this.setCharacterPreview(Ws(this.settings.get("selectedCharacter")),this.settings.get("selectedSkin"))}setCharacterPreview(t,e=0){this.showroom&&(this.previewMesh&&(this.showroom.remove(this.previewMesh.group),this.previewMesh.group.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})),this.previewMesh=$a(t,e),this.previewMesh.group.position.set(0,.16,0),this.previewMesh.group.scale.setScalar(.95),this.showroom.add(this.previewMesh.group),this.selectedCharacter=t,this.selectedSkinIndex=e)}setupOverlays(){document.getElementById("resume-btn").addEventListener("click",()=>this.togglePause(!1)),document.getElementById("abandon-btn").addEventListener("click",()=>this.returnToMenu()),document.getElementById("return-menu-btn").addEventListener("click",()=>this.returnToMenu()),document.getElementById("rematch-btn").addEventListener("click",()=>{this.hideMatchEnd(),this.startMatch(this.lastMatchConfig)})}togglePause(t){var e;this.paused=t,document.getElementById("pause-overlay").classList.toggle("hidden",!t),t&&((e=document.exitPointerLock)==null||e.call(document))}startMatch({side:t="attackers",difficulty:e="veteran",roundTarget:n=4}){this.lastMatchConfig={side:t,difficulty:e,roundTarget:n},this.mode="match",this.paused=!1,this.stats={kills:0,damage:0,rounds:0},document.getElementById("menu-layer").classList.add("hidden-menu"),this.hud.show(),this.hud.hideMatchEnd(),this.scene.clear(),this.scene.fog=new ks(1251876,60,150),this.scene.background=new Rt(856344),this.map=new Jm(this.scene,this.settings.get("quality")),this.scene.add(new ba(16777215,2.4)),this.attackSite=Math.random()<.5?"A":"B",this.defendSite=this.attackSite==="A"?"B":"A",this.buildTeams(t,e),this.abilityController=new ug(this.scene,this.audio,this.settings),this.player.abilityController=this.abilityController,this.bomb=new ng({scene:this.scene,map:this.map,audio:this.audio}),this.round=new ig({teamManager:this.teamManager,bomb:this.bomb,audio:this.audio,settings:this.settings}),this.round.onRoundStart=(i,r)=>this.handleRoundStart(i,r),this.round.onRoundEnd=(i,r,a)=>this.handleRoundEnd(i,r,a),this.round.onMatchEnd=i=>this.handleMatchEnd(i),this.hud.elements.playerName.textContent=this.player.character.name,this.hud.elements.playerRole.textContent=fi(this.player.character.role).label,this.round.startMatch(),this.audio.ambience()}buildTeams(t,e){this.teamManager.clear(),this.entities=[];const n=[..._i].sort(()=>Math.random()-.5),i=Ws(this.settings.get("selectedCharacter"));this.player=new lg({camera:this.camera,scene:this.scene,settings:this.settings,audio:this.audio,map:this.map,character:i,team:t}),this.player.enemiesList=[],this.player.alliesList=[],this.entities.push(this.player);const r=t==="attackers"?"defenders":"attackers",a=[],o=[];for(let h=0;h<4;h+=1){const f=this.createBot(n[(h+1)%n.length],t,e,`ally-${h}`);a.push(f)}for(let h=0;h<5;h+=1){const f=this.createBot(n[(h+5)%n.length],r,e,`enemy-${h}`);o.push(f)}const c=t==="attackers"?[this.player,...a]:o,l=t==="defenders"?[this.player,...a]:o;c.forEach((h,f)=>{const p=this.map.spawnPoints.attackers[f%this.map.spawnPoints.attackers.length];h.setSpawn(p,Math.PI),this.teamManager.register(h,"attackers")}),l.forEach((h,f)=>{const p=this.map.spawnPoints.defenders[f%this.map.spawnPoints.defenders.length];h.setSpawn(p,0),this.teamManager.register(h,"defenders")}),this.entities=[...c,...l],this.entities.forEach(h=>{h.enemiesList=h.team==="attackers"?[...l]:[...c],h.alliesList=h.team==="attackers"?[...c]:[...l]});const u=c.find(h=>h.isPlayer)||c[0];u.bombRole="carrier",c.forEach(h=>{h!==u&&(h.bombRole="support")}),l.forEach(h=>{h.bombRole="defender"}),this.player.weapon.switchTo("primary")}createBot(t,e,n,i){return new hg({scene:this.scene,map:this.map,audio:this.audio,character:t,team:e,difficulty:n,id:i,settings:this.settings})}handleRoundStart(t,e){this.stats.rounds=t,this.assignSites(),this.hud.hideRoundBanner(),e==="preparingRound"?this.hud.showRoundBanner(`ROUND ${t}`,"PREPARE-SE","Restaurando equipamento e habilidades"):(this.hud.showRoundBanner(`ROUND ${t}`,"ROUND ATIVO",this.attackSite?`OBJETIVO: SITE ${this.attackSite}`:"ELIMINE OS ADVERSÁRIOS"),this.audio.roundStart()),this.hud.toast(this.player.team==="attackers"?"Você é ATTACKER. Plante a bomba.":"Você é DEFENDER. Proteja os sites.")}assignSites(){this.attackSite=Math.random()<.5?"A":"B",this.defendSite=this.attackSite==="A"?"B":"A",this.teamManager.get("attackers").forEach((t,e)=>{t.bombRole==="carrier"?t.patrolIndex=0:t.patrolIndex=e}),this.teamManager.get("defenders").forEach((t,e)=>{t.defendSite=e%2===0?"A":"B",t.patrolIndex=e})}handleRoundEnd(t,e,n){this.stats.rounds=n,this.hud.showRoundBanner(`ROUND ${n}`,t==="attackers"?"ATTACKERS VENCERAM":"DEFENDERS VENCERAM",e),this.audio.victory(),t!==this.player.team&&this.audio.defeat(),this.hud.addKillEntry(t==="attackers"?"ATTACKERS":"DEFENDERS",e)}handleMatchEnd(t){var n;const e={attackers:this.teamManager.attackersScore,defenders:this.teamManager.defendersScore};this.hud.showMatchEnd(t,this.player.team,e,{kills:this.stats.kills,damage:this.stats.damage,rounds:this.round.roundNumber}),t===this.player.team?this.audio.victory():this.audio.defeat(),(n=document.exitPointerLock)==null||n.call(document)}hideMatchEnd(){this.hud.hideMatchEnd()}returnToMenu(){var t;this.mode="menu",this.paused=!1,(t=document.exitPointerLock)==null||t.call(document),document.getElementById("menu-layer").classList.remove("hidden-menu"),this.hud.hide(),this.hud.hideMatchEnd(),this.hud.hidePrompt(),this.hud.hideRoundBanner(),document.getElementById("pause-overlay").classList.add("hidden"),this.setupMenuShowroom(),this.menu.showScreen("main"),this.audio.ambience()}collectInput(){const t=this.mobileInput.read();this.mobileInput.update();let e={...this.input};return e.moveX=t.moveX,e.moveZ=t.moveZ,e.lookX=t.lookX,e.lookY=t.lookY,e.jump=t.jump||this.keys.has("Space"),e.sprint=t.sprint||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),e.shoot=t.shoot||this.mouseDown||this.keys.has("MouseLeft"),e.reload=t.reload||this.keys.has("KeyR"),e.ability=t.ability||this.keys.has("KeyQ"),e.special=t.special||this.keys.has("KeyF"),e.interact=t.interact||this.keys.has("KeyE"),e}handleActionEdges(t){var e,n,i;t.reload&&!((e=this.lastInput)!=null&&e.reload)&&this.player.weapon.reload(),t.ability&&!((n=this.lastInput)!=null&&n.ability)&&(this.player.abilityController.tryActive(this.player)?this.hud.abilityFeed(`${this.player.character.active.name} ATIVADA`):this.audio.ui("error")),t.special&&!((i=this.lastInput)!=null&&i.special)&&(this.player.abilityController.trySpecial(this.player)?this.hud.abilityFeed(`${this.player.character.special.name} ATIVADA`):this.audio.ui("error")),this.keys.has("Digit1")&&!this.lastDigit1&&this.player.weapon.switchTo("primary")&&this.hud.toast("ARMA PRIMÁRIA"),this.keys.has("Digit2")&&!this.lastDigit2&&this.player.weapon.switchTo("secondary")&&this.hud.toast("PISTOLA"),this.lastInput={...t},this.lastDigit1=this.keys.has("Digit1"),this.lastDigit2=this.keys.has("Digit2")}handleShooting(t,e){var o;if(!this.player.health.isAlive)return;const n=this.player.weapon,i=((o=this.player.abilityController)==null?void 0:o.temporaryStats.fireRateMultiplier)||1;n.fireCooldown=Math.max(0,n.fireCooldown-t*i);const r=[...this.map.raycastTargets(),...this.entities.filter(c=>c!==this.player&&c.isAlive()).map(c=>c.mesh)],a={onHit:c=>{const l=c.userData.entityId?this.entities.find(u=>u.id===c.userData.entityId):null;if(l&&l!==this.player&&l.team!==this.player.team){const u=l.takeDamage(c.damage,this.player);this.stats.damage+=u,this.audio.hit(),this.hud.hitmarker(l.health.currentHealth<=0),l.health.currentHealth<=0&&(this.stats.kills+=1,this.hud.killBanner(l.character.name),this.audio.kill(),this.hud.addKillEntry(this.player.character.name,l.character.name,n.weapon.name)),this.spawnImpact(c.point,16735022)}else this.audio.impact(),this.spawnImpact(c.point,14672872)},onMiss:()=>{this.spawnTracer(this.camera.getWorldPosition(new w),this.camera.getWorldPosition(new w).add(this.camera.getWorldDirection(new w).multiplyScalar(12)),!1)}};e.shoot&&n.tryFire(e.shoot,r,a)&&(this.audio.shot(n.weapon.sound,0),this.spawnTracer(this.camera.getWorldPosition(new w),this.camera.getWorldPosition(new w).add(this.camera.getWorldDirection(new w).multiplyScalar(24)),!1),this.spawnMuzzleFlash())}spawnTracer(t,e,n=!1){const i=new _e().setFromPoints([t,e]),r=new Ha({color:n?16735022:15003903,transparent:!0,opacity:.55}),a=new Jc(i,r);this.scene.add(a),this.tracers.push({mesh:a,timer:.08})}spawnImpact(t,e=14672872){if(!this.settings.get("particles"))return;const n=new Ut(new qn(.08,6,4),new Se({color:e,transparent:!0,opacity:.7}));n.position.copy(t),this.scene.add(n),this.impacts.push({mesh:n,timer:.2})}spawnMuzzleFlash(){if(!this.settings.get("particles"))return;const t=new Ut(new qn(.08,6,4),new Se({color:16767398,transparent:!0,opacity:.7})),e=this.camera.getWorldPosition(new w).add(this.camera.getWorldDirection(new w).multiplyScalar(.4));t.position.copy(e),this.scene.add(t),this.impacts.push({mesh:t,timer:.08})}updateEffects(t){for(let e=this.tracers.length-1;e>=0;e-=1){const n=this.tracers[e];n.timer-=t,n.mesh.material.opacity=Math.max(0,n.timer/.08*.55),n.timer<=0&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.tracers.splice(e,1))}for(let e=this.impacts.length-1;e>=0;e-=1){const n=this.impacts[e];n.timer-=t,n.mesh.material.opacity=Math.max(0,n.timer/.2*.7),n.mesh.scale.setScalar(1+(.2-n.timer)*3),n.timer<=0&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.impacts.splice(e,1))}}updateEntities(t,e){var n;this.player.update(t,e),this.entities.forEach(i=>{i!==this.player&&i.update(t,this)}),(n=this.abilityController)==null||n.update(t,this.entities,this.map)}handleBomb(t,e){if(!this.bomb)return;const n=this.player;n.isAlive()&&(n.team==="attackers"?mg(this.bomb,n)&&(this.bomb.state===jt.NOT_PLANTED&&e.interact&&this.bomb.startPlant(n,!1),this.bomb.state===jt.PLANTING&&this.bomb.plantingEntity===n&&this.bomb.updatePlant(t,e.interact)):n.team==="defenders"&&gg(this.bomb,n)&&(this.bomb.state===jt.PLANTED&&e.interact&&this.bomb.startDefuse(n,!1),this.bomb.state===jt.DEFUSING&&this.bomb.defusingEntity===n&&this.bomb.updateDefuse(t,e.interact))),this.bomb.state===jt.PLANTING&&this.bomb.isBotAction&&this.bomb.updatePlant(t,!0),this.bomb.state===jt.DEFUSING&&this.bomb.isBotAction&&this.bomb.updateDefuse(t,!0),this.bomb.update(t)&&this.round.onBombExploded(),this.bomb.state===jt.DEFUSED&&this.round.onBombDefused(),this.bomb.state===jt.PLANTED&&this.round.state===re.ACTIVE&&this.round.setState(re.BOMB_PLANTED)}updateRound(t){var e;(e=this.round)==null||e.update(t)}animate(){var n;requestAnimationFrame(()=>this.animate());const t=Math.min(.05,this.clock.getDelta());if(this.mode==="menu"){this.updateMenu(t),this.renderer.render(this.scene,this.camera);return}if(this.paused){this.renderer.render(this.scene,this.camera);return}const e=this.collectInput();this.handleActionEdges(e),this.updateEntities(t,e),this.handleShooting(t,e),this.handleBomb(t,e),this.updateEffects(t),this.updateRound(t),this.interaction.update({player:this.player,bomb:this.bomb,round:this.round}),this.hud.update(this,t),(n=this.map)==null||n.update(t),this.renderer.render(this.scene,this.camera)}updateMenu(t){this.previewMesh&&(this.previewYaw=le.lerp(this.previewYaw,this.previewTargetYaw,1-Math.pow(.001,t)),this.previewMesh.group.rotation.y=this.previewYaw,this.previewMesh.animate(t,0,!0,!0));const e=new w(Math.sin(this.previewYaw)*this.previewDistance,1.35+this.previewPitch*2,Math.cos(this.previewYaw)*this.previewDistance);this.camera.position.lerp(e,1-Math.pow(.001,t)),this.camera.lookAt(0,1.05,0),this.camera.fov=45,this.camera.updateProjectionMatrix()}}function mg(s,t){return s.state===jt.NOT_PLANTED&&s.canPlant(t)}function gg(s,t){return s.state===jt.PLANTED&&s.canDefuse(t)}const vg=new pg;window.VEM_COMER=vg;
