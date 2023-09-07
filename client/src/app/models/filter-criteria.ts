export class FilterCriteria {
    constructor(
      public firstName: string = '',
      public middleName: string = '',
      public lastName: string = '',
      public caseId: number | null = null,
      public categoryName: string = '',
      public purposeOfVisit: string = '',
      public caseType: string = '',
      public dob: Date | null = null,
      public practiceLocation: string = '',
      public insuranceName: string = '',
      public firmName: string = '',
      public doa: Date | null = null,
      public doctor: string = ''
    ) {}
  }
  