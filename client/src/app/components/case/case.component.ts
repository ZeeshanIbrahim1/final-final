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
  visitInfo: any[] = [];
  firmInfo: any[] = [];
  categoryInfo: any[] = [];
  caseTypeInfo: any[] = [];
  patientId:any;

  constructor(private caseService: CaseService, private router: Router,private patientService:PatientService) {}
  ngOnInit(): void {
    this.patientId = this.patientService.getPatientId();
    console.log(this.patientId);
    this.getFirmInfo();
    this.getinfo();
    this.caseForm = this.createCaseGroup();
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      patientId: new FormControl(this.patientId, [Validators.required]),
      practiceLocationId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      purposeOfVisitId: new FormControl('', [Validators.required]),
      caseTypeId: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),
      insuranceId: new FormControl('', [Validators.required]),
      firmId: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  getinfo() {
    this.getPracticeInfo();
    this.getInsuranceInfo();
    this.getCategoryInfo();
    this.getCaseTypeInfo();
    this.getVisitInfo();
  }
  
  clearErrorStates() {
    const formControls = this.caseForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
  getCategoryInfo() {
    this.caseService.getCategoryInfo().subscribe((response: any[]) => {
      console.log(response)
      this.categoryInfo = response;
    });
  }
  getCaseTypeInfo(){
    this.caseService.getCaseTypeInfo().subscribe((response: any[]) => {
      console.log(response)
      this.caseTypeInfo = response;
    });
  }
  getPracticeInfo() {
    this.caseService.getPractiseInfo().subscribe((response: any[]) => {
      console.log(response)
      this.practiceInfo = response;
    });
  }
  getInsuranceInfo() {
    this.caseService.getInsuranceInfo().subscribe((response: any[]) => {
      this.insuranceInfo = response;
    });
  }
  getFirmInfo() {
    this.caseService.getFirmInfo().subscribe((response: any[]) => {
      this.firmInfo = response;
    });
  }
  getVisitInfo(){
    this.caseService.getVisitInfo().subscribe((response: any[])=>{
      this.visitInfo = response;
      console.log("Visit Info:", this.visitInfo)
    })
  }
  addCase() {
    this.caseService
      .case(this.caseForm.value)
      .subscribe((msg) => {
        console.log(msg);
        this.patientService.setPatientId(msg);
      });
      setTimeout(() => {
      
        this.router.navigate(['/appointment']);
      }, 100);
    // this.caseForm.reset();
    // this.clearErrorStates();
  }
}
