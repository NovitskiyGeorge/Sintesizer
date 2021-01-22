import '../styles/index.scss';

window.onload = function() {

  let keyboard = document.createElement('div'),
      instrument = document.createElement('div'),
      app = document.querySelector('.app'),
      tools = document.createElement('div');


  function createPiano() {
    instrument.className = 'piano';
    instrument.innerHTML = `
    <div class="piano__panel"></div>
    <div class="piano__line"></div>
    `;
    app.append(instrument);
  }

  createPiano();

  function getKeys() {
    let keysPromise = fetch('http://localhost:3000/keys').then(res => {
      return res.json();
    });
    keysPromise.then (
      res => {
        createKeyboard(res);
      },
      err => {
        console.log('Error');
      }
    );
  }

  function createKeyboard(keys) {
    let piano = document.querySelector('.piano');
    keyboard.className = 'keyboard';
    let html = keys.map(key => {
      let cls = 'key';
      switch(key.color) {
        case 'white': 
          cls+= ' key_white';
          break;
        case 'black': 
          cls+= ' key_black';
      }
      return `<div class="${cls}" data-id=${key.id} data-url=${key.url} data-name=${key.name}></div>`;
    });
    let htmlString = html.join('');
    keyboard.innerHTML = htmlString;
    piano.appendChild(keyboard);
  }

  getKeys();

  function createSelect() {
    tools.className = 'tools';
    tools.innerHTML = `  
    <select data-name='clef'>
      <option value=${'treble'}>Скрипичный ключ</option>
      <option value=${'bass'}>Басовый ключ</option>
    </select>
    <input type="checkbox" class="checkbox-octave" value="octaveOne" checked> 1-я октава
    <input type="checkbox" class="checkbox-octave" value="octaveTwo" checked> 2-я октава
    <input type="checkbox" class="checkbox-octave" value="octaveThree"> 3-я октава
    <input type="checkbox" class="checkbox-octave" value="octaveFour"> 4-я октава
    <input type="checkbox" class="checkbox-octave" value="octaveSmall"> малая октава
    <input type="checkbox" class="checkbox-octave" value="octaveBig"> большая октава
    <div class="timer">
      <input type="checkbox" class="timer" value="30000" checked> 30 секунд
      <input type="checkbox" class="timer" value="60000"> 60 секунд
    </div>
    <button class="start">Start</button>
    `;
    app.prepend(tools);
  }

  createSelect();

  function createMusicStan() {
    let musicStan = document.createElement('div');
    musicStan.className = 'stan';
    musicStan.innerHTML = `
    <div class="stan__clef_treble" id="clef"></div>
    <div class="note"></div>`;
    app.prepend(musicStan);
  }

  createMusicStan();

  function changeMusicClef(clefName) {
    let musicClef = document.querySelector('#clef');
    switch(clefName) {
      case 'bass':
        musicClef.className = `stan__clef_${clefName}`;
        break;
      case 'treble':
        musicClef.className = `stan__clef_${clefName}`;
        break;
    }
  }

  function start() {
    let startBtn = document.querySelector('.start');
    startBtn.addEventListener('click', () => {
    startBtn.dataset.status = 'enabled';
    addRandomNote();
    let interval = getTimer();
    console.log(interval);
    setTimeout(changeStatusBtnStart, interval, startBtn);
  });
  }

  start();

  function pickNotes() {
    let pickCheckboxes = document.querySelectorAll('.checkbox-octave');

    let notes = [];
    pickCheckboxes.forEach(box => {  
      if(box.checked) {
        switch (box.value) {
          case 'octaveOne': {
            notes.push('do_one', 're_one', 'mi_one', 'fa_one', 'sol_one', 'lya_one', 'si_one');
            break;
          }
          case 'octaveTwo': {
            notes.push('do_two', 're_two', 'mi_two', 'fa_two', 'sol_two', 'lya_two', 'si_two');
            break;
          }
          case 'octaveThree': {
            notes.push('do_three');
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
    let select = document.querySelector('select');
    if(select.value === 'treble'){
      let notes = pickNotes();
      let key = getRandomInt(0, notes.length-1);
      return notes[key];
    }
  }

  function selectClef() {
    document.addEventListener('change', function (e) {
      if(e.target.dataset.name === 'clef') {
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
    let timer = document.querySelectorAll('.timer');
    let interval;
    timer.forEach(box => {
      if (box.checked) {
        interval = box.value;
      }
    });
    return interval;
  }



  function changeStatusBtnStart() {
    let startBtn = document.querySelector('.start');
    startBtn.dataset.status = 'disabled';
    console.log(startBtn.dataset.status);
  }

  function soundClick(keyUrl) {
    let audio = new Audio();
    audio.src = keyUrl;
    audio.autoplay = true;
  }

  
  function checkWin(keyNote) {
    let inf;
    let  currentNote = document.querySelector('.note');
    let infPanel = document.querySelector('.piano__panel');
    if (currentNote.className.includes(keyNote)) {
      infPanel.innerText = `Молодец!`;
    } else {
        inf = currentNote.dataset.name;
        infPanel.innerText = `Не верно! Верная нота: ${inf}`;
      }
  }

  function pushKeys() {
    let  currentNote = document.querySelector('.note');
    let startBtn = document.querySelector('.start');
    document.addEventListener('click', (e) => {
      if(e.target.className === 'key key_white' || e.target.className === 'key key_black') {
        let key = e.target;
        let keyUrl = e.target.dataset.url;
        let keyName = e.target.dataset.name;
        checkWin(keyName);
        soundClick(keyUrl);
        key.classList.add('key_push');
        setTimeout(removeClassPush, 50, key);
        if (keyName === currentNote.dataset.name) {
          addRandomNote();
        } else if (startBtn.dataset.status === 'enabled') {
          addRandomNote();
        }
      }
    });
  }

  pushKeys();

  function removeClassPush(key) {
    key.classList.remove('key_push');
  }    

  function changeNote(note) {
    let  currentNote = document.querySelector('.note');
    switch(note) {
      case 'do_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 're_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'mi_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break; 
      case 'fa_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'sol_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;  
      case 'lya_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'si_one':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'do_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 're_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'mi_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break; 
      case 'fa_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'sol_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;  
      case 'lya_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'si_two':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
      case 'do_three':
        currentNote.className = `note note__${note}`;
        currentNote.dataset.name = note.split('_')[0];
        break;
    }
  }
};

// class User {
//   constructor(name) {
//     this.name = name;
//   }  
//   getUsers() {
//     let usersPromise = fetch('http://localhost:3000/users').then(res => {
//     return res.json();
//   });
//   usersPromise.then (
//     res => {
//       // console.log(res);
//     },
//     err => {
//       console.log('Error');
//     }
//   );
//   }
// }

