import * as React from 'react';
import { connect } from 'react-redux';
import { ProcessDisplay } from './ProcessDisplay';

interface AppPropTypes {
  processResults: {}
};

export class UnwrappedApp extends React.Component<AppPropTypes, {}> {

  render() {

    const processBlocks = [];
    if(this.props.processResults) {
      for(const name of Object.keys(this.props.processResults)) {
        processBlocks.push(
          <ProcessDisplay
            key={name}
            name={name}
            data={this.props.processResults[name]} />
        )
      }
    }


    return (
      <div>{processBlocks}</div>
    );

  }

}

export const App = connect(
  state => {
    return { processResults: state.processResults}
  }
)(UnwrappedApp);
