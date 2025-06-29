import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import ExpenseData from "./ExpenseData";
import useLocalStorage from "./Hooks/useLocalStorage";

const App = () => {
  const [expenses, setExpenses] = useLocalStorage("expenses", ExpenseData);
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [editRowId, setEditRowId] = useState("");
  return (
    <main>
      <h1 style={{ textAlign: "center", color: "rgb(241, 136, 7)" }}>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editRowId={editRowId}
          setEditRowId={setEditRowId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          editRowId={editRowId}
          setEditRowId={setEditRowId}
        />
      </div>
    </main>
  );
};

export default App;
