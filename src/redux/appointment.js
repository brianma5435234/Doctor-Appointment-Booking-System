import { createSlice } from '@reduxjs/toolkit'

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointmentSessionID: '',
        doctor: null,
    },
    reducers: {
        updateAppointmentSessionID: (state, { payload }) => {
            state.appointmentSessionID = payload + ""
        },
        updateDoctor: (state, { payload }) => {
            state.doctor = {...payload}
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateAppointmentSessionID, updateDoctor } = appointmentSlice.actions

export default appointmentSlice.reducer