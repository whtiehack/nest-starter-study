import {Module} from "@nestjs/common";
import {AuthorResolver} from "./author.resolver";


@Module({
    imports: [/*PostsModule*/],
    components: [/*AuthorsService,*/ AuthorResolver],
})
export class AuthorsModule {}
