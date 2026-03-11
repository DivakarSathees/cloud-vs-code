import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

// Mock ProductService
class MockProductService {
  getProducts() {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product A', description: 'Desc A', price: 100, stock: 10, salesCount: 0 },
      { id: 2, name: 'Product B', description: 'Desc B', price: 200, stock: 5, salesCount: 0, disabled: true },
    ];
    return of(mockProducts);
  }
}

// Mock CartService
class MockCartService {
  addToCart(product: Product) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], // ✅ Include FormsModule
      declarations: [HomeComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: CartService, useClass: MockCartService }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as unknown as MockCartService;
    fixture.detectChanges();
  });

  fit('Frontend_HomeComponent_should_create', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_HomeComponent_should_load_products_on_init_and_filter_out_disabled', () => {
    (component as any).ngOnInit();
    expect((component as any).products.length).toBe(2);
    expect((component as any).filteredProducts.length).toBe(1);
  });

  fit('Frontend_HomeComponent_should_calculate_totalPages_correctly', () => {
    (component as any).itemsPerPage = 1;
    (component as any).applyFilters();
    expect((component as any).totalPages).toBe(1);
    expect((component as any).pages).toEqual([1]);
  });

  fit('Frontend_HomeComponent_should_reset_filters', () => {
    (component as any).searchTerm = 'test';
    (component as any).sortOrder = 'asc';
    (component as any).minPrice = 50;
    (component as any).maxPrice = 150;
    (component as any).resetFilters();
    expect((component as any).searchTerm).toBe('');
    expect((component as any).sortOrder).toBe('');
    expect((component as any).minPrice).toBeNull();
    expect((component as any).maxPrice).toBeNull();
  });

  fit('Frontend_HomeComponent_should_call_addToCart_on_CartService', () => {
    spyOn(cartService, 'addToCart');
    const product: Product = { id: 1, name: 'Product A', description: 'Desc A', price: 100, stock: 10, salesCount: 0 };
    (component as any).addToCart(product);
    expect((cartService as any).addToCart).toHaveBeenCalledWith(product);
  });
});
