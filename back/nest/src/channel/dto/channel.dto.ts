import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ChannelDto {
	@ApiProperty({
		description: 'the name of the channel',
		type: String
	})
	@IsNotEmpty()
	name: string;
}