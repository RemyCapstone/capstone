import axios from "axios";

export const options = (long, lat, address) => {
    return {
        method: 'GET',
        url: 'https://walk-score.p.rapidapi.com/score',
        params: {
            lat: lat,
            address: address,
            wsapikey: '4263497fd1be6213f27c823e0a56d139',
            lon: long,
            bike: '1',
            transit: '1'
        },
        headers: {
            'x-rapidapi-host': 'walk-score.p.rapidapi.com',
            'x-rapidapi-key': '7b95d439b1msh053237cc2d2fd67p1aefc7jsn0779bacb22ad'
        }
    }
};

//get request to each listing using axios
export const fetchWalkApi = async(options) => {
    const { data } = await axios.request(options);
    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}