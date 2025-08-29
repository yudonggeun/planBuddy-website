document.addEventListener('DOMContentLoaded', () => {
    const contentEl = document.getElementById('content');
    const showTermsBtn = document.getElementById('show-terms');
    const showPrivacyBtn = document.getElementById('show-privacy');
    const langEnBtn = document.getElementById('lang-en');
    const langKoBtn = document.getElementById('lang-ko');

    const converter = new showdown.Converter();

    let currentLang = 'en';
    let currentDoc = 'terms';

    const loadContent = async () => {
        let lang = currentLang;
        let doc = currentDoc;
        let url = '';
        let isMarkdown = false;

        if (doc === 'terms') {
            url = `content/term-of-use.${lang}.html`;
        } else {
            url = `content/privacy-policy.${lang}.md`;
            isMarkdown = true;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                // fallback to english
                if (lang !== 'en') {
                    currentLang = 'en';
                    updateLangButtons();
                    loadContent();
                } else {
                  throw new Error('Network response was not ok');
                }
                return
            }
            const data = await response.text();
            if (isMarkdown) {
                contentEl.innerHTML = converter.makeHtml(data);
            } else {
                contentEl.innerHTML = data;
            }
        } catch (error) {
            console.error('Failed to load content:', error);
            contentEl.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    };

    const updateLangButtons = () => {
        langEnBtn.classList.toggle('active', currentLang === 'en');
        langKoBtn.classList.toggle('active', currentLang === 'ko');
    };

    const detectLanguage = () => {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ko')) {
            currentLang = 'ko';
        } else {
            currentLang = 'en';
        }
        updateLangButtons();
    };

    showTermsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDoc = 'terms';
        loadContent();
    });

    showPrivacyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentDoc = 'privacy';
        loadContent();
    });

    langEnBtn.addEventListener('click', () => {
        currentLang = 'en';
        updateLangButtons();
        loadContent();
    });

    langKoBtn.addEventListener('click', () => {
        currentLang = 'ko';
        updateLangButtons();
        loadContent();
    });

    detectLanguage();
    loadContent();
});