import { FormControl } from '@angular/forms';

export class CustomValidators {
  static fullNameValidator(maxlength) {
    return (control: FormControl) => {
      const fullName = control.value;
      if (fullName) {
        if (fullName.length > maxlength) {
          return {
            maxlength: true,
          };
        } else {
          // const re = new RegExp('^([a-zA-Z]+ )+[a-zA-Z]+$|^[a-zA-Z]+$');
          const re = new RegExp('^[a-zA-Z ]+$');
          if (!re.test(fullName)) {
            return {
              pattern: true,
            };
          }
        }
      }
      return null;
    };
  }

  static completeNameValidator(maxlength) {
    return (control: FormControl) => {
      const fullName = control.value;
      if (fullName) {
        if (fullName.length > maxlength) {
          return {
            maxlength: true,
          };
        } else {
          const re = new RegExp(/^[A-Za-z]+ [A-Za-z\s]+ [A-Za-z\s]+$/);
          if (!re.test(fullName)) {
            return {
              pattern: true,
            };
          }
        }
      }
      return null;
    };
  }

  static nameValidator(maxlength) {
    return (control: FormControl) => {
      const fullName = control.value;
      if (fullName) {
        if (fullName.length > maxlength) {
          return {
            maxlength: true,
          };
        } else {
          const re = new RegExp(/^[A-Za-z\s]+$/);
          if (!re.test(fullName)) {
            return {
              pattern: true,
            };
          }
        }
      }
      return null;
    };
  }

  static dropDownValidator() {
    return (control: FormControl) => {
      const fullName = control.value;
      if (fullName && typeof fullName == 'string') {
        if (fullName.toLowerCase() == 'select') {
          return {
            select: true,
          };
        }
      }
      return null;
    };
  }

  static panValidator(control: FormControl) {
    const pan = control.value;
    if (pan) {
      if (pan.length > 10) {
        return {
          maxlength: true,
        };
      } else {
        let re = new RegExp(/^[A-Z]{3}[P][A-Z][0-9]{4}[A-Z]$/);
        if (pan.length <= 3) {
          re = new RegExp(/^[A-Z]*$/);
        } else if (pan.length <= 4) {
          re = new RegExp(/^[A-Z]{3}[P]$/);
        } else if (pan.length <= 5) {
          re = new RegExp(/^[A-Z]{3}[P][A-Z]$/);
        } else if (pan.length <= 9) {
          re = new RegExp(/^[A-Z]{3}[P][A-Z][0-9]*$/);
        }
        if (!re.test(pan)) {
          return {
            pattern: true,
          };
        }
      }
    }
    return null;
  }

  static addressValidator(maxlength) {
    return (control: FormControl) => {
      const address = control.value;
      const re = new RegExp(/^[0-9a-zA-Z.,;:\[\](){}\/\\'\-\s]*$/);

      if (address) {
        if (address.length > maxlength) {
          return {
            maxlength: true,
          };
        } else if (!re.test(address)) {
          return {
            pattern: true,
          };
        }
      }
      return null;
    };
  }

  static postalCodeValidator(control: FormControl) {
    const postal = control.value;
    const re = new RegExp(/^[0-9]{6}$/);
    if (postal) {
      if (postal.length > 6) {
        return {
          maxlength: true,
        };
      } else if (!re.test(postal)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static mobileValidator(control: FormControl) {
    const mobile = control.value;
    const re = new RegExp(/^[6-9]{1}[0-9]{9}$/);
    if (mobile) {
      if (mobile.length > 10) {
        return {
          maxlength: true,
        };
      } else if (!re.test(mobile)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static aadhaarValidator(control: FormControl) {
    const mobile = control.value;
    const re = new RegExp(/^[0-9]{12}$/);
    if (mobile) {
      if (mobile.length > 12) {
        return {
          maxlength: true,
        };
      } else if (!re.test(mobile)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static passportValidator(control: FormControl) {
    const mobile = control.value;
    const re = new RegExp(/^[A-Z][0-9]{7}$/);
    if (mobile) {
      if (mobile.length > 8) {
        return {
          maxlength: true,
        };
      } else if (!re.test(mobile)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static voterIdValidator(control: FormControl) {
    const mobile = control.value;
    const re = new RegExp(/^[a-zA-Z]{3}([0-9]){7,9}$/);
    if (mobile) {
      if (mobile.length > 12) {
        return {
          maxlength: true,
        };
      } else if (!re.test(mobile)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static uPIValidator(control: FormControl) {
    const upi = control.value;
    const re = new RegExp(
      /^[a-zA-Z0-9]([a-zA-Z0-9_-]|(\.(?!\.)))+[a-zA-Z0-9]\@([a-zA-Z])+$/
    );
    if (upi) {
      if (upi.length > 255) {
        return {
          maxlength: true,
        };
      } else if (!re.test(upi)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static emailValidator(control: FormControl) {
    const email = control.value;
    const re = new RegExp(
      /^[a-zA-Z0-9]([a-zA-Z0-9_-]|(\.(?!\.)))+[a-zA-Z0-9]\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/
    );
    if (email) {
      if (email.length > 255) {
        return {
          maxlength: true,
        };
      } else if (!re.test(email)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static accountNoValidator(control: FormControl) {
    const accountNo = control.value ? control.value : 0;
    if (!accountNo) {
      return {
        required: true,
      };
    } else {
      const re = new RegExp(/^[0-9]{8,18}$/);
      if (!re.test(accountNo)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static ifscValidator(control: FormControl) {
    const ifscCode = control.value;
    if (!ifscCode) {
      return {
        required: true,
      };
    } else if (ifscCode.length < 11) {
      return {
        minLength: true,
      };
    } else {
      var re = new RegExp(/^[a-zA-z0-9]{4}[0]{1}[a-zA-z0-9]{6}$/);
      if (!re.test(ifscCode)) {
        return {
          pattern: true,
        };
      }
    }
    return null;
  }

  static selectValidator(control: FormControl) {
    const selector = control.value;
    if (!selector || selector < 0) {
      return {
        required: true,
      };
    }
    return null;
  }

  static minAmount(minAmount) {
    return (control: FormControl) => {
      const enteredAmount = control.value;

      if (enteredAmount) {
        if (parseFloat(enteredAmount) < parseFloat(minAmount)) {
          return {
            min: true,
          };
        }
      }
      return null;
    };
  }
}
