import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ✅ Service creation
  fit('Frontend_UserService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Register user
  fit('Frontend_UserService_should_register_user', () => {
    const mockUser: User = { username: 'test', email: 'test@example.com', password: '123456' };

    (service as any).register(mockUser).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(service['baseUrl'] + '/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  // ✅ Login user
  fit('Frontend_UserService_should_login_user', () => {
    const email = 'test@example.com';
    const password = '123456';

    (service as any).login(email, password).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(service['baseUrl'] + `/login?email=${email}&password=${password}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
