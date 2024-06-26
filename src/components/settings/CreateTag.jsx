import React from 'react';

const CreateTag = ({ visible = false }) => {
    return (
        <div className={`ml-1 mt-4 ${visible ? "" : "hidden"}`}>
            Create Tag // TODO
        </div>
    );
};

export default CreateTag;