import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookForm from "../components/BookForm";

// Configuración inicial antes de cada prueba
beforeEach(() => {
  render(<BookForm />);
});

describe("BookForm Component", () => {
  test("renderiza el formulario correctamente", () => {
    // Verifica si los campos de entrada están presentes
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/género/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de publicación/i)).toBeInTheDocument();
    expect(screen.getByText(/enviar/i)).toBeInTheDocument();
  });

  test("muestra errores cuando los campos requeridos están vacíos", async () => {
    // Enviamos el formulario sin llenar nada
    fireEvent.click(screen.getByText(/enviar/i));

    // Verifica que los mensajes de error se muestran para todos los campos
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/requerido/i);
      expect(errorMessages).toHaveLength(4); // Verifica que hay 4 mensajes de error
    });
  });

  test("envía el formulario con datos válidos", async () => {
    // Rellena los campos del formulario
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "El Gran Libro" },
    });
    fireEvent.change(screen.getByLabelText(/autor/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/género/i), {
      target: { value: "Ficción" },
    });
    fireEvent.change(screen.getByLabelText(/fecha de publicación/i), {
      target: { value: "2025-03-19" },
    });

    // Enviar el formulario
    fireEvent.click(screen.getByText(/enviar/i));

    // Verifica que el mensaje de éxito se muestra en el modal
    await waitFor(() => {
      expect(screen.getByText(/éxito/i)).toBeInTheDocument();
      expect(
        screen.getByText(/libro añadido exitosamente/i)
      ).toBeInTheDocument();
    });
  });

  test('cierra el modal al hacer clic en "Cerrar"', async () => {
    // Completa los campos y envía el formulario
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "El Gran Libro" },
    });
    fireEvent.change(screen.getByLabelText(/autor/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/género/i), {
      target: { value: "Ficción" },
    });
    fireEvent.change(screen.getByLabelText(/fecha de publicación/i), {
      target: { value: "2025-03-19" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Verifica que el modal está abierto
    await waitFor(() => {
      expect(screen.getByText(/éxito/i)).toBeInTheDocument();
    });

    // Cierra el modal
    fireEvent.click(screen.getByText(/cerrar/i));

    // Verifica que el modal ya no está visible
    await waitFor(() => {
      expect(screen.queryByText(/éxito/i)).not.toBeInTheDocument();
    });
  });
});
