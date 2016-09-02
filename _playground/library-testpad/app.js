
  var logpad = document.getElementById('log'),

  console = {
    log: function(str) {
      logpad.innerHTML += str + "<br>";
    }
  };

  function runCode(value) {
    logpad.innerText = "";
    var code = value.replace(/[\n]/g, '').replace(/<</g,"console.log(").replace(/;?>>/g,");");
    eval(code);

    delete keys[13];
    delete keys[17];
  }

  var keys = {};
  $('#code').keydown(function(e) {
    keys[e.which] = true;
    if(keys[13] && keys[17]) runCode(this.value);
  });

  $('#code').keyup(function(e) {
    delete keys[e.which];
  });

  $(document).keyup(function(e) {
    delete keys[e.which];
  });
