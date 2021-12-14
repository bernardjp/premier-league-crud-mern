import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
`;

const InputButtonContainer = styled.div`
  display: flex;
`;

const ResetFileInputButton = styled.button`
  background-color: ${props => props.theme.colors.cuaternary};
  border-end-start-radius: 4px;
  border-start-start-radius: 4px;
  border: 1px solid ${props => props.theme.colors.cuaternary};
  color: white;
  padding: 0.7rem;
`;

const InputLabel = styled.label`
  align-items: flex-end;
  color: ${props => props.theme.colors.cuaternary};
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  margin: 1rem 0 0.4rem 0.2rem;
`;

const Input = styled.input`
  background-color: ${props => props.theme.colors.tertiary_translucent};
  border-radius: 4px;
  border-end-start-radius: ${props => (props.type === 'file' && '0px')};
  border-start-start-radius: ${props => (props.type === 'file' && '0px')};
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-left: ${props => (props.type === 'file' && 'none')};
  color: ${props => (props.value ? 'white' : 'gray')};
  font-size: 0.9rem;
  padding: 0.75rem;
  transition: 0.2s;
  width: 100%;

  &:focus {
    border: 1px solid ${props => props.theme.colors.secondary};
    outline: none;
  }

  &:invalid {
    border: 1px solid red;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: white !important;
    -webkit-box-shadow: 0 0 0 30px ${props => props.theme.colors.tertiary} inset !important;
  }
`;

const Select = styled.select`
  background-color: ${props => props.theme.colors.tertiary_translucent};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.tertiary};
  color: ${props => (props.value ? 'white' : 'gray')};
  font-size: 0.9rem;
  padding: 0.75rem;
  transition: 0.2s;
  width: 100%;

  &:focus {
    border: 1px solid ${props => props.theme.colors.secondary};
    outline: none;
  }

  &:invalid {
    border: 1px solid red;
  }
`;

const SelectOption = styled.option`
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
`;

const RequiredAlert = styled.span`
  color: ${props => props.theme.colors.cuaternary};
  font-size: 0.85rem;
  text-align: end;
`;

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  isRequired: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  })),
  onChange: PropTypes.func.isRequired
};

SelectInput.defaultProps = {
  isRequired: false,
  selectOptions: null
};

function SelectInput(props) {
  const {
    name,
    value,
    isRequired,
    selectOptions,
    onChange
  } = props;

  return (
    <Select
      name={name}
      id={name}
      placeholder=""
      value={value}
      required={isRequired}
      onChange={onChange}
    >
      {selectOptions.map(option => (
        <SelectOption
          key={option.value}
          value={option.value}
        >
          {option.name}
        </SelectOption>
      ))}
    </Select>
  );
}

const StyledInput = forwardRef((props, ref) => {
  const {
    label,
    name,
    value,
    placeholder,
    type,
    length,
    isRequired,
    onChangeCallback,
    onResetFileInput,
    selectOptions
  } = props;

  const inputRef = type === 'file' ? ref : null;

  return (
    <InputContainer>
      <InputLabel htmlFor={name}>
        {label}
        {isRequired && <RequiredAlert>* required field</RequiredAlert>}
      </InputLabel>
      <InputButtonContainer>
        {type === 'file' && <ResetFileInputButton onClick={e => onResetFileInput(e, ref)}> X </ResetFileInputButton>}
        {type === 'select' && (
          <SelectInput
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            isRequired={isRequired}
            onChange={onChangeCallback}
            selectOptions={selectOptions}
          />
        )}
        {type === 'file' && (
          <Input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            isRequired={isRequired}
            onChange={onChangeCallback}
            ref={inputRef}
          />
        )}
        {(type !== 'file' && type !== 'select')
          ? (
            <Input
              id={name}
              type={type}
              name={name}
              value={type === 'file' ? '' : value}
              placeholder={placeholder}
              minLength={type === 'text' ? length.min : null}
              maxLength={type === 'text' ? length.max : null}
              min={type === 'number' ? length.min : null}
              max={type === 'number' ? length.max : null}
              required={isRequired}
              onChange={onChangeCallback}
              ref={inputRef}
            />
          ) : null}
      </InputButtonContainer>
    </InputContainer>
  );
});

StyledInput.displayName = 'StyledInput';

StyledInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'select', 'file', 'date']).isRequired,
  length: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  isRequired: PropTypes.bool,
  onChangeCallback: PropTypes.func.isRequired,
  onResetFileInput: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string
  }))
};

StyledInput.defaultProps = {
  isRequired: false,
  selectOptions: null,
  placeholder: '',
  length: null
};

export default StyledInput;
