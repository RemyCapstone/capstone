<<<<<<< HEAD
export const filterData = [
  {
    items: [
      { name: 'Buy', value: 'for-sale' },
      { name: 'Rent', value: 'for-rent' },
    ],
    placeholder: 'Purpose',
    queryName: 'purpose',
  },
  {
    items: [
      { name: '0', value: '0' },
      { name: '1,000', value: '1000' },
      { name: '1,500', value: '1500' },
      { name: '2,000', value: '2000' },
      { name: '2,500', value: '2500' },
      { name: '3,000', value: '3000' },
      { name: '3,500', value: '3500' },
      { name: '4,000', value: '4000' },
      { name: '4,500', value: '4500' },
      { name: '5,000', value: '5000' },
    ],
    placeholder: 'Min Price(USD)',
    queryName: 'minPrice',
  },
  {
    items: [
      { name: '0', value: '0' },
      { name: '1,000', value: '1000' },
      { name: '1,500', value: '1500' },
      { name: '2,000', value: '2000' },
      { name: '2,500', value: '2500' },
      { name: '3,000', value: '3000' },
      { name: '3,500', value: '3500' },
      { name: '4,000', value: '4000' },
      { name: '4,500', value: '4500' },
      { name: '5,000', value: '5000' },
    ],
    placeholder: 'Max Price(USD)',
    queryName: 'maxPrice',
  },
  {
    items: [
      { name: 'Lowest Price', value: 'Price_Low_High' },
      { name: 'Highest Price', value: 'Price_High_Low' },
      { name: 'Newest', value: 'date-asc' },
      { name: 'Bedrooms', value: 'Bedrooms' },
      { name: 'Bathrooms', value: 'Bathrooms' },
      { name: 'Square Feet', value: 'Square_Feet' },
    ],
    placeholder: 'Sort',
    queryName: 'sort',
  },
  {
    items: [
      { name: '500', value: '500' },
      { name: '750', value: '750' },
      { name: '1000', value: '1000' },
      { name: '1250', value: '1250' },
      { name: '1500', value: '1500' },
      { name: '1750', value: '1750' },
      { name: '2000', value: '2000' },
      { name: '2500', value: '2500' },
      { name: '2750', value: '2750' },
      { name: '3000', value: '3000' },
      { name: '3500', value: '3500' },
      { name: '4000', value: '4000' },
    ],
    placeholder: 'Min Area(sqft)',
    queryName: 'areaMin',
  },
  {
    items: [
      { name: '500', value: '500' },
      { name: '750', value: '750' },
      { name: '1000', value: '1000' },
      { name: '1250', value: '1250' },
      { name: '1500', value: '1500' },
      { name: '1750', value: '1750' },
      { name: '2000', value: '2000' },
      { name: '2500', value: '2500' },
      { name: '2750', value: '2750' },
      { name: '3000', value: '3000' },
      { name: '3500', value: '3500' },
      { name: '4000', value: '4000' },
    ],
    placeholder: 'Max Area(sqft)',
    queryName: 'areaMax',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Rooms',
    queryName: 'roomsMin',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Baths',
    queryName: 'bathsMin',
  }
];

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    areaMin,
    roomsMin,
    bathsMin,
    sort,
    locationExternalIDs,
  } = filterValues;

  const values = [
    {
      name: 'purpose',
      value: purpose,
    },
    {
      name: 'minPrice',
      value: minPrice,
    },
    {
      name: 'maxPrice',
      value: maxPrice,
    },
    {
      name: 'areaMin',
      value: areaMin,
    },
    {
      name: 'areaMax',
      value: areaMax,
    },
    {
      name: 'roomsMin',
      value: roomsMin,
    },
    {
      name: 'bathsMin',
      value: bathsMin,
    },
    {
      name: 'sort',
      value: sort,
    },
    {
      name: 'locationExternalIDs',
      value: locationExternalIDs,
    },
    {
      name: 'categoryExternalID',
      value: categoryExternalID,
    },
  ];

  return values;
=======
export const filterData = [
  {
    items: [
      { name: 'Buy', value: 'for-sale' },
      { name: 'Rent', value: 'for-rent' },
    ],
    placeholder: 'Purpose',
    queryName: 'purpose',
  },
  {
    items: [
      { name: '0', value: '0' },
      { name: '1,000', value: '1000' },
      { name: '1,500', value: '1500' },
      { name: '2,000', value: '2000' },
      { name: '2,500', value: '2500' },
      { name: '3,000', value: '3000' },
      { name: '3,500', value: '3500' },
      { name: '4,000', value: '4000' },
      { name: '4,500', value: '4500' },
      { name: '5,000', value: '5000' },
    ],
    placeholder: 'Min Price(USD)',
    queryName: 'minPrice',
  },
  {
    items: [
      { name: '0', value: '0' },
      { name: '1,000', value: '1000' },
      { name: '1,500', value: '1500' },
      { name: '2,000', value: '2000' },
      { name: '2,500', value: '2500' },
      { name: '3,000', value: '3000' },
      { name: '3,500', value: '3500' },
      { name: '4,000', value: '4000' },
      { name: '4,500', value: '4500' },
      { name: '5,000', value: '5000' },
    ],
    placeholder: 'Max Price(USD)',
    queryName: 'maxPrice',
  },
  {
    items: [
      { name: 'Lowest Price', value: 'Payment_Low_High' },
      { name: 'Highest Price', value: 'Payment_High_Low' },
      { name: 'Newest', value: 'Newest' },
      { name: 'Bedrooms', value: 'Bedrooms' },
      { name: 'Bathrooms', value: 'Bathrooms' },
      { name: 'Square Feet', value: 'Square_Feet' },
    ],
    placeholder: 'Sort',
    queryName: 'sortBy',
  },
  {
    items: [
      { name: '500', value: '500' },
      { name: '750', value: '750' },
      { name: '1000', value: '1000' },
      { name: '1250', value: '1250' },
      { name: '1500', value: '1500' },
      { name: '1750', value: '1750' },
      { name: '2000', value: '2000' },
      { name: '2500', value: '2500' },
      { name: '2750', value: '2750' },
      { name: '3000', value: '3000' },
      { name: '3500', value: '3500' },
      { name: '4000', value: '4000' },
    ],
    placeholder: 'Min Area(sqft)',
    queryName: 'areaMin',
  },
  {
    items: [
      { name: '500', value: '500' },
      { name: '750', value: '750' },
      { name: '1000', value: '1000' },
      { name: '1250', value: '1250' },
      { name: '1500', value: '1500' },
      { name: '1750', value: '1750' },
      { name: '2000', value: '2000' },
      { name: '2500', value: '2500' },
      { name: '2750', value: '2750' },
      { name: '3000', value: '3000' },
      { name: '3500', value: '3500' },
      { name: '4000', value: '4000' },
    ],
    placeholder: 'Max Area(sqft)',
    queryName: 'areaMax',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Rooms',
    queryName: 'roomsMin',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Baths',
    queryName: 'bathsMin',
  }
];

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    areaMin,
    roomsMin,
    bathsMin,
    sortBy,
    locationExternalIDs,
  } = filterValues;

  const values = [
    {
      name: 'purpose',
      value: purpose,
    },
    {
      name: 'minPrice',
      value: minPrice,
    },
    {
      name: 'maxPrice',
      value: maxPrice,
    },
    {
      name: 'areaMin',
      value: areaMin,
    },
    {
      name: 'areaMax',
      value: areaMax,
    },
    {
      name: 'roomsMin',
      value: roomsMin,
    },
    {
      name: 'bathsMin',
      value: bathsMin,
    },
    {
      name: 'sortBy',
      value: sortBy,
    }
  ];

  return values;
>>>>>>> main
};