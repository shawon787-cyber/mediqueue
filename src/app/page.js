import Banner from "@/components/Banner";
import WhyMediQueue from "@/components/WhyMediQueue";
import TeachSection from "@/components/TeachSection";
import AvailableTutors from "./AvailableTutors/page";

export const metadata = {
  title: "MediQuee - Home",
};

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AvailableTutors></AvailableTutors>
      <WhyMediQueue></WhyMediQueue>
      <TeachSection></TeachSection>
    </div>
  );
}