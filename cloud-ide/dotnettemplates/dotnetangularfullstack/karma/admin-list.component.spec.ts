import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdminListComponent } from './admin-list.component';
import { ProductService, Product } from '../../services/product.service';

// Fake Router
class RouterStub {
  navigate(commands: any[]) {}
}

// Fake ProductService
class MockProductService {
  private mockProducts: Product[] = [
    { id: 1, name: 'Laptop', description: '', price: 50000, stock: 10, salesCount: 50, disabled: false },
    { id: 2, name: 'Phone', description: '', price: 20000, stock: 15, salesCount: 80, disabled: false }
  ];

  getProducts() {
    return of(this.mockProducts);
  }
}

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  let router: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule], // ✅ Important for ngModel
      declarations: [AdminListComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as unknown as RouterStub;
    fixture.detectChanges(); // ngOnInit
  });

  fit('Frontend_AdminListComponent_should_create_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_AdminListComponent_should_load_products_on_init', () => {
    expect((component as any).products.length).toBe(2);
    expect((component as any).filteredProducts.length).toBe(2);
  });

  fit('Frontend_AdminListComponent_should_navigate_to_add_product', () => {
    spyOn(router, 'navigate');
    (component as any).addProduct();
    expect(router.navigate).toHaveBeenCalledWith(['/adminform/add']);
  });
});
