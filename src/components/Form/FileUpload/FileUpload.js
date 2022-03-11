
import React, { useState, useCallback, useMemo, useEffect } from "react";
import prettyBytes from 'pretty-bytes'
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from './dropzoneCSS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from 'react-dropzone'
import {
    Form, Button, Alert, Table
} from 'react-bootstrap'
import { fileUploadDocumentType } from 'config'

export const FileUpload = ({ files, setFiles, removeFile, isTouched, errors }) => {
    const {
        isDragActive, isDragAccept, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles
    } = useDropzone({
        onDrop: acceptedFiles => {//acceptedFiles is an array
            console.log(`acceptedFiles`, acceptedFiles)
            let errorMsg_duplicatedFiles = '';
            const newValidFiles = []
            acceptedFiles.forEach((acceptedFile) => {
                if (files.some(f => f.name === acceptedFile.name)) {
                    errorMsg_duplicatedFiles += `${acceptedFile.name} has been added\n`;
                } else {
                    acceptedFile.fileType = "";
                    newValidFiles.push(acceptedFile)
                }
            })

            setFiles([...files, ...newValidFiles])
            if (errorMsg_duplicatedFiles) {
                alert(errorMsg_duplicatedFiles);//move this code to a new method
            }
        },
        multiple: true
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);


    return <div className="container px-0">
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload!'}
            {isDragActive && !isDragReject && "Drop it like it's hot!"}
            {isDragReject && "File type not accepted, sorry!"}
        </div>
        <aside>
            {files.length > 0 &&
                <>
                    <h4>Files</h4>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>File Type</th>
                                <th>Delete</th>
                            </tr>
                            {files.map(file => {
                                const { path, size, name, fileType } = file;
                                return (
                                    <tr key={path}>
                                        <td >
                                            <FontAwesomeIcon icon={faFileUpload} size={'lg'} />{" "}
                                            {path} - {prettyBytes(size)}
                                        </td>
                                        <td >
                                            <Form.Select aria-label="Default select example"
                                                onChange={(e) => {
                                                    let index_targetFileForUpdate = files.findIndex(f => f.name === name);
                                                    let files_copy = [...files]; //make a shadow copy 
                                                    file.fileType = e.target.value                                                                       // console.log(`file_updated`, file_updated)
                                                    files_copy[index_targetFileForUpdate] = file;
                                                    setFiles(files_copy)
                                                }}>
                                                {/* this field is required */}
                                                <option value="-1" disabled selected>Open this select menu</option>
                                                {fileUploadDocumentType.map(e => <option value={e}>{e}</option>)}
                                            </Form.Select>
                                        </td>
                                        <td > <Button variant="danger"
                                            onClick={() => removeFile(file)}
                                        >X</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {errors && isTouched && (
                        <Alert variant={'danger'}>
                            {errors}
                        </Alert>
                    )}
                </>
            }
        </aside>
    </div>
}