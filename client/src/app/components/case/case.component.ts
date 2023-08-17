import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { PatientService } from 'src/app/services/patient.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  caseForm: FormGroup;
  practiceInfo: any[] = [];
  insuranceInfo: any[] = [];
  firmInfo: any[] = [];
  categoryInfo: any[] = [];
  caseTypeInfo: any[] = [];
  patientId:any;

  constructor(private caseService: CaseService, private router: Router,private patientService:PatientService) {}
  ngOnInit(): void {
    this.patientId = this.patientService.getPatientId();
    console.log(this.patientId);
    this.FirmInfo();
    this.getinfo();
    this.caseForm = this.createCaseGroup();
    // this.caseForm.get('firmId').valueChanges.subscribe((firm) => {
    //   console.log("ERORR1",firm)
    //   const firmId = this.firmInfo.find((firm) => firm.id === firm);
    //   if (firmId) {
    //     this.caseForm.get('firmCity').setValue(firmId.city);
    //     this.caseForm.get('firmState').setValue(firmId.state);
    //     this.caseForm.get('firmZip').setValue(firmId.zip);
    //   }
    // });
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      patientId: new FormControl(this.patientId, [Validators.required]),
      practiceLocationId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      purposeOfVisit: new FormControl('', [Validators.required]),
      caseTypeId: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),

      // Attributes for the Insurance section
      insuranceId: new FormControl('', [Validators.required]),
      // insuranceCity: new FormControl('', [Validators.required]),
      // insuranceState: new FormControl('', [Validators.required]),
      // insuranceZip: new FormControl('', [Validators.required]),

      // Attributes for the Firm section
      firmId: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  getinfo() {
    this.PracticeInfo();
    this.InsuranceInfo();
    this.CategoryInfo();
    this.CaseTypeInfo();
    // this.FirmInfo();
  }
  addCase() {
    this.caseService
      .case(this.caseForm.value)
      .subscribe((msg) => {
        console.log(msg);
      });
    this.router.navigate(['/appointment']);
    // this.caseForm.reset();
    // this.clearErrorStates();
  }
  clearErrorStates() {
    const formControls = this.caseForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
  CategoryInfo() {
    this.caseService.getCategoryInfo().subscribe((response: any[]) => {
      console.log(response)
      this.categoryInfo = response;
    });
  }
  CaseTypeInfo(){
    this.caseService.getCaseTypeInfo().subscribe((response: any[]) => {
      console.log(response)
      this.caseTypeInfo = response;
    });
  }
  PracticeInfo() {
    this.caseService.getPractiseInfo().subscribe((response: any[]) => {
      console.log(response)
      this.practiceInfo = response;
    });
  }
  InsuranceInfo() {
    this.caseService.getInsuranceInfo().subscribe((response: any[]) => {
      this.insuranceInfo = response;
    });
  }
  FirmInfo() {
    this.caseService.getFirmInfo().subscribe((response: any[]) => {
      this.firmInfo = response;
    });
  }
}
