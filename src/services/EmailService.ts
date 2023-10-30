const nodemailer = require('nodemailer');
import { MongoDataSource } from "../DataSource";
import { Client } from "../entities/Client.entity";

export class EmailService {

    private static email: String
    private static password: String

  constructor() {
        EmailService.email = 'admin@adnoova.com'; // Your Hostinger email address
        EmailService.password = 'Adnoova23147201!'; // Your Hostinger email password
        const repo = MongoDataSource.getRepository(Client)
        const newClient = new Client()
        newClient.clientName = "Tatu"
        newClient.clientEmail = "Email"
        newClient.clientEmailPassword = "password"
        const savedUser = repo.save(newClient)
  }

  async index(): Promise<any> {
    try {
        return "This is the email service"
    } catch (err) {
        console.log(err);
    }
  }

  async sendEmail(data: { nombre: string; email: string; telefono: string; mensaje: string;}): Promise<any> {
    try {
        
        console.log(data)

        let transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465, // Or the appropriate port provided by Hostinger
            secure: true, // Use true if the port is for secure connections (e.g., 465)
            auth: {
                user: EmailService.email,
                pass: EmailService.password,
            },
        });

        let mailOptions = {
            from: EmailService.email,
            to: data.email, // Replace with the recipient's email
            subject: 'Testing Nodemailer with Hostinger SMTP',
            text: "Hola " + data.nombre + "tu numero de telefono es " + data.telefono + "Tu mensaje fue: " + data.mensaje
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            return ('Email sent: ' + info.response);
            //return "Hola"
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    } catch (err) {
        console.log(err);
    }
  }
}
