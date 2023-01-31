const express = require("express"),
    app = express(),
    PORT = 3123,
    cors = require("cors");

corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json({ limit: '512MB' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/activate", (req, res) => {

    const { cardNumber, phoneNumber, fullName } = req.body;

    if (cardNumber != '5556960022097622' || phoneNumber != '9647722603299') {
        return res.status(400).json({
            success: false,
            type: "balance and transaction",
            message: "unable to process your request it's just a mock server :D",
            data: null
        })
    }
    return res.status(200).json({
        "success": true,
        "type": "otp",
        "message": "OTP has been sent to customer phone number",
        "data": {
            "phoneNumber": "9647722603299",
            "sessionId": "0fcca7d2085646569eabb02abc04c5ab"
        }
    })
})


app.post("/api/balance-and-transactions", (req, res) => {

    try {
        const { cardNumber } = req.body;

        if (cardNumber != '5556960022097622') {
            return res.status(400).json({
                success: false,
                type: "balance and transaction",
                message: "unable to process your request it's just a mock server :D",
                data: null
            })
        }
        return res.status(200).json({
            "success": true,
            "type": "Balance-Transaction",
            "message": "Get Balance And Trasaction For The Customer",
            "data": {
                "balance": 295000.0,
                "transaction": [
                    {
                        "Amount": -21038.1620,
                        "TrxnAmount": 13.99,
                        "TransactionCurrency": 840,
                        "TrxnDate": "2022-12-23",
                        "MerName": "CONTABO.COM              ",
                        "TransactionDescription": "CONTABO.COM, MUNCHEN, DEU"
                    },
                    {
                        "Amount": -735,
                        "TrxnAmount": 735,
                        "TransactionCurrency": 368,
                        "TrxnDate": "2022-12-20",
                        "MerName": "HM_PubgM                 ",
                        "TransactionDescription": "HM_PubgM, Wan Chai, HKG"
                    },
                    {
                        "Amount": -735,
                        "TrxnAmount": 735,
                        "TransactionCurrency": 368,
                        "TrxnDate": "2022-12-20",
                        "MerName": "HM_PubgM                 ",
                        "TransactionDescription": "HM_PubgM, Wan Chai, HKG"
                    }
                ]
            }
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            type: "balance and transaction",
            message: "unable to process your request it's just a mock server :D",
            data: null
        })
    }
})


app.post("/api/verify-otp", (req, res) => {

    try {
        const { otp } = req.body;

        if (otp != '556600') {
            return res.status(400).json({
                "success": false,
                "type": "Bad Request",
                "message": "Unable to process the request",
                "data": null
            })
        }
        return res.status(200).json({
            "success": true,
            "type": "activate",
            "message": "Card Activated",
            "data": null
        })
    } catch (e) {
        return res.status(400).json({
            "success": false,
            "type": "Bad Request",
            "message": "Unable to process the request",
            "data": null
        })
    }
})


app.listen(PORT, () => {
    console.log("Server Start Running on PORT:" + PORT);
})