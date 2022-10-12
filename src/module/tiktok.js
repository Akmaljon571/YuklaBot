import axios from "axios";

export const TikTokYukla = async(link) => {
    try {
        
        const options = {
            method: 'GET',
            url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
            params: {url: link},
            headers: {
              'X-RapidAPI-Key': 'f5d602a575msha11f03335de9104p12bf91jsn5e0242ad517f',
              'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
            }
          };

        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error + " catch ichi");
    }
}