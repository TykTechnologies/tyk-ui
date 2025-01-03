import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button";
import { useStepper } from "../StepperContext";
import Buttons from "./Buttons";

export const DefaultButtons = ({
  nextBtnTxt,
  finishBtnTxt,
  backBtnTxt,
  skipBtnTxt,
}) => {
  const { onSkip } = useStepper();

  return (
    <Buttons>
      {({
        goToNextStep,
        goToPreviousStep,
        onSkipStep,
        isLastStep,
        activeStep,
      }) => (
        <>
          {onSkip && (
            <div className="skip-btn">
              <Button onClick={onSkipStep} theme="secondary-outline">
                {skipBtnTxt}
              </Button>
            </div>
          )}
          {activeStep > 0 && (
            <Button onClick={goToPreviousStep} theme="secondary">
              {backBtnTxt}
            </Button>
          )}
          <Button onClick={goToNextStep} theme="primary">
            {isLastStep ? finishBtnTxt : nextBtnTxt}
          </Button>
        </>
      )}
    </Buttons>
  );
};

DefaultButtons.propTypes = {
  nextBtnTxt: PropTypes.string.isRequired,
  finishBtnTxt: PropTypes.string.isRequired,
  backBtnTxt: PropTypes.string.isRequired,
  skipBtnTxt: PropTypes.string.isRequired,
};
