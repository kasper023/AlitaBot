// const TelegramBot = require('node-telegram-bot-api');
//
// // replace the value below with the Telegram token you receive from @BotFather
// const token = '';
//
// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});
//
// var questions = [
//   {
//     title:'question 1 ?',
//     buttons: [
//         [{ text: 'Answer 1.', callback_data: '0_1' }],
//         [{ text: 'Answer 2.', callback_data: '0_2' }],
//         [{ text: 'Answer 3.', callback_data: '0_3' }],
//         [{ text: 'Answer 4.(right)', callback_data: '0_4' }]
//       ],
//     right_answer: 4
//   },
//   {
//     title:'question 2 ?',
//     buttons: [
//         [{ text: 'Answer 1.', callback_data: '1_1' }],
//         [{ text: 'Answer 2.(right)', callback_data: '1_2' }],
//         [{ text: 'Answer 3.', callback_data: '1_3' }],
//         [{ text: 'Answer 4.', callback_data: '1_4' }]
//       ],
//     right_answer: 2
//   },
//   {
//     title:'question 3 ?',
//     buttons: [
//         [{ text: 'Answer 1.', callback_data: '2_1' }],
//         [{ text: 'Answer 2.', callback_data: '2_2' }],
//         [{ text: 'Answer 3.(right)', callback_data: '2_3' }],
//         [{ text: 'Answer 4.', callback_data: '2_4' }]
//       ],
//     right_answer: 3
//   },
// ];
//
// function getRandomQuestion(){
//   return questions[Math.floor(Math.random()*questions.length)];
// }
//
// function newQuestion(msg){
//   var arr = getRandomQuestion();
//   var text = arr.title;
//   var options = {
//     reply_markup: JSON.stringify({
//       inline_keyboard: arr.buttons,
//       parse_mode: 'Markdown',
//       remove_keyboard: true
//     })
//   };
//   chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
//   bot.sendMessage(chat, text, options);
// }
//
// bot.onText(/\/start_test/, function (msg, match) {
//   newQuestion(msg);
//   // editMessageText(STRINGS.TASK_CANCELED_BY + " @" + callbackQuery.from.username,
//   //     callbackQuery.message.chat.id,
//   //     callbackQuery.message.message_id,
//   //     utils.getTelegramConfirmedMarkup())
// });
//
// bot.on('callback_query', function (msg) {
//   var answer = msg.data.split('_');
//   var index = answer[0];
//   var button = answer[1];
//   editMessageText()
//   if (questions[index].right_answer==button) {
//     bot.sendMessage(msg.from.id, 'correct ))');
//   } else {
//     bot.sendMessage(msg.from.id, 'incorrect ((');
//   }
//   newQuestion(msg);
// });
//
// function getTelegramReplyMarkup(){
//
//         var opts = {
//             reply_markup: {
//                 inline_keyboard: []
//             }
//         }
//
//         return opts;
//     }
//     function editMessageText(text_message, chatId, msgId, reply_markup) {
//
//         console.log("chatId", chatId);
//         console.log("msgId", msgId);
//
//
//         var markup = {
//             chat_id: chatId,
//             message_id: parseInt(msgId),
//             reply_markup: reply_markup
//         }
//
//         console.log("reply_markup", JSON.stringify(markup));
//
//         telegramBot.editMessageText(text_message, markup).then(function (response) {
//             console.log("editMessageText response", response);
//         }).catch(function (err) {
//             console.log("editMessageText err", err);
//         })
//     }
//
// /*
// var notes = [
//         {
//             text:'Доброе утро, ' + userName+ ', самое время распланировать свой день так, чтобы в нем было время для кодинга. И обязательно выполни домашнее задание :)',
//             time: '4:41'
//         },
//         {
//             text:'Как проходит твой день, ' + userName +'? Ты выполнил первое задание домашней работы? Начни его делать прямо сейчас, я даю тебе на это 40 минут)',
//             time: '4:42'
//         },
//         {
//             text:'Ну как, у тебя получилось?',
//             answer: [
//                 [{ text: 'Да', callback_data: '2_yes' }],
//                 [{ text: 'Нет', callback_data: '2_no' }]
//             ],
//             yes: 'Я в этом и не сомневалась, ты очень смышленый(ая). Теперь по решай остальные задачи, если возникают трудности и ты не можешь решить одну задачу более 2 часов, то это сигнал задать вопрос преподавателю. И не бойся искать возможные решения в интернете. Хороший программист должен научиться хорошо гуглить ;)',
//             no: 'Я уверена что ты старался решить эту задачу) но учиться - это значит уметь спрашивать и задавать вопросы. Напиши в вашу общую группу что у тебя не получается решить первую задачу, отправь туда скрины своих попыток. Так ты наладишь контакт со своими одногруппниками) да и преподаватель, я уверена будет рад тому, что ты стараешься работать и задавать вопросы и обязательно тебе поможет. Главное, не стесняйся)',
//             time: '14:43'
//         },
//         {
//             text:'Ну, как твои дела? Познаешь суть программирования) Эх и мне бы пройти весь этот путь заново ;) У тебя получилось выполнить больше половины домашнего задания?',
//             answer: [
//                 [{ text: 'Да', callback_data: '3_yes' }],
//                 [{ text: 'Нет', callback_data: '3_no' }],
//                 [{ text: 'Уже сделал(а) все', callback_data: '3_allCompleted' }]
//             ],
//             allCompleted: 'Ты просто умничка 😘 Продолжай в том же духе, а я запишу это у себя, преподаватель проверит выполненные задания и обязательно передаст мне ;)',
//             yes: 'Молодееец, постарайся решить оставшиеся задачи, если будет ну слишком прям трудно, напиши в вашу общую группу, уверена что эти задачи были сложными, но вместе вы сможете их решить)',
//             no: 'Я уверена что ты старался решить эту задачу) но учиться - это значит уметь спрашивать и задавать вопросы. Напиши в вашу общую группу что у тебя не получается решить первую задачу, отправь туда скрины своих попыток. Так ты наладишь контакт со своими одногруппниками) да и преподаватель, я уверена будет рад тому, что ты стараешься работать и задавать вопросы и обязательно тебе поможет. Главное, не стесняйся)',
//             extraNoAnswer: [
//                 [{ text: 'Начну выполнять скоро', callback_data: '3_extraYes' }],
//                 [{ text: 'Я уделил достаточно времени, но мне было сложновато решить их', callback_data: '3_extraNo' }]
//             ],
//             extraYes: 'Хорошо, я думаю у тебя получится и ты все успеешь, сжала свои ручки в кулак и болею за тебя 😍',
//             extraNo: 'Да, бывает сложновато с этими домашними заданиями, аж голову сводит. Предлагаю написать в общую группу список задач которые у тебя не получилось решить, и скинуть скрины твоих попыток.',
//             time: '4:44'
//         },
//         {
//             text:'Ты считаешь что сегодня был продуктивный день в твоем развитии программирования?',
//             answer: [
//                 [{ text: 'Да', callback_data: '4_yes' }],
//                 [{ text: 'Нет, я сегодня ничего не делал', callback_data: '4_no' }],
//                 [{ text: 'Нет, я думал что смогу сделать больше', callback_data: '4_extraNo' }]
//
//             ],
//             yes: 'И я так считаю, ты славно потрудился(ась). Теперь можешь отдохнуть ;) заранее спокойной ночи!',
//             no: 'Нет я сегодня ничего не делал - Наверно в этом есть и моя вина 😢буду стараться подбадривать тебя, на новые свершения! Завтра обязательно порешай задачи 🙏 А сейчас лучше отдохни, спокойной ночи 💤',
//             extraNo: ' Мне очень нравится твое усердство 😊Ты можешь продолжить решение задач завтра. Пожелаю тебе спокойной ночи в заранее 😊',
//             goodNightAnswer: [
//                 [{text: 'и тебе спокойной ночи!', callback_data: '4_thanks'}]
//             ],
//             thanks: ' Спасибо 🥰',
//             time: '4:45'
//
//         }
//
//     ];
// * */
