import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Article } from './prisma.dto';
import { PrismaService } from './prisma.service';

const prisma = new PrismaClient();

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}

  throwExecption(content) {
    throw new HttpException(
      {
        message: content,
        error: content,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('getArticles')
  async getArticles(): Promise<Article[]> {
    const article = await prisma.article.findMany({});
    return article;
  }

  @Get('getArticleById/:id')
  async getArticleById(@Param('id') id: number): Promise<Article> {
    const info = await prisma.article.findUnique({
      where: { id: Number(id) },
    });
    return info;
  }

  @Get('getArticleByQuery')
  async getArticle(@Query() query: Article): Promise<Article | Article[]> {
    const { id } = query;

    if (!id)
      throw new HttpException(
        {
          message: 'The article id is required !',
          error: 'The article id is required',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const info = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    return info;
  }

  @Post('createArticle')
  async createArticle(
    @Body() body: Article,
  ): Promise<{ message: string; data: Article } | void> {
    const { title, body: content } = body;

    const isHas = await prisma.article.findUnique({
      where: { title },
    });

    let errorInfo;
    if (isHas) errorInfo = 'The title is exist !';
    if (!content || content === '') errorInfo = 'The body is required !';

    if (errorInfo) return this.throwExecption(errorInfo);

    const info = await prisma.article.create({
      data: body,
    });

    return {
      message: 'This article was added successfully !',
      data: info,
    };
  }

  @Delete('deleteArticle/:id')
  async deleteArticle(
    @Param('id') id: number,
  ): Promise<{ message: string; data: Article } | void> {
    const isFound = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!isFound) return this.throwExecption('The article is not found !');

    const info = await prisma.article.delete({
      where: { id: Number(id) },
    });

    return {
      message: 'This article was deleted successfully !',
      data: info,
    };
  }

  @Put('updateArticle/:id')
  async updateArticle(
    @Param('id') id: number,
    @Body() body: Article,
  ): Promise<{ message: string; data: Article } | void> {
    let errorInfo;

    const { title, body: content } = body;

    const isFound = await this.getArticleById(id);

    const isHas = await prisma.article.findUnique({
      where: { title },
    });

    if (isHas) errorInfo = 'The title is exist !';
    if (!content || content === '') errorInfo = 'The body is required !';
    if (!isFound) errorInfo = 'The article is not found !';

    if (errorInfo) return this.throwExecption(errorInfo);

    const info = await prisma.article.update({
      where: { id: Number(id) },
      data: body,
    });

    return {
      message: 'This article was updated successfully !',
      data: info,
    };
  }
}
