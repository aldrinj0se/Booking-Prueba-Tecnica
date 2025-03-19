import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

// Suite de pruebas
describe("Componente Header", () => {
  it("debe renderizar el encabezado y todos los enlaces", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verificar que el título 'Book Reader App' esté presente
    expect(screen.getByText("Book Reader App")).toBeInTheDocument();

    // Verificar que los enlaces principales estén renderizados
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Nuevo Libro")).toBeInTheDocument();
  });

  it("debe tener enlaces con las rutas correctas", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verificar que el enlace 'Inicio' tenga el atributo href correcto
    expect(screen.getByText("Inicio")).toHaveAttribute("href", "/");

    // Verificar que el enlace 'Favoritos' tenga el atributo href correcto
    expect(screen.getByText("Favoritos")).toHaveAttribute("href", "/favorites");

    // Verificar que el enlace 'Nuevo Libro' tenga el atributo href correcto
    expect(screen.getByText("Nuevo Libro")).toHaveAttribute("href", "/new");
  });

  it("debe alternar la visibilidad del menú móvil al hacer clic en el botón 'Menú'", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verificar que el menú esté inicialmente oculto en dispositivos móviles
    const menuItems = screen.queryByRole("link", {
      name: /inicio/i,
      hidden: true,
    });
    expect(menuItems).toBeNull();

    // Simular un clic en el botón 'Menú' para abrir el menú
    fireEvent.click(screen.getByText("Menú"));

    // Esperar a que los elementos del menú aparezcan en el DOM
    const visibleMenuItems = await screen.findByRole("link", {
      name: /inicio/i,
    });

    // Verificar que el menú se muestre
    expect(visibleMenuItems).toBeVisible();

    // Simular un clic en el botón 'Menú' nuevamente para cerrar el menú
    fireEvent.click(screen.getByText("Menú"));

    // Verificar que el menú esté oculto nuevamente
    const menuItemsAfterClose = screen.queryByRole("link", {
      name: /inicio/i,
      hidden: true,
    });
    expect(menuItemsAfterClose).toBeNull();
  });

  it("debe aplicar los estilos correctos a los enlaces en el menú móvil", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Verificar que el menú esté inicialmente oculto
    const menuItems = screen.queryByRole("link", {
      name: /inicio/i,
      hidden: true,
    });
    expect(menuItems).toBeNull();

    // Abrir el menú
    fireEvent.click(screen.getByText("Menú"));

    // Esperar a que los elementos del menú aparezcan en el DOM
    const menuLink = await screen.findByRole("link", { name: /inicio/i });

    // Verificar que los elementos del menú tengan los estilos correctos (por ejemplo, relleno)
    expect(menuLink).toHaveClass("block p-2 md:p-0");
  });
});
