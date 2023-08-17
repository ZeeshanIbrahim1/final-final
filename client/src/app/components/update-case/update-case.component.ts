import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from 'src/app/services/case.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.css']
})
export class UpdateCaseComponent {
  updateCaseForm: FormGroup;
  caseId: string;
  caseData: any;
  practiceInfo: any[] = [];
  insuranceInfo: any[] = [];
  firmInfo: any[] = [];

  constructor(private caseService: CaseService,private route: ActivatedRoute, private http: HttpClient,private router: Router) {}
  async ngOnInit() {
    this.updateCaseForm = this.createCaseGroup();
    this.caseId = this.route.snapshot.paramMap.get('id'); // Assuming you're passing patient ID as a route parameter
    await this.fetchUpdateCase(this.caseId);
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      practiceLocationId: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      purposeOfVisit: new FormControl('', [Validators.required]),
      caseType: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),

      // Attributes for the Insurance section
      insuranceId: new FormControl('', [Validators.required]),
      firmId: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  fetchUpdateCase(patientId){
    this.caseService.getCase(patientId)
    .subscribe(
      (cases) => {
        console.log("is it working:", cases)
        this.caseData = cases;
        // this.populating();
        return cases;
      },
      (error) => {
        console.error('Error fetching patient:', error);
      }
    );
}
  // getinfo() {
  //   this.PractiseInfo();
  //   this.InsuranceInfo();
  //   this.FirmInfo();
  // }
  addCase() {
    this.updateCaseForm.get('firmCity').enable();
    this.updateCaseForm.get('firmState').enable();
    this.updateCaseForm.get('firmZip').enable();
    console.log(this.updateCaseForm.value);
    this.caseService
      .case(this.updateCaseForm.value)
      .subscribe((msg) => console.log(msg));
    this.router.navigate(['/appointment']);
    // this.caseForm.reset();
    // this.clearErrorStates();
  }
  clearErrorStates() {
    const formControls = this.updateCaseForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
  // PractiseInfo() {
  //   this.caseService.getPractiseInfo().subscribe((response: any[]) => {
  //     this.practiceInfo = response;
  //   });
  // }
  // InsuranceInfo() {
  //   this.caseService.getInsuranceInfo().subscribe((response: any[]) => {
  //     this.insuranceInfo = response;
  //   });
  // }
  // FirmInfo() {
  //   this.caseService.getFirmInfo().subscribe((response: any[]) => {
  //     this.firmInfo = response;
  //   });
  // }
  updateCase() {
    const numericId = parseInt(this.caseId, 10);
    this.caseService.updateCase(numericId,this.updateCaseForm.value);
  }
  // populating(){
  //   this.updateCaseForm.patchValue({
  //     // practiceLocationId: this.caseData.practiceLocationId,
  //     category: this.caseData.category ,
  //     purposeOfVisit: this.caseData.purposeOfVisit,
  //     caseType: this.caseData.caseType,
  //     doa: this.caseData.doa,
  //     insuranceId: this.caseData.insuranceId,
  //     insuranceCity: this.caseData.insuranceCity,
  //     insuranceState: this.caseData.insuranceState,
  //     insuranceZip: this.caseData.insuranceZip,
  //     firmId: this.caseData.firmId,
  //     firmCity: this.caseData.firmCity,
  //     firmState: this.caseData.firmState,
  //     firmZip: this.caseData.firmZip,
  //   });
  // }

}
