window.onload = () => {
	const buyDialog = document.getElementById("buyDialog");

	function buyButtonClicked() {
		showDialog();
	}

	function submitButtonClicked() {
		alert("You submitted the form. Yay.");
		hideDialog();
	}

	function closeDialogButtonClicked() {
		hideDialog();
	}

	function hideDialog() {
		buyDialog.classList.add("isHidden");
	}

	function showDialog() {
		buyDialog.classList.remove("isHidden");
	}

	// Sets up event listeners
	document.getElementById("mainContent").addEventListener("click", (e) => {
		if (e.target.classList && e.target.classList.contains("buyButton")) {
			buyButtonClicked();
		}
	});
	document.getElementById("submitButton").addEventListener("click", (e) => {
		submitButtonClicked();
	});
	document.getElementById("dialogCloseButton").addEventListener("click", (e) => {
		closeDialogButtonClicked();
	});
}

class TabWidget {
 constructor() {
  var tablist = document.querySelectorAll('.tablist')[0];
  var tabs;
  var panels;
  var delay = determineDelay();
  generateArrays();

  // For easy reference
  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  // Add or substract depending on key pressed
  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  // Bind listeners
  for (i = 0; i < tabs.length; ++i) {
    addTabListeners(i);
  };
 }
  
  generateArrays() {
    tabs = document.querySelectorAll('.tab');
    panels = document.querySelectorAll('.tabpanel');
  }

  addTabListeners(index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);

    // Build an array with all tabs (<button>s) in it
    tabs[index].index = index;
  }

  // When a tab is clicked, activateTab is fired to activate it
  clickEventListener (event) {
    var tab = event.target;
    activateTab(tab, false);
  }

  // Handle keydown on tabs
  keydownEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        activateTab(tabs[0]);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    };
  }

  // Handle keyup on tabs
  keyupEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
    };
  }

  // When a tablist's aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  determineOrientation(event) {
    var key = event.keyCode;
    var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    var proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      };
    }
    else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      };
    };

    if (proceed) {
      switchTabOnArrowPress(event);
    };
  };

  // Either focus the next, previous, first, or last tab
  // depending on key pressed
  switchTabOnArrowPress(event) {
    var pressed = event.keyCode;

    for (x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', focusEventHandler);
    };

    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        }
        else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        };
      };
    };
  };

  // Activates any given tab panel
  activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute('tabindex');

    // Set the tab as selected
    tab.classList.add("selected");

    // Get the id of the relevant tabpanel
    var controls = tab.getAttribute('id')  + '-tab';

    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute('hidden');

    // Set focus when required
    if (setFocus) {
      tab.focus();
    };
  }

  // Deactivate all tabs and tab panels
  deactivateTabs() {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].classList.remove("selected");
      tabs[t].removeEventListener('focus', focusEventHandler);
    };

    for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute('hidden', 'hidden');
    };
  }

  // Make a guess
  function focusFirstTab () {
    tabs[0].focus();
  }

  // Make a guess
  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  }

  // Determine whether there should be a delay
  // when user navigates with the arrow keys
  determineDelay() {
    var hasDelay = tablist.hasAttribute('data-delay');
    var delay = 0;

    if (hasDelay) {
      var delayValue = tablist.getAttribute('data-delay');
      if (delayValue) {
        delay = delayValue;
      }
      else {
        // If no value is specified, default to 300ms
        delay = 300;
      };
    };
    return delay;
  }

  focusEventHandler(event) {
    var target = event.target;
    setTimeout(checkTabFocus, delay, target);
  }

  // Only activate tab on focus if it still has focus after the delay
  checkTabFocus(target) {
    focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    };
  }
}