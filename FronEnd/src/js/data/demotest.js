export default () => {
    return {
        id: 1,
        name: 'Демо тест',
        description: 'Дату можно создать, используя компоненты в местной временной зоне. Для этого формата обязательны только первые два аргумента. Отсутствующие параметры, начиная с hours считаются равными нулю, а date – единице.',
        time: 5,
        startTime: Date.now(),
        questions: [
            {
                id: 1,
                name: 'Вопрос 1',
                body: `
<p>На 92-м году жизни скончался известный скульптор Эрнст Неизвестный. Одной из последних работ мастера стал памятник Сергею Дягилеву, установленный в пермской гимназии №11 в 2007 году.<br />
Скульптура высотой 4,5 метра и весом около 8 тонн была отлита из цветной патинированной бронзы, которая не устойчива к атмосферным воздействиям. Она была загружена в гимназию через крышу учебного заведения.<br />
Первоначально предполагалось, что статуя будет стоять на перекрестке улиц Сибирской и Луначарского. На этом месте даже установили памятный камень. Но великолепная фигура организатора &laquo;Русских сезонов&raquo; была выполнена из бронзы и покрыта патиной. Эрнст Неизвестный сказал, что ее ни в коем случае нельзя ставить на улицу, где льют кислотные дожди.<br />
Среди вариантов размещения памятника было фойе нового здания Пермского театра оперы и балета - после завершения его строительства (так и не начатого до сих пор). Предлагалось также поставить статую под открытым небом, но закрыть стеклянной капсулой. И все же остановились на установке памятника в гимназии - родовом особняке семьи Дягилевых.</p>

<p>Памятник был торжественно открыт в марте 2007 года, во время фестиваля &laquo;Дягилевские сезоны: Пермь-Петербург-Париж&raquo;.</p>

<p>- И мы тогда сказали: &laquo;Дягилев вернулся домой&raquo;, - говорит директор &laquo;дягилевки&raquo;. &ndash; Правда, тяжелая фигура, весом в 8,5 тонн перевернула нам весь пол, и все лето 2007 года мы укрепляли фундамент под актовым залом. И, конечно, хотелось бы, чтобы такой замечательный памятник был на виду у жителей Перми. Мы надеялись, что после строительства нового здания гимназии сможем установить его в фойе, под колоннами, чтобы фигуру было видно с улицы. Но проект был изменен, и, похоже, наш Дягилев так и останется на своем месте.</p>

<p><u><span style="background-color:rgb(254, 254, 254); font-size:16px"><a href="https://infodiaghilev.wordpress.com/2016/08/11/%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D1%8D%D1%80%D0%BD%D1%81%D1%82%D0%B0-%D0%BD%D0%B5%D0%B8%D0%B7%D0%B2%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D0%B3%D0%BE/">Подробнее</a>&nbsp;</span></u></p>

<p>&nbsp;</p>
`,
                isShuffleAnswer: true,
                type: 'single',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 1,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false
                    },
                    {
                        id: 2,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 3,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]

            },
            {
                id: 2,
                name: 'Вопрос 2',
                body: 'какой-то вопрос 2',
                isShuffleAnswer: false,
                type: 'single',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 4,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false

                    },
                    {
                        id: 5,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 6,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]

            },
            {
                id: 3,
                name: 'Вопрос 3',
                body: 'какой-то вопрос 3',
                isShuffleAnswer: true,
                type: 'single',
                picked: false,
                skiped: false,
                answered: false,

                answers: [
                    {
                        id: 7,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false

                    },
                    {
                        id: 8,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 9,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]

            },
            {
                id: 4,
                name: 'Вопрос 4',
                body: 'какой-то вопрос 4',
                isShuffleAnswer: false,
                type: 'single',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 10,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false

                    },
                    {
                        id: 11,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 12,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]
            },
            {
                id: 5,
                name: 'Вопрос 5',
                body: 'какой-то вопрос 5',
                isShuffleAnswer: false,
                type: 'multiple',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 13,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false

                    },
                    {
                        id: 14,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 15,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]
            },
            {
                id: 6,
                name: 'Вопрос 6',
                body: 'какой-то вопрос 6',
                isShuffleAnswer: false,
                type: 'multiple',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 16,
                        body: 'Ответ 1',
                        isRight: true,
                        value: false

                    },
                    {
                        id: 17,
                        body: 'Ответ 2',
                        isRight: false,
                        value: false

                    },
                    {
                        id: 18,
                        body: 'Ответ 3',
                        isRight: false,
                        value: false

                    }
                ]
            },
            {
                id: 7,
                name: 'Вопрос 7',
                body: 'какой-то вопрос 7',
                isShuffleAnswer: false,
                type: 'free',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 19,
                        body: 'Ваш ответ',
                        isRight: true,
                        value: ''

                    },
                ]
            },
            {
                id: 8,
                name: 'Вопрос 8',
                body: 'какой-то вопрос 8',
                isShuffleAnswer: false,
                type: 'free',
                picked: false,
                skiped: false,
                answered: false,
                answers: [
                    {
                        id: 22,
                        body: 'Ваш ответ',
                        isRight: true,
                        value: ''
                    },
                ]
            },
        ]
    }
}