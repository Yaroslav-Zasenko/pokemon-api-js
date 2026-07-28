import axios from "axios";
import './css/styles.css';  // Переконайся, що цей файл дійсно існує за цим шляхом!

const BASE_URL = 'https://pokeapi.co';


const form = document.querySelector(".search-form");
const container = document.querySelector(".card-container");
const loader = document.querySelector(".loader");

form.addEventListener("submit", onSearch);

async function fetchData(pokemonName) {
    const response = await fetch(`${BASE_URL}${pokemonName.toLowerCase()}`);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return await response.json();
}


async function onSearch(event) {
    event.preventDefault(); // Це блокує перезавантаження та query=picachu в адресному рядку
    const searchQuery = event.target.elements.query.value.trim();

    if(!searchQuery) {
        alert('Please enter a pokemon name!');
        return;
    }
    
    loader.classList.remove("hidden");

    try {
        const data = await fetchData(searchQuery);
        container.innerHTML = renderPokemonCard(data);
    } catch(error) {
        alert(`Pokemon not found! (${error.message})`);
    } finally {
        loader.classList.add("hidden");
        event.target.reset();
    }
}

function renderPokemonCard({ name, height, weight, abilities, sprites }) {
    const abilitiesList = abilities.map(({ ability }) => `
        <li class="list-group-item text-capitalize">${ability.name}</li>
    `).join("");

    return `
        <div class="card" style="width: 18rem; margin: 20px auto;">
            <div class="card-img-top text-center" style="background: #f8f9fa; padding: 10px;">
                <img src="${sprites.front_default}" alt="${name}" style="width: 120px; height: 120px;"/>
            </div>
            <div class="card-body">
                <h3 class="card-title text-capitalize" style="color: #2e2f42;">${name}</h3>
                <p class="card-text">Height: ${height}</p>
                <p class="card-text">Weight: ${weight}</p>
                <div class="card-text mt-3">
                    <h4>Abilities:</h4>
                    <ul class="list-group list-group-flush">
                        ${abilitiesList}
                    </ul>
                </div>
            </div>
        </div>
    `;
}
