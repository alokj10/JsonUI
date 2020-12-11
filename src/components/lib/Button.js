import { useFormikContext } from 'formik';

export function SubmitButton(props) {
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();

    return (
        <div className="mb-4">
        <button className="btn btn-primary" type="submit" {...rest} disabled={isSubmitting}>{title}</button>
        </div>
    )
}