import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  
  return [lat, lng];
}

export { useUrlPosition };
