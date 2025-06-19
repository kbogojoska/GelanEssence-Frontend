import { useState } from "react";
import { useNavigate } from "react-router-dom";

const moods = [
  { label: "Happy", emoji: "😄", color: "bg-green-100" }, 
  { label: "Good", emoji: "😊", color: "bg-blue-100" },
  { label: "Okay", emoji: "😐", color: "bg-yellow-100" },
  { label: "Sad", emoji: "😢", color: "bg-neutralPurple-100" },
  { label: "Awful", emoji: "😭", color: "bg-red-100" }, 
];

const moodSymptomsMap = {
  Happy: [
    "Energetic", "Focused", "Happy", "Relaxed", "Motivated", 
    "Calm", "Optimistic", "Content", "Refreshed", "Confident", 
    "Inspired", "Balanced", "Grateful", "Peaceful", "Cheerful"
  ],
  Good: [
    "Energetic", "Focused", "Relaxed", "Motivated", "Calm", 
    "Optimistic", "Content", "Refreshed", "Confident", "Inspired"
  ],
  Okay: [
    "Tired", "Irritable", "Restless", "Low Energy", "Difficulty Concentrating",
    "Mood Swings", "Muscle Tension", "Lack of Motivation"
  ],
  Sad: [
  "Anxious", "Tired", "Irritable", "Restless", "Low Energy",
  "Headache", "Poor Sleep", "Nervousness", "Fatigue", "Stomach Ache",
  "Difficulty Concentrating", "Mood Swings", "Muscle Tension", "Dizziness",
  "Sweating", "Loss of Appetite", "Feeling Overwhelmed", "Lack of Motivation"
   ],
   Awful: [
   "Anxious", "Exhausted", "Irritable", "Restless", "Extreme Fatigue",
   "Severe Headache", "Insomnia", "Panic", "Nausea", "Stomach Ache",
   "Confusion", "Mood Swings", "Muscle Cramps", "Dizziness",
   "Sweating", "Rapid Heartbeat", "Loss of Appetite", "Feeling Overwhelmed",
   "Hopelessness", "Lack of Motivation"
   ],
};

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const symptomsToShow = moodSymptomsMap[selectedMood] || [];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
    setSaved(false);
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) return;
    // Save logic here (API call etc)
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearSymptoms = () => {
    setSelectedSymptoms([]);
    setSaved(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30 mt-10">
      <h2 className="text-4xl font-semibold text-center text-purple-900 mb-8">
        How are you feeling today? <span className="text-3xl"></span>
      </h2>

      <section className="mb-10 top-4 bg-white/90 backdrop-blur-sm z-10 py-4 rounded-xl border border-purple-200 shadow-sm">
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`emoji-button transition-transform duration-200 p-3 sm:p-4 rounded-full text-4xl sm:text-5xl border-4 focus:outline-none focus:ring-4 focus:ring-neutralPurple-300 ${
                selectedMood === mood.label
                  ? "scale-110 sm:scale-125 shadow-lg border-neutralPurple-400"
                  : "hover:scale-105 sm:hover:scale-110 shadow-md border-neutralPurple-200"
              } bg-white`}
              onClick={() => {
                setSelectedMood(mood.label);
                setSelectedSymptoms([]);
                setSaved(false);
              }}
              aria-pressed={selectedMood === mood.label}
              aria-label={`Select mood ${mood.label}`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </section>

      <section>
        <label
          htmlFor="symptoms"
          className="block text-lg text-purple-900 mb-4 font-semibold pl-10"
        >
          Select any symptoms or feelings that apply:
        </label>

        {selectedSymptoms.length > 0 && (
          <p className="mb-2 text-purple-700 font-medium pl-10 mb-10 mt-5">
            {selectedSymptoms.length} symptom
            {selectedSymptoms.length > 1 ? "s" : ""} selected
            <button
              onClick={clearSymptoms}
              className="ml-4 text-sm underline hover:text-purple-900 bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded "
              aria-label="Clear all selected symptoms"
              type="button"
            >
              Clear All
            </button>
          </p>
        )}

        <div
          id="symptoms"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10"
          role="list"
        >
          {symptomsToShow.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`rounded-lg p-3 font-medium text-center transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-neutralPurple-300
                    ${
                    isSelected
                        ? "bg-purple-200 text-black-400 shadow scale-105 focus:ring-2 focus:ring-purple-400 border"
                        : "bg-white border-2 border-purple-200 text-black-400 hover:bg-purple-100 hover:scale-105 focus:ring-2 focus:ring-purple-400"
                    }
                `}
                aria-pressed={isSelected}
                role="listitem"
                type="button"
                >
                {symptom}
                </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-2xl mx-auto space-y-6">
        <label className="block text-lg text-neutralPurple-600 mb-2 font-semibold" htmlFor="notes">
          Notes:
        </label>
        <textarea
          id="notes"
          className="w-full p-4 h-40 text-lg bg-white rounded-xl border-2 border-purple-200 focus:ring-2 focus:ring-neutralPurple-300 resize-none"
          placeholder="What's making you feel this way? 💬✨"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSaved(false);
          }}
          rows={6}
        />
      </section>

      <section className="flex flex-col sm:flex-row gap-4 pt-6 max-w-2xl mx-auto">
        <button
          disabled={selectedSymptoms.length === 0}
          onClick={handleSave}
          className={`flex-1 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all
            ${
              selectedSymptoms.length === 0
                ? "bg-purple-300 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:shadow-xl"
            }`}
          aria-disabled={selectedSymptoms.length === 0}
        >
          Save Mood
        </button>

        <button
          onClick={() => navigate("/progress")}
          className="flex-1 py-4 text-xl bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          View Report 📈
        </button>
      </section>

      {saved && (
        <p className="mt-6 text-center text-green-600 font-semibold animate-fadeIn">
          Your mood and symptoms have been saved! 🎉
        </p>
      )}
    </div>
  );
}
