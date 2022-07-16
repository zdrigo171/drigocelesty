import {Api, TelegramClient} from "telegram";
import cfonts from "cfonts"
import {StringSession} from "telegram/sessions/index.js";
import input from "input";
import config from "../config.js";
import database from "./db.js";
import {NewMessage} from "telegram/events/index.js";
import {random} from "./functions.js";

async function initialize() {
    const stringSession = new StringSession(database.db.data.session);

    const client = new TelegramClient(stringSession, config.API_ID, config.API_HASH, {connectionRetries: 5})
    await client.start({
        phoneNumber: async () => await input.text('Número?'),
        password: async () => await input.text('Senha?'),
        phoneCode: async () => await input.text('Código?'),
        onError: (err) => console.error(err),
    });

    const banner = cfonts.render((`ONLINE`), {
        font: 'block',
        color: 'candy',
        align: 'left',
        gradient: ["red","magenta"],
        lineHeight: 3
    });    

    console.log(banner.string);

    console.log(`⊱ ============ ⊱ [LOGS] ⊰ ============ ⊰`)
    console.log(`[LOGS] Forwarder iniciando...`)
    console.log(`[LOGS] Carregando configurações.`)
    console.log(`[LOGS] Nenhuma falha encontrada.`)
    console.log(`[LOGS] Celesty Blaze está online!`)
    console.log(`⊱ ============ ⊱ [LOGS] ⊰ ============ ⊰`)
    console.log(`Desenvolvido por dannyel#0001`)

    await database.updateSession(client.session.save())

    client.addEventHandler(parseTelegramMessage, new NewMessage({}));

    telegram.client = client
}

async function parseTelegramMessage(event) {
    const message = event.message;
    const peerId = message.peerId.channelId || message.peerId.chatId;

    if (!peerId) return

    for (let condition of config.forward) {

        if (
            Math.abs(Number(condition.from.id)) === Number(peerId)
            && message.message.match(new RegExp(condition.filter.join("|"), "ig"))
        ) {

            let peer = condition.to.id
            if(peer[0] === "-") peer = peer.slice(1)
            if(condition.to.type === "channel") peer = "-100" + peer
            else if(condition.to.type === "chat") peer = "-" + peer

            let msg = `${message.message}`

            const regex = /⏩/gi;
            let msg2 = msg.replace(regex, "")

            let msg3 = msg2.replace(config.MessageReplace1, config.To1)

            let msg4 = msg3.replace(config.MessageReplace2, config.To2)

            let msg5 = msg4.replace(config.MessageReplace3, config.To3)

            let msg6 = msg5.replace(config.MessageReplace4, config.To4)

            let mensagem = msg6.replace(config.MessageReplace5, config.To5)

            await telegram.client.invoke(
                message.media ?
                    new Api.messages.SendMedia({
                        ...message,
                        randomId: random(0, 1000000000),
                        peer
                    }) : new Api.messages.SendMessage({
                        message: mensagem,
                        randomId: random(0, 1000000000),
                        peer: peer
                    })
            )
        }
    }
}

export const telegram = {initialize}
export default telegram