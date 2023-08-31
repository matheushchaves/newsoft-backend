import { ApiProperty } from "@nestjs/swagger";

export class CollectionMetadataDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    structure: any;
}