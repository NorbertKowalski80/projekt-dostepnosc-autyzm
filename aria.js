const addToCartButton = document.querySelector("#add-to-cart");
const cartStatus = document.querySelector("#cart-status");
const detailsButton = document.querySelector("#details-button");
const detailsPanel = document.querySelector("#details-panel");
const preferenceForm = document.querySelector("#preference-form");
const formStatus = document.querySelector("#form-status");
const openDialogButton = document.querySelector("#open-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const dialog = document.querySelector("#delivery-dialog");

let lastFocusedElement = null;

function getDialogFocusables() {
  return Array.from(dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
    .filter((element) => !element.disabled);
}

addToCartButton.addEventListener("click", () => {
  cartStatus.textContent = "Dodano do koszyka: Ławka ogrodowa Brzoza 120 cm, cena 249,99 zł.";
});

detailsButton.addEventListener("click", () => {
  const isExpanded = detailsButton.getAttribute("aria-expanded") === "true";
  detailsButton.setAttribute("aria-expanded", String(!isExpanded));
  detailsPanel.classList.toggle("hidden", isExpanded);
});

preferenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(preferenceForm);
  const delivery = data.get("delivery") === "store" ? "odbiór w sklepie" : "dostawa kurierem";
  const quantity = data.get("quantity");
  formStatus.textContent = `Zapisano preferencje: ${delivery}, liczba sztuk: ${quantity}.`;
});

function openDialog() {
  lastFocusedElement = document.activeElement;
  dialog.classList.remove("hidden");
  closeDialogButton.focus();
}

function closeDialog() {
  dialog.classList.add("hidden");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

openDialogButton.addEventListener("click", openDialog);
closeDialogButton.addEventListener("click", closeDialog);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.classList.contains("hidden")) {
    closeDialog();
  }

  if (event.key === "Tab" && !dialog.classList.contains("hidden")) {
    const focusables = getDialogFocusables();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
