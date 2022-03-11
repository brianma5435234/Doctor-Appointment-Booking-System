import { createSlice } from '@reduxjs/toolkit'
import { READY_STATUS } from './CONSTANTS';
import { getAvaiSessionsByDoctorID } from 'services/AvaiDoctorSessionService'
import _ from 'lodash';

export const avaiDoctorSessionsSlice = createSlice({
    name: 'avaiDoctorSessions',
    initialState: {
        readyStatus: READY_STATUS.INVALID,
        items: [],
        error: null,
    },
    reducers: {
        getRequesting: (state) => {
            state.readyStatus = READY_STATUS.REQUEST;
            state.error = null
        },
        getSuccess: (state, { payload }) => {
            state.readyStatus = READY_STATUS.SUCCESS;
            state.items = payload;
        },
        getFailure: (state, { payload }) => {
            state.readyStatus = READY_STATUS.FAILURE;
            state.error = payload;
        },
    }
})

export default avaiDoctorSessionsSlice.reducer;
export const { getRequesting, getSuccess, getFailure } = avaiDoctorSessionsSlice.actions;

export const fetchAvaiDoctorSessions = () => async (dispatch, getState) => {
    dispatch(getRequesting());
    const doctor = getState().appointment.doctor;
    if (!_.isNull(doctor)) {
        const { error, data } = await getAvaiSessionsByDoctorID(doctor.id + '');//from services
        if (error) {
            console.log(`error`, error)
            dispatch(getFailure(error.message));
        } else {
            dispatch(getSuccess(data));
        }
    } else {
        dispatch(getFailure('doctor is null!'));
    }
};