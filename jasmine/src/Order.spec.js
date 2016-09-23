describe('Order', function() {
  var order, customer;

  beforeEach(function() {
    customer = new Customer();
    order = new Order(customer);
  });

  describe('addItem', function() {
    it('should not discount unpreferred customers', function() {
      spyOn(customer, 'isPreferred').and.returnValue(false)

      order.addItem('foos', 10);
      expect(order.getTotal()).toEqual(10);
    });

    it('should give preferred customers a 10% discount', function() {
      spyOn(customer, 'isPreferred').and.returnValue(true);

      order.addItem('foos', 10);
      expect(order.getTotal()).toEqual(9);
    });
  });
});
