import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookTable from "./components/BookTable";
import BookDetails from "./components/BookDetails";
import Favorites from "./components/Favorites";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<BookTable />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/new" element={<BookForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
