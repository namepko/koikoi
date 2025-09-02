class EmojiSupport {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.height = 32;
    this.emojiSupported = new Map();
    this.systemSupportsEmoji = this.checkSystemEmojiSupport();
  }
  checkSystemEmojiSupport() {
    try {
      const ua = navigator.userAgent;
      if (ua.includes('Windows') || ua.includes('Mac') || ua.includes('Linux')) {
        if (ua.includes('Chrome') || ua.includes('Firefox') || ua.includes('Safari') || ua.includes('Edge')) {
          return true;
        }
      }
      if (ua.includes('iPhone') || ua.includes('iPad')) return true;
      if (ua.includes('Android')) {
        const match = ua.match(/Android (\d+\.\d+)/);
        if (match && parseFloat(match[1]) >= 4.4) return true;
      }
      return true;
    } catch (error) {
      return true;
    }
  }
  canDisplayEmoji(emoji) {
    if (!this.systemSupportsEmoji) return false;
    if (this.emojiSupported.has(emoji)) return this.emojiSupported.get(emoji);
    let canDisplay = true;
    try {
      this.ctx.clearRect(0, 0, 32, 32);
      this.ctx.textBaseline = 'top';
      this.ctx.font = '24px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", "Android Emoji"';
      this.ctx.fillStyle = '#000';
      this.ctx.fillText(emoji, 0, 0);
      
      const imageData = this.ctx.getImageData(0, 0, 32, 32);
      const pixels = imageData.data;
      let coloredPixels = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) coloredPixels++;
      }
      canDisplay = coloredPixels > 10;
    } catch (error) {
      canDisplay = true;
    }
    this.emojiSupported.set(emoji, canDisplay);
    return canDisplay;
  }
  getFallbackText(card) {
    const fallbackMap = {
      '松': { light: '松光', ribbon: '松短', seed: '松種', chaff: '松カス' },
      '梅': { light: '梅光', ribbon: '梅短', seed: '梅種', chaff: '梅カス' },
      '桜': { light: '桜光', ribbon: '桜短', seed: '桜種', chaff: '桜カス' },
      '藤': { light: '藤光', ribbon: '藤短', seed: '藤種', chaff: '藤カス' },
      '菖蒲': { light: '菖光', ribbon: '菖短', seed: '菖種', chaff: '菖カス' },
      '牡丹': { light: '牡光', ribbon: '牡短', seed: '牡種', chaff: '牡カス' },
      '萩': { light: '萩光', ribbon: '萩短', seed: '萩種', chaff: '萩カス' },
      '芒': { light: '芒光', ribbon: '芒短', seed: '芒種', chaff: '芒カス' },
      '菊': { light: '菊光', ribbon: '菊短', seed: '菊種', chaff: '菊カス' },
      '紅葉': { light: '紅光', ribbon: '紅短', seed: '紅種', chaff: '紅カス' },
      '柳': { light: '柳光', ribbon: '柳短', seed: '柳種', chaff: '柳カス' },
      '桐': { light: '桐光', ribbon: '桐短', seed: '桐種', chaff: '桐カス' }
    };
    const typeMap = {
      '光': 'light', '赤短': 'ribbon', '青短': 'ribbon', '種': 'seed',
      'カス': 'chaff', 'カス1': 'chaff', 'カス2': 'chaff', 'カス3': 'chaff'
    };
    const type = typeMap[card.type] || 'chaff';
    return fallbackMap[card.name]?.[type] || `${card.name}${card.type}`;
  }
  setCardDisplay(element, card) {
    const emoji = card.emoji;
    if (this.canDisplayEmoji(emoji)) {
      const emojiArray = Array.from(emoji);
      if (emojiArray.length > 1) {
        element.innerHTML = '';
        emojiArray.forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'block';
          span.style.lineHeight = '1.0';
          if (index > 0) span.style.marginTop = '2px';
          element.appendChild(span);
        });
      } else {
        element.textContent = emoji;
      }
      element.classList.remove('fallback-display');
    } else {
      element.textContent = this.getFallbackText(card);
      element.classList.add('fallback-display');
    }
  }
}

const emojiSupport = new EmojiSupport();

const cardData = [
  {id:0,name:'松',type:'光',emoji:'🌲🦢',iconClass:'icon-glow'},
  {id:1,name:'松',type:'赤短',emoji:'🌲🔴',iconClass:'icon-ribbon'},
  {id:2,name:'松',type:'カス1',emoji:'🌲🍂',iconClass:'icon-chaff'},
  {id:3,name:'松',type:'カス2',emoji:'🌲🍃',iconClass:'icon-chaff'},
  {id:4,name:'梅',type:'種',emoji:'🍑🐦',iconClass:'icon-seed'},
  {id:5,name:'梅',type:'赤短',emoji:'🍑🔴',iconClass:'icon-ribbon'},
  {id:6,name:'梅',type:'カス1',emoji:'🍑🍂',iconClass:'icon-chaff'},
  {id:7,name:'梅',type:'カス2',emoji:'🍑🍃',iconClass:'icon-chaff'},
  {id:8,name:'桜',type:'光',emoji:'🌸🎪',iconClass:'icon-glow'},
  {id:9,name:'桜',type:'赤短',emoji:'🌸🔴',iconClass:'icon-ribbon'},
  {id:10,name:'桜',type:'カス1',emoji:'🌸🍂',iconClass:'icon-chaff'},
  {id:11,name:'桜',type:'カス2',emoji:'🌸🍃',iconClass:'icon-chaff'},
  {id:12,name:'藤',type:'種',emoji:'🌿🐦',iconClass:'icon-seed'},
  {id:13,name:'藤',type:'赤短',emoji:'🌿🔴',iconClass:'icon-ribbon'},
  {id:14,name:'藤',type:'カス1',emoji:'🌿🍂',iconClass:'icon-chaff'},
  {id:15,name:'藤',type:'カス2',emoji:'🌿🍃',iconClass:'icon-chaff'},
  {id:16,name:'菖蒲',type:'種',emoji:'🪻🌉',iconClass:'icon-seed'},
  {id:17,name:'菖蒲',type:'赤短',emoji:'🪻🔴',iconClass:'icon-ribbon'},
  {id:18,name:'菖蒲',type:'カス1',emoji:'🪻🍂',iconClass:'icon-chaff'},
  {id:19,name:'菖蒲',type:'カス2',emoji:'🪻🍃',iconClass:'icon-chaff'},
  {id:20,name:'牡丹',type:'種',emoji:'🌹🦋',iconClass:'icon-seed'},
  {id:21,name:'牡丹',type:'青短',emoji:'🌹🔵',iconClass:'icon-ribbon'},
  {id:22,name:'牡丹',type:'カス1',emoji:'🌹🍂',iconClass:'icon-chaff'},
  {id:23,name:'牡丹',type:'カス2',emoji:'🌹🍃',iconClass:'icon-chaff'},
  {id:24,name:'萩',type:'種',emoji:'💐🐗',iconClass:'icon-seed'},
  {id:25,name:'萩',type:'赤短',emoji:'💐🔴',iconClass:'icon-ribbon'},
  {id:26,name:'萩',type:'カス1',emoji:'💐🍂',iconClass:'icon-chaff'},
  {id:27,name:'萩',type:'カス2',emoji:'💐🍃',iconClass:'icon-chaff'},
  {id:28,name:'芒',type:'光',emoji:'🌾🌝',iconClass:'icon-glow'},
  {id:29,name:'芒',type:'種',emoji:'🌾🦆',iconClass:'icon-seed'},
  {id:30,name:'芒',type:'カス1',emoji:'🌾🍂',iconClass:'icon-chaff'},
  {id:31,name:'芒',type:'カス2',emoji:'🌾🍃',iconClass:'icon-chaff'},
  {id:32,name:'菊',type:'種',emoji:'🌻🍶',iconClass:'icon-seed'},
  {id:33,name:'菊',type:'青短',emoji:'🌻🔵',iconClass:'icon-ribbon'},
  {id:34,name:'菊',type:'カス1',emoji:'🌻🍂',iconClass:'icon-chaff'},
  {id:35,name:'菊',type:'カス2',emoji:'🌻🍃',iconClass:'icon-chaff'},
  {id:36,name:'紅葉',type:'種',emoji:'🍁🦌',iconClass:'icon-seed'},
  {id:37,name:'紅葉',type:'青短',emoji:'🍁🔵',iconClass:'icon-ribbon'},
  {id:38,name:'紅葉',type:'カス1',emoji:'🍁🍂',iconClass:'icon-chaff'},
  {id:39,name:'紅葉',type:'カス2',emoji:'🍁🍃',iconClass:'icon-chaff'},
  {id:40,name:'柳',type:'光',emoji:'🌵☔',iconClass:'icon-glow'},
  {id:41,name:'柳',type:'種',emoji:'🌵🐦',iconClass:'icon-seed'},
  {id:42,name:'柳',type:'赤短',emoji:'🌵🔴',iconClass:'icon-ribbon'},
  {id:43,name:'柳',type:'カス',emoji:'🌵🍂',iconClass:'icon-chaff'},
  {id:44,name:'桐',type:'光',emoji:'🎋🦚',iconClass:'icon-glow'},
  {id:45,name:'桐',type:'カス1',emoji:'🎋🍂',iconClass:'icon-chaff'},
  {id:46,name:'桐',type:'カス2',emoji:'🎋🍃',iconClass:'icon-chaff'},
  {id:47,name:'桐',type:'カス3',emoji:'🎋🍀',iconClass:'icon-chaff'}
];

class GameState {
  constructor() {
    this.deck = [];
    this.playerHand = [];
    this.aiHand = [];
    this.fieldCards = [];
    this.playerPairedCards = [];
    this.opponentPairedCards = [];
    this.playerScore = 0;
    this.opponentScore = 0;
    this.isPlayerTurn = true;
    this.gameInProgress = false;
    this.selectedHandCard = null;
    this.waitingForFieldSelection = false;
    this.availableFieldCards = [];
    this.decisionPhase = false;
    this.currentRoles = [];
    this.roleModalActive = false;
    this.playerKoikoiDeclared = false;
    this.opponentKoikoiDeclared = false;
    this.pendingPlayerRoles = [];
    this.koikoiMultiplier = 1;
  }
  reset() {
    this.deck = [];
    this.playerHand = [];
    this.aiHand = [];
    this.fieldCards = [];
    this.playerPairedCards = [];
    this.opponentPairedCards = [];
    this.selectedHandCard = null;
    this.waitingForFieldSelection = false;
    this.availableFieldCards = [];
    this.decisionPhase = false;
    this.currentRoles = [];
    this.roleModalActive = false;
    this.gameInProgress = true;
    this.playerKoikoiDeclared = false;
    this.opponentKoikoiDeclared = false;
    this.pendingPlayerRoles = [];
    this.koikoiMultiplier = 1;
  }
  resetRound() {
    const currentPlayerScore = this.playerScore;
    const currentOpponentScore = this.opponentScore;
    this.reset();
    this.playerScore = currentPlayerScore;
    this.opponentScore = currentOpponentScore;
  }
}

const gameState = new GameState();

const elements = {
  message: document.getElementById('message'),
  messageSection: document.getElementById('message-section'),
  fieldCardsDiv: document.getElementById('field-cards'),
  opponentHandDiv: document.getElementById('opponent-hand'),
  opponentPairedDiv: document.getElementById('opponent-paired'),
  deckDiv: document.querySelector('.deck'),
  koikoiBtn: document.getElementById('koikoi-btn'),
  winBtn: document.getElementById('win-btn'),
  discardBtn: document.getElementById('discard-btn'),
  resetBtn: document.getElementById('reset-btn'),
  rolesBtn: document.getElementById('roles-btn'),
  playerHandDiv: document.getElementById('player-hand'),
  playerPairedDiv: document.getElementById('player-paired'),
  decisionOverlay: document.getElementById('decision-overlay'),
  playerScoreDiv: document.getElementById('player-score'),
  opponentScoreDiv: document.getElementById('opponent-score'),
  playerScoreBtn: document.getElementById('player-score-btn'),
  opponentScoreBtn: document.getElementById('opponent-score-btn'),
  rolesModalBackdrop: document.getElementById('roles-modal-backdrop'),
  rolesModalIframe: document.getElementById('roles-modal-iframe'),
  rolesModalCloseBtn: document.getElementById('roles-modal-close-btn'),
  gameResultModalBackdrop: document.getElementById('game-result-modal-backdrop'),
  gameResultTitle: document.getElementById('game-result-title'),
  gameResultStats: document.getElementById('game-result-stats'),
  finalPlayerScore: document.getElementById('final-player-score'),
  finalOpponentScore: document.getElementById('final-opponent-score'),
  nextGameBtn: document.getElementById('next-game-btn'),
  endGameBtn: document.getElementById('end-game-btn'),
  goodbyeModalBackdrop: document.getElementById('goodbye-modal-backdrop'),
  goodbyePlayerScore: document.getElementById('goodbye-player-score'),
  goodbyeOpponentScore: document.getElementById('goodbye-opponent-score')
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCardValue(card) {
  const monthOrder = ['松', '梅', '桜', '藤', '菖蒲', '牡丹', '萩', '芒', '菊', '紅葉', '柳', '桐'];
  const monthValue = monthOrder.indexOf(card.name);
  if (card.type === '光') return 1000 + monthValue;
  if (card.type === '種') return 800 + monthValue;
  if (card.type === '赤短' || card.type === '青短') return 600 + monthValue;
  return 400 + monthValue;
}

function sortHand(hand) {
  return hand.slice().sort((a, b) => getCardValue(b) - getCardValue(a));
}

function getCardTypeClass(card) {
  if (card.type === '光') return 'card-light';
  if (card.type === '赤短' || card.type === '青短') return 'card-ribbon';
  if (card.type === '種') return 'card-seed';
  return 'card-chaff';
}

function initializeGame() {
  gameState.reset();
  gameState.deck = shuffleArray(cardData);
  gameState.playerHand = gameState.deck.splice(0, 8);
  gameState.aiHand = gameState.deck.splice(0, 8);
  gameState.fieldCards = gameState.deck.splice(0, 8);
  gameState.fieldCards.sort((a, b) => getCardValue(b) - getCardValue(a));
  gameState.gameInProgress = true;
  gameState.isPlayerTurn = true;
  updateUI();
  setMessage('🎯ゲーム開始！手札からカードを選んでください');
}

function setMessage(msg) {
  if (elements.message) {
    elements.message.textContent = msg;
  }
  updateMessageStyle();
}

function updateMessageStyle() {
  if (!elements.messageSection) return;
  if (gameState.isPlayerTurn && gameState.gameInProgress && !gameState.roleModalActive && !gameState.decisionPhase) {
    elements.messageSection.classList.add('player-turn');
  } else {
    elements.messageSection.classList.remove('player-turn');
  }
}

function updateUI() {
  updatePlayerHand();
  updatePlayerPaired();
  updateOpponentHand();
  updateOpponentPaired();
  updateFieldCards();
  updateDeck();
  updateScores();
  updateButtons();
  updateHighlights();
}

function updatePlayerHand() {
  if (!elements.playerHandDiv) return;
  elements.playerHandDiv.innerHTML = '';
  const sortedHand = sortHand(gameState.playerHand);
  sortedHand.forEach((card, index) => {
    const originalIndex = gameState.playerHand.findIndex(c => c.id === card.id);
    const div = createCardElement(card, 'hand-card');
    
    if (gameState.isPlayerTurn && 
        gameState.gameInProgress && 
        !gameState.decisionPhase && 
        !gameState.roleModalActive) {
      div.style.cursor = 'pointer';
      div.onclick = () => selectHandCard(originalIndex);
      
      const hasMatch = gameState.fieldCards.some(f => f.name === card.name);
      if (hasMatch) {
        div.classList.add('has-match');
      }
    } else {
      div.style.cursor = 'default';
      div.onclick = null;
    }
    
    elements.playerHandDiv.appendChild(div);
  });
}

function updatePlayerPaired() {
  if (!elements.playerPairedDiv) return;
  elements.playerPairedDiv.innerHTML = '';
  const sortedPaired = sortHand(gameState.playerPairedCards);
  sortedPaired.forEach(card => {
    const div = createCardElement(card, 'hand-card');
    div.style.cursor = 'default';
    elements.playerPairedDiv.appendChild(div);
  });
}

function updateOpponentHand() {
  if (!elements.opponentHandDiv) return;
  elements.opponentHandDiv.innerHTML = '';
  for (let i = 0; i < gameState.aiHand.length; i++) {
    const div = document.createElement('div');
    div.className = 'opponent-card';
    elements.opponentHandDiv.appendChild(div);
  }
}

function updateOpponentPaired() {
  if (!elements.opponentPairedDiv) return;
  elements.opponentPairedDiv.innerHTML = '';
  const sortedPaired = sortHand(gameState.opponentPairedCards);
  sortedPaired.forEach(card => {
    const div = createCardElement(card, 'opponent-paired-card');
    elements.opponentPairedDiv.appendChild(div);
  });
}

function updateFieldCards() {
  if (!elements.fieldCardsDiv) return;
  elements.fieldCardsDiv.innerHTML = '';
  gameState.fieldCards.forEach((card, index) => {
    const div = createCardElement(card, 'field-card');
    
    if (gameState.isPlayerTurn && gameState.gameInProgress && !gameState.decisionPhase && !gameState.roleModalActive) {
      div.style.cursor = 'pointer';
      div.onclick = () => selectFieldCard(index);
      
      if (gameState.waitingForFieldSelection && gameState.availableFieldCards.includes(index)) {
        div.classList.add('selectable');
      }
    } else {
      div.style.cursor = 'default';
      div.onclick = null;
    }
    
    elements.fieldCardsDiv.appendChild(div);
  });
}

function updateDeck() {
  if (elements.deckDiv) {
    elements.deckDiv.textContent = gameState.deck.length.toString();
  }
}

function updateScores() {
  if (elements.playerScoreDiv) {
    elements.playerScoreDiv.textContent = `💰${gameState.playerScore}Pt`;
    if (gameState.playerScore >= 10) {
      elements.playerScoreBtn?.classList.add('high-score');
    } else {
      elements.playerScoreBtn?.classList.remove('high-score');
    }
  }
  if (elements.opponentScoreDiv) {
    elements.opponentScoreDiv.textContent = `💰${gameState.opponentScore}Pt`;
    if (gameState.opponentScore >= 10) {
      elements.opponentScoreBtn?.classList.add('high-score');
    } else {
      elements.opponentScoreBtn?.classList.remove('high-score');
    }
  }
}

function updateButtons() {
  if (gameState.decisionPhase && gameState.isPlayerTurn) {
    if (elements.koikoiBtn) {
      elements.koikoiBtn.disabled = false;
      elements.koikoiBtn.classList.add('koikoi-blink');
    }
    if (elements.winBtn) {
      elements.winBtn.disabled = false;
      elements.winBtn.classList.add('win-blink');
    }
    if (elements.decisionOverlay) {
      elements.decisionOverlay.classList.add('active');
    }
  } else {
    if (elements.koikoiBtn) {
      elements.koikoiBtn.disabled = true;
      elements.koikoiBtn.classList.remove('koikoi-blink');
    }
    if (elements.winBtn) {
      elements.winBtn.disabled = true;
      elements.winBtn.classList.remove('win-blink');
    }
    if (elements.decisionOverlay) {
      elements.decisionOverlay.classList.remove('active');
    }
  }
}

function createCardElement(card, className) {
  const div = document.createElement('div');
  div.className = `${className} ${getCardTypeClass(card)}`;
  emojiSupport.setCardDisplay(div, card);
  if (card.iconClass) div.classList.add(card.iconClass);
  div.title = `${card.name}（${card.type}）`;
  return div;
}

function updateHighlights() {
  document.querySelectorAll('.can-take, .can-discard, .hover-highlight').forEach(el => {
    el.classList.remove('can-take', 'can-discard', 'hover-highlight');
  });
  if (elements.discardBtn) {
    elements.discardBtn.style.display = 'none';
  }
  if (gameState.selectedHandCard !== null) {
    const selectedCard = gameState.playerHand[gameState.selectedHandCard];
    if (selectedCard) {
      const matchingFieldCards = gameState.fieldCards
        .map((card, index) => card.name === selectedCard.name ? index : -1)
        .filter(index => index !== -1);
      
      if (matchingFieldCards.length > 0) {
        const sortedHand = sortHand(gameState.playerHand);
        const sortedIndex = sortedHand.findIndex(c => c.id === selectedCard.id);
        if (sortedIndex !== -1 && elements.playerHandDiv.children[sortedIndex]) {
          elements.playerHandDiv.children[sortedIndex].classList.add('can-take');
        }
        
        matchingFieldCards.forEach(fieldIndex => {
          if (elements.fieldCardsDiv.children[fieldIndex]) {
            elements.fieldCardsDiv.children[fieldIndex].classList.add('can-take');
          }
        });
      } else {
        const sortedHand = sortHand(gameState.playerHand);
        const sortedIndex = sortedHand.findIndex(c => c.id === selectedCard.id);
        if (sortedIndex !== -1 && elements.playerHandDiv.children[sortedIndex]) {
          elements.playerHandDiv.children[sortedIndex].classList.add('can-discard');
        }
        
        if (elements.discardBtn) {
          elements.discardBtn.style.display = 'block';
          elements.discardBtn.style.position = 'absolute';
          elements.discardBtn.style.bottom = '12px';
          elements.discardBtn.style.left = '50%';
          elements.discardBtn.style.transform = 'translateX(-50%)';
          elements.discardBtn.style.zIndex = '200';
        }
      }
    }
  }
}

function selectHandCard(handIndex) {
  if (!gameState.gameInProgress || !gameState.isPlayerTurn || gameState.decisionPhase || gameState.roleModalActive) {
    return;
  }
  if (handIndex < 0 || handIndex >= gameState.playerHand.length) {
    return;
  }
  if (gameState.selectedHandCard === handIndex) {
    gameState.selectedHandCard = null;
    gameState.waitingForFieldSelection = false;
    gameState.availableFieldCards = [];
    setMessage('👆手札からカードを選んでください');
  } else {
    gameState.selectedHandCard = handIndex;
    const selectedCard = gameState.playerHand[handIndex];
    
    const matchingFieldCards = gameState.fieldCards
      .map((card, index) => card.name === selectedCard.name ? index : -1)
      .filter(index => index !== -1);
    
    if (matchingFieldCards.length > 1) {
      gameState.waitingForFieldSelection = true;
      gameState.availableFieldCards = matchingFieldCards;
      setMessage(`🎯${selectedCard.name}が複数あります。取る札をクリックしてください`);
    } else if (matchingFieldCards.length === 1) {
      gameState.waitingForFieldSelection = true;
      gameState.availableFieldCards = matchingFieldCards;
      setMessage(`✨${selectedCard.name}と同じ札があります。クリックして取ってください`);
    } else {
      gameState.waitingForFieldSelection = false;
      gameState.availableFieldCards = [];
      setMessage(`🗑️${selectedCard.name}と同じ札がありません。「札をすてる」ボタンを押してください`);
    }
  }
  updateHighlights();
  updateUI();
}

function selectFieldCard(fieldIndex) {
  if (!gameState.gameInProgress || !gameState.isPlayerTurn || gameState.selectedHandCard === null) {
    return;
  }
  const selectedCard = gameState.playerHand[gameState.selectedHandCard];
  const fieldCard = gameState.fieldCards[fieldIndex];
  if (selectedCard.name !== fieldCard.name) {
    return;
  }
  if (gameState.waitingForFieldSelection && !gameState.availableFieldCards.includes(fieldIndex)) {
    return;
  }
  const takenHandCard = gameState.playerHand.splice(gameState.selectedHandCard, 1)[0];
  const takenFieldCard = gameState.fieldCards.splice(fieldIndex, 1)[0];
  gameState.playerPairedCards.push(takenHandCard, takenFieldCard);
  gameState.selectedHandCard = null;
  gameState.waitingForFieldSelection = false;
  gameState.availableFieldCards = [];
  setMessage(`🎉${takenHandCard.name}のペアを取りました！`);
  updateUI();
  setTimeout(() => {
    drawFromDeck();
  }, 1000);
}

function discardCard() {
  if (!gameState.gameInProgress || !gameState.isPlayerTurn || gameState.selectedHandCard === null) {
    return;
  }
  const discardedCard = gameState.playerHand.splice(gameState.selectedHandCard, 1)[0];
  gameState.fieldCards.push(discardedCard);
  gameState.fieldCards.sort((a, b) => getCardValue(b) - getCardValue(a));
  gameState.selectedHandCard = null;
  gameState.waitingForFieldSelection = false;
  gameState.availableFieldCards = [];
  setMessage(`🗑️${discardedCard.name}を場に捨てました`);
  updateUI();
  setTimeout(() => {
    drawFromDeck();
  }, 1000);
}

function drawFromDeck() {
  if (gameState.deck.length === 0) {
    endRound();
    return;
  }
  const drawnCard = gameState.deck.shift();
  const matchingFieldIndex = gameState.fieldCards.findIndex(card => card.name === drawnCard.name);
  if (matchingFieldIndex !== -1) {
    const matchedCard = gameState.fieldCards.splice(matchingFieldIndex, 1)[0];
    
    if (gameState.isPlayerTurn) {
      gameState.playerPairedCards.push(drawnCard, matchedCard);
      setMessage(`🎴山札から${drawnCard.name}を引いてペアを取りました！`);
    } else {
      gameState.opponentPairedCards.push(drawnCard, matchedCard);
      setMessage(`🤖相手が山札から${drawnCard.name}を引いてペアを取りました`);
    }
  } else {
    gameState.fieldCards.push(drawnCard);
    gameState.fieldCards.sort((a, b) => getCardValue(b) - getCardValue(a));
    setMessage(`🎴山札から${drawnCard.name}を引いて場に置きました`);
  }
  updateUI();
  setTimeout(() => {
    checkForRoles();
  }, 1000);
}

function checkForRoles() {
  const roles = calculateRoles(gameState.isPlayerTurn ? gameState.playerPairedCards : gameState.opponentPairedCards);
  if (roles.length > 0) {
    gameState.currentRoles = roles;
    
    if (gameState.isPlayerTurn) {
      const mainRole = roles[0];
      const totalPoints = roles.reduce((sum, role) => sum + role.points, 0);
      const allCards = roles.flatMap(role => role.cards);
      
      showRoleCelebration('😯じぶん', mainRole.name, totalPoints, allCards);
      showRoleMessage(`${mainRole.name}完成！💰${totalPoints}ポイント獲得可能`);
      
      setTimeout(() => {
        gameState.decisionPhase = true;
        const roleNames = roles.map(role => role.name).join('、');
        setMessage(`🎯${roleNames}ができました！🎲こいこいか👋勝負を選んでください`);
        updateUI();
      }, 1000);
      return;
    } else {
      handleOpponentRoles(roles);
      return;
    }
  }
  
  if (gameState.playerHand.length === 0 || gameState.aiHand.length === 0) {
    endRound();
    return;
  }
  nextTurn();
}

function handleOpponentRoles(roles) {
  const points = roles.reduce((sum, role) => sum + role.points, 0);
  const mainRole = roles[0];
  const allCards = roles.flatMap(role => role.cards);
  
  showRoleCelebration('🤖あいて', mainRole.name, points, allCards);
  
  setTimeout(() => {
    if (gameState.playerKoikoiDeclared) {
      setMessage(`😱相手が${roles.map(role => role.name).join('、')}で💰${points}点獲得！🎲こいこい宣言が無効になりました`);
      gameState.opponentScore += points;
      gameState.playerKoikoiDeclared = false;
      gameState.pendingPlayerRoles = [];
      gameState.koikoiMultiplier = 1;
    } else {
      setMessage(`🤖相手が${roles.map(role => role.name).join('、')}で💰${points}点獲得！`);
      gameState.opponentScore += points;
    }
    updateUI();
    setTimeout(() => {
      endRound();
    }, 2000);
  }, 3500);
}

function calculateRoles(pairedCards) {
  const roles = [];
  const lightCards = pairedCards.filter(c => c.type === '光');
  const ribbonCards = pairedCards.filter(c => c.type === '赤短' || c.type === '青短');
  const seedCards = pairedCards.filter(c => c.type === '種');
  const chaffCards = pairedCards.filter(c => c.type.includes('カス'));
  
  if (lightCards.length >= 5) {
    roles.push({name: '五光', points: 15, cards: lightCards});
  } else if (lightCards.length >= 4) {
    const hasRainMan = lightCards.some(c => c.name === '柳');
    if (hasRainMan) {
      roles.push({name: '雨四光', points: 8, cards: lightCards});
    } else {
      roles.push({name: '四光', points: 10, cards: lightCards});
    }
  } else if (lightCards.length >= 3) {
    roles.push({name: '三光', points: 5, cards: lightCards});
  }
  
  if (ribbonCards.length >= 5) {
    roles.push({name: '短冊', points: ribbonCards.length - 4, cards: ribbonCards});
  }
  
  if (seedCards.length >= 5) {
    roles.push({name: '種', points: seedCards.length - 4, cards: seedCards});
  }
  
  if (chaffCards.length >= 10) {
    roles.push({name: 'カス', points: chaffCards.length - 9, cards: chaffCards});
  }
  
  return roles;
}

function koikoiSelected() {
  if (!gameState.decisionPhase) return;
  hideRoleMessage();
  
  const roleNames = gameState.currentRoles.map(role => role.name).join('、');
  gameState.playerKoikoiDeclared = true;
  gameState.pendingPlayerRoles = [...gameState.currentRoles];
  gameState.koikoiMultiplier = 2;
  gameState.decisionPhase = false;
  gameState.currentRoles = [];
  setMessage(`🎲こいこい宣言！${roleNames}でゲーム続行（リスクあり）`);
  updateUI();
  setTimeout(() => {
    nextTurn();
  }, 2000);
}

function winSelected() {
  if (!gameState.decisionPhase) return;
  hideRoleMessage();
  
  const basePoints = gameState.currentRoles.reduce((sum, role) => sum + role.points, 0);
  const finalPoints = gameState.playerKoikoiDeclared ? basePoints * gameState.koikoiMultiplier : basePoints;
  gameState.playerScore += finalPoints;
  gameState.decisionPhase = false;
  const multiplierText = gameState.playerKoikoiDeclared ? `（🎲こいこい倍点で💰${finalPoints}点）` : '';
  setMessage(`👋勝負！💰${basePoints}点獲得${multiplierText}でラウンド終了`);
  updateUI();
  setTimeout(() => {
    endRound();
  }, 2000);
}

function endRound() {
  gameState.gameInProgress = false;
  const playerFinalScore = calculateFinalScore(gameState.playerPairedCards);
  const opponentFinalScore = calculateFinalScore(gameState.opponentPairedCards);
  gameState.playerScore += playerFinalScore;
  gameState.opponentScore += opponentFinalScore;
  updateUI();
  setTimeout(() => {
    showGameResultModal();
  }, 1000);
}

function showGameResultModal() {
  if (elements.gameResultModalBackdrop) {
    const playerWon = gameState.playerScore > gameState.opponentScore;
    const isDrawn = gameState.playerScore === gameState.opponentScore;
    
    if (elements.gameResultTitle) {
      if (playerWon) {
        elements.gameResultTitle.textContent = '🎉あなたの勝利！';
      } else if (isDrawn) {
        elements.gameResultTitle.textContent = '🤝引き分け！';
      } else {
        elements.gameResultTitle.textContent = '😱負けちゃった・・・';
      }
    }
    
    if (elements.gameResultStats) {
      const statsText = `😯あなた: 💰${gameState.playerScore}点 vs 🤖相手: 💰${gameState.opponentScore}点`;
      
      if (!playerWon && !isDrawn) {
        elements.gameResultStats.innerHTML = `
          ${statsText}<br>
          <div style="margin-top: 12px; font-size: 0.9rem; color: #e74c3c;">
            💪続けるときはリセットしてね！
          </div>
        `;
      } else {
        elements.gameResultStats.innerHTML = statsText;
      }
    }
    
    if (elements.finalPlayerScore) {
      elements.finalPlayerScore.textContent = `💰${gameState.playerScore}`;
    }
    
    if (elements.finalOpponentScore) {
      elements.finalOpponentScore.textContent = `💰${gameState.opponentScore}`;
    }
    
    elements.gameResultModalBackdrop.style.display = 'flex';
  }
}

function startNewRound() {
  if (elements.gameResultModalBackdrop) {
    elements.gameResultModalBackdrop.style.display = 'none';
  }
  const currentPlayerScore = gameState.playerScore;
  const currentOpponentScore = gameState.opponentScore;
  gameState.resetRound();
  gameState.playerScore = currentPlayerScore;
  gameState.opponentScore = currentOpponentScore;
  gameState.deck = shuffleArray(cardData);
  gameState.playerHand = gameState.deck.splice(0, 8);
  gameState.aiHand = gameState.deck.splice(0, 8);
  gameState.fieldCards = gameState.deck.splice(0, 8);
  gameState.fieldCards.sort((a, b) => getCardValue(b) - getCardValue(a));
  gameState.isPlayerTurn = !gameState.isPlayerTurn;
  if (gameState.isPlayerTurn) {
    setMessage('🔄新しいラウンド開始！😯あなたの番です');
  } else {
    setMessage('🔄新しいラウンド開始！🤖相手の番です');
    setTimeout(() => {
      aiTurn();
    }, 1000);
  }
  updateUI();
}

function showGoodbyeModal() {
  if (elements.gameResultModalBackdrop) {
    elements.gameResultModalBackdrop.style.display = 'none';
  }
  if (elements.goodbyeModalBackdrop) {
    if (elements.goodbyePlayerScore) {
      elements.goodbyePlayerScore.textContent = `💰${gameState.playerScore}`;
    }
    
    if (elements.goodbyeOpponentScore) {
      elements.goodbyeOpponentScore.textContent = `💰${gameState.opponentScore}`;
    }
    
    const goodbyeMessageEl = document.getElementById('goodbye-message');
    if (goodbyeMessageEl) {
      if (gameState.playerScore > gameState.opponentScore) {
        goodbyeMessageEl.textContent = '🎉お疲れさまでした！';
      } else if (gameState.playerScore === gameState.opponentScore) {
        goodbyeMessageEl.textContent = '👏いい勝負でした！';
      } else {
        goodbyeMessageEl.innerHTML = '😱また挑戦してね！<br><small style="font-size: 1rem;">💪🔄リセットで再戦可能です</small>';
      }
    }
    
    elements.goodbyeModalBackdrop.style.display = 'flex';
    
    setTimeout(() => {
      elements.goodbyeModalBackdrop.style.display = 'none';
    }, 4000);
  }
}

function nextTurn() {
  if (gameState.playerHand.length === 0 || gameState.aiHand.length === 0 || gameState.deck.length === 0) {
    endRound();
    return;
  }
  gameState.isPlayerTurn = !gameState.isPlayerTurn;
  if (gameState.isPlayerTurn) {
    setMessage('😯あなたの番です。手札からカードを選んでください');
  } else {
    setMessage('🤖相手の番です');
    setTimeout(() => {
      aiTurn();
    }, 1000);
  }
  updateUI();
}

function aiTurn() {
  if (gameState.aiHand.length === 0) {
    endRound();
    return;
  }
  const handIndex = Math.floor(Math.random() * gameState.aiHand.length);
  const selectedCard = gameState.aiHand[handIndex];
  const matchingFieldIndex = gameState.fieldCards.findIndex(card => card.name === selectedCard.name);
  if (matchingFieldIndex !== -1) {
    const takenHandCard = gameState.aiHand.splice(handIndex, 1)[0];
    const takenFieldCard = gameState.fieldCards.splice(matchingFieldIndex, 1)[0];
    gameState.opponentPairedCards.push(takenHandCard, takenFieldCard);
    setMessage(`🤖相手が${selectedCard.name}のペアを取りました`);
  } else {
    const discardedCard = gameState.aiHand.splice(handIndex, 1)[0];
    gameState.fieldCards.push(discardedCard);
    gameState.fieldCards.sort((a, b) => getCardValue(b) - getCardValue(a));
    setMessage(`🤖相手が${selectedCard.name}を場に捨てました`);
  }
  updateUI();
  setTimeout(() => {
    drawFromDeck();
  }, 1500);
}

function calculateFinalScore(pairedCards) {
  let score = 0;
  pairedCards.forEach(card => {
    if (card.type === '光') score += 3;
    else if (card.type === '種') score += 2;
    else if (card.type === '赤短' || card.type === '青短') score += 1;
  });
  return score;
}

function resetGame() {
  gameState.playerScore = 0;
  gameState.opponentScore = 0;
  gameState.gameInProgress = false;
  gameState.isPlayerTurn = true;
  gameState.selectedHandCard = null;
  gameState.waitingForFieldSelection = false;
  gameState.availableFieldCards = [];
  gameState.decisionPhase = false;
  gameState.currentRoles = [];
  gameState.roleModalActive = false;
  gameState.playerKoikoiDeclared = false;
  gameState.opponentKoikoiDeclared = false;
  gameState.pendingPlayerRoles = [];
  gameState.koikoiMultiplier = 1;
  
  hideRoleMessage();
  initializeGame();
}

function showRolesModal() {
  if (elements.rolesModalBackdrop && elements.rolesModalIframe) {
    elements.rolesModalIframe.src = 'card.html';
    elements.rolesModalBackdrop.style.display = 'flex';
  }
}

function closeRolesModal() {
  if (elements.rolesModalBackdrop && elements.rolesModalIframe) {
    elements.rolesModalBackdrop.style.display = 'none';
    elements.rolesModalIframe.src = '';
  }
}

function showRoleCelebration(owner, roleName, points, cards) {
  const notification = document.getElementById('role-completion-notification');
  const ownerEl = document.getElementById('celebration-owner');
  const roleNameEl = document.getElementById('celebration-role-name');
  const pointsEl = document.getElementById('celebration-points');
  const cardsEl = document.getElementById('celebration-cards');
  
  ownerEl.textContent = `${owner}　やったね！🎉`;
  roleNameEl.textContent = roleName;
  pointsEl.textContent = `💰${points}ポイント獲得！✨`;
  
  cardsEl.innerHTML = '';
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = `celebration-card ${getCardTypeClass(card)}`;
    cardEl.style.animationDelay = `${index * 0.1}s`;
    
    emojiSupport.setCardDisplay(cardEl, card);
    
    if (card.iconClass) {
      cardEl.classList.add(card.iconClass);
    }
    
    cardsEl.appendChild(cardEl);
  });
  
  createCelebrationParticles();
  
  notification.style.display = 'block';
  
  setTimeout(() => {
    hideCelebration();
  }, 3000);
}

function createCelebrationParticles() {
  const particles = ['🎊', '✨', '🎉', '💎', '⭐', '🌟', '💫', '🎈'];
  const container = document.querySelector('.container');
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 1}s`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, 2000);
  }
}

function hideCelebration() {
  const notification = document.getElementById('role-completion-notification');
  if (notification) {
    notification.style.display = 'none';
  }
}

function showRoleMessage(message) {
  const messageEl = document.getElementById('role-completion-message');
  if (messageEl) {
    messageEl.textContent = `🎊${message}`;
    messageEl.style.display = 'block';
  }
}

function hideRoleMessage() {
  const messageEl = document.getElementById('role-completion-message');
  if (messageEl) {
    messageEl.style.display = 'none';
  }
}

function animateScoreIncrease(scoreElement) {
  scoreElement.classList.add('score-increased');
  setTimeout(() => {
    scoreElement.classList.remove('score-increased');
  }, 600);
}

function observeScoreChanges(selector) {
  const targets = document.querySelectorAll(selector);
  
  targets.forEach(target => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          const newValue = target.textContent.match(/\d+/);
          const oldValue = target.getAttribute('data-previous-score') || '0';
          
          if (newValue && parseInt(newValue[0]) > parseInt(oldValue)) {
            animateScoreIncrease(target);
          }
          
          target.setAttribute('data-previous-score', newValue ? newValue[0] : '0');
        }
      });
    });

    observer.observe(target, { 
      characterData: true, 
      childList: true, 
      subtree: true 
    });
  });
}

// イベントリスナー
document.addEventListener('DOMContentLoaded', function() {
  if (elements.koikoiBtn) {
    elements.koikoiBtn.addEventListener('click', koikoiSelected);
  }
  if (elements.winBtn) {
    elements.winBtn.addEventListener('click', winSelected);
  }
  if (elements.discardBtn) {
    elements.discardBtn.addEventListener('click', discardCard);
  }
  if (elements.resetBtn) {
    elements.resetBtn.addEventListener('click', function() {
      if (confirm('🔄ゲームをリセットしますか？')) {
        resetGame();
      }
    });
  }
  if (elements.rolesBtn) {
    elements.rolesBtn.addEventListener('click', showRolesModal);
  }
  if (elements.rolesModalCloseBtn) {
    elements.rolesModalCloseBtn.addEventListener('click', closeRolesModal);
  }
  if (elements.nextGameBtn) {
    elements.nextGameBtn.addEventListener('click', startNewRound);
  }
  if (elements.endGameBtn) {
    elements.endGameBtn.addEventListener('click', showGoodbyeModal);
  }
  if (elements.rolesModalBackdrop) {
    elements.rolesModalBackdrop.addEventListener('click', function(e) {
      if (e.target === elements.rolesModalBackdrop) {
        closeRolesModal();
      }
    });
  }
  
  observeScoreChanges('.score-button');
  
  initializeGame();
});
