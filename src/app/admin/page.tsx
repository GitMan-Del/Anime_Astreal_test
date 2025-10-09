"use client";
import { useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  mal_id?: string;
  cover?: string;
  season_number?: string;
  title?: string;
  episode_number?: string;
  thumbnail?: string;
  source_url?: string;
  priority?: string;
}

export default function AddAnimeData() {
  const [step, setStep] = useState(1);
  const [animeId, setAnimeId] = useState<number | null>(null);
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const [episodeId, setEpisodeId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (step === 1) {
      const { data, error } = await supabase
        .from("anime")
        .insert([{ mal_id: form.mal_id, cover: form.cover }])
        .select()
        .single();
      if (error) return alert(error.message);
      setAnimeId(data.id);
      setStep(2);
    } else if (step === 2) {
      const { data, error } = await supabase
        .from("seasons")
        .insert([
          {
            anime_id: animeId,
            season_number: Number(form.season_number),
            title: form.title,
          },
        ])
        .select()
        .single();
      if (error) return alert(error.message);
      setSeasonId(data.id);
      setStep(3);
    } else if (step === 3) {
      const { data, error } = await supabase
        .from("episodes")
        .insert([
          {
            anime_id: animeId,
            season_id: seasonId,
            episode_number: Number(form.episode_number),
            title: form.title,
            thumbnail: form.thumbnail,
          },
        ])
        .select()
        .single();
      if (error) return alert(error.message);
      setEpisodeId(data.id);
      setStep(4);
    } else if (step === 4) {
      const { error } = await supabase.from("episode_sources").insert([
        {
          episode_id: episodeId,
          source_url: form.source_url,
          priority: Number(form.priority) || 1,
        },
      ]);
      if (error) return alert(error.message);
      alert("✅ Episode source added successfully!");
      setStep(1);
      setForm({});
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input name="mal_id" placeholder="MAL ID" onChange={handleChange} />
            <input name="cover" placeholder="Cover URL" onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            <input
              name="season_number"
              placeholder="Season Number"
              onChange={handleChange}
            />
            <input name="title" placeholder="Season Title" onChange={handleChange} />
          </>
        );
      case 3:
        return (
          <>
            <input
              name="episode_number"
              placeholder="Episode Number"
              onChange={handleChange}
            />
            <input name="title" placeholder="Episode Title" onChange={handleChange} />
            <input name="thumbnail" placeholder="Thumbnail URL" onChange={handleChange} />
          </>
        );
      case 4:
        return (
          <>
            <input name="source_url" placeholder="Source URL" onChange={handleChange} />
            <input
              name="priority"
              placeholder="Priority (default 1)"
              onChange={handleChange}
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center">Step {step} of 4</h2>
          {renderStep()}
          <button
            onClick={handleSubmit}
            className="mt-4 w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700"
          >
            {step < 4 ? "Next →" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
