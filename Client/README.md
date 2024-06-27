# React Webblog Project
## Inhaltsverzeichnis
1. [Über das Projekt](#über-das-projekt)
2. [Funktionen](#funktionen)
3. [Installation](#installation)
4. [Verwendung](#verwendung)
5. [Projektstruktur](#projektstruktur)
6. [Mitwirkende](#mitwirkende)
7. [Lizenz](#lizenz)
## Über das Projekt
Dieses Projekt ist eine einfache Blog-Anwendung, die mit React entwickelt wurde. Sie ermöglicht es Benutzern, sich zu registrieren, anzumelden, Blogbeiträge zu lesen und Kommentare zu hinterlassen. Administratoren können Beiträge erstellen, bearbeiten, löschen und die Benutzerrollen verwalten.
## Funktionen
- Benutzerregistrierung und -anmeldung
- Erstellen, Bearbeiten und Löschen von Blogbeiträgen
- Kommentarsystem für Benutzer und Administratoren
- Verwaltung von Benutzerrollen
- Kategorisierung von Beiträgen
- Favorisieren von Beiträgen
- Moderation und Planung von Beiträgen
- SEO-freundliche URLs und Bildhochladen
## Installation
Um das Projekt lokal auszuführen, folgen Sie diesen Schritten:
1. **Repository klonen:**
    ```bash
    git clone https://github.com/your-username/react-webblog.git
    cd react-webblog
    ```
2. **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```
3. **Entwicklungsserver starten:**
    ```bash
    npm start
    ```
Das Projekt sollte nun unter `http://localhost:3000` laufen.
## Verwendung
Nach dem Starten des Entwicklungsservers können Sie die Anwendung im Browser öffnen und die verschiedenen Funktionen ausprobieren:
- Registrieren Sie sich und melden Sie sich an.
- Erstellen Sie neue Blogbeiträge als Administrator.
- Kommentieren Sie Beiträge und verwalten Sie Kommentare.
- Favorisieren Sie Beiträge und sehen Sie die beliebtesten Beiträge an.
- Verwalten Sie Benutzerrollen und organisieren Sie Beiträge in Kategorien.
## Projektstruktur
Eine Übersicht über die Projektstruktur:
```plaintext
react-webblog/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Comments.jsx
│   │   ├── Comment.jsx
│   │   ├── BlogPost.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PostS.jsx
│   │   ├── Post.jsx
│   │   └── ...
│   ├── services/
│   │   ├── authService.js
│   │   └── postService.js
│   ├── styles/
│   │   └── index.css
│   ├── database/
│   │   └── DB.js
│   ├── App.jsx
│   ├── index.jsx
│   └── ...
├── .gitignore
├── package.json
└── README.md
```

## Mitwirkende
Vielen Dank an die folgenden Personen, die zu diesem Projekt beigetragen haben:
- Entwickler 1: Benutzerregistrierung, Authentifizierung, SEO und Medienverarbeitung
- Entwickler 2: Verwaltung von Blogbeiträgen, Kategorisierung und Favoriten
- Entwickler 3: Kommentarsystem, Moderation und Planung
QA: Unit-Tests, Code-Reviews und Fehlerbehebung
## Lizenz
Dieses Projekt ist lizenziert unter der MIT-Lizenz - siehe die LICENSE Datei für Details.
hat Kontextmenü

