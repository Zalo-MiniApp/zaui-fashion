import React from 'react';
import AddressForm from '../address/AddressForm';
import { useCreateAddress } from 'miniapp-core/src';
import { useNavigate } from 'react-router-dom';

const AddAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const createAddress = useCreateAddress();

  const handleAddAddress = async (data: any) => {
    try {
      console.log('Adding new address:', data);
      await createAddress(data);
      navigate(-1);
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  return (
    <div className="min-h-full bg-white">
      <AddressForm mode="add" onSubmit={handleAddAddress} />
    </div>
  );
};

export default AddAddressPage;
