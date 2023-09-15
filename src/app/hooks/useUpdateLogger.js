import { useEffect } from "react";

export default function useUpdateLogger(key, data) {
    useEffect(() => console.log(key, "=> ", data), [data]);
}