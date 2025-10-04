"use client";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PlayerPage() {
  const { id } = useParams(); // ex: /player/20 → id = "20"
  const params = useSearchParams();

  const title = params.get("title");
  const img = params.get("img");

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {title} (ID: {id})
      </h1>
      {img && (
        <Image
          src={img}
          fill
          alt={title ?? ""}
          className="rounded-lg mb-4 max-w-sm"
        />
      )}
      <p className="text-gray-400">Detalii anime aici...</p>
    </div>
  );
}
