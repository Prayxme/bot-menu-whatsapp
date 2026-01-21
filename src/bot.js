import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { handleMainMenu } from "./flows/mainMenu.js";

export async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');

    const sock = makeWASocket({ auth: state, printQRInTerminal: true });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = 
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;
        
        const from = msg.key.remoteJid;

        await handleMainMenu(sock, from, text);
    }
    );
}
