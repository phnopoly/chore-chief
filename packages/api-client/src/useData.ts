import { useEffect, useState } from "react";
import { LookupCategoryDTO, LookupFrequencyDTO, TemplateChoreDTO, ReferenceDataDTO } from "@chore-chief/types";

const getReferenceData = async (): Promise<ReferenceDataDTO> => {
  const res = await fetch("/api/reference-data");

  if (!res.ok) {
    throw new Error("Failed to fetch reference data");
  }

  return res.json();
};

export const useReferenceCategories = () => {
  const [categories, setCategories] = useState<LookupCategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferenceData()
      .then((data) => setCategories(data.categories.filter((c) => c.selectable)))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};

export const useReferenceFrequencies = () => {
  const [frequencies, setFrequencies] = useState<LookupFrequencyDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferenceData()
      .then((data) => setFrequencies(data.frequencies.filter((f) => f.active)))
      .finally(() => setLoading(false));
  }, []);

  return { frequencies, loading };
};

export const useReferenceTemplateChores = () => {
  const [templateChores, setTemplateChores] = useState<TemplateChoreDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferenceData()
      .then((data) => setTemplateChores(data.templateChore))
      .finally(() => setLoading(false));
  }, []);

  return { templateChores, loading };
};
