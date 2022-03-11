import axios from 'axios'
import { validator_arrayOfAvaiDoctorSessions } from "./validators"
import { GET_AVAI_DOCTOR_SESSIONS } from 'services/CONSTANTS'

/**
 * get available doctor session by a doctor id
 * @param {string} doctorID 
 * @returns {object}
 */
export const getAvaiSessionsByDoctorID = async (doctorID) => {
    console.log(`AvaiDoctorSessionService getAvaiSessionsByDoctorID called`)
    const result = { data: null, error: null };
    await axios
        .get(GET_AVAI_DOCTOR_SESSIONS(),
            { params: { doctorID } }
        )
        .then(async (res) => {
            const data = res.data;
            const validatedData = await validator_arrayOfAvaiDoctorSessions.validate(data)
            result.data = validatedData
        })
        .catch((err) => {
            result.error = err
        });
    return result;
}