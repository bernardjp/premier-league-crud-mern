import React, { useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import fetchAPI from '../utils/fetchAPI';
import RequestHandler from '../Components/RequestHandler/RequestHandler';
import Form from '../Components/Form/Form';
import PageContainer from './BasePage';
import BottomNavigation from '../Components/Pagination/BottomNavigation';

export const FormContext = createContext();

export function FormPage() {
  const resourceType = location.pathname.split('/')[2];
  const submitAction = location.pathname.split('/')[3];
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = { submitAction, resourceType };
  const query = useParams().id || null;
  const initialState = { resourceType, query };

  // eslint-disable-next-line no-unused-vars
  const [queryParams, setQueryParams] = useState(initialState);
  const { loading, data, error } = useFetch(fetchAPI.getFormData, queryParams);

  return (
    <FormContext.Provider value={contextValue}>
      <PageContainer>
        <RequestHandler
          isLoading={loading}
          data={data}
          error={error}
          Component={Form}
        />
        <BottomNavigation />
      </PageContainer>
    </FormContext.Provider>
  );
}
