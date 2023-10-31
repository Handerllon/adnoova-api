const nodemailer = require('nodemailer');
import { DataSource, Repository } from "typeorm";
import { Client } from "../entities/Client.entity";
import { MongoDataSource } from "../DataSource";

export class EmailService {

    private static repository = MongoDataSource.getRepository(Client);

    constructor() {
    }

    async index(): Promise<any> {
        try {
            return "This is the email service"
        } catch (err) {
            console.log(err);
        }
    }

    private async sendOwnEmail(transporter: any, client: Client, data: { cliente: string; nombre: string; email: string; telefono: string; mensaje: string;}){
        let mailOptions = {
            from: client.clientEmail,
            to: client.clientEmail, // Replace with the recipient's email
            subject: 'Testing Nodemailer with Hostinger SMTP',
            text: "Hola " + data.nombre + "tu numero de telefono es " + data.telefono + "Tu mensaje fue: " + data.mensaje
        };
		try{
			let info = await transporter.sendMail(mailOptions);
			return info
		} catch(err){
			throw new Error("Error al enviar Own Email:" + err)
		}
    }

    private async sendClientEmail(transporter: any, client: Client, data: { cliente: string; nombre: string; email: string; telefono: string; mensaje: string;}){
		let mailOptions = {
            from: client.clientEmail,
            to: data.email, // Replace with the recipient's email
            subject: 'Testing Nodemailer with Hostinger SMTP',
            text: "Hola " + data.nombre + "tu numero de telefono es " + data.telefono + "Tu mensaje fue: " + data.mensaje
        };
		try{
			let info = await transporter.sendMail(mailOptions);
			return info
		} catch(err){
			throw new Error("Error al enviar Client Email:" + err)
		}
    }

    async sendEmail(data: { cliente: string; nombre: string; email: string; telefono: string; mensaje: string;}): Promise<any> {
        try {
            const client = await EmailService.repository.findOneBy({clientName: data.cliente})
            console.log(client)

            let transporter = nodemailer.createTransport({
                host: 'smtp.hostinger.com',
                port: 465, // Or the appropriate port provided by Hostinger
                secure: true, // Use true if the port is for secure connections (e.g., 465)
                auth: {
                    user: client.clientEmail,
                    pass: client.clientEmailPassword,
                },
            });
            // Enviamos el mail a uno mismo (Sería el contacto DEL cliente)
            const ownResponse = await this.sendOwnEmail(transporter, client, data)
            // Enviamos el mail de confirmación de contacto al cliente (usuario)
            const clientResponse = await this.sendClientEmail(transporter, client, data)
            return ("Email from client " + data.cliente + " sent");
        } catch (err) {
            return console.log(err);
        }
    }
}
