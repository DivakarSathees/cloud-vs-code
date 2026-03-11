import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginStateService } from '../../services/login-state.service';

// Fake Router
class RouterStub {
  navigate(commands: any[]) {}
}

// Fake LoginStateService
class MockLoginStateService {
  setLoginStatus(status: boolean) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: LoginStateService, useClass: MockLoginStateService }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  // ✅ Test 1: Component creation
  fit('Frontend_LoginComponent_should_create_LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Form should initialize with empty values
  fit('Frontend_LoginComponent_should_initialize_form_with_empty_values', () => {
    const form = (component as any).loginForm;
    expect(form).toBeDefined();
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['password'].value).toBe('');
    expect(form.controls['role'].value).toBe('');
  });

  // ✅ Test 3: onSubmit should not submit if form is invalid
  fit('Frontend_LoginComponent_should_not_submit_form_if-invalid', () => {
    (component as any).onSubmit();
    expect((component as any).submitted).toBeTrue();
    expect((component as any).loginForm.invalid).toBeTrue();
  });
});
