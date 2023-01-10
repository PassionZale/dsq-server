import { UserRole } from '@/common/enums/user-role.enum';
import { Role } from '@/core/decorators/role.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlanDTO } from './dto/create-plan.dto';
import { UpdatePlanDTO } from './dto/update-plan.dto';
import { PlanEntity } from './entity/plan.entity';
import { PlanSerivce } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanSerivce) {}

  @Role(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() createPlanDTO: CreatePlanDTO,
  ): Promise<PlanEntity> {
    return this.planService.create(createPlanDTO);
  }

  @Role(UserRole.ADMINISTRATOR)
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<void> {
    return this.planService.remove(id);
  }

  @Role(UserRole.ADMINISTRATOR)
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updatePlanDTO: UpdatePlanDTO,
  ): Promise<void> {
    return this.planService.update(id, updatePlanDTO);
  }

  @Role(UserRole.DEVELOPER)
  @Get()
  public async findAll(): Promise<PlanEntity[]> {
    return this.planService.findAll();
  }

  @Role(UserRole.DEVELOPER)
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<PlanEntity> {
    return this.planService.findOne(id);
  }
}
