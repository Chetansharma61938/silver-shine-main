/*
  # Update orders table constraints and defaults
  
  1. Changes
    - Make non-essential fields nullable
    - Add appropriate default values
    - Ensure required fields remain NOT NULL
    
  2. Required Fields
    - customer_id
    - chassis_no
    - model_name
    - order_date
    - delivery_date
    - wheel_type
    - suspension_type
    - status
*/

DO $$ 
BEGIN
  -- Set default values first
  ALTER TABLE orders
    ALTER COLUMN step_size SET DEFAULT '625X185',
    ALTER COLUMN round_corners SET DEFAULT false,
    ALTER COLUMN brackets SET DEFAULT false,
    ALTER COLUMN chassis_type SET DEFAULT 'SUPAGAL',
    ALTER COLUMN frame_type SET DEFAULT 'HOLLOW_CHANNEL',
    ALTER COLUMN main_rail_size SET DEFAULT '6"x2"-(150mmx50mm)',
    ALTER COLUMN a_frame_size SET DEFAULT '6"x2"-(150mmx50mm)',
    ALTER COLUMN a_frame_extended_length SET DEFAULT 1900,
    ALTER COLUMN chassis_raiser_size SET DEFAULT '2"-50mm',
    ALTER COLUMN coupling_type SET DEFAULT 'STD',
    ALTER COLUMN coupling_position SET DEFAULT 'Middle',
    ALTER COLUMN z_section SET DEFAULT '22',
    ALTER COLUMN axle_type SET DEFAULT 'GTM',
    ALTER COLUMN roller_rocker SET DEFAULT '1450KG',
    ALTER COLUMN torflex SET DEFAULT '2500KG',
    ALTER COLUMN suspension_capacity SET DEFAULT '2750kg ATM',
    ALTER COLUMN disc_brake SET DEFAULT false,
    ALTER COLUMN wheel_size SET DEFAULT '205/75/15',
    ALTER COLUMN spare_wheel_holder SET DEFAULT 'UNDERSLUNG',
    ALTER COLUMN underslung SET DEFAULT true,
    ALTER COLUMN on_aframe SET DEFAULT false,
    ALTER COLUMN on_bumper_bar SET DEFAULT false,
    ALTER COLUMN status SET DEFAULT 'QUOTE_SENT';

  -- Make non-essential fields nullable
  ALTER TABLE orders
    ALTER COLUMN order_by DROP NOT NULL,
    ALTER COLUMN signature DROP NOT NULL,
    ALTER COLUMN chassis_width_front DROP NOT NULL,
    ALTER COLUMN chassis_width_wheel_arch DROP NOT NULL,
    ALTER COLUMN chassis_width_rear DROP NOT NULL,
    ALTER COLUMN chassis_total_length DROP NOT NULL,
    ALTER COLUMN overhang DROP NOT NULL,
    ALTER COLUMN floor_joint DROP NOT NULL,
    ALTER COLUMN step_front_location DROP NOT NULL,
    ALTER COLUMN step_rear_location DROP NOT NULL,
    ALTER COLUMN step_size DROP NOT NULL,
    ALTER COLUMN round_corners DROP NOT NULL,
    ALTER COLUMN brackets DROP NOT NULL,
    ALTER COLUMN main_rail_size DROP NOT NULL,
    ALTER COLUMN a_frame_size DROP NOT NULL,
    ALTER COLUMN a_frame_extended_length DROP NOT NULL,
    ALTER COLUMN chassis_raiser_size DROP NOT NULL,
    ALTER COLUMN coupling_type DROP NOT NULL,
    ALTER COLUMN coupling_position DROP NOT NULL,
    ALTER COLUMN z_section DROP NOT NULL,
    ALTER COLUMN axle_type DROP NOT NULL,
    ALTER COLUMN roller_rocker DROP NOT NULL,
    ALTER COLUMN torflex DROP NOT NULL,
    ALTER COLUMN suspension_capacity DROP NOT NULL,
    ALTER COLUMN disc_brake DROP NOT NULL,
    ALTER COLUMN wheel_size DROP NOT NULL,
    ALTER COLUMN spare_wheel_holder DROP NOT NULL,
    ALTER COLUMN underslung DROP NOT NULL,
    ALTER COLUMN on_aframe DROP NOT NULL,
    ALTER COLUMN on_bumper_bar DROP NOT NULL,
    ALTER COLUMN bumper_bar_position DROP NOT NULL;

  -- Ensure required fields are NOT NULL
  ALTER TABLE orders
    ALTER COLUMN customer_id SET NOT NULL,
    ALTER COLUMN chassis_no SET NOT NULL,
    ALTER COLUMN model_name SET NOT NULL,
    ALTER COLUMN order_date SET NOT NULL,
    ALTER COLUMN delivery_date SET NOT NULL,
    ALTER COLUMN wheel_type SET NOT NULL,
    ALTER COLUMN suspension_type SET NOT NULL,
    ALTER COLUMN status SET NOT NULL;
END $$;