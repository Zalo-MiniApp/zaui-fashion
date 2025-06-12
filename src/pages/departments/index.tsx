import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import {
  useDepartments,
  useSetCurrentDepartmentId,
  useCurrentDepartmentId,
  useSetCurrentDepartmentIdForCheckout,
  useCurrentDepartmentIdForCheckout,
} from 'miniapp-core/src';

import { DepartmentSkeleton } from '@/components/skeleton';
import type { Department } from 'miniapp-core/src';
import { useTranslation } from 'react-i18next';
import { useManualOrderCalculator } from 'miniapp-core/src';

function DepartmentItem({
  department,
  onSelect,
  isActive,
}: {
  department: Department;
  onSelect: () => void;
  isActive: boolean;
}) {
  const imageSrc = department.imageUrl || department.image?.url || '';

  return (
    <button
      className={`flex items-center space-x-4 p-4 pr-2 bg-white rounded-lg text-left shadow-md border transition
        ${isActive ? 'border-primary' : 'border-transparent'}
      `}
      onClick={onSelect}
    >
      <img
        src={imageSrc}
        className="h-14 w-14 rounded-lg bg-skeleton object-cover"
        alt={department.name}
      />
      <div className="flex-1 space-y-0.5">
        <div className="text-sm">{department.name}</div>
        <div className="text-xs text-inactive">{department.fullAddress || department.address}</div>
        {department.distanceText && (
          <div className="text-xs text-primary">{department.distanceText}</div>
        )}
      </div>
    </button>
  );
}

function DepartmentList() {
  const departments = useDepartments();
  const currentDepartmentId = useCurrentDepartmentId();
  const setCurrentDepartmentId = useSetCurrentDepartmentId();

  // Checkout
  const currentDepartmentIdForCheckout = useCurrentDepartmentIdForCheckout();
  const setCurrentDepartmentIdForCheckout = useSetCurrentDepartmentIdForCheckout();

  const location = useLocation();
  const fromScreen = location.state?.from;
  const isCheckoutPage = fromScreen === 'checkout';

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { calculate } = useManualOrderCalculator();

  console.log('Departments:', currentDepartmentIdForCheckout);
  if (!departments) return null;

  return departments.map((department) => (
    <DepartmentItem
      key={department.id}
      department={department}
      isActive={
        department.id === (isCheckoutPage ? currentDepartmentIdForCheckout : currentDepartmentId)
      }
      // Use the appropriate setter based on the page context
      onSelect={() => {
        if (isCheckoutPage) {
          setCurrentDepartmentIdForCheckout(department.id);
          calculate();
        } else {
          setCurrentDepartmentId(department.id);
        }
        toast.success(t('alerts.departmentChanged'));
        navigate(-1);
      }}
    />
  ));
}

function DepartmentsPage() {
  return (
    <div className="p-4 space-y-2 flex flex-col">
      <Suspense
        fallback={
          <>
            <DepartmentSkeleton />
            <DepartmentSkeleton />
            <DepartmentSkeleton />
            <DepartmentSkeleton />
          </>
        }
      >
        <DepartmentList />
      </Suspense>
    </div>
  );
}

export default DepartmentsPage;
