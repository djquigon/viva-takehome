import { useState } from "react";
import "../App.css";
import confettiOverlay from "../assets/confetti_overlay.gif";

/**
 * The resulting loan offer after submitting a user's info.
 * @date 2022-09-23
 * @param { updateFormStep, size } parm1
 */
const LoanOffer = ({ updateFormStep, size }) => {
  const [modal, setModal] = useState(false);
  const [accepted, setAccepted] = useState(null);

  /**
   * Toggles the wallet info modal.
   */
  const toggleModal = () => {
    setModal(!modal);
  };

  /**Removed scrolling if modal is active */
  if (modal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  return (
    <div>
      <img
        id="confettiOverlay"
        src={confettiOverlay}
        alt="confetti overlay"
      ></img>
      <h1>
        Congratulations {localStorage.getItem("firstName")}, you have been
        approved for a <b>{size === "Large" ? "$15,000" : "$500"}</b> loan!
      </h1>
      <button
        onClick={() => {
          setModal(true);
          setAccepted(true);
        }}
      >
        Accept
      </button>
      <button
        onClick={() => {
          setModal(true);
          setAccepted(false);
        }}
      >
        Decline
      </button>
      <button
        onClick={() => {
          updateFormStep(1);
        }}
      >
        Back
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalContent">
            {accepted ? (
              <>
                <h1>🥳 Awesome 🥳</h1>
                <hr />
                <p>
                  Your funds are on the way! The loan term is{" "}
                  {size === "Large" ? "24" : "5"} months.
                </p>
                <a href="https://www.viva-finance.com/">
                  {" "}
                  Return to the Home Page
                </a>
              </>
            ) : (
              <>
                <h1>😔 Darn 😔</h1>
                <hr />
                <p>Sorry to hear that. Let us know if you change your mind!</p>
                <a href="https://www.viva-finance.com/">
                  {" "}
                  Return to the Home Page
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOffer;
