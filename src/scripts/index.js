import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

window.onload = function() {

  let keyboard = document.createElement('div'),
      instrument = document.createElement('div'),
      app = document.querySelector('.app'),
      tools = document.createElement('div'),
      musicClef = document.querySelector('#clef'),
      pickCheckboxes = document.querySelectorAll('.checkboxOctave'),
      timer = document.querySelectorAll('.timer');


  function createPiano() {
    instrument.className = 'piano';
    instrument.innerHTML = `
    <div class="piano__panel"></div>
    <div class="piano__redLine"></div>
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
          cls+= ' key__white';
          break;
        case 'black': 
          cls+= ' key__black';
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
    <input type="checkbox" class="checkboxOctave" value="octaveOne" checked> 1-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveTwo" checked> 2-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveThree"> 3-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveFour"> 4-я октава
    <input type="checkbox" class="checkboxOctave" value="octaveSmall"> малая октава
    <input type="checkbox" class="checkboxOctave" value="octaveBig"> большая октава
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
    <div class="stan__clef-treble" id="clef"></div>
    <div class="stan__note"></div>`;
    app.prepend(musicStan);
  }

  createMusicStan();

  function changeMusicClef(clefName) {
    switch(clefName) {
      case 'bass':
        musicClef.className = `stan__clef-${clefName}`;
        break;
      case 'treble':
        musicClef.className = `stan__clef-${clefName}`;
        break;
    }
  }

  function pickNotes() {
    let notes = [];
    pickCheckboxes.forEach(box => {  
      if(box.checked) {
        switch (box.value) {
          case 'octaveOne': {
            notes.push('do-one', 're-one', 'mi-one', 'fa-one', 'sol-one', 'lya-one', 'si-one');
            break;
          }
          case 'octaveTwo': {
            notes.push('do-two', 're-two', 'mi-two', 'fa-two', 'sol-two', 'lya-two', 'si-two');
            break;
          }
          case 'octaveThree': {
            notes.push('do-three');
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
    let interval;
    timer.forEach(box => {
      if (box.checked) {
        interval = box.value;
      }
    });
    return interval;
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
    let  currentNote = document.querySelector('.stan__note');
    let infPanel = document.querySelector('.piano__panel');
    if (currentNote.id.includes(keyNote)) {
      infPanel.innerText = `Молодец!`;
    } else {
        inf = currentNote.dataset.name;
        infPanel.innerText = `Не верно! Верная нота: ${inf}`;
      }
  }

  function pushKeys() {
    let  currentNote = document.querySelector('.stan__note');
    let startBtn = document.querySelector('.start');
    document.addEventListener('click', (e) => {
      if(e.target.className === 'key key__white' || e.target.className === 'key key__black') {
        let key = e.target;
        let keyUrl = e.target.dataset.url;
        let keyName = e.target.dataset.name;
        checkWin(keyName);
        soundClick(keyUrl);
        key.classList.add('key-push');
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
    key.classList.remove('key-push');
  }    

  function changeNote(note) {
    let  currentNote = document.querySelector('.stan__note');
    switch(note) {
      case 'do-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 're-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'mi-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break; 
      case 'fa-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'sol-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;  
      case 'lya-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'si-one':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'do-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 're-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'mi-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break; 
      case 'fa-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'sol-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;  
      case 'lya-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'si-two':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
        break;
      case 'do-three':
        currentNote.id = note;
        currentNote.dataset.name = note.split('-')[0];
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

