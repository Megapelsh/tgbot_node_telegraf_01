const fetch = require("node-fetch");

const qrcode = async function getQRCode (ctx, event) {

    let url=`https://multicode.eu/qrCode/?f=p&data=zahid%20--%20${event}%20--%20vidviduvach%20--%20+380%2098%20563%202147%20--%20dostup%20--%20+++%20DOZVOLENO%20+++`;

    await fetch(url)
        .then(response => {
            // ctx.reply('Твій код:')
            ctx.replyWithPhoto(response)
            console.log('pic sent')
        })
        .catch(await function () {
            console.log('---------- start error ---------')
            console.log('fetch error')
            console.log('--------- finish error ---------')
        })
}

module.exports = qrcode;

// скачивание и отправка в чат бота изображение кода
// картинку кода получаем по ссылке:
// http://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=1_1633959341_pRfyB71D63

// f=p   png
// f=s   svg

// https://multicode.eu/qrCode/?f=p&data=zahid%20--%20Vistavka%20vyazanih%20gamanciv%20--%20vidviduvach%20--%20+380%2098%20563%202147%20--%20dostup%20--%20+++%20DOZVOLENO%20+++
// пример ссылки с разрешением доступа
// текст необходимо транслитерировать!!!

