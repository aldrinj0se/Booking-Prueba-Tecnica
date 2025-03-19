import React, { createContext, useState, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const { books, loading, error } = useBooks();
  const [favorites, setFavorites] = useState([]);
  // Cargar favoritos desde el localStorage al montar el componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Función para añadir un libro a favoritos
  const addFavorite = (book) => {
    setFavorites((prev) => {
      const alreadyAdded = prev.some((fav) => fav.id === book.id);
      if (alreadyAdded) {
        return prev;
      }
      const updatedFavorites = [...prev, book];
      // Guardar la lista actualizada de favoritos en el localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Función para eliminar un libro de favoritos
  const removeFavorite = (bookId) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((fav) => fav.id !== bookId);
      // Actualizar el localStorage después de eliminar
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <BookContext.Provider
      value={{ books, loading, error, favorites, addFavorite, removeFavorite }}
    >
      {children}
    </BookContext.Provider>
  );
};
