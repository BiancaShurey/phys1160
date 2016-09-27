// uses some code from https://github.com/simonsarris/Canvas-tutorials/blob/master/shapes.js

// Constructor for Techniques objects to hold data.
function Technique(freqmin, freqmax, durmin, durmax, fill, fills, filln, name,tech,ctx) {
  this.freqmin = freqmin || 0;
  this.freqmax = freqmax || freqmin;
  this.durmin = durmin || 0;
  this.durmax = durmax || durmin;
  if ((durmax-durmin)<=5){
    var grd=ctx.createLinearGradient(0,0,170,0);
    grd.addColorStop(0, "white");
    grd.addColorStop("0.5", fill);
    grd.addColorStop(1, "white");
    this.fill=grd || "#AAAAAA";
    var gradientS=ctx.createLinearGradient(0,0,170,0);
    gradientS.addColorStop(0,"white");
    gradientS.addColorStop("0.5",fills);
    gradientS.addColorStop(1,"white");
    this.fillSelected=gradientS || "#AAAAAA";
    var gradientN=ctx.createLinearGradient(0,0,170,0);
    gradientN.addColorStop(0,"white");
    gradientN.addColorStop("0.5",filln);
    gradientN.addColorStop(1,"white");
    this.fillNotSelected=gradientN || "#AAAAAA";
  } else if ((freqmax-freqmin)<=5){
    var gradient=ctx.createLinearGradient(0,0,0,170);
    gradient.addColorStop(0,"white");
    gradient.addColorStop("0.5",fill);
    gradient.addColorStop(1,"white");
    this.fill=gradient || "#AAAAAA";
    var gradientS=ctx.createLinearGradient(0,0,0,170);
    gradientS.addColorStop(0,"white");
    gradientS.addColorStop("0.5",fills);
    gradientS.addColorStop(1,"white");
    this.fillSelected=gradientS || "#AAAAAA";
    var gradientN=ctx.createLinearGradient(0,0,0,170);
    gradientN.addColorStop(0,"white");
    gradientN.addColorStop("0.5",filln);
    gradientN.addColorStop(1,"white");
    this.fillNotSelected=gradientN || "#AAAAAA";   
  }else{
    this.fill = fill || '#AAAAAA';
    this.fillSelected= fills || "#BBBBBB";
    this.fillNotSelected= filln || "#CCCCCC";
  }
  this.name=name;
  this.tech=tech;
}

Technique.prototype.draw = function(ctx) {
  ctx.fillStyle=this.fill;
  ctx.strokeStyle=this.fillSelected;
  ctx.strokeRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
  ctx.fillRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
}

Technique.prototype.drawN = function(ctx) {
  ctx.fillStyle=this.fillNotSelected;
  ctx.strokeStyle=this.fillSelected;
  ctx.strokeRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
  ctx.fillRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
}

Technique.prototype.drawS = function(ctx) {
  ctx.fillStyle=this.fillSelected;
  ctx.strokeStyle=this.fillSelected;
  ctx.strokeRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
  ctx.fillRect(scaleXCP(this.durmin),scaleYCP(this.freqmin),(scaleXCP(this.durmax)-
  scaleXCP(this.durmin)),(scaleYCP(this.freqmax)-scaleYCP(this.freqmin)));
}

Technique.prototype.contains = function(mx, my) {
  mx=scaleXPC(mx);
  my=scaleYPC(my);
  return  ((this.durmin <= mx) && (mx <= this.durmax ) &&
          (this.freqmin <= my) && (my <= this.freqmax));
}


function CanvasState(canvas) {
  // **** setup ****

  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  canvas.style.width = this.width*2;
  canvas.style.height = this.height*2;
  this.ctx = canvas.getContext('2d');
  ctx=this.ctx;
  // fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }

  // **** Keep track of state! ****
  var faradic = new Technique(30,100,100, 1000,"rgba(141,70,120,0.5)","rgb(65,32,55)","rgba(218,107,184,0.5)","faradic", "Faradic",ctx);
  var tens = new Technique(2,200,10,400,"rgba(90,54,201,0.5)","rgb(33,20,73)", "rgba(142,119,210,0.5)","TENS","TENS".ctx);
  var HVGS = new Technique(2,100,100,200,"rgba(83,94,55,0.5)","rgb(55,69,20)","rgba(128,145,85,0.5)","HVGS","HVGS",ctx);
  var hrtens = new Technique(80,120,50,50,"rgba(141,43,171,0.5)","rgb(99,30,120)","rgba(221,136,247,0.5)","TENS","HR TENS",ctx);
  var lrtens = new Technique(2,5,300,999999,"rgba(81,138,97)","rgb(36,61,43)","rgba(125,214,150,0.5)","TENS","LR TENS",ctx);
  var bitens = new Technique(125,250,200,250,"rgba(80,73,174,0.5)","rgb(57,52,123)","rgba(115,105,250,0.5)","TENS","BI TENS",ctx);
  var russian = new Technique(2500,2500,100,200,"rgba(146,74,25,0.5)","rgb(95,48,16)","rgba(164,113,38,0.5)","Russian","Russian",ctx);
  var interferential = new Technique(4000,4250,10,400,"rgba(69,28,106,0.5)","rgb(36,15,55)","rgba(145,103,182,0.5)","interferential","interferential",ctx);
  var FESinnervated = new Technique(30,50,100,100,"rgba(170,40,46,0.5)","rgb(119,28,32)","rgba(184,99,103,0.5)","FES", "FES innervated",ctx);
  var FESdenervated = new Technique(0.5,1,100000,500000,"rgba(81,76,135,0.5)","rgb(50,47,84)","rgba(127,119,211,0.5)","FES", "FES denervated",ctx);
  // var ESmusclestrength = new Technique(35,50,100,300,"rgba(111,63,44,0.5)","rgb(60,34,24)","rgba(135,106,94,0.5)","other","Electrical Stimulation for Muscle Strength");
  // var motornerve = new Technique(30,50,10,200,"rgba(159,44,122,0.5)","rgb(108,30,83)","rgba(175,101,151,0.5)","other", "Motor Nerve");
  // var nocireceptors = new Technique(0,25,100,999999,"rgba(83,78,29,0.5)","rgb(58,56,36)","rgba(134,130,83,0.5)","other", "Nocireceptors");
  // var muscletissue = new Technique(1,2,300000,500000,"rgba(134,56,82,0.5)","rgb(83,35,51)","rgba(154,111,125,0.5)","other","Muscle Tissue");
  var sensenerve = new Technique(100,100,10,200,"rgba(64,83,105,0.5)","rgb(33,43,54)","rgba(56,114,181,0.5)","sensenerve", "Sense Nerve",ctx);
  var galvanic = new Technique(scaleYPC(255),4250,500000,999999,"rgba(134,134,134,0.5)","rgb(83,83,83)","rgba(210,210,210,0.5)","Galvanic", "Galvanic",ctx);

  this.valid = false; // when set to false, the canvas will redraw everything
  this.techniques = [hrtens,bitens,russian,FESinnervated,sensenerve,
    HVGS,faradic,interferential,FESdenervated,lrtens,tens,galvanic];  // the collection of things to be drawn
  // the current selected object.
  this.selection = null;
  this.clicked = false; //checks if an item has been clicked
  this.offx = 0; // See mousedown and mousemove events for explanation
  this.offy = 0;

  //refernce to canvas
  var myState = this;
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

  canvas.addEventListener('mousemove', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
    var techniques = myState.techniques;
    var l = techniques.length;
    for (var i = l-1; i >= 0; i--) {
      if (techniques[i].contains(mx, my)) {
        var mySel = techniques[i];
        document.getElementById("Technique").innerHTML=mySel.tech;
        myState.selection = mySel;
        myState.valid = false;
        document.getElementById("rangedur").innerHTML="Duration (&#181s): "+mySel.durmin+"<="+Math.round(scaleXPC(mx))+"<="+mySel.durmax;
        document.getElementById("rangefreq").innerHTML="Frequency (Hz): "+mySel.freqmin+"<="+Math.round(scaleYPC(my))+"<="+mySel.freqmax;
        return;
      }
    }
    if (myState.selection) {
      myState.selection = null;
      myState.clicked = false;
      document.getElementById("Technique").innerHTML="";
      myState.valid = false; // Need to clear the old selection border
    }
  }, false);
  setInterval(function() { myState.draw(); }, 30);
}

// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  ct=element.getContext('2d');

  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  offsetX += this.stylePaddingLeft + this.styleBorderLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop;
  mx = e.clientX - offsetX+15;
  my = e.clientY - offsetY;
  //ct.fillRect(mx-2.5,my-2.5,5,5,"red");
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}

CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;
    var techniques = this.techniques;
    this.clear();
    drawXAxes(this.ctx);
    drawYAxes(this.ctx);
    var l = techniques.length;
    // draw all techniques
    if (this.selection==null){
      for (var i = l-1; i >= 0; i--) {
        techniques[i].draw(ctx);
        var l = techniques.length;
        el=document.getElementById(techniques[i].name);
        el.style.display="none";
        }
    } else {
      for (var i = l-1; i >= 0; i--) {
        el=document.getElementById(techniques[i].name);
        if (techniques[i]==this.selection){
          techniques[i].drawS(ctx);
          el.style.display="block";
        }else{
          techniques[i].drawN(ctx);
      }
      }
    }
  }
}


function drawXAxes(ctx){
    ctx.beginPath();
    ctx.moveTo(25,255);
    ctx.lineTo(625,255);
    ctx.font="10px Arial";
    ctx.fillStyle='black';
    for (var i=scaleXPC(25); i<scaleXPC(625); i=i*2){
      ctx.moveTo(scaleXCP(i),255);
      ctx.lineTo(scaleXCP(i),265);
      if (i<1000){
      ctx.fillText(i,scaleXCP(i)-5,270);
    }else{
      ctx.fillText(Math.round(i/1000)+"k",scaleXCP(i)-5,270);
    }
    }
    ctx.moveTo(625,255);
    ctx.lineTo(620,250);
    ctx.moveTo(625,255);
    ctx.lineTo(620,260);
    ctx.closePath();
    ctx.stroke();
}

function drawYAxes(ctx){
    ctx.beginPath();
    ctx.moveTo(25,255);
    ctx.lineTo(25,15);
    for (var i=0.5; i<scaleYPC(15); i=i*2){
        ctx.moveTo(25,scaleYCP(i));
        ctx.lineTo(5,scaleYCP(i));
        ctx.fillText(i,0,scaleYCP(i)-1);
    }
    ctx.moveTo(25,15);
    ctx.lineTo(20,20);
    ctx.moveTo(25,15);
    ctx.lineTo(30,20);
    ctx.closePath();
    ctx.stroke();
}

function scaleXCP(xpos){
  console.log(xpos);
  xpos=Math.log2(xpos)*31+25;
  return(xpos);
}

function scaleXPC(xpos){
  xpos=Math.pow(2,(xpos-25)/31);
  return(xpos);
}

function scaleYCP(ypos){
  ypos=235-Math.log2(ypos)*(4300/270);
  return(ypos);
}

function scaleYPC(ypos){
  ypos=Math.pow(2,((-27/430)*(ypos-235)));
  return(ypos);
}

function init() {
  var s = new CanvasState(document.getElementById('canvas'));
  s.draw();
}
