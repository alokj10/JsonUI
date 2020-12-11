import { Field, ErrorMessage } from 'formik';

export default (props) => {
    return getTextField(props);
}

const getTextField = (props) => {
    const { type, name, label, placeholder,
        errors, touched,propertyValue, ...rest } = props;
        let propVal = propertyValue ? propertyValue.value : ""; 
    return (
        <>
            <div className="form-group mb-4" >
                {label && <label>{label}</label>}
                <Field
                    className={'form-control col-md-4 ' +
                        (errors && errors[name] && touched[name] ? ' is-invalid' : '')}
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder || ""}
                    {...rest}
                />
                <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
            </div>
        </>
    )
}

const getNumericField = (props) => {
    const { type, name, label, placeholder,
        errors, touched, ...rest } = props;
    return (
        <>
            {label && <label for={name}>{label}</label>}
            <Field
                className={'form-control col-md-4 ' +
                    (errors && errors[name] && touched[name] ? ' is-invalid' : '')}
                type="number"
                name={name}
                id={name}
                placeholder={placeholder || 0}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

const getNumericDecimalField = (props) => {
    const { type, name, label, placeholder,
        errors, touched, ...rest } = props;
    return (
        <>
            {label && <label for={name}>{label}</label>}
            <Field
                className={'form-control col-md-4 ' +
                    (errors && errors[name] && touched[name] ? ' is-invalid' : '')}
                type="number"
                name={name}
                id={name}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}
