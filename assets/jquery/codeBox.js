function doFocus(eid) {
  if(!!eid)
    document.getElementById(eid).focus();
}

function moveLeft(myId) {
  var prevId = myId > 1 ? `p_${myId - 1}` : null
  doFocus(prevId)
}

function moveRight(myId) {
  var nextId = myId < 5 ? `p_${myId + 1}` : null
  doFocus(nextId)
}

function onKeyUp(e) {
  var field = this
  var myId = +field.getAttribute('id').split('_')[1]
  
  if (e.keyCode == 37) {
  	// Left arrow
  	moveLeft(myId)
  } else if (e.keyCode == 39) {
  	// Right arrow
  	moveRight(myId)
  } else if (e.keyCode != 8 && field.value.length == 1) {
  	// The field has exactly one character
  	moveRight(myId)
  }
  
  checkPin()
}

function onKeyDown(e) {
  var letGo =  [46, 8, 9, 27, 13, 110, 190].some(k => k == e.keyCode)
    // Allow: Ctrl+A, Command+A
    || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
    // Allow: home, end, left, right, down, up
    || (e.keyCode >= 35 && e.keyCode <= 40)
    
  // Ensure that it is a number and stop the keypress
  if (
  	!letGo 
    && (
           (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) 
        && (e.keyCode < 96 || e.keyCode > 105)
    	 )
    ) {
	   e.preventDefault();
  }
  
  var field = this
  var myId = +field.getAttribute('id').split('_')[1]
  if (e.keyCode == 8) {
  	// Backspace
    if(field.value == '') {
    	moveLeft(myId)
      e.preventDefault();
      return false;
    } else {
      field.value = ''
      return true
    }
  }
  return true
}

function checkPin() {
  var pin = [...document.querySelectorAll('input.k-code')].map(e => e.value).join('')
  // document.getElementById('submit')[pin.length == 5 ? 'removeAttribute' : 'setAttribute']('disabled', 'disabled')
}

[...document.querySelectorAll('input.k-code')].map(e => {
  	e.addEventListener('keyup', onKeyUp, true)
    e.addEventListener('keydown', onKeyDown, true)
  }
)

document.getElementById('p_1').focus();
