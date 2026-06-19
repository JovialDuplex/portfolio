import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({statsList}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statsList.map((stat, index)=>(
        <Card key={index} className="bg-(--bg-card) w-6/12 border border-(--border-card) hover:border-blue-600/40 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-200 rounded-(--radius-card)">
          <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-(--text-primary) uppercase tracking-widest">{stat.label}</p>
              <div className="w-7 h-7 rounded-sm border border-(--text-accent) flex items-center justify-center">
                <stat.icon className="w-3.5 h-3.5 text-(--text-accent)"/>
              </div>
            </div>
            <p className="text-4xl font-extrabold text-center text-(--text-accent) tracking-tight leading-none my-2">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}