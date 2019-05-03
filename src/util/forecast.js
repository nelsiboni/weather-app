const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/d7a2ba7a55e7347b3f4ad5b05c867d43/' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude) + '?units=si'
    request({url, json:true}, (error, {body}) => {
    
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Couldn\'t find weather.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast
