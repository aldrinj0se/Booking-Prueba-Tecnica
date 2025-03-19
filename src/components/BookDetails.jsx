import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../context/Bookcontext";

const BookDetails = () => {
  const { id } = useParams();
  const { books, favorites, addFavorite, removeFavorite } =
    useContext(BookContext);

  const book = books.find((b) => String(b.id) === id);
  if (!book) return <p>Libro no encontrado.</p>;

  const isFavorite = favorites.some((fav) => fav.id === book.id);

  return (
    <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-themeBackground p-6 md:p-8 lg:p-10 rounded shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-themePrimary mb-4">
        {book.name}
      </h2>
      <p className="text-base md:text-lg text-themeSecondary mb-2">
        <strong>Autor(es):</strong> {book.authors}
      </p>
      <p className="text-base md:text-lg text-themeSecondary mb-2">
        <strong>Fecha de Publicación:</strong> {book.released}
      </p>
      <p className="text-sm md:text-base text-themeText mb-2">
        <strong>Sinopsis:</strong> {book.synopsis}
      </p>
      <p className="text-sm md:text-base text-themeText mb-4">
        <strong>Calificación:</strong> {book.rating} / 5
      </p>
      <div className="flex justify-end">
        <i
          onClick={() => {
            if (isFavorite) {
              removeFavorite(book.id);
            } else {
              addFavorite(book);
            }
          }}
          className={`cursor-pointer text-3xl transition-colors duration-300 ${
            isFavorite ? "text-accent" : "text-gray-400"
          }`}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? "♥" : "♡"}
        </i>
      </div>
    </div>
  );
};

export default BookDetails;
