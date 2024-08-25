document.addEventListener('DOMContentLoaded', () => {
    const ipContainer = document.getElementById('ip-container');
    const geoInfoContainer = document.getElementById('geo-info-container');
    const clockContainer = document.getElementById('clock-container');
    const browserInfoContainer = document.getElementById('browser-info-container');
    

    // Fonction pour récupérer l'adresse IP
    async function fetchIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ip = data.ip;
            ipContainer.textContent = `Votre IP : ${ip}`;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'adresse IP', error);
            ipContainer.textContent = 'Impossible de récupérer l\'adresse IP.';
        }
    }
    fetchIP();

    // Fonction pour récupérer les informations géographiques
    async function fetchGeoInfo() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=YOUR_TOKEN');
            const data = await response.json();
            const geoInfo = `Localisation: ${data.city}, ${data.country}`;
            geoInfoContainer.textContent = geoInfo;
        } catch (error) {
            console.error('Erreur lors de la récupération des informations géographiques', error);
            geoInfoContainer.textContent = 'Impossible de récupérer les informations géographiques.';
        }
    }
    fetchGeoInfo();

    // Fonction pour afficher l'heure actuelle
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        clockContainer.textContent = `Heure actuelle: ${time}`;
    }
    setInterval(updateClock, 1000); // Met à jour l'heure toutes les secondes

    // Fonction pour afficher les informations sur le navigateur
    function displayBrowserInfo() {
        const browserInfo = `Navigateur: ${navigator.userAgent}`;
        browserInfoContainer.textContent = browserInfo;
    }
    displayBrowserInfo();

});