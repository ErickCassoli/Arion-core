import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="p-4 rounded-full bg-secondary/50">
        <Construction className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground max-w-sm">
        This page is currently under construction. Check back later for updates.
      </p>
    </div>
  );
}
