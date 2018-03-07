import { Module } from '@nestjs/common';
import {EventsGateWay} from "./events.gateway";

@Module({
    components: [EventsGateWay],
})
export class EventsModule {}