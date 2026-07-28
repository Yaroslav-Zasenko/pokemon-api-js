(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const n="https://pokeapi.co",l=document.querySelector(".search-form"),d=document.querySelector(".card-container"),c=document.querySelector(".loader");l.addEventListener("submit",f);async function u(o){const r=await fetch(`${n}${o.toLowerCase()}`);if(!r.ok)throw new Error(`Status: ${r.status}`);return await r.json()}async function f(o){o.preventDefault();const r=o.target.elements.query.value.trim();if(!r){alert("Please enter a pokemon name!");return}c.classList.remove("hidden");try{const s=await u(r);d.innerHTML=p(s)}catch(s){alert(`Pokemon not found! (${s.message})`)}finally{c.classList.add("hidden"),o.target.reset()}}function p({name:o,height:r,weight:s,abilities:a,sprites:e}){const t=a.map(({ability:i})=>`
        <li class="list-group-item text-capitalize">${i.name}</li>
    `).join("");return`
        <div class="card" style="width: 18rem; margin: 20px auto;">
            <div class="card-img-top text-center" style="background: #f8f9fa; padding: 10px;">
                <img src="${e.front_default}" alt="${o}" style="width: 120px; height: 120px;"/>
            </div>
            <div class="card-body">
                <h3 class="card-title text-capitalize" style="color: #2e2f42;">${o}</h3>
                <p class="card-text">Height: ${r}</p>
                <p class="card-text">Weight: ${s}</p>
                <div class="card-text mt-3">
                    <h4>Abilities:</h4>
                    <ul class="list-group list-group-flush">
                        ${t}
                    </ul>
                </div>
            </div>
        </div>
    `}
//# sourceMappingURL=index.js.map
