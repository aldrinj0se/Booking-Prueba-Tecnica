import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookContext } from "../context/Bookcontext";
import Favorites from "../components/Favorites";
import { BrowserRouter } from "react-router-dom";

// Mocks
const mockRemoveFavorite = jest.fn();

const mockFavorites = [
  { id: 1, name: "Book 1", authors: "Author 1" },
  { id: 2, name: "Book 2", authors: "Author 2" },
];

const mockEmptyFavorites = [];

describe("Favorites Component", () => {
  it("should render a message when no books are in favorites", () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            favorites: mockEmptyFavorites,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <Favorites />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que el mensaje de 'No tienes libros favoritos.' se muestre
    expect(screen.getByText("No tienes libros favoritos.")).toBeInTheDocument();
  });

  it("should render a list of favorite books", () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            favorites: mockFavorites,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <Favorites />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que los libros favoritos están en la lista
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();

    // Verificar que los autores están presentes
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });

  it("should call removeFavorite when the 'Eliminar' button is clicked", () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            favorites: mockFavorites,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <Favorites />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que el botón 'Eliminar' está presente
    const removeButtons = screen.getAllByText("Eliminar");

    // Simular un click en el primer botón de eliminar
    fireEvent.click(removeButtons[0]);

    // Verificar que removeFavorite fue llamado con el id correcto
    expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  });
});
