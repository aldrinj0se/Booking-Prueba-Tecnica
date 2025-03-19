import React, { useMemo, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { BookContext } from "../context/Bookcontext";

const BookTable = () => {
  const { books, loading, error, favorites, addFavorite, removeFavorite } =
    useContext(BookContext);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const data = useMemo(() => books, [books]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Título",
      },
      {
        accessorKey: "authors",
        header: "Autor(es)",
      },
      {
        accessorKey: "released",
        header: "Fecha de Publicación",
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <Link
            to={`/book/${row.original.id}`}
            className="text-accent hover:underline"
          >
            Detalles
          </Link>
        ),
      },
      {
        id: "favorite",
        header: "Favorito",
        cell: ({ row }) => {
          const book = row.original;
          const isFavorite = favorites.some((fav) => fav.id === book.id);
          return (
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
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              aria-label="Toggle Favorite"
            >
              {isFavorite ? "♥" : "♡"}
            </i>
          );
        },
      },
    ],
    [favorites, addFavorite, removeFavorite]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-themeBackground">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título o autor"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border border-themeSecondary rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-themePrimary text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className="py-2 px-4 border-b cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="text-center odd:bg-themeBackground even:bg-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
