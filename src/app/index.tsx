import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { store, updateProcessData } from '../store/store';

const socket = new WebSocket('ws://localhost:9005/', 'protocolOne');
socket.onmessage = function(event) {
  const { processResults } = JSON.parse(event.data);


  if(processResults) {
    for(const name of Object.keys(processResults)) {
      store.dispatch(updateProcessData(name, processResults[name]));
    }
  }

}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
