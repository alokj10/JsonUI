import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup";

export default (props) => {
    const { title, properties } = props;
    const formValidationSchema = generateValidationSchema(properties);

    return (
        <fieldset style={{border: '1px'}} className="form-group ml-4 mb-4">
            <legend className="col-form-label-lg">{title}</legend>

            <Formik
                {...props}
                validationSchema={formValidationSchema}>
                <FormikForm className="needs-validation">
                    {props.children}
                </FormikForm>
            </Formik>
        </fieldset>
    )
}

const generateValidationSchema = (properties) => {
    let funcStr = 'let sc = {';
    Object.keys(properties).map((propKey, index) => {
        let property = properties[propKey];
        let propValidations = property.validations;
        if (propValidations && Object.keys(propValidations).length > 0) {
                let validationItem = propValidations;
                if (validationItem.type === 'string') {
                    funcStr += `${propKey}: Yup.string()`;
                    if (validationItem.min) {
                        funcStr += `.min(${validationItem.min.value}, '${validationItem.min.message}')`;
                    }
                    if (validationItem.max) {
                        funcStr += `.max(${validationItem.max.value}, '${validationItem.max.message}')`;
                    }
                    if (validationItem.email) {
                        funcStr += `.email('${validationItem.email.message}')`;
                    }
                    if (validationItem.required) {
                        funcStr += `.required('${validationItem.required.message}')`;
                    }
                    if (validationItem.custom) {
                        funcStr += `.test('${propKey}-test', '${validationItem.custom.message}', function(params){ ${validationItem.custom.validator} })`;
                    }
                    funcStr += ','
                }
        }
    });
    funcStr += '}; return sc;'
    console.log('funcstr', funcStr);
    const validationSchemaObject = new Function('Yup', funcStr)(Yup);
    return Yup.object().shape(validationSchemaObject);
}