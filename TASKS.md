# Galaxy Fall - Entwicklungsstatus & Aufgaben

## ✅ Abgeschlossen
- **Backend & Server**
  - [x] Leaderboard-Endpunkt (`/api/leaderboard`) aktualisiert: Filtert strikt nach Mainnet, Testnet und Guest.
  - [x] Datenbankabfragen optimiert (UID-Präfix-Logik implementiert).

- **Frontend & UI**
  - [x] **Leaderboard (Rangliste)**
    - [x] Komplett neues "Epic"-Design mit Fullscreen-Overlay erstellt.
    - [x] Integration des "Rank"-Buttons im Hub (öffnet nun das neue Design).
    - [x] Badge-System für Netzwerk-Status (Mainnet/Testnet/Guest).
    - [x] Top-3 Hervorhebung (Gold/Silber/Bronze Effekte).
    - [x] Eigener Eintrag wird hervorgehoben (`.is-me`).
  - [x] **Navigation**
    - [x] Integrierter "CLOSE UPLINK" Button im neuen Design.
    - [x] Korrekte Rückführung zum Hub oder Pause-Menü beim Schließen.
  - [x] **Shop (Arsenal)**
    - [x] Shop ebenfalls in Fullscreen-Overlay verschoben für Konsistenz.
    - [x] "Arsenal"-Button im Hub verknüpft.
  - [x] **Einstellungen (OPTS)**
    - [x] Komplett neues Settings-Overlay implementiert ("Epic UI").
    - [x] Erweiterte Optionen: Audio (Master, Music, SFX), Grafik (Bloom, Particles, Shake), CRT-Effekt.
    - [x] "OPTS"-Button im Hub führt nun direkt in dieses neue Menü.
    - [x] Logische Gruppierung in Tabs (Audio, Visuals, Game, Input).
    - [x] **Input/Controls**
        - [x] Auto-Fire Logik implementiert und umschaltbar.
        - [x] Haptic Feedback (Vibration) System und Toggle integriert.

- **Lokalisierung**
  - [x] Server-seitiges Speichern der Spracheinstellung (`currentLanguage`).
  - [x] Sofortiges Synchronisieren bei Sprachwechsel.

## 🚧 In Arbeit / Nächste Schritte
- [ ] **Feinschliff & Testing**
  - [ ] Validierung der Leaderboard-Datenanzeige mit echten Server-Daten.
  - [ ] Sicherstellen, dass Scroll-Verhalten auf mobilen Geräten passt.
- [ ] **Gameplay-Erweiterungen**
  - [ ] Weitere visuelle Effekte für das UI (Animationen beim Öffnen).
  - [ ] Integration von Soundeffekten beim Scrollen oder Tab-Wechsel.

## 📝 Geplant (Backlog)
- [ ] Detaillierte Statistiken im Hub ("Career Stats" Panel finalisieren).
- [ ] Social Features (Freunde einladen, etc.).
- [ ] Achievements-Synchronisierung verbessern.
