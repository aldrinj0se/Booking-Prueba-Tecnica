import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

const BookForm = () => {
  const initialValues = {
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Requerido";
    if (!values.author) errors.author = "Requerido";
    if (!values.genre) errors.genre = "Requerido";
    if (!values.publicationDate) errors.publicationDate = "Requerido";
    return errors;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // "success" o "error"

  const onSubmit = (values, { resetForm }) => {
    try {
      // Simulamos la respuesta de la API (éxito)
      setModalMessage(
        "Libro añadido exitosamente:\n" + JSON.stringify(values, null, 2)
      );
      setModalType("success");
      setIsModalOpen(true);
      resetForm();
    } catch (error) {
      setModalMessage("Error al añadir el libro: " + error.message);
      setModalType("error");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-themeBackground p-4 md:p-6 lg:p-8 rounded shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-themePrimary mb-4">
        Añadir Nuevo Libro
      </h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1 text-themeSecondary">
                Título
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className="w-full p-2 border border-themeSecondary rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-accent"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-1 text-themeSecondary"
              >
                Autor
              </label>
              <Field
                id="author"
                name="author"
                type="text"
                className="w-full p-2 border border-themeSecondary rounded"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-accent"
              />
            </div>
            <div>
              <label htmlFor="genre" className="block mb-1 text-themeSecondary">
                Género
              </label>
              <Field
                id="genre"
                name="genre"
                type="text"
                className="w-full p-2 border border-themeSecondary rounded"
              />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-accent"
              />
            </div>
            <div>
              <label
                htmlFor="publicationDate"
                className="block mb-1 text-themeSecondary"
              >
                Fecha de Publicación
              </label>
              <Field
                id="publicationDate"
                name="publicationDate"
                type="date"
                className="w-full p-2 border border-themeSecondary rounded"
              />
              <ErrorMessage
                name="publicationDate"
                component="div"
                className="text-accent"
              />
            </div>
            <button
              type="submit"
              className="bg-themePrimary hover:bg-accent text-white p-2 rounded w-full transition-colors duration-300"
            >
              Enviar
            </button>
          </Form>
        )}
      </Formik>

      {/* Modal de Headless UI */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg md:max-w-xl space-y-4 border border-themeSecondary bg-white p-8 md:p-12 rounded shadow-lg">
            <DialogTitle className="font-bold text-themePrimary text-xl md:text-2xl">
              {modalType === "success" ? "Éxito" : "Error"}
            </DialogTitle>
            <Description className="text-themeText whitespace-pre-line">
              {modalMessage}
            </Description>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-themePrimary hover:bg-accent text-white p-2 rounded transition-colors duration-300"
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default BookForm;
