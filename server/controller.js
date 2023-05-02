let houses = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        let {id} = req.params

        let index = houses.findIndex(houses => +houses.id === +id)

        houses.splice(index, 1)

        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body

        if(!address || !price || !imageURL) {
            res.send(400).send('New houses must have an address, price and image URL')
        } else {
            let newHouse = {
                address,
                price: +price,
                imageURL,
                id: globalId
            }

            houses.push(newHouse)

            res.status(200).send(houses)

            globalId++
        }
    },

    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body

        let index = houses.findIndex(house => +house.id === +id)

        if(type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if(type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}
