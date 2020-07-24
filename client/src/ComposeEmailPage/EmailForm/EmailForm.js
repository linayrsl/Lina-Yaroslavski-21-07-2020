import React, {useContext, useState} from "react";
import { Formik, Form, Field } from "formik";
import {ComposeEmailSchema} from "../ComposeEmailSchema";
import {useHistory}  from "react-router-dom";
import { toast } from "react-toastify";
import HTTP_STATUS_CODES from "http-status-codes";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import {ReceiverContext} from "../../context/receiverContext";

function EmailForm(props) {

  const receiverContext = useContext(ReceiverContext);
  const UNEXPECTED_ERROR_MESSAGE = "Something went wrong. Please contact the administrator if the error persists";
  const history = useHistory();
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const submit = async (values) => {
    const filteredValues = {};
    for (const key in values) {
      if (key !== "receiver") {
        filteredValues[key] = values[key];
      }
    }

    setIsProcessingRequest(true);
    try {
      const result = await fetch (`http://localhost:5000/api/users/${values.receiver}/messages/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...filteredValues}),
        });
      if (result.status === HTTP_STATUS_CODES.OK) {
        setIsProcessingRequest(false);
        toast.info("The mail was sent");
        history.push("/manage");
      } else if (result.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        setIsProcessingRequest(false);
        toast("Form isn't filled correctly");
      } else {
        setIsProcessingRequest(false);
        toast.error(UNEXPECTED_ERROR_MESSAGE);
      }
    } catch (error) {
      toast.error(UNEXPECTED_ERROR_MESSAGE);
      setIsProcessingRequest(false);
    }
  }

  return (
    <div className="emailForm">
      <Formik
        initialValues={{
          receiver: "", sender: receiverContext.receiver || "", subject: "", message: "",
        }}
        validationSchema={ComposeEmailSchema}
        onSubmit={submit}
      >
        {({isSubmitting, setFieldValue}) => (
        <Form className="mt-4">
          <div className="row justify-content-center">
          <div className="form-group col-sm-6 ">
            <label htmlFor="receiver" className="col-form-label">To:</label>
            <Field type="text" className="form-control" id="receiver" name="receiver" required={true}/>
          </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-sm-6">
              <label htmlFor="sender" className=" col-form-label">From:</label>
              <Field type="text" className="form-control" id="sender" name="sender" required={true}/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-sm-6">
              <label htmlFor="subject" className="col-form-label">Subject:</label>
              <Field type="text" className="form-control" id="subject" name="subject" required={true}/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-sm-6">
              <label htmlFor="message" className="col-form-label">Text:</label>
              <div>
                <Field  as="textarea" className="form-control" id="message" name="message"/>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-sm-6">
              <label htmlFor="submit" className="col-form-label"/>
              <div>
                {isProcessingRequest ? <LoadingIndicator /> : <button type="submit" className="btn btn-dark">Send</button>}
              </div>
            </div>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmailForm;

