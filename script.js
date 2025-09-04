// script.js

// ==== Enkel, ikke-sikker passordsluse (prompt + localStorage) ====
// Passordet er satt til "mittnavn"
const PASSORD_PLAINTEXT = "mittnavn";
const KEY = "portalAccessGranted";

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem(KEY) === "ok") return; // allerede godkjent

    const input = prompt("Skriv passord for å gå videre:");
    if (input === null) {
      return; // bruker avbrøt
    }
    if (input === PASSORD_PLAINTEXT) {
      localStorage.setItem(KEY, "ok");
    } else {
      alert("Feil passord.");
    }
  } catch (e) {
    console.warn("Passordsluse feilet:", e);
  }
});
