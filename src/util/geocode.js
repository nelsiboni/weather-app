const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmVsc2lib25pIiwiYSI6ImNqdXI1ZmxmejE0ZzUzeXA3MWVuYXhuZjgifQ.e220-rheRGrJBXQykZ0iAA&limit=1'

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect location service.', undefined)
        } else if(body.features.length === 0) {
            callback('unable to find location.', undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode