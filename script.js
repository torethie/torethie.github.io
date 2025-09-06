// script.js

// ⚠️ Klient-side "lås". Merk: Dette er kun enkel skjerming (ikke sikkerhet).
// Bruk server-side auth for ekte beskyttelse.

const PASSORD_PLAINTEXT = "mittnavn";
const KEY = "portalAccessGranted";

// Skjul hele dokumentet tidlig for å unngå "flash" før verifisering
document.documentElement.style.visibility = "hidden";

(function gate() {
  try {
    if (localStorage.getItem(KEY) === "ok") {
      document.documentElement.style.visibility = "";
      return;
    }

    while (true) {
      const input = prompt("Skriv passord for å gå videre:");
      if (input === null) {
        break;
      }
      if (input === PASSORD_PLAINTEXT) {
        localStorage.setItem(KEY, "ok");
        document.documentElement.style.visibility = "";
        return;
      } else {
        alert("Feil passord. Prøv igjen.");
      }
    }

    document.body.innerHTML = `
      <div style="min-height:100svh;display:grid;place-items:center;padding:2rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;">
        <div style="max-width:680px;text-align:center">
          <h1 style="margin:0 0 .5rem 0;font-size:clamp(1.5rem,2vw+1rem,2.25rem);">Tilgang låst</h1>
          <p style="margin:0 0 1rem 0;color:#6c757d">Du må skrive riktig passord for å se innholdet.</p>
          <button id="provIgjen" style="padding:.6rem 1rem;border:0;border-radius:.5rem;background:#0d6efd;color:white;cursor:pointer">Prøv igjen</button>
        </div>
      </div>
    `;
    document.documentElement.style.visibility = "";

    document.getElementById("provIgjen").addEventListener("click", () => {
      localStorage.removeItem(KEY);
      location.reload();
    });
  } catch (e) {
    console.warn("Passordsluse feilet:", e);
    document.documentElement.style.visibility = "";
  }
})();