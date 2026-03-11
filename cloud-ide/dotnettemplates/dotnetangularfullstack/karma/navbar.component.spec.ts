import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { LoginStateService } from '../../services/login-state.service';
import { CartService } from '../../services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Fake Router
class RouterStub {
  navigate(commands: any[]) {}
}

// Fake LoginStateService
class MockLoginStateService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatus.asObservable();

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}

// Fake CartService
class MockCartService {
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  clearCart() { this.cartCount.next(0); }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: RouterStub;
  let loginState: MockLoginStateService;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: LoginStateService, useClass: MockLoginStateService },
        { provide: CartService, useClass: MockCartService }
      ]
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as unknown as RouterStub;
    loginState = TestBed.inject(LoginStateService) as unknown as MockLoginStateService;
    cartService = TestBed.inject(CartService) as unknown as MockCartService;

    // Clear localStorage before each test
    localStorage.clear();
    fixture.detectChanges();
  });

  // ✅ Test 1: Component creation
  fit('Frontend_NavbarComponent_should_create_NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Initial logged out state
  fit('Frontend_NavbarComponent_should_have_initial_state_with_cartCount_0_and_not_logged_in', () => {
    expect((component as any).cartCount).toBe(0);
    expect((component as any).isLoggedIn).toBeFalse();
    expect((component as any).isAdmin).toBeFalse();
  });

  // ✅ Test 3: Logout clears states and navigates
  fit('Frontend_NavbarComponent_should_logout_user_and_reset_states', () => {
  spyOn(router, 'navigate'); // Spy on router navigation

  // Set initial state
  localStorage.setItem('currentUser', JSON.stringify({ role: 'user' }));
  (component as any).isLoggedIn = true;
  (component as any).isAdmin = false;
  (component as any).cartCount = 5;

  // Call logout directly (no confirmation)
  (component as any).logout();

  // ✅ Assertions
  expect((component as any).isLoggedIn).toBeFalse();
  expect((component as any).isAdmin).toBeFalse();
  expect((component as any).cartCount).toBe(0);
  expect(router.navigate).toHaveBeenCalledWith(['/login']);
  expect(localStorage.getItem('currentUser')).toBeNull();
});


  // ✅ Test 4: Cancel logout does nothing
  // fit('Frontend_NavbarComponent_should_logout_user_and_reset_states', () => {
  //   spyOn(router, 'navigate'); // Spy on router navigation
  
  //   localStorage.setItem('currentUser', JSON.stringify({ role: 'user' }));
  //   (component as any).isLoggedIn = true;
  //   (component as any).isAdmin = false;
  //   (component as any).cartCount = 5;
  
  //   (component as any).logout(); // Logout always executes
  
  //   expect((component as any).isLoggedIn).toBeFalse();
  //   expect((component as any).isAdmin).toBeFalse();
  //   expect((component as any).cartCount).toBe(0);
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  //   expect(localStorage.getItem('currentUser')).toBeNull();
  // });
  
});
