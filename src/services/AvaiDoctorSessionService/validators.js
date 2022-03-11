import * as Yup from 'yup';

export const validator_arrayOfAvaiDoctorSessions =
    Yup.array().required().of(
        Yup.object().shape({
            id: Yup.string().required("id required"),
            doctorID: Yup.string().required("doctorID required"),
            title: Yup.string().required("title required"),
            start: Yup.date().required("start date required"),
            end: Yup.date().required("end date required")
        }).test(
            'start-end-comparison',
            'start date must be earlier than end date',
            data => data.start < data.end
        )
    )
