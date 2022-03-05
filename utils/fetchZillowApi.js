import axios from "axios";


//base url of getting a listing
export const baseListingURL = 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch';
export const defaultSearch = '?location=Brooklyn%2C%20New%20York%2C%20NY&status_type=ForRent&home_type=Apartments&maxPrice=999999999&rentMinPrice=100&rentMaxPrice=10000&bathsMin=1&bathsMax=10&bedsMin=1&bedsMax=10&sqftMin=1&sqftMax=10000'

export const baseOptions = {
  method: 'GET',
  url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
  params: {
    location: 'Brooklyn, New York, NY',
    status_type: 'ForRent',
    home_type: 'Apartments',
    minPrice: '100',
    maxPrice: '999999999',
    rentMinPrice: '100',
    rentMaxPrice: '3000',
    bathsMin: '1',
    bathsMax: '10',
    bedsMin: '1',
    bedsMax: '10',
    sqftMin: '1',
    sqftMax: '10000'
  },
  headers: {
    'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
    'x-rapidapi-key': '7b95d439b1msh053237cc2d2fd67p1aefc7jsn0779bacb22ad'
  }
};


//get request to each listing using axios
export const fetchZillowListings = async(options) => {
    const { data } = await axios.request(options);
    //console.log(data)
    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}