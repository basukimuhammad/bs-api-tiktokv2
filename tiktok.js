const axios = require("axios");
const cheerio = require("cheerio");

async function TiktokDownloader(url) {
    try {
        // Data POST ke ssstik.io
        const data = new URLSearchParams({
            id: url,
            locale: "id",
            tt: "RFBiZ3Bi", // Token default
        });

        // Header untuk menyamarkan request sebagai browser asli
        const headers = {
            "HX-Request": true,
            "HX-Trigger": "_gcaptcha_pt",
            "HX-Target": "target",
            "HX-Current-URL": "https://ssstik.io/id",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent":
                "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
            Referer: "https://ssstik.io/id",
        };

        // Request POST ke ssstik.io
        const response = await axios.post(
            "https://ssstik.io/abc?url=dl",
            data,
            { headers }
        );

        const html = response.data;
        const $ = cheerio.load(html);

        // Ekstraksi data dari halaman hasil
        const video = $(".result_overlay_buttons a.download_link").attr("href");
        const audio = $(".result_overlay_buttons a.download_link.music").attr(
            "href"
        );

        return {
            video: video || null, // URL video
            audio: audio || null, // URL audio
        };
    } catch (error) {
        throw new Error("Gagal mengunduh video: " + error.message);
    }
}

module.exports = { TiktokDownloader };
