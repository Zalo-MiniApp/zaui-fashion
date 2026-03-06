import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { 
  servicesState, 
  dataServiceDetailsState,
  internetServiceDetailsState,
  mytvServiceDetailsState,
  econtractServiceDetailsState
} from "@/state";
import ContactModal from "@/components/contact-modal";
import DataServiceDetail from "./data-service-detail";
import InternetServiceDetail from "./internet-service-detail";
import MyTVServiceDetail from "./mytv-service-detail";
import EContractServiceDetail from "./econtract-service-detail";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const services = useAtomValue(servicesState) as any[];
  const dataServiceDetails = useAtomValue(dataServiceDetailsState) as any[];
  const internetServiceDetails = useAtomValue(internetServiceDetailsState) as any[];
  const mytvServiceDetails = useAtomValue(mytvServiceDetailsState) as any[];
  const econtractServiceDetails = useAtomValue(econtractServiceDetailsState) as any[];
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const service = services?.find((s) => s.id === Number(id));

  console.log('🔍 ServiceDetailPage');
  console.log('URL ID:', id);
  console.log('Services array:', services);
  console.log('Found service:', service);
  console.log('Data Service Details array:', dataServiceDetails);
  
  if (!service) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy dịch vụ</p>
      </div>
    );
  }

  // Render different detail component based on category
  const renderServiceDetail = () => {
    switch (service.categoryId) {
      case 1: // Data Service
        const dataDetail = dataServiceDetails?.find((d) => d.serviceId === Number(id));
        console.log('🔍 Case 1: Data Service');
        console.log('Looking for serviceId:', Number(id));
        console.log('Found dataDetail:', dataDetail);
        return <DataServiceDetail service={service} detail={dataDetail} />;
      case 2: // Internet FTTH
        const internetDetail = internetServiceDetails?.find((d) => d.serviceId === Number(id));
        return <InternetServiceDetail service={service} detail={internetDetail} />;
      case 3: // MyTV
        const mytvDetail = mytvServiceDetails?.find((d) => d.serviceId === Number(id));
        return <MyTVServiceDetail service={service} detail={mytvDetail} />;
      case 4: // Hợp đồng điện tử
        const econtractDetail = econtractServiceDetails?.find((d) => d.serviceId === Number(id));
        return <EContractServiceDetail service={service} detail={econtractDetail} />;
      default:
        const defaultDetail = dataServiceDetails?.find((d) => d.serviceId === Number(id));
        return <DataServiceDetail service={service} detail={defaultDetail} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0093DD] pb-20">
      {/* Image Banner */}
      <div className="w-full bg-white">
        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-auto block"
          />
        )}
      </div>

      {/* Thông tin chi tiết - Category-specific */}
      <div className="p-4 space-y-4">
        {renderServiceDetail()}
      </div>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          className="w-full bg-[#EF4444] text-white text-lg font-bold py-4 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => setIsContactModalOpen(true)}
        >
          LIÊN HỆ NGAY
        </button>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        serviceName={service.name}
      />
    </div>
  );
}
