import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import './css/styles.css'; // Шлях до твого головного файлу стилів

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const form = document.querySelector(".form"); // Шукаємо за твоїм класом .form
const container = document.querySelector(".card-container");
const loader = document.querySelector(".loader");

form.addEventListener("submit", onSearch);

async function fetchData(pokemonName) {
    const response = await fetch(`${BASE_URL}${pokemonName.toLowerCase()}`);
    if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }
    return await response.json();
}

async function onSearch(event) {
    event.preventDefault();
    
    // Чітко беремо значення з інпуту name="query"
    const searchQuery = event.target.elements.query.value.trim();

    if(!searchQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a pokemon name!',
            position: 'topRight',
        });
        return;
    }
    
    loader.classList.remove("hidden");

    try {
        const data = await fetchData(searchQuery);
        container.innerHTML = renderPokemonCard(data);
    } catch(error) {
        onFetchError(error.message);
        container.innerHTML = '';
    } finally {
        loader.classList.add("hidden");
        event.target.reset();
    }
}

function renderPokemonCard({ name, height, weight, abilities, sprites }) {
    const abilitiesList = abilities.map(({ ability }) => `
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-transform: capitalize;">${ability.name}</li>
    `).join("");

    return `
        <div class="card" style="width: 280px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; font-family: 'Montserrat', sans-serif; box-shadow: 0px 4px 10px rgba(0,0,0,0.05);">
            <div style="background: #f8f9fa; padding: 20px; text-align: center;">
                <img src="${sprites.front_default}" alt="${name}" style="width: 120px; height: 120px;"/>
            </div>
            <div style="padding: 20px; color: #2e2f42;">
                <h3 style="text-transform: capitalize; margin: 0 0 10px 0; font-size: 22px;">${name}</h3>
                <p style="margin: 5px 0;">Height: ${height}</p>
                <p style="margin: 5px 0;">Weight: ${weight}</p>

                <div style="margin-top: 15px;">
                    <h4 style="margin: 0 0 5px 0; font-size: 16px;">Abilities:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${abilitiesList}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function onFetchError(message) {
    iziToast.error({
        title: 'Error',
        message: `Pokemon not found! (${message})`,
        position: 'topRight',
    });
}
