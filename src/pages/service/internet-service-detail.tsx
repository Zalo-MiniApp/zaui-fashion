import { formatPrice } from "@/utils/format";

interface InternetServiceDetailProps {
  service: any;
  detail: any;
}

export default function InternetServiceDetail({ service, detail }: InternetServiceDetailProps) {
  return (
    <>
      {/* Service Name & Badge */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h1 className="text-2xl font-bold text-[#0093DD] mb-2">
          {service.name}
        </h1>
        {service.badge && (
          <span className="inline-block bg-[#0093DD] text-white text-xs px-3 py-1 rounded-full">
            {service.badge}
          </span>
        )}
      </div>

      {/* Giá cước */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Giá cước</h2>
        <p className="text-3xl font-bold text-[#0093DD]">
          {service.price > 0 ? formatPrice(service.price) : "Miễn phí"}
        </p>
        {service.price > 0 && (
          <p className="text-gray-500 text-sm mt-1">/tháng</p>
        )}
      </div>

      {/* Ưu đãi gói Internet */}
      {detail?.benefits && detail.benefits.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ưu đãi gói Internet</h2>
          <ul className="space-y-2 text-gray-700">
            {detail.benefits.map((benefit: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Điều kiện lắp đặt */}
      {detail?.registrationConditions && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Điều kiện lắp đặt</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.registrationConditions) ? (
              detail.registrationConditions.map((condition: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{condition}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.registrationConditions}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Gia hạn dịch vụ */}
      {detail?.renewalInfo && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Gia hạn dịch vụ</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.renewalInfo) ? (
              detail.renewalInfo.map((info: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{info}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.renewalInfo}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Quy định sử dụng */}
      {detail?.usageRules && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Quy định sử dụng</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.usageRules) ? (
              detail.usageRules.map((rule: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{rule}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.usageRules}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Hỗ trợ kỹ thuật */}
      {detail?.supportHotline && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Hỗ trợ kỹ thuật</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.supportHotline) ? (
              detail.supportHotline.map((info: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{info}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.supportHotline}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
