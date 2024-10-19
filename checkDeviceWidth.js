function checkDeviceWidth() {
  if (window.innerWidth < 768) {
    // Ustal wartość szerokości, poniżej której pokazujemy alert
    alert("Proszę skorzystać z komputera");
    // Opcjonalnie możesz usunąć zawartość, aby nie była widoczna
    document.body.innerHTML = "";
  }
}

// Sprawdzamy szerokość przy załadowaniu i przy zmianie rozmiaru
window.addEventListener("load", checkDeviceWidth);
window.addEventListener("resize", checkDeviceWidth);
