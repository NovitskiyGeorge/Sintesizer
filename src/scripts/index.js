import "../styles/index.scss";

window.onload = function () {
  let app = document.querySelector(".app");
  let countCorrectNotes = 0;
  let countInCorrectNotes = 0;
  let listNotesOctaveOne = new Set();
  let listNotesOctaveTwo = new Set();
  let listNotesOctaveThree = new Set();
  let listNotesOctaveFour = new Set();
  let listNotesOctaveBig = new Set();
  let listNotesOctaveSmall = new Set();

  let sortListNotesOctaveOne = [];
  let sortListNotesOctaveTwo = [];
  let sortListNotesOctaveThree = [];
  let sortListNotesOctaveFour = [];
  let sortListNotesOctaveBig = [];
  let sortListNotesOctaveSmall = [];


  function createPiano() {
    let instrument = document.createElement("div");
    instrument.className = "piano";
    instrument.innerHTML = `
    <div class="piano__panel"></div>
    <div class="piano__cover"></div>
    <div class="piano__line"></div>
    <div class="panel-control">
      <div class="configuration">
        <button class="configuration__btn btn-start" data-status="disabled"><div class="btn-start__indicator"></div>Старт</button> 
        <button class="configuration__btn btn-tools">Настройки</button>
        <button class="configuration__btn btn-results">Результат</button>
      </div>      
    </div>
    `;
    app.append(instrument);
  }

  createPiano();

  function getKeys() {
    // let keysPromise = fetch("http://localhost:3000/keys").then((res) => {
    //   return res.json();
    // });
    // keysPromise.then(
    //   (res) => {
    //     createKeyboard(res);
    //   },
    //   (err) => {
    //     console.log("Error");
    //   }
    // );
    createKeyboard([
      {
        id: 1,
        name: 'do',
        color: 'white',
        url: 'src/audio/do.wav',
      },
      {
        id: 2,
        name: 'doDies',
        color: 'black',
        url: 'src/audio/doDies.wav',
      },
      {
        id: 3,
        name: 're',
        color: 'white',
        url: 'src/audio/re.wav',
      },
      {
        id: 4,
        name: 'reDies',
        color: 'black',
        url: 'src/audio/reDies.wav',
      },
      {
        id: 5,
        name: 'mi',
        color: 'white',
        url: 'src/audio/mi.wav',
      },
      {
        id: 6,
        name: 'fa',
        color: 'white',
        url: 'src/audio/fa.wav',
      },
      {
        id: 7,
        name: 'faDies',
        color: 'black',
        url: 'src/audio/faDies.wav',
      },
      {
        id: 8,
        name: 'sol',
        color: 'white',
        url: 'src/audio/sol.wav',
      },
      {
        id: 9,
        name: 'solDies',
        color: 'black',
        url: 'src/audio/solDies.wav',
      },
      {
        id: 10,
        name: 'lya',
        color: 'white',
        url: 'src/audio/lya.wav',
      },
      {
        id: 11,
        name: 'lyaDies',
        color: 'black',
        url: 'src/audio/lyaDies.wav',
      },
      {
        id: 12,
        name: 'si',
        color: 'white',
        url: 'src/audio/si.wav',
      },
    ]);
  }

  function createKeyboard(keys) {
    let keyboard = document.createElement("div");
    let piano = document.querySelector(".panel-control");
    keyboard.className = "keyboard";
    let html = keys.map((key) => {
      let cls = "key";
      switch (key.color) {
        case "white":
          cls += " key_white";
          break;
        case "black":
          cls += " key_black";
      }
      return `<div class="${cls}" data-id=${key.id} data-url=${key.url} data-name=${key.name}></div>`;
    });
    let htmlString = html.join("");
    keyboard.innerHTML = htmlString;
    piano.appendChild(keyboard);
  }

  getKeys();

  function createSelect() {
    let tools = document.createElement("div");
    let piano = document.querySelector(".piano");
    tools.className = "tools";
    tools.innerHTML = `  
    <select class="tools__select" data-name='clef'>
      <option value=${"treble"}>Скрипичный ключ</option>
      <option value=${"bass"}>Басовый ключ</option>
    </select>
    <div><input type="checkbox" class="checkbox-octave" value="octaveOne" checked> 1-я октава</div>
    <div><input type="checkbox" class="checkbox-octave" value="octaveTwo" checked> 2-я октава</div>
    <div><input type="checkbox" class="checkbox-octave" value="octaveThree"> 3-я октава</div>
    <div><input type="checkbox" class="checkbox-octave" value="octaveFour" disabled> 4-я октава</div>
    <div><input type="checkbox" class="checkbox-octave" value="octaveSmall"> малая октава</div>
    <div><input type="checkbox" class="checkbox-octave" value="octaveBig" disabled> большая октава</div>
    <div class="tools__timer"> Время
      <input type="checkbox" class="timer" value="30000" checked> 30 секунд
      <input type="checkbox" class="timer" value="60000"> 60 секунд
    </div>
    <button class="tools__btn-apply">Применить</button>
    `;
    piano.appendChild(tools);
  }

  createSelect();

  function createResults() {
    let results = document.createElement("div");
    let piano = document.querySelector(".piano");
    results.className = "results";
    results.innerHTML = `
    <h2 class="results__title">Результаты последного теста</h2>
    <table>
      <tr><td>Угаданныx нот: </td><td class="results__correct-notes">0</td><td>Неверных нот: </td>
      <td class="results__incorrect-notes">0</td></tr>
    </table>
    <table cellpadding="4" cellspacing="1" class="results__table-notes">
      
        <thead class="results__table-head">
          <tr>
          <th colspan="2">Ноты для повторения</th>
          </tr>       
        </thead>

      <tr>
        <td class="results__left-col">1-я октава</td>
        <td class="list-octave-one"></td>
      </tr>
      <tr>
        <td class="results__left-col">2-я октава</td>
        <td class="list-octave-two"></td>
      </tr>
      <tr>
        <td class="results__left-col">3-я октава</td>
        <td class="list-octave-three"></td>
      </tr>
      <tr>
        <td class="results__left-col">4-я октава</td>
        <td class="list-octave-four"></td>
      </tr>
      <tr>
        <td class="results__left-col">малая октава</td>
        <td class="list-octave-small"></td>
      </tr>
      <tr>
        <td class="results__left-col">большая октава</td>
        <td class="list-octave-big"></td>
      </tr>
    </table>
    <button class="results__btn-accept">ok</button>
    `;
    piano.appendChild(results);
  }

  createResults();

  function createMusicStan() {
    let musicStan = document.createElement("div");
    musicStan.className = "stan";
    musicStan.innerHTML = `
    <div class="stan__clef_treble" id="clef"></div>
    <div class="note"></div>`;
    app.prepend(musicStan);
  }

  createMusicStan();

  function showTools() {
    let btnTools = document.querySelector(".btn-tools");
    btnTools.addEventListener("click", () => {
      movePanel();
      setTimeout(switchShowTools, 1000);
    });
  }

  showTools();

  function movePanel() {
    let panel = document.querySelector(".piano__cover");
    panel.classList.toggle("piano__cover_active");
  }

  function switchShowTools() {
    let tools = document.querySelector(".tools");
    tools.classList.toggle("tools_show");
    applySet();
  }

  function changeMusicClef(clefName) {
    let musicClef = document.querySelector("#clef");
    switch (clefName) {
      case "bass":
        musicClef.className = `stan__clef_${clefName}`;
        break;
      case "treble":
        musicClef.className = `stan__clef_${clefName}`;
        break;
    }
    deselectCheckbox(clefName);
    selectCheckbox(clefName);
  }

  function deselectCheckbox(clef) {
    let checkboxes = document.querySelectorAll(".checkbox-octave");
    switch (clef) {
      case "bass":
        checkboxes.forEach((item) => {
          item.checked = false;
        });
        break;
      case "treble":
        checkboxes.forEach((item) => {
          item.checked = false;
        });
        break;
    }
  }

  function selectCheckbox(clef) {
    let checkboxes = document.querySelectorAll(".checkbox-octave");
    switch (clef) {
      case "bass":
        checkboxes.forEach((item) => {
          if (
            item.value === "octaveBig" ||
            item.value === "octaveSmall" ||
            item.value === "octaveOne"
          ) {
            item.disabled = false;
            item.checked = true;
          } else {
            item.disabled = true;
          }
        });
        break;
      case "treble":
        checkboxes.forEach((item) => {
          if (
            item.value === "octaveOne" ||
            item.value === "octaveTwo" ||
            item.value === "octaveThree" ||
            item.value === "octaveSmall"
          ) {
            item.disabled = false;
            item.checked = true;
          } else {
            item.disabled = true;
          }
        });
        break;
    }
  }

  function applySet() {
    let applyBtn = document.querySelector(".tools__btn-apply");
    applyBtn.addEventListener("click", () => {
      switchShowTools();
      movePanel();
    });
  }

  function startTest() {

    let startBtnMain = document.querySelector(".btn-start");
    startBtnMain.addEventListener("click", () => {
      if (startBtnMain.dataset.status === "disabled") {
        startBtnMain.dataset.status = "enabled";
        clearResults();
        addRandomNote();
        indicatorOn();
        let interval = getTimer();
        setTimeout(changeStatusBtnStart, interval, startBtnMain);
        startTimer(interval / 1000);
      }
    });
  }

  startTest();

  function indicatorOn() {
    let indicat = document.querySelector(".btn-start__indicator");
    indicat.classList.add("btn-start__indicator_active");
  }

  function indicatorOff() {
    let indicat = document.querySelector(".btn-start__indicator");
    indicat.classList.remove("btn-start__indicator_active");
  }

  function startTimer(interval) {
    let timer = setTimeout(function tick() {
      interval--;
      if (!interval) {
        showTimer("");
      } else {
        showTimer(interval);
        timer = setTimeout(tick, 1000);
      }
    }, 1000);
  }

  function showTimer(timer) {
    let infPanel = document.querySelector(".piano__panel");
    infPanel.innerText = timer;
  }

  function pickNotes() {
    let pickCheckboxes = document.querySelectorAll(".checkbox-octave");
    let select = document.querySelector("select");
    let notes = [];
    pickCheckboxes.forEach((box) => {
      if (box.checked && select.value === "treble") {
        switch (box.value) {
          case "octaveOne": {
            notes.push(
              "do_one",
              "re_one",
              "mi_one",
              "fa_one",
              "sol_one",
              "lya_one",
              "si_one"
            );
            break;
          }
          case "octaveTwo": {
            notes.push(
              "do_two",
              "re_two",
              "mi_two",
              "fa_two",
              "sol_two",
              "lya_two",
              "si_two"
            );
            break;
          }
          case "octaveThree": {
            notes.push("do_three", "re_three", "mi_three");
            break;
          }
          case "octaveSmall": {
            notes.push("fa_small", "sol_small", "lya_small", "si_small");
            break;
          }
        }
      }
      if (box.checked && select.value == "bass") {
        switch (box.value) {
          case "octaveBig": {
            notes.push(
              "do_big",
              "re_big",
              "mi_big",
              "fa_big",
              "sol_big",
              "lya_big",
              "si_big"
            );
            break;
          }
          case "octaveSmall": {
            notes.push(
              "do-bass_small",
              "re-bass_small",
              "mi-bass_small",
              "fa-bass_small",
              "sol-bass_small",
              "lya-bass_small",
              "si-bass_small"
            );
            break;
          }
          case "octaveOne": {
            notes.push(
              "do-bass_one",
              "re-bass_one",
              "mi-bass_one",
              "fa-bass_one",
              "sol-bass_one"
            );
            break;
          }
        }
      }
    });
    return notes;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomNote() {
    let notes = pickNotes();
    let key = getRandomInt(0, notes.length - 1);
    return notes[key];
  }

  function selectClef() {
    document.addEventListener("change", function (e) {
      if (e.target.dataset.name === "clef") {
        let clefName = e.target.value;
        changeMusicClef(clefName);
      }
    });
  }

  selectClef();

  function addRandomNote() {
    let note = getRandomNote();
    changeNote(note);
  }

  addRandomNote();

  function getTimer() {
    let timer = document.querySelectorAll(".timer");
    let interval;
    timer.forEach((box) => {
      if (box.checked) {
        interval = box.value;
      }
    });
    return interval;
  }

  function changeStatusBtnStart() {
    let startBtn = document.querySelector(".btn-start");
    indicatorOff();
    sortListNotes();
    refreshResults();
    startBtn.dataset.status = "disabled";
  }

  function soundClick(keyUrl) {
    let audio = new Audio();
    audio.src = keyUrl;
    audio.autoplay = true;
  }

  function checkWin(keyNote) {
    let currentNote = document.querySelector(".note");
    if (currentNote.dataset.name.includes(keyNote)) {
      countCorrectNotes++;
      showInfo("Молодец!");
    } else {
      let currentNoteRus = tranlationNotesOnRus(currentNote.dataset.name);
      addToListIncorrectNotes(currentNote.className, currentNoteRus);
      countInCorrectNotes++;
      showInfo(`Не верно! Верная нота: ${currentNoteRus}`);
    }
  }

  function showInfo(info) {
    let infPanel = document.querySelector(".piano__panel");
    let statusStart = document.querySelector(".btn-start").dataset.status;
    if (statusStart === "disabled") {
      infPanel.innerText = info;
    }
  }

  function tranlationNotesOnRus(note) {
    let rusNote;

    switch (note) {
      case 'do':
        rusNote = 'До';
        break;
      case 're':
        rusNote = 'Ре';
        break;
      case 'mi':
        rusNote = 'Ми';
        break;
      case 'fa':
        rusNote = 'Фа';
        break;
      case 'sol':
        rusNote = 'Соль';
        break;
      case 'lya':
        rusNote = 'Ля';
        break;
      case 'si':
        rusNote = 'Си';
        break;
    }
    return rusNote;
  }

  function addToListIncorrectNotes(octave, note) {
    let nameOctave = octave.substring(octave.lastIndexOf("_") + 1);
    switch (nameOctave) {
      case 'one':
        listNotesOctaveOne.add(note);
        break;
      case 'two':
        listNotesOctaveTwo.add(note);
        break;
      case 'three':
        listNotesOctaveThree.add(note);
        break;
      case 'four':
        listNotesOctaveFour.add(note);
        break;
      case 'big':
        listNotesOctaveBig.add(note);
        break;
      case 'small':
        listNotesOctaveSmall.add(note);
        break;
    }
  }

  let resBtn = document.querySelector(".btn-results");
  resBtn.addEventListener("click", () => {
    showResults();
  });

  function sortListNotes() {
    if (listNotesOctaveOne.has('До')) sortListNotesOctaveOne.push('До');
    if (listNotesOctaveOne.has('Ре')) sortListNotesOctaveOne.push('Ре');
    if (listNotesOctaveOne.has('Ми')) sortListNotesOctaveOne.push('Ми');
    if (listNotesOctaveOne.has('Фа')) sortListNotesOctaveOne.push('Фа');
    if (listNotesOctaveOne.has('Соль')) sortListNotesOctaveOne.push('Соль');
    if (listNotesOctaveOne.has('Ля')) sortListNotesOctaveOne.push('Ля');
    if (listNotesOctaveOne.has('Си')) sortListNotesOctaveOne.push('Си');

    if (listNotesOctaveTwo.has('До')) sortListNotesOctaveTwo.push('До');
    if (listNotesOctaveTwo.has('Ре')) sortListNotesOctaveTwo.push('Ре');
    if (listNotesOctaveTwo.has('Ми')) sortListNotesOctaveTwo.push('Ми');
    if (listNotesOctaveTwo.has('Фа')) sortListNotesOctaveTwo.push('Фа');
    if (listNotesOctaveTwo.has('Соль')) sortListNotesOctaveTwo.push('Соль');
    if (listNotesOctaveTwo.has('Ля')) sortListNotesOctaveTwo.push('Ля');
    if (listNotesOctaveTwo.has('Си')) sortListNotesOctaveTwo.push('Си');

    if (listNotesOctaveThree.has('До')) sortListNotesOctaveThree.push('До');
    if (listNotesOctaveThree.has('Ре')) sortListNotesOctaveThree.push('Ре');
    if (listNotesOctaveThree.has('Ми')) sortListNotesOctaveThree.push('Ми');
    if (listNotesOctaveThree.has('Фа')) sortListNotesOctaveThree.push('Фа');
    if (listNotesOctaveThree.has('Соль')) sortListNotesOctaveThree.push('Соль');
    if (listNotesOctaveThree.has('Ля')) sortListNotesOctaveThree.push('Ля');
    if (listNotesOctaveThree.has('Си')) sortListNotesOctaveThree.push('Си');

    if (listNotesOctaveFour.has('До')) sortListNotesOctaveFour.push('До');
    if (listNotesOctaveFour.has('Ре')) sortListNotesOctaveFour.push('Ре');
    if (listNotesOctaveFour.has('Ми')) sortListNotesOctaveFour.push('Ми');
    if (listNotesOctaveFour.has('Фа')) sortListNotesOctaveFour.push('Фа');
    if (listNotesOctaveFour.has('Соль')) sortListNotesOctaveFour.push('Соль');
    if (listNotesOctaveFour.has('Ля')) sortListNotesOctaveFour.push('Ля');
    if (listNotesOctaveFour.has('Си')) sortListNotesOctaveFour.push('Си');

    if (listNotesOctaveBig.has('До')) sortListNotesOctaveBig.push('До');
    if (listNotesOctaveBig.has('Ре')) sortListNotesOctaveBig.push('Ре');
    if (listNotesOctaveBig.has('Ми')) sortListNotesOctaveBig.push('Ми');
    if (listNotesOctaveBig.has('Фа')) sortListNotesOctaveBig.push('Фа');
    if (listNotesOctaveBig.has('Соль')) sortListNotesOctaveBig.push('Соль');
    if (listNotesOctaveBig.has('Ля')) sortListNotesOctaveBig.push('Ля');
    if (listNotesOctaveBig.has('Си')) sortListNotesOctaveBig.push('Си');

    if (listNotesOctaveSmall.has('До')) sortListNotesOctaveSmall.push('До');
    if (listNotesOctaveSmall.has('Ре')) sortListNotesOctaveSmall.push('Ре');
    if (listNotesOctaveSmall.has('Ми')) sortListNotesOctaveSmall.push('Ми');
    if (listNotesOctaveSmall.has('Фа')) sortListNotesOctaveSmall.push('Фа');
    if (listNotesOctaveSmall.has('Соль')) sortListNotesOctaveSmall.push('Соль');
    if (listNotesOctaveSmall.has('Ля')) sortListNotesOctaveSmall.push('Ля');
    if (listNotesOctaveSmall.has('Си')) sortListNotesOctaveSmall.push('Си');
  }

  function clearResults() {
    countCorrectNotes = 0;
    countInCorrectNotes = 0;
    listNotesOctaveOne.clear();
    listNotesOctaveTwo.clear();
    listNotesOctaveThree.clear();
    listNotesOctaveFour.clear();
    listNotesOctaveBig.clear();
    listNotesOctaveSmall.clear();

    sortListNotesOctaveOne = [];
    sortListNotesOctaveTwo = [];
    sortListNotesOctaveThree = [];
    sortListNotesOctaveFour = [];
    sortListNotesOctaveBig = [];
    sortListNotesOctaveSmall = [];
  }

  function refreshResults() {
    let correctNotes = document.querySelector(".results__correct-notes");
    let incorrectNotes = document.querySelector(".results__incorrect-notes");
    let notesOctaveOne = document.querySelector(".list-octave-one");
    let notesOctaveTwo = document.querySelector(".list-octave-two");
    let notesOctaveThree = document.querySelector(".list-octave-three");
    let notesOctaveFour = document.querySelector(".list-octave-four");
    let notesOctaveBig = document.querySelector(".list-octave-big");
    let notesOctaveSmall = document.querySelector(".list-octave-small");

    notesOctaveOne.textContent = sortListNotesOctaveOne.join(', ');
    notesOctaveTwo.textContent = sortListNotesOctaveTwo.join(', ');
    notesOctaveThree.textContent = sortListNotesOctaveThree.join(', ');
    notesOctaveFour.textContent = sortListNotesOctaveFour.join(', ');
    notesOctaveBig.textContent = sortListNotesOctaveBig.join(', ');
    notesOctaveSmall.textContent = sortListNotesOctaveSmall.join(', ');
    correctNotes.textContent = countCorrectNotes;
    incorrectNotes.textContent = countInCorrectNotes;
  }

  function showResults() {
    movePanel();
    setTimeout(switchShowResults, 1000);
  }

  function switchShowResults() {
    let results = document.querySelector(".results");
    results.classList.toggle("results_show");
  }

  let acceptBtn = document.querySelector(".results__btn-accept");
  acceptBtn.addEventListener("click", () => {
    movePanel();
    switchShowResults();
  });

  function pushKeys() {
    let currentNote = document.querySelector(".note");
    let startBtn = document.querySelector(".btn-start");

    document.addEventListener("click", (e) => {
      if (
        e.target.className === "key key_white" ||
        e.target.className === "key key_black"
      ) {
        let key = e.target;
        let keyUrl = e.target.dataset.url;
        let keyName = e.target.dataset.name;
        checkWin(keyName);
        soundClick(keyUrl);
        key.classList.add("key_push");
        setTimeout(removeClassPush, 50, key);
        if (keyName === currentNote.dataset.name) {
          addRandomNote();
        } else if (startBtn.dataset.status === "enabled") {
          addRandomNote();
        }
      }
    });
  }

  pushKeys();

  function removeClassPush(key) {
    key.classList.remove("key_push");
  }

  function changeNote(note) {
    let currentNote = document.querySelector(".note");
    switch (note) {
      case "do_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "re_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "mi_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "fa_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "sol_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "lya_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "si_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "do_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "re_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "mi_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "fa_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "sol_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "lya_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "si_two":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "do_three":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "re_three":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "mi_three":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "fa_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "sol_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "lya_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "si_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "do_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "re_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "mi_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "fa_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "sol_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "lya_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "si_big":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("_")[0];
        break;
      case "do-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "re-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "mi-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "fa-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "sol-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "lya-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "si-bass_small":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "do-bass_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "re-bass_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "mi-bass_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "fa-bass_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
      case "sol-bass_one":
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split("-")[0];
        break;
    }
  }
};