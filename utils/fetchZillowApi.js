import axios from "axios";


//base url of getting a listing
export const baseListingURL = 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch';
export const defaultSearch = '?location=Brooklyn%2C%20New%20York%2C%20NY&status_type=ForSale&home_type=Apartments&rentMinPrice=100&rentMaxPrice=10000&bathsMin=1&bathsMax=10&bedsMin=1&bedsMax=10&sqftMin=1&sqftMax=10000'

//get request to each listing using axios
export const fetchZillowListings = async(url) => {
    const { data } = await axios.get((url), {
        //our api key we paid for
        headers: {
            'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
            'x-rapidapi-key': '7b95d439b1msh053237cc2d2fd67p1aefc7jsn0779bacb22ad'
        }
    });

    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}