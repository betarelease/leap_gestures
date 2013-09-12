console.log("show something new_gesture.js");

function moveFinger(Finger, posX, posY, posZ, dirX, dirY, dirZ) {
  Finger.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+dirX+"deg) rotateY(0deg) rotateZ("+dirZ+"deg)";
}

function moveSphere(Sphere, posX, posY, posZ, rotX, rotY, rotZ) {
  Sphere.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+rotX+"deg) rotateY(0deg) rotateZ(0deg)";
}

var fingers = {};
var spheres = {};
Leap.loop(function(frame) {
  var fingerIds = {};
  var handIds = {};
  if (frame.hands === undefined ) { 
    var handsLength = 0 
  } else {
    var handsLength = frame.hands.length;
  }

  for (var handId = 0, handCount = handsLength; handId != handCount; handId++) {
    var hand = frame.hands[handId];
    var posX = (hand.palmPosition.x*3);
    var posY = (hand.palmPosition.z*3)-200;
    var posZ = (hand.palmPosition.y*3)-400;
    var rotX = (hand.rotation.xBasis.z*90);
    var rotY = (hand.rotation.xBasis.y*90);
    var rotZ = (hand.rotation.xBasis.x*90);
    var sphere = spheres[hand.id];
    console.log(hand.rotation.y);
    if (!sphere) {
      var sphereDiv = document.getElementById("sphere").cloneNode(true);
          sphereDiv.setAttribute('id',hand.id);
          sphereDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
          document.getElementById('scene').appendChild(sphereDiv);
          spheres[hand.id] = hand.id;
    } else {
      var sphereDiv =  document.getElementById(hand.id);
      if (typeof(sphereDiv) != 'undefined' && sphereDiv != null) {
        moveSphere(sphereDiv, posX, posY, posZ, rotX, rotY, rotZ);
      }
    }
    handIds[hand.id] = true;
  }
  for (handId in spheres) {
    if (!handIds[handId]) {
      var sphereDiv =  document.getElementById(spheres[handId]);
      sphereDiv.parentNode.removeChild(sphereDiv);
      delete spheres[handId];
    }
  }

  for (var pointableId = 0, pointableCount = frame.pointables.length; pointableId != pointableCount; pointableId++) {
    var pointable = frame.pointables[pointableId];
    var posX = (pointable.tipPosition.x*3);
    var posY = (pointable.tipPosition.z*3)-200;
    var posZ = (pointable.tipPosition.y*3)-400;
    var dirX = -(pointable.direction.y*90);
    var dirY = -(pointable.direction.z*90);
    var dirZ = (pointable.direction.x*90);
    var finger = fingers[pointable.id];
    if (!finger) {
      var fingerDiv = document.getElementById("finger").cloneNode(true);
          fingerDiv.setAttribute('id',pointable.id);
          fingerDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
          document.getElementById('scene').appendChild(fingerDiv);
          fingers[pointable.id] = pointable.id;
    } else {
      var fingerDiv =  document.getElementById(pointable.id);
      if (typeof(fingerDiv) != 'undefined' && fingerDiv != null) {
        moveFinger(fingerDiv, posX, posY, posZ, dirX, dirY, dirZ);
      }
    }
    fingerIds[pointable.id] = true;
  }
  for (fingerId in fingers) {
    if (!fingerIds[fingerId]) {
      var fingerDiv =  document.getElementById(fingers[fingerId]);
      fingerDiv.parentNode.removeChild(fingerDiv);
      delete fingers[fingerId];
    }
  }
  document.getElementById('showHands').addEventListener('mousedown', function() {
    document.getElementById('app').setAttribute('class','show-hands');
  }, false);
  document.getElementById('hideHands').addEventListener('mousedown', function() {
    document.getElementById('app').setAttribute('class','');
  }, false);
});

