export const recommendPropSearch = (savedProps) =>
{
    //first get a location and zip code from the list of already saved locations the user has, naturally this will be weighted towards the more prominent locations:
    const chosenPropIndex = Math.floor(Math.random() * savedProps.length);
    const chosenProp = savedProps[chosenPropIndex];
    //console.log(chosenProp);
    const chosenPropLocationArray = chosenProp['address'].split(',');
    const chosenLocation = `${chosenPropLocationArray[chosenPropLocationArray.length-2].trim()}, ${chosenPropLocationArray[chosenPropLocationArray.length-1].trim()}`
    //const chosenPrice = Integer.(chosenProp['price']) + 200;
    //console.log(chosenLocation)

    //get a range for min amount of bedrooms and bathrooms and price:
    let minBathRoom = 9999;
    let minBedRoom = 9999; 
    let maxPrice = 0;
    let minSqrFoot = 9999;

    for(let i=0; i<savedProps.length; i++){
        if((savedProps[i]['price']) > maxPrice){
            maxPrice = (savedProps[i]['price'])
        }
        if((savedProps[i]['bathrooms'] < minBathRoom)){
            minBathRoom = (savedProps[i]['bathrooms']);
        }
        if((savedProps[i]['bedrooms'] < minBedRoom)){
            minBedRoom = (savedProps[i]['bedrooms']);
        }
        if((savedProps[i]['livingArea'] < minSqrFoot)){
            minSqrFoot = (savedProps[i]['livingArea']);
        }
    }

    maxPrice += 200;
    minSqrFoot -= 200;
    // console.log(maxPrice);
    // console.log(minBathRoom);
    // console.log(minBedRoom);
    // console.log(minSqrFoot);


    //options for zillow api
    return {
        method: 'GET',
        url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
        params: {
            location: chosenLocation,
            status_type: 'ForRent',
            home_type: 'Apartments',
            rentMinPrice: '100',
            rentMaxPrice: maxPrice,
            bathsMin: minBathRoom,
            bathsMax: '10',
            bedsMin: minBedRoom,
            bedsMax: '10',
            sqftMin: minSqrFoot,
            sqftMax: '10000'
        },
        headers: {
            'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
            'x-rapidapi-key': '7b95d439b1msh053237cc2d2fd67p1aefc7jsn0779bacb22ad'
        }
    }
}