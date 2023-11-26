import React from 'react';
import { Box, FormHelperText, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createStyles, makeStyles } from "@mui/styles";
import { optionsHours } from "./features/Settings/Location/LocationDetails/Hours/helper";
import { FieldInputProps } from 'formik';

// const optionsHours: string[] = [

// ];

// for (let index = 0; index <= 24; index++) {
//     const prefix = index < 10 ? '0' : '';
//    optionsHours.push(`${prefix}${index}:00`);
// }

const useStyles = makeStyles(() =>
  createStyles({
    containerHour: {
      textAlign: "right",
      display: "flex",
    },
    formControlHour: {
      width: "100%",
      alignItems: "end",
    },
    contentSelect: {
      width: "16.25rem",
      marginLeft: "0.625rem",
      textAlign: "left",
    },
  })
);
interface Properties {
  disabled: boolean;
  weekDays: string;
  labelOperation: string;
  idSelect: string;
  convertToAmPm: (militaryTime: string) => string;
  error: string
  field: FieldInputProps<string>
}
const HourSelect = (props: Properties) => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.containerHour}>
        <FormControl className={classes.formControlHour} error={!!props.error}>
          <InputLabel id="hour-control">
            {props.weekDays} {props.labelOperation}{" "}
          </InputLabel>
          <Select
            className={classes.contentSelect}
            label={`${props.weekDays}${props.labelOperation}`}
            placeholder={`${props.weekDays} ${props.labelOperation}`}
            id={props.idSelect}
            {...props.field}
          >
            {optionsHours.map((hours) => (
              <MenuItem key={hours} value={hours}>
                {props.convertToAmPm(hours)}
              </MenuItem>
            ))}
          </Select>
          {props.error ? <FormHelperText>{props.error}</FormHelperText> : null }
        </FormControl>
      </Box>
    </div>
  );
};
export default HourSelect;