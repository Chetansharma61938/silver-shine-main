/*
  # Update orders table schema

  1. Changes
    - Add new fields for detailed chassis specifications
    - Update existing fields with more specific types
    - Add new columns for additional features and options

  2. New Fields
    - Detailed chassis dimensions
    - Step configurations
    - Frame specifications
    - Coupling details
    - Weight specifications
    - Water and gas tank details
    - Additional features and equipment

  3. Security
    - Maintain existing RLS policies
*/

-- Add new columns for order details
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_by text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS signature text;

-- Chassis Dimensions
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_width_front numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_width_wheel_arch numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_width_rear numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_total_length numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS overhang numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS floor_joint text;

-- Steps
ALTER TABLE orders ADD COLUMN IF NOT EXISTS step_front_location text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS step_rear_location text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS step_size text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS round_corners boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS brackets boolean;

-- Frame Specifications
ALTER TABLE orders ADD COLUMN IF NOT EXISTS main_rail_size text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS a_frame_size text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS a_frame_battery_box jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS a_frame_extended_length integer;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_raiser_size text;

-- Coupling
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupling_type text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupling_position text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS z_section text;

-- Axle and Weight
ALTER TABLE orders ADD COLUMN IF NOT EXISTS axle_type text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS roller_rocker text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS torflex text;

-- Suspension
ALTER TABLE orders ADD COLUMN IF NOT EXISTS suspension_capacity text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS airbags text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS disc_brake boolean;

-- Wheels
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wheel_size text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS spare_wheel_holder text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS underslung boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS on_aframe boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS on_bumper_bar boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS bumper_bar_position text;

-- Water and Gas
ALTER TABLE orders ADD COLUMN IF NOT EXISTS water_tanks jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS gas_holders jsonb;

-- Additional Features
ALTER TABLE orders ADD COLUMN IF NOT EXISTS drop_legs boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mud_flaps boolean;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS jerry_can_holders jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS electric_jockey_wheel jsonb;

-- Frame Options
ALTER TABLE orders ADD COLUMN IF NOT EXISTS bumper_bars jsonb;

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_orders_chassis_no ON orders(chassis_no);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_date ON orders(delivery_date);