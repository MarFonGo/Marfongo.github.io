import { useEffect } from 'react';

export function LoadBoostrap(){
    useEffect(() => {
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + "/bootstrap.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    
}
