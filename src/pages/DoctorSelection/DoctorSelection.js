import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Container, Row, Col,
  Button, Pagination,
} from 'react-bootstrap'
import { updateDoctor } from 'redux/appointment'
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive'
import doctor1_img from 'assets/images/doctorImg/doctor-1.jpg'; // Tell webpack this JS file uses this image
import { MAKE_APPOINTMENT_STEP2 } from 'navigation/CONSTANTS'
import { DoctorCard } from './DoctorCard'
import { fetchdoctorList } from 'redux/doctorList'
import { READY_STATUS } from 'redux/CONSTANTS'
import { Spinner } from 'components/Spinner'

// the code in this page is a bit messy. may need to revamp the code later. 
// may use custom react hook to simplify this component
export const DoctorSelection = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const doctor = useSelector(state => state.appointment.doctor)
  const { items: doctorList, readyStatus } = useSelector(state => state.doctorList)
  const isSmallerDevice = useMediaQuery({ query: '(max-width: 767px)' })
  const [perPage, setPerPage] = useState(6)
  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(fetchdoctorList());
  }, [dispatch]);

  const onClick_nextBtn = (e) => {
    if (_.isNull(doctor)) {
      alert('pls select one doctor first!')
    } else {
      history.push(MAKE_APPOINTMENT_STEP2)
    }
  }

  const onClick_card = (doctor) => {
    dispatch(updateDoctor(doctor))
  }

  const nextPage = () => {
    if ((page + 1 <= maxPage)) {
      setPage(page + 1);
    }
  }

  const prevPage = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  }

  if (perPage === 6 && isSmallerDevice) {
    setPerPage(4)
    setPage(0)
  } else if (perPage === 4 && !isSmallerDevice) {
    setPerPage(6)
    setPage(0)
  }
  let doctorList_currentPage = doctorList.slice(page * perPage, (page + 1) * perPage);
  const maxPage = Math.floor(doctorList.length / perPage) - 1

  return (
    <>
      {readyStatus === READY_STATUS.REQUEST ? (<Spinner color={"black"}
        height={15} width={5} radius={2} margin={2}
      />) : (<Container>
        <Row xs={1}><Col className="text-center">
          <h2>
            Please select a doctor</h2>
        </Col></Row>
        <Row className=" mb-4">
          <Col>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {doctorList_currentPage.map((aDoctor, idx) => {
                return (
                  <Col>
                    <DoctorCard isSelected={doctor && _.isEqual(doctor.id + '', aDoctor.id + '')}
                      aDoctor={aDoctor} imgSrc={doctor1_img} onClick_card={onClick_card}
                    />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={() => { prevPage() }} />
              {Array.from(Array(maxPage + 1).keys()).map(n =>
                <Pagination.Item onClick={() => { setPage(n) }} active={n === page ? true : false}>{n + 1}</Pagination.Item>
              )}
              <Pagination.Next onClick={() => { nextPage() }} />
            </Pagination>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm={12} className="d-flex justify-content-center">
            <Button className="customBtn2" onClick={onClick_nextBtn}
              style={{ fontSize: '1.2em' }}
            >Confirm</Button>
          </Col>
        </Row>
      </Container>)
      }
    </>
  )
}