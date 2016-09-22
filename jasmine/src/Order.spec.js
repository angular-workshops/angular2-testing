// this will be written up as demonstration. This is the finished code
describe('Order', function() {
  var order, customer;

  beforeEach(function() {
    customer = new Customer();
    order = new Order(customer);
  });

  it('unpreferred customers get no discount', function() {
    spyOn(customer, 'isPreferred').and.returnValue(false)

    order.addItem('foos', 10);
    expect(order.getTotal()).toEqual(10);
  });

  it('preferred customers get a 10% discount', function() {
    spyOn(customer, 'isPreferred').and.returnValue(true);

    order.addItem('foos', 10);
    expect(order.getTotal()).toEqual(9);
  });

});
