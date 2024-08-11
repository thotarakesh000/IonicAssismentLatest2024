import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IonInput } from "@ionic/angular";

@Directive({
  selector: '[numberOnly]',
  inputs: ['length', 'cropZero'],
})
export class NumberOnlyDirective {

  private length: number = 10;
  private cropZero: boolean;
  private inputEl;

  constructor(
    private ionInput: IonInput,
    private control: NgControl) {
    this.ionInput.getInputElement().then((inp) => {
      this.inputEl = inp;
    });
    this.cropZero = true;
  }
  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initalValue = this.inputEl.value;
    let newValue = initalValue;
    var re = new RegExp('[\!\*\~\`\=]', "g");
    newValue = newValue.replace(re, '');
    if (this.cropZero) {
      newValue = initalValue.replace(/^0(0+)?/g, '0');
    }
    newValue = newValue.replace(/[^0-9]*/g, '');

    if (this.length && newValue.length > this.length) {
      newValue = newValue.substring(0, this.length)
    }
    this.inputEl.value = newValue;
    this.control?.control?.setValue(newValue);

    if (initalValue !== this.inputEl.value) {
      event.stopPropagation();
    }
  }
  @HostListener('keyup', ['$event']) onKeyPressUp(event: { srcElement: { nextElementSibling: { focus: () => void; }; previousElementSibling: { focus: () => void; }; }; keyCode: number; }) {
    if (this.inputEl.value.length >= this.length) {
      if (event.srcElement.nextElementSibling) {
        event.srcElement.nextElementSibling.focus();
      }
    }
    if (event.keyCode == 8 && event.srcElement.previousElementSibling) {
      event.srcElement.previousElementSibling.focus();
    }
  }
}
