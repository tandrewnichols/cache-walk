describe 'cache-walk', ->
  Given -> @foo = __dirname + '/fixtures/foo.js'
  Given -> @bar = __dirname + '/fixtures/bar.js'
  Given -> @quux = __dirname + '/fixtures/baz/quux.js'
  Given -> @hello = __dirname + '/fixtures/baz/hello.js'
  Given -> @world = __dirname + '/fixtures/baz/world.js'
  afterEach ->
    delete require.cache[@foo]
    delete require.cache[@bar]
    delete require.cache[@quux]
    delete require.cache[@hello]
    delete require.cache[@world]
  Given -> @subject = require '../lib/cache-walk'

  describe '.get', ->
    context 'nothing in cache', ->
      When -> @files = @subject.get('./fixtures/foo')
      Then -> @files.should.eql []
      
    context 'with a relative path', ->
      Given -> require('./fixtures/foo')
      When -> @files = @subject.get('./fixtures/foo')
      Then -> @files.should.eql [@foo, @bar, @quux, @hello, @world]

    context 'with an absolute path', ->
      Given -> require('./fixtures/foo')
      When -> @files = @subject.get(__dirname + '/fixtures/foo')
      Then -> @files.should.eql [@foo, @bar, @quux, @hello, @world]

  describe '.walk', ->
    Given -> @files = []
    Given -> @collector = (file) => @files.push(file)

    context 'nothing in cache', ->
      When -> @subject.walk('./fixtures/foo', @collector)
      Then -> @files.should.eql []
      
    context 'with a relative path', ->
      Given -> require('./fixtures/foo')
      When -> @subject.walk('./fixtures/foo', @collector)
      Then -> @files.should.eql [@foo, @bar, @quux, @hello, @world]

    context 'with an absolute path', ->
      Given -> require('./fixtures/foo')
      When -> @subject.walk(__dirname + '/fixtures/foo', @collector)
      Then -> @files.should.eql [@foo, @bar, @quux, @hello, @world]
