import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-otppin',
  templateUrl: './otppin.component.html',
  styleUrls: ['./otppin.component.scss'],
})
export class OtppinComponent implements OnInit {
  @ViewChild('otp1', { static: false }) otpField1: ElementRef;
  @ViewChild('otp2', { static: false }) otpField2: ElementRef;
  @ViewChild('otp3', { static: false }) otpField3: ElementRef;
  @ViewChild('otp4', { static: false }) otpField4: ElementRef;
  @ViewChild('otp5', { static: false }) otpField5: ElementRef;
  @ViewChild('otp6', { static: false }) otpField6: ElementRef;

  @Output() pinChange: EventEmitter<any> = new EventEmitter();
  @Input() public length;
  @Input() public type;
  @Input() public otp;

  pinFormGroup: FormGroup;

  constructor(public fb: FormBuilder,
    public cache: StorageService) {
    this.createForm();
    this.length = 4;
    this.type = 1;
  }

  createForm() {
    this.pinFormGroup = this.fb.group({
      input1: ['', [Validators.required, Validators.minLength(1)]],
      input2: ['', [Validators.required, Validators.minLength(1)]],
      input3: ['', [Validators.required, Validators.minLength(1)]],
      input4: ['', [Validators.required, Validators.minLength(1)]],
      input5: ['', [Validators.required, Validators.minLength(1)]],
      input6: ['', [Validators.required, Validators.minLength(1)]],
    })
  }
  get form() {
    return this.pinFormGroup.controls
  }

  ngOnChanges(changes: any) {
    // console.log(changes.otp);
    if (changes.otp && changes.otp.currentValue) {
      let otpSplit = changes.otp.currentValue.split('');
      if (otpSplit.length == 6 && this.type == 2 && this.length == 6) {
        setTimeout(() => {
          this.pinFormGroup.get('input1')?.patchValue(otpSplit[0]);
          this.pinFormGroup.get('input2')?.patchValue(otpSplit[1]);
          this.pinFormGroup.get('input3')?.patchValue(otpSplit[2]);
          this.pinFormGroup.get('input4')?.patchValue(otpSplit[3]);
          this.pinFormGroup.get('input5')?.patchValue(otpSplit[4]);
          this.pinFormGroup.get('input6')?.patchValue(otpSplit[5]);
          let formData = this.pinFormGroup.getRawValue();
          if (formData.input1) {
            var result = Object.keys(formData).map(k => formData[k] ?? '').join("");
            this.pinChange.emit(result);
          }
        }, 3000);
      }
    }
  }

  ngOnInit() {
    this.type == 1 && this.resetOtp();
  }

  inputChanged(event, previousField, nextField, formControlName) {
    let keyCode = event.code ? event.code : event.key
    if (this.pinFormGroup.get(formControlName)?.invalid && keyCode != 'Backspace' && nextField != null) {
      return
    }
    if (keyCode != 'Backspace' && nextField != null) {
      nextField.nativeElement.focus()
    }
    if (keyCode == 'Backspace' && previousField != null) {
      previousField.nativeElement.focus();

      if (previousField.nativeElement.value) {
        let v = previousField.nativeElement.value;
        previousField.nativeElement.value = '';
        previousField.nativeElement.value = v;
      }
    }

    let formData = this.pinFormGroup.getRawValue();
    if (formData.input1) {
      var result = Object.keys(formData).map(k => formData[k] ?? '').join("");
      this.pinChange.emit(result)
    }
  }

  focus() {
    setTimeout(() => {
      // if (this.type == 2 && this.otp.length == 6 && this.length == 6) {
      //     this.otpField6.nativeElement.focus();
      // } else {
      //     this.otpField1.nativeElement.focus();
      // }
      this.otpField1.nativeElement.focus();
    });
  }

  resetOtp() {
    this.pinFormGroup.reset();
    if (this.length == 4) {
      this.form['input5'].disable()
      this.form['input6'].disable()
      this.otpField5 = null
    }
  }

}
