describe('Model.State', function(){

  beforeEach(function() {
    _.extend(Backbone.Model.prototype, BackboneModelState);
  });
  
  it('should extend Backbone', function(){
    expect(Backbone.Model.prototype.store).to.be.a('function');
    expect(Backbone.Model.prototype.restore).to.be.a('function');
  });

  it('should store / restore correct', function() {
    var model = new Backbone.Model();
    var param = {'name': 22};
    model.set('myParam1', 'val1');
    model.set('myParam2', 'val2');
    model.set('myParam3', param);

    model.store('test1');
    model.clear();

    model.set('myParam11', 'val11');
    model.set('myParam21', 'val21');
    model.set('myParam31', param);

    model.store('test2');

    model.restore('test1');

    expect(model.get('myParam1')).to.be.equal('val1');
    expect(model.get('myParam2')).to.be.equal('val2');
    expect(model.get('myParam3')).to.be.equal(param);

    expect(model.get('myParam11')).to.be.equal(undefined);
    expect(model.get('myParam21')).to.be.equal(undefined);
    expect(model.get('myParam31')).to.be.equal(undefined);

    model.restore('test2');

    expect(model.get('myParam1')).to.be.equal(undefined);
    expect(model.get('myParam2')).to.be.equal(undefined);
    expect(model.get('myParam3')).to.be.equal(undefined);

    expect(model.get('myParam11')).to.be.equal('val11');
    expect(model.get('myParam21')).to.be.equal('val21');
    expect(model.get('myParam31')).to.be.equal(param);

  });

  it('should trigger correct events', function() {
    var model = new Backbone.Model();
    model.set('myParam1', 'val123');
    model.store('test');
    model.set('myParam1', 'v');
    model.set('myParam2', 'z');
    model.store('test2');
    sinon.spy(model, 'trigger');

    expect(model.trigger.calledWith('change')).to.be.equal(false);

    model.restore('test');

    expect(model.trigger.callCount).to.be.equal(5);
    expect(model.trigger.calledWith('change')).to.be.equal(true);
    expect(model.trigger.calledWith('change:myParam1')).to.be.equal(true);
    expect(model.trigger.calledWith('change:myParam2')).to.be.equal(true);
    expect(model.get('myParam2')).to.be.equal(undefined);
    expect(model.get('myParam1')).to.be.equal('val123');

    sinon.restore(model, 'trigger');
    sinon.spy(model, 'trigger');
    model.restore('test2', {silent: true});
    expect(model.trigger.callCount).to.be.equal(0);
  });

  it('should not throw exception if something is not correct', function() {
    var model = new Backbone.Model();
    model.restore('test');
  });

  it('should have clearState', function() {
    var model = new Backbone.Model();
    model.set('name', 'Artyom');
    model.store('my name');
    model.unset('name');

    expect(model.get('name')).to.be.equal(undefined);
    model.clearState('my name');
    model.restore('my name');
    expect(model.get('name')).to.be.equal(undefined);

    model.set('name', 'Artyom');
    model.store('my name1');

    model.set('name', 'Artyom2');
    model.store('my name2');

    model.unset('name');

    model.clearState();

    model.restore('my name1');
    expect(model.get('name')).to.be.equal(undefined);

    model.restore('my name2');
    expect(model.get('name')).to.be.equal(undefined);
  });
});