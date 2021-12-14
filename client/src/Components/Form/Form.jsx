import React, {
  useState, useCallback, useRef, useContext
} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import StyledInput from './FormInput';
import fetchAPI from '../../utils/fetchAPI';
import validateForm from '../../utils/formValidations';
import { formDataObjectMapper, completeFormMapper, initialStateMapper } from '../../utils/mappers';
import { FormContext } from '../../Layouts/FormPage';
import { formConfiguration } from './formConfig';
import { ListTitleFrame } from '../DetailPage/CardListContainer';
import useDocTitle from '../../Hooks/useDocTitle';
import theme from '../../styles/theme';

const FormContainer = styled.form`
  background-color: ${props => props.theme.colors.primary_translucent};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};
  box-shadow: 10px 10px 5px rgba(21, 0, 24, 0.15);
  color: ${props => props.theme.colors.cuaternary};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;

const InputContainer = styled.div`
  margin: 2rem 0;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  @media(max-width: ${props => props.theme.media_queries.sm}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  align-items: center;
  background: ${props => props.type !== 'submit' && 'none'};
  background-color: ${props => (props.type === 'submit' && props.theme.colors.tertiary_translucent)};
  border-radius: 1.2rem;
  border: 1px solid ${props => (props.type === 'submit' ? props.theme.colors.tertiary : props.theme.colors.cuaternary)};
  color: ${props => (props.type === 'submit' ? 'white' : props.theme.colors.cuaternary)};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 2rem;
  justify-content: center;
  margin: 0.2rem;
  min-width: 10rem;
  padding: 1.2rem;

  &:hover {
    box-shadow: 0 0 4px ${props => (props.type === 'submit' ? props.theme.colors.tertiary : props.theme.colors.cuaternary_translucent)};
    color: white;
  }

  &:active {
    background-color: ${props => (props.type === 'submit' ? props.theme.colors.tertiary : props.theme.colors.cuaternary)};
  }
`;

Form.propTypes = {
  data: PropTypes.shape({
    resourceData: PropTypes.shape({
      selectOptionList: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        name: PropTypes.string
      })),
      lastUpdated: PropTypes.string,
      _id: PropTypes.number
    })
  }).isRequired
};

function Form({ data }) {
  const { submitAction, resourceType } = useContext(FormContext);
  const initialState = initialStateMapper(data, resourceType, submitAction);
  const formTypeConfig = formConfiguration(resourceType, data.resourceData.selectOptionList);

  const [formValues, setFormValues] = useState(initialState);
  const [serverResponse, setServerResponse] = useState({ error: false, message: '' });
  const [redirect, setRedirect] = useState(false);
  const fileInputRef = useRef();
  useDocTitle(`${submitAction[0].toUpperCase() + submitAction.slice(1)} ${resourceType.slice(0, -1)}`);

  const onChangeHandler = useCallback(e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === 'position' && inputValue === 'Coaching') {
      setFormValues({ ...formValues, role: 'COACH', [inputName]: inputValue });
    } else if (inputName === 'position' && inputValue !== 'Coaching') {
      setFormValues({ ...formValues, role: 'PLAYER', [inputName]: inputValue });
    } else {
      setFormValues({ ...formValues, [inputName]: inputValue });
    }
  }, [formValues, setFormValues]);

  const onSubmitHandler = useCallback(async e => {
    e.preventDefault();

    let fileData = null;
    // if (fileInputRef.current) fileData = fileInputRef.current.files[0];
    if (fileInputRef.current) [fileData] = fileInputRef.current.files;

    const isValidated = validateForm(resourceType, formValues, fileData);

    if (isValidated) {
      const completeFormValues = completeFormMapper(resourceType, formValues, fileData);
      const formDataObject = formDataObjectMapper(completeFormValues);
      let response;

      if (submitAction === 'update') {
        response = await fetchAPI
          .updateResource(resourceType, completeFormValues._id, formDataObject);
      } else {
        response = await fetchAPI.createResource(resourceType, formDataObject);
      }

      setServerResponse(response);
      if (response.error === false) setRedirect(true);
    } else {
      // TO-DO: use validation to customise error message
      setServerResponse({ error: true, message: 'Invalid data' });
    }
  }, [formValues, fileInputRef, submitAction, setServerResponse]);

  const onResetHandler = useCallback(e => {
    e.preventDefault();
    setFormValues(initialState);
  }, [initialState, setFormValues]);

  const onResetFileInput = useCallback((e, ref) => {
    e.preventDefault();
    // eslint-disable-next-line no-param-reassign
    ref.current.value = '';
    setFormValues({ ...formValues, crestUrl: initialState.crestUrl });
  }, [initialState, formValues, setFormValues]);

  return (
    <FormContainer onSubmit={onSubmitHandler}>
      {submitAction === 'new'
        ? (
          <ListTitleFrame>
            NEW
            {' '}
            {resourceType.slice(0, -1).toUpperCase()}
          </ListTitleFrame>
        )
        : (
          <ListTitleFrame>
            UPDATE
            {' '}
            <span style={{ color: `${theme.colors.secondary}` }}>{initialState.name.toUpperCase()}</span>
            {' '}
            INFORMATION
          </ListTitleFrame>
        )}
      <InputContainer>
        {formTypeConfig.map(input => (
          <StyledInput
            key={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            value={formValues[input.name]}
            placeholder={input.placeholder}
            length={input.length}
            isRequired={input.isRequired}
            selectOptions={input.selectOptions}
            onChangeCallback={onChangeHandler}
            onResetFileInput={onResetFileInput}
            ref={fileInputRef}
          />
        ))}
      </InputContainer>
      {initialState.lastUpdated && (
        <p>
          Last Update:
          <span style={{ color: 'white' }}>{`${new Date(data.resourceData.lastUpdated).toUTCString()}`}</span>
        </p>
      )}
      {serverResponse.error && (
        <p>
          Error -
          <span style={{ color: 'white' }}>{serverResponse.message}</span>
        </p>
      )}
      <ActionButtonsContainer>
        <ActionButton type="empty" onClick={onResetHandler}>RESET FIELDS</ActionButton>
        <ActionButton type="submit">{resourceType === 'clubs' ? 'SAVE CLUB' : 'SAVE PLAYER'}</ActionButton>
      </ActionButtonsContainer>
      {redirect && <Redirect to={`/resources/${resourceType}/${data.resourceData._id}`} />}
    </FormContainer>
  );
}

export default Form;
