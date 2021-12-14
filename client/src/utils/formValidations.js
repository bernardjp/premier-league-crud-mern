function validateForm(resourceType, formValues, fileData) {
  let isValidated = false;

  if (resourceType === 'clubs') isValidated = validateClub(formValues, fileData);
  if (resourceType === 'players') isValidated = validatePlayer(formValues);

  return isValidated;
}

function validateClub(formData, fileData) {
  return (
    validateFile(fileData)
    && validateName(formData.name)
    && validateName(formData.shortName)
    && validateTLA(formData.tla)
    && validateCompetitionName(formData.activeCompetitions)
    && validateYear(formData.founded)
    && validateEmail(formData.email)
    && validateWebsite(formData.website)
  );
}

function validatePlayer(formData) {
  return (
    validateName(formData.name)
    && validatePosition(formData.position)
    && validateRole(formData.role)
    && validatePlayerPosition(formData.position)
    && validatePlayerAge(formData.dateOfBirth, formData.nationality)
  );
}

function validateRole(formRole) {
  if (formRole === 'COACH' || formRole === 'PLAYER') return true;
  return false;
}

function validatePosition(formPosition) {
  switch (formPosition) {
    case 'Goalkeeper':
      return true;
    case 'Defender':
      return true;
    case 'Midfielder':
      return true;
    case 'Attacker':
      return true;
    case 'Coaching':
      return true;
    default:
      return false;
  }
}

function validateFile(file) {
  if (!file) return true;

  const validExtensions = ['jpg', 'jpeg', 'png'];
  const validSize = 1024 * 1024 * 1.5; // 1.5mb
  const fileExtension = file.name.split('.').pop();
  const fileSize = file.size;

  return (validExtensions.includes(fileExtension) && fileSize <= validSize);
}

function validateName(formName) {
  return /^[a-zA-Z0-9&?\s]{3,250}$/.test(formName);
}

function validateTLA(formTLA) {
  return /^[a-zA-Z]{3}$/.test(formTLA);
}

function validateYear(formYear) {
  if (/^[-?0-9]*$/.test(formYear)) {
    const currentYear = new Date().getFullYear();
    return (formYear <= currentYear && formYear >= 0);
  }
  return false;
}

function validateEmail(formEmail) {
  if (formEmail.length === 0) return true;
  if (formEmail.length <= 254) return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formEmail);
  return false;
}

function validateWebsite(formWebsiteURL) {
  // eslint-disable-next-line no-useless-escape
  if (formWebsiteURL.length <= 2000) return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(formWebsiteURL);
  return false;
}

function validateCompetitionName(formCompetitionName) {
  const validCompetitions = ['', 'UEFA Europa League', 'UEFA Champions League'];
  return validCompetitions.includes(formCompetitionName);
}

function validatePlayerPosition(formPlayerPosition) {
  const validPositions = ['', 'Goalkeeper', 'Defender', 'Midfielder', 'Attacker', 'Coaching'];
  return validPositions.includes(formPlayerPosition);
}

function validatePlayerAge(formPlayerBirthdate, formPlayerNationality) {
  const currentYear = new Date().getFullYear();
  const playerAge = currentYear - new Date(formPlayerBirthdate).getFullYear();

  if (formPlayerNationality === 'England' && playerAge >= 16) return true;
  if (formPlayerNationality !== 'England' && playerAge >= 18) return true;
  return false;
}

export default validateForm;
