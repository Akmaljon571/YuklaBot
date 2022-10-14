import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv"
import { read, write } from "./utils/FS.js";
import { InstaYukla } from "../src/module/insta.js"
import { TikTokYukla } from "./module/tiktok.js";
import { YoutubeLink } from "./module/youtube.js";

dotenv.config()

const bot = new TelegramBot(process.env.TG_BOT, { polling: true })

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id

    const fil = read("userId").filter(e => e.chatId === chatId)
        if (!fil.length) {
            const all = read("userId")
            all.push({id: all.at(-1)?.id + 1 || 1, chatId, name: msg.chat.first_name})
            write("userId", all)
        } else {
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
        }
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
                bot.deleteMessage(chatId, msg.message_id + 1)
            }
        } else if (msg.text.split("/")[2] == "instagram.com") {
           bot.sendMessage(chatId, "Aka Instagram Story yuklab ololmiman to'g'ri tushunin. Yaqinda Bu Funksiyasi ham qo'shiladi")
        }else  if(msg.text.split("/")[2] == "youtu.be" || msg.text.split("\n")[msg.text.split("\n").length - 1].split("/")[2]== "youtu.be") {
            try {
                bot.sendMessage(chatId, "Iltimos Kuting...")
                const video = await YoutubeLink(msg.text)
        
                console.log(video.data.formats[1]?.url);
        
                if (video) {
                    const bots = await bot.sendVideo(chatId, video.data?.formats[1]?.url, {
                        caption: `
                        \n${video.data?.title}
                        \n@instagram_yuklashvor_bot orqali yuklab olindi`
                    })
                    if (bots) {
                        bot.deleteMessage(chatId, msg.message_id + 1)
                    }
                }
            } catch (error) {
                bot.deleteMessage(chatId, msg.message_id + 1)
                bot.sendMessage(chatId, "Bazi bir sabablarga kora hozir botimiz faqat 10 minutgacha bolgan videolarni tortib olib kelyapti holos😣. Keyinchalik bu muomoni bartaraf etamiz In shaa Allah")
            }
        } else if (msg.text.split(".")[1] == "tiktok") {
            bot.sendMessage(chatId, "Iltimos Kuting...")

            const { video } = await TikTokYukla(msg.text)

            if (video) {
                bot.sendVideo(chatId, video[0], {
                    caption: `@instagram_yuklashvor_bot orqali yuklab olindi`
                })
                bot.deleteMessage(chatId, msg.message_id + 1)
            }
        } else {
        bot.sendMessage(chatId, "Aka bu invalit link ")
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
       \n 📍Telegram: Web Developer (https://t.me/webdeveloper571)`,)
    }    
})

bot.on("text", msg => {
    const chatId = msg.chat.id
    if(msg.text == "🖇Admin Bilan Bo'g'lanish"){
        bot.sendMessage(chatId, "https://t.me/webdeveloper571 Telegram Manziliga Murojat qilin")
    }
})

// bot.on("message", async msg => {
//     const chatId = msg.chat.id
//     console.log(msg);
    
// })