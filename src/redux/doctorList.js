import { createSlice } from '@reduxjs/toolkit'
import { READY_STATUS } from './CONSTANTS';
import { getDoctors } from 'services/DoctorServices'

export const doctorListSlice = createSlice({
    name: 'doctorList',
    initialState: {
        readyStatus: READY_STATUS.INVALID,
        items: [],
        error: null,
    },
    reducers: {
        getRequesting: (state) => {
            state.readyStatus = READY_STATUS.REQUEST;
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

export default doctorListSlice.reducer;
export const { getRequesting, getSuccess, getFailure } = doctorListSlice.actions;

export const fetchdoctorList = () => async (dispatch) => {
    dispatch(getRequesting());
    const { error, data } = await getDoctors();//from servicexs
    if (error) {
        console.log('error', error)
        dispatch(getFailure(error.message));
    } else {
        dispatch(getSuccess(data));
    }
};