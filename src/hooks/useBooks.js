import { useState, useEffect } from "react";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://anapioficeandfire.com/api/books";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        // Extraemos el id desde la URL (último segmento)
        const formattedData = data.map((book) => {
          const id = book.url.split("/").pop();
          return {
            id, // se asigna el id extraído
            name: book.name,
            authors: book.authors.join(", "),
            released: book.released
              ? new Date(book.released).toLocaleDateString()
              : "N/A",
            synopsis: "Sinopsis de ejemplo",
            rating: Math.floor(Math.random() * 5) + 1,
          };
        });
        setBooks(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};
