import React, { Component } from 'react';
import { JForm } from '../components/lib';

class Demo extends Component {

    render = () => {
        let formSchema = {
            properties: {
                firstName: {
                    title: 'First Name',
                    type: 'text',
                    editor: 'textbox',
                    placeholder: 'Enter First Name',
                    validations: {
                        type: 'string',
                        required: {
                            message: 'First Name is required'
                        },
                        min: {
                            value: 3,
                            message: 'First Name must be of minimum 3 characters'
                        },
                        max: {
                            value: 7,
                            message: 'First Name must be of maximum 7 characters'
                        },
                        custom: {
                            validator: `
                                    console.log('params', this);
                                    let lastName = this.parent.lastName;
                                    let firstName = this.parent.firstName;
                                    console.log('firstname', firstName);
                                    console.log('lastname', lastName);
                                    return lastName !== firstName;
                                `,
                            message: 'First and Last names cannot be same'
                        }
                    }
                },
                lastName: {
                    title: 'Last Name',
                    type: 'text',
                    editor: 'textbox',
                    placeholder: 'Enter Last Name'
                },
                email: {
                    title: 'Email',
                    type: 'email',
                    editor: 'textbox',
                    placeholder: 'Enter Email id',
                    validations: {
                        type: 'string',
                        required: {
                            message: 'Email is required'
                        },
                        email: {
                            message: 'Invalid email id'
                        },
                        custom: {
                            validator: `
                                    let firstName = this.parent.firstName;
                                    console.log('firstname', firstName);
                                    if(this.parent.email){
                                        return this.parent.email.indexOf(firstName) === -1;
                                    }
                                    return true;
                                `,
                            message: 'Email cannot contain first name'
                        }
                    }
                },
                gender: {
                    title: 'Gender',
                    type: 'text',
                    editor: 'dropdown',
                    editorOptions: {
                        source: `return ['Select', 'Male', 'Female'];`
                    }
                }
            },
            initialValues: {
                firstName: 'Alok',
                lastName: 'Kumar Jha',
                email: 'reachme.alok@gmail.com',
                gender: 'Male'
            },
            submitHandler: async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }
        };

        return (
            <div>
                <JForm
                    {...formSchema}
                />
            </div>
        )
    }
}
export default Demo;