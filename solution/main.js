window.onload = () => {
	const buyDialog = document.getElementById("buyDialog");
	const mainPage = document.getElementById("mainPage");

	function buyButtonClicked() {
		showDialog();
	}

	function submitButtonClicked() {
		alert("You submitted the form. Yay.");
		hideDialog();
	}

	function closeDialogButtonClicked() {
		hideDialog();
		mainPage.focus()
	}

	function hideDialog() {
		buyDialog.classList.add("isHidden");
	}

	function showDialog() {
		buyDialog.classList.remove("isHidden");
		buyDialog.focus();
	}

	function isDialogVisible() {
		return !buyDialog.classList.contains("isHidden");
	}

	// Sets up event listeners
	document.getElementById("mainContent").addEventListener("keyup", (e) => {
		if (e.keyCode == 13 && e.target.classList && e.target.classList.contains("buyButton")) {
			buyButtonClicked();
		}
	});
	// This traps focus in the buy dialog. There are many ways to accomplish this, depending on the structure of your page and frameworks you may be using.
	document.getElementById("returns").addEventListener("keyup", (e) => {
		if (e.keyCode == 9 && isDialogVisible()) {
			buyDialog.focus();
		}
	});
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