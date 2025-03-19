import React, { useContext } from "react";
import { BookContext } from "../context/Bookcontext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(BookContext);

  if (favorites.length === 0)
    return <p className="text-themeText">No tienes libros favoritos.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-themeBackground">
      <h2 className="text-2xl font-bold mb-4 text-themePrimary">
        Libros Favoritos
      </h2>
      <ul>
        {favorites.map((book) => (
          <li
            key={book.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 mb-2 rounded shadow"
          >
            <div className="mb-2 sm:mb-0">
              <Link
                to={`/book/${book.id}`}
                className="text-accent hover:underline"
              >
                {book.name}
              </Link>
              <p className="text-sm text-themeText">{book.authors}</p>
            </div>
            <button
              onClick={() => removeFavorite(book.id)}
              className="bg-accent text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
