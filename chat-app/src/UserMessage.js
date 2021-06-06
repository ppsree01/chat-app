import React, {useState} from 'react';

function UserMessage({text,id, tag}) {
    const style = text && text.length > 90 ? 
    "align-right right-0 rounded-lg border-r-8 p-2.5 m-2.5 border-yellow-500 w-auto w-96 break-normal bg-white text-right" : 
    "right-0 rounded-lg border-r-8 p-2.5 m-2.5 border-yellow-500 w-max w-96 break-normal bg-white text-right"

    return (
        <div className="flex justify-end">
            <div tag={tag} className={style} data-id={id}>
                <p className="text-left">{text}</p>
            </div>
        </div>
    );
}

export default UserMessage;