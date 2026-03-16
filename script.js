let cars = JSON.parse(localStorage.getItem('myCars')) || [];

const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');
const adminPanel = document.getElementById('adminPanel');
const loginModal = document.getElementById('loginModal');

function checkAdmin() {
    return localStorage.getItem('isLogged') === 'true';
}

// Connexion
document.getElementById('adminLoginBtn').onclick = (e) => {
    e.preventDefault();
    loginModal.classList.remove('hidden');
};

document.getElementById('closeModal').onclick = () => loginModal.classList.add('hidden');

document.getElementById('loginSubmit').onclick = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if(user === "Admin" && pass === "Gediks") {
        loginModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        localStorage.setItem('isLogged', 'true');
        displayCars(cars);
        window.scrollTo(0,0);
    } else {
        alert("Accès refusé. Identifiants incorrects.");
    }
};

// Déconnexion
document.getElementById('logoutBtn').onclick = () => {
    adminPanel.classList.add('hidden');
    localStorage.removeItem('isLogged');
    displayCars(cars);
};

// Ajout de véhicule
document.getElementById('addCarForm').onsubmit = function(e) {
    e.preventDefault();
    
    const file = document.getElementById('carImage').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        // Formatage automatique du prix en Euros
        const rawPrice = document.getElementById('carPrice').value;
        const formattedPrice = new Intl.NumberFormat('fr-FR').format(rawPrice) + " €";

        const newCar = {
            brand: document.getElementById('carBrand').value,
            price: formattedPrice,
            year: document.getElementById('carYear').value,
            km: document.getElementById('carKm').value,
            img: event.target.result,
            status: document.getElementById('carStatus').value
        };

        cars.push(newCar);
        localStorage.setItem('myCars', JSON.stringify(cars));
        
        displayCars(cars);
        e.target.reset();
        adminPanel.classList.add('hidden');
        alert("Félicitations ! Le véhicule est maintenant en ligne.");
    };

    if(file) reader.readAsDataURL(file);
};

// Affichage dynamique
function displayCars(carsArray) {
    const isAdmin = checkAdmin();
    
    if (carsArray.length === 0) {
        carGrid.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Aucun véhicule disponible pour le moment.</p>";
        return;
    }

    carGrid.innerHTML = carsArray.map((car, index) => `
        <div class="car-card">
            <img src="${car.img}" alt="${car.brand}">
            <div class="car-info">
                <h3>${car.brand}</h3>
                <p>Modèle ${car.year} | ${car.km}</p>
                <p class="price">${car.price}</p>
                <p class="status-text">${car.status || "Véhicule révisé et garanti."}</p>
                ${isAdmin ? `
                    <button onclick="deleteCar(${index})" class="btn" style="background:#222; width:100%; margin-top:15px; font-size:0.8rem;">Supprimer l'annonce</button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Suppression
function deleteCar(index) {
    if(!checkAdmin()) return;
    if(confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
        cars.splice(index, 1);
        localStorage.setItem('myCars', JSON.stringify(cars));
        displayCars(cars);
        adminPanel.classList.add('hidden');
    }
}

// Recherche
searchInput.oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = cars.filter(car => car.brand.toLowerCase().includes(term));
    displayCars(filtered);
};

// Initialisation au chargement
window.onload = () => {
    if(checkAdmin()) adminPanel.classList.remove('hidden');
    displayCars(cars);
};