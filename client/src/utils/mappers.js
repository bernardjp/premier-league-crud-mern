function getInternationalCompetitions(competitioList) {
  const [europeanCompetitionName] = competitioList
    .filter(competition => competition.area.name === 'Europe')
    .map(competition => competition.name);
  return europeanCompetitionName;
}

export const formDataObjectMapper = formValues => {
  const formData = new FormData();

  Object.keys(formValues).forEach(key => {
    formData.append(key, formValues[key]);
  });

  return formData;
};

export const completeFormMapper = (resourceType, formValues, file = null) => {
  if (resourceType === 'clubs') return completeClubFormMapper(formValues, file);
  if (resourceType === 'players') return completePlayerFormMapper(formValues);

  return null;
};

function completeClubFormMapper(formValues, file) {
  const _id = formValues._id === 0 ? new Date().getTime() : formValues._id;
  // const activeCompetitions = formValues.activeCompetitions[0] === '' && [];
  const crestUrl = file !== null ? `${_id}_${formValues.crestUrl.split('\\').pop()}` : formValues.crestUrl;
  const lastUpdated = new Date().toISOString();
  const founded = parseInt(formValues.founded) || '';
  const fileData = file && new File([file], `${_id}_${formValues.crestUrl.split('\\').pop()}`, { type: file.type });

  return {
    ...formValues,
    _id,
    // activeCompetitions,
    crestUrl,
    founded,
    lastUpdated,
    fileData
  };
}

function completePlayerFormMapper(originalFormValues) {
  const formValues = { ...originalFormValues };
  const _id = formValues._id === 0 ? new Date().getTime() : formValues._id;
  const lastUpdated = new Date().toISOString();
  const club = formValues.club === 'Select a Club' ? '' : formValues.club;

  return {
    ...formValues,
    _id,
    club,
    lastUpdated
  };
}

export const initialStateMapper = ({ resourceData }, resourceType, submitAction) => {
  if (resourceType === 'clubs') {
    if (submitAction === 'new') {
      return {
        _id: 0,
        name: '',
        shortName: '',
        tla: '',
        activeCompetitions: '',
        crestUrl: '',
        address: '',
        phone: '',
        website: '',
        email: '',
        founded: '',
        clubColors: '',
        venue: '',
        lastUpdated: ''
      };
    }

    return {
      _id: resourceData._id || 0,
      name: resourceData.name || '',
      shortName: resourceData.shortName || '',
      tla: resourceData.tla || '',
      activeCompetitions: getInternationalCompetitions(resourceData.activeCompetitions) || '',
      crestUrl: resourceData.crestUrl || '',
      address: resourceData.address || '',
      phone: resourceData.phone || '',
      website: resourceData.website || '',
      email: resourceData.email || '',
      founded: resourceData.founded || '',
      clubColors: resourceData.clubColors || '',
      venue: resourceData.venue || '',
      lastUpdated: resourceData.lastUpdated || ''
    };
  }

  if (resourceType === 'players') {
    if (submitAction === 'new') {
      return {
        _id: 0,
        name: '',
        position: '',
        dateOfBirth: '',
        countryOfBirth: '',
        nationality: '',
        shirtNumber: '',
        role: '',
        club: '',
        lastUpdated: ''
      };
    }

    return {
      _id: resourceData._id || 0,
      name: resourceData.name || '',
      position: resourceData.position || '',
      dateOfBirth: resourceData.dateOfBirth.split('T')[0] || '',
      countryOfBirth: resourceData.countryOfBirth || '',
      nationality: resourceData.nationality || '',
      shirtNumber: resourceData.shirtNumber || '',
      role: resourceData.role || '',
      club: resourceData.club._id || '',
      lastUpdated: resourceData.lastUpdated || ''
    };
  }
};

export const selectOptionMapper = list => (
  list.map(item => ({
    value: item._id,
    name: item.name
  }))
);
