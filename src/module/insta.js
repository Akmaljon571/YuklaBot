import axios from "axios";

export const InstaYukla = async(link) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
            params: {url: link},
            headers: {
              'X-RapidAPI-Key': '96915f095dmsh0a1f8d754547047p11850djsn9b25e84ecc72',
              'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error + " catch ichi");
    }
}
