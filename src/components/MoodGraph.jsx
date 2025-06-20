import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/userId";

const moodLabels = {
  1: "😭",
  2: "😢",
  3: "😐",
  4: "😊",
  5: "😄",
};

export default function MoodGraph() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserId();
    fetch(`http://localhost:8080/api/daily-check/mood-graph?userId=${userId}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Failed to fetch mood data", err);
        setData([]);
      });
  }, []);

  return (
    <div className="w-full bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-purple-600">
          Your Weekly Mood Report 📊
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white hover:bg-purple-50 text-indigo-500 font-medium rounded-full shadow-md transition-all text-sm"
        >
          ← Back to Today
        </button>
      </div>

      <div className="h-[380px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#fbcfe8" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9d174d" }} />
            <YAxis
              domain={[1, 5]}
              tickFormatter={(val) => moodLabels[val]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 12, fill: "#9d174d" }}
            />
            <Tooltip
              formatter={(val) => [moodLabels[val], "Mood"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "12px",
                border: "1px solid #f9a8d4",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "10px",
              }}
              labelStyle={{ color: "#9d174d", fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#ec4899"
              strokeWidth={2}
              dot={{
                r: 5,
                strokeWidth: 1.5,
                stroke: "#f472b6",
                fill: "#f9a8d4",
              }}
              activeDot={{
                r: 7,
                stroke: "#ec4899",
                fill: "#f9a8d4",
                strokeWidth: 1.5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
        {Object.entries(moodLabels).map(([value, label]) => {
          const descriptions = {
            1: "Awful",
            2: "Sad",
            3: "Neutral",
            4: "Good",
            5: "Happy",
          };
          return (
            <div
              key={value}
              className="bg-white/80 p-2 rounded-lg shadow-sm text-center"
            >
              <span className="text-base font-medium text-pink-500">{label}</span>
              <div className="text-xs text-pink-600 mt-1">{descriptions[value]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
