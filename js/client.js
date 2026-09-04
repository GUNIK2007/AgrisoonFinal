let labelTEMP = document.querySelector("#val-temp");
let labelHUM = document.querySelector("#val-humidity");
let labelwater = document.querySelector("#val-water");
let labelSol = document.querySelector("#val-recom") ;

let temperature = 0; 
let humidity = 0; 
let waterLevel = 0; 
let humiditySol = 0; 

function sendData(){
    // Remplace par l'URL de ton serveur Render quand il sera en ligne (ex: 'https://rizora-backend.onrender.com/capteur')
    // ou '/capteur' si ton routeur sur l'ESP32 répond sur /capteur
    fetch('http://localhost:3000/mesure')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau lors de la récupération des données");
        }
        return response.json();
    })
    .then(mesure => {
        // Correspondance exacte avec les clés JSON envoyées par l'ESP32 ou le serveur
        temperature = mesure.temperature;
        humidity = mesure.humidity_air;
        humiditySol = mesure.humidity_sol;
        waterLevel = mesure.niveau_eau;
    

        // Mise à jour de l'affichage dans le HTML
        labelHUM.textContent = humidity + " %";
        labelTEMP.textContent = temperature + " °C";
        labelwater.textContent = waterLevel;
        labelSol.textContent = humiditySol;

        console.reg?.("Données mises à jour avec succès !");
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}

// Actualisation toutes les 3 secondes
setInterval(sendData, 3000);
