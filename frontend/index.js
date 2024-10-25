import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const translationOutput = document.getElementById('translationOutput');
const speakButton = document.getElementById('speakButton');
const historyList = document.getElementById('historyList');

let currentTranslation = '';

async function translateText() {
    const text = inputText.value;
    const lang = targetLanguage.value;

    if (text.trim() === '') {
        translationOutput.textContent = '';
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        currentTranslation = data.responseData.translatedText;
        translationOutput.textContent = currentTranslation;

        // Add translation to history
        await backend.addTranslation(text, currentTranslation, lang);
        updateHistory();
    } catch (error) {
        console.error('Translation error:', error);
        translationOutput.textContent = 'Translation error occurred.';
    }
}

function speakTranslation() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation);
        utterance.lang = targetLanguage.value;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

async function updateHistory() {
    const history = await backend.getTranslationHistory();
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.original} → ${entry.translated} (${entry.targetLanguage})`;
        historyList.appendChild(li);
    });
}

inputText.addEventListener('input', translateText);
targetLanguage.addEventListener('change', translateText);
speakButton.addEventListener('click', speakTranslation);

// Initial history update
updateHistory();
