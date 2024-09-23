export interface InternalCombustionConfiguration {
  engineCapacity: number;
  fuelTankCapacity: number;
  cuttingHeightLevels: number;
}

export interface ElectricConfiguration {
  cableLength: number;
  bladeCount: number;
  color: string;
}

export interface BatteryConfiguration {
  batteryCount: number;
  batteryCapacity: number;
  color: string;
}

export type EngineType = 'Internal Combustion' | 'Electric' | 'Battery';

export interface Configuration {
  engineType: EngineType;
  brand: string;
  model: string;
  internalCombustionConfig?: InternalCombustionConfiguration;
  electricConfig?: ElectricConfiguration;
  batteryConfig?: BatteryConfiguration;
}
