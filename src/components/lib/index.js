import React from 'react';
import TextField from './TextField';
import DropdownField from './Dropdown';
import Form from './Form';
import * as style from '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bootstrapJs from 'bootstrap';
import jquery from 'jquery';
import popper from 'popper.js';
import * as Yup from "yup";
import { SubmitButton } from './Button';
import { getPropertyValue } from './core';

export const JForm = (props) => {
    const { initialValues, submitHandler,
        properties } = props;

    return (
        <div>
            <Form
                title="Sign Up"
                initialValues={initialValues ?? {}}
                onSubmit={submitHandler}
                properties={properties}
            >
                {Object.keys(properties).map((propKey, index) => {

                    let property = properties[propKey];
                    property.name = property.name || propKey;
                    property.type = property.type || 'text';
                    let propertyValue = getPropertyValue(property, initialValues);

                    switch (property.editor) {
                        case 'textbox':
                            return (
                                <TextField key={index} index={index}
                                    type={property.type ?? 'text'}
                                    label={property.title}
                                    name={propKey}
                                    placeholder={property.placeholder}
                                    propertyValue={propertyValue}
                                />
                            )
                        case 'dropdown':
                            return (
                                <DropdownField key={index}
                                    label={property.title}
                                    name={propKey}
                                    editorOptions={property.editorOptions}
                                    propertyValue={propertyValue}
                                />
                            )
                        default:
                            return (
                                <TextField label={property.title} name={property.name} placeholder={property.placeholder} />
                            )
                    }
                })}
                <SubmitButton title="Submit" />
            </Form>
        </div>
    )
};
