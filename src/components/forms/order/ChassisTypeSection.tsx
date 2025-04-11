import React from 'react';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { FormRadioGroup } from '../FormRadioGroup';
import { FormInput } from '../FormInput';
import { ChassisType, FrameType } from '../../../types';

interface ChassisTypeSectionProps {
  formData: {
    chassis_type: ChassisType;
    frame_type: FrameType;
    chassis_width_front: string;
    chassis_width_wheel_arch: string;
    chassis_width_rear: string;
    chassis_total_length: string;
    overhang: string;
    floor_joint: string;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (name: string) => void;
}

export function ChassisTypeSection({
  formData,
  errors,
  touched,
  onChange,
  onBlur
}: ChassisTypeSectionProps) {
  return (
    <FormSection title="Chassis Specifications">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Chassis Type" name="chassis_type">
          <FormRadioGroup
            name="chassis_type"
            value={formData.chassis_type}
            onChange={onChange}
            options={[
              { value: 'SUPAGAL', label: 'SUPAGAL' },
              { value: 'GALVANIZED', label: 'GALVANIZED' }
            ]}
          />
        </FormField>
        <FormField label="Frame Type" name="frame_type">
          <FormRadioGroup
            name="frame_type"
            value={formData.frame_type}
            onChange={onChange}
            options={[
              { value: 'HOLLOW_CHANNEL', label: 'HOLLOW CHANNEL' },
              { value: 'KICK_UP', label: 'KICK UP' },
              { value: 'TRUSS_CHASSIS', label: 'TRUSS CHASSIS' },
              { value: 'FLAT_FLOOR', label: 'FLAT FLOOR' }
            ]}
          />
        </FormField>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Chassis Dimensions</h3>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Front Width"
            name="chassis_width_front"
            error={errors.chassis_width_front}
            touched={touched.chassis_width_front}
          >
            <FormInput
              type="number"
              name="chassis_width_front"
              value={formData.chassis_width_front}
              onChange={onChange}
              onBlur={() => onBlur('chassis_width_front')}
              step="0.01"
            />
          </FormField>
          <FormField
            label="Wheel Arch Width"
            name="chassis_width_wheel_arch"
            error={errors.chassis_width_wheel_arch}
            touched={touched.chassis_width_wheel_arch}
          >
            <FormInput
              type="number"
              name="chassis_width_wheel_arch"
              value={formData.chassis_width_wheel_arch}
              onChange={onChange}
              onBlur={() => onBlur('chassis_width_wheel_arch')}
              step="0.01"
            />
          </FormField>
          <FormField
            label="Rear Width"
            name="chassis_width_rear"
            error={errors.chassis_width_rear}
            touched={touched.chassis_width_rear}
          >
            <FormInput
              type="number"
              name="chassis_width_rear"
              value={formData.chassis_width_rear}
              onChange={onChange}
              onBlur={() => onBlur('chassis_width_rear')}
              step="0.01"
            />
          </FormField>
          <FormField
            label="Total Length"
            name="chassis_total_length"
            error={errors.chassis_total_length}
            touched={touched.chassis_total_length}
          >
            <FormInput
              type="number"
              name="chassis_total_length"
              value={formData.chassis_total_length}
              onChange={onChange}
              onBlur={() => onBlur('chassis_total_length')}
              step="0.01"
            />
          </FormField>
          <FormField
            label="Overhang"
            name="overhang"
            error={errors.overhang}
            touched={touched.overhang}
          >
            <FormInput
              type="number"
              name="overhang"
              value={formData.overhang}
              onChange={onChange}
              onBlur={() => onBlur('overhang')}
              step="0.01"
            />
          </FormField>
          <FormField
            label="Floor Joint"
            name="floor_joint"
            error={errors.floor_joint}
            touched={touched.floor_joint}
          >
            <FormInput
              type="text"
              name="floor_joint"
              value={formData.floor_joint}
              onChange={onChange}
              onBlur={() => onBlur('floor_joint')}
            />
          </FormField>
        </div>
      </div>
    </FormSection>
  );
}