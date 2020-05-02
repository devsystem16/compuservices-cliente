import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// import { withStyles } from '@material-ui/core/styles';
import {API_POST_GUARDAR_CLIENTE }  from '../../Constantes' 

import Formulario from './Formulario'
import iziToast from "izitoast";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ModalNuevoCliente({distritoColegio, setOpenProps, handleCloseModalCliente, Ciudades, setRecargarClientes, Distritos,Colegios,setRecargarColegios ,setCurrentDistrito}) {
    // const [open, setOpen] = React.useState(setOpenProps);


    function handleClose(datos, guardar) {


        try {

            if (guardar) {
                axios.post(API_POST_GUARDAR_CLIENTE,datos
                ).then(res => {

                    if (res.data.code === undefined){
                        setRecargarClientes(true)
                    }else {
                        iziToast.warning({
                            title: 'Cliente ya existente',
                            message:  res.data.message,
                            timeout: 2000,
                            position: "topRight"
                          });
                    }
                })
            }
            handleCloseModalCliente(false)

        } catch (error) {
            handleCloseModalCliente(false)
        }



    }


    return (

        <div>

            <Dialog
                open={setOpenProps}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className="title-cliente"> Nuevo Cliente </div>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">



                        <Formulario handleClose={handleClose} 
                        Ciudades={Ciudades} 
                        Distritos={Distritos} 
                        Colegios={Colegios}
                        setRecargarColegios={setRecargarColegios}
                        setCurrentDistrito={setCurrentDistrito}
                        />

                    </DialogContentText>
                </DialogContent>



            </Dialog>
        </div>
    );
}


export default (ModalNuevoCliente);