import{i as d}from"./assets/vendor-I1I71QQ2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const l="https://pokeapi.co",p=document.querySelector(".form"),a=document.querySelector(".card-container"),c=document.querySelector(".loader");p.addEventListener("submit",u);async function f(o){const r=await fetch(`${l}${o.toLowerCase()}`);if(!r.ok)throw new Error(`Status: ${r.status}`);return await r.json()}async function u(o){o.preventDefault();const r=o.target.elements.query.value.trim();if(!r){d.warning({title:"Warning",message:"Please enter a pokemon name!",position:"topRight"});return}c.classList.remove("hidden");try{const i=await f(r);a.innerHTML=m(i)}catch(i){g(i.message),a.innerHTML=""}finally{c.classList.add("hidden"),o.target.reset()}}function m({name:o,height:r,weight:i,abilities:s,sprites:e}){const t=s.map(({ability:n})=>`
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-transform: capitalize;">${n.name}</li>
    `).join("");return`
        <div class="card" style="width: 280px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; font-family: 'Montserrat', sans-serif; box-shadow: 0px 4px 10px rgba(0,0,0,0.05);">
            <div style="background: #f8f9fa; padding: 20px; text-align: center;">
                <img src="${e.front_default}" alt="${o}" style="width: 120px; height: 120px;"/>
            </div>
            <div style="padding: 20px; color: #2e2f42;">
                <h3 style="text-transform: capitalize; margin: 0 0 10px 0; font-size: 22px;">${o}</h3>
                <p style="margin: 5px 0;">Height: ${r}</p>
                <p style="margin: 5px 0;">Weight: ${i}</p>

                <div style="margin-top: 15px;">
                    <h4 style="margin: 0 0 5px 0; font-size: 16px;">Abilities:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${t}
                    </ul>
                </div>
            </div>
        </div>
    `}function g(o){d.error({title:"Error",message:`Pokemon not found! (${o})`,position:"topRight"})}
//# sourceMappingURL=index.js.map
