import React from 'react';
import { connect } from 'react-redux';

import { State } from '../../types/state';

import {
  PropertyDetails,
  propertyDetailsSelector,
  sectionHeadingsSelector,
} from '../../redux/selectors/pdp';

import { Loader } from '../../components/loader/loader';
import { PDP } from './pdp';
import { fetchPropertyIfRequired } from '../../redux/actions/searchProperties';
import { ExplicitDictionary } from '../../types/common/dictionary';

interface StateProps {
  readonly property: PropertyDetails | undefined;
  readonly sectionHeadings: ExplicitDictionary<string>;
}

interface DispatchProps {
  readonly getProperty: () => void;
}

type Props = StateProps & DispatchProps;

export class PdpContainer extends React.Component<Props> {
  // TODO we can do this once we start do next/previous property
  // public componentDidUpdate() {
  //   const { getProperty, property } = this.props;
  //   if (!property) {
  //     getProperty('abc123');
  //   }
  // }

  public componentDidMount() {
    this.props.getProperty();
  }

  public render() {
    return this.props.property ? (
      <PDP {...this.props} property={this.props.property} />
    ) : (
      <Loader />
    );
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  property: propertyDetailsSelector(state),
  sectionHeadings: sectionHeadingsSelector(state),
});

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  getProperty: () => dispatch(fetchPropertyIfRequired()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpContainer);
