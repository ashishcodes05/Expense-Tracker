import React, { useState } from 'react'
import Input from './Input';
import Select from './Select';

const ExpenseForm = ({ expense, setExpense, expenses, setExpenses, editRowId, setEditRowId }) => {
    const [errors, setErrors] = useState({})

    const validationConfig = {
        title: [
            { required: true, message: "Please enter title" },
            { minLength: 2, message: `Title should be atleast 2 characters long` }
        ],
        category: [{ required: true, message: "Please select a category" }],
        amount: [
            { required: true, message: "Please enter an amount" },
            { minLength: 1, message: "Amount should be atleast 1 character long" },
            { type: "number", message: "Amount should be a number" }
        ]
    }
    const validateForm = (expense) => {
        const errors = {};
        Object.entries(expense).forEach(([key, value]) => {
            validationConfig[key].some((rule) => {
                if (rule.required && !value) {
                    errors[key] = rule.message;
                    return true; // Stop checking further rules for this field
                }
                if (rule.minLength && value.length < rule.minLength) {
                    errors[key] = rule.message;
                    return true; // Stop checking further rules for this field
                }
                if (rule.type && rule.type === "number" && isNaN(value)) {
                    errors[key] = rule.message;
                    return true; // Stop checking further rules for this field
                }
            })
        })
        // if (!expense.title) errors.title = "Title is required";
        // if (!expense.category) errors.category = "Category is required";
        // if (!expense.amount) errors.amount = "Amount is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm(expense)) {
            return;
        }

        if (editRowId) {
            const editedExpenses = expenses.map((prevExpense) => {
                if (prevExpense.id === editRowId) {
                    return { ...expense, id: editRowId }
                }
                return prevExpense;
            })
            setExpenses(editedExpenses)
            setEditRowId("")
            setExpense({
                title: "",
                category: "",
                amount: ""
            })
            return;
        }
        // If the form is valid, add the expense to the list
        setExpenses((prevState) => ([...prevState, { ...expense, id: crypto.randomUUID() }]))
        // Reset the form fields
        setExpense({
            title: "",
            category: "",
            amount: 0
        })
        // const expense = { ...getFormData(e.target), id: crypto.randomUUID() };
        // setExpenses(prevExpenses => [...prevExpenses, expense]);
        // e.target.reset();
    };
    // JavaScript's FormData API can be used to easily get form data
    // const getFormData = (form) => {
    //     const formData = new FormData(form);
    //     const data = {};
    //     for(const [key, value] of formData.entries()) {
    //         data[key] = value;
    //     }
    //     return data;
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevState) => ({ ...prevState, [name]: value }));
        setErrors({}) // Clear errors on change
    }
    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <Input id="title" name="title" label="Title" value={expense.title} onChange={handleChange} error={errors.title} placeholder="Enter title" />
            <Select id="category" name="category" label="Category" value={expense.category} onChange={handleChange} error={errors.category} options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]} />
            <Input id="amount" name="amount" label="Amount" value={expense.amount} onChange={handleChange} error={errors.amount} placeholder="Enter amount" />
            <div className="btn-container">
                <button className="add-btn" type='submit'>{editRowId === "" ? "add" : "save"}</button>
            </div>
        </form>
    )
}

export default ExpenseForm;
