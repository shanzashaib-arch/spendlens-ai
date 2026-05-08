interface ToolCardProps {
  index: number;
  tool: any;
  toolOptions: string[];
  onChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
}

export default function ToolCard({
  index,
  tool,
  toolOptions,
  onChange,
  onRemove,
}: ToolCardProps) {
  return (
    <div className="bg-black border border-zinc-800 rounded-2xl p-6 space-y-4">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          Tool #{index + 1}
        </h3>

        <button
          onClick={() => onRemove(index)}
          className="text-red-400 text-sm"
        >
          Remove
        </button>
      </div>

      <select
        value={tool.tool}
        onChange={(e) =>
          onChange(index, "tool", e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
      >
        <option value="">Select Tool</option>

        {toolOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Plan"
        value={tool.plan}
        onChange={(e) =>
          onChange(index, "plan", e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
      />

      <input
        type="number"
        placeholder="Monthly Spend"
        value={tool.monthlySpend}
        onChange={(e) =>
          onChange(index, "monthlySpend", Number(e.target.value))
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
      />

      <input
        type="number"
        placeholder="Seats"
        value={tool.seats}
        onChange={(e) =>
          onChange(index, "seats", Number(e.target.value))
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
      />
    </div>
  );
}