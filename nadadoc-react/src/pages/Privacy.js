import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Privacy = () => {
    const [content, setContent] = useState('');
    const [lang, setLang] = useState('en');

    useEffect(() => {
        const detectedLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
        setLang(detectedLang);
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            let url = `/content/privacy-policy.${lang}.md`;
            try {
                const response = await fetch(url);
                 if (!response.ok) {
                    if (lang !== 'en') {
                        setLang('en'); // Fallback to English
                    } else {
                        throw new Error('Content not found');
                    }
                    return;
                }
                const text = await response.text();
                setContent(text);
            } catch (error) {
                setContent('Could not load privacy policy.');
            }
        };

        fetchContent();
    }, [lang]);

    return (
        <div className="container mx-auto p-4">
            <div className="language-switcher mb-4">
                <button onClick={() => setLang('en')} className={`px-4 py-2 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>English</button>
                <button onClick={() => setLang('ko')} className={`px-4 py-2 rounded ml-2 ${lang === 'ko' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>한국어</button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <article className="prose lg:prose-xl">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
};

export default Privacy;