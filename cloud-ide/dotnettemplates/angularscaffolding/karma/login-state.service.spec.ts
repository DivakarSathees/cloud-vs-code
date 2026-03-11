import { TestBed } from '@angular/core/testing';
import { LoginStateService } from './login-state.service';

describe('LoginStateService', () => {
  let service: LoginStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStateService);
  });

  // ✅ Test 1: Service creation
  fit('Frontend_LoginStateService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test 2: Should emit login status correctly
  fit('Frontend_LoginStateService_should_emit_login_status', (done: DoneFn) => {
    (service as any).loginStatus$.subscribe(status => {
      expect(status).toBeTrue();
      done();
    });

    (service as any).setLoginStatus(true); // Trigger emission
  });
});
