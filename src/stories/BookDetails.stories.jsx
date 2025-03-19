import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BookContext } from "../context/Bookcontext";
import BookDetails from "../components/BookDetails";

export default {
  title: "Components/BookDetails",
  component: BookDetails,
  decorators: [
    (Story) => {
      // Valor simulado del contexto
      const dummyContextValue = {
        books: [
          {
            id: "1",
            name: "Test Book",
            authors: "Test Author",
            released: "2020-01-01",
            synopsis: "This is a test synopsis for the book.",
            rating: 4,
          },
        ],
        favorites: [],
        addFavorite: () => console.log("addFavorite called"),
        removeFavorite: () => console.log("removeFavorite called"),
      };

      return (
        <BookContext.Provider value={dummyContextValue}>
          {/* MemoryRouter con la ruta inicial para simular el parámetro "id" */}
          <MemoryRouter initialEntries={["/book/1"]}>
            <Routes>
              <Route path="/book/:id" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </BookContext.Provider>
      );
    },
  ],
};

const Template = (args) => <BookDetails {...args} />;

export const Default = Template.bind({});
Default.args = {};
