import { v4 as uuid } from 'uuid';

const newId = () => {
    return uuid();
}

export { newId };