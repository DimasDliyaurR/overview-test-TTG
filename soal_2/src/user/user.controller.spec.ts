import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserCreateDTO } from '@user/dto/UserCreate.dto';

const mockUser = {
  _id: 'some_id_123',
  name: 'John Doe',
  email: 'john@example.com',
};

const mockUserService = {
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    // 3. Setup the Testing Module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // Inject the mock instead of real service
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    // Clear mock history before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // --- GET USER TESTS ---
  describe('getUser', () => {
    it('should return all users wrapped in a response object', async () => {
      // Arrange
      mockUserService.getAll.mockResolvedValue([mockUser]);

      // Act
      const result = await controller.getUser();

      // Assert
      expect(service.getAll).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Get All User',
        data: [mockUser],
      });
    });

    it('should throw HttpException on error', async () => {
      // Arrange
      mockUserService.getAll.mockRejectedValue(new Error('DB Error'));

      // Act & Assert
      await expect(controller.getUser()).rejects.toThrow(HttpException);
    });
  });

  // --- CREATE USER TESTS ---
  describe('createUser', () => {
    it('should create a user and return success message', async () => {
      // Arrange
      const dto: UserCreateDTO = { name: 'John', email: 'john@test.com' };

      mockUserService.create.mockReturnValue(mockUser);

      // Act
      const result = await controller.createUser(dto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'User has been create',
      });
    });
  });

  // --- DELETE USER TESTS ---
  describe('deleteUser', () => {
    it('should delete a user and return success message', async () => {
      // Arrange
      const id = 'some_id_123';
      mockUserService.delete.mockResolvedValue(mockUser);

      // Act
      const result = await controller.deleteUser(id);

      // Assert
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'User has been delete sucessfully',
      });
    });

    it('should handle errors during deletion', async () => {
      // Arrange
      const id = 'bad_id';
      mockUserService.delete.mockRejectedValue(new Error('User not found'));

      // Act & Assert
      await expect(controller.deleteUser(id)).rejects.toThrow(HttpException);
    });
  });
});