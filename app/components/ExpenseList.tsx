"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

interface Expense {
  id: string;
  name: string;
  price: number;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [deletedItemName, setDeletedItemName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "expenses"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expensesArr: Expense[] = [];

      querySnapshot.forEach((doc) => {
        expensesArr.push({ id: doc.id, ...doc.data() } as Expense);
      });

      setExpenses(expensesArr);

      const calculateTotal = () => {
        const total = expensesArr.reduce(
          (sum, item) => sum + parseFloat(item.price.toString()),
          0
        );
        setTotal(total);
      };

      calculateTotal();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const deleteItem = async (id: string, name: string) => {
    await deleteDoc(doc(db, "expenses", id));
    setDeletedItemName(name); // Guardar el nombre del item eliminado
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setDeletedItemName(""); // Restablecer el nombre del item eliminado
    }, 3000);
  };

  return (
    <div className="overflow-x-auto w-full border border-primary rounded-md md:w-2/3">
      <table className="table">
        <thead>
          <tr className="border-b border-primary text-primary">
            <th className="w-2/3 max-w-xs">Item Name</th>
            <th className="w-1/3 max-w-xs">Item Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="text-xs border-b border-primary" key={expense.id}>
              <td className="capitalize">{expense.name}</td>
              <td>${expense.price}</td>
              <td>
                <button
                  onClick={() => deleteItem(expense.id, expense.name)}
                  className="btn btn-outline btn-warning items-center justify-center btn-sm"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length < 1 ? (
        <div className="flex flex-row justify-start gap-4 px-4 items-center w-full text-error">
          <span>No items yet</span>
        </div>
      ) : (
        <footer className="flex flex-row justify-start gap-4 px-4 items-center w-full font-black text-primary">
          <span>Total</span>
          <span>${total}</span>
        </footer>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-warning">
            <span className="capitalize font-bold text-white">{deletedItemName} deleted successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
