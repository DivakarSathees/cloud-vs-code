import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ProfileComponent]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    // ✅ Mock currentUser before detectChanges
    const mockUser = {
      id: 1,
      username: 'Test User',
      email: 'test@example.com',
      password: '123456',
      role: 'user'
    };
    component['currentUser'] = mockUser;
    component['initForms'](mockUser); // initialize all formGroups

    fixture.detectChanges(); // Now template has valid formGroups
  });

  fit('Frontend_profileComponent_should_be_created', () => {
    expect(component).toBeTruthy();
  });
});
