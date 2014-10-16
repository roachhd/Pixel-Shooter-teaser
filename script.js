
(function() {
  
  // vars
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var size = Math.ceil(windowWidth/6);
  var points = [];
  var squares = [];
  var nPoints = 7*(Math.ceil(windowHeight/size)+1);
  var nSquares = 6*Math.ceil(windowHeight/size);
  var x = 0, y = 0;
  
  function init() {
    // set up the points
    for(var i = 0; i <= nPoints; i++) {
      var p = new Point(x,y);
      console.log(i);
      if((i+1)%7 == 0) {
        x = 0;
        y = y + size;
      } else {
        x = x + size;
      }
      points.push(p);
    }

    // set up the squares
    for(var i = 0, p=0; i < nSquares; i++, p++) {
      var sPoints = [
        points[p], points[p+1], points[p+7+1], points[p+7], 
      ];
      var s = new Square(sPoints, i);
      squares.push(s);
      if((i+1)%6 == 0) {
        p++;
      }
    }
    
    // let the fun begin    
    animate();
        
  }

  function animate() {
    for(var i = 0; i < squares.length; i++) {
      squares[i].update(i);
    }
    requestAnimationFrame(animate);
  }

  // Points & Squares
  function Point(x,y) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  function Square(ps, color) {
    var _this = this;

    // init
    this.points = ps;
    this.color = color;
    this.lightening = 50;
    this.offset = {
      x: _this.points[0].x,
      y: _this.points[0].y
    };
    createDiv();

    function createDiv() {
      _this.p1 = {
        x : (_this.points[0].x-_this.offset.x)+size*0.4,
        y : (_this.points[0].y-_this.offset.y)+size*0.4
      };
      _this.p2 = {
        x: (_this.points[1].x-_this.offset.x)+size*0.4,
        y: (_this.points[1].y-_this.offset.y)+size*0.4,
      };
      _this.p3 = {
        x: (_this.points[2].x-_this.offset.x)+size*0.4,
        y: (_this.points[2].y-_this.offset.y)+size*0.4,
      };
      _this.p4 = {
        x: (_this.points[3].x-_this.offset.x)+size*0.4,
        y: (_this.points[3].y-_this.offset.y)+size*0.4,
      };

      var shapeString = 'polygon('+_this.p1.x+'px '+_this.p1.y+'px, '+
        _this.p2.x+'px '+_this.p2.y+'px, '+
        _this.p3.x+'px '+_this.p3.y+'px, '+
        _this.p4.x+'px '+_this.p4.y+'px)';

      _this.div = document.createElement('div');
      document.body.appendChild(_this.div); 
      _this.div.style.width = size*1.8+'px';
      _this.div.style.height = size*1.8+'px';
      _this.div.style.backgroundColor = 'hsla('+Math.floor(_this.color*20)+',50%,'+_this.lightening+'%,1)';
      _this.div.style.shapeInside = shapeString;
      _this.div.style.webkitClipPath = shapeString;
      _this.div.style.webkitTransform = 'translate('+(_this.offset.x-size*0.4)+'px, '+(_this.offset.y-size*0.4)+'px)';
      _this.div.object = _this;
      _this.div.addEventListener('mouseover', mouseover);
      _this.div.addEventListener('mouseover', mouseout);
    }

    function mouseover(e) {
      if(e.target.object.active) return;

      e.target.object.active = true;
      for(var i = 0; i < points.length; i++) {
        if(points[i] != e.target.object.points[0] ||
          points[i] != e.target.object.points[1] ||
          points[i] != e.target.object.points[2] ||
          points[i] != e.target.object.points[3]) {
          TweenLite.to(points[i], 0.8, {x: points[i].originX, y: points[i].originY, ease: Elastic.easeOut});
        }
      }
      TweenLite.to(e.target.object, 0.4, {lightening: 85, ease: Sine.easeOut});  
      TweenLite.to(e.target.object.points[0], 0.8, {x: e.target.object.points[0].originX + Math.random()*size*-0.15, y: e.target.object.points[0].originY + Math.random()*size*-0.15, ease: Elastic.easeOut});
      TweenLite.to(e.target.object.points[1], 0.8, {x: e.target.object.points[1].originX + Math.random()*size*0.15, y: e.target.object.points[1].originY + Math.random()*size*-0.15, ease: Elastic.easeOut});
      TweenLite.to(e.target.object.points[2], 0.8, {x: e.target.object.points[2].originX + Math.random()*size*0.15, y: e.target.object.points[2].originY + Math.random()*size*0.15, ease: Elastic.easeOut});
      TweenLite.to(e.target.object.points[3], 0.8, {x: e.target.object.points[3].originX + Math.random()*size*-0.15, y: e.target.object.points[3].originY + Math.random()*size*0.15, ease: Elastic.easeOut});
    }

    function mouseout(e) {
      e.target.object.active = false;
      TweenLite.to(e.target.object, 0.8, {lightening: 50, ease: Elastic.easeOut});  
    }

    this.update = function(i) {
      _this.p1.x = (_this.points[0].x-_this.offset.x)+size*0.4;
      _this.p1.y = (_this.points[0].y-_this.offset.y)+size*0.4;
      _this.p2.x = (_this.points[1].x-_this.offset.x)+size*0.4;
      _this.p2.y = (_this.points[1].y-_this.offset.y)+size*0.4;
      _this.p3.x = (_this.points[2].x-_this.offset.x)+size*0.4;
      _this.p3.y = (_this.points[2].y-_this.offset.y)+size*0.4;
      _this.p4.x = (_this.points[3].x-_this.offset.x)+size*0.4;
      _this.p4.y = (_this.points[3].y-_this.offset.y)+size*0.4;

      var shapeString = 'polygon('+_this.p1.x+'px '+_this.p1.y+'px, '+
        _this.p2.x+'px '+_this.p2.y+'px, '+
        _this.p3.x+'px '+_this.p3.y+'px, '+
        _this.p4.x+'px '+_this.p4.y+'px)';
      _this.div.style.shapeInside = shapeString;
      _this.div.style.webkitClipPath = shapeString;
      _this.div.style.backgroundColor = 'hsla('+Math.floor(_this.color*20)+',50%,'+_this.lightening+'%,1)';
    };
  }
  
  init();

})();
