# DB Quest – RideLab Leipzig

Interaktiver Lernkurs zu **fixen und variablen Kosten, Teilkostenrechnung, absolutem Deckungsbeitrag, Kostenauflösung und Break-even-Analyse**.

## Inhalt

- 6 Kapitel / 12 Lernlektionen
- 48 Kernaufgaben
- 6 Bonusmissionen
- interne Aufgabenverteilung: 25 % Grundlagen, 50 % Anwendung/Transfer, 25 % Beurteilung/Problemlösung
- viele Aufgabenformate: Zahlenaufgaben, Single Choice, Multiple Choice, Richtig/Falsch, Zuordnung, Drag & Drop, Reihenfolge und Freitext mit Selbsteinschätzung
- ausführliche Erklärungen, Definitionen, Rechenbeispiele und Schaubilder
- die vier bereitgestellten Diagramme sind in die Erklärungen integriert
- XP, Abzeichen, Themes, Avatare und Begleiter
- Gastmodus ohne Anmeldung
- Schülerkonten mit Nickname + Passwort + Klasse
- Lehrerkonten mit Nickname + Passwort + Klasse + geheimem Lehrer-Code
- klassenbezogener Lehrerbereich
- Passwort-Reset, Nutzer löschen, einzelnen oder gesamten Klassenfortschritt zurücksetzen
- geräteübergreifender Lernfortschritt über Netlify Blobs
- responsive Darstellung für Smartphone, Tablet und Desktop
- PWA-Unterstützung für die statischen Lerninhalte

## Technischer Aufbau

- Frontend: HTML, CSS und Vanilla JavaScript
- Backend: Netlify Function `netlify/functions/api.mjs`
- Datenspeicherung: Netlify Blobs
- keine Supabase-Datenbank
- kein allgemeiner AUTH-Schlüssel erforderlich
- Sitzungen werden mit kryptografisch zufälligen Session-Tokens verwaltet
- Passwörter werden mit Node.js `scrypt` und individuellem Salt gehasht
- Blob-Stores werden explizit in `eu-central-1` (Frankfurt) geöffnet

## Deployment über GitHub und Netlify

1. ZIP-Datei entpacken.
2. **Den Inhalt des Ordners** in ein neues GitHub-Repository hochladen. `netlify.toml`, `package.json`, `public/` und `netlify/` müssen im Repository-Stamm liegen.
3. In Netlify: **Add new project → Import an existing project → GitHub**.
4. Repository auswählen.
5. Netlify erkennt über `netlify.toml` automatisch:
   - Publish-Verzeichnis: `public`
   - Functions-Verzeichnis: `netlify/functions`
6. Vor der Nutzung des Lehrerzugangs in Netlify eine Umgebungsvariable anlegen:

   **Name:** `TEACHER_CODE`

   **Wert:** ein eigener geheimer Lehrer-Code, z. B. eine lange zufällige Zeichenfolge.

7. Danach neu deployen.

Es wird **keine** Variable wie `AUTH`, `AUTH_SECRET` oder eine externe SQL-Datenbank benötigt.

## Anmeldung

### Schülerkonto

Schülerinnen und Schüler geben bei Registrierung und Anmeldung an:

- Klasse
- selbst gewählten Nickname
- selbst gewähltes Passwort

Ein Nickname muss nur innerhalb derselben Klasse und Rolle eindeutig sein.

### Lehrerkonto

Lehrkräfte wählen bei der Registrierung „Lehrkraft“ und geben zusätzlich den in Netlify hinterlegten `TEACHER_CODE` ein. Das Lehrerkonto wird genau der angegebenen Klasse zugeordnet und sieht nur Schülerkonten dieser Klasse.

## Lehrerbereich

Im Lehrerbereich können Sie:

- Lernfortschritt der Klasse ansehen
- Fortschritt eines einzelnen Kontos löschen
- den Fortschritt der gesamten Klasse zurücksetzen
- für ein Schülerkonto ein neues Passwort setzen
- Schülerkonten entfernen

Ein Passwort-Reset macht bestehende Sitzungen dieses Schülerkontos ungültig.

## Gastmodus

Der Kurs ist vollständig ohne Anmeldung nutzbar. Im Gastmodus wird der Fortschritt im Browser über `localStorage` gespeichert. Wird später ein Schülerkonto angelegt oder verwendet, wird der lokale Fortschritt mit dem Cloud-Fortschritt zusammengeführt.

## Inhalt prüfen

Optional lokal:

```bash
npm run check
```

Die Prüfung kontrolliert unter anderem, ob alle Kernaufgaben vorhanden sind und die intern gewünschte Verteilung der Anforderungsniveaus eingehalten wird. Diese Einstufungen werden im Kurs selbst nicht angezeigt.

## Lokal mit Netlify testen

Nach Installation der Abhängigkeiten:

```bash
npm install
npx netlify dev
```

Für Lehrerkonten lokal `TEACHER_CODE` in der lokalen Netlify-Umgebung setzen.

## Wichtiger Hinweis zur Datenhaltung

Netlify Blobs eignet sich für diesen klassenbezogenen Lernkurs und einfache Fortschrittsdaten. Die Anwendung speichert keine Klarnamen; vorgesehen sind Nicknames und Klassenbezeichnungen. Verwenden Sie für den Lehrer-Code eine lange, nicht leicht erratbare Zeichenfolge.
