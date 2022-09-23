import { useState } from "react";
import logo from "../assets/logo.svg";
import "../App.css";

const PersonalInfoForm = ({ updateFormStep }) => {
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || ""
  );
  const [dob, setDob] = useState(localStorage.getItem("dob") || "");
  const [ssn, setSSN] = useState(localStorage.getItem("ssn") || "");
  const [formError, setFormError] = useState(null);

  const getOffsetDOB = (offset) => {
    /* Ensured difference works for every timezone */
    let splitDOB = dob.split("-");
    let convertedDOB = new Date(splitDOB[0], splitDOB[1] - 1, splitDOB[2]);
    let convertedDOBPlusOffset = convertedDOB.setFullYear(
      convertedDOB.getFullYear() + offset
    );
    return convertedDOBPlusOffset;
  };

  const validateDOB = () => {
    let convertedDOBPlus18 = getOffsetDOB(18);
    let convertedDOBPlus125 = getOffsetDOB(125);
    /* If the user's DOB + 18 years is >= todays date (user is under 18) */
    if (convertedDOBPlus18 >= new Date()) {
      setFormError(
        "You must be atleast 18 years old to apply for a loan with Viva."
      );
      return false;
      /* If the user's DOB + 125 years is <= todays date (user is over 125) */
    } else if (convertedDOBPlus125 <= new Date()) {
      setFormError(
        "You must be under 125 years old to apply for a loan with Viva."
      );
      return false;
    } else {
      setFormError("");
      return true;
    }
  };

  const validateSSN = () => {
    let ssnRegex =
      /^(?!(\d)\1{8}$)(?!(\d)\2\2-(\d)\2-(\d)\2{3}$)(?:(?!000|666|9\d\d)\d{3}-(?!00)\d\d-(?!0000)\d{4}|\d{9})$/;
    let ssnMatches = ssnRegex.test(ssn);
    console.log(ssnMatches);
    if (ssnMatches === true) {
      setFormError("");
      return true;
    } else {
      setFormError(
        "Please ensure your SSN is in the form of xxx-xx-xxxx or xxxxxxxxx and does not contain all the same numbers."
      );
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    /* Save entries in local storage */
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("dob", dob);
    localStorage.setItem("ssn", ssn);
    /* First validate DOB */
    if (validateDOB() === true && validateSSN() === true) {
      updateFormStep(1);
    }
  };

  return (
    <div className="infoFormContainer">
      <form className="infoForm" onSubmit={(e) => handleFormSubmit(e)}>
        <img height="50px" src={logo} alt="logo" />
        <h5>Loan Application</h5>
        <h1>Personal Information</h1>
        {formError && <p style={{ color: "red" }}>Error: {formError}</p>}
        <label htmlFor="firstNameField">
          First Name <strong className="requiredSymbol">*</strong>
          <br />
          <input
            autoFocus
            id="firstNameField"
            type="text"
            placeholder="First Name..."
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastNameField">
          Last Name <strong className="requiredSymbol">*</strong>
          <br />
          <input
            autoFocus
            id="lastNameField"
            type="text"
            placeholder="Last Name..."
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="dobField">
          Date of Birth <strong className="requiredSymbol">*</strong>
          <br />
          <input
            autoFocus
            id="dobField"
            type="date"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        {/* Obviously would need to be encrypted on submission in real world setting */}
        <label htmlFor="ssnField">
          SSN <strong className="requiredSymbol">*</strong>
          <br />
          <input
            autoFocus
            id="ssnField"
            type="text"
            placeholder="Social Security Number..."
            required
            value={ssn}
            onChange={(e) => setSSN(e.target.value)}
          />
        </label>
        <button type="submit" aria-label="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
