export default function BalanceCard({
  title,
  value,
  color = "text-gray-800",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col items-start justify-center">
      <span className="text-sm text-gray-500">{title}</span>
      <span className={`text-2xl font-semibold ${color}`}>
        {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </span>
    </div>
  );
}
