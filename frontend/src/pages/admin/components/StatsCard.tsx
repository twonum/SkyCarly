import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({ bgColor, icon: Icon, label, value }: StatsCardProps) => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors rounded-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className={`p-2 sm:p-3 rounded-lg ${bgColor} flex justify-center items-center`}
          >
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 ${iconColor}" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-zinc-400">{label}</p>
            <p className="text-xl sm:text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
