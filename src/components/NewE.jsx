import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const Example = ({ placeholder, data }) => {
    const editor = useRef(null);
    const [content, setContent] = useState();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...',
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ["png"],
        }
    }), [placeholder]);


    return (
        <div>
            {
                content !== null &&
                <>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={newContent => {
                            setContent(newContent)
                            data(newContent)
                        }}
                        onChange={newContent => {
                            setContent(newContent)
                            data(newContent)
                        }}
                    />
                </>
            }
        </div>
    );
};

export default Example;
