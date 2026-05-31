
import Banner from "@/componenets/Banner";
import WhyMediQueue from "@/componenets/WhyMediQueue";
import TeachSection from "@/componenets/TeachSection";
import AvailableTutors from "./AvailableTutors/page";

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
