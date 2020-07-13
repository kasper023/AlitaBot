const TelegramBot = require('node-telegram-bot-api');
// const token = '1202033897:AAHglJA6iLKaP6EA4j47tdw_XwQUtF7sqGA'; // Alita_test
const token = '1133025600:AAF2ASdpr1PfJ5ci0hWhlEglUa7T5T0j2KM'; // Alita
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
const bot = new TelegramBot(token, { polling: true });
const TIME_ZONE = 3;
// const TIME_ZONE = 0;
const request = require('request');
const controller = require('./controllers/user')

let message = require('./messages/messages').message
let remindingUsers = require('./functions/reminding').remindingUsers

bot.onText(/^\/start/, async function (msg, match) {
    // await console.log( message("SDds").before);
    try{
        const userId = msg.from.id;
        const userNameMsg = msg.from.first_name;
        // await bot.sendMessage(userId,  message(userNameMsg).before[0].text)
        await controller.post({userId,userName: userNameMsg})
        const {userName} = await controller.get(userId)
        // console.log('start')

        await setTimeout(()=> {
            let text = "Привет, " + userName + "! Меня зовут Алита. С сегодняшнего дня я буду твоим другом, который не даст тебе учиться плохо) Я буду постоянно помогать тебе в самом трудном “Начать работать”. Буду стараться постоянно подбадривать тебя, чтобы ты был в тонусе и твое желание учиться не угасало. Жди от меня много задач. Я буду смотреть на их выполнение и говорить тебе твой прогресс.";
            bot.sendMessage(userId, text);
        }, 750)

        await setTimeout(()=> {
            bot.sendMessage(userId, 'Это начало твоего пути в программировании вместе со школой Decode, я верю в тебя :)');
        }, 1000)

        const reqData = await req('http://185.125.46.93:3007/all_users')
        // console.log(reqData);
        
        let groups = reqData.map(item => {
            if(item.title.type != 'private' && item.title.title != 'Decode-New-Generation!') {
                return [{
                    text: item.title.title,
                    callback_data: JSON.stringify(['start', item.title.id])
                }]
            }
        })
        groups = groups.filter(item => {
            return item != undefined;
        })
        await setTimeout(() => {
            let option = {
                reply_markup: JSON.stringify({
                    inline_keyboard: groups
                })
            }
            bot.sendMessage(userId, 'Какой курс ты изучаешь?', option)
        }, 1500)
    }
    catch (e) {
        await console.log(e)
    }

});


bot.onText(/^\/get_task/, async function (msg, match) {
    await console.log(match);
    try{
        bot.sendMessage(msg.from.id, 'Задания на стадии разработки...')
        // let {id} = msg.from
        // let user = await controller.get(id)
        // let {course} = user
        // let coursesName = []

        // const api = 'http://jsrush.decode.kz:5001/api/bot/getSectionByCourseId?courseId=1'
        // const reqData = await req(api)
        // await reqData.forEach(item => {
        //     coursesName.push([{
        //         text: item.name,
        //         callback_data: JSON.stringify(['course', item.id])
        //     }])
        // })

        // let option = {
        //     reply_markup: JSON.stringify({
        //         inline_keyboard: coursesName
        //     })
        // }
        // bot.sendMessage(id, 'Выбери раздел', option)
        
    }
    catch (e) {
        await console.log(e)
    }

});


bot.onText(/^\/set_name/, async function (msg, match) {
    await console.log(match);
    await console.log(msg);
    try{
        let {id} = msg.from
        let {text} = msg
        let input = text.split(' ')
        if(input[1]) {
            await controller.set_name({userId:id, userName:input[1]})
            await bot.sendMessage(id, `Теперь я буду называть тебя ${input[1]}`)
        }
        else
            await bot.sendMessage(id, 'Введите по формату: \n\n /set_name Имя')
    }
    catch (e) {
        await console.log(e)
    }
});


bot.on('callback_query', async msg => {
    try {
        let {data} = msg
        const {id} = msg.from
        const {message_id} = msg.message
        const name = msg.from.first_name
        let schedule
        let course
        data = data.split(',')
        data[0] = data[0].slice(2, data[0].length - 1)
        data[1] = data[1].slice(0, data[1].length - 1)
        if(data[0] === 'start') {
            const api = 'http://185.125.46.93:3007/all_users'
            const reqData = await req(api)
            
            await reqData.forEach(item => {            
                if(String(item.title.id) === String(data[1])) {
                    course = item.title.title
                    schedule = item.time
                }
            })
            
            course = course.substr(0,course.indexOf(' '))
            controller.put({userId:id, course:course, time: schedule})
        
            
            let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            
            setTimeout(() => {
                bot.sendMessage(id, "Я записала твое расписание")
            }, 1500)
        }
        if(data[0] === 'course') {
            const api = 'http://jsrush.decode.kz:5001/api/bot/getLessonsBySectionId?sectionId=' + data[1]
            const reqData = await req(api)
            let lessonsName = []
            await reqData.forEach(item => {
                lessonsName.push([{
                    text: item.title,
                    callback_data: JSON.stringify(['lesson', item.id])
                }])
            })
    
            let option = {
                reply_markup: JSON.stringify({
                    inline_keyboard: lessonsName
                })
            }
            bot.sendMessage(id, 'Выбери тему', option)
        }
        if(data[0] === 'lesson') {
            const api = 'http://jsrush.decode.kz:5001/api/bot/getRandomTasksByLessonId?lessonId=' + data[1]
            const reqData = await req(api)
            // let lessonsName = []
            // await reqData.forEach(item => {
            //     lessonsName.push([{
            //         text: item.title,
            //         callback_data: JSON.stringify(['lesson', item.id])
            //     }])
            // })
            if(!reqData) {
                bot.sendMessage(id, 'Задача на стадии разработки, команда Decode просит прощения')
            }
            else {
                bot.sendMessage(id, '<code>'+ reqData.requirements +'</code>',{
                    parse_mode: 'Markdown'
                })
            }
        }
        bot.deleteMessage(id, message_id)
    } catch (e) {
        console.log(e.message);
    }
})


bot.on('message', (msg) => {
    const message = msg.text;
    const {id} = msg.from
    if (message === 'Сделал(а)!') {
        setTimeout(() => {
            bot.sendMessage(id, "Умница, я тобой горжусь!")
        }, 1000)
    }
    if (message === 'Сейчас начну') {
        setTimeout(() => {
            bot.sendMessage(id, "Уверена, что у тебя все получится. Удачи)")
        }, 1000)
    }
    if (message === 'Очень хорошо, все понял(а)') {
        setTimeout(() => {
            bot.sendMessage(id, "Прекрасно, я рада за тебя😌")
        }, 1000)
    }
    if (message === 'Очень хорошо, все понял(а)') {
        setTimeout(() => {
            bot.sendMessage(id, "Прекрасно, я рада за тебя😌")
        }, 1000)
    }
    if (message === 'Вроде, все понятно') {
        setTimeout(() => {
            bot.sendMessage(id, "Попробуй закрепить знания домашним заданием. Уверена, что у тебя получиться☺")
        }, 1000)
    }
    if (message === 'Придется пересмотреть материал') {
        setTimeout(() => {
            bot.sendMessage(id, "Не расстраивайся. Помни, что ты всегда можешь обратиться к преподавателю")
        }, 1000)
    }
})


const cron = require('node-cron');
cron.schedule('*/10 * * * *', async () => {
    await remindingUsers(bot)
});


async function req(api) {
    try {
        return new Promise((resolve, reject) => {
            request(api, { json: true }, async (err, res, body) => {
                if (err) return console.log(err);
                resolve(res.body);
            })            
          });
    }
    catch (e) {
        await console.log(e)
    }
}

