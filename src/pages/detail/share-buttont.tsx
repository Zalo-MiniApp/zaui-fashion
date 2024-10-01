import { ChevronRight, ShareDecor } from "components/vectors";

export default function ShareButton() {
  return (
    <button className="relative p-4 w-full flex space-x-1 bg-[#016BD9] rounded-lg text-white text-sm font-medium">
      <div>Chia sẻ ngay cho bạn bè</div>
      <ChevronRight />
      <div className="absolute right-5 top-[11px]">
        <ShareDecor />
      </div>
    </button>
  );
}
