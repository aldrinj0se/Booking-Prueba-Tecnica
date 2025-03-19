import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookContext } from "../context/Bookcontext";
import BookTable from "../components/BookTable";
import { BrowserRouter } from "react-router-dom";

// Mock del contexto
const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

const mockBooks = [
  { id: 1, name: "Book 1", authors: "Author 1", released: "2023-01-01" },
  { id: 2, name: "Book 2", authors: "Author 2", released: "2022-01-01" },
];

const mockFavorites = [
  { id: 1, name: "Book 1", authors: "Author 1", released: "2023-01-01" },
];

describe("BookTable Component", () => {
  it("should render the table with books data", async () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            books: mockBooks,
            loading: false,
            error: null,
            favorites: mockFavorites,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <BookTable />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que la tabla se renderiza
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Autor(es)")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Publicación")).toBeInTheDocument();

    // Verificar que los libros estén presentes
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  it("should handle the favorite toggle", async () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            books: mockBooks,
            loading: false,
            error: null,
            favorites: mockFavorites,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <BookTable />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Obtener todos los elementos con el label "Toggle Favorite"
    const favoriteIcons = screen.getAllByLabelText("Toggle Favorite");

    // Verificar que el corazón está lleno para el libro favorito
    expect(favoriteIcons[0]).toHaveTextContent("♥");

    // Simular un click para remover de favoritos
    fireEvent.click(favoriteIcons[0]);

    // Esperar a que la acción de remover favorito se complete
    await waitFor(() => expect(mockRemoveFavorite).toHaveBeenCalledTimes(1));

    // Verificar que el corazón cambió a vacío
    expect(favoriteIcons[0]).toHaveTextContent("♡");

    // Simular un click para agregar a favoritos
    fireEvent.click(favoriteIcons[0]);

    // Esperar a que la acción de agregar favorito se complete
    await waitFor(() => expect(mockAddFavorite).toHaveBeenCalledTimes(1));

    // Verificar que el corazón se volvió a llenar
    expect(favoriteIcons[0]).toHaveTextContent("♥");
  });

  it("should display loading message when books are loading", () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            books: [],
            loading: true,
            error: null,
            favorites: mockFavorites,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <BookTable />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que el mensaje de carga esté presente
    expect(screen.getByText("Cargando libros...")).toBeInTheDocument();
  });

  it("should display error message when there is an error", () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            books: [],
            loading: false,
            error: "Error al cargar los libros",
            favorites: mockFavorites,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <BookTable />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Verificar que el mensaje de error esté presente
    expect(
      screen.getByText("Error: Error al cargar los libros")
    ).toBeInTheDocument();
  });

  it("should filter books based on the global filter input", async () => {
    render(
      <BrowserRouter>
        <BookContext.Provider
          value={{
            books: mockBooks,
            loading: false,
            error: null,
            favorites: mockFavorites,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
          }}
        >
          <BookTable />
        </BookContext.Provider>
      </BrowserRouter>
    );

    // Escribir en el filtro global
    fireEvent.change(screen.getByPlaceholderText("Buscar por título o autor"), {
      target: { value: "Book 1" },
    });

    // Verificar que solo se muestra "Book 1"
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.queryByText("Book 2")).toBeNull();
  });
});
