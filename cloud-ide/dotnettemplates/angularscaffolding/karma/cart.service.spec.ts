import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    // Clear localStorage before each test
    // localStorage.clear();
  });

  // ✅ Test 1: Service creation
  fit('Frontend_CartService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test 2: Add item to cart
  fit('Frontend_CartService_should_add_an_item_to_the_cart', () => {
    const product = { id: 1, name: 'Laptop', price: 50000 };
    (service as any).addToCart(product);
    const items = (service as any).getCartItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(1);
    expect(items[0].name).toBe('Laptop');
  });

  // ✅ Test 3: Clear cart should remove all items
  fit('Frontend_CartService_should_clear_the_cart', () => {
    const product = { id: 1, name: 'Laptop', price: 50000 };
    (service as any).addToCart(product);
    (service as any).clearCart();
    const items = (service as any).getCartItems();
    expect(items.length).toBe(0);
    expect((service as any).getCartCount()).toBe(0);
  });
});
