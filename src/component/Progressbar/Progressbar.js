import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./Progressbar.style";

class Progressbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progressbar: null,
    };
  }

  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentStep: PropTypes.string.isRequired,
    stepLabelFunc: PropTypes.func,
  };

  componentDidMount() {
    const { steps } = this.props;
    if (steps != undefined && steps.length !== 0) {
      this.renderProgressbar();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentStep !== this.props.currentStep) {
      this.renderProgressbar();
    }
  }

  setProgressbar(content) {
    this.setState({ progressbar: content });
  }

  renderProgressbar() {
    const { currentStep, steps } = this.props;
    const numSteps = steps.length;
    const currentIdx = steps.findIndex((step) => step === currentStep);

    const content = (
      <div
        block="Progressbar"
        elem="Steps"
        style={{ gridTemplateColumns: "1fr ".repeat(numSteps) }}
      >
        {steps.map((step, index) => (
          <div
            block="Progressbar"
            elem="Step"
            key={step}
            className={[
              step === currentStep ? "Current-Step" : null,
              index < currentIdx ? "Prev-Active-Step" : null,
            ].join(" ")}
          >
            <div block="Progressbar" elem="Step-Line">
              <div block="Progressbar" elem="Step-Line-Fill"></div>
            </div>
            <div block="Progressbar" elem="Step-Block">
              <div block="Progressbar" elem="Step-Icon">
                {index < currentIdx ? (
                  <span>&#10003;</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p block="Progressbar" elem="Step-Label">
                {this.props.stepLabelFunc != undefined
                  ? this.props.stepLabelFunc(step)
                  : step}
              </p>
            </div>
          </div>
        ))}
      </div>
    );

    this.setProgressbar(content);
  }

  render() {
    return <div block="Progressbar">{this.state.progressbar}</div>;
  }
}

export default Progressbar;
