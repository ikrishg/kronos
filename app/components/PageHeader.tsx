type PageHeaderProps = {
  eyebrow: string;
};

export default function PageHeader({ eyebrow }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
    </header>
  );
}
