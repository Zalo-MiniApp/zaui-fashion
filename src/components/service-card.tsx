import { formatPrice } from "@/utils/format";
import { useNavigate } from "react-router-dom";

export interface Service {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  badge?: string;
  details?: string;
  image?: string;
  features?: string[];
  benefits?: string[];
  registrationConditions?: string;
  renewalInfo?: string;
  usageRules?: string;
  checkBalanceInfo?: string;
  cancellationInfo?: string;
  supportHotline?: string;
}

export interface ServiceCardProps {
  service: Service;
  onAdd?: () => void;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex-none w-[35vw] bg-white rounded-xl border-2 border-[#0093DD] overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Card Image/Banner */}
      <div className="relative bg-gray-100">
        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-auto block"
          />
        )}

        {/* Badge */}
        {service.badge && (
          <div className="absolute top-1 left-1 z-10 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {service.badge}
          </div>
        )}

        {/* Arrow */}
        <div className="absolute bottom-1 right-1 z-10 text-white text-lg bg-[#0093DD] rounded-full w-6 h-6 flex items-center justify-center">
          »
        </div>
      </div>

      {/* Card Content */}
      <div className="p-2 space-y-1 text-center">
        <h4 className="text-sm font-bold text-[#0093DD]">{service.name}</h4>
        <p className="text-xs text-gray-700 line-clamp-2 min-h-[30px]">
          {service.description}
        </p>
        
        {/* Price */}
        <div className="pt-0.5">
          <div className="text-sm font-bold text-[#0093DD] text-center">
            {service.price > 0 ? formatPrice(service.price) : "Miễn phí"}
          </div>
        </div>
      </div>
    </div>
  );
}
