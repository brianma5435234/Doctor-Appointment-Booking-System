import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './appointment'
import doctorListReducer from './doctorList'
import avaiDoctorSessionsReducer from './avaiDoctorSessions'

export default configureStore({
    reducer: {
        appointment: appointmentReducer,
        doctorList: doctorListReducer,
        avaiDoctorSessions: avaiDoctorSessionsReducer
    }
})