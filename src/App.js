// src/App.js
import React, { useState } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { saveFormData } from "./firebase";
import './index.css';
import TechnologyImages from './TechnologyImages'; // Ajusta la ruta según sea necesario


function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    antivirus: "",
    roboInformacion: "",
    areaProgramacion: "",
    proyectos: [],
    otroServicio: "",
    EntornosDesarrollo: "",
    importanciaProteccion: 0,
    promoverProgramacion: "",
    lenguajesProgramacion: [],
    otroLenguaje: "",
    nivelProgramador: "", // Añadido para la cuarta etapa
    FrecuenciaProgramacion: "",
    interesProteccion: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "proyectos" || name === "lenguajesProgramacion") {
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
      if (!formData.areaProgramacion) {
        setError("Por favor, responde todas las preguntas.");
        return;
      }
      if (formData.proyectos.length === 0 && !formData.otroServicio.trim()) {
        setError("Por favor, selecciona al menos un servicio de antivirus o especifica 'Otro'.");
        return;
      }
    }

    if (currentStep === 4) {
      if (!formData.EntornosDesarrollo || !formData.nivelProgramador.trim()) {
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
    if (!formData.promoverProgramacion.trim() || formData.interesProteccion === "") {
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
        areaProgramacion: "",
        proyectos: [],
        otroServicio: "",
        EntornosDesarrollo: "",
        importanciaProteccion: 0,
        promoverProgramacion: "",
        lenguajesProgramacion: [],
        otroLenguaje: "",
        nivelProgramador: "", // Resetear el campo
        FrecuenciaProgramacion: "",
        interesProteccion: 0,
      });

      setCurrentStep(1);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Hubo un error al enviar tu respuesta. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100 p-4  ">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Formulario para programación</h2>
<main className="rounded">
   <TechnologyImages/>
</main>
       
       
     
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
              <p className="text-gray-700 mb-2">¿Tienes noción de qué es la programación o alguna vez has intentado aprender a programar?</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="antivirus"
                  value="Sí, tengo conocimientos básicos."
                  onChange={handleChange}
                  checked={formData.antivirus === "Sí, tengo conocimientos básicos."}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Sí, tengo conocimientos básicos.</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="antivirus"
                  value="Sí, tengo conocimientos intermedios o avanzados."
                  onChange={handleChange}
                  checked={formData.antivirus === "Sí, tengo conocimientos intermedios o avanzados."}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Sí, tengo conocimientos intermedios o avanzados.</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="antivirus"
                  value="No, pero me gustaría aprender."
                  onChange={handleChange}
                  checked={formData.antivirus === "No, pero me gustaría aprender."}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No, pero me gustaría aprender.</span>
              </label>
            </div>

            {/* Pregunta 2 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Has utilizado alguna herramienta o recurso en línea para aprender a programar?</p>
              <textarea
                name="roboInformacion"
                value={formData.roboInformacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Describe las herramientas"
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
              <p className="text-gray-700 mb-2">¿Qué área de programación te interesa más?</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="areaProgramacion"
                  value="Desarrollo web"
                  onChange={handleChange}
                  checked={formData.areaProgramacion === "Desarrollo web"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Desarrollo web</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="areaProgramacion"
                  value="Desarrollo de software"
                  onChange={handleChange}
                  checked={formData.areaProgramacion === "Desarrollo de software"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Desarrollo de software</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="areaProgramacion"
                  value="Ciencia de datos e IA"
                  onChange={handleChange}
                  checked={formData.areaProgramacion === "Ciencia de datos e IA"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Ciencia de datos e IA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="areaProgramacion"
                  value="Seguridad informática"
                  onChange={handleChange}
                  checked={formData.areaProgramacion === "Seguridad informática"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Seguridad informática</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="areaProgramacion"
                  value="Automatización de procesos"
                  onChange={handleChange}
                  checked={formData.areaProgramacion === "Automatización de procesos"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Automatización de procesos</span>
              </label>
            </div>

            {/* Pregunta 4 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Qué tipo de proyectos has realizado con programación? (Puedes seleccionar varios)</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Sitios web estáticos (HTML/CSS)"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Sitios web estáticos (HTML/CSS)")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Sitios web estáticos (HTML/CSS)</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Aplicaciones web (JavaScript, frameworks)"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Aplicaciones web (JavaScript, frameworks)")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Aplicaciones web (JavaScript, frameworks)</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Programas de escritorio (C++, Java)"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Programas de escritorio (C++, Java)")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Programas de escritorio (C++, Java)</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Scripts de automatización (Python, bash, powershell)"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Scripts de automatización (Python, bash, powershell)")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Scripts de automatización (Python, bash, powershell)</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Proyectos de ciencia de datos (Python, R)"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Proyectos de ciencia de datos (Python, R)")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Proyectos de ciencia de datos (Python, R)</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Ninguno"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Ninguno")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Ninguno</span>
              </label>
              {/* Opción "Otros" */}
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="proyectos"
                  value="Otros"
                  onChange={handleChange}
                  checked={formData.proyectos.includes("Otros")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Otros</span>
              </label>
              {formData.proyectos.includes("Otros") && (
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
              <p className="text-gray-700 mb-2">¿Qué herramientas o entornos de desarrollo utilizas para programar? (Puedes seleccionar varios)</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="EntornosDesarrollo"
                  value="Visual Studio Code"
                  onChange={handleChange}
                  checked={formData.EntornosDesarrollo === "Visual Studio Code"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Visual Studio Code</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="EntornosDesarrollo"
                  value="PyCharm"
                  onChange={handleChange}
                  checked={formData.EntornosDesarrollo === "PyCharm"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">PyCharm</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="EntornosDesarrollo"
                  value="Eclipse"
                  onChange={handleChange}
                  checked={formData.EntornosDesarrollo === "Eclipse"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Eclipse</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="EntornosDesarrollo"
                  value="IntelliJ IDEA"
                  onChange={handleChange}
                  checked={formData.EntornosDesarrollo === "IntelliJ IDEA"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">IntelliJ IDEA</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="EntornosDesarrollo"
                  value="No utilizo herramientas específicas"
                  onChange={handleChange}
                  checked={formData.EntornosDesarrollo === "No utilizo herramientas específicas"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">No utilizo herramientas específicas</span>
              </label>
            </div>

            {/* Pregunta 6 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Consideras que la programacion es importante hoy en día?</p>
              <input
                type="range"
                name="importanciaProteccion"
                min="0"
                max="20"
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
              <p className="text-gray-700 mb-2">¿Crees que es importante promover el conocimiento de la  programación ¿Por qué?</p>
              <textarea
                name="promoverProgramacion"
                value={formData.promoverProgramacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Escribe tu respuesta"
                required
              ></textarea>
            </div>

            {/* Pregunta 10 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Con qué frecuencia practicas programación?</p>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="FrecuenciaProgramacion"
                  value="Nunca"
                  onChange={handleChange}
                  checked={formData.FrecuenciaProgramacion === "Nunca"}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2">Nunca</span>
              </label>


              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="FrecuenciaProgramacion"
                  value="Ocasionalmente (1-2 veces al mes)"
                  onChange={handleChange}
                  checked={formData.FrecuenciaProgramacion === "Ocasionalmente (1-2 veces al mes)"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Ocasionalmente (1-2 veces al mes)</span>
              </label>

              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="FrecuenciaProgramacion"
                  value="Semanalmente"
                  onChange={handleChange}
                  checked={formData.FrecuenciaProgramacion === "Semanalmente"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Semanalmente</span>
              </label>


              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="FrecuenciaProgramacion"
                  value="Diariamente"
                  onChange={handleChange}
                  checked={formData.FrecuenciaProgramacion === "Diariamente"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Diariamente</span>
              </label>


              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="FrecuenciaProgramacion"
                  value="Aveces"
                  onChange={handleChange}
                  checked={formData.FrecuenciaProgramacion === "Aveces"}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Aveces</span>
              </label>
            </div>






            {/* Pregunta 11 */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">¿Te gustaría recibir más información o recursos sobre programación?</p>
              <input
                type="range"
                name="interesProteccion"
                min="0"
                max="20"
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
