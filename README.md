# ASD1-M1-10 — Laboratorium haszowania

**Autor:** Daniel Zawisza  
**Numer indeksu:** 93796  
**Kod tematu:** ASD1-M1-10  
**Przedmiot:** Algorytmy i struktury danych I · 2026/2027

## Uruchomienie

- Aplikacja: otwórz lokalnie `index.html` w aktualnej przeglądarce (bez instalacji, kont i internetu).
- Testy automatyczne: w katalogu projektu uruchom `node tests/tests.js`.
- Raport wejść/oczekiwań/wyników: `tests/report.html` oraz `results/tests.json`.
- Porównanie metod: kliknij „Uruchom porównanie” w aplikacji lub uruchom `node tests/compare.js`; zapis: `results/comparison.json`.
- Osobna prezentacja: `presentation.html` — dokładnie 10 slajdów, sterowanie klawiszami ←/→.
- Źródło dokumentacji do druku: `documentation.html` — 10 jawnych sekcji stron.

## Pliki do obrony

- Aplikacja: `index.html`, `styles.css`, `js/algorithms.js`, `js/app.js`.
- Testy i wyniki: `tests/tests.js`, `tests/report.html`, `results/tests.json`.
- Pomiar: `tests/compare.js`, `results/comparison.json`.
- Prezentacja: `presentation.html`.
- Dokumentacja: `documentation.pdf` oraz edytowalne źródło `documentation.html`.
- Plan pokazu: `OBRONA.md`; lista zgodności: `CHECKLIST.md`; instrukcja PDF, zrzutu i publikacji GitHub: `GITHUB_GUIDE.md`.

## Algorytmy i liczniki

Implementacje badanych metod są lokalne, bez zewnętrznych bibliotek. Porównania kluczy liczą wyłącznie sprawdzenia aktywnego klucza; EMPTY/DELETED są odwiedzinami, nie porównaniami. Licznik odwiedzin zlicza komórki lub węzły przy operacjach. Rebuildy i liczbę przeniesionych aktywnych kluczy zapisujemy osobno. Animacja, historia, walidacja i renderowanie nie wchodzą do pomiaru algorytmu. Koszt czasowy opisujemy złożonością i licznikami operacji; nie wykonano pomiaru czasu ściennego.

## Autorstwo i pomoc AI

Autor projektu: Daniel Zawisza, indeks 93796. Przy opracowaniu kodu, testów, wizualizacji i materiałów wykorzystano AI: OpenClaw oraz Codex. Poprawność działania sprawdzono testami automatycznymi i kontrolą interfejsu. Raporty są dołączone do projektu.

## Sprawdzona wersja — 26.10.2026

- 14/14 testów algorytmów PASS; wyniki w results/tests.json.
- Dodatkowe 4/4 testów regresji oznaczeń kroków PASS: `node tests/trace.js`.
- 5/5 sprawdzeń interfejsu PASS; szczegóły w results/ui.json.
- documentation.pdf: dokumentacja po polsku, 10 stron.
- presentation.html: 10 slajdów; presentation.pdf: wersja do wyświetlenia bez przeglądarki.
- assets/: rzeczywiste zrzuty działającej aplikacji.
- OBRONA.md: kolejność pokazu i pytania z odpowiedziami.

## Oddanie

Wgraj kod, testy, README i materiały do repozytorium GitHub. Link do repozytorium wpisz osobno w polu „Linki” w Dzienniku. Dołącz wymagane pliki, w tym PDF dokumentacji i prezentację. Repozytorium projektu: <https://github.com/RGFDRF/ASD1-M1-10> (prywatne; prowadzący potrzebuje dostępu). Pliki nie zostały jeszcze oddane w Dzienniku.

Terminy zapisane w przekazanych materiałach: oddanie 26.10.2026 do 23:59; obrona 28.10.2026, 08:30–11:40.
