import axios from "axios";

export const registeredOptions = (streetName, low, high) => {
    return {
        method: 'GET',
        url: 'https://data.cityofnewyork.us/resource/tesw-yqqr.json',
        params: {
            streetname: streetName,
            lowhousenumber: low,
            highhousenumber: high,
        },
        headers: {
            'X-App-Token': 'Q1h4l4Z2UoKHi4Yvz8NeEw4yL',
        }
    }
};

//get request to each listing using axios
export const fetchOpenApi = async(options) => {
    const { data } = await axios.request(options);
    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}