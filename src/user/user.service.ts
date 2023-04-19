import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  public users: User[];
  constructor() {
    this.users = [{
      firstName: "asdf",
      lastName: "lastname",
      userName: "username",
      email: "carlos@test.com",
      password: "1234",
      id: randomUUID()
  }];
  }

  private convertToUser(createUser: CreateUserDto): UserDto {
    const user = new UserDto();
    user.firstName = createUser.firstName;
    user.email = createUser.email;
    user.password = createUser.password;
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = this.convertToUser(createUserDto);
    user.id = randomUUID();
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === `${id}`);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userInStore = this.users.find((item) => item.id === `${id}`);

    if (!userInStore) {
     return  new HttpException('User not found', HttpStatus.NOT_FOUND);
      
    }

    const userUpdated = this.convertToUser(updateUserDto);
    const userIndex = this.users.findIndex((item) => item.id === `${id}`);
    this.users[userIndex] = userUpdated;

    return userUpdated;
  }

  remove(id: string) {
    const userInStore = this.users.find((item) => item.id === `${id}`);

    if (!userInStore) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users.splice(index, 1);

    return userInStore;
  }
}
