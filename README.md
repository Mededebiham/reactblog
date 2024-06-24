# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
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
## Mitwirkende
Vielen Dank an die folgenden Personen, die zu diesem Projekt beigetragen haben:
- Entwickler 1: Benutzerregistrierung, Authentifizierung, SEO und Medienverarbeitung
- Entwickler 2: Verwaltung von Blogbeiträgen, Kategorisierung und Favoriten
- Entwickler 3: Kommentarsystem, Moderation und Planung
QA: Unit-Tests, Code-Reviews und Fehlerbehebung
## Lizenz
Dieses Projekt ist lizenziert unter der MIT-Lizenz - siehe die LICENSE Datei für Details.
hat Kontextmenü

