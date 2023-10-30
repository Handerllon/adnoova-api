const nodemailer = require('nodemailer');

export class TestService {

    private static email: String
    private static password: String

  constructor() {
        TestService.email = 'admin@adnoova.com'; // Your Hostinger email address
        TestService.password = 'Adnoova23147201!'; // Your Hostinger email password
  }

  async index(): Promise<any> {
    try {
        return "Hola"
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
                user: TestService.email,
                pass: TestService.password,
            },
        });

        let mailOptions = {
            from: TestService.email,
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
