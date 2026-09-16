import React, { useState } from 'react';
import './ContentAdminPanelEditor.css';
import TextEditor from '../../modules/TextEditor/TextEditor';
import { useLocalSettings } from '../../hooks/useLocalSettings';

const ContentAdminPanelEditor = () => {
    const { lang } = useLocalSettings();
  const [content, setContent] = useState(null);

  const handleSave = (rawContent) => {
    setContent(rawContent);
    console.log('Сохранение на бэкенд:', JSON.stringify(rawContent));
    // Тут fetch/axios POST на ваш API
  };

  return (
    <>
        <div className="adminPanelEditor">
            <div className="container">
                <div className="adminPanelEditor_content">
                    <div className="adminPanelEditor_content_title bold">
                        {lang === 'ru'
                            ? 'Новая статья'
                            : 'New article'
                        }
                    </div>
                    <TextEditor initialContent={content} onSave={handleSave} />
                </div>
            </div>
        </div>
    </>
    // <div>
    //   <h2>Редактирование статьи</h2>
    //   <TextEditor initialContent={content} onSave={handleSave} />
    //   {content && (
    //     <p>
    //       Контент сохранён локально (в raw-формате Draft.js). На бэкенд нужно
    //       отправлять именно его.
    //     </p>
    //   )}
    // </div>
  );
}

export default ContentAdminPanelEditor;
