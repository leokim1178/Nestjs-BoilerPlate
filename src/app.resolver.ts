import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }
}
