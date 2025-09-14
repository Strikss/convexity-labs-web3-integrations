import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('gas-balance')
  getGasBalance() {
    return this.appService.getGasBalance();
  }

  @Get('usdt0-balance')
  getUsdt0Balance() {
    return this.appService.getUsdt0Balance();
  }

  @Get('usdt0-trades')
  getUsdt0Trades() {
    return this.appService.getUsdt0Trades();
  }

  @Get('index-transfers')
  async indexTransfers() {
    return await this.appService.indexUsdt0Transfers(100);
  }
}
