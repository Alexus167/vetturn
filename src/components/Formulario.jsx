import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  //State de citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });
  const [error, actualizarError] = useState(false);

  //se ejecuta cuando escribe el usuario
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value 
    })
  }

  //extraigo los valores
  const { mascota, propietario, fecha, hora, sintomas} = cita

  //cuando se envia el formulario
  const submitCita = e => {
    e.preventDefault();

    //validacion
    if(mascota.trim() === '' || mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
      actualizarError(true);
      return;
    }
    actualizarError(false);

    //asigno ID
    cita.id = uuidv4();
    console.log(cita);

    //crea turno
    crearCita(cita);


    //reinicia el formulario
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })



  }


    return (
      <Fragment>
          <h2>Crear Turno</h2>

          { error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null }

          <form
            onSubmit={submitCita}
          >
              <label>Nombre de la Mascota</label>
              <input
               type="text"
               name="mascota"
               className="u-full-width"
               placeholder="Nombre de la Mascota"
               onChange={actualizarState}
               value={mascota}
               />
               <label>Nombre del Dueño</label>
              <input
               type="text"
               name="propietario"
               className="u-full-width"
               placeholder="Nombre del Dueño"
               onChange={actualizarState}
               value={propietario}

               />
               <label>Fecha del turno</label>
              <input
               type="date"
               name="fecha"
               className="u-full-width"
               onChange={actualizarState}
               value={fecha}
              
               />
               <label>Hora del turno</label>
              <input
               type="time"
               name="hora"
               className="u-full-width"
               onChange={actualizarState}
               value={hora}

               />
               <label>Motivo</label>
              <textarea
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value={sintomas}

              ></textarea>

              <button
                type="submit"
                className="u-full-width button-primary"
                >Agregar Turno</button>
          </form>

      </Fragment>
      );
}
 

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;