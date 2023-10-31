import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";

export class ContactController {
  private static emailService: EmailService = new EmailService();

  async index(req: Request, res: Response): Promise<any> {
    try {
        const result = await ContactController.emailService.index()
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  async sendEmail(req: Request, res: Response): Promise<any> {
    try {
        const result = await ContactController.emailService.sendEmail(req.body)
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
