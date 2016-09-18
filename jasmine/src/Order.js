function Order(customer) {
  this.items = [];
  this.customer = customer;
}
Order.prototype.addItem = function(name, cost) {
  this.items.push({name:name, cost: this.customer.isPreferred() ? cost * 0.9 : cost });
};
Order.prototype.getTotal = function() {
  var sum = 0;
  for(var i=0; i < this.items.length; i++) {
    sum += this.items[i].cost;
  }
  return sum;
};
