import React from 'react'

const ContextMenu = ({menuPosition, rowId, setData, setMenuPosition, setExpense, expenses, setEditRowId}) => {
    if(!menuPosition.top) return;
    return (
        <div className="context-menu" style={menuPosition}>
            <div onClick={() => {
                const {title, category, amount} = expenses.find((expense) => (expense.id === rowId))
                setExpense({title, category, amount})
                setEditRowId(rowId)
                setMenuPosition({})
            }}>Edit</div>
            <div onClick={() => {
                setData(prevState => prevState.filter((data) => (data.id != rowId)));
                setMenuPosition({});
            }}>Delete</div>
        </div>
    )
}

export default ContextMenu
