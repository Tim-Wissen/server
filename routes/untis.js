const express = require('express')
const router = express.Router()

router.get('/', runUntis, (req, res) => {
    res.render('untis.ejs', { className: req.query.className })
})

async function runUntis(req, res, next) {
    try {
        const { WebUntis } = require('webuntis')
        const fs = require('fs')

        const untis = new WebUntis('rosenstein-gymnasium', req.query.className, req.query.className, 'cissa.webuntis.com')

        await untis.login()

        const timetable = await untis.getOwnTimetableForToday()
        const timetableJSON = JSON.stringify(timetable)

        fs.writeFileSync('./views/properties.json', timetableJSON)

        next()
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = router