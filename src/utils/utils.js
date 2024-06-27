import { v4 as uuid } from 'uuid';

const newId = () => {
    return uuid();
}


const toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export { newId, toTitleCase };