import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Terms = () => {
    const [lang, setLang] = useState(() => navigator.language.startsWith('ko') ? 'ko' : 'en');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            const isKorean = lang === 'ko';
            const fileExtension = isKorean ? 'md' : 'html';
            setContent(isKorean ? '로딩 중...' : 'Loading...');

            let url = `/content/term-of-use.${lang}.${fileExtension}`;
            
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
                setContent(isKorean ? '이용약관을 불러올 수 없습니다.' : '<p>Could not load terms.</p>');
            }
        };

        fetchContent();
    }, [lang]);

    return (
        <div className="container mx-auto p-4">
            <div className="language-switcher mb-4 flex justify-end">
                <button onClick={() => setLang('en')} className={`px-4 py-2 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>English</button>
                <button onClick={() => setLang('ko')} className={`px-4 py-2 rounded ml-2 ${lang === 'ko' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>한국어</button>
            </div>
            {lang === 'ko' ? (
                 <article className="prose lg:prose-xl"><ReactMarkdown children={content} /></article>
            ) : (
                <article className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </div>
    );
};

export default Terms;