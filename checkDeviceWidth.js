function checkDeviceWidth() {
  if (window.innerWidth < 768) {
    alert("Proszę skorzystać z komputera");

    // Przekierowanie po kliknięciu "OK"
    window.location.href = "https://www.google.com";

    // Automatyczne przekierowanie po 15 sekundach
    setTimeout(function () {
      window.location.href = "https://www.google.com";
    }, 15000);
  }
}

// Sprawdzamy szerokość przy załadowaniu i przy zmianie rozmiaru
window.addEventListener("load", checkDeviceWidth);
window.addEventListener("resize", checkDeviceWidth);
