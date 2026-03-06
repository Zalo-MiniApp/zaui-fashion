import { useAtomValue } from "jotai";
import ServiceSection from "@/components/service-section";
import ServiceCard from "@/components/service-card";
import { servicesState, serviceCategoriesState } from "@/state";

const HomePage: React.FunctionComponent = () => {
  const services = useAtomValue(servicesState);
  const categories = useAtomValue(serviceCategoriesState);

  return (
    <div className="min-h-full bg-[#0093DD]">
      {/* Service Sections */}
      {categories.map((category) => {
        const categoryServices = services.filter(
          (service) => service.categoryId === category.id
        );
        
        if (categoryServices.length === 0) return null;

        return (
          <ServiceSection key={category.id} title={category.name}>
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAdd={() => console.log("Add service:", service.name)}
              />
            ))}
          </ServiceSection>
        );
      })}
    </div>
  );
};

export default HomePage;
