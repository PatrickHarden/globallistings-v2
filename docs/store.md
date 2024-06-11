# Questions

1. Why `.Documents` property is an array of arrays
2. How localisation is going to happen for API requests
3. How are we going to make sure that all the mappings and all the new UI we create is enough to cover all the options we have in the JSON schema in US and other regions???

# Features

1. `entitiesMeta` will store information regarding the status of the requests. We can use this information to show spinner and different status info
2. `ui` all information regarding the current state of the UI will be stored in `ui`
3. Use `validUntil` to use in memory instance rather than making a request
4. `router` is used by `connected-react-router` which is single source of truth regarding the current url
5. `relatedProperties` a list of properties in the same area
6. Reusing search results: using normalised data and in memory caching we will achieve a minimum number of API requests. So for example if the user selected and area **E1W2RG** and get a list with 50 properties and visits each of these properties to view details, we will only perform **2** API calls in total vs current solution of **202**
7. For intl we could use the current locale to only extract string in the locale of the user and if that locale is not present then fallback to whatever is available from an API.
8. We would validate input fields and log entries which are missing required fields

```js
{
    entities: {
        searches: {
            'SEARCH_HASH_1': {
                properties: ['GB-ReapIT-cbrrps-CAL180002', 'GB-ReapIT-cbrrps-CAL180003']
            }
        },
        relatedProperties: {
            'SEARCH_HASH_1': ['GB-ReapIT-cbrrps-CAL180003', 'GB-ReapIT-cbrrps-CAL180004', 'GB-ReapIT-cbrrps-CAL180005', 'GB-ReapIT-cbrrps-CAL180006']
        },
        properties: {
            'GB-ReapIT-cbrrps-CAL180002': {
                address: {
                    line1: 'Ariel House',     // Documents[0][0].["Common.ActualAddress"].["Common.Line1"]
                    line2: '144 Vaughan Way', // Documents[0][0].["Common.ActualAddress"].["Common.Line2"]
                    locality: 'London Dock',  // Documents[0][0].["Common.ActualAddress"].["Common.Locallity"]
                    postcode: 'e1w',          // Documents[0][0].["Common.ActualAddress"].["Common.PostCode"]
                },
                numberOfBedrooms: 1,
                location: {
                    lat: 51.505794, //Common.Coordinate
                    lon: -0.060134
                },
                contacts: [
                    {
                        phoneNumber: '+44 207 182 2577',
                        email: 'Ben.Deacon@cbre.com',
                        agentName: 'Ben Deacon'
                    },
                    {
                        phoneNumber: '+44 207 182 2165',
                        email: 'alex.kerr@cbre.com',
                        agentName: 'Alex Kerr'
                    }
                ],
                highlights: [
                    'Perimeter Comfort Cooling',
                    'Raised Floors',
                    'LED Lighting',
                    'Commissionaire',
                ],
                size: { // Common.TotalSize ???
                    range: {
                        min: {
                            units: "sqft",
                            amount: 1000
                        },
                        max: {
                            units: "sqft",
                            amount: 50000
                        }
                    }, // Range is only present if total is not defined
                    total: {
                        units: "sqft",
                        amount: 6655
                    },
                    charges: {
                        rent: {
                            units: 'sqft',
                            amount: 57.5,
                            currencyCode: 'GBP',
                            interval: 'annually'
                        }
                    }
                },
                description: {
                    strapline: 'An amazing one bed to rent in London&#039;s newest exclusive development, E1W',
                    longDescription: 'The long awaited London Dock development has finally arrived and you can at last secure your place in it. \n\nSituated in the heart of the capital, just moments from the extremely desirable St Katharine Docks, this exciting new destination offers apartments and penthouses with the finest level of residents\' facilities, a private suite of hotel style amenities including state-of- the-art gymnasium, swimming pool, squash court, virtual golf, treatment room, sauna, steam room, private screening room and residents lounge complimented by 24 hour concierge. \n\nThe brand new third floor one bedroom flat is finished to an immaculate standard. The open plan kitchen and living room is a great size and has attractive wooden flooring as well as all the modern conveniences. The floor to ceiling window allows plenty of light into the flat and access to a huge private balcony which overlooks the square. There is also a wall mounted flat screen television.\n\nThe bedroom has a built in double wardrobe offering plenty of storage and meaning the ample space available is not compromised.\n\nThe bathroom is a joy and has underfloor heating and there is storage in the hallway which houses the washer dryers and flat controls meaning that they do not hinder the aesthetic or practical enjoyment of the property.\n\nSurrounded by  beautifully landscaped public spaces, shops, bars and restaurants. Tower Hill underground is a short walk away meaning that there is easy access to the District and Circle Line. This makes trips to Chelsea, Victoria and Westminster a short affair. a Tower Hill Gateway DLR is also within walking distance so London Dock offers quick and easy access to the main financial centres of the City and Canary Wharf, as well as the exciting cultural and creative neighbourhoods of Shoreditch, Whitechapel and Bermondsey. The location will work fantastically for students and professionals.\n\nFor more information about our fees please visit our web-site\'s \'Tenant Fees\' page located under the Rent tab.'

                },
                info: {
                    energyPerformance: ['/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/6db2de5d/CAL180002_05.png'],
                    floorPlans: ['/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/39549074/CAL180002_22.jpg']

                },
                photos: {
                    hero: '/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/a860e9a6/CAL180002_06_Photo_1_small.jpg'
                    main: [
                        {
                            small: '/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/32a4fc4b/CAL180002_17_Photo_12_small.jpg',
                            large: '/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/32a4fc4b/CAL180002_17_Photo_12_large.jpg'
                        },
                        {
                            small: '/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/83d0dae7/CAL180002_16_Photo_11_small.jpg',
                            large: '/resources/fileassets/GB-ReapIT-cbrrps-CAL180002/83d0dae7/CAL180002_16_Photo_11_large.jpg'
                        }
                    ]
                }

            },
            'GB-ReapIT-cbrrps-CAL180003': {
                /// ....
            },
            'GB-ReapIT-cbrrps-CAL180004': {
                /// ....
            },
            'GB-ReapIT-cbrrps-CAL180005': {
                /// ....
            },
            'GB-ReapIT-cbrrps-CAL180006': {
                /// ....
            }
        }
    },
    entitiesMeta: {
        searches: {
            'SEARCH_HASH_1': {
                'status': 'SUCCESS',
                'createdAt': '2018-11-21T14:13:30.760Z',
                'validUntil': '2018-11-21T15:13:30.760Z',
            }
        }
    },
    ui: {
        enquiryForm: {

        }
        // ...
    },
    favorites: {

    }, // Not 100% sure this should live on this level.
    router: {
        // ...
    }
}
```
