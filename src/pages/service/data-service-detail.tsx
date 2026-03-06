import { formatPrice } from "@/utils/format";

interface DataServiceDetailProps {
  service: any;
  detail: any;
}

export default function DataServiceDetail({
  service,
  detail,
}: DataServiceDetailProps) {
  console.log('🔍 DataServiceDetail component');
  console.log('Service:', service);
  console.log('Detail:', detail);
  console.log('Detail benefits:', detail?.benefits);
  
  return (
    <>
      {/* 1. Ưu đãi gói cước */}
      {detail?.benefits && detail.benefits.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">1. Ưu đãi gói cước</h2>
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

      {/* 2. Điều kiện đăng ký */}
      {detail?.registrationConditions && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">2. Điều kiện đăng ký gói cước</h2>
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

      {/* 3. Gia hạn gói cước */}
      {detail?.renewalInfo && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">3. Gia hạn gói cước</h2>
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

      {/* 4. Quy định sử dụng */}
      {detail?.usageRules && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">4. Quy định sử dụng gói cước</h2>
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

      {/* 5. Kiểm tra ưu đãi */}
      {detail?.checkBalanceInfo && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">5. Cách kiểm tra ưu đãi còn lại</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.checkBalanceInfo) ? (
              detail.checkBalanceInfo.map((info: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{info}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.checkBalanceInfo}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* 6. Hủy gói cước */}
      {detail?.cancellationInfo && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">6. Cách hủy gói cước</h2>
          <ul className="space-y-2 text-gray-700">
            {Array.isArray(detail.cancellationInfo) ? (
              detail.cancellationInfo.map((info: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#0093DD] mr-2">✓</span>
                  <span>{info}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="text-[#0093DD] mr-2">✓</span>
                <span>{detail.cancellationInfo}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* 7. Tổng đài hỗ trợ */}
      {detail?.supportHotline && (
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">7. Tổng đài hỗ trợ</h2>
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