import { Link } from 'taglib'

export const baseStylesheet = `
    body {
        font-family: system-ui, BlinkMacSystemFont, -apple-system, sans-serif;
        margin: 0;
        padding: 20px;
    }
    
    .content-box {
        width: 400px;
        max-width: 600px;
        margin: 20px auto;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    h1 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .text-input {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    select {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }
    
    .hidden {
        display: none !important;
    }
    
    .template-text {
        color: #666;
        margin-bottom: 20px;
    }
};
```

Now let's create an assets/css directory structure:

src/templates/assets/css/content-box.class.css
```css
<<<<<<< SEARCH
