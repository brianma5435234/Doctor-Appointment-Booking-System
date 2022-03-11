import moment from "moment"

/**
 * return a formatted time string
 * @param {Date} dateObj 
 * @returns {string} 
 */
export const getTimeFromDateObj = (dateObj) => {
    return moment(dateObj).format('ha')
}