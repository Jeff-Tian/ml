import React, {useEffect, useRef} from 'react';

export function DangrousElement({markup, katex}) {
    const elRef = useRef(null);

    useEffect(() => {
        if (!elRef.current) return;

        window.katex = katex;

        // Extract and clear the inner HTML
        const container = document.createElement('div');
        container.innerHTML = markup;

        // Collect script elements and their sources
        const scripts = Array.from(container.querySelectorAll('script'));
        const scriptQueue = scripts.map((script) => ({
            src: script.src || null,
            content: script.innerHTML,
            async: script.async,
            defer: script.defer,
            'data-element-id': script.getAttribute('data-element-id'),
        }));

        // Remove script tags from the container
        scripts.forEach((script) => script.remove());

        // Inject the rest of the HTML into the container
        elRef.current.innerHTML = container.innerHTML;

        // Helper to load scripts sequentially
        const loadScript = async (scriptData) => {
            console.log('loading ', scriptData);
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                if (scriptData.src) {
                    script.src = scriptData.src;
                    script.async = false; // Force sequential loading
                    script.defer = false;
                    script.onload = resolve;
                    script.onerror = reject;
                    script['data-element-id'] = scriptData['data-element-id'];
                } else {
                    script.innerHTML = scriptData.content;
                    resolve();
                }
                elRef.current.appendChild(script);
            });
        };

        // Sequentially load scripts
        (async () => {
            for (const scriptData of scriptQueue) {
                try {
                    await loadScript(scriptData);
                } catch (error) {
                    console.error('Error loading script:', scriptData.src || scriptData.content, error);
                }
            }
        })();
    }, [markup, katex]);

    return <div ref={elRef}></div>;
}
