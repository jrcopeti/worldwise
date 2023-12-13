import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  console.log("lat", lat , "lng", lng);
  return [lat, lng];
}

export { useUrlPosition };
