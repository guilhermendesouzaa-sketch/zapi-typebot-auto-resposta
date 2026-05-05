const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const INSTANCE_ID = process.env.INSTANCE_ID;
const TOKEN = process.env.TOKEN;
const TYPEBOT_LINK = process.env.TYPEBOT_LINK;

const lastMessageTime = {};

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    const phone = data.phone;

    if (!phone) return res.sendStatus(200);

    const now = Date.now();

    if (lastMessageTime[phone] && now - lastMessageTime[phone] < 120000) {
      return res.sendStatus(200);
    }

    lastMessageTime[phone] = now;

    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone,
        message: `Olá! 👋

Para registrar sua solicitação financeira, utilize o link abaixo:

${TYPEBOT_LINK}`
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Bot financeiro online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
