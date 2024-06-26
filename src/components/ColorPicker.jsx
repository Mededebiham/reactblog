import React from 'react';
import colors from "../utils/colors";

const colorsArray = Object.values(colors);

const ColorPicker = ({ onClick = null, classNames = '' }) => {
    return (
        <div className={`mt-4 ${classNames}`}>
            <div className="bg-mantle rounded-xl p-4">
                <div className="flex flex-wrap">
                    {colorsArray.map(({ color, name }) => (
                        <button
                            key={name}
                            className="flex flex-col items-center w-32 my-4 group"
                            onClick={() => onClick && onClick(color)}
                        >
                            <div className={`${color} w-10 h-10 rounded-full mb-2`} />
                            <p className="group-hover:text-yellow">{name}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
