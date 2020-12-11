import { Field, ErrorMessage, isEmptyArray } from 'formik';

export default (props) => {
    return getDropdownField(props);
}

const filterDropdownValue = (options, propertyValue) => {
    if(options && options.length > 0) {
        let selectVal = options.filter((optionItem) => {
            return optionItem.value === propertyValue;
        });
        if(selectVal && selectVal.length > 0) {
            return selectVal[0];
        }
    }
    return { text: "Select..", value: "Select.." };
}

const getDropdownField = (props) => {
    const { type, name, label, placeholder, editorOptions,
        errors, touched, propertyValue, ...rest } = props;
    let options = getOptions(editorOptions);
    let propVal = filterDropdownValue(options, propertyValue);
    console.log(`options: ${options}, val: ${propVal.text}, label: ${label} `);

    return (
        <>
            <div className="form-group mb-4" >
                {label && <label>{label}</label>}
                <Field 
                    className={'form-control col-md-4 ' +
                        (errors && errors[name] && touched[name] ? ' is-invalid' : '')} 
                        as="select" name="gender">
                    {options && options.length > 0 && 
                    options.map((optionItem, optionIndex) => {
                        return(
                    <option value={optionItem.value}>{optionItem.text}</option>
                        )
                    })}
                </Field>
                {/* <div 
                    className={'dropdown ' +
                        (errors && errors[name] && touched[name] ? ' is-invalid' : '')}>
                    <button className="btn btn-default border-info dropdown-toggle" type="button" 
                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {propVal.text}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {options && options.map((optionItem) => {
                            console.log('optionitem', optionItem);
                            return(
                            <a className="dropdown-item" href="#">{optionItem.text}</a>
                            )
                        })}
                    </div>
                </div> */}
                {/* <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} /> */}
            </div>
        </>
    )
}

const getOptions = (editorOptions) => {
    if (editorOptions && editorOptions.source) {
        let { source } = editorOptions;
        console.log(`type of source: ${typeof source}`);
        if (typeof source === 'string') {
            let evalFunction = new Function(source);
            let evalResult = evalFunction();
            console.log(`evalres: ${evalResult.length}`);
            if (evalResult && evalResult.length > 0) {
                let options = [];
                evalResult.forEach(element => {
                    options.push({
                        text: typeof element === 'object' ? element.text : element,
                        value: typeof element === 'object' ? element.value : element
                    });
                });
                return options;
            }
            return [];
        }
        if (Array.isArray(source)) {
            return source;
        }
    }
    console.log('source must be either array or valid JavaScript code');
    return [];
}