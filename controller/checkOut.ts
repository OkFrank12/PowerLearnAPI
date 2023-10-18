import { Request, Response } from "express";
import https from "https"
import { HTTP } from "../errors/mainError";
import mongoose from "mongoose";
import begModel from "../model/begModel";



export const checkOut = async(req : Request, res: Response) =>{
    try {
        
        const {email, amount} = req.body;
        const {begID} = req.params

        const beg:any = JSON.stringify({
            email, 
            amount:parseInt(amount),
            begID
        })

        const options = {
            hostname : "api.paystack.co",
            port : 443,
            path: "/transaction/initialize",
            method : "POST",
            headers : {
                Authorization: 
                "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                "Content-Type": "application/json",
            }
        }

        const ask = https.request(options,(resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data + chunk
            })

            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(HTTP.OK).json({
                    message : "Payment made",
                    data : JSON.parse(data)
                })
                
            })
        })
        .on("error", (error) => {
            console.log(error);
            
        })

        ask.write(beg);
        ask.end

        beg?.checkout.push(new mongoose.Types. ObjectId(beg._id!))
        beg?.save()
    } catch (error) {
        return res.status(HTTP.BAD).json({
            message: "Error making Payment",
            data:error.message
          });
    }
}