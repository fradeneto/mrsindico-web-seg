import React from 'react';

class KeyPressF extends React.Component {
  constructor(props) {
    // super(props);
    // this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      alert('ESC');
    }
  }

  componentDidMount() {
    // document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    // document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}
export default KeyPressF;
