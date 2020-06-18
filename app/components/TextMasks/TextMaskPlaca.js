import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const TextMaskPlaca = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\w/, /\w/, /\w/, ' ', /\w/, /\w/, /\w/, /\w/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

TextMaskPlaca.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default TextMaskPlaca;
