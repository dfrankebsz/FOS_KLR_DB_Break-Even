# DB Mission – UrbanMove Leipzig

Interaktiver Lernkurs zu Kostenrechnung, Deckungsbeitrag und Break-even-Analyse.

## Deployment über GitHub + Netlify
1. Den Inhalt dieses ZIP in ein neues GitHub-Repository hochladen.
2. In Netlify **Add new site → Import an existing project → GitHub** wählen und das Repository verbinden.
3. Build command leer lassen. Publish directory: `.`. Functions directory wird über `netlify.toml` gesetzt.
4. In Netlify unter **Site configuration → Environment variables** genau eine Variable anlegen: `TEACHER_CODE`. Als Wert Ihren gewünschten Lehrer-Code eintragen. Es ist kein allgemeiner AUTH-Schlüssel nötig.
5. Deploy ausführen. Netlify Functions und Netlify Blobs werden beim ersten Gebrauch automatisch verwendet.

## Konten
- Schüler registrieren sich mit Nickname, Passwort und Klasse.
- Lehrer registrieren sich ebenfalls mit Nickname, Passwort und Klasse, wählen „Lehrer/in“ und geben zusätzlich den in Netlify hinterlegten `TEACHER_CODE` ein.
- Lehrer sehen nur Schüler derselben Klasse.
- Gastmodus funktioniert ohne Serverkonto; der Fortschritt bleibt im Browser (localStorage).

## Lehrerfunktionen
Passwort zurücksetzen, Nutzer entfernen, individuellen Fortschritt oder den Fortschritt der gesamten Klasse löschen.

## Sicherheitshinweis
Passwörter werden serverseitig mit Node `scrypt` plus individuellem Salt gehasht. Sessions verwenden zufällige Tokens in Netlify Blobs. Für einen schulischen Lernkurs ist dies eine schlanke Architektur; für besonders sensible Daten wäre ein dedizierter Identity-Provider vorzuziehen.
