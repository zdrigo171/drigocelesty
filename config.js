export default {

    // TELEGRAM

    API_ID: 18382959,
    API_HASH: "955a32bfc3bf2a52ba69878310d7d968",

    // REPLACE

    MessageReplace1: "📄ESTRATÉGIA: ( Diamond Royal 1.0 )",
    To1: " ▶️ Método: Celesty Roullete 1.0",

    MessageReplace2: "GREEN ✅✅✅✅✅✅",
    To2: "Green 🏆\n",

    MessageReplace3: "Loss ❌( Tomou HIT ? Caia Fora )",
    To3: "Loss 🔺(Tenha consciência) \n",

    MessageReplace4: "Aposte aqui: Double",
    To4: "Realizar no máximo 2 martingales",

    MessageReplace5: "🔔Entrada Confirmada 🔔",
    To5: "⏩ Análise Completa\n",

    MessageReplace6: "📄ESTRATÉGIA: ( Diamond Royal 3.0 )",
    To6: "▶️ Método: Celesty Roulette 3.0",

    //


    forward: [
        {
            "from": {id: "-1263993299", type: "chat"},
            "to": {id: "-1213963789", type: "channel"},
            "filter": ["Entrada Confirmada", "GREEN", "Loss"]
        }
    ]
}