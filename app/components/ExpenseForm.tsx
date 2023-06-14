"use client";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ExpenseForm() {
  const [expense, setExpense] = useState({ name: "", price: "" });
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [theme, setTheme] = useState("night");

  const addItem = async (e: any) => {
    e.preventDefault();
    if (expense.name !== "" && expense.price !== "") {
      await addDoc(collection(db, "expenses"), {
        name: expense.name.trim(),
        price: expense.price,
      });
      setAddedItemName(expense.name);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setAddedItemName("");
      }, 3000);
    }
    setExpense({ name: "", price: "" });
  };

  const toggleTheme = () => {
    setTheme(theme === "night" ? "light" : "night");
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="flex flex-col justify-center">
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" />
        <div className="swap-on flex btn-sm btn-circle btn-accent justify-center items-center">
          <BsSun className="text-white" />
        </div>
        <div className="swap-off flex btn-sm btn-circle btn-accent justify-center items-center">
          <BsMoon className="text-white" />
        </div>
      </label>
      <h1 className="font-black text-3xl text-accent text-center mb-10 md:text-5xl">Expense Tracker</h1>
      <section className="join">
        <input
          value={expense.name}
          onChange={(e) => setExpense({ ...expense, name: e.target.value })}
          type="text"
          placeholder="Enter Item"
          className="join-item input input-bordered input-accent w-full capitalize"
        />
        <input
          value={expense.price}
          onChange={(e) => setExpense({ ...expense, price: e.target.value })}
          type="number"
          placeholder="$"
          className="join-item input input-bordered input-accent w-full"
        />
        <button
          onClick={addItem}
          className="text-3xl btn btn-outline btn-accent join justify-center items-center rounded-l-none w-[50px] md:w-auto"
        >
          +
        </button>
        {showToast && (
        <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span className="capitalize font-bold text-white">
                {addedItemName} added successfully
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
