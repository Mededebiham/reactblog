import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-mantle text-text flex justify-around">
            <div className="p-4">© {currentYear} 3 M's</div>
            <ul className='flex'>
                <li className="p-4 text-blue hover:text-yellow"><button>Kontakt</button></li>
                <li className="p-4 text-blue hover:text-yellow"><button>Datenschutz</button></li>
                <li className="p-4 text-blue hover:text-yellow"><button>Impressum</button></li>
            </ul>
        </div>
    );
};

export default Footer;
