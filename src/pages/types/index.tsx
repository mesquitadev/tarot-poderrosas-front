export interface UserData {
  name: string;
  surname: string;
  birthdate: string;
  cpf: string;
  rg: string;
  countryOfBirth: string;
  stateOfBirth: string;
  gender: string;
  breed: string;
  genderIdentity: string;
  email: string;
  linkedinUrl: string;
  phone1: string;
  phone2: string;
  state: string;
  city: string;
  educationLevel: string;
  peopleLiveInSameHouse: number;
  didYouMeetProLider: string;
  occupation: string;
  videoUrl: string;
  status: string;
  educationData: [
    {
      degree: string | null | undefined;
      institution: string;
      course: string;
      state: string;
      country: string;
      city: string;
      initialDate: string;
      endDate: string;
      grantAndAwards: string;
      activities: string;
      studyingHere: string;
      subscriberId: string;
    },
  ];
  workData: [
    {
      country: string;
      state: string;
      city: string;
      initialOffice: string;
      endOffice: string;
      initialDate: string;
      endDate: string;
      organization: string;
      workDescription: string;
      industryType: string;
      grantAndAwards: string;
      activities: string;
      coFounder: string;
      managedByFamily: string;
      workingHere: string;
      compensationType: string;
      subscriberId: string;
    },
  ];
  star: [
    {
      id: string;
      situation: string;
      task: string;
      action: string;
      result: string;
      subscriberId: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface InvalidateFormData {
  email: string;
  name: string;
  surname: string;
  cpf: string;
  rg: string;
}

export interface SearchFormData {
  email: string;
  cpf: string;
}

export interface EducationData {
  degree: string;
  institution: string;
  course: string;
  state: string;
  country: string;
  city: string;
  initialDate: string;
  endDate: string;
  grantAndAwards: string;
  activities: string;
  studyingHere: number;
  subscriberId: string;
}

export interface WorkData {
  country: string;
  state: string;
  city: string;
  initialOffice: string;
  endOffice: string;
  initialDate: string;
  endDate: string;
  organization: string;
  workDescription: string;
  industryType: string;
  grantAndAwards: string;
  activities: string;
  coFounder: number;
  managedByFamily: number;
  workingHere: string;
  compensationType: string;
  subscriberId: string;
}
export interface Star {
  id: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  subscriberId: string;
  createdAt: string;
  updatedAt: string;
}
