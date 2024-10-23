import React, { useState } from "react";
import {
    Link,
    Share2,
    Copy,
    ExternalLink,
    Mail,
    Facebook,
    Twitter,
    Linkedin,
} from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

const URLShortener = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const generateShortCode = () => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setCopySuccess(false);
        setShowShareMenu(false);

        try {
            new URL(longUrl);
            const shortCode = generateShortCode();
            const baseUrl = "http://localhost:3000/";
            setShortUrl(baseUrl + shortCode);
        } catch (err) {
            setError("Please enter a valid URL including http:// or https://");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            setError("Failed to copy to clipboard");
        }
    };

    const handleVisit = () => {
        window.open(shortUrl, "_blank");
    };

    const handleShare = (platform) => {
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shortUrl
            )}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shortUrl
            )}&text=Check out this link:`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shortUrl
            )}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this link: ${shortUrl}`
            )}`,
            email: `mailto:?subject=Check out this link&body=${encodeURIComponent(
                `Here's a shortened URL: ${shortUrl}`
            )}`,
        };

        window.open(shareUrls[platform], "_blank", "width=600,height=400");
    };

    // function to handle downloading the QR
    const downloadQR = () => {
        const svg = document.getElementById('qr-code');
        if (svg) {
            // Get the SVG data
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'qr-code.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(svgUrl);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center mb-4">
                        <h1 className="display-4 mb-2">URL Shortener</h1>
                        <p className="lead text-muted">
                            Make your long URLs short and shareable
                        </p>
                    </div>

                    <div className="card shadow">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="longUrl" className="form-label">
                                        Enter your long URL
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Link size={18} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="longUrl"
                                            value={longUrl}
                                            onChange={(e) => setLongUrl(e.target.value)}
                                            placeholder="https://example.com/very/long/url"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Link size={18} className="me-2" />
                                            Shorten URL
                                        </>
                                    )}
                                </button>
                            </form>

                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}

                            {shortUrl && (
                                <div className="mt-4">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title">Your shortened URL:</h5>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={shortUrl}
                                                    readOnly
                                                />
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={handleVisit}
                                                        title="Visit URL"
                                                    >
                                                        <ExternalLink size={18} className="me-2" />
                                                        Visit
                                                    </button>

                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-outline-success dropdown-toggle"
                                                            type="button"
                                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                                            title="Share URL"
                                                        >
                                                            <Share2 size={18} className="me-2" />
                                                            Share
                                                        </button>
                                                        {showShareMenu && (
                                                            <div className="dropdown-menu show">
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShare("facebook")}
                                                                >
                                                                    <Facebook size={18} className="me-2" />
                                                                    Facebook
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShare("twitter")}
                                                                >
                                                                    <Twitter size={18} className="me-2" />
                                                                    Twitter
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShare("linkedin")}
                                                                >
                                                                    <Linkedin size={18} className="me-2" />
                                                                    LinkedIn
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShare("whatsapp")}
                                                                >
                                                                    <Share2 size={18} className="me-2" />
                                                                    WhatsApp
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleShare("email")}
                                                                >
                                                                    <Mail size={18} className="me-2" />
                                                                    Email
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        className={`btn ${copySuccess
                                                            ? "btn-success"
                                                            : "btn-outline-secondary"
                                                            }`}
                                                        onClick={handleCopy}
                                                        title="Copy to clipboard"
                                                    >
                                                        <Copy size={18} className="me-2" />
                                                        {copySuccess ? "Copied!" : "Copy"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card bg-light mt-3">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Scan QR Code:</h5>
                                            <div className="bg-white p-3 d-inline-block rounded">
                                                <QRCodeSVG // Changed from QRCode to QRCodeSVG
                                                    id="qr-code"
                                                    value={shortUrl}
                                                    size={200}
                                                    level={"H"}
                                                    includeMargin={true}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={downloadQR}
                                                >
                                                    Download QR Code
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default URLShortener;
