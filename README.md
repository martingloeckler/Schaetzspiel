# Schätzspiel

Multiplayer-Schätzquiz mit serverseitiger Game Engine, Live-Lobby und Showmaster-Modus.

## Stand v0.7 – Render-ready

Der aktuelle Stand enthält:

- Next.js 16 App Router
- eigener Node-HTTP-Server mit Socket.IO
- Spiel erstellen mit Kategorien und Host-/Showmaster-Modus
- manuell offene Lobby ohne Zeitfenster
- kurzer Join-Code, QR-Code und Share/Copy-Link
- Live-Spielerliste und zustandsbewusster Reconnect
- serverseitiger 30-Sekunden-Timer
- numerische und Zeitwert-Eingaben
- Ranking nach Abweichung und Antwortzeit
- Competition Ranking bei echtem Gleichstand
- Rundenergebnis, Gesamtrangliste und Showmaster-Steuerung
- Render-Blueprint (`render.yaml`)
- HTTP-Healthcheck unter `/healthz`
- dynamischer Port über `PORT` und Bindung an `0.0.0.0`
- sauberes SIGTERM/SIGINT-Shutdown-Verhalten

> Hinweis: Aktive Spiele liegen aktuell im Arbeitsspeicher. Für Tests deshalb genau **eine** Serverinstanz verwenden. Ein Neustart oder Free-Tier-Sleep beendet laufende Spiele.

## Entwicklung

Voraussetzung: Node.js >= 20.9.

```bash
npm install
npm run dev
```

Danach `http://localhost:3000` öffnen.

Tests:

```bash
npm test
```

Produktionsbuild:

```bash
npm run build
npm start
```

Healthcheck: `GET /healthz` → `{"status":"ok"}`

## Deployment auf Render

Das Repository enthält bereits eine `render.yaml`. In Render **New > Blueprint** wählen und dieses Repository verbinden. Render legt daraus einen kostenlosen Node-Web-Service an.

## Architektur

- `src/game/`: framework-unabhängige Game Engine
- `src/server/`: aktive Spiele und Socket.IO-Events
- `src/data/`: Kategorien und serverseitiger Fragenpool
- `src/app/`: Next.js-Seiten
- `src/components/`: UI-Komponenten

Die richtigen Antworten werden nicht in Client-Komponenten importiert. Der Fragenpool bleibt serverseitig.
