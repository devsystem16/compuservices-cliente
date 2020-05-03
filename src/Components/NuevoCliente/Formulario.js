import React, { useState } from 'react';
// import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
// import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import iziToast from "izitoast";
import axios from 'axios';
import uuid from 'uuid/v4'
import { API_GET_CLIENTE_CODIGO } from '../../Constantes'



//  ppara distrito y colegio.
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Autocomplete from '@material-ui/lab/Autocomplete';












const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  selectDistritoCiudad: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
  diseñoModalDistritos: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 200,
  },
  diseñoModalDistritosCombos: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 80,
  },
  textFieldCi: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  textFieldAll: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 530,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));






export default function TextFields({ handleClose, Ciudades, Distritos, Colegios, setRecargarColegios, setCurrentDistrito }) {

  const [nombreDistritoSeleccionado, setNombreDistritoSeleccionado] = useState('--SELECCIONE DISTRITO--')
  const [idDistritoSeleccionado, setIdDistritoSeleccionado] = useState('')

  const [nombreColegioSeleccionado, setNombreColegioSeleccionado] = useState('--SELECCIONE COLEGIO--')
  const [idColegioSeleccionado, setIdColegioSeleccionado] = useState('')







  const [open, setOpenDistrito] = React.useState(false);

  const handleClickOpenDistrito = () => {
    setOpenDistrito(true);
  };

  const handleCloseDistrito = () => {
    setOpenDistrito(false);
  };

  const handleCancelarDistrito = () => {
    setNombreColegioSeleccionado('--SELECCIONE COLEGIO--')
    setNombreDistritoSeleccionado('--SELECCIONE DISTRITO--')
    setIdColegioSeleccionado('')
    setIdDistritoSeleccionado('')
    setOpenDistrito(false);
  };




  const classes = useStyles();
  const [values, setValues] = React.useState({
    currency: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  const [cedula, setCedula] = useState('')
  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefonoCelular, setTelefonoCelular] = useState('')
  const [direccion, setDireccion] = useState('')
  const [correo, setCorreo] = useState('')


  const currencies = Ciudades


  const cancelar = async e => {
    limpiarCampos()
    handleClose(null, false)
  }

  function limpiarCampos() {
    setCedula('')
    setPrimerNombre('')
    setSegundoNombre('')
    setApellidoPaterno('')
    setApellidoMaterno('')
    setTelefonoCelular('')
    setDireccion('')
    setCorreo('')

    setNombreColegioSeleccionado('--SELECCIONE COLEGIO--')
    setNombreDistritoSeleccionado('--SELECCIONE DISTRITO--')
    setIdColegioSeleccionado('')
    setIdDistritoSeleccionado('')
  }

  const agregarProducto = async e => {
    e.preventDefault()



    if (values.currency === "") {
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione la ciudad',
        timeout: 2000,
        position: "topRight"
      });
      return
    }


    axios.get(API_GET_CLIENTE_CODIGO).then(resultado => {


      const datos = {
        'IDCliente': uuid()
        , 'codigo': resultado.data[0].codigo
        , 'cedula': cedula
        , 'nombre1': (primerNombre !== null) ? primerNombre.toUpperCase() : ""   //primerNombre.toUpperCase()
        , 'nombre2': (segundoNombre !== null) ? segundoNombre.toUpperCase() : ""  //   segundoNombre.toUpperCase()
        , 'apellidoPaterno': (apellidoPaterno !== null) ? apellidoPaterno.toUpperCase() : "" //apellidoPaterno.toUpperCase()
        , 'apellidoMaterno': (apellidoMaterno !== null) ? apellidoMaterno.toUpperCase() : "" //apellidoMaterno.toUpperCase()
        , 'celular': telefonoCelular
        , 'direccion': (direccion === null) ? "" : direccion.toUpperCase()
        , 'correo': (correo === null) ? "" : correo.toUpperCase()
        , 'IDStatus': localStorage.getItem("IDStatusActivo")
        , 'IDCiudad': values.currency
        , 'IDDistrito': idDistritoSeleccionado
        , 'IDInstitucionEducativa': idColegioSeleccionado
      }

      limpiarCampos()
      handleClose(datos, true)

    })




  }
  const cargarColegioPorDistrito = async (idDistrito) => {


    setCurrentDistrito(idDistrito);
    setRecargarColegios(true)
  }

  return (
    <form className={classes.container} autoComplete="off"
      onSubmit={agregarProducto}
    >
      <TextField
        id="standard-uncontrolled"
        required
        label="Cédula"
        value={cedula}
        defaultValue=""
        className={classes.textFieldCi}
        margin="normal"
        onChange={e => setCedula(e.target.value)}
      />

      <Button variant="outlined" color="primary" onClick={handleClickOpenDistrito}>Distrito  y Colegio</Button>

      <TextField
        id="standard-uncontrolled"
        required
        label="Primer Nombre"
        defaultValue=""
        value={primerNombre}
        className={classes.textField}
        margin="normal"
        onChange={e => setPrimerNombre(e.target.value)}
      />

      <TextField
        required
        id="standard-required"
        label="Segundo Nombre"
        value={segundoNombre}
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setSegundoNombre(e.target.value)}
      />

      <TextField
        id="standard-uncontrolled"
        required
        label="Apellido Paterno"
        value={apellidoPaterno}
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setApellidoPaterno(e.target.value)}
      />
      <TextField
        required
        id="standard-required"
        label="Apellido Materno"
        value={apellidoMaterno}
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setApellidoMaterno(e.target.value)}
      />

      <TextField
        required
        id="standard-required"
        value={telefonoCelular}
        label="Teléfono Celular"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setTelefonoCelular(e.target.value)}
      />



      {/* nuevi */}
      <TextField
        id="standard-sdelect-currency"
        select
        label=""
        className={classes.textField}
        required
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Por favor, seleccione una ciudad de residencia."
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {`${option.label}`}
          </MenuItem>
        ))}
      </TextField>








      <TextField
        id="standard-full-width"
        label="Direccion"
        value={direccion}
        placeholder="Dirección Domiciliaria"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setDireccion(e.target.value)}
      />




      <TextField
        id="standard-full-width"
        label="Correo Electronico"
        value={correo}
        placeholder="mi-correo@ejemplo.com"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setCorreo(e.target.value)}
      />



      <DialogActions className="pull-right">
        <Button onClick={cancelar} color="primary">
          Cancelar
              </Button>
        <Button type="submit" color="primary">
          Guardar
            </Button>
      </DialogActions>



      <div>

        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleCloseDistrito}>
          <DialogTitle>Seleccione el distrito y el colegio</DialogTitle>

          <DialogContent className={classes.diseñoModalDistritos}>
            <form className={classes.container}>
              <FormControl className={classes.diseñoModalDistritosCombos} >

                <Autocomplete
                  id="combo-box-demo"
                  options={Distritos}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value != null) {
                      cargarColegioPorDistrito(value.value)

                      setNombreDistritoSeleccionado(value.label)
                      setIdDistritoSeleccionado(value.value)

                    }
                  }}
                  renderInput={(params) =>
                    <TextField {...params}
                      className={classes.selectDistritoCiudad}
                      label={nombreDistritoSeleccionado}
                      variant="outlined"


                    />
                  }
                />


              </FormControl>
              <FormControl className={classes.formControl}>


                <Autocomplete
                  id="combo-box-demo"

                  options={Colegios}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value != null) {

                      setNombreColegioSeleccionado(value.label)
                      setIdColegioSeleccionado(value.value)


                    } else {
                      // cargarColegioPorDistrito('')
                    }
                  }}
                  renderInput={(params) =>
                    <TextField {...params}
                      className={classes.selectDistritoCiudad}
                      label={nombreColegioSeleccionado}
                      variant="outlined"

                    />
                  }
                />

              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDistrito} color="primary">
              Cerrar
          </Button>
            <Button onClick={handleCancelarDistrito} color="primary">
              Guardar sin datos
          </Button>
            <Button onClick={handleCloseDistrito} color="primary">
              Guardar
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}