const urlService = require('../services/urlService');
const config = require('../config/config');

const urlController = {
    async shortenUrl(req, res) {
        try {
            const { url } = req.body;
            const urlData = await urlService.createShortUrl(url);

            res.json({
                originalUrl: urlData.originalUrl,
                shortUrl: `${config.baseUrl}/${urlData.shortCode}`,
                shortCode: urlData.shortCode,
                clicks: urlData.clicks,
                createdAt: urlData.createdAt
            });
        } catch (error) {
            res.status(500).json({ error: 'Error creating short URL' });
        }
    },

    async redirectToUrl(req, res) {
        try {
            const { shortCode } = req.params;
            const url = await urlService.getUrlByCode(shortCode);

            if (url) {
                res.redirect(url.originalUrl);
            } else {
                res.status(404).json({ error: 'URL not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getUrlStats(req, res) {
        try {
            const { shortCode } = req.params;
            const stats = await urlService.getUrlStats(shortCode);

            if (stats) {
                res.json(stats);
            } else {
                res.status(404).json({ error: 'URL not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = urlController;