// Données de démo avec images actives
const cars = [
    {
        brand: "Volkswagen Tiguan",
        price: "22 900 €",
        year: 2021,
        km: "35 000 km",
        img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?auto=format&fit=crop&w=600&q=80"
    },
    {
        brand: "Audi A3 Sportback",
        price: "28 500 €",
        year: 2022,
        km: "18 000 km",
        img: "https://images.unsplash.com/photo-1542362567-b0520bb1f11b?auto=format&fit=crop&w=600&q=80"
    },
    {
        brand: "Mercedes Classe A",
        price: "25 400 €",
        year: 2020,
        km: "42 000 km",
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
    },
    {
        brand: "Dacia Sandero Stepway",
        price: "11 900 €",
        year: 2019,
        km: "55 000 km",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
    }
];

const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');

// Affichage des voitures
function displayCars(carsArray) {
    carGrid.innerHTML = carsArray.map(car => `
        <div class="car-card">
            <img src="${car.img}" alt="${car.brand}">
            <div class="car-info">
                <h3>${car.brand}</h3>
                <p>${car.year} | ${car.km}</p>
                <p class="price">${car.price}</p>
                <button class="btn" style="width:100%; margin-top:10px;">Voir détails</button>
            </div>
        </div>
    `).join('');
}

// Filtrage
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = cars.filter(car => car.brand.toLowerCase().includes(term));
    displayCars(filtered);
});

// Formulaire
document.getElementById('vehicleContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    feedback.classList.remove('hidden');
    this.reset();
    setTimeout(() => feedback.classList.add('hidden'), 5000);
});

// Initialisation
displayCars(cars);