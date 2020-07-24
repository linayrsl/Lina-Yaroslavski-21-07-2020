import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ReceiverContext} from "../../context/receiverContext";
import Email from "../Email/Email";
import {toast} from "react-toastify";
import HTTP_STATUS_CODES from "http-status-codes";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import emptyMailbox from "./empty-inbox-image.png";
import "./EmailList.scss";


function EmailList(props) {

  const UNEXPECTED_ERROR_MESSAGE = "Something went wrong. Please contact the administrator if the error persists";
  const [emails, setEmails] = useState([]);
  const receiverContext = useContext(ReceiverContext);
  const [isProcessingRequest, setIsProcessingRequest] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setIsProcessingRequest(true);
    const fetchMail = async () => {
      try {
        const result = await fetch(`http://localhost:5000/api/users/${receiverContext.receiver}/messages/${props.filter}?page=${pageNumber}`, {
        });
        if (result.status === HTTP_STATUS_CODES.OK) {
          setEmails(await result.json());
        } else {
          toast.error(UNEXPECTED_ERROR_MESSAGE);
        }
        setIsProcessingRequest(false);
      } catch (error) {
        setIsProcessingRequest(false);
        toast.error(UNEXPECTED_ERROR_MESSAGE);
      }
    }
    setEmails([]);
    fetchMail();
  }, [pageNumber, props.filter, receiverContext.receiver])

  const deleteEmail = async (mailId) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/users/${receiverContext.receiver}/messages/${mailId}`,
        {
          method: "DELETE"
        });
      if (result.status === HTTP_STATUS_CODES.OK || result.status === HTTP_STATUS_CODES.NOT_FOUND) {
        toast.info(
          result.status === HTTP_STATUS_CODES.OK
            ? "The mail was deleted"
            : "Looks like this email has already been deleted");
        const updatedMails = emails.filter((email) => email.id !== mailId);
        setEmails(updatedMails);
      } else {
        toast.error(UNEXPECTED_ERROR_MESSAGE);
      }
    } catch (error) {
      toast.error(UNEXPECTED_ERROR_MESSAGE);
    }
  }

  return (
    <div className="emailList mb-3">
      {(!isProcessingRequest && (!emails || !emails.length)) ?
        <div className="emptyMailboxNotification d-flex flex-column justify-content-center align-items-center">
          <img src={emptyMailbox} />Currently no more emails in this box
        </div>
        : ""}
      {isProcessingRequest ? <LoadingIndicator /> : ""}
      {emails.map((mail) =>
        <Email allowDelete={props.allowDelete} mail={mail} deleteMail={deleteEmail} key={mail.id} />)}
      {!isProcessingRequest &&
      <div className="d-flex justify-content-between mt-2">
        {pageNumber > 1 && <button onClick={() => setPageNumber(pageNumber - 1)} className="btn btn-dark" type="button">&larr; Previous page</button>}
        {emails.length === 10 && <button onClick={() => setPageNumber(pageNumber + 1)} className="btn btn-dark" type="button">Next page &rarr;</button>}
      </div>}
    </div>
  );
}

EmailList.propTypes = {
  filter: PropTypes.string,
  allowDelete: PropTypes.bool,
};

export default EmailList;

