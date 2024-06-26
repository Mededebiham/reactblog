import React, {useState} from 'react';
import ColorPicker from "../ColorPicker";
import Button from "../parts/Button";
import TagBadge from "../TagBadge";

const CreateTag = ({visible = false}) => {
    const [isNewTag, setIsNewTag] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState("bg-blue");
    const [tagName, setTagName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowColorPicker(false);

        const newTag = {name: tagName, color: selectedColor};
        console.log(newTag);

        setSelectedColor("bg-blue");
        setTagName("");
    }

    const handleChange = (e) => {
        setTagName(e.target.value);
        setShowColorPicker(true)
    };

    return (<div className={`ml-1 mt-4 ${visible ? "" : "hidden"}`}>

            <ColorPicker classNames={`${!showColorPicker && "hidden"}`} onClick={setSelectedColor}
                         selectedColor={selectedColor}/>
            <form className="max-w-sm mx-auto mt-4" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-text">Bezeichnung der
                        Kategorie</label>
                    <input type="category" id="category"
                           className="input"
                           placeholder="Name der Kategorie"
                           onChange={handleChange}
                           value={tagName}
                           required/>
                </div>
                {tagName && <div className="flex mb-4 items-center">
                    <p className="mr-2">Vorschau:</p>
                    <TagBadge bgColor={selectedColor}>{tagName}</TagBadge>
                </div>}
                <div className="flex">
                    <Button type="submit">
                        {isNewTag ? "Kategorie erstellen" : "Kategorie ändern"}
                    </Button>
                    {!isNewTag && <Button className="bg-red">Kategorie löschen</Button>}
                </div>
            </form>
        </div>);
};

export default CreateTag;