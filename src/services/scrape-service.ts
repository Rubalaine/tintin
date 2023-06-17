import axios from 'axios';

const scrape = (url: string): Promise<{url: string, website: string}> => {
    return axios.get(url).then(response => {
        return {
            url,
            website: response.data
        }
    });
}
export default scrape;