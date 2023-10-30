import { Request, Response } from "express";
import { TestService } from "../services/TestService";

export class TestController {
  private static service: TestService = new TestService();

  async index(req: Request, res: Response): Promise<any> {
    try {
        const result = await TestController.service.index()
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }

  async sendEmail(req: Request, res: Response): Promise<any> {
    try {
        const result = await TestController.service.sendEmail(req.body)
        res.status(200).send({
            data: result
        });
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
