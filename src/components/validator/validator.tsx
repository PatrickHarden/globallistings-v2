import React from 'react';
import { State } from '../../types/state';
import { connect } from 'react-redux';

interface StateProps {
  readonly isValid: boolean;
}

interface DispatchProps {
  readonly validate: () => void;
}

type Props = StateProps & DispatchProps;

interface Validator {
  readonly isValid: (state: State) => boolean;
  readonly validate: () => (dispatch: Function, getState: () => State) => void;
}

/**
 * This is a HOC which abstracts the logic of triggering actions until we get to the valid state and the render wrapped component
 * @param validator a validator object which will be used to validate if this component can be rendered.
 * isValid will be determined to check if we can render the component. Validate will be used to trigger action to
 * make component valid
 */
export const withValidation = (validator: Validator) => (Component: React.ComponentType) => {
  class WithValidation extends React.Component<Props> {
    public componentDidUpdate() {
      if (!this.props.isValid) {
        this.props.validate();
      }
    }

    public componentDidMount() {
      if (!this.props.isValid) {
        this.props.validate();
      }
    }

    public render() {
      // TODO add ability to pass a spinner component
      return this.props.isValid ? <Component /> : 'running validation';
    }
  }

  const mapStateToProps = (state: State): StateProps => ({
    isValid: validator.isValid(state),
  });

  const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    validate: () => dispatch(validator.validate()),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithValidation);
};
