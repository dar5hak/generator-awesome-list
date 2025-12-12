import telebot
from telebot.types import ChatPermissions
from config import BOT_TOKEN, ADMIN_ID

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(
        message,
        "Welcome to *WinzerEscrowBot* 🔒\n\n"
        "This bot will create a private group for a Buyer & Seller.\n"
        "Use /create to start an escrow deal.",
        parse_mode="Markdown"
    )

@bot.message_handler(commands=['create'])
def create_group(message):
    try:
        msg = bot.reply_to(message, "Send the *Seller's Telegram username* (without @):")
        bot.register_next_step_handler(msg, get_seller)
    except Exception as e:
        bot.send_message(message.chat.id, f"Error: {e}")

def get_seller(message):
    try:
        seller_username = message.text.strip().replace("@", "")
        bot.send_message(message.chat.id, "Escrow group placeholder created (demo).")
    except Exception as e:
        bot.send_message(message.chat.id, f"Failed: {e}")

@bot.message_handler(commands=['unlock'])
def unlock_group(message):
    if message.from_user.id != ADMIN_ID:
        return bot.reply_to(message, "You are not authorized.")
    bot.send_message(message.chat.id, "Group unlocked (demo).")

print("Bot is running...")
bot.infinity_polling()
