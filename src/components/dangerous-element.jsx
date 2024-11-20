import React, { useLayoutEffect, useRef } from 'react';

export function DangrousElement({ markup }) {
    const elRef = useRef ();
    const hasFiredRef = useRef (false);

    useLayoutEffect(() => {
        // if (hasFiredRef.current) return;
        if (!elRef.current) return;

        const range = document.createRange();
        range.selectNode(elRef.current);
        const documentFragment = range.createContextualFragment(markup);

        elRef.current.innerHTML = '';
        elRef.current.append(documentFragment);

        hasFiredRef.current = true;
    }, [markup]);

    return <div ref={elRef} dangerouslySetInnerHTML={{ __html: markup }}></div>;
}
