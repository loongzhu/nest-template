import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { Role } from "../enums";
import { ForbiddenException } from "../exception";
import { Roles, RolesGuard } from "../guard";
import { LoggingInterceptor } from "../interceptor";
import type { CreateCatDto as CreateCatPipe } from "../pipe";
import {
  CustomValidationPipe,
  ZodValidationPipe,
  createCatSchema,
} from "../pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body(new CustomValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<void | string> {
    this.catsService.create(createCatDto);
    return "This action adds a new cat";
  }

  @Post("validation/zod")
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createValidationZod(@Body() createCatDto: CreateCatPipe) {
    this.catsService.create(createCatDto);
    return "This action adds a new cat";
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      const cats = await this.catsService.findAll();
      return cats;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "This is a custom message",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get("ForbiddenException")
  async findAllError(): Promise<Cat[]> {
    throw new ForbiddenException();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Cat {
    const cat = this.catsService.findOne(id) || ({} as Cat);
    return cat;
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<string> {
    await this.catsService.update(id, updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<string> {
    await this.catsService.delete(id);
    return `This action removes a #${id} cat`;
  }
}
