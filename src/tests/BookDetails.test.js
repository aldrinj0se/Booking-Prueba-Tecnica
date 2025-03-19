import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookContext } from "../context/Bookcontext";
import BookDetails from "../components/BookDetails";

// Datos simulados
const mockBooks = [
  {
    id: 1,
    name: "Libro de Prueba",
    authors: "Autor de Prueba",
    released: "2025-01-01",
    synopsis: "Sinopsis del libro de prueba.",
    rating: 4.5,
  },
];

const mockFavorites = [];

const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

const renderWithContext = (ui, { route = "/book/1" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <BookContext.Provider
      value={{
        books: mockBooks,
        favorites: mockFavorites,
        addFavorite: mockAddFavorite,
        removeFavorite: mockRemoveFavorite,
      }}
    >
      <Router>
        <Routes>
          <Route path="/book/:id" element={ui} />
        </Routes>
      </Router>
    </BookContext.Provider>
  );
};

describe("BookDetails", () => {
  test("muestra los detalles del libro correctamente", () => {
    renderWithContext(<BookDetails />);

    expect(screen.getByText("Libro de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Autor de Prueba")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(
      screen.getByText("Sinopsis del libro de prueba.")
    ).toBeInTheDocument();
    expect(screen.getByText("4.5 / 5")).toBeInTheDocument();
  });

  test("agrega el libro a favoritos al hacer clic en el ícono", async () => {
    renderWithContext(<BookDetails />);

    const favoriteIcon = screen.getByLabelText("Toggle Favorite");
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(mockAddFavorite).toHaveBeenCalledWith(mockBooks[0]);
    });
  });

  test("elimina el libro de favoritos al hacer clic en el ícono si ya es favorito", async () => {
    mockFavorites.push(mockBooks[0]);
    renderWithContext(<BookDetails />);

    const favoriteIcon = screen.getByLabelText("Toggle Favorite");
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(mockRemoveFavorite).toHaveBeenCalledWith(mockBooks[0].id);
    });
  });

  test('muestra "Libro no encontrado" si el libro no existe', () => {
    const nonExistentBookId = "999";
    renderWithContext(<BookDetails />, { route: `/book/${nonExistentBookId}` });

    expect(screen.getByText("Libro no encontrado.")).toBeInTheDocument();
  });
});
