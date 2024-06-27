import { newId } from "../utils/utils";

const tags = {
    "ocean": { _id: newId(), name: 'Ozean', color: 'bg-sky' },
    "marineLife": { _id: newId(), name: 'Meereslebewesen', color: 'bg-blue' },
    "conservation": { _id: newId(), name: 'Naturschutz', color: 'bg-green' },
    "ai": { _id: newId(), name: 'Künstliche Intelligenz', color: 'bg-red' },
    "future": { _id: newId(), name: 'Zukunft', color: 'bg-maroon' },
    "food": { _id: newId(), name: 'Essen', color: 'bg-flamingo' },
    "cuisine": { _id: newId(), name: 'Küche', color: 'bg-rosewater' },
    "recipes": { _id: newId(), name: 'Rezepte', color: 'bg-yellow' },
    "quantumPhysics": { _id: newId(), name: 'Quantenphysik', color: 'bg-teal' },
    "science": { _id: newId(), name: 'Wissenschaft', color: 'bg-lavender' },
    "technology": { _id: newId(), name: 'Technologie', color: 'bg-mauve' }
};

const posts = [
    {
        id: newId(),
        title: 'Die Tiefen des Ozeans erkunden: Eine ungesehene Welt',
        content: 'Der Ozean, der mehr als 70 % der Erdoberfläche bedeckt, bleibt eine riesige und weitgehend unerforschte Grenze. In dieser umfassenden Erkundung tauchen wir tief in die Geheimnisse der Unterwasserwelt ein. Von den lebendigen Korallenriffen, die von vielfältigem Meeresleben wimmeln, bis zu den unheimlichen, lichtlosen Tiefen des Marianengrabens, in denen unbekannte Kreaturen leben. Dieser Artikel beleuchtet auch die entscheidende Rolle der Ozeane bei der Regulierung des Klimas auf unserem Planeten und die dringende Notwendigkeit, diese wichtigen Ökosysteme zu schützen. Die faszinierenden Verhaltensweisen von Meereslebewesen, die Auswirkungen menschlicher Aktivitäten und bahnbrechende Forschungen in der Meeresbiologie werden ausführlich diskutiert, um den Lesern ein tiefes Verständnis für die Wunder des Ozeans und seine Bedeutung für unseren Planeten zu vermitteln.',
        likes: 0,
        comments: [],
        tags: [tags["ocean"], tags["marineLife"], tags["conservation"]]
    },
    {
        id: newId(),
        title: 'Der Aufstieg der Künstlichen Intelligenz: Die Zukunft verändern',
        content: 'Künstliche Intelligenz (KI) ist nicht nur ein Schlagwort; sie ist eine technologische Revolution, die Branchen und das tägliche Leben verändert. Dieser Artikel beleuchtet die Geschichte der KI, von ihren theoretischen Grundlagen bis zu ihren aktuellen Anwendungen und zukünftigen Perspektiven. Wir untersuchen, wie KI in verschiedenen Bereichen eingesetzt wird, zum Beispiel im Gesundheitswesen, wo sie bei Diagnosen und personalisierter Medizin hilft, im Finanzwesen zur Betrugserkennung und algorithmischen Handel, und in der Unterhaltung durch Empfehlungssysteme und Inhaltserstellung. Die ethischen Überlegungen rund um KI, einschließlich Fragen des Datenschutzes, der Arbeitsplatzverlagerung und der Transparenz bei Entscheidungen, werden ausführlich untersucht. Durch das Verständnis des Potenzials und der Herausforderungen der KI können wir ihre Integration in die Gesellschaft besser steuern und ihre Macht zum Wohle aller nutzen.',
        likes: 0,
        comments: [],
        tags: [tags["ai"], tags["technology"], tags["future"]]
    },
    {
        id: newId(),
        title: 'Kulinarische Abenteuer: Eine Reise durch die Weltküche',
        content: 'Begeben Sie sich auf eine kulinarische Reise, die Sie durch die vielfältigen und köstlichen Küchen der Welt führt. Dieser Artikel feiert das reiche Geflecht der globalen Gastronomie und hebt ikonische Gerichte und kulinarische Traditionen aus verschiedenen Kulturen hervor. Von den aromatischen Gewürzen des indischen Currys bis zu den zarten Aromen des japanischen Sushis und dem herzhaften Komfort der italienischen Pasta erkunden wir die Geschichte, die Zutaten und die Techniken, die diese beliebten Speisen ausmachen. Persönliche Anekdoten und Interviews mit renommierten Köchen bieten einen Einblick in die Kunst des Kochens. Darüber hinaus diskutieren wir die kulturelle Bedeutung von Essen, den Aufstieg der Fusionsküche und geben Tipps für Hobbyköche, wie sie mit internationalen Rezepten experimentieren können. Ob Feinschmecker oder Gelegenheitsdiner, dieses kulinarische Abenteuer verspricht, Ihre Geschmacksknospen zu kitzeln und Ihre gastronomischen Horizonte zu erweitern.',
        likes: 0,
        comments: [],
        tags: [tags["food"], tags["cuisine"], tags["recipes"]]
    },
    {
        id: newId(),
        title: 'Das Quantenreich: Die Geheimnisse der Quantenphysik enthüllen',
        content: 'Die Quantenphysik, oft als eines der komplexesten und faszinierendsten Gebiete der Wissenschaft betrachtet, bietet einen Einblick in die grundlegenden Funktionsweisen des Universums. Dieser Artikel bietet eine zugängliche Einführung in die Quantenmechanik und erklärt Schlüsselkonzepte wie Überlagerung, Verschränkung und Welle-Teilchen-Dualität. Wir erkunden die bahnbrechenden Experimente, die unser Verständnis des Quantenreichs geprägt haben, und diskutieren die Implikationen der Quantentheorie für Technologie und Philosophie. Themen sind unter anderem Quantencomputing, das beispiellose Rechenleistung verspricht, und Quantenkryptografie, die eine unknackbare Sicherheit für Kommunikationssysteme bietet. Indem wir diese Konzepte entmystifizieren, laden wir die Leser ein, die Schönheit und das Wunder der Quantenphysik zu schätzen und ihr Potenzial zur Revolutionierung unserer Welt zu erkennen.',
        likes: 0,
        comments: [],
        tags: [tags["quantumPhysics"], tags["science"], tags["technology"]]
    }
];

export { posts, tags };
