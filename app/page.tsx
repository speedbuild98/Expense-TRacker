import { ExpenseForm, ExpenseList } from "./components";

export default function App() {
  return (
    <main className="flex flex-col p-[20px] gap-10 justify-center items-center relative">
      <ExpenseForm />
      <ExpenseList />
    </main>
  );
}
