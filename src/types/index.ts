export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export type OrderStatus = 
  | 'QUOTE_SENT'
  | 'ORDER_RECEIVED'
  | 'PAYMENT_PENDING'
  | 'ORDER_PARTS'
  | 'ORDER_PARTS_DONE'
  | 'PRODUCTION_START'
  | 'CUTTER_START'
  | 'CUTTER_FINISH'
  | 'WELDING_START'
  | 'WELDING_FINISH'
  | 'PRODUCTION_QC'
  | 'PAINTING'
  | 'FITMENT'
  | 'FINAL_QC'
  | 'READY_FOR_DELIVERY'
  | 'DELIVERED'
  | 'MAINTENANCE';

export interface Order {
  id: string;
  customer_id: string;
  status: OrderStatus;
  quote_amount: number;
  created_at: string;
  updated_at: string;
  order_date: string;
  delivery_date: string;
  chassis_no: string;
  model_name: string;
  order_by: string;
  signature: string;
  status_history: {
    status: OrderStatus;
    timestamp: string;
    user_id: string;
  }[];
  status_updated_at: string;

  // Chassis Dimensions
  chassis_width_front: number;
  chassis_width_wheel_arch: number;
  chassis_width_rear: number;
  chassis_total_length: number;
  overhang: number;
  floor_joint: string;

  // Steps
  step_front_location: string;
  step_rear_location: string;
  step_size: string;
  round_corners: boolean;
  brackets: boolean;

  // Chassis Frame and A-Frame
  main_rail_size: MainRailSize;
  a_frame_size: AFrameSize;
  a_frame_battery_box: {
    front: number;
    rear: boolean;
  };
  a_frame_extended_length: number;

  // Chassis Raiser
  chassis_raiser_size: ChassisRaiserSize;

  // Coupling
  coupling_type: CouplingType;
  coupling_position: CouplingPosition;
  z_section: ZSection;

  // Axle and Weight
  axle_type: AxleType;
  roller_rocker: RollerRockerWeight;
  torflex: TorflexWeight;

  // Suspension
  suspension_type: SuspensionType;
  suspension_capacity: string;
  airbags: AirbagLevel;
  disc_brake: boolean;

  // Wheels
  wheel_type: WheelType;
  wheel_size: WheelSize;
  spare_wheel_holder: SpareWheelHolder;
  underslung: boolean;
  on_aframe: boolean;
  on_bumper_bar: boolean;
  bumper_bar_position: 'Front' | 'Rear' | null;

  // Water and Gas
  water_tanks: {
    front: { qty: number; size: string };
    between: { qty: number; size: string };
    rear: { qty: number; size: string };
    covers: boolean;
    grey_tank: boolean;
    grey_tank_rear1: boolean;
  };
  gas_holders: {
    size4_5kg: boolean;
    size9kg: boolean;
    loose: boolean;
  };

  // Additional Features
  drop_legs: boolean;
  mud_flaps: boolean;
  jerry_can_holders: {
    quantity: number;
  };
  electric_jockey_wheel: {
    enabled: boolean;
    size: '6"' | '8"';
    type: 'SIDE_WINDER' | 'STANDARD';
  };

  // Frame Options
  chassis_type: ChassisType;
  frame_type: FrameType;
  bumper_bars: {
    type: 'STD' | '90_DEGREE' | 'FLAT' | 'SPECIALS';
    arms: 1 | 2 | 3 | 4;
  };

  // Equipment
  aircon_frame: boolean;
  mesh: boolean;

  // Extras
  extras: OrderExtras;
  comments: string;
}

export type WheelType = 
  | 'ROMAN'
  | 'VAULT'
  | 'TROOPER'
  | 'SHOW_STAR'
  | 'GRID802'
  | 'JACKYL'
  | 'DEVIL'
  | 'MAINLINE'
  | 'MAVERICK'
  | 'TARGA'
  | 'BULLET'
  | 'THEORY';

export type WheelSize =
  | '205/75/15'
  | '235/75/15'
  | '245/75/16'
  | '265/75/16'
  | '265/70/17'
  | '285/75/16';

export type SpareWheelHolder = 
  | 'UNDERSLUNG'
  | 'ON_AFRAME'
  | 'ON_BUMPER_BAR';

export type SuspensionType =
  | 'SHINE_XT'
  | 'CRUISEMASTER_XT'
  | 'AL_KO'
  | 'TUFRIDE'
  | 'CROSS_COUNTRY'
  | 'ENDURO_X'
  | 'ENDURO2.7';

export type ChassisType = 'SUPAGAL' | 'GALVANIZED';
export type FrameType = 'HOLLOW_CHANNEL' | 'KICK_UP' | 'TRUSS_CHASSIS' | 'FLAT_FLOOR';

export type MainRailSize = 
  | '6"x2"-(150mmx50mm)'
  | '4"x2"-(100mmx50mm)';

export type AFrameSize = 
  | '6"x2"-(150mmx50mm)'
  | '4"x2"-(100mmx50mm)';

export type ChassisRaiserSize = 
  | '2"-50mm'
  | '3"-75mm'
  | '4"'
  | '6"-150mm';

export type CouplingType = 'STD' | 'DO35' | 'DO45' | 'Other';
export type CouplingPosition = 'Top' | 'Middle' | 'Bottom';
export type ZSection = '22' | '44' | 'L' | 'Other';
export type AxleType = 'GTM' | 'ATM';

export type RollerRockerWeight = 
  | '1450KG'
  | '1600KG'
  | '2000KG'
  | '2200KG';

export type TorflexWeight = 
  | '2500KG'
  | 'SINGLE_AXLE';

export type AirbagLevel = 
  | 'LEVEL_1'
  | 'LEVEL_2'
  | 'LEVEL_3'
  | 'LEVEL_4'
  | null;

export interface OrderExtras {
  nudgeBar: boolean;
  recoveryPoints: boolean;
  skidPlates: boolean;
  bikePlate: boolean;
  wheelBrace: boolean;
  paintColor: string;
  jack2000: boolean;
}