import { IsString, IsInt, IsOptional, IsArray } from 'class-validator'
import { Type, Transform } from 'class-transformer'

const defaultPage = 1
const defaultPageSize = 10
const defaultOrder = 'asc'
const defaultOrderBy = 'id'

export class PaginationParams {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = defaultPage

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number = defaultPageSize

  @IsString()
  @IsOptional()
  order: string = defaultOrder

  @IsString()
  @IsOptional()
  orderBy: string = defaultOrderBy

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  firstRequestAt: number
}

export class FilterParams extends PaginationParams {
  @IsArray()
  @Transform(({ value }) => (value ? parseStringArray(value, ';') : undefined))
  @IsOptional()
  categories: string[] | undefined = []

  @IsString()
  @IsOptional()
  address: string | undefined
}

function parseStringArray(v: string | string[], sep: string): string[] {
  if (typeof v !== 'string') {
    return v
  }
  return v.split(sep)
}
