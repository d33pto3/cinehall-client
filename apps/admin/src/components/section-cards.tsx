import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

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
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((card, index) => {
        const isUp = card.trendDirection === "up";
        const TrendIcon = isUp ? IconTrendingUp : IconTrendingDown;

        return (
          <Card className="@container/card" key={index}>
            <CardHeader>
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.title}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="mr-1" />
                  {card.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.subtext} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.subtext}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
