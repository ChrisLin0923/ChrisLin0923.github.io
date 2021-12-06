var animateHTML = function() {
  var elems;
  var windowHeight;
  
  function init() {
  
  elems = document.querySelectorAll('.hidden');
  elems2 = document.querySelectorAll('.hidden2');
  elems3 = document.querySelectorAll('.hidden3');
  elems4 = document.querySelectorAll('.hidden_left');
  elems5 = document.querySelectorAll('.hidden_right');
  windowHeight = window.innerHeight;
  addEventHandlers();
  checkPosition();
  }
  
  const mediaQuery = window.matchMedia('(min-width: 650px)');

  function addEventHandlers() {
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('resize', init);
  }
  
  function checkPosition() {
      for (var i = 0; i < elems.length; i++) {
      var positionFromTop = elems[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
      elems[i].className = elems[i].className.replace(
      'hidden',
      'animate'
      );
  }
  };

  for (var i = 0; i < elems2.length; i++) {
    var positionFromTop = elems2[i].getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
  elems2[i].className = elems2[i].className.replace(
    'hidden2',
    'animate2'
    );
  };
}
    for (var i = 0; i < elems3.length; i++) {
      var positionFromTop = elems3[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
    elems3[i].className = elems3[i].className.replace(
      'hidden3',
      'animate3'
      );
  }
};

for (var i = 0; i < elems4.length; i++) {
  var positionFromTop = elems4[i].getBoundingClientRect().top;
  if (positionFromTop - windowHeight <= 0) {
elems4[i].className = elems4[i].className.replace(
  'hidden_left',
  'animate4'
  );

}
if (((positionFromTop - windowHeight > 1) || (positionFromTop < 0))&& !mediaQuery.maches) {
  elems4[i].className = elems4[i].className.replace(
  'animate4',
  'hidden_left'
  );
}
};

for (var i = 0; i < elems5.length; i++) {
  var positionFromTop = elems5[i].getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= 0) {
  elems5[i].className = elems5[i].className.replace(
    'hidden_right',
    'animate5'
    );
  }
  
  if (((positionFromTop - windowHeight > 1) || (positionFromTop < 0)) && !mediaQuery.maches) {
    elems5[i].className = elems5[i].className.replace(
    'animate5',
    'hidden_right'
    );
  }
  };
}
  
  return {
  init: init
  };
  };

  document.getElementsByClassName("openbtn").addEventListener("click", toggleNav);

  function toggleNav(){
      navSize = document.getElementById("mySidebar").style.width;
      if (navSize == 170) {
          return closeNav();
      }
      else{
      return openNav();
      }
  }

function openNav() {
  document.getElementById("mySidebar").style.width = "170px";
  document.getElementById("main").style.marginLeft = "180px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

