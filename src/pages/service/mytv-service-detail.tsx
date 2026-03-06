import { formatPrice } from "@/utils/format";

interface MyTVServiceDetailProps {
  service: any;
  detail: any;
}

export default function MyTVServiceDetail({ service, detail }: MyTVServiceDetailProps) {
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

      {/* Thông tin gói MyTV */}
      {detail?.benefits && detail.benefits.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Thông tin gói MyTV</h2>
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

      {/* Điều kiện sử dụng */}
      {detail?.registrationConditions && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Điều kiện sử dụng</h2>
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

      {/* Gia hạn gói */}
      {detail?.renewalInfo && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Gia hạn gói</h2>
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

      {/* Thiết bị hỗ trợ */}
      {detail?.usageRules && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Thiết bị hỗ trợ</h2>
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

      {/* Hỗ trợ khách hàng */}
      {detail?.supportHotline && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Hỗ trợ khách hàng</h2>
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
