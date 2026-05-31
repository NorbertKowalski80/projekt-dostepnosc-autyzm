const surpriseButton = document.querySelector("#surprise");

if (surpriseButton) {
  surpriseButton.addEventListener("click", () => {
    document.body.style.filter = "hue-rotate(120deg)";
    alert("Nagła zmiana, wyskakujące okno i brak kontroli użytkownika.");
  });
}

setTimeout(() => {
  const note = document.createElement("div");
  note.textContent = "NOWA INFORMACJA NA ŚRODKU EKRANU";
  note.style.position = "fixed";
  note.style.inset = "35% 20% auto";
  note.style.zIndex = "20";
  note.style.padding = "20px";
  note.style.color = "black";
  note.style.background = "lime";
  note.style.border = "10px solid red";
  note.style.fontSize = "28px";
  note.style.transform = "rotate(6deg)";
  document.body.appendChild(note);
}, 2800);
