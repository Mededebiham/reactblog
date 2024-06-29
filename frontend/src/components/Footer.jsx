import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-mantle text-sm text-text flex justify-around">
            <div className="p-4">© {currentYear} Drei M's</div>
            <ul className='flex'>
                <li className="p-4 hover:text-yellow"><button>Kontakt</button></li>
                <li className="p-4 hover:text-yellow"><button>Datenschutz</button></li>
                <li className="p-4 hover:text-yellow"><button>Impressum</button></li>
            </ul>
        </footer>
    );
};

export default Footer;
