import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 450,
    },

});

function valuetext(value: number) {
    return `${value}°C`;
}

function RangeSlider(props:any) {
    const classes = useStyles();
    const {val1,val2} = props.values;
    const [value, setValue] = useState([val1, val2]);
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        props.handleValue(newValue);
    };
    useEffect(() => {
            setValue([val1,val2]);
        },[props.values]);
    const theme = createMuiTheme({
        overrides: {
            MuiSlider: {
                colorPrimary:{
                  color:'#FFC13D',
                },
                colorSecondary:{
                    color:'#ffffff'
                },
                thumb:{
                    width:20,
                    height:20,
                },
                thumbColorPrimary: {
                    color: '#ff8a3d',
                },
                track: {
                    height: 10,
                    borderRadius: 4,
                },
                rail: {
                    height: 10,
                    borderRadius: 4,
                },
            },
        },
    });
    return (
        <MuiThemeProvider theme={theme}>
        <div className={classes.root} >
            <Slider
                min={props.min}
                max={props.max}
                step={props.step}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
        </MuiThemeProvider>
    );
}
export default RangeSlider;