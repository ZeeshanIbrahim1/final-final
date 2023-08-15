import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';

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

  constructor(private caseService: CaseService, private router:Router) {}
  ngOnInit(): void {
    this.caseForm = this.createCaseGroup();
    this.getinfo();
    this.caseForm.get('SelectedFirm').valueChanges.subscribe(selectedFirmId => {
      const selectedFirm = this.firmInfo.find(firm => firm.id === selectedFirmId);
      if (selectedFirm) {
        this.caseForm.get('firmCity').setValue(selectedFirm.city);
        this.caseForm.get('firmState').setValue(selectedFirm.state);
        this.caseForm.get('firmZip').setValue(selectedFirm.zip);
      }
    });
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      selectedLocation: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      purposeOfVisit: new FormControl('', [Validators.required]),
      caseType: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),

      // Attributes for the Insurance section
      selectedInsurance: new FormControl('', [Validators.required]),
      insuranceCity: new FormControl('', [Validators.required]),
      insuranceState: new FormControl('', [Validators.required]),
      insuranceZip: new FormControl('', [Validators.required]),

      // Attributes for the Firm section
      SelectedFirm: new FormControl('', [Validators.required]),
      firmCity: new FormControl({value:'',disabled: true}),
      firmState: new FormControl({value:'',disabled: true}),
      firmZip: new FormControl({value:'',disabled: true}),
    };
    return new FormGroup(formGroupConfig);
  }
  getinfo(){
    this.PractiseInfo();
    this.InsuranceInfo();
    this.FirmInfo();
  }
  addCase() {
    this.caseForm.get('firmCity').enable();
  this.caseForm.get('firmState').enable();
  this.caseForm.get('firmZip').enable();
    console.log(this.caseForm.value);
    this.caseService
      .case(this.caseForm.value)
      .subscribe((msg) => console.log(msg));
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
  PractiseInfo(){
    this.caseService
      .getPractiseInfo()
      .subscribe((response: any[])=>{
        this.practiceInfo = response;
      }
      )
  }
  InsuranceInfo(){
    this.caseService
    .getInsuranceInfo()
    .subscribe((response: any[])=>{
      this.insuranceInfo = response;
    }
    )
  }
  FirmInfo(){
    this.caseService
    .getFirmInfo()
    .subscribe((response: any[])=>{
      this.firmInfo = response;
    }
    )
  }
}