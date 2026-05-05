const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const INSTANCE_ID = process.env.INSTANCE_ID;
const TOKEN = process.env.TOKEN;

app.post("/webhook", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const phone = req.body.phone;
    const message = req.body.message?.text;

    if (!phone || !message) return res.sendStatus(200);

    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone: phone,
        message: "Aqui está o link 👇\nhttps://SEU-LINK-TYPEBOT"
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("ERRO:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
