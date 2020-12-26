# getir-challenge

### How to test app
Ensure you are running node 10 or greater.
- clone this repository
- run `yarn`
- To run tests run `yarn test`
- To start the development server run `yarn run dev`

## Public URL - https://getir-dozie.herokuapp.com
### Endpoints
- GET `/` This is the home route
- POST `/filter-payload` This route filters the records based on the payload 
```
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}
```
