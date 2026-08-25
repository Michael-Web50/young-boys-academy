import Image from "next/image";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author?: string;
}

export default function NewsCard({ title, excerpt, date, category, image, author }: NewsCardProps) {
  const categoryColors: Record<string, string> = {
    "Match Report": "bg-green-600",
    "Announcement": "bg-brand-yellow text-brand-black",
    "Fixture": "bg-blue-600",
    "Training": "bg-purple-600",
    "Transfer": "bg-red-600",
  };

  return (
    <article className="group bg-brand-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-yellow/10">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-4 left-4">
          <span className={`${categoryColors[category] || "bg-brand-darkGray"} text-brand-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-brand-darkGray/60 mb-3">
          <span>{date}</span>
          {author && <span>• {author}</span>}
        </div>
        
        <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-brand-darkGray mb-4 line-clamp-3">
          {excerpt}
        </p>

        <button className="text-brand-yellow font-bold text-sm hover:underline flex items-center gap-2">
          Read More →
        </button>
      </div>
    </article>
  );
}
