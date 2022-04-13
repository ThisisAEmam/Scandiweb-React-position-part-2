import Checkout from "@scandipwa/scandipwa/src/route/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import Progressbar from "Component/Progressbar/Progressbar";
import { BILLING_STEP, DETAILS_STEP, SHIPPING_STEP } from "./Checkout.config";

export class MyCheckout extends Checkout {
  constructor(props) {
    super(props);
  }

  renderProgressbar() {
    const steps = [SHIPPING_STEP, BILLING_STEP, DETAILS_STEP];
    const { checkoutStep } = this.props;

    const progressbarStepFunc = (step) => {
      return step.toLowerCase().replace("_step", "");
    };

    return (
      <div block="Checkout" elem="Progressbar">
        <Progressbar
          steps={steps}
          currentStep={checkoutStep}
          stepLabelFunc={progressbarStepFunc}
        />
      </div>
    );
  }

  render() {
    return (
      <main block="Checkout">
        {this.renderProgressbar()}
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default MyCheckout;
