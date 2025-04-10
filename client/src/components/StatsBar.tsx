import { Award, Users, ThumbsUp } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      label: "Premium Products",
      value: "10+",
      icon: <Award className="text-primary mr-2" size={18} />
    },
    {
      label: "Years Experience",
      value: "30+",
      icon: <ThumbsUp className="text-primary mr-2" size={18} />
    },
    {
      label: "Satisfied Customers",
      value: "50+",
      icon: <Users className="text-primary mr-2" size={18} />
    }
  ];

  return (
    <div className="bg-secondary py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around items-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4 py-2 flex flex-col items-center">
              <div className="text-primary text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-foreground/80 flex items-center">
                {stat.icon} {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
