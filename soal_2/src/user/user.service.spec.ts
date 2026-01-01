import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { UserCreateDTO } from '@user/dto/UserCreate.dto';
import { UserUpdateDTO } from '@user/dto/UserUpdate.dto';

// 1. Definisikan Mock Data
const mockUser = {
  _id: 'some_id_123',
  name: 'John Doe',
  email: 'john@example.com',
};

// 2. Definisikan Mock untuk Mongoose Model
// Kita perlu meniru behavior Mongoose: method seperti find() mengembalikan object yang punya method exec()
const mockUserModel = {
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let model: typeof mockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // Ini cara Inject Model Mongoose di testing
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get(getModelToken(User.name));

    // Reset semua mock sebelum tiap test agar bersih
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- TEST GET ALL ---
  describe('getAll', () => {
    it('should return all users', async () => {
      // Arrange: Kita harus mock 'find' supaya return object yang punya 'exec'
      mockUserModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockUser]),
      });

      // Act
      const result = await service.getAll();

      // Assert
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  // --- TEST CREATE ---
  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const dto: UserCreateDTO = { name: 'John', email: 'john@test.com' };

      mockUserModel.create.mockResolvedValue(mockUser);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(model.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  // --- TEST UPDATE ---
  describe('update', () => {
    it('should update a user and return the new data', async () => {
      // Arrange
      const id = 'some_id_123';
      const dto: UserUpdateDTO = { name: 'Updated Name', email: "we123@gmail.com" };
      const updatedUser = { ...mockUser, ...dto };

      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedUser),
      });

      // Act
      const result = await service.update(id, dto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        dto,
        { new: true },
      );
      expect(result).toEqual(updatedUser);
    });
  });

  // --- TEST DELETE ---
  describe('delete', () => {
    it('should delete a user', async () => {
      // Arrange
      const id = 'some_id_123';

      // Mock chain: findByIdAndDelete -> exec -> result
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      // Act
      const result = await service.delete(id);

      // Assert
      expect(model.findByIdAndDelete).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(mockUser);
    });
  });
});