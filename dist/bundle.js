(()=>{"use strict";const e=new class{audioContext;tracks=[];slowAverage=39;constructor(){this.audioContext=new AudioContext}async initAudio(e){if(16!==e.length)throw new Error("Expected 16 audio files.");const t=e.map((e=>this.loadAudioFile(e)));(await Promise.all(t)).forEach((e=>{const t=this.audioContext.createBufferSource(),n=this.audioContext.createGain();t.buffer=e,n.gain.value=0;const a=this.audioContext.createAnalyser();a.fftSize=2048,n.connect(a),t.connect(n),n.connect(this.audioContext.destination),this.tracks.push({sourceNode:t,gainNode:n,analyserNode:a}),t.loop=!0,t.start(0)}))}async loadAudioFile(e){const t=await fetch(e),n=await t.arrayBuffer();return this.audioContext.decodeAudioData(n)}getNoiseColor(e){const t=this.tracks[e].analyserNode,n=new Uint8Array(t.frequencyBinCount);t.getByteFrequencyData(n);const a=n.reduce(((e,t)=>e+t),0)/n.length;return`hsl(${Math.min(100+5*a,240)}, 100%, 50%)`}getFrequencyColor(e){if(0===this.tracks[e].gainNode.gain.value)return`hsl(${this.slowAverage+e}, 100%, 50%)`;const t=this.tracks[e].analyserNode,n=new Uint8Array(t.frequencyBinCount);t.getByteFrequencyData(n);const a=Math.max(...n),o=n.indexOf(a);return this.updateSlowAverage(o),`hsl(${this.slowAverage+e+5*o%240}, 100%, 50%)`}updateSlowAverage(e){this.slowAverage=this.slowAverage+.001*e%240}unMuteTrack(e){if(-1!=e){if(!this.tracks[e])throw new Error(`Track ${e} does not exist.`);this.tracks[e].gainNode.gain.value=1}}muteTrack(e){if(-1!=e){if(!this.tracks[e])throw new Error(`Track ${e} does not exist.`);this.tracks[e].gainNode.gain.value=0}}muteAll(){for(let e=0;e<this.tracks.length;e++)this.muteTrack(e)}},t=16;var n=!1,a=!1,o=null;function s(e){document.querySelectorAll(".ball").forEach((t=>{t.style.display=e?"block":"none"}))}function r(e){if(!e)return-1;const t=e.split("square-");return t.length<2?-1:parseInt(t[1])}function i(e){if(e){const e=document.createElement("div");e.classList.add("spinner"),e.id="spinner",document.body.appendChild(e)}else{const e=document.getElementById("spinner");e?.remove()}}function d(){if(requestAnimationFrame(d),n)for(let n=0;n<t;n++){const t=document.getElementById(`square-${n}`);t&&(t.style.backgroundColor=e.getFrequencyColor(n))}}document.addEventListener("DOMContentLoaded",(()=>{!function(){const c=document.getElementById("start-button");c?.addEventListener("click",(async()=>{c.remove(),i(!0),await async function(){n||(await e.initAudio(["stems/drums.wav","stems/hats.wav","stems/kick-hat.wav","stems/toms.wav","stems/acid-and-chord.wav","stems/bass.wav","stems/drums.wav","stems/hats.wav","stems/kick-hat.wav","stems/toms.wav","stems/acid-and-chord.wav","stems/bass.wav","stems/drums.wav","stems/hats.wav","stems/kick-hat.wav","stems/toms.wav"]),n=!0)}(),i(!1),function(){const e=document.createElement("div");e.classList.add("matrix"),e.id="matrix",document.body.appendChild(e);for(let n=0;n<t;n++){const t=document.createElement("div");t.classList.add("square"),t.id=`square-${n}`,e.appendChild(t)}(o=document.createElement("div")).classList.add("ballhome"),o.id="ballhome",document.body.appendChild(o);for(let e=0;e<3;e++){const t=document.createElement("div");t.classList.add("ball"),t.id=`ball-${e}`,t.draggable=!0,o.appendChild(t)}}(),function(){const t=document.querySelectorAll(".ball"),n=document.querySelectorAll(".square");let i=null,d=null;const c=t=>{i&&(console.log("Dropped:",i.id,t.id),e.unMuteTrack(r(t.id)),t.appendChild(i),d=null,i.style.display="block",i=null)};if(t.forEach((t=>{t.addEventListener("dragstart",(n=>{i=t,d=t.parentElement,n.dataTransfer?.setData("text/plain",t.id),console.log("[Dragstart]: Lifted",t.id,"from",d.id),e.muteTrack(r(d.id))})),t.addEventListener("touchstart",(n=>{a=!0,i=t,d=t.parentElement,console.log("[Touchstart] Lifted",t.id,"from",d.id),e.muteTrack(r(d.id))})),t.addEventListener("touchmove",(e=>{if(console.log("[Touchmove] Dragging",t.id,e.touches.length),e.preventDefault(),a=!0,1===e.touches.length){const n=e.touches[0];t.style.left=n.clientX-25+"px",t.style.top=n.clientY-25+"px"}})),t.addEventListener("touchend",(e=>{if(console.log("[Touchend] Dropped",t.id),!i)return;s(!1);const n=e.changedTouches[0],a=document.elementFromPoint(n.clientX,n.clientY);s(!0),c(a)}))})),n.forEach((e=>{e.addEventListener("dragover",(e=>{e.preventDefault()})),e.addEventListener("drop",(t=>{t.preventDefault(),c(e)}))})),!o)throw new Error("Ball home not found");o.addEventListener("dragover",(e=>{e.preventDefault()})),o.addEventListener("drop",(e=>{if(e.preventDefault(),!o)throw new Error("Ball home not found");c(o)})),document.addEventListener("dragover",(e=>{a||e.preventDefault()})),document.addEventListener("drop",(e=>{if(!a){const e=document.getElementById("ballhome");c(e)}}))}(),d()}))}()}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cEI1QyxFQUFTeUIsaUJBQWlCLFFBQVNjLElBRWpDLEdBREFBLEVBQUVLLGtCQUNHNUMsRUFDSCxNQUFNLElBQUlyRCxNQUFNLHVCQUVsQndGLEVBQVNuQyxFQUFTLElBR3BCRyxTQUFTc0IsaUJBQWlCLFlBQWFjLElBQ2hDeEMsR0FDSHdDLEVBQUVLLGdCLElBR056QyxTQUFTc0IsaUJBQWlCLFFBQVNjLElBQ2pDLElBQUt4QyxFQUFhLENBQ2hCLE1BQU1DLEVBQVdHLFNBQVNnQixlQUFlLFlBQ3pDZ0IsRUFBU25DLEUsSUFHZixDQWtFSXFELEdBQ0FoQyxHQUFNLEdBRVYsQ0FHRWlDLEVBQW1CLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcXVhcmVzLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vc3F1YXJlcy8uL3NyYy9hdWRpby50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdWRpb0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9hdWRpb1wiO1xuXG5jb25zdCBhYyA9IG5ldyBBdWRpb0NvbnRyb2xsZXIoKTtcbmNvbnN0IG5TcXVhcmVzID0gMTY7XG5jb25zdCBuQmFsbHMgPSAzO1xudmFyIGlzUGxheWluZyA9IGZhbHNlO1xudmFyIGlzSW5pdGlhdGVkID0gZmFsc2U7XG52YXIgbW9iaWxlVXNhZ2UgPSBmYWxzZTtcbnZhciBiYWxsSG9tZTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gY3JlYXRlVUkoKSB7XG4gIGNvbnN0IG1hdHJpeCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1hdHJpeC5jbGFzc0xpc3QuYWRkKFwibWF0cml4XCIpO1xuICBtYXRyaXguaWQgPSBcIm1hdHJpeFwiO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1hdHJpeCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgblNxdWFyZXM7IGkrKykge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgc3F1YXJlLmlkID0gYHNxdWFyZS0ke2l9YDtcbiAgICBtYXRyaXguYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICBiYWxsSG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJhbGxIb21lLmNsYXNzTGlzdC5hZGQoXCJiYWxsaG9tZVwiKTtcbiAgYmFsbEhvbWUuaWQgPSBcImJhbGxob21lXCI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFsbEhvbWUpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbkJhbGxzOyBpKyspIHtcbiAgICBjb25zdCBiYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYWxsLmNsYXNzTGlzdC5hZGQoXCJiYWxsXCIpO1xuICAgIGJhbGwuaWQgPSBgYmFsbC0ke2l9YDtcbiAgICBiYWxsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgYmFsbEhvbWUuYXBwZW5kQ2hpbGQoYmFsbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFVJKCkge1xuICBjb25zdCBiYWxsczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhbGxcIik7XG4gIGNvbnN0IHNxdWFyZXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG4gIGxldCBhY3RpdmVCYWxsOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBsZXQgb3JpZ2luU3F1YXJlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0IGRyb3BCYWxsID0gKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICBpZiAoYWN0aXZlQmFsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJEcm9wcGVkOlwiLCBhY3RpdmVCYWxsLmlkLCB0YXJnZXQuaWQpO1xuICAgICAgYWMudW5NdXRlVHJhY2soZ2V0U3F1YXJlSWQodGFyZ2V0LmlkKSk7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoYWN0aXZlQmFsbCk7XG4gICAgICBvcmlnaW5TcXVhcmUgPSBudWxsO1xuICAgICAgYWN0aXZlQmFsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAvLyBNYWtlIHN1cmUgdG8gZGlzcGxheSB0aGUgYmFsbCBhZ2FpblxuICAgICAgYWN0aXZlQmFsbCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGJhbGxzLmZvckVhY2goKGJhbGwpID0+IHtcbiAgICBiYWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGU6IERyYWdFdmVudCkgPT4ge1xuICAgICAgYWN0aXZlQmFsbCA9IGJhbGw7XG4gICAgICBvcmlnaW5TcXVhcmUgPSBiYWxsLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBlLmRhdGFUcmFuc2Zlcj8uc2V0RGF0YShcInRleHQvcGxhaW5cIiwgYmFsbC5pZCk7XG4gICAgICBjb25zb2xlLmxvZyhcIltEcmFnc3RhcnRdOiBMaWZ0ZWRcIiwgYmFsbC5pZCwgXCJmcm9tXCIsIG9yaWdpblNxdWFyZS5pZCk7XG4gICAgICBhYy5tdXRlVHJhY2soZ2V0U3F1YXJlSWQob3JpZ2luU3F1YXJlLmlkKSk7XG4gICAgfSk7XG5cbiAgICBiYWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIChlOiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBtb2JpbGVVc2FnZSA9IHRydWU7XG4gICAgICBhY3RpdmVCYWxsID0gYmFsbDtcbiAgICAgIG9yaWdpblNxdWFyZSA9IGJhbGwucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnNvbGUubG9nKFwiW1RvdWNoc3RhcnRdIExpZnRlZFwiLCBiYWxsLmlkLCBcImZyb21cIiwgb3JpZ2luU3F1YXJlLmlkKTtcbiAgICAgIGFjLm11dGVUcmFjayhnZXRTcXVhcmVJZChvcmlnaW5TcXVhcmUuaWQpKTtcbiAgICB9KTtcblxuICAgIGJhbGwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoZTogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJbVG91Y2htb3ZlXSBEcmFnZ2luZ1wiLCBiYWxsLmlkLCBlLnRvdWNoZXMubGVuZ3RoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vYmlsZVVzYWdlID0gdHJ1ZTtcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICBiYWxsLnN0eWxlLmxlZnQgPSBgJHt0b3VjaC5jbGllbnRYIC0gMjV9cHhgOyAvLyBBZGp1c3QgZm9yIGNlbnRlciBvZiB0aGUgYmFsbFxuICAgICAgICBiYWxsLnN0eWxlLnRvcCA9IGAke3RvdWNoLmNsaWVudFkgLSAyNX1weGA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBiYWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCAoZTogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJbVG91Y2hlbmRdIERyb3BwZWRcIiwgYmFsbC5pZCk7XG4gICAgICBpZiAoIWFjdGl2ZUJhbGwpIHJldHVybjtcbiAgICAgIHNob3dCYWxscyhmYWxzZSk7XG4gICAgICBjb25zdCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChcbiAgICAgICAgdG91Y2guY2xpZW50WCxcbiAgICAgICAgdG91Y2guY2xpZW50WVxuICAgICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHNob3dCYWxscyh0cnVlKTtcbiAgICAgIGRyb3BCYWxsKHRhcmdldEVsZW1lbnQpO1xuICAgIH0pO1xuICB9KTtcblxuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGU6IERyYWdFdmVudCkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlOiBEcmFnRXZlbnQpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRyb3BCYWxsKHNxdWFyZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmICghYmFsbEhvbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWxsIGhvbWUgbm90IGZvdW5kXCIpO1xuICB9XG4gIGJhbGxIb21lLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZTogRHJhZ0V2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBiYWxsSG9tZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZTogRHJhZ0V2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghYmFsbEhvbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhbGwgaG9tZSBub3QgZm91bmRcIik7XG4gICAgfVxuICAgIGRyb3BCYWxsKGJhbGxIb21lKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgaWYgKCFtb2JpbGVVc2FnZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBUaGlzIGFsbG93cyB0aGUgZHJvcCB0byBiZSBhY2NlcHRlZC5cbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgIGlmICghbW9iaWxlVXNhZ2UpIHtcbiAgICAgIGNvbnN0IGJhbGxIb21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWxsaG9tZVwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGRyb3BCYWxsKGJhbGxIb21lKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93QmFsbHMoc2hvdzogYm9vbGVhbikge1xuICBjb25zdCBiYWxsczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhbGxcIik7XG4gIGJhbGxzLmZvckVhY2goKGJhbGwpID0+IHtcbiAgICBiYWxsLnN0eWxlLmRpc3BsYXkgPSBzaG93ID8gXCJibG9ja1wiIDogXCJub25lXCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTcXVhcmVJZChpZDogc3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gIGlmICghaWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgY29uc3QgcGFydHMgPSBpZC5zcGxpdChcInNxdWFyZS1cIik7XG4gIGlmIChwYXJ0cy5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHJldHVybiBwYXJzZUludChwYXJ0c1sxXSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRBdWRpbygpIHtcbiAgaWYgKGlzSW5pdGlhdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGF3YWl0IGFjLmluaXRBdWRpbyhbXG4gICAgXCJzdGVtcy9kcnVtcy53YXZcIixcbiAgICBcInN0ZW1zL2hhdHMud2F2XCIsXG4gICAgXCJzdGVtcy9raWNrLWhhdC53YXZcIixcbiAgICBcInN0ZW1zL3RvbXMud2F2XCIsXG4gICAgXCJzdGVtcy9hY2lkLWFuZC1jaG9yZC53YXZcIixcbiAgICBcInN0ZW1zL2Jhc3Mud2F2XCIsXG4gICAgXCJzdGVtcy9kcnVtcy53YXZcIixcbiAgICBcInN0ZW1zL2hhdHMud2F2XCIsXG4gICAgXCJzdGVtcy9raWNrLWhhdC53YXZcIixcbiAgICBcInN0ZW1zL3RvbXMud2F2XCIsXG4gICAgXCJzdGVtcy9hY2lkLWFuZC1jaG9yZC53YXZcIixcbiAgICBcInN0ZW1zL2Jhc3Mud2F2XCIsXG4gICAgXCJzdGVtcy9kcnVtcy53YXZcIixcbiAgICBcInN0ZW1zL2hhdHMud2F2XCIsXG4gICAgXCJzdGVtcy9raWNrLWhhdC53YXZcIixcbiAgICBcInN0ZW1zL3RvbXMud2F2XCIsXG4gIF0pO1xuICBpc0luaXRpYXRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHNwaW5uZXIoc2hvdzogYm9vbGVhbikge1xuICBpZiAoc2hvdykge1xuICAgIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwic3Bpbm5lclwiKTtcbiAgICBzcGlubmVyLmlkID0gXCJzcGlubmVyXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzcGlubmVyKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGlubmVyXCIpO1xuICAgIHNwaW5uZXI/LnJlbW92ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0YXJ0QnV0dG9uKCkge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBzdGFydEJ1dHRvbi5yZW1vdmUoKTtcbiAgICBzcGlubmVyKHRydWUpO1xuICAgIGF3YWl0IGluaXRBdWRpbygpO1xuICAgIHNwaW5uZXIoZmFsc2UpO1xuICAgIGNyZWF0ZVVJKCk7XG4gICAgaW5pdFVJKCk7XG4gICAgZHJhdygpO1xuICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjcmVhdGVTdGFydEJ1dHRvbigpO1xufSk7XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgaWYgKCFpc0luaXRpYXRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5TcXVhcmVzOyBpKyspIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3F1YXJlLSR7aX1gKSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoc3F1YXJlKSB7XG4gICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYWMuZ2V0RnJlcXVlbmN5Q29sb3IoaSk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQXVkaW9Db250cm9sbGVyIHtcbiAgcHJpdmF0ZSBhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dDtcbiAgcHJpdmF0ZSB0cmFja3M6IHtcbiAgICBzb3VyY2VOb2RlOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGU7XG4gICAgZ2Fpbk5vZGU6IEdhaW5Ob2RlO1xuICAgIGFuYWx5c2VyTm9kZTogQW5hbHlzZXJOb2RlO1xuICB9W10gPSBbXTtcbiAgcHJpdmF0ZSBzbG93QXZlcmFnZTogbnVtYmVyID0gMzk7IC8vIG9yYW5nZVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICB9XG5cbiAgYXN5bmMgaW5pdEF1ZGlvKGZpbGVOYW1lczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZmlsZU5hbWVzLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIDE2IGF1ZGlvIGZpbGVzLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlUHJvbWlzZXMgPSBmaWxlTmFtZXMubWFwKChmaWxlTmFtZSkgPT5cbiAgICAgIHRoaXMubG9hZEF1ZGlvRmlsZShmaWxlTmFtZSlcbiAgICApO1xuXG4gICAgY29uc3QgYXVkaW9CdWZmZXJzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZVByb21pc2VzKTtcblxuICAgIGF1ZGlvQnVmZmVycy5mb3JFYWNoKChidWZmZXIpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZU5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIGNvbnN0IGdhaW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG4gICAgICBzb3VyY2VOb2RlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIGdhaW5Ob2RlLmdhaW4udmFsdWUgPSAwOyAvLyBTdGFydCBtdXRlZFxuXG4gICAgICAvLyBzZXQgdXAgYW4gYW5hbHlzZXIgc28gd2UgY2FuIGRvIGNvb2wgdmlzdWFsc1xuICAgICAgY29uc3QgYW5hbHlzZXJOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgIGFuYWx5c2VyTm9kZS5mZnRTaXplID0gMjA0ODtcbiAgICAgIGdhaW5Ob2RlLmNvbm5lY3QoYW5hbHlzZXJOb2RlKTtcblxuICAgICAgc291cmNlTm9kZS5jb25uZWN0KGdhaW5Ob2RlKTtcbiAgICAgIGdhaW5Ob2RlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICB0aGlzLnRyYWNrcy5wdXNoKHsgc291cmNlTm9kZSwgZ2Fpbk5vZGUsIGFuYWx5c2VyTm9kZSB9KTtcblxuICAgICAgc291cmNlTm9kZS5sb29wID0gdHJ1ZTtcbiAgICAgIHNvdXJjZU5vZGUuc3RhcnQoMCk7IC8vIFBsYXkgaW1tZWRpYXRlbHkgaW4gc3luY1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkQXVkaW9GaWxlKHVybDogc3RyaW5nKTogUHJvbWlzZTxBdWRpb0J1ZmZlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG4gICAgcmV0dXJuIHRoaXMuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShhcnJheUJ1ZmZlcik7XG4gIH1cblxuICBnZXROb2lzZUNvbG9yKHRyYWNrOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGFuYWx5c2VyTm9kZSA9IHRoaXMudHJhY2tzW3RyYWNrXS5hbmFseXNlck5vZGU7XG4gICAgY29uc3QgZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXJOb2RlLmZyZXF1ZW5jeUJpbkNvdW50KTtcbiAgICBhbmFseXNlck5vZGUuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZGF0YUFycmF5KTtcblxuICAgIGNvbnN0IGF2ZXJhZ2UgPVxuICAgICAgZGF0YUFycmF5LnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCkgLyBkYXRhQXJyYXkubGVuZ3RoO1xuICAgIGNvbnN0IGh1ZSA9IE1hdGgubWluKDEwMCArIGF2ZXJhZ2UgKiA1LCAyNDApO1xuICAgIHJldHVybiBgaHNsKCR7aHVlfSwgMTAwJSwgNTAlKWA7XG4gIH1cblxuICBnZXRGcmVxdWVuY3lDb2xvcih0cmFjazogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBnYWluTm9kZSA9IHRoaXMudHJhY2tzW3RyYWNrXS5nYWluTm9kZTtcbiAgICBpZiAoZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYGhzbCgke3RoaXMuc2xvd0F2ZXJhZ2UgKyB0cmFja30sIDEwMCUsIDUwJSlgO1xuICAgIH1cbiAgICBjb25zdCBhbmFseXNlck5vZGUgPSB0aGlzLnRyYWNrc1t0cmFja10uYW5hbHlzZXJOb2RlO1xuICAgIGNvbnN0IGRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KGFuYWx5c2VyTm9kZS5mcmVxdWVuY3lCaW5Db3VudCk7XG4gICAgYW5hbHlzZXJOb2RlLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGRhdGFBcnJheSk7XG5cbiAgICAvLyBnZXQgdGhlIGhpZ2hlc3QgZnJlcXVlbmN5XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YUFycmF5KTtcbiAgICBjb25zdCBtYXhJbmRleCA9IGRhdGFBcnJheS5pbmRleE9mKG1heCk7XG4gICAgdGhpcy51cGRhdGVTbG93QXZlcmFnZShtYXhJbmRleCk7XG5cbiAgICBjb25zdCBodWUgPSB0aGlzLnNsb3dBdmVyYWdlICsgdHJhY2sgKyBtYXhJbmRleCAqIDUgJSAyNDBcbiAgICByZXR1cm4gYGhzbCgke2h1ZX0sIDEwMCUsIDUwJSlgO1xuICB9XG5cbiAgdXBkYXRlU2xvd0F2ZXJhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2xvd0F2ZXJhZ2UgPSB0aGlzLnNsb3dBdmVyYWdlICsgdmFsdWUgKiAwLjAwMSAlIDI0MDtcbiAgfVxuXG4gIHVuTXV0ZVRyYWNrKHRyYWNrTnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodHJhY2tOdW1iZXIgPT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXSkge1xuICAgICAgdGhpcy50cmFja3NbdHJhY2tOdW1iZXJdLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxOyAvLyBTZXQgZ2FpbiB0byAxIHRvIHVubXV0ZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyYWNrICR7dHJhY2tOdW1iZXJ9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgfVxuXG4gIG11dGVUcmFjayh0cmFja051bWJlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRyYWNrTnVtYmVyID09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRyYWNrc1t0cmFja051bWJlcl0pIHtcbiAgICAgIHRoaXMudHJhY2tzW3RyYWNrTnVtYmVyXS5nYWluTm9kZS5nYWluLnZhbHVlID0gMDsgLy8gU2V0IGdhaW4gdG8gMCB0byBtdXRlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVHJhY2sgJHt0cmFja051bWJlcn0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICB9XG5cbiAgbXV0ZUFsbCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudHJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLm11dGVUcmFjayhpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJhYyIsImF1ZGlvQ29udGV4dCIsInRyYWNrcyIsInNsb3dBdmVyYWdlIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwiQXVkaW9Db250ZXh0IiwiaW5pdEF1ZGlvIiwiZmlsZU5hbWVzIiwibGVuZ3RoIiwiRXJyb3IiLCJmaWxlUHJvbWlzZXMiLCJtYXAiLCJmaWxlTmFtZSIsImxvYWRBdWRpb0ZpbGUiLCJQcm9taXNlIiwiYWxsIiwiZm9yRWFjaCIsImJ1ZmZlciIsInNvdXJjZU5vZGUiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJnYWluIiwidmFsdWUiLCJhbmFseXNlck5vZGUiLCJjcmVhdGVBbmFseXNlciIsImZmdFNpemUiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJwdXNoIiwibG9vcCIsInN0YXJ0IiwidXJsIiwicmVzcG9uc2UiLCJmZXRjaCIsImFycmF5QnVmZmVyIiwiZGVjb2RlQXVkaW9EYXRhIiwiZ2V0Tm9pc2VDb2xvciIsInRyYWNrIiwiZGF0YUFycmF5IiwiVWludDhBcnJheSIsImZyZXF1ZW5jeUJpbkNvdW50IiwiZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEiLCJhdmVyYWdlIiwicmVkdWNlIiwiYWNjIiwidmFsIiwiTWF0aCIsIm1pbiIsImdldEZyZXF1ZW5jeUNvbG9yIiwibWF4IiwibWF4SW5kZXgiLCJpbmRleE9mIiwidXBkYXRlU2xvd0F2ZXJhZ2UiLCJ1bk11dGVUcmFjayIsInRyYWNrTnVtYmVyIiwibXV0ZVRyYWNrIiwibXV0ZUFsbCIsImkiLCJuU3F1YXJlcyIsImlzSW5pdGlhdGVkIiwibW9iaWxlVXNhZ2UiLCJiYWxsSG9tZSIsInNob3dCYWxscyIsInNob3ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJiYWxsIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0U3F1YXJlSWQiLCJpZCIsInBhcnRzIiwic3BsaXQiLCJwYXJzZUludCIsInNwaW5uZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic3F1YXJlIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0QnV0dG9uIiwiYXN5bmMiLCJtYXRyaXgiLCJkcmFnZ2FibGUiLCJjcmVhdGVVSSIsImJhbGxzIiwic3F1YXJlcyIsImFjdGl2ZUJhbGwiLCJvcmlnaW5TcXVhcmUiLCJkcm9wQmFsbCIsInRhcmdldCIsImNvbnNvbGUiLCJsb2ciLCJlIiwicGFyZW50RWxlbWVudCIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJ0b3VjaGVzIiwicHJldmVudERlZmF1bHQiLCJ0b3VjaCIsImxlZnQiLCJjbGllbnRYIiwidG9wIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwidGFyZ2V0RWxlbWVudCIsImVsZW1lbnRGcm9tUG9pbnQiLCJpbml0VUkiLCJjcmVhdGVTdGFydEJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=