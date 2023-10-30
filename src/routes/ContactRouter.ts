import { Router } from "express";
import { ContactController } from "../controllers/ContactController";

export class ContactRouter {
  private controller: ContactController;
  private prefix: string = "/contact";

  constructor() {
    this.controller = new ContactController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.index);
    router.post(`${this.prefix}/sendEmail`, this.controller.sendEmail);
  }
}
