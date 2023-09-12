import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PatientService } from 'src/app/services/patient.service'
import { CaseService } from 'src/app/services/case.service';
import { AppointService } from 'src/app/services/appoint.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  maxDate: any;
  updatePatientForm: FormGroup;
  updateCaseForm: FormGroup;
  updateAppointmentForm: FormGroup;

  patientId: string;
  caseId: string;
  appointmentId: any;
  date = new Date();
  patientData: any;
  caseData: any;
  appointmentData: any;
  practiceInfo: any[] = [];
  insuranceInfo: any[] = [];
  visitInfo: any[] = [];
  firmInfo: any[] = [];
  categoryInfo: any[] = [];
  caseTypeInfo: any[] = [];
  specialtyInfo: any[] = [];
  doctorInfo: any[] = [];
  typeInfo: any[] = [];
  updateForm: FormGroup;
  updateAppointmentFormExists: boolean = true;

  constructor(
    private patientService: PatientService,
    private caseService: CaseService,
    private appointService: AppointService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    
    this.patientId = this.route.snapshot.params['id1'];
    this.caseId = this.route.snapshot.params['id2'];
    this.appointmentId = this.route.snapshot.paramMap.get('id3');
    this.getInfo();
    if(this.appointmentId === "0"){
      this.updateAppointmentFormExists = false;
    }
    this.updatePatientForm = this.createFormGroup();
    this.updateCaseForm = this.createCaseGroup();
    this.updateAppointmentForm = this.createAppointmentGroup();
    
    this.updateForm = this.fb.group({
      patient: this.updatePatientForm,
      case:this.updateCaseForm,
      appointment: this.updateAppointmentFormExists ? this.updateAppointmentForm : null
    })
    console.log("3 ids",this.patientId,this.caseId,this.appointmentId)
    this.fetchUpdatePatient(this.patientId);
    this.fetchUpdateCase(this.caseId);
    this.fetchUpdateAppoint(this.appointmentId);
  }

  createFormGroup(): FormGroup {
    const formGroupConfig = {
      id:new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_of_birth: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      middle_name: new FormControl('')
    };
    return this.fb.group(formGroupConfig);
  }

  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      id:new FormControl('', [Validators.required]),
      practiceLocationId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      purposeOfVisitId: new FormControl('', [Validators.required]),
      caseTypeId: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),
      insuranceId: new FormControl('', [Validators.required]),
      firmId: new FormControl('', [Validators.required])
    };
    return this.fb.group(formGroupConfig);
  }
  createAppointmentGroup(): FormGroup{
    this.noAppointmentAssigned()
    const formGroupConfig = {
      appointmentDate: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      appointmentTypeId: new FormControl('', [Validators.required]),
      doctorId: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      specialtyId: new FormControl('', [Validators.required])
    }
    return this.fb.group(formGroupConfig);
  }

  fetchUpdatePatient(patientId) {
    this.patientService.getPatient(patientId).subscribe(
      (patients) => {
        this.patientData = patients;
        this.populatingPatient();
      },
      (error) => {
        console.error('Error fetching patient:', error);
      }
    );
  }

  fetchUpdateCase(caseId) {
    this.caseService.getCase(caseId).subscribe(
      (cases) => {
        this.caseData = cases;
        this.populatingCase();
      },
      (error) => {
        console.log('Error fetching Cases:', error);
      }
    );
  }

  fetchUpdateAppoint(appointmentId) {
    if(!this.noAppointmentAssigned()){
      this.appointService.getAppointments(appointmentId).subscribe(
        (appointments) => {
          this.appointmentData = appointments;
          console.log("Appointment Data:", this.appointmentData )
          this.populatingAppointment();
        },
        (error) => {
          console.log('Error fetching Appointments:', error);
        }
        );
      }
  }

  populatingPatient() {
    this.updatePatientForm.patchValue({
      id: this.patientId,
      first_name: this.patientData.first_name,
      middle_name: this.patientData.middle_name,
      last_name: this.patientData.last_name,
      email: this.patientData.email,
      ssn: this.patientData.ssn,
      address: this.patientData.address,
      city: this.patientData.city,
      state: this.patientData.state,
      gender: this.patientData.gender,
      zip: this.patientData.zip,
      date_of_birth: this.patientData.date_of_birth
    });
  }

  populatingCase() {
    this.updateCaseForm.patchValue({
      id: this.caseId,
      practiceLocationId: this.caseData.practiceLocationId,
      categoryId: this.caseData.categoryId,
      purposeOfVisitId: this.caseData.purposeOfVisitId,
      caseTypeId: this.caseData.caseTypeId,
      doa: this.caseData.doa,
      insuranceId: this.caseData.insuranceId,
      firmId: this.caseData.firmId
    });
  }

  populatingAppointment() {
    this.updateAppointmentForm.patchValue({
      id: this.appointmentData.id,
      appointmentDate: this.appointmentData.appointmentDate,
      appointmentTime: this.appointmentData.appointmentTime,
      appointmentTypeId: this.appointmentData.appointmentTypeId,
      specialtyId: this.appointmentData.specialtyId,
      doctorId: this.appointmentData.doctorId,
      duration: this.appointmentData.duration
    });
  }


  updateCase() {
    this.caseService.setCaseId(this.caseId);
    const numericCaseId = parseInt(this.caseId, 10);
    this.caseService.updateCase(numericCaseId, this.updateCaseForm.value);
    this.router.navigate(['/update-appointment', this.appointmentId.id]);
  }

  updateAppointment() {
    this.appointService.updateAppointment(this.appointmentId, this.updateAppointmentForm.value);
    this.router.navigate(['/home']);
  }

  getInfo() {
    this.PracticeInfo();
    this.InsuranceInfo();
    this.FirmInfo();
    this.CategoryInfo();
    this.CaseTypeInfo();
    this.getVisitInfo();
    this.getSpecialityInfo();
    this.getDoctorInfo();
    this.getTypeInfo();
  }
  PracticeInfo() {
    this.caseService.getPractiseInfo().subscribe((response: any[]) => {
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
  getVisitInfo(){
    this.caseService.getVisitInfo().subscribe((response: any[])=>{
      this.visitInfo = response;
      console.log("Visit Info:", this.visitInfo)
    })
  }
  getSpecialityInfo(){
    this.appointService.getSpecialtyInfo().subscribe((response: any[]) => {
      console.log(response)
      this.specialtyInfo = response;
    });
  }
  getTypeInfo(){
    this.appointService.getTypeInfo().subscribe((response: any[])=>{
      console.log(response);
      this.typeInfo = response;
    })
  }
  getDoctorInfo() {
    this.appointService.getDoctorInfo().subscribe((response: any[]) => {
      console.log("doctor Info",response)
      this.doctorInfo = response;
    });
  }
  noAppointmentAssigned(): boolean{
    if(this.appointmentId === '0'){
      return true;
    }
    else{
      return false;
    }
  }
  updateAppoint(){
    this.appointService.updateAppointment(this.appointmentId,this.updateAppointmentForm.value)
    console.log("Updated Appointment:",this.updateAppointmentForm.value )
    setTimeout(()=>{
    this.router.navigate(['/home'])
  },500)
  }
  onButtonClick(){
    this.router.navigate(['/home']);
  }
  updatePnC(){

  }
  updateData(){
    if(this.updateForm.valid){
      const updatedData = {
        patientData: this.updateForm.get('patient').value,
        caseData: this.updateForm.get('case').value,
        appointmentData: this.updateForm.get('appointment').value,
      };
      console.log("All info:", updatedData)
      this.patientService.updateAllData(updatedData)
      .subscribe(
        response => {
          console.log("response:", response);
          this.router.navigate(['/home']);
        },
        error => {
          console.log("error:", error)
        }
        );
      }
  }
}