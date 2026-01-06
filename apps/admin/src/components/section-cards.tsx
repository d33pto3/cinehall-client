import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/context/AuthContext";

export interface ICardData {
  description: string;
  title: string;
  trend: string;
  trendDirection: "up" | "down";
  subtext: string;
}

export function SectionCards({
  // user,
  cardData,
}: {
  user: User | null;
  cardData: ICardData[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((card, index) => {
        const isUp = card.trendDirection === "up";
        const TrendIcon = isUp ? TrendingUp : TrendingDown;

        return (
          <Card
            className="@container/card bg-card/50 border-border/50 backdrop-blur-sm"
            key={index}
          >
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
                {card.description}
              </CardDescription>
              <CardTitle className="text-3xl font-light tabular-nums @[250px]/card:text-4xl tracking-tighter">
                {card.title}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="rounded-none border-border/30 px-2 py-0 text-[10px] uppercase tracking-wider"
                >
                  <TrendIcon className="size-3 mr-1" strokeWidth={1.5} />
                  {card.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm mt-2">
              <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground font-medium flex items-center gap-1">
                {card.subtext}{" "}
                <TrendIcon className="size-3 opacity-50" strokeWidth={1} />
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
