import React from 'react';
import { FormSection } from '../FormSection';
import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';
import { FormCheckbox } from '../FormCheckbox';
import { FormInput } from '../FormInput';
import { SuspensionType, WheelType, WheelSize } from '../../../types';

interface SuspensionSectionProps {
  formData: {
    suspension_type: SuspensionType;
    suspension_capacity: string;
    airbags: string;
    disc_brake: boolean;
    wheel_type: WheelType;
    wheel_size: WheelSize;
    spare_wheel_holder: string;
    underslung: boolean;
    on_aframe: boolean;
    on_bumper_bar: boolean;
    bumper_bar_position: string | null;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (name: string) => void;
}

export function SuspensionSection({
  formData,
  errors,
  touched,
  onChange,
  onBlur
}: SuspensionSectionProps) {
  return (
    <FormSection title="Suspension & Wheels">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          label="Suspension Type"
          name="suspension_type"
          error={errors.suspension_type}
          touched={touched.suspension_type}
          required
        >
          <FormSelect
            name="suspension_type"
            value={formData.suspension_type}
            onChange={onChange}
            onBlur={() => onBlur('suspension_type')}
            required
            options={[
              { value: '', label: 'Select suspension type' },
              { value: 'SHINE_XT', label: 'Shine XT' },
              { value: 'CRUISEMASTER_XT', label: 'Cruisemaster XT' },
              { value: 'AL_KO', label: 'AL-KO' },
              { value: 'TUFRIDE', label: 'Tufride' },
              { value: 'CROSS_COUNTRY', label: 'Cross Country' },
              { value: 'ENDURO_X', label: 'Enduro X' },
              { value: 'ENDURO2.7', label: 'Enduro 2.7' }
            ]}
          />
        </FormField>
        <FormField
          label="Suspension Capacity"
          name="suspension_capacity"
          error={errors.suspension_capacity}
          touched={touched.suspension_capacity}
        >
          <FormInput
            type="text"
            name="suspension_capacity"
            value={formData.suspension_capacity}
            onChange={onChange}
            onBlur={() => onBlur('suspension_capacity')}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <FormField
          label="Airbags"
          name="airbags"
          error={errors.airbags}
          touched={touched.airbags}
        >
          <FormInput
            type="text"
            name="airbags"
            value={formData.airbags}
            onChange={onChange}
            onBlur={() => onBlur('airbags')}
          />
        </FormField>
        <FormField
          label="Disc Brake"
          name="disc_brake"
        >
          <FormCheckbox
            name="disc_brake"
            checked={formData.disc_brake}
            onChange={onChange}
            label="Include disc brake"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <FormField
          label="Wheel Type"
          name="wheel_type"
          error={errors.wheel_type}
          touched={touched.wheel_type}
          required
        >
          <FormSelect
            name="wheel_type"
            value={formData.wheel_type}
            onChange={onChange}
            onBlur={() => onBlur('wheel_type')}
            required
            options={[
              { value: '', label: 'Select wheel type' },
              { value: 'ROMAN', label: 'Roman' },
              { value: 'VAULT', label: 'Vault' },
              { value: 'TROOPER', label: 'Trooper' },
              { value: 'SHOW_STAR', label: 'Show Star' },
              { value: 'GRID802', label: 'Grid 802' },
              { value: 'JACKYL', label: 'Jackyl' },
              { value: 'DEVIL', label: 'Devil' },
              { value: 'MAINLINE', label: 'Mainline' },
              { value: 'MAVERICK', label: 'Maverick' },
              { value: 'TARGA', label: 'Targa' },
              { value: 'BULLET', label: 'Bullet' },
              { value: 'THEORY', label: 'Theory' }
            ]}
          />
        </FormField>
        <FormField
          label="Wheel Size"
          name="wheel_size"
          error={errors.wheel_size}
          touched={touched.wheel_size}
        >
          <FormSelect
            name="wheel_size"
            value={formData.wheel_size}
            onChange={onChange}
            onBlur={() => onBlur('wheel_size')}
            options={[
              { value: '205/75/15', label: '205/75/15' },
              { value: '235/75/15', label: '235/75/15' },
              { value: '245/75/16', label: '245/75/16' },
              { value: '265/75/16', label: '265/75/16' },
              { value: '265/70/17', label: '265/70/17' },
              { value: '285/75/16', label: '285/75/16' }
            ]}
          />
        </FormField>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Spare Wheel Configuration</h3>
        <div className="space-y-2">
          <FormCheckbox
            name="underslung"
            checked={formData.underslung}
            onChange={onChange}
            label="Underslung"
          />
          <FormCheckbox
            name="on_aframe"
            checked={formData.on_aframe}
            onChange={onChange}
            label="On A-Frame"
          />
          <FormCheckbox
            name="on_bumper_bar"
            checked={formData.on_bumper_bar}
            onChange={onChange}
            label="On Bumper Bar"
          />
        </div>
        {formData.on_bumper_bar && (
          <div className="mt-4">
            <FormField
              label="Bumper Bar Position"
              name="bumper_bar_position"
              error={errors.bumper_bar_position}
              touched={touched.bumper_bar_position}
            >
              <FormSelect
                name="bumper_bar_position"
                value={formData.bumper_bar_position || ''}
                onChange={onChange}
                onBlur={() => onBlur('bumper_bar_position')}
                options={[
                  { value: '', label: 'Select position' },
                  { value: 'Front', label: 'Front' },
                  { value: 'Rear', label: 'Rear' }
                ]}
              />
            </FormField>
          </div>
        )}
      </div>
    </FormSection>
  );
}