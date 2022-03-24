import axios from "axios";

export const registeredOptions = (streetName, number, low, high) => {
    return {
        method: 'GET',
        url: 'https://data.cityofnewyork.us/resource/tesw-yqqr.json',
        params: {
            streetname: streetName,
            housenumber: number,
            lowhousenumber: low,
            highhousenumber: high
        },
        headers: {
            'X-App-Token': 'Q1h4l4Z2UoKHi4Yvz8NeEw4yL',
        }
    }
};

export const violationOptions = (buildingID) => {
    return {
        method: 'GET',
        url: 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json',
        params: {
            buildingid: buildingID,
        },
        headers: {
            'X-App-Token': 'Q1h4l4Z2UoKHi4Yvz8NeEw4yL',
        }
    }
};

export const plutoOptions = (boro, block, lot) => {
    let borough = 'MN'
    if(boro === '2') borough = 'BX';
    if(boro === '3') borough = 'BK';
    if(boro === '4') borough = 'QN';
    
    return {
        method: 'GET',
        url: 'https://data.cityofnewyork.us/resource/64uk-42ks.json',
        params: {
            borough: borough,
            block: block,
            lot: lot
        },
        headers: {
            'X-App-Token': 'Q1h4l4Z2UoKHi4Yvz8NeEw4yL',
        }
    }
}

//get request to each listing using axios
export const fetchOpenApi = async(options) => {
    const { data } = await axios.request(options);
    //returns a json object that has an array of all of our property listings after making the get request
    return data;
}