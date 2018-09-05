describe('DancingPickle', function() {

  var pickleDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    pickleDancer = new DancingPickle(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(pickleDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node blink', function() {
    sinon.spy(pickleDancer.$node, 'toggle');
    pickleDancer.step();
    expect(pickleDancer.$node.toggle.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(pickleDancer, 'step');
      expect(pickleDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(pickleDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(pickleDancer.step.callCount).to.be.equal(2);
    });
  });
});
