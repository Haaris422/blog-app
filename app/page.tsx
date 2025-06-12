import { HomeFeatured } from "@/components/Home/HomeFeatured";
import { HomeList } from "@/components/Home/HomeList";

export default function Home() {
  return (
    <div>
      <div className="pt-40 pb-10 px-4 xs:px-8 lg:px-20 font-girassol w-full h-full bg-white">
        <HomeFeatured />
      </div>
      <div className="px-4 pb-10 xs:px-8 lg:px-20 font-girassol w-full h-full bg-black">
        <HomeList />
      </div>
    </div>

  );
}
