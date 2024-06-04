import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Example = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...'
    }), [placeholder]);

    const handleSave = () => {
        console.log(content)
        // Gửi nội dung HTML về máy chủ
        fetch('URL_của_máy_chủ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ htmlContent: content })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={newContent => setContent(newContent)}
                onChange={newContent => setContent(newContent)}
            />
            <button onClick={handleSave}>Lưus</button>
        </div>
    );
};

export default Example;
