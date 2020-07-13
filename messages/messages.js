exports.message = (name = 'друг') => {
    return {
        before: [
            {
                text: [
                    `Доброе утро, ${name}. Удачного дня!`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["Спасибо!"]]
                        }
                }
            },
            {
                text: [
                    `Думаю, если ты не сделал(а) домашнее задание, то самое время приступить.`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["Сделал(а)!"], ["Сейчас начну"]]
                        }
                }
            },
            {
                text: [
                    `Спокойной ночи, ${name}! Не забудь про завтрашнее занятие`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["Спокойной ночи🌃"]]
                        }
                }
            }
        ],
        today: [
            {
                text: [
                    `Доброе утро, ${name}. Удачного тебе дня!`,                    
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["И тебе удачи)"]]
                        }
                }
            },
            {
                text: [
                    `У тебя все получилось сделать в задании? Если нет, то подготовь вопросы к началу урока, твой преподаватель обязательно на них ответит`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["И тебе удачи)"]]
                        }
                }
            },
            {
                text: [
                    `Или если у тебя есть время, то напиши ему(ей) прямо сейчас`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["И тебе удачи)"]]
                        }
                }
            },
            {
                text: [
                    `Как прошло занятие? Узнал(а) что-нибудь новое для себя?`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [['Очень хорошо, все понял(а)'], ['Вроде, все понятно'], ['Придется пересмотреть материал']]
                        }
                }
            },
            {
                text: [
                    `Сладких снов, ${name}!`,
                ],
                option: {
                    "parse_mode": "Markdown",
                        "reply_markup": {
                            "one_time_keyboard": true,
                            "keyboard": [["Спокойной ночи🌃"]]
                        }
                }
            }
        ],
        friday: [
            {
                text: [
                    `Удачных и продуктивных выходных тебе, ${name}😉`,
                ]
            }
        ]
    }
}