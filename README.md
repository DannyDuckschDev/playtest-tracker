# Playtest Tracking App

Die Playtest Tracking App ermöglicht es Spieleentwickler:innen und QA-Teams, detailliertes Feedback von Testspieler:innenn zu sammeln und dieses in einem strukturierten und analysierbaren Format zur Weiterentwicklung der Brett- und Kartenspiele zu nutzen und zu verwalten.

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
   
5. **XAMPP einrichten**:
   - Apache und MySQL in XAMPP starten
   - Stelle sicher, dass deine MySQL-Datenbank läuft und die Konfigurationsdateien entsprechend angepasst sind (z.B. config.php oder .env im Backend).
Richte eine Datenbank für die Playtest-Daten ein und führe gegebenenfalls SQL-Skripte zur Einrichtung aus.

6. **Backend-Server starten** im Backend-Ordner:
   ````bash
   npm run dev
   ````

7. **Frontend starten**:
   Wechsel zurück in den frontend-Ornder und starte die App im Entwicklungsmodus (über Vite).
   ````bash
   npm run dev
   ````

8. **Zugriff auf die App**:
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

