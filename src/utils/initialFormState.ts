import { 
  ChassisType, 
  FrameType,
  MainRailSize,
  AFrameSize,
  ChassisRaiserSize,
  CouplingType,
  CouplingPosition,
  ZSection,
  AxleType,
  RollerRockerWeight,
  TorflexWeight,
  AirbagLevel,
  WheelType,
  WheelSize
} from '../types';

export const initialFormState = {
  // Basic Information
  customer_id: '',
  chassis_no: '',
  model_name: '',
  order_by: '',
  signature: '',
  order_date: '',
  delivery_date: '',
  
  // Frame Options
  chassis_type: 'SUPAGAL' as ChassisType,
  frame_type: 'HOLLOW_CHANNEL' as FrameType,
  
  // Chassis Dimensions
  chassis_width_front: '',
  chassis_width_wheel_arch: '',
  chassis_width_rear: '',
  chassis_total_length: '',
  overhang: '',
  floor_joint: '',
  
  // Steps
  step_front_location: '',
  step_rear_location: '',
  step_size: '625X185',
  round_corners: false,
  brackets: false,

  // Chassis Frame and A-Frame
  main_rail_size: '6"x2"-(150mmx50mm)' as MainRailSize,
  a_frame_size: '6"x2"-(150mmx50mm)' as AFrameSize,
  a_frame_battery_box: {
    front: 2,
    rear: false
  },
  a_frame_extended_length: 1900,
  
  // Chassis Raiser
  chassis_raiser_size: '2"-50mm' as ChassisRaiserSize,
  
  // Coupling
  coupling_type: 'STD' as CouplingType,
  coupling_position: 'Middle' as CouplingPosition,
  z_section: '22' as ZSection,
  
  // Axle and Weight
  axle_type: 'GTM' as AxleType,
  roller_rocker: '1450KG' as RollerRockerWeight,
  torflex: '2500KG' as TorflexWeight,
  
  // Suspension
  suspension_type: '' as WheelType,
  suspension_capacity: '2750kg ATM',
  airbags: null as AirbagLevel,
  disc_brake: false,
  
  // Wheels
  wheel_type: '' as WheelType,
  wheel_size: '205/75/15' as WheelSize,
  spare_wheel_holder: 'UNDERSLUNG',
  underslung: true,
  on_aframe: false,
  on_bumper_bar: false,
  bumper_bar_position: null as ('Front' | 'Rear' | null),
  
  // Water and Gas
  water_tanks: {
    front: { qty: 2, size: '95L' },
    between: { qty: 0, size: '95L' },
    rear: { qty: 0, size: '95L' },
    covers: true,
    grey_tank: false,
    grey_tank_rear1: false
  },
  gas_holders: {
    size4_5kg: true,
    size9kg: false,
    loose: false
  },
  
  // Additional Features
  drop_legs: true,
  mud_flaps: true,
  jerry_can_holders: {
    quantity: 1
  },
  electric_jockey_wheel: {
    enabled: false,
    size: '6"',
    type: 'STANDARD'
  },
  
  // Bumper Bars
  bumper_bars: {
    type: 'STD',
    arms: 1
  },
  
  // Equipment
  aircon_frame: false,
  mesh: false,
  
  // Extras
  extras: {
    nudgeBar: false,
    recoveryPoints: false,
    skidPlates: false,
    bikePlate: false,
    wheelBrace: false,
    paintColor: '',
    jack2000: false
  },
  comments: ''
};