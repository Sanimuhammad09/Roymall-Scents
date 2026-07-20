import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

interface ColorCategory {
  id: string;
  name: string;
  hex: string;
  imageUrl: string;
}

interface ShopByColorProps {
  colors: ColorCategory[];
}

export function ShopByColor({ colors }: ShopByColorProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto bg-zinc-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-zinc-900 mb-4">Shop By Color</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">Discover our ridiculously luxurious fragrances in profiles that make you look and feel your best.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {colors.map((color, index) => (
          <motion.div
            key={color.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={`/shop?color=${color.name.toLowerCase()}`}
              className="group block relative aspect-square overflow-hidden rounded-lg bg-zinc-200"
            >
              <img
                src={color.imageUrl}
                alt={color.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-white font-bold text-sm tracking-wider uppercase drop-shadow-md">
                  {color.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
