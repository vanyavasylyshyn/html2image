const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.json({ limit: "5mb" }))

app.post('/convert', async (req, res) => {
    const { html } = req.body;
    if (!html) {
        return res.status(400).json({ error: "HTML content is required" });
    }

    let browser;
    try {
        browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({width: 1080, height: 1080});
        await page.setContent(html, { waitUntil: "networkidle0" });

        const screenshot = await page.screenshot({ type: "jpeg", quality: 80 });

        res.json({ image: screenshot.toString("base64") });
    } catch (error) {
        res.status(500).json({ error: "Failed to convert HTML to JPEG", details: error.message });
    } finally {
        if (browser) await browser.close();
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
