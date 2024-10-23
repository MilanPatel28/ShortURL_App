const validateUrl = (req, res, next) => {
  try {
    const { url } = req.body;
    const urlObject = new URL(url);
    if (urlObject.protocol === 'http:' || urlObject.protocol === 'https:') {
      next();
    } else {
      throw new Error('Invalid URL protocol');
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid URL format' });
  }
};

module.exports = validateUrl;