export const runtime = 'edge';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout removes the default navbar/footer for game pages
  // The game player page handles its own navigation
  return (
    <div className="fixed inset-0 z-50 bg-arcade-bg">
      {children}
    </div>
  );
}
