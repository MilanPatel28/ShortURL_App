const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');

async function createShortUrl(originalUrl) {
    try {
        // Check if URL already exists
        let url = await Url.findOne({ originalUrl });

        if (url) {
            return url;
        }

        let shortCode;
        let isUnique = false;

        // Generate unique short code
        while (!isUnique) {
            shortCode = generateShortCode();
            const existingUrl = await Url.findOne({ shortCode });
            if (!existingUrl) {
                isUnique = true;
            }
        }

        url = new Url({
            originalUrl,
            shortCode
        });

        await url.save();
        return url;
    } catch (error) {
        throw error;
    }
}

async function getUrlByCode(shortCode) {
    try {
        const url = await Url.findOne({ shortCode });
        if (url) {
            url.clicks += 1;
            await url.save();
        }
        return url;
    } catch (error) {
        throw error;
    }
}

async function getUrlStats(shortCode) {
    try {
        return await Url.findOne({ shortCode }, 'shortCode originalUrl clicks createdAt');
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createShortUrl,
    getUrlByCode,
    getUrlStats
};