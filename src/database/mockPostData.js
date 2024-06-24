import { newId } from "../utils/utils";

const tags = {
    ocean: { id: newId(), name: 'Ocean', color: 'bg-sky' },
    marineLife: { id: newId(), name: 'Marine Life', color: 'bg-blue' },
    conservation: { id: newId(), name: 'Conservation', color: 'bg-green' },
    ai: { id: newId(), name: 'Artificial Intelligence', color: 'bg-red' },
    future: { id: newId(), name: 'Future', color: 'bg-maroon' },
    food: { id: newId(), name: 'Food', color: 'bg-flamingo' },
    cuisine: { id: newId(), name: 'Cuisine', color: 'bg-rosewater' },
    recipes: { id: newId(), name: 'Recipes', color: 'bg-yellow' },
    quantumPhysics: { id: newId(), name: 'Quantum Physics', color: 'bg-teal' },
    science: { id: newId(), name: 'Science', color: 'bg-lavender' },
    technology: { id: newId(), name: 'Technology', color: 'bg-mauve' }
};

const posts = [
    {
        id: newId(),
        title: 'Exploring the Depths of the Ocean: An Unseen World',
        content: 'The ocean, covering more than 70% of the Earth’s surface, remains a vast and largely uncharted frontier. In this comprehensive exploration, we dive deep into the mysteries of the underwater world. From the vibrant coral reefs teeming with diverse marine life to the eerie, lightless depths of the Mariana Trench, where unknown creatures dwell. This article also sheds light on the crucial role oceans play in regulating the planet’s climate and the pressing need to conserve these vital ecosystems. The fascinating behaviors of marine species, the impact of human activities, and groundbreaking research in marine biology are discussed at length, offering readers a profound understanding of the ocean’s wonders and its significance to our planet.',
        likes: 0,
        comments: [],
        tags: [tags.ocean, tags.marineLife, tags.conservation]
    },
    {
        id: newId(),
        title: 'The Rise of Artificial Intelligence: Transforming the Future',
        content: 'Artificial Intelligence (AI) is not just a buzzword; it is a technological revolution that is transforming industries and everyday life. This article delves into the history of AI, from its theoretical foundations to its current applications and future prospects. We explore how AI is being utilized in various fields such as healthcare, where it aids in diagnostics and personalized medicine, in finance for fraud detection and algorithmic trading, and in entertainment through recommendation systems and content creation. The ethical considerations surrounding AI, including issues of privacy, job displacement, and decision-making transparency, are thoroughly examined. By understanding the potential and challenges of AI, we can better navigate its integration into society and harness its power for the greater good.',
        likes: 0,
        comments: [],
        tags: [tags.ai, tags.technology, tags.future]
    },
    {
        id: newId(),
        title: 'Culinary Adventures: A Journey Through World Cuisine',
        content: 'Embark on a culinary journey that takes you through the diverse and delectable cuisines of the world. This article celebrates the rich tapestry of global gastronomy, highlighting iconic dishes and culinary traditions from various cultures. From the aromatic spices of Indian curry to the delicate flavors of Japanese sushi, and the hearty comfort of Italian pasta, we explore the history, ingredients, and techniques that define these beloved foods. Personal anecdotes and interviews with renowned chefs provide an insider’s perspective on the art of cooking. Additionally, we discuss the cultural significance of food, the rise of fusion cuisine, and tips for home cooks to experiment with international recipes. Whether you are a foodie or a casual diner, this culinary adventure promises to tantalize your taste buds and expand your gastronomic horizons.',
        likes: 0,
        comments: [],
        tags: [tags.food, tags.cuisine, tags.recipes]
    },
    {
        id: newId(),
        title: 'The Quantum Realm: Unveiling the Mysteries of Quantum Physics',
        content: 'Quantum physics, often regarded as one of the most complex and intriguing fields of science, offers a glimpse into the fundamental workings of the universe. This article provides an accessible introduction to quantum mechanics, explaining key concepts such as superposition, entanglement, and wave-particle duality. We explore the groundbreaking experiments that have shaped our understanding of the quantum realm and discuss the implications of quantum theory for technology and philosophy. Topics include quantum computing, which promises unprecedented processing power, and quantum cryptography, offering unbreakable security for communications. By demystifying these concepts, readers are invited to appreciate the beauty and wonder of quantum physics and its potential to revolutionize our world.',
        likes: 0,
        comments: [],
        tags: [tags.quantumPhysics, tags.science, tags.technology]
    }
];

export {posts, tags};
