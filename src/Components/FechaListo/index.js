import React ,{useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import  moment from 'moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { getCurrentDate } from '../../utils'
import Button from '@material-ui/core/Button';

const FechaListo = ({setmodalFechaReparacion,modalFechaReparacion, setmensajeEstadoOrden, setfechaReparacion ,  fechaReparacion }) => {


    const cerrarModalReporteGarantia = () => {
        setmensajeEstadoOrden ("Reparada el: " +  getCurrentDate('-'))
        setmodalFechaReparacion(false)
      }
      const AceptarFechaReporteGarantia = () => {
        setmodalFechaReparacion(false)
        setmensajeEstadoOrden("Reparada el: " + moment(fechaReparacion).format("YYYY-MM-DD"))
      }
      const handleDateChange = (date) => {
        setfechaReparacion( date )
        setmensajeEstadoOrden("Reparada el: " + fechaReparacion)
    
      }

    return (

        <>
            <Dialog
                open={modalFechaReparacion}
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
        </>
    );
}

export default FechaListo;