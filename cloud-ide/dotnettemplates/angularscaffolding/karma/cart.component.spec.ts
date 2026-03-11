import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Fake CartService
class MockCartService {
  private cart = [
    { id: 1, name: 'Laptop', price: 50000, quantity: 2 },
    { id: 2, name: 'Phone', price: 20000, quantity: 1 }
  ];

  getCartItems() {
    return [...this.cart];
  }

  updateCart(items: any[]) {}
  removeFromCart(index: number) {}
  clearCart() {}
}

// Fake ProductService
class MockProductService {
  increaseSales(id: number, qty: number) {
    return of(true);
  }
}

// Fake Router
class RouterStub {
  navigate(commands: any[]) {}
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as unknown as MockCartService;
    fixture.detectChanges(); // triggers ngOnInit
  });

  // ✅ Test 1: Component creation
  fit('Frontend_CartComponent_should_create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Cart should load items on init
  fit('Frontend_CartComponent_should_load_cart_items_on_init', () => {
    expect((component as any).cartItems.length).toBe(2);
    expect((component as any).cartItems[0].name).toBe('Laptop');
  });

  // ✅ Test 3: Total calculation
  fit('Frontend_CartComponent_should_calculate_total_correctly', () => {
    const total = (component as any).getTotal();
    expect(total).toBe(50000 * 2 + 20000 * 1); // 120000
  });
});
