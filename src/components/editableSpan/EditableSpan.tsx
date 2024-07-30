import React, {ChangeEvent, memo, useState} from "react";

type EditableSpanProps = {
    oldTitle: string;
    changeItem:(newTitle:string) =>void
}

export const EditableSpan = memo(({oldTitle, changeItem}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle]  = useState(oldTitle)
    const changeEditMode = () => {
        setEditMode(!editMode);
        if(editMode && newTitle.trim()){
            changeItem(newTitle)
        }

    }
    const changeTitleHandler =(e:ChangeEvent<HTMLInputElement> ) => {
        setNewTitle(e.currentTarget.value)

    }

    return (
        editMode ?
            <input value={newTitle} onBlur={changeEditMode} autoFocus={true} onChange={changeTitleHandler}/>
            : <span onDoubleClick={changeEditMode}>{oldTitle}</span>
    )
})