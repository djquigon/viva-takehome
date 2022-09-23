import logo from "./assets/logo.svg";
import { useState, createContext } from "react";
import "./App.css";
import PersonalInfoForm from "./components/PersonalInfoForm";
import EmploymentInfoForm from "./components/EmploymentInfoForm";
import LoanOffer from "./components/LoanOffer";
import fbIcon from "./assets/fb_icon.webp";
import twitterIcon from "./assets/twitter_icon.webp";
import linkedinIcon from "./assets/linkedin_icon.webp";
import tiktokIcon from "./assets/tiktok_icon.webp";
import truststampLogo from "./assets/truststamp.webp";
import bbbAccreditation from "./assets/bbb_accredited.png";
export const ThemeContext = createContext(null);

function App() {
  const [formStep, setFormStep] = useState(0);
  const [loanSize, setLoanSize] = useState(null);

  /**
   * Passed as a callback function to the form components to update the current form step.
   * @date 2022-09-23
   * @param { * } newFormStep
   */
  const updateFormStep = (newFormStep) => {
    setFormStep(newFormStep);
  };

  /**
   * Passed as a callback function to the form components to update the current loan size.
   * @date 2022-09-23
   * @param { * } newLoanSize
   */
  const updateLoanSize = (newLoanSize) => {
    setLoanSize(newLoanSize);
  };

  /**
   * Renders the current form step.
   * @date 2022-09-23
   */
  const renderCurrentFormStep = () => {
    switch (formStep) {
      case 0:
        return <PersonalInfoForm updateFormStep={updateFormStep} />;
      case 1:
        return (
          <EmploymentInfoForm
            updateFormStep={updateFormStep}
            updateLoanSize={updateLoanSize}
          />
        );
      case 2:
        return <LoanOffer updateFormStep={updateFormStep} size={loanSize} />;
      default:
        return null;
    }
  };

  /*If the user has theme in local storage use it, if not use light by default */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  /**
   * Changes the current theme saved for the user and sets it in local storage.
   */
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    //for persistence
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" id={theme}>
        <header>
          <a href="https://www.viva-finance.com/">
            <img src={logo} alt="logo" />
          </a>
          <button id="themeBtn" onClick={toggleTheme}>
            <span role="img">{theme === "light" ? "🌞" : "🌚"}</span>
          </button>
          <a href="/">Return</a>
        </header>
        <main>{renderCurrentFormStep()}</main>
        <footer>
          <div>
            <nav>
              <a href="https://www.viva-finance.com/blog">Blog</a>
              <a href="https://www.viva-finance.com/reviews">Reviews</a>
              <a href="https://www.viva-finance.com/about">About</a>
              <a href="https://www.viva-finance.com/careers">Careers</a>
            </nav>
          </div>
          <div id="vivaRelatedLinks">
            <div id="vivaContactInfo">
              <img src={logo} alt="logo" />
              <p>VIVA Finance, Inc. © 2020</p>
              <p>
                Phone: <a href="tel:678-685-8834">678.685.8834</a>
              </p>
              <br></br>
              <a href="https://www.viva-finance.com/terms">Terms of Service</a>
              <a href="https://www.viva-finance.com/privacy-policy">
                Privacy Policy
              </a>
              <a href="https://www.viva-finance.com/compliance">Compliance</a>
            </div>
            <div id="vivaExternalLinks">
              <div id="vivaMedia">
                <a href="https://www.facebook.com/VIVAFinanceInc/">
                  <img src={fbIcon} alt="facebook icon" />
                </a>
                <a href="https://mobile.twitter.com/vivafinance">
                  <img src={twitterIcon} alt="twitter icon" />
                </a>
                <a href="https://www.linkedin.com/company/viva-finance/">
                  <img src={linkedinIcon} alt="linkedin icon" />
                </a>
                <a href="https://www.tiktok.com/@viva_finance?lang=en">
                  <img src={tiktokIcon} alt="tiktok icon" />
                </a>
              </div>
              <div>
                <a href="https://www.bbb.org/us/ga/atlanta/profile/loans/viva-finance-0443-28171814/#sealclick">
                  <img
                    src={bbbAccreditation}
                    alt="better business bureau accreditation"
                  ></img>
                </a>
              </div>
              <div id="vivaTrustStamp">
                <p>Secured by TrustStamp</p>
                <a href="https://truststamp.ai/Technology.html">
                  <img src={truststampLogo} alt="truststamp logo"></img>
                </a>
              </div>
            </div>
          </div>
          <p>
            <small>
              VIVA's loans are not provided by, sponsored, or endorsed by any
              employer. VIVA Finance is an optional resource and employers in no
              way benefit from VIVA's loans. VIVA Finance is not directly
              affiliated with any employers and completely releases employers
              from any liability. VIVA Finance offers unsecured personal
              installment loans up to $10,000 in amount financed. The minimum
              annual percentage rate (APR) on a VIVA Finance loan is 11.99% with
              a maximum APR of 32.75% including all applicable fees and loan
              costs. The minimum term or repayment period of VIVA Finance loans
              is 5 months with a maximum term or repayment period of 24 months.
              A loan example: A $4000 loan with a prepaid finance charge of $25,
              and amount financed of $4,000, repayable in 24 monthly
              installments, and an interest rate of 18.99% would have an APR of
              19.60% and monthly installments of $204.45. This would amount to
              the borrower paying back $4,906.80 in total. All loans are subject
              to the underwriting policies of VIVA Finance Inc. Terms and
              conditions apply. There are no penalties for early repayment. *
              Approvals are primarily based on employment information. Loan
              offer amount and rate may vary based on other factors such as your
              income and credit history. VIVA Finance Inc NMLS #1905666.{" "}
              <a href="https://www.nmlsconsumeraccess.org/">
                NMLS Consumer Access.
              </a>
            </small>
          </p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
