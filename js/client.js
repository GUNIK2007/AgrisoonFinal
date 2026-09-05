let labelTEMP = document.querySelector("#val-temp");
let labelHUM = document.querySelector("#val-humidity");
let labelwater = document.querySelector("#val-water");
let labelSol = document.querySelector("#val-recom");
let labelSolindex = document.querySelector("#val-recom2");

let temperature = 0; 
let humidity = 0; 
let waterLevel = 0; 
let humiditySol = 0; 

// Fonction pour émettre un bip sonore long depuis l'ordinateur
function playBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Fréquence (Note Ré)
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 1500); // Durée du bip : 1500 millisecondes (1,5 seconde - bip long)
    } catch (e) {
        console.log("Audio non autorisé par le navigateur pour l'instant.");
    }
}

function sendData(){
    fetch('https://agrisoonbakend.onrender.com/mesure')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau lors de la récupération des données");
        }
        return response.json();
    })
    .then(mesure => {
        temperature = mesure.temperature;
        humidity = mesure.humidity_air;
        humiditySol = mesure.humidity_sol;
        waterLevel = mesure.niveau_eau;

        // Mise à jour de l'affichage dans le HTML
        labelHUM.textContent = humidity + " %";
        labelTEMP.textContent = temperature + " °C";
        labelwater.textContent = waterLevel;
        labelSol.textContent = humiditySol + " %";
        labelSolindex.textContent = `Optimal ( ${humiditySol} % )`;

        // Vérification du seuil critique (1500) pour déclencher le bip sur le PC
        if (waterLevel > 1500) {
            console.warn("Niveau d'eau critique atteint !");
            playBeep();
        }

        console.log("Données mises à jour avec succès !");
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}

// Actualisation toutes les 2,5 secondes
setInterval(sendData, 2500);
