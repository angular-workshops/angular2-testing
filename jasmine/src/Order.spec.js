describe('Order', function() {
  var order, customer;

  beforeEach(function() {
    customer = new Customer();
    order = new Order(customer);
  });

  describe('addItem(name, cost)', function() {
    it('should not discount unpreferred customers', function() {
    });

    it('should give preferred customers a 10% discount', function() {
    });
  });
});
