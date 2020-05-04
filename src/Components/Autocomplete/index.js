/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const filter = createFilterOptions();

export default function AutocompleteSugerencias({ classe,className,catalogFallas, fallasDefault, setNuevasFallas }) {

    const ccccc = useStyles();
  
 
    // const [nuevasFallas , setNuevasFallas] = React.useState([])
 
    const catalogoErroresDefault = [
        catalogFallas[0],
        catalogFallas[4]
    ]


    const [value, setValue] = React.useState({
        label: '',
        value: '',
    });
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            label: '',
            value: '',
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        label: '',
        value: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            label: dialogValue.label,
            value: parseInt(dialogValue.value, 10),
        });

        handleClose();
    };



  if(fallasDefault === null) {
    return (
        <React.Fragment>
            <Autocomplete
                multiple
                id="free-solo-dialog-demo"
                options={catalogFallas}
                onChange={(event, newValue) => {
                    setNuevasFallas( JSON.stringify(newValue))
                    setValue(newValue);
                    
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
              
                    if (params.inputValue !== '') {
                  
                        filtered.push({
                            value: "INSERTAR_FALLA",
                            label: `Añadir "${params.inputValue}"`,
                            nombreFalla: params.inputValue
                            // label:  params.inputValue
                        });
                    }
                    return filtered;
                }}

                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.nombreFalla) {
                
                        return option.nombreFalla;
                    } 
                    return option.label;
                }}
                selectOnFocus
                clearOnBlur
                renderOption={(option) => option.label}
                style={{ width: 800 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} className={classe} label="Fallas"
                        multiline
                        margin="dense"
                        rowsMax="20"
                        disabled={false}
                    />
                )}
            />
        </React.Fragment>
    );
  }else {
    return (
        <React.Fragment>
            <Autocomplete
                defaultValue={fallasDefault}
                multiple
                id="free-solo-dialog-demo"
                options={catalogFallas}
                onChange={(event, newValue) => {

                    setNuevasFallas( JSON.stringify(newValue))
                    setValue(newValue);
                    
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
              
                    if (params.inputValue !== '') {
                  
                        filtered.push({
                            value: "INSERTAR_FALLA",
                            label: `Añadir "${params.inputValue}"`,
                            nombreFalla: params.inputValue
                            // label:  params.inputValue
                        });
                    }
                    return filtered;
                }}

                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.nombreFalla) {
                
                        return option.nombreFalla;
                    } 
                    return option.label;
                }}
                selectOnFocus
                clearOnBlur
                renderOption={(option) => option.label}
                style={{ width: 800 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} className={classe} label="Fallas"
                        multiline
                        margin="dense"
                        rowsMax="20"
                        disabled={false}
                    />
                )}
            />
        </React.Fragment>
    );
  }
    
}


 
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films =catalogFallas;
