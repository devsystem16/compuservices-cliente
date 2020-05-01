import React, { useState  } from 'react';
 
import { makeStyles } from '@material-ui/core/styles';
 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
 
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from "sweetalert2";  

import  {API_USUARIO} from '../../Constantes'
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
}));



 

  function EditarUsuario( {cliente , roles , history , setRecargarClientes, currentRol}) {

   
    const classes = useStyles();
 
    const currencies = roles

    const [values, setValues] = React.useState({
      currency: currentRol[0].IDRol 
    });

    const [codigo ,setCodigo]= useState(cliente[0].codigo)
    const [cedula ,setCedula]= useState(cliente[0].cedula)
    const [nombre1 ,setNombre1]= useState(cliente[0].nombre1)
    const [nombre2 ,setNombre2]= useState(cliente[0].nombre2)
    const [apellidoPaterno ,setApellidoPaterno]= useState(cliente[0].apellidoPaterno)
    const [apellidoMaterno ,setApellidoMaterno]= useState(cliente[0].apellidoMaterno)
    const [celular ,setCelular]= useState(cliente[0].celular)
    const [direccion ,setDireccion]= useState(cliente[0].direccion)
    const [correo ,setCorreo]= useState(cliente[0].correo)

    const [nick ,setUsuario]= useState(cliente[0].nick)
    const [pass ,setContraseña]= useState(cliente[0].pass)




    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
 


   function actualizarCliente (event) {
    event.preventDefault();

 
        var cliente  = {
          codigo,
          cedula,
          nombre1,
          nombre2,
          apellidoPaterno,
          apellidoMaterno,
          celular,
          direccion,
          correo,
          IDRol: values.currency,
          nick,
          pass

        }

        
        axios.post(`${API_USUARIO}/${localStorage.getItem('current_IDUsuario')}`  ,cliente ).then(res => {
        
          history.push('/usuarios')
          setRecargarClientes(true)
          Swal.fire({
            title: 'Un momento',
            timer: 1500,
            onBeforeOpen: () => {
              Swal.showLoading()
            },
          })
        })
       
     

        
    }

 
  return (

    <div className="row">
      <div className="col-md-8">
        
   
    <form
  className={classes.container} 
     noValidate autoComplete="off"
   onSubmit={actualizarCliente}
    >
      <TextField
        id="standard-uncontrolled"
        required
        label="Cédula"
        className={classes.textFieldCi}
        margin="normal"
        // value={cliente.cedula}
        defaultValue=  {cliente[0].cedula}
         onChange={e => setCedula(e.target.value)}
        
      />
      <TextField
        id="standard-uncontrolled"
        required
        label="Primer Nombre"
        defaultValue=  {cliente[0].nombre1.toUpperCase()}
         className={classes.textField}
        margin="normal"
        onChange={e => setNombre1(e.target.value.toUpperCase())}
      />

      <TextField
        required
        id="standard-required"
        label="Segundo Nombre"
        defaultValue=  {cliente[0].nombre2.toUpperCase()}
        className={classes.textField.toUpperCase()}
        margin="normal"
         onChange={e => setNombre2(e.target.value)}
      />

      <TextField
        id="standard-uncontrolled"
        required
        defaultValue=  {cliente[0].apellidoPaterno.toUpperCase()}
        label="Apellido Paterno"
    className={classes.textField}
        margin="normal"
         onChange={e => setApellidoPaterno(e.target.value.toUpperCase())}
      />
      <TextField
        required
        id="standard-required"
        defaultValue=  {cliente[0].apellidoMaterno.toUpperCase()}
        label="Apellido Materno"
         className={classes.textField}
        margin="normal"
        onChange={e => setApellidoMaterno(e.target.value.toUpperCase())}
      />

      <TextField
        required
        id="standard-required"
        defaultValue=  {cliente[0].celular}
        label="Celular"
        // className={classes.textField}
        margin="normal"
        onChange={e => setCelular(e.target.value)}
      />




<TextField
        id="standard-select-currency-native"
        select
        label=""
        className={classes.textField}
        defaultValue={currentRol[0].IDRol}
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
          <option key={option.IDRol} value={option.IDRol}>
            {option.descripcion}
          </option>
        ))}
      </TextField>


  

      <TextField
        id="standard-full-width"
        label="Direccion"
        defaultValue=   { (cliente[0].direccion !== null) ? cliente[0].direccion.toUpperCase(): ""}  
        placeholder="Dirección Domiciliaria"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
         onChange={e => setDireccion(e.target.value.toUpperCase())}
      />




<TextField
        id="standard-full-width"
        label="Correo Electronico"
        defaultValue= { (cliente[0].correo !== null) ? cliente[0].correo.toUpperCase(): ""}
        placeholder="mi-correo@ejemplo.com"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setCorreo(e.target.value.toUpperCase())}
      />
 
 <TextField
        id="standard-full-width"
        label="Usuario"
        defaultValue=  {cliente[0].nick}
        placeholder="Nick"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setUsuario(e.target.value)}
      />
 
 
 <TextField
        id="standard-full-width"
        label="Contraseña"
        defaultValue=  {cliente[0].pass}
        placeholder=""
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setContraseña(e.target.value)}
      />
 



      <DialogActions className="pull-right">

      <Link to="/usuarios">
            <Button   color="primary">
              Cancelar
              </Button>
              </Link>

            <Button type="submit"   color="primary">
              Guardar
            </Button>
      </DialogActions>

    </form>
  
    </div>
    </div>
  );
}

export default withRouter(EditarUsuario )