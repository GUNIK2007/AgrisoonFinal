let labelTEMP = document.querySelector("#val-temp");
let labelHUM = document.querySelector("#val-humidity");
let labelwater = document.querySelector("#val-water");
let labelSol = document.querySelector("#val-recom");
let labelSolindex = document.querySelector("#val-recom2");

let temperature = 0; 
let humidity = 0; 
let waterLevel = 0; 
let humiditySol = 0; 

function sendData(){
    fetch('https://agrisoonbakend.onrender.com/mesure')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau lors de la récupération des données");
        }
        return response.json();
    })
    .then(mesure => {
        // Récupération des valeurs avec une valeur par défaut (0) si elles n'existent pas encore
        temperature = mesure.temperature ?? 0;
        humidity = mesure.humidity_air ?? 0;
        humiditySol = mesure.humidity_sol ?? 0;
        waterLevel = mesure.niveau_eau ?? 0;

        // Mise à jour de l'affichage dans le HTML avec les symboles
        labelHUM.textContent = humidity + " %";
        labelTEMP.textContent = temperature + " °C";
        labelwater.textContent = waterLevel;
        labelSol.textContent = humiditySol + " %";
        labelSolindex.textContent = `Optimal ( ${humiditySol} % )`;

        console.log("Données mises à jour avec succès !");
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}

// Actualisation toutes les 2.5 secondes (2500 ms)
setInterval(sendData, 2500);
