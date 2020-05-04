import React, { useState } from 'react';
import clsx from 'clsx';

import { withRouter } from 'react-router-dom'

import Swal from "sweetalert2";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import ModalOrden from './ModalOrden'
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { getCurrentDate } from '../../utils'
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Autocomplete from '../Autocomplete'

import Grid from '@material-ui/core/Grid';
import uuid from 'uuid/v4'


import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,

} from '@material-ui/pickers';

import _ from 'lodash'

import { API_POST_GUARDAR_ORDEN, API_CATALOGO_FALLAS } from "../../Constantes";

const useStyles = makeStyles(theme => ({

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },



  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // width: '50%'
  },
  textFieldFalla: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },

  textField: {
    marginLeft: theme.spacing(1),

    marginRight: theme.spacing(1),
    width: 250,
  },
  textFieldSalto: {


    marginRight: theme.spacing(-5),
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
    width: 525,
  },
  textFieldInforme: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 790,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginLeft: '5%',
    clear: 'both'
  }
}));



function EditarOrden({setRecargarCombos, catalogFallas, history, back, esTecnico, guardarRecargarProductos, tiposEquipos, marcas, ReportClientes, Ciudades, setRecargarClientes, operarios, estadosOrden, garantias, orden }) {


  const [nuevasFallas, setNuevasFallas] = React.useState([])

  const guardarCatalogoFallas = () => {

  }

  var datos = ReportClientes;

  const classes = useStyles();

  const [mensajeEstadoOrden, setmensajeEstadoOrden] = useState("Por favor, seleccione un estado")



  const [modalReporteGarantia, setmodalReporteGarantia] = useState(false);
  const [fechaReparacion, setfechaReparacion] = useState(moment(new Date(getCurrentDate('-'))).format("YYYY-MM-DD"))





  const cerrarModalReporteGarantia = () => {
    setmodalReporteGarantia(false)
  }
  const AceptarFechaReporteGarantia = () => {
    setmodalReporteGarantia(false)
    setmensajeEstadoOrden("Reparada el: " + moment(fechaReparacion).format("YYYY-MM-DD"))
  }

  const abrirModalReporteGarantia = () => {
    setmodalReporteGarantia(true)
  }
  const handleDateChange = (date) => {

    setfechaReparacion(moment(date).format("YYYY-MM-DD"))

    setmensajeEstadoOrden("Reparada el: " + fechaReparacion)

  }

  const [values, setValues] = React.useState({
    currency: orden.IDTipoEquipo,
  });


  const [objMarcas, setMarcas] = React.useState({
    marcas: orden.IDMarca,
  });

  const [objEstadosOrden, setEstadosOrden] = React.useState({
    estadosOrden: orden.IDEstadoOrden,
  });


  const [objOperarios, setOperarios] = React.useState({
    operarios: orden.IDUsuario,
  });

  const [objGarantias, setGarantias] = React.useState({
    garantias: orden.IDGarantia,
  });

  const cambioGarantias = name => event => {
    setGarantias({ ...values, [name]: event.target.value });
  };


  const cambioMarcas = name => event => {
    setMarcas({ ...values, [name]: event.target.value });
  };

  const cambioEstadosOrden = name => event => {

    if (event.nativeEvent.explicitOriginalTarget.textContent === "LISTO") {
      setmodalReporteGarantia(true)
    } else {
      setmensajeEstadoOrden("Por favor, seleccione un estado")
    }
    setEstadosOrden({ ...values, [name]: event.target.value });
  };

  const cambioOperarios = name => event => {
    setOperarios({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  const [codigo, setCodigo] = useState('')
  const [primerNombre, setPrimerNombre] = useState(orden.cliente)

  const [banderaModalNuevaOrden, setBanderaModalNuevaOrden] = useState(false)


  // Caluclo valores.

  const [__saldo, __setSaldo] = useState(orden.total.replace("$ ", "") - orden.abonos.replace("$ ", ""))





  const currencies = marcas
  const _tiposEquipos = tiposEquipos
  const _operarios = operarios
  const ordenesStatus = estadosOrden
  const _garantias = garantias



  const [valores, setValores] = useState({ modelo: orden.modelo, serie: orden.serie, accesorios: orden.accesorios, fallas: orden.falla, total: orden.total.replace("$ ", ""), abono: orden.abonos.replace("$ ", ""), saldo: orden.saldo.replace("$ ", ""), currency: '', informe: orden.informeTecnico })
  const fn_onChange = e => {
    const { name, value } = e.target



    var regex = new RegExp("^[0-9  .]+$")
    if (e.target.name === "total" || e.target.name === "abono") {
      for (let i = 0; i <= value.length - 1; i++) {
        let letra = value[i]
        if (!regex.test(letra) || !letra === " ") {
          return;
        }
      }
    }





    setValores({ ...valores, [name]: value })

    if (e.target.name === "total") {
      const { abono } = valores
      if (abono === "") {
        __setSaldo("$ " + e.target.value)
      } else {
        __setSaldo("$ " + (e.target.value - abono))
      }
    }
    if (e.target.name === "abono") {
      const { total } = valores
      if (total === "") {
        __setSaldo("$ " + e.target.value)
      } else {
        __setSaldo("$ " + (total - e.target.value))
      }
    }

  }

  const fn_Cancelar = () => {
    history.push(back)
  }

  const guardarOrden = () => {

    const fallasSeleccionEnter = _.filter(JSON.parse(nuevasFallas), function (fallas) { return fallas.value === undefined })
    const fallasSeleccionadasDelListado = _.filter(JSON.parse(nuevasFallas), function (fallas) { return fallas.value !== "INSERTAR_FALLA" && fallas.value !== undefined })
    const fallasNuevasInsertadas = _.filter(JSON.parse(nuevasFallas), function (fallas) { return fallas.value === "INSERTAR_FALLA" })
    const fallasNuevasConID = []
    const dataInsert = []

    _.forEach(fallasSeleccionEnter, function (value, key) {
      var id = uuid();

      var unaFalla = {
        value: id,
        label: value
      }
      fallasNuevasConID.push(unaFalla)

      unaFalla = {
        IDCatalogoFallas: id,
        descripcion: value,
        IDStatus: localStorage.getItem("IDStatusActivo")
      }
      dataInsert.push(unaFalla)


    });

    _.forEach(fallasNuevasInsertadas, function (value, key) {

      var id = uuid();

      var unaFalla = {
        value: id,
        label: value.nombreFalla

      }
      fallasNuevasConID.push(unaFalla)

      unaFalla = {
        IDCatalogoFallas: id,
        descripcion: value.nombreFalla,
        IDStatus: localStorage.getItem("IDStatusActivo")
      }
      dataInsert.push(unaFalla)
    });

    var fallasListadoyNuevas = _.concat(fallasSeleccionadasDelListado, fallasNuevasConID);


    axios.post(API_CATALOGO_FALLAS, dataInsert).then(rest => {
      console.log("estado insercion fallas", rest.data)
    })


    const { modelo, serie, accesorios, fallas, total, abono, saldo, informe } = valores

    const orden = {

      modelo: modelo.toUpperCase()
      , serie: serie.toUpperCase()
      , accesorios: (accesorios === null) ? "" : accesorios.toUpperCase()
      , falla: JSON.stringify(fallasListadoyNuevas)  // (fallas === null) ? "" : fallas.toUpperCase()
      // , fecha: getCurrentDate('-')
      , total: total
      , informeTecnico: (informe === null) ? "" : informe.toUpperCase()
      , IDTipoEquipo: values.currency
      , IDMarca: objMarcas.marcas
      // , IDCliente: JSON.parse(localStorage.getItem('currentCliente')).IDCliente

      , IDGarantia: objGarantias.garantias
      , IDUsuario: objOperarios.operarios
      , IDEstadoOrden: objEstadosOrden.estadosOrden
      , orden_entero1: abono
      , orden_varchar1: fechaReparacion
    }


    axios.post(`${API_POST_GUARDAR_ORDEN}/${localStorage.getItem('current_IDOrden')}`, orden).then(responseA => {

      
      guardarRecargarProductos(true)
      setRecargarCombos(true)
      history.push(back)
      Swal.fire({
        title: 'Un momento',
        timer: 1500,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      })

    })



    console.log(modelo, serie, accesorios, fallas, total, abono, saldo)

  }



  function SetStatusModal() {
    setBanderaModalNuevaOrden(false)

    try {
      setCodigo(JSON.parse(localStorage.getItem('currentCliente')).codigo)
      setPrimerNombre(JSON.parse(localStorage.getItem('currentCliente')).codigo + " | " + JSON.parse(localStorage.getItem('currentCliente')).nombres)

    } catch (error) {

    }


  }

  function SetStatusModalClose() {
    setBanderaModalNuevaOrden(true)
  }

  return (
    <div >

      <h1 className="text-center">EDITAR ORDEN  </h1>
      <Paper className={classes.root}>

        <InputBase
          disabled={esTecnico}
          className={classes.input}
          defaultValue={orden.cliente}
          placeholder="Código del cliente"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={primerNombre}

        />

        <Divider className={classes.divider} />
        <IconButton disabled={esTecnico} color="primary" className={classes.iconButton} aria-label="directions" onClick={SetStatusModalClose} >
          <SearchIcon />
        </IconButton>
      </Paper>
      <form className={classes.container} noValidate autoComplete="off">

        <TextField
          id="standard-select-currency"
          select
          label="Tipo de Equipo"
          name="tipoEquipo"
          className={classes.textField}
          value={values.currency}
          disabled={esTecnico}
          onChange={handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione un tipo de equipo"
          margin="normal"
        >
          {_tiposEquipos.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency"
          select
          disabled={esTecnico}
          label="Marcas"
          className={classes.textField}
          value={objMarcas.marcas}
          onChange={cambioMarcas('marcas')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione una marca"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField

          id="standard-error"
          label="Modelo"
          name="modelo"

          value={valores.modelo}

          disabled={esTecnico}
          className={classes.textField}
          margin="normal"
          onChange={fn_onChange}
        />

        <TextField

          id="standard-disabled"
          label="Serie"
          name="serie"
          disabled={esTecnico}
          value={valores.serie}
          //   defaultValue={orden.serie}
          className={classes.textField}
          margin="normal"
          onChange={fn_onChange}
        />

        <TextField
          id="standard-password-input"
          label="Accesorios"
          multiline
          disabled={esTecnico}
          rowsMax="20"
          //   defaultValue={orden.accesorios}
          value={valores.accesorios}
          className={classes.textFieldAll}
          margin="normal"
          name="accesorios"
          onChange={fn_onChange}
        />
        {
          /* <TextField
          id="standard-password-inputa"
          label="Falla/as"
          name="fallas"
          disabled={esTecnico}
          multiline
          //  defaultValue={orden.falla}
          value={valores.fallas}
          rowsMax="20"
          className={classes.textFieldInforme}
          margin="normal"

          onChange={fn_onChange}
        /> */
        }

        <Autocomplete
          className={classes.textField}
          catalogFallas={catalogFallas}
          fallasDefault={JSON.parse(orden.falla.toLowerCase())}
          setNuevasFallas={setNuevasFallas}
        />


        <TextField
          id="standard-sdelect-currency"
          select
          disabled={true}
          label="Recibido por"
          // className={classes.textField}
          // style={{ display: "none" }}
          value={objOperarios.operarios}
          onChange={cambioOperarios('operarios')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione por quien fue recibido el equipo."
          margin="normal"
        >
          {_operarios.map(option => (
            <MenuItem key={option.IDUsuario} value={option.IDUsuario}>
              {`${option.nombre1} ${option.apellidoPaterno}`}
            </MenuItem>
          ))}
        </TextField>









        <TextField
          id="standard-password-inputsa"
          label="Informe Técnico"
          name="informe"
          //  defaultValue={orden.informeTecnico}
          multiline
          // fullWidth
          value={valores.informe}
          rowsMax="20"
          className={classes.textFieldInforme}
          margin="normal"
          onChange={fn_onChange}
        />




        <TextField
          id="standard-dense"
          label="Total $"
          name="total"
          disabled={esTecnico}
          //    defaultValue={orden.total}
          value={valores.total}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          onChange={fn_onChange}
        // onChange={e => {__setTotal(e.target.value)} }
        />


        <TextField
          id="standard-dense"
          label="Abono  $"
          name="abono"

          disabled={esTecnico}
          value={valores.abono}
          //   defaultValue={orden.abonos}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          onChange={fn_onChange}
        // onChange={e => {__setAbono(e.target.value)} }
        />
        <TextField
          id="standard-multiline-static"
          label="Saldo"
          name="saldo"
          // value={valores.saldo}
          value={__saldo}
          disabled
          defaultValue="$"
          //  onChange={fn_onChange}
          className={classes.textField}
          //     defaultValue={orden.saldo}
          onChange={e => { __setSaldo(e.target.value) }}
          margin="normal"
        />
        <TextField
          id="standard-select-currencyss"
          select
          // disabled={esTecnico}
          label="Estado de la orden."
          className={classes.textField}
          value={objEstadosOrden.estadosOrden}
          onChange={cambioEstadosOrden('estadosOrden')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText={mensajeEstadoOrden}
          margin="normal"
        >
          {ordenesStatus.map(option => (
            <MenuItem key={option.IDEstadoOrden} value={option.IDEstadoOrden} name={option.descripcion}>
              {option.descripcion}
            </MenuItem>
          ))}
        </TextField>



        <TextField
          id="standard-select-currenscy-native"
          select
          label="Aplica Garantia"
          className={classes.textFieldAll}

          disabled={esTecnico}
          value={objGarantias.garantias}
          onChange={cambioGarantias('garantias')}
          SelectProps={{

            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="¿Aplica Garantia?"
          margin="normal"
        >
          {_garantias.map(option => (
            <MenuItem key={option.IDEstadoOrden} value={option.IDGarantia}>
              {option.descripcion}
            </MenuItem>
          ))}
        </TextField>

      </form>

      <br /><br />
      <Button variant="contained" size="small" onClick={fn_Cancelar} className={classes.button}>
        <Cancel className={clsx(classes.leftIcon, classes.iconSmall)} />
        Cancelar
      </Button>
      <Button onClick={guardarOrden} variant="contained" size="small" className={classes.button}>
        <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Guardar
      </Button>



      {banderaModalNuevaOrden ? (

        <ModalOrden setOpenProps={banderaModalNuevaOrden}
          handleCloseModalCliente={SetStatusModal}
          ReportClientes={datos} Ciudades={Ciudades}
          setRecargarClientes={setRecargarClientes}

        />
      ) : (
          <div></div>
        )}









      <Dialog
        open={modalReporteGarantia}
        // TransitionComponent={Transition}
        keepMounted
        onClose={cerrarModalReporteGarantia}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Especifique la fecha de reparación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">



            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">

                <KeyboardDatePicker
                  margin="normal"
                  todayLabel="asdadasd"
                  cancelLabel="Cancelar"

                  minDateMessage="La fecha desde no puede ser mayor a la fecha hasta"
                  id="date-picker-dialog"
                  label="Fecha de reparación"
                  format="yyyy-MM-dd"
                  value={fechaReparacion}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />



              </Grid>
            </MuiPickersUtilsProvider>





          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={cerrarModalReporteGarantia} color="primary"> Cancelar </Button>
          <Button onClick={AceptarFechaReporteGarantia} color="primary">  Guardar </Button>
        </DialogActions>

      </Dialog>


    </div>
  );
}

export default withRouter(EditarOrden)