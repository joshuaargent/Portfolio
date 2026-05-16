import { Card } from "@/components/ui/Card";
import { BookOpen, Code, Video, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

// ============================================
// Types
// ============================================

interface NowItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

// ============================================
// Component
// ============================================

export function NowSection() {
  // TODO: Fetch this data dynamically
  const nowItems: NowItem[] = [
    {
      icon: <Activity className="h-5 w-5 text-accent" />,
      label: "Running",
      value: "Day 87 of daily 5km",
      href: "/running",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-accent" />,
      label: "Reading",
      value: "Atomic Habits by James Clear",
      href: "/reading",
    },
    {
      icon: <Code className="h-5 w-5 text-accent" />,
      label: "Building",
      value: "Personal portfolio site",
      href: "/code",
    },
    {
      icon: <Video className="h-5 w-5 text-accent" />,
      label: "Latest video",
      value: "How to Build Better Habits",
      href: "/content",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nowItems.map((item) => (
            <Card key={item.label} hover className="group">
              {item.href ? (
                <Link href={item.href} className="block">
                  <NowCardContent item={item} />
                </Link>
              ) : (
                <NowCardContent item={item} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function NowCardContent({ item }: { item: NowItem }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-accent-light">{item.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-muted">{item.label}</p>
        <p className="mt-1 text-base font-semibold text-text-primary truncate">
          {item.value}
        </p>
      </div>
      {item.href && (
        <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors" />
      )}
    </div>
  );
}
