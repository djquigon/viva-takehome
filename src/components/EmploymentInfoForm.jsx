import { useState } from "react";
import logo from "../assets/logo.svg";

/**
 * The form for obtaining a user's employment info.
 * @date 2022-09-23
 * @param { updateFormStep, updateLoanSize } props
 */
const EmploymentInfoForm = ({ updateFormStep, updateLoanSize }) => {
  const [employerName, setEmployerName] = useState(
    localStorage.getItem("employerName") || ""
  );
  const [grossSalary, setGrossSalary] = useState(
    localStorage.getItem("grossSalary") || ""
  );
  const [workStatus, setWorkStatus] = useState(
    localStorage.getItem("workStatus") || ""
  );
  const [formError, setFormError] = useState(null);

  /**
   * Validates the employment info form and consequently updates state.
   * @date 2022-09-23
   * @param { * } e
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    /* Save entries in local storage */
    localStorage.setItem("employerName", employerName);
    localStorage.setItem("grossSalary", grossSalary);
    localStorage.setItem("workStatus", workStatus);
    /* Validate Salary */
    if (grossSalary === "Less than $1,000" || workStatus === "Unemployed") {
      setFormError(
        "Sorry, but Viva's application process requires that you have a salary greater than $1,000 and work part-time or full-time."
      );
    } else {
      setFormError("");
      if (grossSalary === "$1,000 - $15,000" || workStatus === "Part-Time") {
        updateLoanSize("Small");
      } else {
        updateLoanSize("Large");
      }
      updateFormStep(2);
    }
  };

  return (
    <div>
      <h1>Looking for financial assistance in these trying times? 😟</h1>
      <h3>
        VIVA is designed to provide fast, affordable loans for hardworking
        employees, all online. Please fill out the following information to see
        if you qualify for a loan from Viva.
      </h3>
      <form className="infoForm" onSubmit={(e) => handleFormSubmit(e)}>
        <img height="50px" src={logo} alt="logo" />
        <h5>Loan Application</h5>
        <h1>Employment Information</h1>
        {formError && <p style={{ color: "red" }}>Error: {formError}</p>}
        <label htmlFor="employerNameField">
          Employer Name <strong className="requiredSymbol">*</strong> <br />
          <input
            id="employerNameField"
            type="text"
            placeholder="Employer Name..."
            required
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </label>
        <label htmlFor="grossSalaryField">
          Gross Salary <strong className="requiredSymbol">*</strong> <br />
          <select
            id="grossSalaryField"
            name="grossSalary"
            onChange={(e) => setGrossSalary(e.target.value)}
            required
            value={grossSalary}
          >
            {grossSalary}
            <option hidden disabled selected value="">
              Select an Option
            </option>
            <option value="Less than $1,000">Less than $1,000</option>
            <option value="$1,000 - $15,000">$1,000 - $15,000</option>
            <option value="$15,000 - $40,000">$15,000 - $40,000</option>
            <option value="$40,000 - $65,000">$40,000 - $65,000</option>
            <option value="$65,000 - $90,000">$65,000 - $90,000</option>
            <option value="$90,000 - $115,000">$90,000 - $115,000</option>
            <option value="$115,000 - $140,000">$115,000 - $140,000</option>
            <option value="Greater than $140,000">Greater than $140,000</option>
          </select>
        </label>
        <label htmlFor="workStatusField">
          Work Status <strong className="requiredSymbol">*</strong> <br />
          <select
            id="workStatusField"
            name="workStatus"
            onChange={(e) => setWorkStatus(e.target.value)}
            required
            value={workStatus}
          >
            <option hidden disabled selected value="">
              Select an Option
            </option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </label>
        <button type="submit" aria-label="submit">
          Next
        </button>
        <button
          aria-label="Back"
          onClick={() => {
            updateFormStep(0);
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EmploymentInfoForm;
