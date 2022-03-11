import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import {
  Container, Row, Col,
  ListGroup, Button
} from 'react-bootstrap'
import { CustomCalendar, CustomCalendarToolbar } from 'components/Form/CustomCalendar'
import moment from 'moment'
import { getTimeFromDateObj } from 'utils/helperFunc';
import './sessionSelection.css'
import _ from 'lodash';
import { updateAppointmentSessionID } from 'redux/appointment'
import { fetchAvaiDoctorSessions } from 'redux/avaiDoctorSessions'
import { MAKE_APPOINTMENT_STEP3 } from 'navigation/CONSTANTS'

export const SessionSelection = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const appointmentSessionID = useSelector(state => state.appointment.appointmentSessionID)
  const doctor = useSelector(state => state.appointment.doctor)
  const { items: avaiDoctorSessions, error } = useSelector(state => state.avaiDoctorSessions)
  const [currentCalendarDate, setCurrentCalendarDate] = useState(moment())
  const [selectedDate, setSelectedDate] = useState(moment())//the value is a moment obj

  useEffect(() => {
    dispatch(fetchAvaiDoctorSessions());
  }, [dispatch]);

  const onClick_PrevBtn = (e) => {
    history.goBack();
  }

  const onClick_NextBtn = (e) => {
    if (_.isEmpty(appointmentSessionID)) {
      alert('pls select one session!')
    } else {
      history.push(MAKE_APPOINTMENT_STEP3)
    }
  }

  //may add usememo later
  /**
   * 
   * @param {moment} newDate_moment 
   * 
   */
  const onClick_dateGrid = (newDate_moment) => {
    setSelectedDate(newDate_moment)
  }

  const renderSessionList = () => {
    const avaiDoctorSessions_afterFilter = (avaiDoctorSessions.length > 0) ? avaiDoctorSessions.filter(session => {
      return moment(session.start).isSame(selectedDate, 'date')
    }) : []
    return (avaiDoctorSessions_afterFilter.length > 0) ?
      avaiDoctorSessions_afterFilter.map((appointmentSession) => {
        const { start, end } = appointmentSession
        return <ListGroup.Item action onClick={() => {
          if (!_.isUndefined(appointmentSession.id)) {
            dispatch(updateAppointmentSessionID(appointmentSession.id))
          }
        }} className={appointmentSession.id === appointmentSessionID ? "selectedSession" : ""}>
          {`${getTimeFromDateObj(start)} - ${getTimeFromDateObj(end)}`}
        </ListGroup.Item>
      }) : <div>no appointment session available in this date, sorry!</div>
  }

  return (
    <>
      {_.isNull(doctor) && (<Redirect to={{ pathname: '/makeappointment/' }} />)}
      <Container>
        <Row xs={1}><Col className="text-center">
          <h2>
            Please select a session</h2>
        </Col></Row>
        <Row>
          <Col sm={8}>
            <CustomCalendarToolbar onClick_prevBtn={() => setCurrentCalendarDate(currentCalendarDate.clone().subtract(1, 'M'))}
              onClick_nextBtn={() => setCurrentCalendarDate(currentCalendarDate.clone().add(1, 'M'))}
              currentCalendarDate={currentCalendarDate}
              titlePrefix={doctor ? `Available Sessions for ${doctor.name} - ` : ''}
            />
          </Col>
          <Col sm={4}>

          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={8}>
            <CustomCalendar events={avaiDoctorSessions} height={500}
              currentCalendarDate={currentCalendarDate.toDate()}
              showToolbar={false} onClick_dateGrid={onClick_dateGrid}
              userSelectedDate={selectedDate}
            />
          </Col>
          <Col sm={4}>
            {error && <div>there are some problems when fetching the data of appointment sessions. sorry!</div>}
            {
              !error &&
              <>Your selected date is {selectedDate.format('MM/DD/YYYY')}
                <ListGroup className={"text-center"}>
                  {renderSessionList()}
                </ListGroup></>
            }
          </Col>
        </Row>
        <Row className=" mb-4">
          <Col sm={12} className="d-flex justify-content-center">
            <Button className="customBtn1" onClick={onClick_PrevBtn}>Previous</Button>
            &nbsp;&nbsp;&nbsp;
            <Button className="customBtn1" onClick={onClick_NextBtn}>Next</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}