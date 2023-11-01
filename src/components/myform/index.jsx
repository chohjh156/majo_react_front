import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import validator from "validator";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [nameWarn, setNameWarn] = useState("");
  const [emailWarn, setEmailWarn] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [nameState, setNameState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [warnState, setWarnState] = useState(false);
  const [agree, setAgree] = useState(false);
  const onSubmit = (data) => {
    validateName();
    validateEmail();
    setWarnState(true);
  };

  const handleClose = () => {
    document.getElementsByClassName("form")[0].style.display = "none";
    document.body.style.overflow = "auto";
    document.body.style.touchAction = "auto";
    document.body.style.position = "relative";

    setSuccess(false);
    setNameState(false);
    setEmailState(false);
    setWarnState(false);
    setAgree(false);
  };
  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailState(true);
    } else {
      setEmailWarn("Please input vaild email!");
      setEmailState(false);
    }
  };
  const validateName = async () => {
    if (/^[A-Za-z ]+$/.test(name)) setNameState(true);
    else {
      setNameWarn("Please input valid name!");
      setNameState(false);
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAgree = (e) => {
    setAgree(!agree);
  };
  useEffect(() => {
    console.log(emailState, nameState);
    if (emailState && nameState) {
      setSpinnerState(true);
      (async () => {
        await sleep(2000);
        setSpinnerState(false);
        setSuccess(true);
      })();
    }
  }, [nameState, emailState]);
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title">
          {success ? "Welcome aboard!" : "Join the Inner Circle!"}
        </div>
        <div className="subtitle">
          {success
            ? "We’re thrilled to have you. Keep an eye on your inbox for exciting updates."
            : "Subscribe now and be the first to receive exclusive updates, news, and early-bird offers on our upcoming product MajorDom!"}
        </div>
        {!success && (
          <div className="input__container">
            <input
              type="text"
              placeholder="Name"
              required
              onChange={handleName}
            />
            {!nameState && warnState && <span>{nameWarn}</span>}
          </div>
        )}
        {!success && (
          <div className="input__container">
            <input
              type="email"
              placeholder="Email"
              required
              className="form-email"
              onChange={handleEmail}
            />
            {warnState && !emailState && nameState && <span>{emailWarn}</span>}
          </div>
        )}
        {!success && (
          <input
            placeholder="Additional Info. Here you can specify your experience, requirements, request features, or ask questions."
            maxLength={1000}
          />
        )}
        {!success && (
          <div className="checkbox__container">
            <input
              type="checkbox"
              checked={agree}
              onChange={handleAgree}
              required
            />
            I agree to receive updates, news, and promotional emails about
            MajorDom. I understand I can unsubscribe at any time.
          </div>
        )}
        {success ? (
          <a className="submit-btn" onClick={() => handleClose()}>
            Done
          </a>
        ) : (
          <button type="submit" className="submit-btn">
            Count Me In!
          </button>
        )}
        {spinnerState && <BeatLoader color="#fff" />}
      </form>

      <button className="close-btn" onClick={() => handleClose()}>
        <img src="/images/close.svg" alt="not found" width={40} height={40} />
      </button>
    </div>
  );
};

export default MyForm;
