import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SetupIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/setup/household");
  }, [router]);

  return null;
}
