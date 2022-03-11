import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Container, Row, Col, Form, Button, Pagination,
} from 'react-bootstrap'
import _ from 'lodash';
import { fileUploadDocumentType } from 'config'
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileUpload } from "components/Form/FileUpload";
import {UPLOAD_MAX_FILE_SIZE} from "config/CONSTANTS";
import prettyBytes from 'pretty-bytes'
import {MAKE_APPOINTMENT_STEP2} from 'navigation/CONSTANTS'

export const AppointmentForm = () => {
    //   const dispatch = useDispatch();
    const history = useHistory()

    const { appointmentSessionID } = useSelector((state) => state.appointment);
    const notify = (msg) => toast(msg)

    const formik = useFormik({
        initialValues: {
            diseaseDescription: "",
            files: [],
        },
        validationSchema: Yup.object({
            diseaseDescription: Yup.string().required('This field is required.'),
            files: Yup.array(
                Yup.mixed().test(
                    {
                        name: 'validator-file-type', test: (value, { createError, path }) => {
                            if (!_.isUndefined(value.fileType) && !_.isEmpty(value.fileType)) {
                                return true;
                            } else {
                                return createError({
                                    message: `For ${value.name}, file type should not be empty.`,
                                    path: 'files', 
                                })
                            }
                        }
                    }
                ).required('This field is required.'),
            ).test('validator-totle-field-size', 'The total file size exceeded',
                files => {
                    return files.reduce((acc, current) => { return acc + current.size }, 0) <= UPLOAD_MAX_FILE_SIZE
                }
            ),
        }),
        onSubmit: values => {
            notify("submitted form successfully!")
            alert(JSON.stringify(values, null, 2));
        }
    });

    const onClick_PreviousBtn = (e) => {
        history.goBack();
    }

    const removeFile = (targetFile) => {
        formik.setFieldValue("files", formik.values.files.filter(file => file.name != targetFile.name))
    }

    return (
        <>
            {_.isEmpty(appointmentSessionID) && (<Redirect to={{ pathname: MAKE_APPOINTMENT_STEP2 }} />)}
            <Container >
                <Form onSubmit={formik.handleSubmit}>
                    <Row xs={12}><Col className="text-center">
                        <h2>
                            Please fill in the form</h2>
                    </Col></Row>
                    <Row className="justify-content-center">
                        <Col sm={12} >
                            <Form.Group className="mb-3" controlId="formGridEmail" >
                                <Form.Label>Disease Description *</Form.Label>
                                <Form.Control
                                    id="diseaseDescription"
                                    value={formik.values.diseaseDescription}
                                    onChange={(e) => {
                                        formik.setFieldValue("diseaseDescription", e.target.value);
                                    }}
                                    as="textarea"
                                    placeholder="Enter the description here"
                                    style={{ height: '100px' }}
                                    isInvalid={!!formik.errors.diseaseDescription}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.diseaseDescription}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="uploadFile">
                                <Form.Label >Upload File
                                    {` (${fileUploadDocumentType.join(', ')}) `}
                                    (The Sum of All Files Should Be {"<="} {prettyBytes(UPLOAD_MAX_FILE_SIZE)})</Form.Label>
                                <FileUpload files={formik.values.files}
                                    setFiles={(updatedFiles) => {
                                        formik.setFieldValue("files", updatedFiles);
                                    }}
                                    removeFile={removeFile} isTouched={formik.touched.files}
                                    errors={formik.errors.files}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={12} className="d-flex justify-content-center">
                            <Button className="customBtn1" onClick={onClick_PreviousBtn}>Previous</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button className="customBtn2" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <ToastContainer />
            </Container>
        </>
    );
};