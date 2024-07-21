import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  readonly price: number;
}

// update-product.dto.ts
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;
}
