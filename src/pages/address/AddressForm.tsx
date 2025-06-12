import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Input, Select } from 'zmp-ui';
import { t } from 'i18next';
import { Address } from 'miniapp-core/src';
import { useAddressForm } from 'miniapp-core/src';

const { Option } = Select;

const validationRules = {
  fullname: { required: 'Vui lòng nhập tên người nhận' },
  phone: {
    required: 'Vui lòng nhập số điện thoại',
    pattern: {
      value: /^[0-9]{10,12}$/,
      message: 'Số điện thoại không hợp lệ',
    },
  },
  provinceId: { required: 'Vui lòng chọn tỉnh / thành phố' },
  districtId: { required: 'Vui lòng chọn quận / huyện' },
  wardId: { required: 'Vui lòng chọn phường / xã' },
  address: { required: 'Vui lòng nhập địa chỉ cụ thể' },
};

const defaultFormValues = {
  fullname: '',
  phone: '',
  provinceId: '',
  districtId: '',
  wardId: '',
  address: '',
};

type Props = {
  detail?: Address;
  mode?: 'add' | 'edit';
  onSubmit: (data: any) => Promise<void>;
};

const AddressForm: FC<Props> = ({ detail, mode = 'add', onSubmit }) => {
  const { provinces, districts, wards, fetchDistricts, fetchWards } = useAddressForm();

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
  });

  const provinceId = watch('provinceId');
  const districtId = watch('districtId');

  // Handle form detail (edit mode)
  useEffect(() => {
    if (detail) {
      reset({
        fullname: detail.fullname || '',
        phone: detail.phone || '',
        provinceId: detail.provinceId?.toString() || '',
        districtId: detail.districtId?.toString() || '',
        wardId: detail.wardId?.toString() || '',
        address: detail.address || '',
      });

      if (detail.provinceId) {
        fetchDistricts(detail.provinceId);
      }

      if (detail.districtId) {
        fetchWards(detail.districtId);
      }
    } else {
      reset(defaultFormValues);
    }
  }, [detail, fetchDistricts, fetchWards, reset]);

  // Watch province → fetch districts
  useEffect(() => {
    if (provinceId) {
      fetchDistricts(Number(provinceId));
      resetField('districtId');
      resetField('wardId');
    }
  }, [provinceId, fetchDistricts, resetField]);

  // Watch district → fetch wards
  useEffect(() => {
    if (districtId) {
      fetchWards(Number(districtId));
      resetField('wardId');
    }
  }, [districtId, fetchWards, resetField]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="p-4 space-y-4 bg-white">
        <Controller
          name="fullname"
          control={control}
          rules={validationRules.fullname}
          render={({ field }) => (
            <Input
              label={t('address.form.fullname_label')}
              placeholder={t('address.form.fullname_placeholder')}
              status={errors.fullname ? 'error' : 'success'}
              errorText={errors.fullname?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={validationRules.phone}
          render={({ field }) => (
            <Input
              type="text"
              label={t('address.form.phone_label')}
              placeholder={t('address.form.phone_placeholder')}
              maxLength={12}
              status={errors.phone ? 'error' : 'success'}
              errorText={errors.phone?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="provinceId"
          control={control}
          rules={validationRules.provinceId}
          render={({ field }) => (
            <Select
              closeOnSelect
              status={errors.provinceId ? 'error' : 'success'}
              errorText={errors.provinceId?.message}
              label={t('address.form.province_label')}
              placeholder={t('address.form.province_placeholder')}
              {...field}
            >
              {provinces.map((p) => (
                <Option key={p.id} value={p.id.toString()} title={p.name} />
              ))}
            </Select>
          )}
        />

        <Controller
          name="districtId"
          control={control}
          rules={validationRules.districtId}
          render={({ field }) => (
            <Select
              closeOnSelect
              // disabled={!provinceId}
              status={errors.districtId ? 'error' : 'success'}
              errorText={errors.districtId?.message}
              label={t('address.form.district_label')}
              placeholder={t('address.form.district_placeholder')}
              {...field}
            >
              {districts.map((d) => (
                <Option key={d.id} value={d.id.toString()} title={d.name} />
              ))}
            </Select>
          )}
        />

        <Controller
          name="wardId"
          control={control}
          rules={validationRules.wardId}
          render={({ field }) => (
            <Select
              closeOnSelect
              // disabled={!districtId}
              status={errors.wardId ? 'error' : 'success'}
              errorText={errors.wardId?.message}
              label={t('address.form.ward_label')}
              placeholder={t('address.form.ward_placeholder')}
              {...field}
            >
              {wards.map((w) => (
                <Option key={w.id} value={w.id.toString()} title={w.name} />
              ))}
            </Select>
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={validationRules.address}
          render={({ field }) => (
            <Input
              label={t('address.form.address_label')}
              placeholder={t('address.form.address_placeholder')}
              status={errors.address ? 'error' : 'success'}
              errorText={errors.address?.message}
              {...field}
            />
          )}
        />

        {mode === 'edit' && (
          <Button
            fullWidth
            type="danger"
            variant="secondary"
            onClick={() => {
              if (detail?.id) {
                onSubmit({ ...detail, isDelete: true });
              }
            }}
          >
            {t('common.delete')}
          </Button>
        )}

        <Button fullWidth type="highlight" htmlType="submit">
          {mode === 'edit' ? t('address.edit_btn') : t('address.add_btn')}
        </Button>
      </Box>
    </form>
  );
};

export default React.memo(AddressForm);
