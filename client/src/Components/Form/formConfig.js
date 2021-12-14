export const clubFormConfig = [
  {
    label: "Club's Crest",
    name: 'crestUrl',
    type: 'file',
    selectOptions: null,
    length: null,
    placeholder: null,
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Full Name',
    name: 'name',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 3 },
    placeholder: 'e.g: Arsenal Football Club',
    isRequired: true,
    value: formValues => formValues[this.name]
  }, {
    label: 'Short Name',
    name: 'shortName',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 3 },
    placeholder: 'e.g: Arsenal',
    isRequired: true,
    value: formValues => formValues[this.name]
  }, {
    label: 'Three Letter Acronym (TLA)',
    name: 'tla',
    type: 'text',
    selectOptions: null,
    length: { max: 3, min: 3 },
    placeholder: 'e.g: ARS',
    isRequired: true,
    value: formValues => formValues[this.name]
  }, {
    label: 'Active International Competition',
    name: 'activeCompetitions',
    type: 'select',
    selectOptions: [
      { value: '', name: 'None' },
      { value: 'UEFA Champions League', name: 'UEFA Champions League' },
      { value: 'UEFA Europa League', name: 'UEFA Europa League' }
    ],
    length: { max: 250, min: 0 },
    placeholder: '',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Fundation year',
    name: 'founded',
    type: 'number',
    selectOptions: null,
    length: { max: new Date().getFullYear(), min: 0 },
    placeholder: 'e.g: 1878',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: "Club's colors",
    name: 'clubColors',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 0 },
    placeholder: 'e.g: Red / White',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Venue Name',
    name: 'venue',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 0 },
    placeholder: 'e.g: Emirates Stadium',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Venue Address',
    name: 'address',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 0 },
    placeholder: 'e.g: 75 Drayton Park London N5 1BU',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Venue Phone',
    name: 'phone',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 0 },
    placeholder: 'e.g: +44 (020) 76195003',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Email',
    name: 'email',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 10 },
    placeholder: 'e.g: info@arsenal.co.uk',
    isRequired: false,
    value: formValues => formValues[this.name]
  }, {
    label: 'Website',
    name: 'website',
    type: 'text',
    selectOptions: null,
    length: { max: 250, min: 10 },
    placeholder: 'e.g: www.arsenal.com',
    isRequired: true,
    value: formValues => formValues[this.name]
  }
];

export const playerFormConfig = selectOptions => (
  [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      selectOptions: null,
      length: { max: 250, min: 3 },
      placeholder: 'e.g: Emiliano Martinez',
      isRequired: true,
      value: formValues => formValues[this.name]
    }, {
      label: 'Position',
      name: 'position',
      type: 'select',
      selectOptions: [
        { value: '', name: '- Select a position -' },
        { value: 'Goalkeeper', name: 'Goalkeeper' },
        { value: 'Defender', name: 'Defender' },
        { value: 'Midfielder', name: 'Midfielder' },
        { value: 'Attacker', name: 'Attacker' },
        { value: 'Coaching', name: 'Coaching' }
      ],
      length: { max: 250, min: 3 },
      placeholder: 'e.g: Goalkeeper',
      isRequired: true,
      value: formValues => formValues[this.name]
    }, {
      label: 'Date of Birth',
      name: 'dateOfBirth',
      type: 'date',
      selectOptions: null,
      length: { max: 250, min: 0 },
      placeholder: '',
      isRequired: true,
      value: formValues => formValues[this.name]
    }, {
      label: 'Country of Birth',
      name: 'countryOfBirth',
      type: 'text',
      selectOptions: null,
      length: { max: 250, min: 0 },
      placeholder: 'e.g: Argentina',
      isRequired: false,
      value: formValues => formValues[this.name]
    }, {
      label: 'Nationality',
      name: 'nationality',
      type: 'text',
      selectOptions: null,
      length: { max: 250, min: 0 },
      placeholder: 'e.g: Argentina',
      isRequired: true,
      value: formValues => formValues[this.name]
    }, {
      label: 'Shirt Number',
      name: 'shirtNumber',
      type: 'number',
      selectOptions: null,
      length: { max: 250, min: 0 },
      placeholder: 'e.g: 12',
      isRequired: false,
      value: formValues => formValues[this.name]
    }, {
      label: 'Current Club',
      name: 'club',
      type: 'select',
      selectOptions: [
        { value: '', name: '- Select a Club -' },
        ...selectOptions
      ],
      length: { max: 250, min: 0 },
      placeholder: 'e.g: Arsenal FC',
      isRequired: false,
      value: formValues => formValues[this.name]
    }
  ]
);

export const formConfiguration = (resourceType, selectOptions = []) => (
  resourceType === 'clubs'
    ? clubFormConfig
    : playerFormConfig(selectOptions)
);
