import * as Yup from 'yup';

export const validator_arrayOfDoctors =
    Yup.array().required().of(
        Yup.object().shape({
            id: Yup.string().required("id required"),
            name: Yup.string().required("name required"),
            qualification: Yup.string().required("qualification required"),
        })
    )