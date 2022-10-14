import axios from "axios";

export const YoutubeLink = async(link) => {
    try {
        const split = link.split("/")[3]
       
        const options = {
            method: 'GET',
            url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
            params: {id: split},
            headers: {
              'X-RapidAPI-Key': '96915f095dmsh0a1f8d754547047p11850djsn9b25e84ecc72',
              'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
            }
        };

        const response = await axios.request(options)
        return response
    } catch (error) {
        console.log(error + " catch ichi");
    }
}