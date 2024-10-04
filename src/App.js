// src/App.js
import React, { useState } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { saveFormData } from "./firebase";
import './index.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    antivirus: "",
    roboInformacion: "",
    softwareProteccion: "",
    serviciosAntivirus: [],
    otroServicio: "",
    conocimientoAntivirus: "",
    importanciaProteccion: 0,
    promoverCiberseguridad: "",
    lenguajesProgramacion: [],
    otroLenguaje: "",
    nivelProgramador: "", // Añadido para la cuarta etapa
    interesProgramacion: "",
    interesProteccion: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "serviciosAntivirus" || name === "lenguajesProgramacion") {
        let updatedList = [...formData[name]];
        if (checked) {
          updatedList.push(value);
        } else {
          updatedList = updatedList.filter(item => item !== value);
        }
        setFormData((prevState) => ({
          ...prevState,
          [name]: updatedList,
        }));
      } else {
        // Otros checkboxes si los hay
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setError("");
  };

  const handleNext = () => {
    // Validación básica por etapa
    if (currentStep === 1) {
      if (!formData.nombre.trim() || !formData.email.trim()) {
        setError("Por favor, completa todos los campos.");
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.antivirus || !formData.roboInformacion.trim()) {
        setError("Por favor, responde todas las preguntas.");
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.softwareProteccion) {
        setError("Por favor, responde todas las preguntas.");
        return;
      }
      if (formData.serviciosAntivirus.length === 0 && !formData.otroServicio.trim()) {
        setError("Por favor, selecciona al menos un servicio de antivirus o especifica 'Otro'.");
        return;
      }
    }

    if (currentStep === 4) {
      if (!formData.conocimientoAntivirus || !formData.nivelProgramador.trim()) {
        setError("Por favor, responde todas las preguntas.");
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación final
    if (!formData.promoverCiberseguridad.trim() || formData.interesProteccion === "") {
      setError("Por favor, completa todas las preguntas.");
      return;
    }

    try {
      await saveFormData(formData);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: 'Tu mensaje ha sido enviado con éxito.',
        confirmButtonText: 'Ok'
      });

      // Limpiar el formulario
      setFormData({
        nombre: "",
        email: "",
        antivirus: "",
        roboInformacion: "",
        softwareProteccion: "",
        serviciosAntivirus: [],
        otroServicio: "",
        conocimientoAntivirus: "",
        importanciaProteccion: 0,
        promoverCiberseguridad: "",
        lenguajesProgramacion: [],
        otroLenguaje: "",
        nivelProgramador: "", // Resetear el campo
        interesProgramacion: "",
        interesProteccion: 0,
      });

      setCurrentStep(1);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Hubo un error al enviar tu respuesta. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Formulario de Ciberseguridad</h2>

        {/* Mostrar mensaje de error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Paso 1: Información Básica */}
        {currentStep === 1 && (
          <>
            {/* Contenedor Nombre */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            {/* Contenedor Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Ingresa tu email"
                required
              />
            </div>
          </>
        )}

        {/* Paso 2: Preguntas sobre Antivirus */}
        {currentStep === 2 && (
          <>
            {/* Pregunta 1 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Sabes qué es un antivirus? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="antivirus"
                  value="Sí"
                  onChange={handleChange}
                  checked={formData.antivirus === "Sí"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Sí</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="antivirus"
                  value="No"
                  onChange={handleChange}
                  checked={formData.antivirus === "No"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="antivirus"
                  value="Tal vez"
                  onChange={handleChange}
                  checked={formData.antivirus === "Tal vez"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Tal vez</span>
              </label>
            </div>

            {/* Pregunta 2 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Has sufrido algún robo o ataque de información y datos privados en tu ordenador? *</p>
              <textarea
                name="roboInformacion"
                value={formData.roboInformacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Describe tu experiencia"
                required
              ></textarea>
            </div>
          </>
        )}

        {/* Paso 3: Servicios de Antivirus */}
        {currentStep === 3 && (
          <>
            {/* Pregunta 3 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Cuentas con un software que proteja tu equipo o dispositivo (antivirus o semejante)? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="softwareProteccion"
                  value="Sí"
                  onChange={handleChange}
                  checked={formData.softwareProteccion === "Sí"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Sí</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="softwareProteccion"
                  value="No"
                  onChange={handleChange}
                  checked={formData.softwareProteccion === "No"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="softwareProteccion"
                  value="No recuerdo"
                  onChange={handleChange}
                  checked={formData.softwareProteccion === "No recuerdo"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No recuerdo</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="softwareProteccion"
                  value="No lo considero necesario"
                  onChange={handleChange}
                  checked={formData.softwareProteccion === "No lo considero necesario"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No lo considero necesario</span>
              </label>
            </div>

            {/* Pregunta 4 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Qué servicios de antivirus conoces o tienes en tu ordenador? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="McAfee Total Protection"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("McAfee Total Protection")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">McAfee Total Protection</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Norton 360"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Norton 360")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Norton 360</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Avira Prime"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Avira Prime")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Avira Prime</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Bitdefender Total Security"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Bitdefender Total Security")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Bitdefender Total Security</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Kaspersky Internet Security"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Kaspersky Internet Security")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Kaspersky Internet Security</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Ninguno"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Ninguno")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Ninguno</span>
              </label>
              {/* Opción "Otros" */}
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="serviciosAntivirus"
                  value="Otros"
                  onChange={handleChange}
                  checked={formData.serviciosAntivirus.includes("Otros")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Otros</span>
              </label>
              {formData.serviciosAntivirus.includes("Otros") && (
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otroServicio">
                    Especifica otro servicio de antivirus:
                  </label>
                  <input
                    type="text"
                    id="otroServicio"
                    name="otroServicio"
                    value={formData.otroServicio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Especifica otro servicio de antivirus"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Paso 4: Conocimiento y Programación */}
        {currentStep === 4 && (
          <>
            {/* Pregunta 5 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Conoces la importancia y el uso de un antivirus, o de las herramientas de prevención y detección? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="conocimientoAntivirus"
                  value="Sí tengo conocimiento"
                  onChange={handleChange}
                  checked={formData.conocimientoAntivirus === "Sí tengo conocimiento"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Sí tengo conocimiento</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="conocimientoAntivirus"
                  value="Mi conocimiento es mínimo"
                  onChange={handleChange}
                  checked={formData.conocimientoAntivirus === "Mi conocimiento es mínimo"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Mi conocimiento es mínimo</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="conocimientoAntivirus"
                  value="No tengo conocimiento del tema"
                  onChange={handleChange}
                  checked={formData.conocimientoAntivirus === "No tengo conocimiento del tema"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No tengo conocimiento del tema</span>
              </label>
            </div>

            {/* Pregunta 6 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Consideras a los servicios de protección y detección de datos u archivos, cómo herramientas de gran importancia? *</p>
              <input
                type="range"
                name="importanciaProteccion"
                min="0"
                max="5"
                value={formData.importanciaProteccion}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>No lo considero importante</span>
                <span>Lo considero muy importante</span>
              </div>
              <span className="block text-center mt-1">Valor: {formData.importanciaProteccion}</span>
            </div>

            {/* Pregunta 7 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Conoces o usas alguno de estos lenguajes de programación? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="Python"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("Python")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Python</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="C++"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("C++")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">C++</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="JavaScript"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("JavaScript")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">JavaScript</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="HTML"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("HTML")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">HTML</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="PHP"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("PHP")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">PHP</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="lenguajesProgramacion"
                  value="Otros"
                  onChange={handleChange}
                  checked={formData.lenguajesProgramacion.includes("Otros")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Otros</span>
              </label>
              {formData.lenguajesProgramacion.includes("Otros") && (
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otroLenguaje">
                    Especifica otros lenguajes:
                  </label>
                  <input
                    type="text"
                    id="otroLenguaje"
                    name="otroLenguaje"
                    value={formData.otroLenguaje}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Especifica otros lenguajes"
                  />
                </div>
              )}
            </div>

            {/* Nueva Pregunta 8: Nivel de Programador */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Cuál es tu nivel como programador? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="nivelProgramador"
                  value="Principiante"
                  onChange={handleChange}
                  checked={formData.nivelProgramador === "Principiante"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Principiante</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="nivelProgramador"
                  value="Intermedio"
                  onChange={handleChange}
                  checked={formData.nivelProgramador === "Intermedio"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Intermedio</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="nivelProgramador"
                  value="Avanzado"
                  onChange={handleChange}
                  checked={formData.nivelProgramador === "Avanzado"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Avanzado</span>
              </label>
            </div>
          </>
        )}

        {/* Paso 5: Conclusión y Envío */}
        {currentStep === 5 && (
          <>
            {/* Pregunta 9 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Crees que es importante promover el conocimiento de la ciberseguridad? ¿Por qué? *</p>
              <textarea
                name="promoverCiberseguridad"
                value={formData.promoverCiberseguridad}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Escribe tu respuesta"
                required
              ></textarea>
            </div>

            {/* Pregunta 10 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Te gustaría estar pendiente a las últimas noticias referentes al mundo de la programación y la ciberseguridad? *</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="interesProgramacion"
                  value="Sí"
                  onChange={handleChange}
                  checked={formData.interesProgramacion === "Sí"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Sí</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="interesProgramacion"
                  value="No"
                  onChange={handleChange}
                  checked={formData.interesProgramacion === "No"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>

            {/* Pregunta 11 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Te interesa conocer más sobre cómo proteger y crear programas que mantengan seguro y protegido a tus equipos? *</p>
              <input
                type="range"
                name="interesProteccion"
                min="0"
                max="5"
                value={formData.interesProteccion}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>No</span>
                <span>Si</span>
              </div>
              <span className="block text-center mt-1">Valor: {formData.interesProteccion}</span>
            </div>
          </>
        )}

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Anterior
            </button>
          )}
          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-auto"
            >
              Siguiente
            </button>
          )}
          {currentStep === totalSteps && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ml-auto"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
