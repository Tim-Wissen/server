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

        function getDay() {
            const current = new Date()
            var d = current.getDate() + 1
            var m = current.getMonth() + 1
            var y = current.getFullYear()
            var target
            var result
            for (let count = 0; count <= 10; count++) {
                target = new Date(`${y}-${m}-${d}`)

                if (target == "Invalid Date") {
                    d = 1
                    m++
                    target = new Date(`${y}-${m}-${d}`)
                }

                result = target
                console.log(result)
                console.log(d)

                d++
            }
        }

        getDay()
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = router