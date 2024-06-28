import React from 'react';

const PostFooter = ({postId, className = '', toggleComment, toggleLike, liked, likeCount}) => {
    return (
        <div className={`flex justify-end ${className}`}>
            {/*<button className="flex text-blue hover:text-yellow group" onClick={toggleComment}>*/}
            {/*    <svg className="w-6 h-6" aria-hidden="true"*/}
            {/*         xmlns="http://www.w3.org/2000/svg"*/}
            {/*         width="24" height="24" fill="currentColor" viewBox="0 0 24 24">*/}
            {/*        <path fill-rule="evenodd"*/}
            {/*              d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"*/}
            {/*              clip-rule="evenodd"/>*/}
            {/*    </svg>*/}
            {/*    <p className="pl-1">Kommentieren</p>*/}
            {/*</button>*/}
            <button className={`flex ${liked ? "text-yellow" : "text-blue hover:text-yellow"} group`} onClick={toggleLike}>
                <p className="pl-4 pr-1">{likeCount}</p>
                <svg className="w-6 h-6" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                          d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    );
};

export default PostFooter;