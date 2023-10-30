import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";

export class ContactController {
  private static service: EmailService = new EmailService();

  async index(req: Request, res: Response): Promise<any> {
    try {
        const result = await ContactController.service.index()
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  async sendEmail(req: Request, res: Response): Promise<any> {
    try {
        const result = await ContactController.service.sendEmail(req.body)
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
