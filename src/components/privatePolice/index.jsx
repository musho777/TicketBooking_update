import { useSelector } from 'react-redux'
import './style.css'
export const PrivatePolice = () => {
    const { language } = useSelector((st) => st.StaticReducer)
    if (language == 'am') {
        return <div>
            <h1 style={{ textAlign: 'center', margin: '40px 0' }}>Privacy Policy</h1>
            <div>
                1. Ներածություն
            </div>
            <div className="blockss">
                Բարի գալուստ համերգի տոմսերի վաճառքի կայք www.shinetickets.com: Այս փաստաթուղթը սահմանում է կայքի
                օգտագործման պայմանները և տոմսերի վաճառքի կանոնները: Օգտագործելով մեր կայքը, դուք համաձայնում եք այս
                պայմաններին:
            </div>
            <div>
                2. Տեղեկություններ իրադարձությունների մասին
            </div>
            <div className="blockss">
                2.1. Մենք տրամադրում ենք տեղեկատվություն գալիք համերգների մասին՝ ներառյալ ամսաթվերը, վայրերը,
                արտիստները և տոմսերի գները:
            </div>
            <div className="blockss">
                2.2. Մենք պատասխանատվություն չենք կրում համերգների ժամանակացույցի և ծրագրերի փոփոխությունների համար,
                որոնք կարող են տեղի ունենալ կազմակերպիչների որոշմամբ:
            </div>
            <div>
                3. Տոմսերի գնում
            </div>
            <div className="blockss">
                3.1. Տոմսերը կարող եք ձեռք բերել մեր կայքի միջոցով՝ հետևելով վաճառքի էջի ցուցումներին և հրահանգներին:
            </div>
            <div className="blockss">
                3.2. Գնվելուց հետո տոմսերը կարող են չվերադարձվել կամ վերադարձվել՝ համաձայն համերգի կազմակերպիչների
                քաղաքականության:
            </div>
            <div>
                4. Վճարում
            </div>
            <div className='blockss'>
                4.1. Մենք ընդունում ենք վճարման տարբեր եղանակներ, որոնք նշված են մեր կայքում:
            </div>
            <div className='blockss'>
                4.2. Բոլոր գործարքները մշակվում են անվտանգության և տվյալների գաղտնիության չափանիշներին
                համապատասխան:
            </div>
            <div>
                5. Տոմսերի առաքում
            </div>
            <div className='blockss'>
                5.1. Մենք տրամադրում ենք տոմսերի առաքման տարբեր եղանակներ՝ ներառյալ էլփոստը, բջջային հավելվածները և
                տպագիր տոմսերը:
            </div>
            <div className='blockss'>
                5.2. Մենք պատասխանատվություն չենք կրում կորցրած կամ չառաքված տոմսերի համար, եթե դա գնորդի կամ
                փոստային ծառայության մեղքն է:
            </div>
            <div>
                6. Տոմսերի վերադարձ և փոխանակում
            </div>
            <div className='blockss'>
                6.1. Տոմսերի վերադարձը և փոխանակումը կատարվում է համերգի կազմակերպիչների կողմից սահմանված
                կանոններով: Մանրամասների համար կապվեք նրանց հետ:
            </div>
            <div>
                7. Սահմանափակումներ և արգելքներ
            </div>
            <div className='blockss'>
                7.1. Մեր կայքի օգտագործումը տոմսեր ձեռք բերելու համար անօրինական կամ խարդախ նպատակներով արգելվում է:
            </div>
            <div className='blockss'>
                7.2. Մենք իրավունք ենք վերապահում մեր հայեցողությամբ հրաժարվել տոմսերի վաճառքից ցանկացած անձի:
            </div>
            <div>
                8. Գաղտնիություն և անվտանգություն
            </div>
            <div className='blockss'>
                8.1. Մենք հավաքում և մշակում ենք անձնական տվյալներ՝ համաձայն մեր Գաղտնիության քաղաքականության:
            </div>
            <div>
                9. Մտավոր սեփականություն
            </div>
            <div className='blockss'>
                9.1. Մեր կայքում տեղադրված բոլոր նյութերը պաշտպանված են հեղինակային իրավունքով: Դրանց օգտագործումն
                առանց թույլտվության արգելված է։
            </div>
            <div>
                10. Պատասխանատվության սահմանափակում
            </div>
            <div className='blockss'>
                10.1. Մենք պատասխանատվություն չենք կրում այն ​​կորուստների համար, որոնք կարող են առաջանալ մեր կայքից
                օգտվելուց կամ համերգներին մասնակցելուց:
            </div>
            <div>
                11. Վերջնական դրույթներ
            </div>
            <div className='blockss'>
                11.1. Այս Պայմաններն ու Պայմանները ենթակա են փոփոխման առանց ծանուցման: Խնդրում ենք պարբերաբար
                ստուգել դրանք թարմացումների համար:
            </div>
            <div className='blockss'>
                11.2. Սույն Պայմանների և տոմսերի գնման պայմանագրի միջև հակասության դեպքում տոմսերի գնման պայմանագիրը
                պետք է վերահսկի:
            </div>
            <div className='blockss' style={{ marginBottom: '70px' }}>
                Սույն դրույթներն ու պայմանները կազմված են Հայաստանի Հանրապետության օրենսդրությանը համապատասխան և
                կիրառելի են www.shinetickets.com կայքից օգտվելու համար:
            </div>

        </div>
    }
    else if (language == 'en') {
        return <div>
            <h1 style={{ textAlign: 'center', margin: '40px 0' }}>Privacy Policy</h1>
            <div>
                1. Introduction
            </div>
            <div className="blockss">
                Welcome to the concert ticket sales site www.shinetickets.com. This document establishes the terms of
                use of the site and the rules for selling tickets. By using our site you agree to these terms.
            </div>
            <div>
                2. Information about events
            </div>
            <div className="blockss">
                2.1. We provide information about upcoming concerts, including dates, locations, artists and ticket
                prices.
            </div>
            <div className="blockss">
                2.2. We are not responsible for changes in the schedule and programs of concerts that may occur by
                decision of the organizers.
            </div>
            <div>
                3.Buying tickets
            </div>
            <div className="blockss">
                3.1. You can purchase tickets through our website by following the directions and instructions on the
                sales page.
            </div>
            <div className="blockss">
                3.2. Once purchased, tickets may be non-refundable or refundable according to the concert organizers&#39;
                policies.
            </div>
            <div>
                4.Payment
            </div>
            <div className='blockss'>
                4.1. We accept various payment methods listed on our website.
            </div>
            <div className='blockss'>
                4.2. All transactions are processed in compliance with security and data privacy standards.
            </div>
            <div>
                5. Ticket delivery
            </div>
            <div className='blockss'>
                5.1. We provide a variety of ticket delivery methods including email, mobile apps and printed tickets.
            </div>
            <div className='blockss'>
                5.2. We are not responsible for lost or undelivered tickets if this is the fault of the buyer or the postal
                service.
            </div>
            <div>
                6. Return and exchange of tickets
            </div>
            <div className='blockss'>
                6.1. Returns and exchanges of tickets are subject to the rules established by the concert organizers.
                Contact them for details.
            </div>
            <div>
                7. Restrictions and prohibitions
            </div>
            <div className='blockss'>
                7.1. Using our site to purchase tickets for illegal or fraudulent purposes is prohibited.
            </div>
            <div className='blockss'>
                7.2. We reserve the right to refuse the sale of tickets to any person at our discretion.
            </div>
            <div>
                8. Privacy and security
            </div>
            <div className='blockss'>
                8.1. We collect and process personal data in accordance with our Privacy Policy.
            </div>
            <div>
                9. Intellectual property
            </div>
            <div className='blockss'>
                9.1. All materials posted on our website are protected by copyright. Their use without permission is
                prohibited.
            </div>
            <div>
                10. Limitation of liability
            </div>
            <div className='blockss'>
                10.1. We are not responsible for losses that may arise from using our site or attending concerts.
            </div>
            <div>
                11. Final provisions
            </div>
            <div className='blockss'>
                11.1. These Terms and Conditions are subject to change without notice. Please check them regularly for
                updates.
            </div>
            <div className='blockss'>
                11.2. In the event of a conflict between these Terms and Conditions and the ticket purchase agreement,
                the ticket purchase agreement shall control.
            </div>
            <div className='blockss' style={{ marginBottom: '70px' }}>
                These terms and conditions are drawn up in accordance with the legislation of the Republic of Armenia
                and are applicable to the use of the website www.shinetickets.com.
            </div>
        </div>
    }
    else {
        return <div>
            <h1 style={{ textAlign: 'center', margin: '40px 0' }}>Privacy Policy</h1>
            <div>
                1. Введение
            </div>
            <div className="blockss">
                Добро пожаловать на сайт продажи билетов на концерты www.shinetickets.com . Этот документ
                устанавливает условия использования сайта и правила продажи билетов. Используя наш сайт, вы
                соглашаетесь с этими условиями.
            </div>
            <div>
                2. Информация о мероприятиях
            </div>
            <div className="blockss">
                2.1. Мы предоставляем информацию о предстоящих концертах, включая даты, местоположение,
                артистов и цены билетов.
            </div>
            <div className="blockss">
                2.2. Мы не несем ответственности за изменения в расписании и программах концертов, которые
                могут произойти по решению организаторов.
            </div>
            <div>
                3. Покупка билетов
            </div>
            <div className="blockss">
                3.1. Вы можете приобрести билеты через наш сайт, следуя указаниям и инструкциям на странице
                продажи.
            </div>
            <div className="blockss">
                3.2. После покупки билетов, они могут быть невозвратными или подлежать возврату согласно
                правилам организаторов концерта.
            </div>
            <div>
                4.Оплата
            </div>
            <div className='blockss'>
                4.1. Мы принимаем различные методы оплаты, указанные на нашем сайте.
            </div>
            <div className='blockss'>
                4.2. Все транзакции обрабатываются соблюдением стандартов безопасности и
                конфиденциальности данных.
            </div>
            <div>
                5.Доставка билетов
            </div>
            <div className='blockss'>
                5.1. Мы предоставляем различные способы доставки билетов, включая электронную почту,
                мобильные приложения и печатные билеты.
            </div>
            <div className='blockss'>
                5.2. Мы не несем ответственности за утерю или недоставку билетов, если это произошло по вине
                покупателя или почтовой службы.
            </div>
            <div>
                6.Возврат и обмен билетов
            </div>
            <div className='blockss'>
                6.1. Возврат и обмен билетов регулируются правилами, установленными организаторами
                концерта. Обратитесь к ним, чтобы узнать подробности.
            </div>
            <div>
                7.Ограничения и запреты
            </div>
            <div className='blockss'>
                7.1. Использование нашего сайта для приобретения билетов на незаконные или мошеннические
                цели запрещено.
            </div>
            <div className='blockss'>
                7.2. Мы оставляем за собой право отказать в продаже билетов любому лицу по нашему
                усмотрению.
            </div>
            <div>
                8. Конфиденциальность и безопасность
            </div>
            <div className='blockss'>
                8.1. Мы собираем и обрабатываем персональные данные в соответствии с нашей Политикой
                конфиденциальности.
            </div>
            <div>
                9. Интеллектуальная собственность
            </div>
            <div className='blockss'>
                9.1. Все материалы, размещенные на нашем сайте, охраняются авторскими правами. Их
                использование без разрешения запрещено.
            </div>
            <div>
                10. Ограничение ответственности
            </div>
            <div className='blockss'>
                10.1. Мы не несем ответственности за убытки, которые могут возникнуть в результате
                использования нашего сайта или при посещении концертов.
            </div>
            <div>
                11. Заключительные положения
            </div>
            <div className='blockss'>
                11.1. Эти Условия и Положения подлежат изменению без уведомления. Пожалуйста, регулярно
                проверяйте их на обновления.
            </div>
            <div className='blockss'>
                11.2.В случае конфликта между этими Условиями и Положениями и договором о покупке
                билетов, договор о покупке билетов имеет приоритет.
            </div>
            <div className='blockss' style={{ marginBottom: '70px' }}>
                Эти условия и положения составлены в соответствии с законодательством РА и применимы к
                использованию сайта www.shinetickets.com.
            </div>
        </div>
    }
}