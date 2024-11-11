# Playtest Tracking App

## Disclaimer
Die Playtest Tracking App befindet sich noch in der Entwicklung. Folgende Funktionen sind aktuell noch in Arbeit:

1. **Bearbeitungsmodus für die Fragebogenblöcke**: Möglichkeit, bestehende Blöcke zu bearbeiten.
2. **Seitenleiste für aussortierte Blöcke**: Eine Seitenleiste, in der Blöcke abgelegt werden können, die nicht mehr verwendet werden sollen.
3. **Erstellung neuer Blöcke**: Funktionalität zum Hinzufügen neuer Blöcke in den Fragebogen.
4. **Maske zur Erstellung eines Fragebogens**: Oberfläche zur Erstellung eines neuen Fragebogens, wobei die Komponente `SurveyCreation.tsx` verwendet wird.
5. **Backendspeicherung der Fragebogeneinstellungen**: Speichern aller Einstellungen eines Fragebogens auf dem Server.
6. **QR-Code-Teilen**: Möglichkeit, den Fragebogen über einen QR-Code zu teilen, damit Playtester*innen diesen ausfüllen können.
7. **Speichern und visuelle Darstellung der Ergebnisse**: Die Ergebnisse der Umfragen sollen gespeichert und auf einem Dashboard visuell aufbereitet werden, damit die Spieleautor*innen die Testergebnisse auswerten können.
   
Ich arbeite aktiv daran, diese Funktionen fertigzustellen und die App in den kommenden Updates zu verbessern.

---

Die Playtest Tracking App ermöglicht es Spieleentwickler:innen und QA-Teams, detailliertes Feedback von Testspieler:innen zu sammeln und dieses in einem strukturierten und analysierbaren Format zur Weiterentwicklung von Brett- und Kartenspielen zu nutzen. Die App bietet eine zentrale Plattform zur Verwaltung von Fragebögen, zur Speicherung der Ergebnisse und zur visuellen Auswertung, um fundierte Entscheidungen im Entwicklungsprozess zu treffen.

---

## Installation

### Voraussetzungen

- **Node.js** und **npm** müssen installiert sein.
- **XAMPP** zur Verwaltung von Apache und MySQL.

### Schritte zur Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/dein-username/playtest-tracking-app.git
   ````
2. **In das Projektverzeichnis wechseln**:
   ````bash
   cd playtest-tracking-app
   ````
3. **Frontend-Abhängigkeiten installieren**:
   Stelle sicher, dass Node.js und npm auf deinem System installiert sind. Stelle sicher, dass du dich im frontend-Ordner befindest. Installiere die Abhängigkeiten.
   ````bash
   cd frontend
   npm install
   ````
   
4. **Backend-Abhänigigkeiten installieren**:
   Wechsel in den backend-Ordner und installiere die Abhänigkeiten.
   ````bash
   cd ../backenc
   npm install
   ````
   **	Authentifizierung und Sicherheit**
	Diese Pakete werden für die Authentifizierung und das Handling von Passwörtern benötigt:
   ````bash
   npm install bcryptjs jsonwebtoken
   ````

   **	Validierung **
   Verwende express-validator für die Validierung von Anfragen:
   ````bash
   npm install express-validator
   npm install supertest
   npm install jest
   ````

   **	Typen für TypeScript **
	Für TypeScript spezifische Typdefinitionen, um die verwendeten Libraries in einer TypeScript-Umgebung zu unterstützen:
   ````bash
   npm install --save-dev @types/express@4.17.13 @types/sequelize @types/bcryptjs @types/jsonwebtoken @types/jest @types/supertest
   ````
   
6. **XAMPP einrichten**:
   - Apache und MySQL in XAMPP starten
   - Stelle sicher, dass deine MySQL-Datenbank läuft und die Konfigurationsdateien entsprechend angepasst sind (z.B. config.php oder .env im Backend).
Richte eine Datenbank für die Playtest-Daten ein und führe gegebenenfalls SQL-Skripte zur Einrichtung aus.

7. **Backend-Server starten** im Backend-Ordner:
   ````bash
   npm run dev
   ````

8. **Frontend starten**:
   Wechsel zurück in den frontend-Ornder und starte die App im Entwicklungsmodus (über Vite).
   ````bash
   npm run dev
   ````

9. **Zugriff auf die App**:
   Öffne den Browser und gehe zu http://localhost:5173 , um die App im Frontend anzuzeigen.
   
---

## Verwendung

1. Öffne den Browser und gehe zu http://localhost:5173 .
2. Registriere dich oder logge dich ein.
3. Wähle oder arrangiere Umfrageblöcke mit der Drag-And-Drop-Oberfläche.
4. Speichere den erstellen Fragebogen in deinem Profil ab.

---
## Hauptfunktionen
- Drag-and-Drop-Blöcke: Verschiedene Umfrageblöcke können flexibel angeordnet werden.
- Mehrsprachigkeit: Die App unterstützt mehrsprachige Inhalte mit Standard in Deutsch, basierend auf i18n.
- Bewertungssystem: Die App ermöglicht es Testspieler
, das Spielerlebnis nach verschiedenen Kriterien wie Strategie, Glücksfaktor, Spaßfaktor und mehr zu bewerten.
- Validierung: Die Formulare werden mit Yup validiert, um sicherzustellen, dass alle erforderlichen Felder ausgefüllt sind.

---

## Technologien
Dies ist eine Full-Stack-Anwendung, die sowohl Frontend- als auch Backend-Komponenten umfasst:

- Vite: Entwicklungsserver für schnelles Bauen und Hot-Reloading des Frontends.
- React: Hauptbibliothek für die UI-Erstellung.
- Formik: Formularverwaltung und Validierung.
react-beautiful-dnd: Drag-and-Drop-Funktionalität.
- Yup: Validierungsschema für Formulare.
- i18next: Internationalisierung der Inhalte.
- Bootstrap: Für grundlegende Styling-Elemente und ein responsives Design.
- Node.js: Backend-Server.
- MySQL: Datenbank für die Speicherung der Playtest-Daten.
- XAMPP: Verwaltung von Apache und MySQL.

---

## Ordnerstruktur
````bash
playtest-tracking-app/
│
├── frontend/              # Frontend-App mit React und Vite
│   ├── components/        # Enthält die Umfrageblöcke und UI-Komponenten
│   ├── styles/            # Stile und CSS-Dateien
│   └── App.tsx            # Haupteinstiegspunkt der Frontend-App
│
├── backend/               # Backend-Server
│   ├── routes/            # API-Routen für die Datenverarbeitung
│   └── database/          # Datenbank-Modelle und Verbindungen
│
├── i18n/                  # Konfigurationsdateien für die Internationalisierung
├── .env                   # Umgebungsvariablen für das Backend (z.B. DB-Zugang)
└── README.md              # Dieses Dokument
````

