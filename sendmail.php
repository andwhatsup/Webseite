<?php
// Konfiguration
$empfaenger = "yannik.baumann@gmx.ch"; // Deine Firmenmailadresse
$betreff = "Neue Nachricht von der Kontaktseite";

// Daten aus dem Formular abrufen und absichern
$name = htmlspecialchars($_POST['Name']);
$email = htmlspecialchars($_POST['Email']);
$nachricht = htmlspecialchars($_POST['Message']);

// E-Mail-Text zusammenbauen
$inhalt = "Name: $name\n";
$inhalt .= "E-Mail: $email\n\n";
$inhalt .= "Nachricht:\n$nachricht";

// Header für E-Mail
$header = "From: $email\r\n" .
          "Reply-To: $email\r\n" .
          "Content-Type: text/plain; charset=UTF-8";

// Mail versenden
$erfolg = mail($empfaenger, $betreff, $inhalt, $header);

// Antwort anzeigen oder weiterleiten
if ($erfolg) {
    echo "<h2>Vielen Dank! Ihre Nachricht wurde gesendet.</h2>";
} else {
    echo "<h2>Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.</h2>";
}
?>