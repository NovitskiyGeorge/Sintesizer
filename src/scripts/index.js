import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

window.onload = function() {

  let piano = document.querySelector('.piano'),
      keyboard = document.createElement('div'),
      instrument = document.createElement('div'),
      app = document.querySelector('.app');


  function createPiano() {
    instrument.className = 'piano';
    instrument.innerHTML = `
    <div class="piano__panel"></div>
    <div class="piano__redLine"></div>
    `;
    app.append(instrument);
  }

  function createKeyboard() {
    this.keyboard.className = 'keyboard';
    let html = this.components.map(key => {
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
    this.keyboard.innerHTML = htmlString;
    this.piano.appendChild(this.keyboard);
  }
};



function getKeys() {
  let keysPromise = fetch('http://localhost:3000/keys').then(res => {
    return res.json();
  });
  keysPromise.then (
    res => {
      let keyboard = new Piano(res);
      keyboard.createKeyboard();
    },
    err => {
      console.log('Error');
    }
  );
}



class Piano {
  constructor(components) {

  }





}

class Tools {
  constructor(nameTools) {
    this.nameTools = nameTools;
    this.app = document.querySelector('.app');
    this.stan = document.querySelector('.stan');
    this.tools = document.createElement('div');
    this.musicClef = document.querySelector('#clef');
    this.currentNote = document.querySelector('.stan__note');
    this.startBtn = document.querySelector('.start');
    this.infPanel = document.querySelector('.piano__panel');
    this.select = document.querySelector('select');
    this.pickCheckboxes = document.querySelectorAll('.checkboxOctave');
    this.timer = document.querySelectorAll('.timer');
  }
  createSelect() {
    this.tools.className = 'tools';
    this.tools.innerHTML = `  
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
    this.app.prepend(this.tools);
  }
  createMusicStan() {
    let musicStan = document.createElement('div');
    musicStan.className = 'stan';
    musicStan.innerHTML = `
    <div class="stan__clef-treble" id="clef"></div>
    <div class="stan__note"></div>`;
    this.app.prepend(musicStan);
  }
  changeMusicClef() {
    switch(this.nameTools) {
      case 'bass':
        this.musicClef.className = `stan__clef-${this.nameTools}`;
        break;
      case 'treble':
        this.musicClef.className = `stan__clef-${this.nameTools}`;
        break;
    }
  }
  changeNote() {
    switch(this.nameTools) {
      case 'do-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 're-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'mi-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break; 
      case 'fa-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'sol-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;  
      case 'lya-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'si-one':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'do-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 're-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'mi-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break; 
      case 'fa-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'sol-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;  
      case 'lya-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'si-two':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
      case 'do-three':
        this.currentNote.id = this.nameTools;
        this.currentNote.dataset.name = this.nameTools.split('-')[0];
        break;
    }
  }

  getRandomNote() {
    if(this.select.value === 'treble'){
      let notes = new Tools().pickNotes();
      let key = new Tools().getRandomInt(0, notes.length-1);
      return notes[key];
    }
  }

  start() {
      this.startBtn.addEventListener('click', () => {
      this.startBtn.dataset.status = 'enabled';
      new Tools().addRandomNote();
      let interval = +new Tools().getTimer();
      console.log(interval);
      setTimeout(this.changeStatusBtnStart.bind(this.startBtn), interval);
    });
  }

  getTimer() {
    let interval;
    this.timer.forEach(box => {
      if (box.checked) {
        interval = box.value;
      }
    });
    return interval;
  }
 
  addRandomNote() {
    let note = new Tools().getRandomNote();
    let tools = new Tools(note);
    tools.changeNote();
  }

  changeStatusBtnStart() {
    this.dataset.status = 'disabled';
    console.log(this.dataset.status);
  }

  selectClef() {
    document.addEventListener('change', function (e) {
      if(e.target.dataset.name === 'clef') {
        let clefName = e.target.value;
        let tools = new Tools(clefName);
        tools.changeMusicClef();
      }
    });
  }
  soundClick(keyUrl) {
    let audio = new Audio();
    audio.src = keyUrl;
    audio.autoplay = true;
  }

  checkWin(keyNote) {
    let inf;
    if (this.currentNote.id.includes(keyNote)) {
      this.infPanel.innerText = `Молодец!`;
    } else {
      inf = this.currentNote.dataset.name;
      this.infPanel.innerText = `Не верно! Верная нота: ${inf}`;
      }
  }
  pickNotes() {
    let notes = [];
    this.pickCheckboxes.forEach(box => {  
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
  pushKeys() {
    document.addEventListener('click', (e) => {
      if(e.target.className === 'key key__white' || e.target.className === 'key key__black') {
        let key = e.target;
        let keyUrl = e.target.dataset.url;
        let keyName = e.target.dataset.name;
        new Tools().checkWin(keyName);
        new Tools().soundClick(keyUrl);
        key.classList.add('key-push');
        setTimeout(new Tools().removeClassPush, 50, key);
        if (keyName === this.currentNote.dataset.name) {
          new Tools().addRandomNote();
        } else if (this.startBtn.dataset.status === 'enabled') {
          new Tools().addRandomNote();
        }
      }
    });
  }
  removeClassPush(key) {
    key.classList.remove('key-push');
  }    
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
}
class User {
  constructor(name) {
    this.name = name;
  }  
  getUsers() {
    let usersPromise = fetch('http://localhost:3000/users').then(res => {
    return res.json();
  });
  usersPromise.then (
    res => {
      // console.log(res);
    },
    err => {
      console.log('Error');
    }
  );
  }
}

function init() {
  new Piano().createPiano();
  new Piano().getKeys();
  new Tools().createSelect();
  new Tools().createMusicStan();
  new Tools().addRandomNote();
  new Tools().pushKeys();
  new Tools().selectClef();  
  new Tools().start();
}

init();