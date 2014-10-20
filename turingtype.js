
    TuringType.prototype.keys = 'qwertyuiop[]asdfghjklzxcvbnm,./;-='.split('');

    function TuringType(el, text, options) {
      var accuracy, interval, tag, _ref;
      this.el = el;
      this.text = text;
      this.options = options != null ? options : {};
      this.type = __bind(this.type, this);
      if (!(this instanceof TuringType)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(TuringType, arguments, function(){});
      }
      if (typeof this.el === 'string') {
        this.el = document.querySelector(this.el);
      }
      this.len = this.text.length;
      this.i = 0;
      _ref = this.options, accuracy = _ref.accuracy, interval = _ref.interval, this.callback = _ref.callback;
      this.accuracy = accuracy != null ? accuracy : this.accuracy;
      this.int = interval != null ? interval : this.int;
      if (tag = this.el.tagName.toLowerCase() === 'textarea' || tag === 'input') {
        this.attr = 'value';
        this.el.focus();
      } else {
        this.attr = 'innerText';
      }
      this.type();
    }

    TuringType.prototype.type = function() {
      var _this = this;
      if (this.i === this.len) {
        return typeof this.callback === "function" ? this.callback() : void 0;
      }
      if (rand() > this.accuracy) {
        this.el[this.attr] += this.keys[floor(rand() * this.keys.length)];
        return this.timer = setTimeout(function() {
          _this.el[_this.attr] = _this.text.slice(0, _this.i);
          return _this.timer = setTimeout(_this.type, rand() * _this.int + _this.int * .8);
        }, this.int * 1.5);
      } else {
        this.el[this.attr] += this.text[this.i++];
        return this.timer = setTimeout(this.type, (function() {
          var t;
          t = rand() * _this.int + _this.int * .1;
          if (_this.text[_this.i] === ' ') {
            t += rand() * _this.int;
          }
          if (_this.text[_this.i] === '.' || _this.text[_this.i] === ',') {
            t += rand() * _this.int * 3;
          }
          if (rand() > .97) {
            t += _this.int * 2;
          }
          if (rand() > .95) {
            t += _this.int;
          }
          return t;
        })());
      }
    };

    TuringType.prototype.pause = function() {
      clearTimeout(this.timer);
      return this.el[this.attr];
    };

    return TuringType;

  })();

}).call(this);
