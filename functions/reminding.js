const request = require('request');
const controller = require('../controllers/user')
let message = require('../messages/messages').message

const TIME_ZONE = 3;
// const TIME_ZONE = 0;

exports.remindingUsers = async (bot) => {
    console.log('remind');
    let users = await controller.get()

    let date = new Date()
    let d = date.getDay()
    let m = date.getMinutes()
    let h = date.getHours()
    h += TIME_ZONE
    m += (h * 60)
    
    users.map( async (user)  => {
        let id = user.userId
        let name = user.userName
        let time = JSON.parse(user.time)
        //friday
        if (d === 5) {
            if(m === 1260) {
                let msg = message(name).friday[0]
                let rd = randomizeInteger(0, msg.text.length)
                bot.sendMessage(id, msg.text[rd])
            }
        }
        //friday
        time.forEach(t => {
            let {day, hours} = t

            if (day - 1 === d) {
                if(m === 540) {
                    let msg = message(name).before[0]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
                if(m === 1140) {
                    let msg = message(name).before[1]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
                if(m === 1380) {
                    let msg = message(name).before[2]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
            }

            if (day === d) {
                if(m === 540) {
                    let msg = message(name).today[0]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
                if(m === 780) {
                    let msg = message(name).today[1]
                    let rd = randomizeInteger(0, msg.text.length)
                    setTimeout(() => {
                        bot.sendMessage(id, msg.text[rd])
                    }, 1000)
                    // continue
                    let msg2 = message(name).today[2]
                    let rd2 = randomizeInteger(0, msg2.text.length)
                    setTimeout(() => {
                        bot.sendMessage(id, msg2.text[rd2])
                    }, 2000)
                }
                if(m === hours + 135) {
                    let msg = message(name).today[3]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
                if(m === 1380) {
                    let msg = message(name).today[4]
                    let rd = randomizeInteger(0, msg.text.length)
                    bot.sendMessage(id, msg.text[rd], msg.option)
                }
            }
        })
    })
}


function randomizeInteger(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}