import { css } from 'lit';

export const coreCSS = css`
    .ap-carousel {
        overflow-y: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
    }
    
    .ap-carousel::-webkit-scrollbar { /* WebKit */
        width: 0;
        height: 0;
    }
    
    .ap-carousel-slides {
        display: flex;
        -webkit-overflow-scrolling: touch;
    }
`;