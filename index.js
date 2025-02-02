const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE || "5mb" }));

app.post('/convert', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: "HTML content is required" });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1080, height: 1080});
        await page.setContent(content, { waitUntil: "networkidle0" });

        // TODO: add png
        const screenshot = await page.screenshot({ type: "jpeg", quality: 80, encoding: "base64" });

        res.json({ image: screenshot });
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
