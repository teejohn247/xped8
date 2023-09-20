import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordValidators } from '../../services/utils/password-validators';
import { AuthenticationService } from '../../services/utils/authentication.service';
import { NotificationService } from '../../services/utils/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  carouselItems = [
    {
      label: "HR",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/it-was-late-night-totally-worth-it-shot-group-young-businesspeople-looking-excited-while-using-laptop-during-late-night-work-scaled.jpg",
      caption: "Drive your Organizational Success with Our HR Module"
    },
    {
      label: "Project Management",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/flat-lay-people-working-office-scaled.jpg",
      caption: "Empowering Project Management Excellence"
    },
    {
      label: "Supply Chain",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/hand-with-support-gears-isolated-white-background-1-scaled.jpg",
      caption: "Optimizing Your Supply Chain Management Processes"
    },
    {
      label: "CRM",
      image: "https://silo-inc.com/wp-content/uploads/2023/05/cheerful-call-center-operators-during-working-process-1-scaled.jpg",
      caption: "Streamline Customer Relationship with Our CRM Module"
    }
  ]

  loginInfo = {
    email: "",
    password: ""
  }
  // loginEmail: string;
  // loginPassword: string;

  showPassword = false;
  submitted = false;
  existingUser = true;

  selectedIndex = 0;
  slideInterval = 5000;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&:])"), {
          requiresSpecialChars: true
        })
      ])
    )
  })

  constructor(private auth: AuthenticationService, private route: Router, private notify: NotificationService) {
    this.autoSlideImages();
  }

  ngOnInit(): void {
    
  }

  //CAROUSEL SLIDE FUNCTIONS
  selectSlide(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.carouselItems.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.carouselItems.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if(this.loginForm.valid) {
      if(this.existingUser) {
        this.auth.login(this.loginForm.value).subscribe({
          next: res => {
            console.log(res);
            if(res.status == 200) {
              this.route.navigate(['/app']);
            }
          },
          error: err => {
            console.log(err)
            //this.notify.showError("res.message");
          }          
        })
      }

      else {
        this.auth.signup(this.loginForm.value).subscribe({
          next: res => {
            console.log(res);
            if(res.status == 200) {
              this.route.navigate(['/app']);
            }
          },
          error: err => {
            console.log(err)
          }
        })      
      }
    }    
  }

  get f() {
    return this.loginForm.controls;
  }

  get passwordValid() {
    return this.loginForm.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.loginForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.loginForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.loginForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.loginForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.loginForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.loginForm.controls["password"].hasError("requiresSpecialChars");
  }



  

}
