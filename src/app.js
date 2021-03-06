const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port  = process.env.PORT || 3000

//configure paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

//setup express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

//set routs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nel Siboni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nel Siboni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!',
        name: 'Nel Siboni'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({
                error
            })
        }
        
        forecast({latitude, longitude}, (error, forecastdata) => {
            if(error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nel Siboni',
        message: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nel Siboni',
        message: 'Page not found.'
    })
})

app.listen(port, () => console.log('listening to port ' + port))
