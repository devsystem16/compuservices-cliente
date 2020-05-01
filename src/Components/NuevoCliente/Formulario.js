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






export default function TextFields({ handleClose, Ciudades, Distritos }) {


  const [open, setOpenDistrito] = React.useState(false);
  const [age, setAgeDistrito] = React.useState('');
  const handleClickOpenDistrito = () => {
    setOpenDistrito(true);
  };

  const handleCloseDistrito = () => {
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
  const currencies1 = Distritos

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
      }

      limpiarCampos()
      handleClose(datos, true)

    })




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




      {/* <TextField
        id="standard-select-currency-native"
        select
        label=""
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Por favor, seleccione una ciudad de residencia."
        margin="normal"
      >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField> */}




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
        <Button onClick={handleClickOpenDistrito}>Open select dialog</Button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Seleccione el distrito y el colegio</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Distrito</InputLabel>
               
                <TextField
                  id="standard-sdelect-currency"
                  select
                  label=""
                   
                  className={classes.selectDistritoCiudad}
                  required
                  // value={values.currency}
                  onChange={handleChange('currency')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Por favor, seleccione un distrito"
                  margin="normal"
                >
                  {currencies1.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {`${option.label}`}
                    </MenuItem>
                  ))}
                </TextField>


              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Colegio</InputLabel>
                <br />
                <TextField
                  id="standard-sdelect-currency"
                  select
                  label=""
                  className={classes.selectDistritoCiudad}
                  required
                  // value={values.currency}
                  onChange={handleChange('currency')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Por favor, seleccione un colegio"
                  margin="normal"
                >
                  {currencies1.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {`${option.label}`}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDistrito} color="primary">
              Cancel
          </Button>
            <Button onClick={handleCloseDistrito} color="primary">
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}