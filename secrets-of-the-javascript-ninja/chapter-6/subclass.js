(function() {
  var initializing = false,
      // 함수 직렬화 검사
      superPattern =  /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;

  // Object에 subClass() 메서드를 추가한다.
  Object.subClass = function(properties) {                           //#2
    var _super = this.prototype;

    // 상위 클래스의 인스턴스를 만든다.
    initializing = true;                                              //#3
    var proto = new this();                                           //#3
    initializing = false;                                             //#3

    // 프로퍼티들을 프로토타입에 복사한다.
    for (var name in properties) {                                    //#4
      // Check if we're overwriting an existing function
      proto[name] = typeof properties[name] == "function" &&
                    typeof _super[name] == "function" &&
                    superPattern.test(properties[name]) ?
          (function(name, fn) {                                        //#5
            return function() {
              var tmp = this._super;

              // Add a new ._super() method that is the same method
              // but on the super-class
              this._super = _super[name];

              // The method only need to be bound temporarily, so we
              // remove it when we're done executing
              var ret = fn.apply(this, arguments);
              this._super = tmp;

              return ret;
            };
          })(name, properties[name]) :
          properties[name];
    }

    // The dummy class constructor
    function Class() {                                                   //#6
      // All construction is actually done in the init method
      if (!initializing && this.init)
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = proto;                                             //#7

    // Enforce the constructor to be what we expect
    Class.constructor = Class;                                           //#8

    // And make this class extendable
    Class.subClass = arguments.callee;                                   //#9

    return Class;
  };
})();
