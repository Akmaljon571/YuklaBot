import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv"
import { read, write } from "./utils/FS.js";
import { InstaYukla } from "../src/module/insta.js"
import { TikTokYukla } from "./module/tiktok.js";

dotenv.config()

const bot = new TelegramBot(process.env.TG_BOT, { polling: true })

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id

    if (read("userId").at(-1)?.chatId !== chatId) {
        const all = read("userId") 
        all.push({userName: msg.chat.username, chatId})
        write("userId", all)
    }

    bot.sendMessage(chatId, "🏘Bosh Menyu", {
        reply_markup: {
            keyboard: [
                [
                    "📥Video Yuklash"
                ],
                [
                    "🧑‍💻Dasturchi haqida", "⚙️Sozlama"
                ],
                [
                    "🖇Admin Bilan Bo'g'lanish"
                ]
            ],
            resize_keyboard: true
        },
    })
})

bot.on("text", async msg => {
    const chatId = msg.chat.id
    if (msg.text == "📥Video Yuklash") {
        bot.sendMessage(chatId, "Menga Instagram Tik Tok yoki Youtube video linkini tashlang")
    }

    if (msg.entities && msg?.entities[0].type == "url") {
        
        if (msg.text.split(".")[1] == "instagram") {
            bot.sendMessage(chatId, "Instagram video Iltimos Kuting...")
            
            const { video } = await InstaYukla(msg.text)
            
            if (video) {
                bot.sendVideo(chatId, video, {
                    caption: `@videolarni_yuklash_bot orqali yuklab olindi`,
                })
            }
        } else if (msg.text.split("/")[2] == "instagram.com") {
           bot.sendMessage(chatId, "Aka Instagram Story yuklab ololmiman to'g'ri tushunin. Yaqinda Bu Funksiyasi ham qo'shiladi")
        } else if (msg.text.split(".")[1] == "tiktok") {
            bot.sendMessage(chatId, "Iltimos Kuting...")

            const { video } = await TikTokYukla(msg.text)

            if (video) {
                bot.sendVideo(chatId, video[0], {
                caption: `@instagram_yuklashvor_bot orqali yuklab olindi`
                })
            }
       }
    }
})

bot.on("message", msg => {
    const chatId = msg.chat.id;

    if (msg.text == "🧑‍💻Dasturchi haqida") {

        bot.sendMessage(chatId, `
       \n 👨‍💻 Dasturchi Xaqida Qisqacha Ma'lumotlar! 🇬🇧
       \n ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
      \n  👤Ism: Akmal
       \n 🛡Familiya: Ahmadjonov
       \n 🔢Yosh:  18
       \n ⚡️Yashash Joyi:  Tashkent
       \n 🗂Web developer and Telegram Bot
       \n 📧E-Mail:  ahmadjonovakmal079@gmail.com
       \n 📬Instagram: akmalsher7771 (https://www.instagram.com/akmalsher7771)
       \n 📍Telegram: FrontEnd DEV (https://t.me/webdevdevbackend15)`,)
    }    
})
