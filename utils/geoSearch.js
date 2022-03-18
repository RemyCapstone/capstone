import axios from "axios";

export const geoOptions = (streetName) => {
    return {
        method: 'GET',
        url: 'https://geosearch.planninglabs.nyc/v1/autocomplete',
        params: {
            text: streetName,
        }
    }
};

//get request to each listing using axios
export const fetchGeoSearch = async(options) => {
    const { data } = await axios.request(options);
    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}