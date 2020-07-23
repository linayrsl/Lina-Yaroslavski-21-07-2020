import React from "react";
import { Formik, Form, Field } from "formik";
import {ComposeEmailSchema} from "../ComposeEmailSchema";
import {useHistory}  from "react-router-dom";
import { toast } from "react-toastify";

function EmailForm(props) {

  const history = useHistory();

  const submit = async (values) => {
    const filteredValues = {};
    for (const key in values) {
      if (key !== "receiver") {
        filteredValues[key] = values[key];
      }
    }
    try {
      const result = await fetch (`http://localhost:5000/api/users/${values.receiver}/messages/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...filteredValues}),
        });
      if (result.status === 200) {
        toast.success("The mail was sent");
        history.push("/manage");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="emailForm">
      <Formik
        initialValues={{
          receiver: "", sender: "", subject: "", message: "",
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
                <button type="submit" className="btn btn-dark">Send</button>
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

