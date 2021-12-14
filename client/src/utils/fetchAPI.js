import axios from 'axios';
import { selectOptionMapper } from './mappers';

const BASE_URL = import.meta.env.VITE_RESOURCE_API_ENDPOINT;

const createURL = (resourceType, query) => {
  if (query) return `${BASE_URL}/${resourceType}?name=${query}`;
  if (resourceType) return `${BASE_URL}/${resourceType}`;
  return `${BASE_URL}`;
};

const getResourceList = async ({ resourceType, query }) => {
  const URL = createURL(resourceType, query);

  try {
    const { data } = await axios.get(URL);
    return data;
  } catch ({ response }) {
    console.log(response);
    errorHandler(response);
  }
};

const getResourceDetails = async ({ resourceType, query }) => {
  if (query === null) return null;

  try {
    const { data } = await axios.get(`${BASE_URL}/${resourceType}/${query}`);
    return data;
  } catch ({ response }) {
    errorHandler(response);
  }
};

const getFormData = async ({ resourceType, query }) => {
  let selectOptionList;
  const resourceData = await getResourceDetails({ resourceType, query });

  try {
    if (resourceType === 'clubs') selectOptionList = await getResourceList({ resourceType: 'competitions', query: null });
    if (resourceType === 'players') selectOptionList = await getResourceList({ resourceType: 'clubs', query: null });
    selectOptionList = selectOptionMapper(selectOptionList);
  } catch ({ response }) {
    errorHandler(response);
  }

  return { selectOptionList, ...resourceData };
};

const createResource = async (resourceType, newData) => {
  let serverReponse;

  await axios({
    method: 'POST',
    url: `${import.meta.env.VITE_RESOURCE_API_ENDPOINT}/${resourceType}/new`,
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: newData
  })
    .then(res => {
      console.log('desde createResources:', res.data);
      serverReponse = { error: false, message: 'Resource created' };
    })
    .catch(err => {
      console.log(err);
      serverReponse = { error: true, message: 'The resource could not be created.' };
    });

  return serverReponse;
};

const deleteResource = async (resourceType, resourceID) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_RESOURCE_API_ENDPOINT}/${resourceType}`,
      data: { _id: resourceID }
    });

    return data;
  } catch ({ response }) {
    errorHandler(response);
  }
};

const updateResource = async (resourceType, resourceID, newData) => {
  let serverReponse;

  await axios({
    method: 'PATCH',
    url: `${import.meta.env.VITE_RESOURCE_API_ENDPOINT}/${resourceType}/update/${resourceID}`,
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: newData
  })
    .then(() => {
      serverReponse = { error: false, message: 'Resource updated' };
    })
    .catch(err => {
      serverReponse = { error: true, message: err.response.data.message };
    });

  return serverReponse;
};

function errorHandler(response) {
  if (response === undefined) {
    throw new Error('Service is currently unavailable. Try again later.');
  } else {
    throw new Error(response.data.message);
  }
}

export default {
  getResourceList,
  getResourceDetails,
  getFormData,
  createResource,
  deleteResource,
  updateResource
};
