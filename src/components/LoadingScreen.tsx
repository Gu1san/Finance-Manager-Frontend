export default function LoadingScreen({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/20 border-t-olive-leaf" />

        <p className="text-sm text-foreground-secondary">{message}</p>
      </div>
    </main>
  );
}
