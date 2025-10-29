import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from '../services/vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  const mockVehicle = {
    id: 'test-uuid-123',
    brand: 'Tesla',
    model: 'Model Y',
    batteryCapacity: 124,
    currentChargeLevel: 66,
    status: 'charging',
    lastUpdated: new Date('2025-03-06T19:01:45'),
    averageEnergyConsumption: 23.22,
    type: 'BEV',
    emission_gco2_km: 0,
  };

  const mockVehicles = [
    mockVehicle,
    {
      id: 'test-uuid-456',
      brand: 'BMW',
      model: 'i3',
      batteryCapacity: 92,
      currentChargeLevel: 82,
      status: 'in_use',
      lastUpdated: new Date('2025-03-06T19:01:45'),
      averageEnergyConsumption: 28.57,
      type: 'BEV',
      emission_gco2_km: 0,
    },
  ];

  const mockVehicleService = {
    getVehicle: jest.fn(),
    getVehicles: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('getVehicle', () => {
    it('should return a vehicle when found', async () => {
      // Arrange
      const vehicleId = 'test-uuid-123';
      mockVehicleService.getVehicle.mockResolvedValue(mockVehicle);

      // Act
      const result = await controller.getVehicle(vehicleId);

      // Assert
      expect(result).toEqual(mockVehicle);
      expect(service.getVehicle).toHaveBeenCalledWith(vehicleId);
      expect(service.getVehicle).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when vehicle not found', async () => {
      // Arrange
      const vehicleId = 'non-existent-id';
      mockVehicleService.getVehicle.mockRejectedValue(
        new NotFoundException('Vehicle not found'),
      );

      // Act & Assert
      await expect(controller.getVehicle(vehicleId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(controller.getVehicle(vehicleId)).rejects.toThrow(
        'Vehicle not found',
      );
      expect(service.getVehicle).toHaveBeenCalledWith(vehicleId);
    });

    it('should call service with correct id parameter', async () => {
      // Arrange
      const vehicleId = 'test-uuid-789';
      mockVehicleService.getVehicle.mockResolvedValue(mockVehicle);

      // Act
      await controller.getVehicle(vehicleId);

      // Assert
      expect(service.getVehicle).toHaveBeenCalledWith(vehicleId);
      expect(service.getVehicle).toHaveBeenCalledWith(
        expect.stringContaining('test-uuid-789'),
      );
    });
  });

  describe('getVehicles', () => {
    it('should return an array of vehicles with default pagination', async () => {
      // Arrange
      mockVehicleService.getVehicles.mockResolvedValue(mockVehicles);

      // Act
      const result = await controller.getVehicles();

      // Assert
      expect(result).toEqual(mockVehicles);
      expect(service.getVehicles).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(service.getVehicles).toHaveBeenCalledTimes(1);
    });

    it('should return vehicles with custom pagination parameters', async () => {
      // Arrange
      const page = 2;
      const limit = 5;
      mockVehicleService.getVehicles.mockResolvedValue([mockVehicle]);

      // Act
      const result = await controller.getVehicles(page, limit);

      // Assert
      expect(result).toEqual([mockVehicle]);
      expect(service.getVehicles).toHaveBeenCalledWith({ page, limit });
      expect(service.getVehicles).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no vehicles found', async () => {
      // Arrange
      mockVehicleService.getVehicles.mockResolvedValue([]);

      // Act
      const result = await controller.getVehicles();

      // Assert
      expect(result).toEqual([]);
      expect(service.getVehicles).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });

    it('should handle pagination with page 1 and limit 20', async () => {
      // Arrange
      mockVehicleService.getVehicles.mockResolvedValue(mockVehicles);

      // Act
      await controller.getVehicles(1, 20);

      // Assert
      expect(service.getVehicles).toHaveBeenCalledWith({ page: 1, limit: 20 });
    });

    it('should handle large page numbers', async () => {
      // Arrange
      const page = 100;
      const limit = 10;
      mockVehicleService.getVehicles.mockResolvedValue([]);

      // Act
      const result = await controller.getVehicles(page, limit);

      // Assert
      expect(result).toEqual([]);
      expect(service.getVehicles).toHaveBeenCalledWith({ page, limit });
    });
  });
});
