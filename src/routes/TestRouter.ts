import { Router } from "express";
import { TestController } from "../controllers/TestController";

export class TestRouter {
  private controller: TestController;
  private prefix: string = "/test";

  constructor() {
    this.controller = new TestController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.index);
    router.post(`${this.prefix}/email`, this.controller.sendEmail);
  }
}
