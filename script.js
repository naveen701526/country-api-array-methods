const main = document.getElementById('main');
const addCountryBtn = document.getElementById('add-country');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculatePopulationBtn = document.getElementById('calculate-population');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await axios.get('https://restcountries.eu/rest/v2/all', {
        timeout: 5000,
    });

    const user = res.data[Math.floor(Math.random() * 10 + 1)];

    const newUser = {
        name: user,
        population: user.population,
    };

    addData(newUser);
}

// Double eveyones money
function doubleMoney() {
    data = data.map((user) => {
        return {...user, population: user.population * 2};
    });

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.population - a.population);

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    const millionaires = data.filter((user) => {
        return user.population > 1000000;
    });

    updateDOM(millionaires);
}

// Calculate the total Population
function calculatePopulation() {
    const population = data.reduce((acc, user) => (acc += user.population), 0);

    const populationEl = document.createElement('div');

    populationEl.innerHTML = `<h3>Total Population: <strong>${population}</strong></h3>`;
    main.appendChild(populationEl);
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);
    console.log(data);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Country</strong> Population</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name.name}</strong> ${item.population}`;
        main.appendChild(element);
    });
}

// Event listeners
addCountryBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculatePopulationBtn.addEventListener('click', calculatePopulation);
