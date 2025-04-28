import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Droplet, Package, Info } from 'lucide-react';

export const PMDGuidelines = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      title: "Plastic Packaging",
      items: [
        "Bottles and containers (max 8L)",
        "Dishes, tubs, and trays",
        "Pots and tubes",
        "Films and bags",
        "Beverage capsules"
      ]
    },
    {
      title: "Metal Packaging",
      items: [
        "Drinks and food cans",
        "Aerosol spray cans",
        "Aluminum trays and dishes",
        "Lids, tops, and crown caps",
        "Beverage capsules"
      ]
    },
    {
      title: "Drinks Cartons",
      items: [
        "All beverage cartons (milk, juice, soup, cream)"
      ]
    }
  ];

  const notAccepted = [
    "Batteries and electrical appliances",
    "Gas cylinders",
    "Packaging with childproof closures",
    "Containers larger than 8 liters",
    "Expanded polystyrene (Styrofoam)",
    "Packaging with hazard pictograms",
    "Motor oil, lubricant, pesticide, fuel, paint, varnish, or silicone sealant containers"
  ];

  const preparationRules = [
    "Empty and rinse all containers",
    "Flatten plastic bottles lengthwise and reattach caps",
    "Remove plastic films from containers and dispose separately",
    "Remove full body sleeves from bottles and dispose separately",
    "Do not stack items inside each other",
    "Do not place filled bags inside PMD bag",
    "Do not attach items to outside of PMD bag"
  ];

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-fost-primary mb-4">
            How to Sort PMD Waste
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these guidelines to properly sort your Plastic packaging, Metal packaging, and Drinks cartons (PMD)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-fost-bg rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-fost-primary mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-fost-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-red-50 rounded-xl p-6 mb-16"
        >
          <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
            <X className="w-6 h-6" />
            Not Accepted Items
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {notAccepted.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-fost-bg rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-fost-primary mb-4 flex items-center gap-2">
            <Info className="w-6 h-6" />
            Preparation Rules
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {preparationRules.map((rule) => (
              <div key={rule} className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-fost-secondary flex-shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-gray-600 mt-8 italic"
        >
          By following these guidelines, you help conserve resources, save energy, and reduce CO2 emissions through proper recycling.
        </motion.p>
      </div>
    </section>
  );
};