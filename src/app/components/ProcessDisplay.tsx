import * as React from 'react';


interface ProcessDisplayPropTypes {
  name: string;
  data: string;
}

export class ProcessDisplay extends
  React.Component<ProcessDisplayPropTypes, {}> {

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <pre>{this.props.data.split('\n').join('\n')}</pre>
      </div>
    );
  }

}
