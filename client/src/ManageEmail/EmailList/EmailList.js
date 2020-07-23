import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ReceiverContext} from "../../context/receiverContext";
import Email from "../Email/Email";
import {toast} from "react-toastify";


function EmailList(props) {

  const [emails, setEmails] = useState([]);
  const receiverContext = useContext(ReceiverContext);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const result = await fetch(`http://localhost:5000/api/users/${receiverContext.receiver}/messages/${props.filter}`, {
        });
        if (result.status === 200) {
          setEmails(await result.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMail();
  }, [props.filter, receiverContext.receiver])

  const deleteEmail = async (mailId) => {
    const result = await fetch(
      `http://localhost:5000/api/users/${receiverContext.receiver}/messages/${mailId}`,
      {
        method: "DELETE"
      });
    if (result.status === 200) {
      toast.success("The mail was deleted");
      const updatedMails = emails.filter((email) => email.id !== mailId);
      setEmails(updatedMails);
    }
  }

  return (
    <div className="">
      {emails.map((mail) =>
        <Email allowDelete={props.allowDelete} mail={mail} deleteMail={deleteEmail} key={mail.id} />)}
    </div>
  );
}

EmailList.propTypes = {
  filter: PropTypes.string,
  allowDelete: PropTypes.bool,
};

export default EmailList;

