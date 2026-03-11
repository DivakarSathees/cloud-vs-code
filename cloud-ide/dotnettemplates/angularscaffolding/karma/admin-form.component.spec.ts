import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminFormComponent } from './admin-form.component';
import { ProductService } from '../../services/product.service';

describe('AdminFormComponent', () => {
  let component: AdminFormComponent;
  let fixture: ComponentFixture<AdminFormComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'updateProduct'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdminFormComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // ✅ Stub getProductById BEFORE component init
    (productServiceSpy as any).getProductById.and.returnValue(of({
      id: 1,
      name: 'Laptop',
      description: 'Gaming Laptop',
      price: 50000,
      stock: 10,
      salesCount: 2,
      image: 'fakeImage'
    }));

    fixture = TestBed.createComponent(AdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_AdminFormComponent_should_create_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_AdminFormComponent_should_load_product_on_init_when_id_is_present', () => {
    expect((productServiceSpy as any).getProductById).toHaveBeenCalledWith(1);
    expect((component as any).product.name).toBe('Laptop');
    expect((component as any).previewImage).toBe('fakeImage');
  });

  fit('Frontend_AdminFormComponent_should_show_alert_when_fields_are_invalid_on_update', () => {
    (component as any).product = { id: 1, name: '', description: '', price: 0, stock: 0, salesCount: 0, image: '' };
    (component as any).updateProduct();
    expect((productServiceSpy as any).updateProduct).not.toHaveBeenCalled();
  });

  fit('Frontend_AdminFormComponent_should_call_updateProduct_when_fields_are_valid', () => {
    const mockProduct = {
      id: 1,
      name: 'Phone',
      description: 'Smartphone',
      price: 20000,
      stock: 5,
      salesCount: 1,
      image: 'fakeImage'
    };

    (component as any).product = mockProduct;
    (productServiceSpy as any).updateProduct.and.returnValue(of(mockProduct));
    (component as any).updateProduct();
    expect((productServiceSpy as any).updateProduct).toHaveBeenCalledWith(1, mockProduct);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/adminlist']);
  });

  // fit('Frontend_AdminFormComponent_should_log_error_if_update_fails', () => {
  //   const mockProduct = {
  //     id: 1,
  //     name: 'Tablet',
  //     description: 'Android Tablet',
  //     price: 15000,
  //     stock: 3,
  //     salesCount: 0,
  //     image: 'fakeImage'
  //   };
  
  //   (component as any).product = mockProduct;
  
  //   // Simple successful observable
  //   (productServiceSpy as any).updateProduct.and.returnValue(of(mockProduct));
  //   (component as any).updateProduct();
  //   expect((productServiceSpy as any).updateProduct).toHaveBeenCalledWith(1, mockProduct);
  // });
});
