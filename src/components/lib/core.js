export const getPropertyValue = (property, initialValues) => {
    let propName = property.name;
    if(propName) {
        if(initialValues && initialValues[propName]) {
            return new PropertyValue(initialValues[propName]);
        }

        console.log(`returning default value ${DefaultValues[property.type]}`);
        return new PropertyValue(DefaultValues[property.type])
    }
}

export class PropertyValue {
    value;
    constructor(value) {
        this.value = value;
    }
}

export const DefaultValues = {
    number: 0,
    text: "",
    email: ""
}