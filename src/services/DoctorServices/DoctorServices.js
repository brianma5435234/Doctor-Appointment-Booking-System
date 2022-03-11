import axios from 'axios'
import { GET_DOCTORS } from 'services/CONSTANTS';
import { validator_arrayOfDoctors } from "./validators"

/**
 * get a list of doctors
 * @returns {object}
 */
export const getDoctors = async () => {
    console.log(`DoctorServices getDoctors called`)
    const result = { data: null, error: null };
    await axios
        .get(GET_DOCTORS())
        .then(async (res) => {
            const data = res.data;
            const validatedData = await validator_arrayOfDoctors.validate(data)
            result.data = validatedData
        })
        .catch((err) => {
            result.error = err
        });
    return result;
}