const express = require('express')
const router = express.Router()

router.get('/', runUntis, (req, res) => {
    res.render('untis.ejs', { className: req.query.className })
})

async function runUntis(req, res, next) {
    var dates = []
    getDay()

    var jsonFileNmb = 0
    for (const date of dates) {
        const { WebUntis } = require('webuntis')
        const fs = require('fs')
        const untis = new WebUntis('rosenstein-gymnasium', req.query.className, req.query.className, 'cissa.webuntis.com')
        try {
            await untis.login()
            const timetable = await untis.getOwnTimetableFor(date)
            const timetableJSON = JSON.stringify(timetable)
            fs.writeFileSync(`./views/properties/${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}-${date.getDay()}.json`, timetableJSON)
            jsonFileNmb++
        } catch (error) {
            console.log(error)
            req.query.className = error
        }
    }

    function getDay() {
        const current = new Date()
        var d = current.getDate()
        var m = current.getMonth() + 1
        var y = current.getFullYear()

        for (let count = 0; count < 8; count++) {
            target = new Date(`${y}-${m}-${d}`)

            if (target == "Invalid Date") {
                if ((target.getMonth() + 1) == 12) {
                    y++
                }
                else {
                    m++
                }
                d = 1
                target = new Date(`${y}-${m}-${d}`)
            }

            dates.push(target)
            d++
        }
    }

    next()
}

module.exports = router