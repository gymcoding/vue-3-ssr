import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';


const server = express();

server.get('/', (req, res) => {
    const app = createApp();
    
    renderToString(app).then(html => {
        res.send(`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <title>Vue SSR App</title>
                <script type="importmap">
                    {
                        "imports": {
                            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
                        }
                    }
                </script>
                <script type="module" src="/client.js"></script>
            </head>
            <body>
                <div id="app">${html}</div>
            </body>
            </html>
        `)
    })
})

server.use(express.static('.'));

server.listen(3200, () => {
    console.log('ready')
})