import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, FieldArray, Field, FieldInputProps, FieldMetaProps } from "formik";
import * as Yup from "yup";

function Test() {
    const [state, setState] = useState<State>({
        data: [],
        loading: true,
        failed: false,
    });

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const response = await fetch("/data.json");
                const data = await response.json() as Data[];
                data.forEach((item) => {
                    // void null or undefined to prevent formik errors.
                    item.min = item.min || 0;
                    item.max = item.max || 0;
                });
                setState((prevState) => ({ ...prevState, data }));
            } catch (e) {
                console.error(e);
                setState((prevState) => ({ ...prevState, failed: true }));
            }

            setState((prevState) => ({ ...prevState, loading: false }));
        };
        retrieveData();
    }, []);
    
    if (state.loading) {
        return <div>Loading...</div>;
    }

    if (state.failed) {
        return <div>Failed to load data</div>;
    }

    if (!state.data.length) {
        return <div>No data</div>;
    }

    function onSubmit(values: { data: Data[] }) {
        console.log('submit: ', values);
    }

    console.log('state: ', state);

    return <Formik
        initialValues={{ data: state.data }}
        onSubmit={onSubmit}
        >
    {({ touched }) => (<Form>
        <FieldArray name="data">
            {() => (
                <div>
                    {state.data.map((item, index) => (
                        <div key={item.id}>
                            <Field name={`data.${index}.checked`} type="checkbox" as={Checkbox} />
                            <Field name={`data.${index}.title`} type="text" />
                            <Field name={`data.${index}.min`} type="number" />
                            <Field name={`data.${index}.max`} type="number" />
                        </div>
                    ))}
                </div>
            )}
        </FieldArray>
        <Button type="submit" disabled={!touched.data}>Save (t: {JSON.stringify(touched)})</Button>
    </Form>) }
    </Formik>;
}

function Item(props: Data) {
    return <div>
        <label>
            <input type="checkbox" />
            <span>{props.title}</span>
        </label>
    </div>
}

export interface State {
    data: Data[];
    loading: boolean;
    failed: boolean;
}

export interface Data {
    id: number;
    title: string;
    checked: boolean;
    min?: number;
    max?: number;
}

export default Test;