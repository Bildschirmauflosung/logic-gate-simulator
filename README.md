# Project - Logic Gate Simulator

Własna implementacja programu umożliwiającego symulację sygnału przechodzącego przez bramki od Inputa do Outputa. Projekt został napisany w Typescript przy użyciu Vite.

Po utworzeniu nowego projektu dostępne są dwie bramki: `AND` i `NOT`. Użytkownik z wykorzystaniem tych bramek może stworzyć customowe bramki.

## Uruchomienie programu
Aby uruchomić projekt należy wejść do katalogu dist i uruchomić plik index.html lub jeżeli to by nie działało można uruchomić go w ten sposób:

```js
npm i
```

```js
npm run build
```

```js
npm run preview
```

## Działanie bramek
Każda bramka ma swoje właściwości logiczne. Bramki można łączyć ze sobą. Aby połączyć bramkę należy złapać jedną kropkę bramki i przciągnąć ją do drugiej bramki. Ponadto klikając prawym przyciskiem myszy na bramkę można ją edytować lub usunąć.

## Main layout

### Gate sidebar
![
Gate sidebar<br>
Click on one of these to add the chosen gate to the simulator
](docs/img/gate-sidebar.png)

### Project load and save buttons
![
Project save and load
](docs/img/project-save-load.png)

### Adding inputs and outputs to the simulator
![
Input/Output add buttons
](docs/img/I-O-buttons.png)
