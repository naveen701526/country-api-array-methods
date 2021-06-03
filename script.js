const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

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
