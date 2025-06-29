import React, { useState } from "react";
import { useFilter } from "../Hooks/useFilter";
import ContextMenu from "./ContextMenu";

const ExpenseTable = ({ expenses, setExpenses, setExpense, editRowId, setEditRowId }) => {
  const [filteredExpenses, setQuery] = useFilter(
    expenses,
    (expense) => expense.category
  );
  const total = filteredExpenses.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback, setSortCallback] = useState(() => () => {}); //Callback inside callback -> Setting the value of sortCallback as an empty callback
  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        rowId={rowId}
        setData={setExpenses}
        setMenuPosition={setMenuPosition}
        setExpense={setExpense}
        expenses={expenses}
        setEditRowId={setEditRowId}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (menuPosition.top) {
            setMenuPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th className="title-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => setSortCallback(() => (a, b) => a.title.localeCompare(b.title))}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => setSortCallback(() => (a, b) => b.title.localeCompare(a.title))}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => setSortCallback(() => (a, b) => a.amount - b.amount)}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => setSortCallback(() => (a, b) => b.amount - a.amount)}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.sort(sortCallback).map((expense) => (
            <tr
              key={expense.id}
              onContextMenu={(e) => {
                e.preventDefault();
                setMenuPosition({ top: e.clientY + 4, left: e.clientX + 4 });
                setRowId(expense.id);
              }}
            >
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th className="clear-sort">
              <b
                onClick={() => {
                  setSortCallback(() => () => { });
                }}
              >
                Clear Sort
              </b>
            </th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
