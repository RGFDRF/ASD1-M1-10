# Demonstracja aplikacji

## Kolejność pokazu

1. Przedstaw 10 slajdów z `presentation.html`; steruj klawiszami ← i →.
2. Otwórz lokalnie `index.html`; pokaż obie metody obok siebie.
3. Scenariusz kontrolny: krokowo dodaj 10, 17, 24; wskaż h(k)=k mod 7 i komórki 3, 4, 5.
4. Usuń 17. Wyjaśnij, dlaczego komórka 4 ma stan DELETED, a nie EMPTY.
5. Znajdź 24; pokaż przejście przez DELETED do komórki 5.
6. Zmień dane na własną historię, zatwierdź; pokaż start/pauzę, tempo i reset.
7. Wybierz scenariusz przebudowy i objaśnij 7→15, stare/nowe indeksy oraz kolejność przenoszenia.
8. Uruchom porównanie; wyjaśnij wejście, zliczanie porównań/odwiedzin i oddzielne liczniki rehashingu.
9. Pokaż `tests/report.html` i podaj wynik ostatniego uruchomienia.
10. Odpowiedz na pytanie zależne od stanu, następnie wyjaśnij wskazany fragment kodu.

## Ćwiczenia przewidywania

- Przy m=7 i kluczach 10,17,24: przewidź kolejne komórki próbkowania. Odpowiedź: 3,4,5.
- Po usunięciu 17: czy find(24) może zakończyć na 4? Nie — DELETED nie oznacza końca ścieżki.
- Przy m=7 i n=4: czy wstawienie nowego klucza uruchomi przebudowę? Tak: 5/7 > 0,7, więc rozmiar wzrośnie do 15.
- Wstaw 6,13,20 przy m=7. Odpowiedź: indeksy 6,0,1 (zawijanie).
- Po usunięciu węzła z łańcucha: czy pozostałe elementy trzeba przestawiać? Nie, usuwa się tylko właściwy węzeł.
- Dlaczego wstawianie po DELETED szuka dalej? Aby nie utworzyć duplikatu, który może leżeć później w klastrze.

## Pytania kontrolne z odpowiedziami

**Czy klucze o tym samym indeksie muszą być identyczne?** Nie. Kolizja oznacza ten sam indeks, nie ten sam klucz.

**Czy piąte dodanie przy m=7 zawsze jest poprawne?** Tylko jeśli klucz jest poprawny, nowy (nie jest duplikatem), limit nie został przekroczony; wtedy próg powoduje przebudowę przed wstawieniem.

**Co obejmuje koszt przebudowy?** Przeniesienie aktywnych elementów i ponowne wyliczenie indeksów; aplikacja liczy go osobno od operacyjnych odwiedzin/porównań.

