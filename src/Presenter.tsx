import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import HourSelect from "./HourSelect";
import { Formik, Form, FieldArray, Field, FieldInputProps, FieldMetaProps } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1.25rem"
    },
    paragraph: {
      marginBottom: "1.25rem",
    },
    checkbox: {
      paddingLeft: 0,
    },
    containerRow: {
      display: "flex",
      marginTop: "2.5rem",
      marginBottom: "1.5rem",
    },
    containerCheck: {
      flex: 1,
      display: "flex",
    },
    day: {
      lineHeight: 3.8,
    },
  })
);

export interface OpenDay {
    id: number;
    open: boolean;
    opening: string;
    closing: string;
}

function toNumber(militaryTime: string)
{
  return parseInt(militaryTime.replace(':', ''), 10);
}

function validate(opening: string | undefined, closing: string | undefined)
{
  if (!opening || !closing) {
    return false;
  }

  var openingValue = toNumber(opening);
  var closingValue = toNumber(closing);

  return openingValue < closingValue;
}

function validateOpening(opening: string | undefined, testContext: Yup.TestContext<Yup.AnyObject>) {
  return validate(opening, testContext.parent.closing);
}

function validateClosing(closing: string | undefined, testContext: Yup.TestContext<Yup.AnyObject>) {
  return validate(testContext.parent.opening, closing);
}

interface Properties {
  days: OpenDay[];
  isCheckDisable: boolean;
  handleCheck: (index: number) => void;
  handleClear: () => void;
  weekDays: string[];
  handleChangeOpen: (event: SelectChangeEvent<any>, index: number) => void;
  convertToAmPm: (militaryTime: string) => string;
  handleChangeClose: (event: SelectChangeEvent<any>, index: number) => void;
  actionEnable: boolean;
  handleSave: () => void;
}
const validationSchema = Yup.object().shape({
  days: Yup.array().of(
    Yup.object().shape({
      opening: Yup.string().test(
        "isValidatingOpening",
        "Error en opening",
        validateOpening
      ),
      closing: Yup.string().test(
        "isValidatingClosing",
        "Error en closing",
        validateClosing
      ),
    })
  ),
});
const ContainerHours = (props: Properties) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ days: props.days }}
      validationSchema={validationSchema}
      onSubmit={async (values: { days: OpenDay[] }) => {

        var isFormValid = await validationSchema.isValid(values);

        console.log('isFormValid ', isFormValid);
        // Handle form submission here
        // You can access validated form values through the "values" object
        console.log('values ', values);
        props.handleSave();
      }}
    >
      {({errors, touched}) => (
        <Form>
          <FieldArray
            name="days"
            render={() => (
              <Box marginY={3}>
                <div title={("location.hoursOfOperation.title")}>
                  <div>
                    <Typography className={classes.paragraph}>
                      {("hours Of Operation")}
                    </Typography>
                    {props.days.map((day, index) => {
                      return (
                        <Box key={day.id} className={classes.containerRow}>
                          <Box className={classes.containerCheck}>
                            <Checkbox
                              disabled={props.isCheckDisable}
                              onChange={() => props.handleCheck(index)}
                              checked={day.open}
                              disableRipple={true}
                              className={classes.checkbox}
                            />
                            <Typography className={classes.day}>
                              {props.weekDays[index]}
                            </Typography>
                          </Box>
                          <Field name={`days.${index}.opening`}>
                          {({field, meta}: { field: FieldInputProps<string>, meta: FieldMetaProps<string>}) => (
                            <HourSelect
                              disabled={!day.open}
                              weekDays={props.weekDays[index]}
                              labelOperation={("open")}
                              idSelect={index.toString()}
                              convertToAmPm={props.convertToAmPm}
                              field={field}
                              error={meta.touched && meta.error ? meta.error : ''}
                            />
                          )}
                          </Field>

                          <Field name={`days.${index}.closing`}>
                          {({field, meta}: { field: FieldInputProps<string>, meta: FieldMetaProps<string>}) => (
                            <HourSelect
                              disabled={!day.open}
                              weekDays={props.weekDays[index]}
                              labelOperation={("closing")}
                              idSelect={index.toString()}
                              convertToAmPm={props.convertToAmPm}
                              field={field}
                              error={meta.touched && meta.error ? meta.error : ''}
                            />
                          )}
                          </Field>
                          
                        </Box>
                      );
                    })}
                  </div>
                  <Divider />
                  <Box className={classes.buttons}>
                    <Button id="location-clear-button" disabled={!props.actionEnable} onClick={props.handleClear}>
                    {("clear")}
                    </Button>
                    <Button id="location-save-button" disabled={!props.actionEnable} type="submit">
                    {("save")}
                    </Button>
                    {/* <Button
                      id="location-clear-button"
                      isDisabled={!props.actionEnable}
                      label={t("location.clearChanges")}
                      onClick={props.handleClear}
                      variant="text"
                    />
                    <Button
                      size="large"
                      id="location-save-button"
                      isDisabled={!props.actionEnable}
                      label={t("location.saveChanges")}
                      //onClick={props.handleSave}
                      variant="contained"
                      type="submit"
                    /> */}
                  </Box>
                </div>
              </Box>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
export default ContainerHours;