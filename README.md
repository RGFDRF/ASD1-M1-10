# Laboratorium haszowania

Interaktywna aplikacja edukacyjna porównująca dwie metody rozwiązywania kolizji w tablicach haszujących: łańcuchowanie i próbkowanie liniowe. Obie metody wykonują tę samą historię operacji, a widok pokazuje kolejne kroki, stan struktury i pseudokod.

## Funkcje

- Wstawianie, wyszukiwanie i usuwanie kluczy.
- Wykonanie krokowe, odtwarzanie, pauza, reset i regulacja tempa.
- Gotowe scenariusze oraz własna historia operacji.
- Wizualizacja stanów `EMPTY`, `OCCUPIED` i `DELETED`.
- Automatyczna przebudowa tablicy i przenoszenie aktywnych kluczy.
- Porównanie liczby odwiedzin i porównań dla tych samych danych.

Klucze: liczby całkowite 0–999, bez duplikatów, maksymalnie 20 aktywnych. Początkowy rozmiar tablicy wynosi 7. Gdy przed nowym wstawieniem `(n + 1) / m > 0,7`, rozmiar rośnie do `2m + 1`.

## Uruchomienie

Pobierz repozytorium i otwórz `index.html` w przeglądarce. Aplikacja działa lokalnie, bez instalowania zależności i bez połączenia z internetem.

Przykładowa historia:

```text
+10, +17, +24, -17, ?24
```

`+` oznacza wstawienie, `-` usunięcie, a `?` wyszukiwanie. Przykład pokazuje, dlaczego wyszukiwanie musi kontynuować za komórką `DELETED`.

## Testy

Do uruchomienia testów potrzebny jest Node.js.

```sh
node tests/tests.js
node tests/trace.js
node tests/compare.js
```

Sprawdzona wersja: 14/14 testów algorytmów, 4/4 testów regresji zdarzeń i 5/5 sprawdzeń interfejsu. Raport testów można otworzyć w `tests/report.html`; szczegółowe wyniki znajdują się w `results/`.

Porównanie metod wykorzystuje liczniki operacji, bez pomiarów czasu ściennego. Koszt przebudowy raportowany jest oddzielnie.

## Struktura projektu

| Ścieżka | Zawartość |
| --- | --- |
| `index.html`, `styles.css` | Interfejs aplikacji |
| `js/algorithms.js` | Algorytmy tablic haszujących i zdarzenia krokowe |
| `js/app.js` | Sterowanie aplikacją i wizualizacja |
| `tests/` | Testy i raport HTML |
| `results/` | Wyniki testów i porównania |
| `assets/` | Zrzuty działającej aplikacji |
| `documentation.pdf` | Dokumentacja; edytowalne źródło w `documentation.html` |
| `presentation.html` | Prezentacja sterowana klawiszami ←/→; dostępna także jako PDF |

## Technologie

HTML, CSS i JavaScript. Algorytmy i interfejs nie wymagają zewnętrznych bibliotek ani usług.

## Autor i źródła

**Daniel Zawisza** — projekt ASD1-M1-10, Algorytmy i struktury danych I.

Przy opracowaniu kodu, testów, wizualizacji i materiałów wykorzystano narzędzia AI: OpenClaw oraz Codex. Działanie zweryfikowano testami i kontrolą interfejsu.

Materiały edukacyjne: [Princeton Algorithms — Hash Tables](https://algs4.cs.princeton.edu/34hash/).
