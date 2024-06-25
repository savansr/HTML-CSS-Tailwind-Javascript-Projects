const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraphs(){
    const paragraphs = [
        " Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required.",
        "Subscribe to Drop X Out"
    ];

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';

    for (const char of paragraphs[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`; // Fixed extra space
    }

    typingText.querySelectorAll('span')[0].classList.add('active'); // Fixed typo: 'sapn'

    document.addEventListener('keydown', () => {
        input.focus();
    });

    document.addEventListener('click', () => {
        input.focus();
    });
}

function initTyping() {
    const chars = typingText.querySelectorAll('span'); // Corrected variable name
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < chars.length && timeLeft > 0) {
        if (!isTyping) { // Fixed condition to start timer only once
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (chars[charIndex].innerText === typedChar) {
            chars[charIndex].classList.add('correct');
        } else {
            mistake++;
            chars[charIndex].classList.add('incorrect');
        }

        charIndex++;
        if (charIndex < chars.length) { // Prevent error if charIndex is out of bounds
            chars[charIndex].classList.add('active');
        }

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        const wordsPerMinute = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60)); // Fixed calculation
        wpm.innerText = wordsPerMinute;
    } else {
        clearInterval(timer);
        input.value = "";
    }
}

function reset() {
    loadParagraphs();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeLeft;
    input.value = "";
}

input.addEventListener('input', initTyping);
btn.addEventListener('click', reset);

loadParagraphs();
